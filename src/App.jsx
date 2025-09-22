// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";

import FeaturePage from "./pages/GuestUser/FeaturePage";
import AboutUs from "./pages/GuestUser/AboutUs";
import RootLayout from "./components/layout/RootLayout";
import GuestHomePage from "./pages/GuestUser/HomePage";
import TemplatePage from "./pages/GuestUser/TemplatePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<GuestHomePage />} />
          <Route path="/features" element={<FeaturePage />} />
          <Route path="/templates" element={<TemplatePage />} />
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

