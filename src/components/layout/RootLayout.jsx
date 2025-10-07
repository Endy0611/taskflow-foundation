// src/components/layout/RootLayout.jsx
import React, { useEffect, useState } from "react";
import NavbarB4Login from "../navfooter/NavbarB4Login";
import FooterB4Login from "../navfooter/FooterB4Login";
import ScrollToTop from "./ScrollToTop";
import DynamicNavbar from "./DynamicNavbar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Initialize theme from localStorage (fallback to OS preference if not set)
  useEffect(() => {
    const preferDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setDarkMode(Boolean(preferDark));
    document.documentElement.classList.toggle("dark", Boolean(preferDark));
  }, []);

  // Keep state in sync if user or theme changes in another tab/window
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "user") {
        setIsLoggedIn(!!e.newValue);
      }
      if (e.key === "theme") {
        const isDark = e.newValue === "dark";
        setDarkMode(isDark);
        document.documentElement.classList.toggle("dark", isDark);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.theme = next ? "dark" : "light";
  };

  return (
    <div>
      {isLoggedIn ? (
        <DynamicNavbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setShowModal={setShowModal}
        />
      ) : (
        // If NavbarB4Login supports theme toggling, it can use these props.
        <NavbarB4Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}

      <ScrollToTop />
      <Outlet />
      <FooterB4Login />
    </div>
  );
}
