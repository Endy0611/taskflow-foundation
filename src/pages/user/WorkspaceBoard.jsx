import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import NavbarComponent from "../../components/nav&footer/NavbarComponent";
import SidebarComponent from "../../components/sidebar/SidebarComponent";

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
        <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-gray-100 dark:bg-gray-900">
          {/* Workspace header */}
          <div className="mb-10">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-white text-2xl font-bold shadow-lg">
                TF
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  TaskFlow Workspace
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  🔒 Private workspace
                </p>
              </div>
            </div>
          </div>

          {/* Your Boards */}
          <section className="mb-12">
            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Your Boards
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <BoardCard
                title="Project Management"
                color="from-blue-600 to-indigo-500"
              />
              <BoardCard
                title="Create new board"
                color="from-purple-500 to-pink-500"
                subtitle="9 remaining"
                isCreate
              />
            </div>
          </section>
          {/* Divider */}
          <div className="border-t border-gray-300 dark:border-gray-700 my-10" />
          {/* All Boards in this Workspace */}
          <section>
            <h2 className="text-base font-semibold text-gray-700 dark:text-gray-300 mb-4">
              All Boards in this Workspace
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <BoardCard
                title="Project Management"
                image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"
              />
              <BoardCard
                title="Java - Expense Tracker"
                image="https://images.unsplash.com/photo-1554224154-22dec7ec8818?q=80&w=800&auto=format&fit=crop"
              />
              <BoardCard
                title="Document"
                image="https://images.unsplash.com/photo-1587614295999-6f0de2c48f9f?q=80&w=800&auto=format&fit=crop"
              />
              <BoardCard
                title="Create new board"
                color="from-blue-500 to-teal-400"
                subtitle="7 remaining"
                isCreate
              />
            </div>
          </section>
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
