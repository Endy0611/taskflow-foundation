import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarB4Login from "./components/nav&footer/NavbarB4Login";
import HomePage from "../src/GuestUser/HomePage.jsx";
import FeaturesPage from "./GuestUser/FeaturePage.jsx";
import AboutUs from "./GuestUser/AboutUs.jsx";

export default function App() {
    return (
        <Router>
            <NavbarB4Login />
            <Routes>
                <Route path="/home" element={<HomePage/>} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/about" element={<AboutUs />} />
            </Routes>
        </Router>
    );
}
