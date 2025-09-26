// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import "./App.css";

export default function App() {
  return (
    <Routes>
      {/* default -> login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* catch-all -> login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
