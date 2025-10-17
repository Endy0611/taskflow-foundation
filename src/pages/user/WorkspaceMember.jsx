import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, Link2 } from "lucide-react";
import TaskFlowChatbot from "../../components/chatbot/Chatbot";
import Sidebar from "../../components/sidebar/Sidebar";  // Use Sidebar.jsx
import { NavLink } from "react-router-dom";

import InviteMemberModal from "../../components/workspace/InviteMemberModal";
import RoleDropdown from "../../components/workspace/RoleDropdown";
import ConfirmDialog from "../../components/workspace/ConfirmDialog";

import {
  fetchWorkspaceMembers,
  removeMember,
  createInviteLink,
} from "../../services/workspaceService";
import { getCurrentUser } from "../../Implement/api";

// 👉 Use real workspace id (route/store). For now fallback to 1.
const WORKSPACE_ID = Number(localStorage.getItem("current_workspace_id") || 1);

export default function WorkspaceMember() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [confirm, setConfirm] = useState(null); // {membershipId, name}
  const [inviteLink, setInviteLink] = useState("");

  const me = getCurrentUser(); // { id, ... }
  const myMembership = members.find(m => m.userId === me?.id);
  const isAdmin = myMembership?.permission === "OWNER" || myMembership?.permission === "EDITOR";

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handle = () => setSidebarOpen(false);
    handle(); mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  async function load() {
    setLoading(true);
    try { 
      setMembers(await fetchWorkspaceMembers(WORKSPACE_ID)); 
    }
    catch (e) { 
      console.error(e); 
    }
    finally { 
      setLoading(false); 
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const key = search.toLowerCase();
    return members.filter(m => (m.name + m.username + m.email).toLowerCase().includes(key));
  }, [members, search]);

  async function onCopyInviteLink() {
    const link = await createInviteLink(WORKSPACE_ID);
    setInviteLink(link);
    await navigator.clipboard.writeText(link).catch(()=>{});
  }

  async function onRemove(membershipId) {
    await removeMember({ membershipId });
    setConfirm(null);
    load();
  }

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        
        {/* Replace SidebarComponent with Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} setShowModal={() => {}} />

        <main className="flex-1 md:pl-32 p-4 md:p-8 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <button className="md:hidden p-2 -ml-2 rounded hover:bg-blue-600" aria-label="Toggle sidebar"
                  aria-expanded={sidebarOpen} onClick={() => setSidebarOpen(v => !v)}>
            <Menu className="w-6 h-6" />
          </button>

          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-2xl font-bold tracking-tight">Workspace Members</h2>
              <div className="flex gap-2">
                <button onClick={() => setInviteOpen(true)}
                        className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition">
                  Invite by Email
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <button className="px-4 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-lg shadow-sm">
                    Members ({members.length})
                  </button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Join requests: 0</span>
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text" placeholder="Search members..." value={search} onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 w-full border border-gray-300 dark:border-gray-600 rounded-lg py-2.5 px-3 shadow-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="space-y-4">
                  {loading ? (
                    <div className="text-sm text-gray-500">Loading members…</div>
                  ) : filtered.length === 0 ? (
                    <div className="text-sm text-gray-500">No members found</div>
                  ) : (
                    filtered.map((m) => (
                      <div key={m.membershipId}
                           className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center gap-3">
                          <div className={`h-12 w-12 flex items-center justify-center rounded-full text-white font-bold ${m.color}`}>
                            {m.initials}
                          </div>
                          <div>
                            <p className="font-medium text-base">{m.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-300">
                              {m.username} · {m.email} · Last active {m.lastActive}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition">
                            View boards
                          </button>

                          <RoleDropdown
                            membershipId={m.membershipId}
                            initial={m.permission}
                            disabled={!isAdmin || m.userId === me?.id}
                            onChanged={() => load()}
                          />

                          <button
                            disabled={!isAdmin || m.userId === me?.id}
                            onClick={() => setConfirm({ membershipId: m.membershipId, name: m.name })}
                            className="px-3 py-1.5 text-sm border rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/40 transition disabled:opacity-50"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">About Workspace Members</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Members can view and join all Workspace-visible boards and create new boards in the Workspace.
                  Invite more people to collaborate seamlessly.
                </p>

                <button onClick={onCopyInviteLink}
                        className="w-full px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center gap-2 transition">
                  🔗 {inviteLink ? "Copied! (click to copy again)" : "Invite with link"}
                </button>
                {inviteLink ? (
                  <div className="text-xs break-all bg-gray-100 dark:bg-gray-700 rounded p-2">{inviteLink}</div>
                ) : null}
              </div>
            </div>
          </div>

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
            <motion.div className="fixed inset-0 bg-black/50 z-40"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setShowChatbot(false)} />
            <motion.div className="fixed bottom-24 right-8 z-50"
                        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }} transition={{ duration: 0.2 }}>
              <TaskFlowChatbot onClose={() => setShowChatbot(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {inviteOpen && (
          <InviteMemberModal workspaceId={WORKSPACE_ID} onClose={() => setInviteOpen(false)} onAdded={() => load()} />
        )}
      </AnimatePresence>

      {confirm && (
        <ConfirmDialog
          title="Remove member?"
          message={`This will remove ${confirm.name} from the workspace.`}
          confirmText="Remove"
          onCancel={() => setConfirm(null)}
          onConfirm={() => onRemove(confirm.membershipId)}
        />
      )}
    </div>
  );
}
