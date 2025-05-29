import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 
import { sendPasswordResetEmail } from "firebase/auth";

import { toast } from "react-toastify";
import { auth } from "../firebase/firebase";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const emailFromLogin = queryParams.get("userEmail");
    if (emailFromLogin) {
      setEmail(emailFromLogin);
    }
  }, [location]);

  const handleReset = async (e) => {
    e.preventDefault();
    const emailValue = emailRef.current?.value.trim();

    if (!emailValue) {
      toast.error("Please enter your email");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, emailValue);
      toast.success("Password reset email sent!");

      window.open("https://mail.google.com", "_blank");

      setTimeout(() => {
        navigate("/login");
      }, 300);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen px-4'>
      <div className='card w-full max-w-sm shadow-xl p-6 bg-white'>
        <h2 className='text-2xl font-bold mb-4 text-center text-green-800'>
          Reset Password
        </h2>
        <form onSubmit={handleReset}>
          <label className='label font-semibold dark:text-gray-400'>
            Email
          </label>
          <input
            type='email'
            ref={emailRef}
            defaultValue={email}
            className='input input-bordered w-full mb-4'
            placeholder='Enter your email'
            required
          />
          <button className='btn bg-green-700 text-white hover:bg-green-800 w-full'>
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;
