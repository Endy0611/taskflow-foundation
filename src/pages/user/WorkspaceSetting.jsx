import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Home,
  LayoutGrid,
  FileText,
  Search,
  Bell,
  PencilRulerIcon,
  SunIcon,
  MoonIcon,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkspaceSetting() {
  const [openDropdown, setOpenDropdown] = useState(true);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize dark mode with system preference / saved choice
  useEffect(() => {
    const preferDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (preferDark) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Close mobile sidebar whenever we cross into desktop (>= md)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handleChange = () => {
      // ensure no mobile overlay state leaks into desktop
      setSidebarOpen(false);
    };
    // run once to normalize when mounting
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  };

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
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
            {sidebarOpen ? <Menu /> : <Menu />}
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
                    <div className="px-4 py-2 hover:bg-red-100 dark:hover:bg-red-700 cursor-pointer text-sm text-red-600">
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

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar: always rendered; slide with transforms on mobile; always visible on md+ */}
        <aside
          className={[
            "transform transition-transform duration-300 will-change-transform",
            "fixed inset-y-0 left-0 w-64 z-40 bg-gray-50 dark:bg-gray-900",
            "border-r border-gray-300 dark:border-gray-700",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
            "md:static md:translate-x-0 md:inset-auto md:h-auto md:z-0",
            "top-[56px] md:top-0",
          ].join(" ")}
        >
          <div className="p-4 text-sm">
            {/* Close (mobile only) */}
            <div className="flex items-center justify-between md:hidden mb-2">
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
              <NavItem icon={<Home size={16} />} text="Home" />
              <NavItem icon={<LayoutGrid size={16} />} text="Boards" />
              <NavItem icon={<FileText size={16} />} text="Templates" />
            </div>
            <div className="border-b my-4 border-gray-400 dark:border-gray-700" />

            {/* Workspace */}
            <div className="mt-6">
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                Workspace
              </h3>
              <div
                className={`flex items-center justify-between cursor-pointer p-2 rounded ${
                  openDropdown
                    ? "bg-blue-600 text-white"
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
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden text-gray-600 dark:text-gray-300 rounded-b-lg shadow-lg border border-gray-100 dark:border-gray-700"
                  >
                    <div className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2">
                      Boards
                    </div>
                    <div className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2">
                      Members
                    </div>
                    <div className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2">
                      Settings
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                className="mt-3 text-blue-600 dark:text-blue-400 text-sm hover:bg-blue-600 hover:text-white rounded py-2 px-3 w-full justify-start flex items-center gap-2 border border-blue-600 dark:border-blue-400"
                onClick={() => setShowModal(true)}
              >
                + Create a Workspace
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 md:pl-32 p-4 md:p-8 overflow-y-auto bg-white dark:bg-gray-800 dark:text-white">
          <div className="max-w-3xl space-y-8">
            {/* Workspace header */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-12 h-12 bg-orange-500 text-white flex items-center justify-center text-3xl font-bold rounded">
                S
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                  Schedula Workspace <PencilRulerIcon />
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                  🔒 Private
                </p>
              </div>
            </div>

            {/* Visibility */}
            <section>
              <h2 className="font-semibold mb-1 text-base md:text-lg">
                Workspace visibility
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
                🔒 Private – This Workspace is private. It's not indexed or
                visible to those outside the Workspace.
              </p>
            </section>

            {/* Owners */}
            <section>
              <h2 className="font-semibold mb-3 flex justify-between items-center text-base md:text-lg">
                Workspace owner{" "}
                <button className="bg-gray-100 dark:bg-gray-700 rounded-sm font-normal text-xs md:text-sm px-3 md:px-4 py-1 hover:bg-gray-300 dark:hover:bg-gray-600">
                  Invite Member
                </button>
              </h2>
              <div className="space-y-3">
                <UserCard
                  name="Tith Cholna"
                  tag="TC"
                  color="bg-blue-600"
                  role="Owner"
                />
                <UserCard
                  name="Tith Cholna"
                  tag="TC"
                  color="bg-purple-500"
                  role="Admin"
                />
              </div>
            </section>

            {/* Members */}
            <section>
              <h2 className="font-semibold mb-3 text-base md:text-lg">
                Members
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <UserCard
                  name="Dorn Dana"
                  tag="DD"
                  color="bg-red-500"
                  role="Member"
                />
                <UserCard
                  name="Mon Sreynet"
                  tag="MS"
                  color="bg-blue-500"
                  role="Member"
                />
                <UserCard
                  name="Lonh Reaksmey"
                  tag="LR"
                  color="bg-purple-500"
                  role="Member"
                />
                <UserCard
                  name="Ong Endy"
                  tag="OE"
                  color="bg-teal-500"
                  role="Member"
                />
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* Modal popup */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            {/* Center modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-lg max-w-lg w-full p-6 md:p-8 relative">
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                  Let’s build a Workspace
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base">
                  Boost your productivity by making it easier for everyone to
                  access boards in one location.
                </p>

                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Workspace name
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mb-2 bg-white dark:bg-gray-700 dark:text-white"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  This is the name of your company, team or organization.
                </p>

                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Workspace description
                </label>
                <textarea
                  className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mb-6 bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="Our team organizes everything here."
                  rows="3"
                />

                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Continue
                </button>

                {/* Close button */}
                <button
                  className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  ✖
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Reusable NavItem */
function NavItem({ icon, text }) {
  return (
    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:text-white hover:bg-blue-600 rounded px-2 py-3">
      {icon} {text}
    </div>
  );
}

/* Reusable user card */
function UserCard({ name, tag, color, role }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-400 dark:border-gray-600">
      <div
        className={`w-10 h-10 ${color} text-white flex items-center justify-center rounded-full font-medium`}
      >
        {tag}
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm md:text-base">{name}</p>
      </div>
      <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded hover:bg-gray-300 dark:hover:bg-gray-500">
        {role}
      </span>
    </div>
  );
}
