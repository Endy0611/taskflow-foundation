import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarB4CreateBoard from "../../components/sidebar/SidebarB4CreateBoard";
import { NavLink } from "react-router-dom";
import TaskFlowChatbot from "../../components/chatbot/Chatbot";
import { CreateBoardComponent } from "../../components/task/CreateBoardComponent";

export default function BoardB4Create() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWorkspaceModal, setShowModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showCreateBoard, setShowCreateBoard] = useState(false);

  // Reset sidebar when resizing
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handleChange = () => setSidebarOpen(false);
    handleChange();
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="min-h-[93.5vh] flex flex-col dark:bg-gray-900 dark:text-white">
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
        <div className="md:relative z-50">
          <SidebarB4CreateBoard
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            setShowModal={setShowModal}
          />
        </div>

        <main className="relative flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 lg:pt-10 bg-gray-100 dark:bg-gray-950">
          {/* Templates */}
          <section className="mb-10">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Start with a template and let TaskFlow handle the rest with
              customizable workflows
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {["Kanban Templates", "Kanban Templates", "Kanban Templates"].map(
                (title, idx) => (
                  <NavLink
                    key={idx}
                    to="/projectmanagement"
                    className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer"
                  >
                    <img
                      src={`https://picsum.photos/600/400?random=${idx + 1}`}
                      alt={title}
                      className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-3 py-2">
                      {title}
                    </div>
                  </NavLink>
                )
              )}
            </div>
          </section>

          {/* Recently Viewed */}
          <section className="mb-10">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Recently viewed
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4">
              {["Boardup", "Boardup", "Create new board"].map((title, idx) =>
                title !== "Create new board" ? (
                  <NavLink
                    key={idx}
                    to="/projectmanagement"
                    className="relative rounded-xl overflow-hidden shadow-md border cursor-pointer"
                  >
                    <img
                      src={`https://picsum.photos/600/400?random=${idx + 10}`}
                      alt={title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-3 py-1">
                      {title}
                    </div>
                  </NavLink>
                ) : (
                  <div
                    key={idx}
                    onClick={() => setShowCreateBoard(true)}
                    className="relative rounded-xl overflow-hidden shadow-md border bg-gray-200 dark:bg-gray-800 flex items-center justify-center cursor-pointer"
                  >
                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                      + {title}
                    </span>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Your Workspaces */}
          <section className="mb-16">
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Your Workspaces
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              {/* Workspace header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-sky-500 text-white flex items-center justify-center rounded-md font-bold">
                    S
                  </div>
                  <span className="font-semibold">TaskFlow Workspaces</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <NavLink
                    to="/workspaceboard"
                    className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Boards
                  </NavLink>
                  <NavLink
                    to="/workspacemember"
                    className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Member
                  </NavLink>
                  <NavLink
                    to="/workspacesetting"
                    className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Setting
                  </NavLink>
                  <button className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    Upgrade
                  </button>
                </div>
              </div>

              {/* Workspace boards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {["Boardup", "Create new board"].map((title, idx) =>
                  title !== "Create new board" ? (
                    <NavLink
                      key={idx}
                      to="/projectmanagement"
                      className="relative rounded-xl overflow-hidden shadow-md border cursor-pointer"
                    >
                      <img
                        src={`https://picsum.photos/600/400?random=${idx + 20}`}
                        alt={title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-3 py-1">
                        {title}
                      </div>
                    </NavLink>
                  ) : (
                    <div
                      key={idx}
                      onClick={() => setShowCreateBoard(true)}
                      className="relative rounded-xl overflow-hidden shadow-md border bg-gray-200 dark:bg-gray-800 flex items-center justify-center cursor-pointer"
                    >
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        + {title}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* Floating chatbot button */}
          <img
            src="/src/assets/general/chatbot.png"
            alt="Our Chatbot"
            className="fixed bottom-6 right-6 w-16 h-16 sm:w-20 sm:h-20 z-40 rounded-full shadow-lg cursor-pointer bg-white"
            onClick={() => setShowChatbot(true)}
          />
        </main>
      </div>

      <AnimatePresence>
        {showChatbot && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChatbot(false)}
            />
            <motion.div
              className="fixed bottom-24 right-8 z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TaskFlowChatbot onClose={() => setShowChatbot(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showWorkspaceModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
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
                  Let's build a Workspace
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

                <NavLink
                  to="/board"
                  className="block w-full text-center bg-blue-600 text-white font-medium py-2.5 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  Continue
                </NavLink>

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
      <AnimatePresence>
        {showCreateBoard && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateBoard(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <CreateBoardComponent onClose={() => setShowCreateBoard(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
