import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function NavbarB4Login() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
   <nav className="font-roboto fixed top-0 w-full z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
  <div className=" mx-auto px-6 md:px-20 flex items-center justify-between h-[65px]"> 

    {/* Left: Logo */}
    <div className="flex items-center gap-2">
      <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center">
        <div className="w-3 h-3 bg-white rounded-full" />
      </div>
      <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
        TaskFlow
      </span>
    </div>

    {/* Center: Links */}
    <div className="hidden md:flex items-center gap-8">
      {["Home", "Features", "Templates", "About Us"].map((link) => (
        <a
          key={link}
          href={`#${link.toLowerCase().replace(" ", "")}`}
          className="text-gray-700 dark:text-gray-200 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {link}
        </a>
      ))}
    </div>

    {/* Right: Buttons + Theme Toggle */}
    <div className="flex items-center gap-3 md:gap-4">
      <button className="hidden md:block text-gray-700 dark:text-gray-200 font-medium px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        Log in
      </button>
      <button className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition">
        Sign up - It's free!
      </button>
      {/* Sun / Moon Toggle */}
      {isDarkMode ? (
        <Sun
          size={22}
          className="cursor-pointer text-yellow-400 hover:scale-110 transition"
          onClick={() => setIsDarkMode(false)}
        />
      ) : (
        <Moon
          size={22}
          className="cursor-pointer text-gray-700 hover:text-gray-900 dark:text-gray-200 hover:scale-110 transition"
          onClick={() => setIsDarkMode(true)}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-800 dark:text-gray-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  </div>

  {/* Mobile Dropdown */}
  {isOpen && (
    <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-3">
      {["Home", "Features", "Templates", "About Us"].map((link) => (
        <a
          key={link}
          href={`#${link.toLowerCase().replace(" ", "")}`}
          className="block text-gray-700 dark:text-gray-200 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {link}
        </a>
      ))}
      <button className="w-full text-gray-700 dark:text-gray-200 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
        Log in
      </button>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium shadow-sm transition">
        Sign up - It's free!
      </button>
    </div>
  )}
</nav>

  );
}
