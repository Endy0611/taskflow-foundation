import { Routes, Route, Navigate } from "react-router-dom";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import "./App.css"; // optional

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" replace />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/register" replace />} />
    </Routes>
  );
}
