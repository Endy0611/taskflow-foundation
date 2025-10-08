// src/components/workspace/InviteMemberModal.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { addMemberByEmail } from "../../services/workspaceService";

export default function InviteMemberModal({ workspaceId, onClose, onAdded }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("VIEWER");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function handleInvite() {
    setErr(""); setBusy(true);
    try {
      await addMemberByEmail({ workspaceId, email, permission: role });
      onAdded?.();
      onClose?.();
    } catch (e) {
      setErr(e?.message || "Failed to invite by email");
    } finally { setBusy(false); }
  }

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}>
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-md rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Invite by email</h3>
        <label className="block text-sm mb-1">Email</label>
        <input type="email" className="w-full border rounded px-3 py-2 mb-3 dark:bg-gray-700 dark:border-gray-600"
               value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="friend@example.com" />
        <label className="block text-sm mb-1">Role</label>
        <select className="w-full border rounded px-3 py-2 mb-4 dark:bg-gray-700 dark:border-gray-600"
                value={role} onChange={(e)=>setRole(e.target.value)}>
          <option value="VIEWER">Viewer</option>
          <option value="EDITOR">Editor</option>
          <option value="OWNER">Owner</option>
        </select>
        {err ? <p className="text-sm text-red-600 mb-2">{err}</p> : null}
        <div className="flex gap-2 justify-end">
          <button className="px-4 py-2 rounded border" onClick={onClose}>Cancel</button>
          <button disabled={busy || !email} onClick={handleInvite}
                  className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-60">
            {busy ? "Inviting..." : "Invite"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
