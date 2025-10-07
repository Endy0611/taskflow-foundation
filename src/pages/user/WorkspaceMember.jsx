import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search } from "lucide-react";
import TaskFlowChatbot from "../../components/chatbot/Chatbot";
import SidebarComponent from "../../components/sidebar/SidebarComponent";
import { NavLink } from "react-router-dom";

const members = [
  {
    name: "Dana Dorn",
    username: "@danadorn",
    lastActive: "August 2025",
    color: "bg-orange-500",
    initials: "DD",
  },
  {
    name: "Tith Cholna",
    username: "@tithcholna",
    lastActive: "August 2025",
    color: "bg-blue-600",
    initials: "TC",
  },
  {
    name: "Mon SreyNet",
    username: "@msreynet",
    lastActive: "August 2025",
    color: "bg-purple-600",
    initials: "MS",
  },
  {
    name: "Ong Endy",
    username: "@endy168",
    lastActive: "August 2025",
    color: "bg-green-500",
    initials: "OE",
  },
  {
    name: "Dana Dorn",
    username: "@danadorn",
    lastActive: "August 2025",
    color: "bg-orange-500",
    initials: "DD",
  },
];

export default function WorkspaceMembers() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleResize = () => {
      // Close sidebar on desktop (1024px and above)
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
    fixed top-0 left-0 z-40 h-screen w-64
    bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:static lg:translate-x-0 lg:h-auto lg:w-64 lg:shadow-none
  `}
        >
          <SidebarComponent
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            setShowModal={setShowModal}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:pl-32 p-4 lg:p-8 overflow-y-auto bg-gray-50 dark:bg-gray-800 w-full">
          {/* Mobile & iPad Hamburger - Show on screens below 1024px (lg breakpoint) */}
          <button
            className="lg:hidden p-2 -ml-2 rounded bg-primary text-white dark:hover:bg-gray-700 transition-colors mb-4"
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-2xl font-bold tracking-tight">
                Workspace Members
              </h2>
              <button className="px-5 py-2 bg-indigo-800 text-white rounded-lg shadow-md hover:bg-indigo-700 transition">
                Invite Members
              </button>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column: Members list */}
              <div className="lg:col-span-2 space-y-6">
                {/* Top controls */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <button className="px-4 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-lg shadow-sm hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-200 dark:hover:bg-indigo-800">
                    Members ({members.length})
                  </button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Join requests: 0
                  </span>
                </div>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search members..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2.5 px-3 shadow-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Members list */}
                <div className="space-y-4">
                  {filteredMembers.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                    >
                      {/* Left: Avatar + Info */}
                      <div className="flex items-center gap-3 mb-3 sm:mb-0">
                        <div
                          className={`h-12 w-12 flex items-center justify-center rounded-full text-white font-bold ${m.color}`}
                        >
                          {m.initials}
                        </div>
                        <div>
                          <p className="font-medium text-base">{m.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {m.username} · Last active {m.lastActive}
                          </p>
                        </div>
                      </div>

                      {/* Right: Buttons */}
                      <div className="flex flex-wrap ml-16 sm:ml-16 gap-2 justify-start sm:justify-end ">
                        <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                          View boards
                        </button>
                        <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white">
                          Admin
                        </button>
                        <button className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40 transition">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right column: Info & Invite */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  About Workspace Members
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Members can view and join all Workspace-visible boards and
                  create new boards in the Workspace. Invite more people to
                  collaborate seamlessly.
                </p>
                <button className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2 transition">
                  <span>🔗</span>
                  Invite with link
                </button>
              </div>
            </div>
          </div>

          {/* Floating chatbot button */}
          <img
            src="/src/assets/general/chatbot.png"
            alt="Our Chatbot"
            className="fixed bottom-6 right-6 w-16 h-16 sm:w-20 sm:h-20 z-40 rounded-full shadow-lg cursor-pointer bg-white"
            onClick={() => setShowChatbot(true)}
          />
        </main>
      </div>

      {/* Chatbot */}
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

      {/* Workspace Modal */}
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
                  Let's build a Workspace
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base">
                  Boost your productivity by making it easier for everyone to
                  access boards in one location.
                </p>

                {/* Inputs */}
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
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
