// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Guest pages
import FeaturePage from "./pages/GuestUser/FeaturePage";
import AboutUs from "./pages/GuestUser/AboutUs";
import RootLayout from "./components/layout/RootLayout";
import GuestHomePage from "./pages/GuestUser/HomePage";
import TemplatePage from "./pages/GuestUser/TemplatePage";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";

// User pages
import HomeUser from "./pages/user/HomeUser";
import TemplateUser from "./pages/user/TemplateUser";

//Worksapce 
import WorkspaceLayout from "./components/layout/WorkspaceLayout";
import BoardB4Create from "./pages/user/BoardB4Create";
import WorkspaceSetting from "./pages/user/WorkspaceSetting";
import WorkspaceBoard from "./pages/user/WorkspaceBoard";
import UserLayout from "./components/layout/UserLayout";
import Board from "./pages/user/Board";
import WorkspaceMember from "./pages/user/WorkspaceMember";

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
          
        </Route>

        <Route element={<WorkspaceLayout/>}>
          <Route path="/boardb4create" element={<BoardB4Create />} />
          <Route path="/board" element={<Board/>}/>
          <Route path="/workspacemember" element={<WorkspaceMember/>}/>
          <Route path="/workspacesetting" element={<WorkspaceSetting />} />
          <Route path="/workspaceboard" element={<WorkspaceBoard />} />
        </Route>

        <Route path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
