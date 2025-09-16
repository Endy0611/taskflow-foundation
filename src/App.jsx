import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import GuestHomePage from "./GuestUser/HomePage";
import FeaturePage from "./GuestUser/FeaturePage";
import AboutUs from "./GuestUser/AboutUs";

function App() {
  return (
    <>
      <Routes>
        <Route element={<GuestHomePage />}>
          <Route path="/" element={<GuestHomePage/>} />
          <Route path="/products" element={<FeaturePage />} />
          <Route path="/products/:id" element={<AboutUs />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
