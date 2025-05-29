import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

export const AuthContext = createContext();

export const fallbackAvatar =
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

const DB_URL = "http://localhost:3000/users";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setLoading(true);

      if (!fbUser) {
        // signed out
        setUser(null);
        setLoading(false);
        return;
      }

      const email = fbUser.email;
      let dbRecord = null;

      try {
        const res = await fetch(`${DB_URL}?email=${encodeURIComponent(email)}`);

        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            dbRecord = data[0];
          } else if (data && data._id) {
            dbRecord = data;
          }
        }
      } catch (err) {
        console.error("Error fetching user from DB:", err);
      }

      if (dbRecord) {
        setUser({
          name: dbRecord.name,
          email: dbRecord.email,
          photo: dbRecord.photo,
        });
      } else {
        const newUser = {
          name: fbUser.displayName || fbUser.email.split("@")[0],
          email,
          photo: fbUser.photoURL || fallbackAvatar,
        };

        try {
          const createRes = await fetch(DB_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser),
          });
          if (createRes.ok) {
            const created = await createRes.json();
            setUser({
              name: created.name,
              email: created.email,
              photo: created.photo,
            });
          } else {
            setUser(newUser);
          }
        } catch (err) {
          console.error("Error creating user in DB:", err);
          setUser(newUser);
        }
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const createUser = async (email, password, name, photo) => {
    setLoading(true);
    try {
      const { user: fbUser } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(fbUser, {
        displayName: name,
        photoURL: photo || fallbackAvatar,
      });

      const newUser = {
        name,
        email: fbUser.email,
        photo: photo || fallbackAvatar,
      };
      await fetch(DB_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      setUser(newUser);
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  return (
    <AuthContext.Provider value={{ user, loading, createUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
