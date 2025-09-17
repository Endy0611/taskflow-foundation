import { useState } from "react";
import { Search, Bell, SunIcon, MoonIcon, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NavbarComponent({
  darkMode,
  toggleDarkMode,
  setSidebarOpen,
  sidebarOpen,
  setShowModal,
}) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
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
          {/* You can swap Menu/X icons here if needed */}
          <span className="material-icons">
            <Menu />
          </span>
        </button>

        <div className="w-4 h-4 rounded-full bg-green-400" />
        <span className="font-bold text-xl md:text-3xl">TaskFlow</span>
      </div>

      {/* Middle (hidden on mobile) */}
      <div className="hidden md:flex max-w-lg flex-1">
        <div className="flex-1 md:px-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-200/80 w-4 h-4" />
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
            onClick={() => setOpen((v) => !v)}
          >
            OE
          </button>

          <AnimatePresence>
            {open && (
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
                      // (Optional) clear localStorage/session before logout
                      localStorage.clear();

                      // Redirect to login page
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
  );
}
