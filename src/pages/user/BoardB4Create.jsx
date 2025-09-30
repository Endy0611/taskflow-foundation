import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarB4CreateBoard from "../../components/sidebar/SidebarB4CreateBoard";
import { NavLink } from "react-router-dom";
import TaskFlowChatbot from "../../components/chatbot/Chatbot";

export default function BoardB4Create() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

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
        <SidebarB4CreateBoard
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setShowModal={setShowModal}
        />

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
                  <div
                    key={idx}
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
                  </div>
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
              {["Boardup", "Boardup", "Create new board"].map((title, idx) => (
                <div
                  key={idx}
                  className={`relative rounded-xl overflow-hidden shadow-md border ${
                    title === "Create new board"
                      ? "bg-gray-200 dark:bg-gray-800 flex items-center justify-center cursor-pointer"
                      : "cursor-pointer"
                  }`}
                >
                  {title !== "Create new board" ? (
                    <>
                      <img
                        src={`https://picsum.photos/600/400?random=${idx + 10}`}
                        alt={title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-3 py-1">
                        {title}
                      </div>
                    </>
                  ) : (
                    <span className="text-gray-600 dark:text-gray-300 font-medium">
                      + {title}
                    </span>
                  )}
                </div>
              ))}
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
                  <button className="px-3 py-1.5 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                    Member
                  </button>
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
                {["Boardup", "Create new board"].map((title, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-xl overflow-hidden shadow-md border ${
                      title === "Create new board"
                        ? "bg-gray-200 dark:bg-gray-800 flex items-center justify-center cursor-pointer"
                        : "cursor-pointer"
                    }`}
                  >
                    {title !== "Create new board" ? (
                      <>
                        <img
                          src={`https://picsum.photos/600/400?random=${
                            idx + 20
                          }`}
                          alt={title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-3 py-1">
                          {title}
                        </div>
                      </>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-300 font-medium">
                        + {title}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Floating chatbot button */}
          <img
            src="/src/assets/general/chatbot.png"
            alt="Our Chatbot"
            className="fixed bottom-6 right-6 w-16 h-16 sm:w-20 sm:h-20 z-40 rounded-full shadow-lg cursor-pointer"
            onClick={() => setShowModal(true)}
          />
        </main>
      </div>

      {/* Modal for chatbot */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />

            {/* Chatbot itself */}
            <motion.div
              className="fixed bottom-24 right-8 z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TaskFlowChatbot onClose={() => setShowModal(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
