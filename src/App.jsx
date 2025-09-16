// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestHomePage from "./GuestUser/HomePage";
import FeaturePage from "./GuestUser/FeaturePage";
import AboutUs from "./GuestUser/AboutUs";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import RootLayout from "./components/layout/RootLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>

          <Route path="/" element={<GuestHomePage />} />
          <Route path="/features" element={<FeaturePage />} />
          <Route path="/about" element={<AboutUs />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
