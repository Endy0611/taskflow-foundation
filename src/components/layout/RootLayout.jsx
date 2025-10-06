import React, { useEffect, useState } from "react";
import NavbarB4Login from "../nav&footer/NavbarB4Login";
import FooterB4Login from "../nav&footer/FooterB4Login";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import DynamicNavbar from "./DynamicNavbar";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("user"));

  useEffect(() => {
    const handler = () => setIsLoggedIn(!!localStorage.getItem("user"));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <div>
      {isLoggedIn ? <DynamicNavbar /> : <NavbarB4Login />}
      <ScrollToTop />
      <Outlet />
      <FooterB4Login />
    </div>
  );
}
