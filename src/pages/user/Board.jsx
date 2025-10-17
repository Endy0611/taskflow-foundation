import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar, { notifyWorkspacesChanged } from "../../components/sidebar/Sidebar";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import TaskFlowChatbot from "../../components/chatbot/Chatbot";
import { CreateBoardComponent } from "../../components/task/CreateBoardComponent";
import { Menu } from "lucide-react";
import { http } from "../../services/http"; // your API helper

const THEME_OPTIONS = ["ANGKOR", "BAYON", "BOKOR", "KIRIROM", "KOH_KONG"];

/* ---------------- Helpers (HAL-safe IDs) ---------------- */
const getIdFromHref = (href) => {
  if (!href) return null;
  try {
    const u = new URL(href, window.location.origin);
    const segs = u.pathname.split("/").filter(Boolean);
    return segs.pop();
  } catch {
    const segs = String(href).split("/").filter(Boolean);
    return segs.pop();
  }
};

const getBoardId = (b) => {
  if (b?.id != null) return String(b.id);
  const href = b?._links?.self?.href || b?.links?.self?.href;
  return href ? String(getIdFromHref(href)) : null; // never fall back to title
};

const getWorkspaceIdFromBoard = (b, fallbackWsId, fallbackWsObj) => {
  // Prefer current route workspaceId, then board.workspaceId, then saved workspace.id
  return (
    String(
      fallbackWsId ??
        b?.workspaceId ??
        fallbackWsObj?.id ??
        localStorage.getItem("current_workspace_id") ??
        ""
    ) || null
  );
};
/* -------------------------------------------------------- */

export default function Board() {
  const params = useParams();
  const navigate = useNavigate();

  // Support both /board/:workspaceId and /board/:id
  const workspaceId = params.workspaceId ?? params.id ?? null;

  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWorkspaceModal, setShowModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showCreateBoard, setShowCreateBoard] = useState(false);

  // Current workspace (detail for header)
  const [workspace, setWorkspace] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("last_workspace") || "{}");
    } catch {
      return {};
    }
  });
  const [loadingWs, setLoadingWs] = useState(false);
  const [wsError, setWsError] = useState(null);

  // Initial letter avatar from workspace name
  const wsInitial = useMemo(() => {
    const n = (workspace?.name || "Workspace").trim();
    return n ? n.charAt(0).toUpperCase() : "W";
  }, [workspace?.name]);

  // ---- Workspace list (for "Your Workspaces" grid) ----
  const [workspaces, setWorkspaces] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [listError, setListError] = useState(null);

  // Fetch boards from API
  const fetchBoardsForWorkspace = async (workspaceId) => {
    try {
      const data = await http(`/workspaces/${workspaceId}/boards`, {
        method: "GET",
      });
      return data?._embedded?.boards || [];
    } catch (e) {
      console.error("Failed to fetch boards:", e);
      return [];
    }
  };

  const [boards, setBoards] = useState([]);
  const [loadingBoards, setLoadingBoards] = useState(true);
  const [boardsError, setBoardsError] = useState(null);

  // ✅ Auto restore workspace + boards immediately after login or refresh
  useEffect(() => {
    const cachedWs = JSON.parse(localStorage.getItem("last_workspace") || "{}");
    const cachedBoards = JSON.parse(
      localStorage.getItem(`boards-${cachedWs?.id}`) || "[]"
    );

    if (cachedWs?.id) setWorkspace(cachedWs);
    if (cachedBoards.length > 0) setBoards(cachedBoards);

    // If user opened /board without an ID, redirect to last workspace
    if (!workspaceId && cachedWs?.id) {
      navigate(`/board/${cachedWs.id}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load boards when workspaceId changes
  useEffect(() => {
    if (!workspaceId) return;

    const loadBoards = async () => {
      setLoadingBoards(true);
      setBoardsError(null);
      const boardsData = await fetchBoardsForWorkspace(workspaceId);
      setBoards(boardsData);
      setLoadingBoards(false);
    };

    loadBoards();
  }, [workspaceId]);

  // Fetch workspace detail + boards and persist
  useEffect(() => {
    if (!workspaceId) return;

    const loadWorkspaceAndBoards = async () => {
      try {
        const [workspaceData, boardsData] = await Promise.all([
          http(`/workspaces/${workspaceId}`),
          http(`/workspaces/${workspaceId}/boards`),
        ]);

        setWorkspace(workspaceData);
        setBoards(boardsData?._embedded?.boards || []);

        // Persist
        localStorage.setItem("workspace", JSON.stringify(workspaceData));
        localStorage.setItem("last_workspace", JSON.stringify(workspaceData));
        localStorage.setItem(
          "current_workspace_id",
          String(workspaceData?.id || workspaceId)
        );
        localStorage.setItem(
          `boards-${workspaceData?.id || workspaceId}`,
          JSON.stringify(boardsData?._embedded?.boards || [])
        );
      } catch (error) {
        setWsError(error.message || "Failed to load workspace or boards");
      }
    };

    loadWorkspaceAndBoards();
  }, [workspaceId]);

  // Close sidebar automatically below lg
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e) => {
      if (!e.matches) setSidebarOpen(false);
    };
    handleChange(mq);
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  // Create Workspace (modal)
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceTheme, setWorkspaceTheme] = useState("ANGKOR");
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [createMsg, setCreateMsg] = useState(null);
  const [createErr, setCreateErr] = useState(null);

  const handleCreateWorkspace = async (e) => {
    e?.preventDefault?.();
    setCreateErr(null);
    setCreateMsg(null);

    const name = workspaceName.trim();
    if (!name) {
      setCreateErr("Workspace name is required.");
      return;
    }
    const theme = (workspaceTheme || "").trim() || "ANGKOR";

    setLoadingCreate(true);
    try {
      // Try the canonical route (matches your Postman)
      let data;
      try {
        data = await http.post("/workspaces", { name, theme });
      } catch (err) {
        const status =
          err?.response?.status ??
          err?.status ??
          (typeof err?.code === "number" ? err.code : undefined);

        if (status !== 404) throw err;
        data = await http.post("/workspaces/createNew", { name, theme });
      }

      const selfHref = data?._links?.self?.href || data?.links?.self?.href || "";
      let newId =
        data?.id ||
        data?.workspaceId ||
        (selfHref ? getIdFromHref(selfHref) : null);

      const normalized = {
        id: newId ?? Math.random().toString(36).slice(2),
        name: data?.name || name,
        theme: data?.theme || theme,
        ...data,
      };

      setWorkspaces((prev) => [normalized, ...prev]);

      // Persist for other pages / sidebar
      localStorage.setItem("last_workspace", JSON.stringify(normalized));
      localStorage.setItem("current_workspace_id", String(normalized.id));
      localStorage.setItem("current_workspace_name", normalized.name);
      localStorage.setItem("current_workspace_theme", normalized.theme);

      try {
        notifyWorkspacesChanged();
      } catch {
        localStorage.setItem("refresh_workspaces", String(Date.now()));
      }

      setCreateMsg("Workspace created successfully!");
      setWorkspaceName("");
      setWorkspaceTheme("ANGKOR");
      setShowModal(false);

      // Go to the new workspace
      navigate(`/board/${normalized.id}`);
    } catch (err) {
      const status = err?.response?.status ?? err?.status;
      const message = status
        ? `Error ${status}: ${
            err?.response?.data?.message || err?.statusText || "Request failed"
          }`
        : err?.message || "Network error";
      console.error("Create workspace error:", err);
      setCreateErr(message);
    } finally {
      setLoadingCreate(false);
    }
  };

  /* -------- When a board is created, navigate to its ProjectManagement page -------- */
  const handleBoardCreated = (created) => {
    const id =
      created?.id ??
      created?.boardId ??
      getIdFromHref(created?._links?.self?.href) ??
      getIdFromHref(created?.links?.self?.href);

    const wsId = getWorkspaceIdFromBoard(created, workspaceId, workspace);

    // Add to UI list
    setBoards((prev) => [created, ...prev]);

    if (id && wsId) {
      navigate(`/board/${wsId}/${id}`);
    } else {
      console.warn("Missing workspaceId or boardId after create:", { created });
    }
  };

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <div className="flex flex-1 overflow-hidden">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <Sidebar
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
          {/* Hamburger (Mobile) */}
          <button
            className="lg:hidden p-2 mb-4 rounded-md bg-blue-600 text-white"
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Workspace Header */}
          <section className="mb-6">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center text-xl font-bold rounded">
                {wsInitial}
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold">
                  {workspace?.name || "Workspace"}
                  {workspace?.theme ? (
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      · {workspace.theme}
                    </span>
                  ) : null}
                </h1>
                {loadingWs ? (
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Loading workspace…
                  </p>
                ) : wsError ? (
                  <p className="text-xs text-red-600 dark:text-red-400">
                    {wsError}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          {/* Recently Viewed & Templates Section */}
          <section className="mb-10">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Start with a template and let TaskFlow handle the rest
            </h2>
            <div
              className="grid 
              grid-cols-1 
              sm:grid-cols-2 
              md:grid-cols-2 
              lg:grid-cols-3 
              gap-4 md:gap-6"
            >
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
                      className="w-full h-40 md:h-44 lg:h-48 object-cover group-hover:scale-105 transition-transform"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-3 py-2">
                      {title}
                    </div>
                  </NavLink>
                )
              )}
            </div>
          </section>

          {/* Recently Viewed Section */}
          <section className="mb-10">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Recently viewed
            </h2>
            <div
              className="grid 
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
                )
              )}
            </div>
          </section>

          {/* Your Workspaces (dynamic) */}
          <section className="mb-20">
            <h2 className="text-lg md:text-xl font-semibold mb-4">
              Your Workspaces
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-md font-bold">
                    {wsInitial}
                  </div>
                  <span className="font-semibold text-base sm:text-lg">
                    {workspace?.name || "TaskFlow Workspace"}
                  </span>
                  <span className="font-semibold">Workspaces</span>
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

              {/* List of Boards */}
              {loadingBoards ? (
                <div className="text-sm text-gray-500">Loading boards...</div>
              ) : boardsError ? (
                <div className="text-sm text-red-600 dark:text-red-400">
                  {boardsError}
                </div>
              ) : boards.length === 0 ? (
                <div className="text-sm text-gray-500">
                  No boards yet. Create one!
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {boards.map((board) => {
                    const id = getBoardId(board);
                    const wsId = getWorkspaceIdFromBoard(board, workspaceId, workspace);

                    // No id yet → render disabled card to avoid bad routes
                    if (!id || !wsId) {
                      return (
                        <div
                          key={Math.random()}
                          className="relative rounded-xl overflow-hidden shadow-md border bg-white/70 dark:bg-gray-900/70 opacity-60"
                          title="Waiting for ID…"
                        >
                          <img
                            src={`https://picsum.photos/seed/pending-${Math.random()}/600/400`}
                            alt={board?.title || "Pending board"}
                            className="w-full h-36 md:h-44 lg:h-48 object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-3 py-1 flex justify-between">
                            <span className="truncate">
                              {board?.title || "Board"}
                            </span>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={`${wsId}-${id}`}
                        className="relative rounded-xl overflow-hidden shadow-md border bg-white dark:bg-gray-900"
                      >
                        <img
                          src={`https://picsum.photos/seed/${id}/600/400`}
                          alt={board.title}
                          className="w-full h-36 md:h-44 lg:h-48 object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-3 py-1 flex justify-between">
                          <span className="truncate">
                            {board.title || `Board #${id}`}
                          </span>
                        </div>
                        <button
                          className="absolute inset-0"
                          onClick={() => navigate(`/board/${wsId}/${id}`)} // ✅ correct route
                          aria-label={`Open ${board.title || id}`}
                        />
                      </div>
                    );
                  })}

                  {/* Create new board */}
                  <div
                    onClick={() => setShowCreateBoard(true)}
                    className="relative rounded-xl overflow-hidden shadow-md border bg-gray-200 dark:bg-gray-800 flex items-center justify-center cursor-pointer"
                  >
                    <span className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base">
                      + Create a Board
                    </span>
                  </div>
                </div>
              )}
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

      {/* Chatbot and Modals */}
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

      {/* Create Workspace Modal (ONLY this one) */}
      <AnimatePresence>
        {showWorkspaceModal && (
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
                  Boost your productivity by grouping boards in one place.
                </p>

                <form onSubmit={handleCreateWorkspace}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Workspace name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Marketing Team"
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 mb-4 bg-white dark:bg-gray-700 dark:text-white"
                    required
                  />

                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Theme
                  </label>
                  <select
                    value={workspaceTheme}
                    onChange={(e) => setWorkspaceTheme(e.target.value)}
                    className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
                  >
                    {THEME_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>

                  {createErr && (
                    <div className="text-sm text-red-600 dark:text-red-400 mt-3">
                      {createErr}
                    </div>
                  )}
                  {createMsg && (
                    <div className="text-sm text-green-600 dark:text-green-400 mt-3">
                      {createMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loadingCreate}
                    className="mt-4 block w-full text-center bg-blue-600 disabled:opacity-60 text-white font-medium py-2.5 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
              <CreateBoardComponent
                workspaceId={workspaceId || workspace?.id}
                onSuccess={handleBoardCreated}
                onClose={() => setShowCreateBoard(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
