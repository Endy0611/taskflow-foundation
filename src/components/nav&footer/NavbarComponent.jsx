import { useState } from "react";
import {
  Search,
  Bell,
  SunIcon,
  MoonIcon,
  Menu,
  Home,
  LayoutGrid,
  FileText,
  ChevronUp,
  ChevronDown,
  X,
} from "lucide-react";
import { useNavigate, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function NavItem({ icon, text, to, onClick }) {
  return (
    <NavLink
      to={to}
      end
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded cursor-pointer text-gray-700 dark:text-gray-200
        ${isActive ? "bg-blue-700 text-white" : ""}
        hover:bg-blue-600 hover:text-white`
      }
    >
      {icon} {text}
    </NavLink>
  );
}

export default function NavbarComponent({
  darkMode,
  toggleDarkMode,
  sidebarOpen,
  setSidebarOpen,
  setShowModal,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="sticky top-0 bg-blue-700 text-white px-4 md:px-10 py-3 flex items-center justify-between z-50 shadow">
        {/* Left */}
        <div className="flex items-center gap-2">
          {/* Hamburger visible only on mobile */}
          <button
            className="md:hidden p-2 -ml-2 rounded hover:bg-blue-600"
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="w-4 h-4 rounded-full bg-green-400" />
          <span className="font-bold text-xl md:text-3xl">TaskFlow</span>
        </div>

        {/* Middle (hidden on mobile) */}
        <div className="hidden md:flex max-w-lg flex-1">
          <div className="flex-1 md:px-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-9 pr-3 py-1.5 rounded bg-white dark:bg-gray-700 dark:text-white text-sm text-black"
              />
            </div>
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded text-sm text-white">
            Create
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 relative">
          <button className="relative hidden sm:block">
            <Bell className="w-6 h-6 text-white hover:text-gray-200" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              9
            </span>
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center font-semibold"
              onClick={() => setProfileOpen((v) => !v)}
            >
              OE
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-72 text-black bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                >
                  {/* User Info */}
                  <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-semibold text-white">
                      OE
                    </div>
                    <div>
                      <p className="font-semibold">Ong Endy</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        endyong@gmail.com
                      </p>
                    </div>
                  </div>

                  {/* Menu items */}
                  <ul className="py-2 text-sm">
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
                      👥 Switch accounts
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
                      🙍 Profile & Visibility
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
                      🕓 Activity
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2">
                      ⚙️ Settings
                    </li>
                    {/* Dark mode toggle */}
                    <li
                      onClick={toggleDarkMode}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center justify-between"
                    >
                      <span className="flex items-center gap-2">
                        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
                      </span>
                      <span className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center">
                        <span
                          className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                            darkMode ? "translate-x-5" : "translate-x-1"
                          }`}
                        />
                      </span>
                    </li>
                  </ul>

                  {/* Bottom actions */}
                  <div className="py-2 border-t border-gray-200 dark:border-gray-700">
                    <div
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-blue-600"
                      onClick={() => setShowModal(true)}
                    >
                      ➕ Create Workspace
                    </div>
                    <div
                      className="px-4 py-2 hover:bg-red-100 dark:hover:bg-red-700 cursor-pointer text-sm text-red-600"
                      onClick={() => {
                        localStorage.clear();
                        navigate("/login");
                      }}
                    >
                      🚪 Log out
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Top-right dark mode toggle */}
          <button onClick={toggleDarkMode} className="cursor-pointer">
            {darkMode ? (
              <SunIcon className="w-6 h-6 text-yellow-300 hover:text-yellow-200" />
            ) : (
              <MoonIcon className="w-6 h-6 text-yellow-300 hover:text-yellow-200" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-in Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 left-0 w-64 z-40 bg-gray-50 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 shadow-lg md:hidden"
          >
            <div className="p-4 text-sm h-full flex flex-col">
              {/* Close button */}
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold">Menu</span>
                <button
                  aria-label="Close sidebar"
                  className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X />
                </button>
              </div>

              {/* Static links */}
              <div className="space-y-1">
                <NavItem
                  icon={<Home size={16} />}
                  text="Home"
                  to="/homeuser"
                  onClick={() => setSidebarOpen(false)}
                />
                <NavItem
                  icon={<LayoutGrid size={16} />}
                  text="Boards"
                  to="/board"
                  onClick={() => setSidebarOpen(false)}
                />
                <NavItem
                  icon={<FileText size={16} />}
                  text="Templates"
                  to="/templateuser"
                  onClick={() => setSidebarOpen(false)}
                />
              </div>

              <div className="border-b my-4 border-gray-400 dark:border-gray-700" />

              {/* Workspace dropdown */}
              <div>
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                  Workspace
                </h3>
                <div
                  className={`flex items-center justify-between cursor-pointer p-2 rounded ${
                    openDropdown
                      ? "bg-blue-700 text-white"
                      : "text-gray-800 dark:text-gray-200"
                  } hover:bg-blue-600 hover:text-white`}
                  onClick={() => setOpenDropdown((v) => !v)}
                >
                  <span className="flex items-center gap-2 font-medium">
                    🌍 TaskFlow
                  </span>
                  {openDropdown ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>

                <AnimatePresence>
                  {openDropdown && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden text-gray-600 dark:text-gray-300 rounded-b-lg border border-gray-100 dark:border-gray-700"
                    >
                      <NavLink
                        to="/workspaceboard"
                        className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        Boards
                      </NavLink>
                      <NavLink
                        to="/workspacemember"
                        className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        Members
                      </NavLink>
                      <NavLink
                        to="/workspacesetting"
                        className="block p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        Settings
                      </NavLink>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  className="mt-3 text-blue-700 dark:text-white text-sm hover:bg-blue-600 hover:text-white rounded py-2 px-3 w-full flex items-center gap-2 border border-blue-600 dark:border-blue-400"
                  onClick={() => setShowModal(true)}
                >
                  + Create a Workspace
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
