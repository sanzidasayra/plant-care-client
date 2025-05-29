import React from "react";
import { Link } from "react-router";
import { FaLeaf } from "react-icons/fa";
import { IoFlowerOutline } from "react-icons/io5";

const Error = () => {
  return (
    <div>
      <div className='min-h-screen bg-green-50 flex items-center justify-center px-6'>
        <div className='text-center max-w-md bg-white p-8 rounded-2xl shadow-lg'>
          <div className='flex text-6xl mb-4 justify-center'>
            <FaLeaf className='text-[#4CAF50]' />
            <IoFlowerOutline className='text-[#4CAF50]' />
          </div>
          <h1 className='text-4xl font-bold text-[#4CAF50] mb-2'>
            Broh! Page Not Found
          </h1>
          <p className='text-gray-700 mb-6'>
            Looks like this page didn’t get enough sunlight! Let’s get you back
            to a thriving part of the garden.
          </p>

          <Link
            to='/'
            className='inline-block bg-[#4CAF50] text-white px-5 py-2 rounded-full hover:bg-[#1b3d1f] transition'
          >
            Back to Safety
          </Link>
          <div className='mt-6 text-sm text-gray-500'>
            Error code:{" "}
            <span className='font-mono bg-blue-50 px-2 py-1 rounded'>404</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
