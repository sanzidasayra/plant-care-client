import logo from "../assets/greenguardian.webp";
import {
  FaFacebook,
  FaInstagram,
  FaLeaf,
  FaPhone,
  FaTwitter,
} from "react-icons/fa";
import { IoMail } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className='bg-[#1b3d1f]  text-white dark:text-gray-200 pt-10 pb-6 mt-12 w-full'>
      <div className='w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='flex flex-col items-start gap-3'>
          <div className='flex items-center gap-2'>
            <img src={logo} alt='GreenGuardian Logo' className='h-10' />
            <h1 className='text-2xl font-bold'>
              Green
              <span className='text-[#4CAF50] dark:text-green-400'>
                Guardian
              </span>
            </h1>
          </div>
          <p className='text-sm text-gray-300 dark:text-gray-400'>
            Nurturing nature, one plant at a time. Your go-to hub for plant
            care, tracking & sharing green love.
          </p>
        </div>

        <div>
          <h2 className='text-lg font-semibold mb-4'>Contact Us</h2>
          <ul className='space-y-3 text-gray-300 dark:text-gray-400'>
            <li className='flex items-center gap-2'>
              <IoMail size={18} /> support@greenguardian.com
            </li>
            <li className='flex items-center gap-2'>
              <FaPhone size={18} /> +1 (555) 123-4567
            </li>
            <li className='flex items-center gap-2'>
              <FaLeaf size={18} /> Dhaka, Bangladesh
            </li>
          </ul>
        </div>

        <div>
          <h2 className='text-lg font-semibold mb-4'>Follow Us</h2>
          <div className='flex gap-4'>
            <a
              target='_blank'
              href='https://www.facebook.com/'
              className='hover:text-[#4CAF50] dark:hover:text-green-400 transition'
            >
              <FaFacebook size={24} />
            </a>
            <a
              target='_blank'
              href='https://x.com/sayrasanzid'
              className='hover:text-[#4CAF50] dark:hover:text-green-400 transition'
            >
              <FaTwitter size={24} />
            </a>
            <a
              target='_blank'
              href='https://www.instagram.com/'
              className='hover:text-[#4CAF50] dark:hover:text-green-400 transition'
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      <div className='w-10/12 mx-auto mt-8 border-t border-green-800 dark:border-green-900 pt-4 text-center text-sm text-gray-400 dark:text-gray-500'>
        &copy; {new Date().getFullYear()} GreenGuardian. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
