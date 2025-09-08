import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NavbarComponent from "../../components/nav&footer/NavbarComponent";
import SidebarComponent from "../../components/sidebar/SidebarComponent";
import { PencilRulerIcon } from "lucide-react";

export default function WorkspaceBoard() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Initialize dark mode
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

  // Reset sidebar when resizing
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setSidebarOpen(false);
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
      <NavbarComponent
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setShowModal={setShowModal}
      />

      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <SidebarComponent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setShowModal={setShowModal}
        />

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

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
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

function BoardCard({ title, subtitle, color, image, isCreate }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative rounded-2xl shadow-lg overflow-hidden cursor-pointer bg-white/70 dark:bg-gray-700/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-600/50"
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-36 object-cover group-hover:opacity-90 transition"
        />
      ) : (
        <div
          className={`w-full h-36 flex items-center justify-center bg-gradient-to-br ${color} text-white text-lg font-semibold`}
        >
          {isCreate ? "+" : title}
        </div>
      )}

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </motion.div>
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
