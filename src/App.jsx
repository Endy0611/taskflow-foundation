import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

/* Layouts */
import RootLayout from "./components/layout/RootLayout";
import UserLayout from "./components/layout/UserLayout";
import WorkspaceLayout from "./components/layout/WorkspaceLayout";

/* Guest pages */
import GuestHomePage from "./pages/GuestUser/HomePage";
import FeaturePage from "./pages/GuestUser/FeaturePage";
import TemplatePage from "./pages/GuestUser/TemplatePage";
import AboutUs from "./pages/GuestUser/AboutUs";

/* Auth pages */
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

/* User pages */
import HomeUser from "./pages/user/HomeUser";
import TemplateUser from "./pages/user/TemplateUser";
/* Change BoardB4Create to Board */
import Board from "./pages/user/Board";  // Single dynamic Board file
import WorkspaceBoard from "./pages/user/WorkspaceBoard";
import WorkspaceMember from "./pages/user/WorkspaceMember";
import WorkspaceSetting from "./pages/user/WorkspaceSetting";

/* Profile & Switch Account */
import ProfilePage from "./pages/profile/ProfilePage";
import SwitchAccountPage from "./pages/profile/SwitchAccountPage";

/* Settings / Project pages */
import SettingWorkspace from "./pages/user/SettingWorkspace"; // dedicated settings page
import ProjectManagement from "./pages/user/ProjectManagement";
import OfflineMode from "./utils/OfflineMode";

/* 404 fallback */
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Oops! The page you’re looking for doesn’t exist.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="text-white bg-blue-600 px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go Back
      </button>
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

        {/* User routes (general user dashboard area) */}
        <Route element={<UserLayout />}>
          <Route path="/homeuser" element={<HomeUser />} />
          <Route path="/templateuser" element={<TemplateUser />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/switch-account" element={<SwitchAccountPage />} />
        </Route>

        {/* Workspace routes (boards, members, settings) */}
        <Route element={<WorkspaceLayout />}>
          {/* Use a single 'Board' component for all board routes */}
          <Route path="/board" element={<Board />} /> 
          <Route path="/board/:workspaceId" element={<Board />} />  {/* Dynamic route */}
          <Route path="/workspaceboard" element={<WorkspaceBoard />} />
          <Route path="/workspacemember" element={<WorkspaceMember />} />
          <Route path="/projectmanagement" element={<ProjectManagement />} />

          {/* Overview page for a workspace area */}
          <Route path="/workspacesetting" element={<WorkspaceSetting />} />

          {/* ✅ Dedicated settings page (canonical) */}
          <Route path="/workspaces/:id/settings" element={<SettingWorkspace />} />

          {/* (Optional) Fallback settings path without id */}
          <Route path="/settingworkspace" element={<SettingWorkspace />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
        <Route path="/offline" element={<OfflineMode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
