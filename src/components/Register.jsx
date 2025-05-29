import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../context/AuthProvider";
import { toast } from "react-toastify";
import BackgroundAnimation from "./BackGroundAnimation";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, logOut } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const { email, password, name, photo } = Object.fromEntries(
      formData.entries()
    );

    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegExp.test(password)) {
      setErrorMessage(
        "Password must have at least 1 uppercase, 1 lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    try {
      await createUser(email, password, name, photo);

      await logOut();

      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "Registration failed.");
    }
  };

  return (
    <div className='relative flex justify-center min-h-screen items-center px-4'>
      <div className='absolute w-11/12 hidden lg:inline'>
        <BackgroundAnimation />
      </div>
      <div className='card bg-base-100 w-full max-w-xl shadow-2xl lg:p-8 z-10 relative'>
        <h1 className='font-semibold text-center text-3xl pb-4 text-green-800'>
          Register Your Account
        </h1>
        <div className='card-body space-y-4'>
          <form onSubmit={handleRegister} className='space-y-4'>
            <div>
              <label className='label'>Name</label>
              <input
                type='text'
                name='name'
                className='input input-bordered w-full'
                required
                placeholder='Enter your name'
              />
            </div>

            <div>
              <label className='label'>Email</label>
              <input
                type='email'
                name='email'
                className='input input-bordered w-full'
                required
                placeholder='Enter your email'
              />
            </div>

            <div>
              <label className='label'>Photo URL</label>
              <input
                type='text'
                name='photo'
                className='input input-bordered w-full'
                required
                placeholder='Enter a photo URL'
              />
            </div>

            <div>
              <label className='label'>Password</label>
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
                  onClick={() => setShowPassword((prev) => !prev)}
                  className='btn btn-xs absolute top-2 right-6'
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {errorMessage && <p className='text-red-600'>{errorMessage}</p>}

            <button
              type='submit'
              className='w-full py-3 rounded-xl font-bold text-white bg-green-700 hover:bg-green-800 transition duration-300 mt-4'
            >
              Register
            </button>

            <p className='font-bold text-center dark:text-gray-950 pt-5'>
              Already have an account?{" "}
              <Link to='/login' className='text-green-700'>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
