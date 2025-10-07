import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarB4CreateBoard from "../../components/sidebar/SidebarB4CreateBoard";
import { NavLink, useNavigate } from "react-router-dom";
import TaskFlowChatbot from "../../components/chatbot/Chatbot";
import { fetchWorkspaces } from "../../features/workspace/WorkspaceSlice";
import { useDispatch } from "react-redux";
import { CreateBoardComponent } from "../../components/task/CreateBoardComponent";
import { Menu } from "lucide-react";


export default function BoardB4Create() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWorkspaceModal, setShowModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showCreateBoard, setShowCreateBoard] = useState(false);

  // Handle sidebar reset when resizing

  // form states for creating workspace
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceDesc, setWorkspaceDesc] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchWorkspaces());
  }, [dispatch]);

  // Get API base URL from Vite env or fallback
  const getBaseUrl = () =>
    import.meta.env.VITE_API_BASE_URL || "https://taskflow-api.istad.co";

  // Helper: get access token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("accessToken") || null;
  };

  // Create workspace API call
  const handleCreateWorkspace = async (e) => {
    if (e?.preventDefault) e.preventDefault();

    setError(null);
    setMessage(null);

    const name = workspaceName.trim();
    if (!name) {
      setError("Workspace name is required.");
      return;
    }

    setLoadingCreate(true);
    try {
      const baseUrl = getBaseUrl();
      const accessToken = getAuthToken();

      const payload = {
        name,
        description: workspaceDesc || "",
        theme: "ANGKOR",
      };

      const res = await fetch(`${baseUrl}/workspaces`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const msg =
          data?.message ||
          data?.error ||
          `Failed to create workspace (status ${res.status})`;
        throw new Error(msg);
      }

      setMessage("Workspace created successfully!");

      // Extract workspace id from API response
      const href = data?._links?.self?.href || data?.links?.self?.href;
      let workspaceId = null;
      if (href) {
        try {
          const url = new URL(href, window.location.origin);
          const segments = url.pathname.split("/").filter(Boolean);
          workspaceId = segments[segments.length - 1];
        } catch {
          const parts = href.split("/").filter(Boolean);
          workspaceId = parts[parts.length - 1] || null;
        }
      }

      // reset form, close modal
      setWorkspaceName("");
      setWorkspaceDesc("");
      setShowModal(false);

      // navigate to workspace
      if (workspaceId) {
        navigate(`/board/${workspaceId}`); 
      } else {
        navigate("/workspaceboard");
      }
    } catch (err) {
      console.error("Create workspace error:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoadingCreate(false);
    }
  };

  return (
    <div className="min-h-[93.5vh] flex flex-col dark:bg-gray-900 dark:text-white">
      <div className="flex flex-1 overflow-hidden relative">
        {/* Overlay for moAbile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <SidebarB4CreateBoard
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setShowModal={setShowModal}
        />

        {/* Main Content */}
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
        <SidebarB4CreateBoard
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setShowModal={setShowModal}
        />

        <main className="relative flex-1 overflow-y-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 lg:pt-10 bg-gray-100 dark:bg-gray-950">
          {/* Templates */}
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
                (title, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer"
                  >
                    <img
                      src={`https://picsum.photos/600/400?random=${idx + 1}`}
                      alt={title}
                      className="w-full h-40 md:h-44 lg:h-48 object-cover group-hover:scale-105 transition-transform"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-3 py-2">
                      {title}
                    </div>
                  </div>
                )
              )}
            </div>
          </section>

       {/* Recently Viewed Section */}
          <section className="mb-10">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
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
            <div
              className="
              grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-3 
              lg:grid-cols-4 
              gap-4 md:gap-6"
            >
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
                      className="w-full h-36 md:h-44 lg:h-48 object-cover"
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
                    <span className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base">
                      + {title}
                    </span>
                  </div>
                )
              )}
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
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-md font-bold">
                  <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-md font-bold">
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
                        className="w-full h-36 md:h-44 lg:h-48 object-cover"
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
                      <span className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base">
                        + {title}
                      </span>
                    </div>
                  )
                )}
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

      {/* Chatbot Modal */}
      {/* Chatbot modal */}
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
              className="fixed bottom-20 right-4 sm:right-6 lg:right-10 z-50 w-[90vw] sm:w-[360px] md:w-[400px]"
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

      {/* Workspace creation modal */}
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
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-lg w-full p-6 md:p-8 relative">
                <h2 className="text-lg sm:text-xl font-bold mb-2">
                  Let's build a Workspace
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                  Boost your productivity by grouping boards in one place.
                </p>

                <form onSubmit={handleCreateWorkspace}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Workspace name
                  </label>
                  <input
                    type="text"
                    placeholder="name"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mb-2 bg-white dark:bg-gray-700 dark:text-white"
                    required
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
                    value={workspaceDesc}
                    onChange={(e) => setWorkspaceDesc(e.target.value)}
                  />

                  {error && (
                    <div className="text-sm text-red-600 dark:text-red-400 mb-2">
                      {error}
                    </div>
                  )}
                  {message && (
                    <div className="text-sm text-green-600 dark:text-green-400 mb-2">
                      {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loadingCreate}
                    className="block w-full text-center bg-blue-600 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  >
                    {loadingCreate ? "Creating..." : "Continue"}
                  </button>
                </form>

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

      {/* Create Board Modal */}
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
