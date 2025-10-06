import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import UserLayout from "./components/layout/UserLayout";

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
import WorkspaceLayout from "./components/layout/WorkspaceLayout";
import BoardB4Create from "./pages/user/BoardB4Create";
import WorkspaceSetting from "./pages/user/WorkspaceSetting";
import WorkspaceBoard from "./pages/user/WorkspaceBoard";
import Board from "./pages/user/Board";
import WorkspaceMember from "./pages/user/WorkspaceMember";

import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1JFaF5cXGRCf1NpR2FGfV5ycUVHYFZURnxfQE0DNHVRdkdmWXZccnZXQ2RZVUZyWUdWYEg="
);


// 404 Not Found page
import NotFoundPage from "./utils/404";
import ProjectManagement from "./pages/user/ProjectManagement";

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

        {/* Auth */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* User routes */}
        <Route element={<UserLayout />}>
          <Route path="/homeuser" element={<HomeUser />} />
          <Route path="/templateuser" element={<TemplateUser />} />
        </Route>

        {/* Workspace */}
        <Route element={<WorkspaceLayout />}>
          <Route path="/boardb4create" element={<BoardB4Create />} />
          <Route path="/board" element={<Board />} />
          <Route path="/workspacesetting" element={<WorkspaceSetting />} />
          <Route path="/workspaceboard" element={<WorkspaceBoard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
