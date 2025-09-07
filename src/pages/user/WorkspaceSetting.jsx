import { useState } from "react";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WorkspaceSetting() {
  const [openDropdown, setOpenDropdown] = useState(true);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="sticky top-0 bg-blue-700 dark:bg-gray-800 text-white px-10 py-3 flex items-center justify-between z-50 shadow">
        {/* Left */}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-400"></div>
          <span className="font-bold text-3xl">TaskFlow</span>
        </div>

        {/* Middle */}
        <div className="flex max-w-lg flex-1">
          <div className="flex-1 px-6">
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
          {/* Notification bell */}
          <button className="relative">
            <Bell className="w-6 h-6 text-white hover:text-gray-200" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              9
            </span>
          </button>

          {/* Profile dropdown */}
          <div className="relative">
            <button
              className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center font-semibold"
              onClick={() => setOpen(!open)}
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
                  className="absolute right-[-40px] mt-3 w-82 bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
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
                      <button className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center transition duration-300">
                        <span
                          className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                            darkMode ? "translate-x-5" : "translate-x-1"
                          }`}
                        ></span>
                      </button>
                    </li>
                  </ul>

                  {/* Divider */}
                  <div className="border-t border-gray-200 dark:border-gray-700"></div>

                  {/* Bottom actions */}
                  <div className="py-2">
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

          {/* Top-right toggle button */}
          <button onClick={toggleDarkMode} className="cursor-pointer">
            {darkMode ? (
              <MoonIcon className="w-6 h-6 text-yellow-400 hover:text-yellow-200" />
            ) : (
              <SunIcon className="w-6 h-6 text-yellow-400 hover:text-yellow-200" />
            )}
          </button>
        </div>
      </nav>

      {/* Main section */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-300 dark:border-gray-700 h-full fixed top-[56px] left-0 overflow-y-auto">
          <div className="p-4 text-sm">
            {/* Static links */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:text-white hover:bg-blue-600 rounded px-2 py-3">
                <Home size={16} /> Home
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:text-white hover:bg-blue-600 rounded px-2 py-3">
                <LayoutGrid size={16} /> Boards
              </div>
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 cursor-pointer hover:text-white hover:bg-blue-600 rounded px-2 py-3">
                <FileText size={16} /> Templates
              </div>
            </div>
            <div className="border-b my-4 border-gray-400 dark:border-gray-700"></div>

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
                onClick={() => setOpenDropdown(!openDropdown)}
              >
                <span className="flex items-center gap-2 font-medium">
                  🌍 TaskFlow Schedule
                </span>
                {openDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>

              {/* Animated dropdown */}
              <AnimatePresence>
                {openDropdown && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
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
        <main className="flex-1 ml-64 p-8 overflow-y-auto bg-white dark:bg-gray-800 dark:text-white">
          <div className="max-w-3xl space-y-8">
            {/* Workspace header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-500 text-white flex items-center justify-center text-3xl font-bold rounded">
                S
              </div>
              <div>
                <h1 className="text-xl font-semibold flex items-center gap-2">
                  Schedula Workspace <PencilRulerIcon />{" "}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1">
                  🔒 Private
                </p>
              </div>
            </div>

            {/* Visibility */}
            <div>
              <h2 className="font-semibold mb-1">Workspace visibility</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                🔒 Private – This Workspace is private. It's not indexed or
                visible to those outside the Workspace.
              </p>
            </div>

            {/* Owners */}
            <div>
              <h2 className="font-semibold mb-3 flex justify-between">
                Workspace owner{" "}
                <button className="bg-gray-100 dark:bg-gray-700 rounded-sm font-normal text-sm px-4 py-1 hover:bg-gray-300 dark:hover:bg-gray-600">
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
            </div>

            {/* Members */}
            <div>
              <h2 className="font-semibold mb-3">Members</h2>
              <div className="grid grid-cols-2 gap-4">
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
            </div>
          </div>
        </main>
      </div>

      {/* Modal popup */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            {/* Center modal */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-lg max-w-lg w-full p-8 relative">
                <h2 className="text-2xl font-bold mb-2">
                  Let’s build a Workspace
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
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

// Reusable user card component
function UserCard({ name, tag, color, role }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-400 dark:border-gray-600">
      <div
        className={`w-10 h-10 ${color} text-white flex items-center justify-center rounded-full font-medium`}
      >
        {tag}
      </div>
      <div className="flex-1">
        <p className="font-medium">{name}</p>
      </div>
      <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded hover:bg-gray-300 dark:hover:bg-gray-500">
        {role}
      </span>
    </div>
  );
}
