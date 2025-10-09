import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarComponent from "../../components/sidebar/SidebarComponent";
import { NavLink } from "react-router-dom";
import TaskFlowChatbot from "../../components/chatbot/Chatbot";
import { CreateBoardComponent } from "../../components/task/CreateBoardComponent";
import { Menu } from "lucide-react";

export default function Board() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showCreateBoard, setShowCreateBoard] = useState(false);

  // Handle sidebar reset when resizing
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e) => {
      if (!e.matches) setSidebarOpen(false);
    };
    handleChange(mq);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      {/* Main */}
      <div className="flex flex-1 overflow-hidden">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <SidebarComponent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setShowModal={setShowModal}
        />

        <main
          className="relative flex-1 overflow-y-auto 
          px-3 sm:px-6 lg:px-10 
          pt-5 sm:pt-8 lg:pt-10 
          bg-gray-100 dark:bg-gray-950 
          transition-all duration-300 ease-in-out"
        >
          {/* Hamburger Button (Mobile Only) */}
          <button
            className="lg:hidden p-2 mb-4 rounded-md bg-primary text-white"
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Templates Section */}
          <section className="mb-10">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Start with a template and let TaskFlow handle the rest
            </h2>
            <div
              className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-2 
              lg:grid-cols-3 
              gap-4 md:gap-6"
            >
              {["Kanban Templates", "Kanban Templates", "Kanban Templates"].map(
                (title, idx) => {
                  const imgUrl = `https://picsum.photos/1200/800?random=${
                    idx + 1
                  }`;
                  return (
                    <NavLink
                      key={idx}
                      to="/projectmanagement"
                      onClick={() =>
                        localStorage.setItem("boardBackground", imgUrl)
                      }
                      className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer"
                    >
                      <img
                        src={imgUrl}
                        alt={title}
                        className="w-full h-40 md:h-44 lg:h-48 object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-3 py-2">
                        {title}
                      </div>
                    </NavLink>
                  );
                }
              )}
            </div>
          </section>

          {/* Recently Viewed Section */}
          <section className="mb-10">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Recently viewed
            </h2>
            <div
              className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4 
                gap-4 md:gap-6"
            >
              {["Boardup", "Boardup", "Create new board"].map((title, idx) => {
                const imgUrl = `https://picsum.photos/1200/800?random=${
                  idx + 10
                }`;
                return title !== "Create new board" ? (
                  <NavLink
                    key={idx}
                    to="/projectmanagement"
                    onClick={() =>
                      localStorage.setItem("boardBackground", imgUrl)
                    }
                    className="relative rounded-xl overflow-hidden shadow-md border cursor-pointer"
                  >
                    <img
                      src={imgUrl}
                      alt={title}
                      className="w-full h-36 md:h-44 lg:h-48 object-cover"
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
                    <span className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base">
                      + {title}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Your Workspaces Section */}
          <section className="mb-20">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Your Workspaces
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-md font-bold">
                    S
                  </div>
                  <span className="font-semibold text-base sm:text-lg">
                    TaskFlow Workspace
                  </span>
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 flex-nowrap">
                  {["Boards", "Member", "Setting", "Update"].map((item, i) => (
                    <NavLink
                      key={i}
                      to={`/workspace${item.toLowerCase()}`}
                      className="flex-shrink-0 px-3 py-1.5 border rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 whitespace-nowrap"
                    >
                      {item}
                    </NavLink>
                  ))}
                </div>
              </div>

              {/* Workspace Boards */}
              <div
                className="
                grid 
                grid-cols-1 
                sm:grid-cols-2 
                md:grid-cols-2 
                lg:grid-cols-3 
                gap-4 md:gap-6"
              >
                {["Boardup", "Create new board"].map((title, idx) => {
                  const imgUrl = `https://picsum.photos/1200/800?random=${
                    idx + 20
                  }`;
                  return title !== "Create new board" ? (
                    <NavLink
                      key={idx}
                      to="/projectmanagement"
                      onClick={() =>
                        localStorage.setItem("boardBackground", imgUrl)
                      }
                      className="relative rounded-xl overflow-hidden shadow-md border cursor-pointer"
                    >
                      <img
                        src={imgUrl}
                        alt={title}
                        className="w-full h-36 md:h-44 lg:h-48 object-cover"
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
                      <span className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base">
                        + {title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Floating Chatbot Button */}
          <img
            src="/src/assets/general/chatbot.png"
            alt="Chatbot"
            className="fixed bottom-4 right-4 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 z-40 rounded-full shadow-lg cursor-pointer bg-white dark:bg-gray-700"
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

                <NavLink
                  to="/board"
                  className="block w-full text-center bg-primary text-white font-medium py-2.5 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  Continue
                </NavLink>

                <button
                  className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  ✖️
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
