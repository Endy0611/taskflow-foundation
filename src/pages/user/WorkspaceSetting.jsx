import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarComponent from "../../components/sidebar/SidebarComponent";
import { Menu, PencilRulerIcon, Settings as SettingsIcon } from "lucide-react";
import TaskFlowChatbot from "../../components/chatbot/Chatbot";
import { NavLink } from "react-router-dom";
import { fetchWorkspaceById } from "../../services/workspaceService";

/* helpers */
const initialsFromName = (name) =>
  (name || "Workspace")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export default function WorkspaceSetting() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [isTabletOrBelow, setIsTabletOrBelow] = useState(false);

  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState({
    id: null,
    name: "Workspace",
    visibility: "PRIVATE",
  });

  // workspace id + continue link
  const workspaceId = useMemo(
    () => localStorage.getItem("current_workspace_id"),
    []
  );
  const continueHref = workspaceId ? `/board/${workspaceId}` : "/workspaceboard";

  // load current workspace
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        if (!workspaceId) return;
        const data = await fetchWorkspaceById(workspaceId);
        if (!mounted) return;
        setWorkspace({
          id: data.id ?? workspaceId,
          name: data.name ?? "Workspace",
          visibility: (data.visibility || "PRIVATE").toUpperCase(),
        });
      } catch (e) {
        console.error("Failed to load workspace", e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [workspaceId]);

  // listen for updates from settings page
  useEffect(() => {
    const onWsUpdated = (e) => {
      const u = e.detail || {};
      const same =
        (u.id ?? workspaceId) === (workspace.id ?? workspaceId);
      if (!same) return;
      setWorkspace((w) => ({
        ...w,
        name: u.name ?? w.name,
        visibility: (u.visibility ?? w.visibility)?.toUpperCase(),
      }));
    };
    window.addEventListener("workspace:updated", onWsUpdated);
    return () => window.removeEventListener("workspace:updated", onWsUpdated);
  }, [workspace.id, workspaceId]);

  // responsive sidebar
  useEffect(() => {
    const handleResize = () => setIsTabletOrBelow(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isPublic = workspace.visibility === "PUBLIC";
  const visibilityLabel = isPublic ? "Public" : "Private";
  const visibilityEmoji = isPublic ? "🌐" : "🔒";
  const visibilityDetail = isPublic
    ? "This Workspace is public and visible to anyone with the link."
    : "This Workspace is private. It’s not indexed or visible outside the Workspace.";

  return (
    <div className="h-screen flex bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 dark:text-white">
      {/* Sidebar overlay for mobile */}
      {isTabletOrBelow && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isTabletOrBelow
            ? `fixed inset-y-0 left-0 w-64 z-40 transform ${
                sidebarOpen ? "translate-x-0" : "-translate-x-full"
              } transition-transform duration-300`
            : "w-64 flex-shrink-0"
        }`}
      >
        <SidebarComponent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setShowModal={setShowCreateModal}
        />
      </div>

      {/* Main */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {/* Hamburger for tablet/mobile */}
        {isTabletOrBelow && (
          <button
            className="p-2 mb-4 rounded bg-primary text-white"
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen((v) => !v)}
          >
            <Menu className="w-6 h-6" />
          </button>
        )}

        {/* Header */}
        <div className="flex items-center gap-3 flex-wrap mb-6">
          <div className="w-12 h-12 rounded bg-orange-500/90 text-white grid place-items-center text-lg font-bold shadow-sm">
            {loading ? (
              <span className="w-6 h-3 rounded bg-white/40 animate-pulse" />
            ) : (
              initialsFromName(workspace.name)
            )}
          </div>

          <div className="min-w-0">
            <h1 className="text-lg md:text-xl font-semibold flex items-center gap-2">
              {loading ? (
                <span className="h-5 w-40 rounded bg-gray-200 dark:bg-gray-700 animate-pulse" />
              ) : (
                <>
                  <span className="truncate">{workspace.name}</span>
                  <PencilRulerIcon className="w-5 h-5 shrink-0 text-gray-400" />
                </>
              )}
            </h1>

            <div className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2">
              <span>{visibilityEmoji}</span>
              <span className="truncate">{visibilityLabel} — {visibilityDetail}</span>

              {/* Navigate to dedicated settings page */}
              <NavLink
                to={`/workspaces/${workspace.id || workspaceId}/settings`}
                className="ml-2 inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-sm text-xs md:text-sm px-2.5 py-1 hover:bg-gray-200 dark:hover:bg-gray-600"
                aria-label="Open workspace settings"
              >
                <SettingsIcon className="w-4 h-4" />
                Setting
              </NavLink>
            </div>
          </div>
        </div>

        {/* Owners */}
        <SectionHeader
          title="Workspace owner"
          action={
            <button className="bg-gray-100 dark:bg-gray-700 rounded-sm font-normal text-xs md:text-sm px-3 md:px-4 py-1 hover:bg-gray-200 dark:hover:bg-gray-600">
              Invite Member
            </button>
          }
        />
        <div className="space-y-3 mb-6">
          <MemberCard name="Tith Cholna" tag="TC" color="bg-blue-600" role="Owner" />
          <MemberCard name="Tith Cholna" tag="TC" color="bg-purple-500" role="Admin" />
        </div>

        {/* Members */}
        <SectionHeader title="Members" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <MemberCard name="Dorn Dana" tag="DD" color="bg-red-500" role="Member" />
          <MemberCard name="Mon Sreynet" tag="MS" color="bg-blue-500" role="Member" />
          <MemberCard name="Lonh Reaksmey" tag="LR" color="bg-purple-500" role="Member" />
          <MemberCard name="Ong Endy" tag="OE" color="bg-teal-500" role="Member" />
        </div>

        {/* Spacer */}
        <div className="h-20" />
      </main>

      {/* Floating chatbot button */}
      <img
        src="/src/assets/general/chatbot.png"
        alt="Our Chatbot"
        className="fixed bottom-6 right-6 w-16 h-16 sm:w-20 sm:h-20 z-40 rounded-full shadow-lg cursor-pointer bg-white"
        onClick={() => setShowChatbot(true)}
      />

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

      {/* Create Workspace Modal (unchanged from your template) */}
      <AnimatePresence>
        {showCreateModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCreateModal(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 dark:text-white rounded-xl shadow-lg max-w-lg w-full p-6 md:p-8 relative">
                <h2 className="text-xl md:text-2xl font-bold mb-2">Let’s build a Workspace</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base">
                  Boost your productivity by making it easier for everyone to access boards in one location.
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
                  to={continueHref}
                  className="block w-full text-center bg-blue-600 text-white font-medium py-2.5 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  Continue
                </NavLink>

                <button
                  className="absolute top-3 right-3 text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  onClick={() => setShowCreateModal(false)}
                >
                  ✖️
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ————— Reusable bits ————— */

function SectionHeader({ title, action }) {
  return (
    <div className="mt-2 mb-3 flex items-center justify-between">
      <h2 className="font-semibold text-base md:text-lg">{title}</h2>
      {action ?? null}
    </div>
  );
}

function RoleBadge({ role = "Member" }) {
  const styles =
    role === "Owner"
      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200"
      : role === "Admin"
      ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-200"
      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  return (
    <span className={`text-xs px-2 py-0.5 rounded ${styles}`}>{role}</span>
  );
}

function MemberCard({ name, tag, color, role }) {
  return (
    <div className="flex items-center gap-3 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow transition">
      <div className={`w-10 h-10 ${color} text-white flex items-center justify-center rounded-full font-medium`}>
        {tag}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm md:text-base truncate">{name}</p>
      </div>
      <RoleBadge role={role} />
    </div>
  );
}
