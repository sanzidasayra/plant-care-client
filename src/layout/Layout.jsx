import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = saved ? saved === "dark" : system;
    setIsDarkMode(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div
      className={
        isDarkMode
          ? "dark:bg-gray-900 dark:text-gray-100"
          : "bg-green-100 text-gray-800"
      }
    >
      <Navbar />
      <div className='w-10/12 mx-auto'>
        <Outlet context={{ isDarkMode, toggleDarkMode }} />
      </div>
      <Footer />
      <button
        onClick={toggleDarkMode}
        className='fixed bottom-10 right-10 p-3 rounded-full bg-gray-800 text-white shadow-lg
                   dark:bg-gray-200 dark:text-black'
      >
        {isDarkMode ? "🌞 Light" : "🌙 Dark"}
      </button>
    </div>
  );
};

export default Layout;
