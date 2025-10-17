import React, { useEffect, useState } from "react";
import NavbarB4Login from "../nav&footer/NavbarB4Login";
import ScrollToTop from "./ScrollToTop";
import DynamicNavbar from "./DynamicNavbar";
import { Outlet } from "react-router-dom";
import FooterB4Login from "../nav&footer/FooterB4Login";
import OfflineMode from "../../utils/OfflineMode";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    typeof window !== "undefined" ? !!localStorage.getItem("user") : false
  );
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // online/offline state
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

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

  // If offline, render only the offline page (no navbar/footer/background)
  if (!isOnline) {
    return <OfflineMode />;
  }

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
        <NavbarB4Login darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}

      <ScrollToTop />
      <Outlet />
      <FooterB4Login />
    </div>
  );
}