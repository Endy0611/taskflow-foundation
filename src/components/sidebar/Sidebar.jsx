import { useState, useEffect, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, LayoutGrid, FileText, ChevronUp, ChevronDown, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { http } from "../../services/http"; // your API helper

/** Helper you can call anywhere after creating/renaming/deleting a workspace */
export function notifyWorkspacesChanged() {
  try {
    // Triggers other tabs
    localStorage.setItem("refresh_workspaces", String(Date.now()));
  } catch {}
  // Triggers this tab
  window.dispatchEvent(new CustomEvent("workspace:changed"));
}

/* Small colored initial avatar */
function NameAvatar({ name }) {
  const ch = (name || "W").trim().charAt(0).toUpperCase();
  return (
    <div className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold">
      {ch || "W"}
    </div>
  );
}

function NavItem({ icon, text, to }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `group flex items-center gap-2 cursor-pointer rounded px-2 py-3
         text-gray-700 dark:text-gray-200
         ${isActive ? "bg-[#1E40AF] text-white" : ""}`
      }
    >
      {icon} {text}
    </NavLink>
  );
}

/**
 * Unified Sidebar (merges SidebarB4CreateBoard + SidebarComponent)
 *
 * Props:
 * - sidebarOpen: boolean
 * - setSidebarOpen: fn
 * - setShowModal: fn  -> call to open "Create Workspace" modal
 */
export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  setShowModal,
}) {
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(true);
  const [loading, setLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState([]);
  const [error, setError] = useState("");

  // Persisted selection for use across pages
  const [currentWsId, setCurrentWsId] = useState(
    () => localStorage.getItem("current_workspace_id") || ""
  );
  const [currentWsName, setCurrentWsName] = useState(
    () => localStorage.getItem("current_workspace_name") || ""
  );
  const [currentWsTheme, setCurrentWsTheme] = useState(
    () => localStorage.getItem("current_workspace_theme") || ""
  );

  // ---- Load workspaces from API ----
  async function loadWorkspaces() {
    setLoading(true);
    setError("");
    try {
      // Primary paged endpoint
      let data = await http(
        "/workspaces?page=0&size=20&sort=name,asc",
        { method: "GET" }
      );
      const list = Array.isArray(data?.content)
        ? data.content
        : Array.isArray(data)
        ? data
        : [];
      setWorkspaces(list);
    } catch {
      try {
        // Fallback simple endpoint
        const alt = await http("/workspaces", { method: "GET" });
        const list = Array.isArray(alt?.content)
          ? alt.content
          : Array.isArray(alt)
          ? alt
          : [];
        setWorkspaces(list);
      } catch (e) {
        setError(e?.message || "Failed to load workspaces");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWorkspaces();

    // Listen for changes from other tabs and in-tab custom events
    const onStorage = (e) => {
      if (e.key === "current_workspace_id") setCurrentWsId(e.newValue || "");
      if (e.key === "current_workspace_name")
        setCurrentWsName(e.newValue || "");
      if (e.key === "current_workspace_theme")
        setCurrentWsTheme(e.newValue || "");
      if (e.key === "refresh_workspaces") {
        loadWorkspaces();
      }
    };
    const onLocalChange = () => loadWorkspaces();

    window.addEventListener("storage", onStorage);
    window.addEventListener("workspace:changed", onLocalChange);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("workspace:changed", onLocalChange);
    };
  }, []);

  // If nothing selected yet (or selection disappeared), pick the first
  useEffect(() => {
    if (workspaces.length === 0) return;

    const exists = workspaces.some(
      (w) => String(w.id ?? w.workspaceId) === String(currentWsId)
    );
    if (!currentWsId || !exists) {
      const w = workspaces[0];
      const id = String(w.id ?? w.workspaceId);
      localStorage.setItem("current_workspace_id", id);
      localStorage.setItem("current_workspace_name", w.name || "");
      localStorage.setItem("current_workspace_theme", w.theme || "");
      setCurrentWsId(id);
      setCurrentWsName(w.name || "");
      setCurrentWsTheme(w.theme || "");
    }
  }, [workspaces, currentWsId]);

  const current = useMemo(
    () =>
      workspaces.find(
        (w) => String(w.id ?? w.workspaceId) === String(currentWsId)
      ),
    [workspaces, currentWsId]
  );

  function selectWorkspace(w) {
    const id = String(w.id ?? w.workspaceId);
    localStorage.setItem("current_workspace_id", id);
    localStorage.setItem("current_workspace_name", w.name || "");
    localStorage.setItem("current_workspace_theme", w.theme || "");
    setCurrentWsId(id);
    setCurrentWsName(w.name || "");
    setCurrentWsTheme(w.theme || "");
    navigate(`/board/${id}`);
    setSidebarOpen?.(false); // close on mobile
  }

  const headerName = current?.name || currentWsName || "Select a workspace";
  const headerTheme = current?.theme || currentWsTheme || "";

  return (
    <aside
      className={[
        "transform transition-transform duration-300 will-change-transform",
        "fixed inset-y-0 left-0 w-64 z-40 bg-gray-50 dark:bg-gray-900",
        "border-r border-gray-300 dark:border-gray-700",
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "lg:static lg:translate-x-0 lg:inset-auto lg:h-screen lg:z-0",
        "top-0",
      ].join(" ")}
    >
      <div className="p-4 text-sm">
        {/* Close (mobile) */}
        <div className="flex items-center justify-between lg:hidden mb-2">
          <span className="font-semibold">Menu</span>
          <button
            aria-label="Close sidebar"
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Static links */}
        <div className="space-y-1">
          <NavItem icon={<Home size={16} />} text="Home" to="/homeuser" />
          <NavItem
            icon={<LayoutGrid size={16} />}
            text="Boards"
            to={currentWsId ? `/board/${currentWsId}` : "/board"}
          />
          <NavItem
            icon={<FileText size={16} />}
            text="Templates"
            to="/templateuser"
          />
        </div>

        <div className="border-b my-4 border-gray-300 dark:border-gray-700" />

        {/* WORKSPACE SECTION */}
        <div className="mt-4">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
            Workspace
          </h3>

          {/* Header / current selection */}
          <div
            className={`flex items-center justify-between cursor-pointer p-2 rounded
              ${openDropdown
                ? "bg-[#1E40AF] text-white"
                : "text-gray-800 dark:text-gray-200"
              }
              hover:bg-[#2563EB] hover:text-white`}
            onClick={() => setOpenDropdown((v) => !v)}
          >
            <span className="flex items-center gap-2 font-medium">
              <NameAvatar name={headerName} />
              <span className="truncate">
                {headerName}
                {headerTheme ? (
                  <span className="opacity-80"> · {headerTheme}</span>
                ) : null}
              </span>
            </span>
            {openDropdown ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>

          {/* Dropdown content: full dynamic list of workspaces */}
          <AnimatePresence initial={false}>
            {openDropdown && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: "easeInOut" }}
                className="overflow-hidden rounded-b-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="max-h-72 overflow-auto">
                  {loading && (
                    <div className="px-3 py-2 text-gray-500">Loading…</div>
                  )}
                  {error && (
                    <div className="px-3 py-2 text-red-600">{error}</div>
                  )}
                  {/* {!loading && !error && workspaces.length === 0 && (
                    <div className="px-3 py-2 text-gray-500">
                      No workspaces yet. Create one!
                    </div>
                  )} */}

                  {!loading &&
                    !error &&
                    workspaces.map((w) => {
                      const id = String(w.id ?? w.workspaceId);
                      const isActive =
                        String(currentWsId) === String(id) ||
                        (!currentWsId &&
                          workspaces[0] &&
                          String(workspaces[0].id ?? workspaces[0].workspaceId) ===
                            id);

                      return (
                        <div
                          key={id}
                          className={`px-2 py-2 flex items-center justify-between cursor-pointer
                                      hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive
                              ? "bg-gray-100 dark:bg-gray-800"
                              : ""
                            }`}
                          onClick={() => selectWorkspace(w)}
                          title={w.name || "Workspace"}
                        >
                          <span className="flex items-center gap-2 truncate">
                            <NameAvatar name={w.name} />
                            <span className="truncate">
                              {w.name || "Untitled"}
                              {w.theme ? (
                                <span className="text-xs opacity-70">
                                  {" "}
                                  · {w.theme}
                                </span>
                              ) : null}
                            </span>
                          </span>

                          <button
                            className="shrink-0 p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/board/${id}`);
                              setSidebarOpen?.(false);
                            }}
                            aria-label="Open boards"
                            title="Open boards"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      );
                    })}
                </div>

                {/* Quick links for the currently selected workspace */}
                {currentWsId && (
                  <div className="px-2 py-2 border-t border-gray-200 dark:border-gray-700">
                    <NavLink
                      to={`/workspaceboard`}
                      className="block rounded px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Boards
                    </NavLink>
                    <NavLink
                      to="/workspacemember"
                      className="block rounded px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Members
                    </NavLink>
                    <NavLink
                      to="/workspacesetting"
                      className="block rounded px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Settings
                    </NavLink>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Create workspace */}
          <button
            className="mt-3 text-[#1E40AF] dark:text-white text-sm hover:bg-[#2563EB] hover:text-white rounded py-2 px-3 w-full justify-start flex items-center gap-2 border border-blue-600 dark:border-blue-400"
            onClick={() => setShowModal?.(true)}
          >
            + Create a Workspace
          </button>
        </div>
      </div>
    </aside>
  );
}
