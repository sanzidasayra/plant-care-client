import React, { useRef, useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate, useLocation } from "react-router";
import { auth } from "../firebase/firebase";
import { toast } from "react-toastify";
import BackgroundAnimation from "./BackGroundAnimation";

const LogIn = () => {
  const [error, setError] = useState("");
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const from = location.state?.from?.pathname || "/";

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    setError("");

    if (!email || !password) {
      const message = "Please enter both email and password.";
      setError(message);
      toast.error(message);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;

        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem(
          "greenGuardianUser",
          JSON.stringify({ email: user.email })
        );

        toast.success("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error("Invalid email or password.");
        setError(error.message);
      });
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in DB, if not, create
      const res = await fetch(
        `http://localhost:3000/users?email=${user.email}`
      );
      const data = await res.json();

      if (!data.length) {
        const newUser = {
          name: user.displayName || "Anonymous",
          email: user.email,
          photo:
            user.photoURL ||
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
        };

        await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newUser),
        });
      }

      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem(
        "greenGuardianUser",
        JSON.stringify({ email: user.email })
      );

      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Google login failed: " + error.message);
      console.error(error);
    }
  };

  const handleForgetPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className='flex justify-center items-center min-h-screen px-4 relative z-10'>
      <div className='absolute w-10/12 hidden lg:inline z-0'>
        <BackgroundAnimation />
      </div>

      <div className='card bg-base-100 w-full max-w-xl shadow-2xl lg:p-8 z-10'>
        <h1 className='font-semibold text-center text-3xl pb-4 text-green-800 p-8 lg:p-0'>
          Login Your Account
        </h1>

        <div className='card-body space-y-4'>
          <form onSubmit={handleLogIn} className='space-y-4'>
            <div>
              <label className='label font-semibold'>Email Address</label>
              <input
                type='email'
                name='email'
                ref={emailRef}
                className='input input-bordered w-full'
                placeholder='Enter your email address'
                required
              />
            </div>

            <div>
              <label className='label font-semibold'>Password</label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  name='password'
                  className='input bg-base-200 w-full'
                  placeholder='Enter your password'
                  required
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='btn btn-xs absolute top-2 right-6'
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className='text-right'>
              <button
                type='button'
                onClick={handleForgetPassword}
                className='link link-hover text-sm text-green-700'
              >
                Forgot password?
              </button>
            </div>

            <button
              type='submit'
              className='w-full py-3 rounded-xl font-bold text-white bg-green-700 hover:bg-green-800 transition duration-300 mt-2'
            >
              Login
            </button>

            <button
              type='button'
              className='btn btn-neutral mt-1 w-full rounded-xl'
              onClick={handleGoogleLogin}
            >
              <FcGoogle size={24} /> Login with Google
            </button>

            <p className='font-semibold dark:text-gray-950  pt-5'>
              Don’t have an account?{" "}
              <Link to='/register'>
                <span className='text-green-700 font-bold'>Register</span>
              </Link>
            </p>
          </form>

          {error && (
            <p className='text-red-400 text-center font-semibold'>{error}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LogIn;
