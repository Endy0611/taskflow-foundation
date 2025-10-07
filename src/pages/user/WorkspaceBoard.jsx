import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarComponent from "../../components/sidebar/SidebarComponent";
import TaskFlowChatbot from "../../components/chatbot/Chatbot";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

export default function WorkspaceBoard() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isTabletOrBelow, setIsTabletOrBelow] = useState(
    window.innerWidth < 1024
  );

  // ✅ Detect theme
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

  // ✅ Track window size to auto close sidebar when resizing
  useEffect(() => {
    const handleResize = () => {
      const isTablet = window.innerWidth < 1024;
      setIsTabletOrBelow(isTablet);
      if (!isTablet) setSidebarOpen(true); // show by default on desktop
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <div className="flex flex-1 overflow-hidden">
        {/* ✅ Overlay for tablet & mobile */}
        {sidebarOpen && isTabletOrBelow && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ✅ Sidebar */}
        <SidebarComponent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setShowModal={setShowModal}
        />

        {/* ✅ Main Content */}
        <main
          className={`flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 bg-gray-100 dark:bg-gray-900 transition-all duration-300 ${
            sidebarOpen && isTabletOrBelow
              ? "opacity-40 pointer-events-none"
              : ""
          }`}
          onClick={() => {
            if (isTabletOrBelow && sidebarOpen) setSidebarOpen(false);
          }}
        >
          {/* ===== Header ===== */}
          <div className="mb-8 sm:mb-10">
            {/* ✅ Toggle Sidebar for tablet & mobile */}
            <button
              className="lg:hidden p-2 rounded-md bg-primary text-white shadow-md"
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 mt-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-pink-500 text-white text-xl sm:text-2xl font-bold shadow-lg">
                TF
              </div>
              <div className="mt-3 sm:mt-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  TaskFlow Workspace
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                  🔒 Private workspace
                </p>
              </div>
            </div>
          </div>

          {/* ===== Boards Section ===== */}
          <section className="mb-10 sm:mb-12">
            <h2 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
              Your Boards
            </h2>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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

          <div className="border-t border-gray-300 dark:border-gray-700 my-8 sm:my-10" />

          {/* ===== All Boards ===== */}
          <section>
            <h2 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 mb-3 sm:mb-4">
              All Boards in this Workspace
            </h2>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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

          {/* ===== Floating Chatbot ===== */}
          <img
            src="/src/assets/general/chatbot.png"
            alt="Chatbot"
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-lg cursor-pointer bg-white z-40 hover:scale-105 transition-transform duration-200"
            onClick={() => setShowChatbot(true)}
          />
        </main>
      </div>

      {/* Chatbot */}
      <AnimatePresence>
        {showChatbot && (
          <>
            <motion.div
              className="fixed bottom-20 right-3 sm:bottom-24 sm:right-8 z-50 w-[90%] max-w-[380px] sm:max-w-[420px] md:max-w-[480px]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] sm:max-h-[85vh] flex flex-col">
                <TaskFlowChatbot onClose={() => setShowChatbot(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ===== BoardCard Component ===== */
function BoardCard({ title, subtitle, color, image, isCreate }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04, y: -3 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative rounded-2xl shadow-lg overflow-hidden cursor-pointer bg-white/70 dark:bg-gray-700/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-600/50"
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-32 sm:h-36 md:h-40 object-cover group-hover:opacity-90 transition"
        />
      ) : (
        <div
          className={`w-full h-32 sm:h-36 md:h-40 flex items-center justify-center bg-gradient-to-br ${color} text-white text-lg font-semibold`}
        >
          {isCreate ? "+" : title}
        </div>
      )}

      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </motion.div>
  );
}
