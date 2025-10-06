import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import RootLayout from "./components/layout/RootLayout";
import UserLayout from "./components/layout/UserLayout";
import WorkspaceLayout from "./components/layout/WorkspaceLayout";

// Guest pages
import GuestHomePage from "./pages/GuestUser/HomePage";
import FeaturePage from "./pages/GuestUser/FeaturePage";
import TemplatePage from "./pages/GuestUser/TemplatePage";
import AboutUs from "./pages/GuestUser/AboutUs";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// User pages
import HomeUser from "./pages/user/HomeUser";
import TemplateUser from "./pages/user/TemplateUser";
import BoardB4Create from "./pages/user/BoardB4Create";
import WorkspaceBoard from "./pages/user/WorkspaceBoard";
import Board from "./pages/user/Board";

// Profile & Switch Account
import ProfilePage from "./pages/profile/ProfilePage";
import SwitchAccountPage from "./pages/profile/SwitchAccountPage";

// ✅ Import your new SettingWorkspace page
import SettingWorkspace from "./pages/user/SettingWorkspace";

// 404 fallback
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <a
        href="/"
        className="text-white bg-blue-600 px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go Home
      </a>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest routes */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<GuestHomePage />} />
          <Route path="/features" element={<FeaturePage />} />
          <Route path="/templates" element={<TemplatePage />} />
          <Route path="/about" element={<AboutUs />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* User routes */}
        <Route element={<UserLayout />}>
          <Route path="/homeuser" element={<HomeUser />} />
          <Route path="/templateuser" element={<TemplateUser />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/switch-account" element={<SwitchAccountPage />} />
          <Route path="/settingworkspace" element={<SettingWorkspace />} /> {/* ✅ Add route */}
        </Route>

        {/* Workspace routes */}
        <Route element={<WorkspaceLayout />}>
          <Route path="/boardb4create" element={<BoardB4Create />} />
          <Route path="/board" element={<Board />} />
          <Route path="/workspaceboard" element={<WorkspaceBoard />} />
        </Route>

        {/* 404 fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
