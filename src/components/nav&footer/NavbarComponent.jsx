import { useState, useEffect } from "react";
import { Search, Bell, SunIcon, MoonIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function NavbarComponent({
  user,
  darkMode,
  toggleDarkMode,
  setSidebarOpen,
  onLogout,
}) {
  const [open, setOpen] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  // ✅ Dynamically calculate navbar height and apply body padding
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      setNavHeight(navbar.offsetHeight);
      document.body.style.paddingTop = `${navbar.offsetHeight}px`;
    }

    const handleResize = () => {
      const updatedHeight = document.getElementById("navbar")?.offsetHeight || 0;
      setNavHeight(updatedHeight);
      document.body.style.paddingTop = `${updatedHeight}px`;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.paddingTop = "0px"; // cleanup when unmount
    };
  }, []);

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 w-full bg-primary text-white px-3 sm:px-5 md:px-7 lg:px-10 py-2 md:py-3 flex items-center justify-between z-50 shadow-md transition-all"
    >
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-green-400" />
        <span className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
          TaskFlow
        </span>
      </div>

      {/* Search Bar (hidden on mobile) */}
      <div className="hidden md:flex items-center flex-1 max-w-md lg:max-w-lg mx-4">
        <div className="flex-1 px-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-white w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-9 pr-3 py-1.5 rounded bg-white dark:bg-gray-700 dark:text-white text-sm text-black placeholder-gray-400"
            />
          </div>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 px-3 py-1 rounded text-sm text-white whitespace-nowrap">
          Create
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 relative">
        {/* Notification */}
        <button className="relative hidden sm:block">
          <Bell className="w-5 h-5 md:w-6 md:h-6 text-white hover:text-gray-200" />
          <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-[1px] rounded-full">
            9
          </span>
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-orange-400 flex items-center justify-center font-semibold overflow-hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              initials
            )}
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-56 sm:w-64 md:w-72 text-black bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
              >
                {/* User Info */}
                <div className="px-4 py-3 flex items-center gap-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center font-semibold text-white overflow-hidden">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      initials
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">
                      {user?.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate max-w-[130px] sm:max-w-[160px]">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* Dropdown Menu */}
                <ul className="py-2 text-sm">
                  <li
                    onClick={() => {
                      setOpen(false);
                      navigate("/switch-account");
                    }}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    👥 Switch accounts
                  </li>

                  <li
                    onClick={() => {
                      setOpen(false);
                      navigate("/profile");
                    }}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    🙍 Profile & Visibility
                  </li>

                  <li
                    onClick={() => {
                      setOpen(false);
                      navigate("/settingworkspace");
                    }}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                  >
                    ⚙️ Settings
                  </li>

                  {/* Dark mode */}
                  <li
                    onClick={toggleDarkMode}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex justify-between items-center"
                  >
                    <span className="text-sm">
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

                {/* Logout */}
                <div className="py-2 border-t border-gray-200 dark:border-gray-700">
                  <div
                    className="px-4 py-2 hover:bg-red-100 dark:hover:bg-red-700 cursor-pointer text-sm text-red-600"
                    onClick={() => {
                      setOpen(false);
                      onLogout();
                    }}
                  >
                    🚪 Log out
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dark mode toggle button */}
        <button onClick={toggleDarkMode} className="cursor-pointer">
          {darkMode ? (
            <SunIcon className="w-5 h-5 md:w-6 md:h-6 text-yellow-300 hover:text-yellow-200" />
          ) : (
            <MoonIcon className="w-5 h-5 md:w-6 md:h-6 text-yellow-300 hover:text-yellow-200" />
          )}
        </button>
      </div>
    </nav>
  );
}
