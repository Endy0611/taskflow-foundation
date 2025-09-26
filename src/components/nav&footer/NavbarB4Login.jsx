import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function NavbarB4Login() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Templates", path: "/templates" },
    { name: "About Us", path: "/about" },
  ];

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[65px]">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <NavLink to="/" className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
            TaskFlow
          </NavLink>
        </div>

        {/* Center: Links (hidden on tablet & mobile) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `font-medium px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-200"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right: Buttons + Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Login / Register (only show on lg+) */}
          <NavLink
            to="/login"
            className="hidden lg:block text-gray-700 dark:text-gray-200 font-medium px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Log in
          </NavLink>
          <NavLink
            to="/register"
            className="hidden lg:block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition text-sm sm:text-base"
          >
            Sign up - It's free!
          </NavLink>

          {/* Theme Toggle */}
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

          {/* Mobile / Tablet Menu Button */}
          <button
            className="lg:hidden text-gray-800 dark:text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block font-medium px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink
            to="/login"
            className="block w-full text-gray-700 dark:text-gray-200 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Log in
          </NavLink>
          <NavLink
            to="/register"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium shadow-sm transition"
          >
            Sign up - It's free!
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
