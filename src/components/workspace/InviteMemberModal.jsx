import { useState } from "react";
import { motion } from "framer-motion";
import {
  searchUserByUsername,
  addMemberByUsername,
} from "../../services/workspaceService";

export default function InviteMemberModal({ workspaceId, onClose, onAdded }) {
  const [username, setUsername] = useState("");
  const [permission, setPermission] = useState("VIEWER");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [foundUser, setFoundUser] = useState(null);

  /* -------------------------------------------------------------------------- */
  /*                           🔍 Search Username First                          */
  /* -------------------------------------------------------------------------- */
  const handleSearch = async () => {
    if (!username.trim()) {
      setMessage("⚠️ Please enter a username first.");
      return;
    }

    setLoading(true);
    setMessage("");
    setFoundUser(null);

    try {
      const user = await searchUserByUsername(username);
      if (user?.username || user?._links?.self) {
        setFoundUser(user);
        setMessage(`✅ Found user: ${user.username || "Unknown"}`);
      } else {
        setMessage("❌ User not found.");
      }
    } catch (err) {
      console.error("Search error:", err);
      setMessage("❌ Failed to find user. Try again.");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                           ✉️ Invite to Workspace                            */
  /* -------------------------------------------------------------------------- */
  const handleInvite = async () => {
    if (!foundUser) {
      setMessage("⚠️ Please search and select a valid user first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await addMemberByUsername({ username, workspaceId, permission });
      setMessage("✅ Invitation successful!");
      setUsername("");
      setFoundUser(null);
      onAdded?.();

      // auto close modal after short delay
      setTimeout(() => {
        onClose?.();
      }, 1200);
    } catch (err) {
      console.error("Invite error:", err);
      setMessage("❌ Failed to invite user. Check username or permission.");
    } finally {
      setLoading(false);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                                💻 UI Layout                                */
  /* -------------------------------------------------------------------------- */
  return (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <h3 className="text-xl font-semibold mb-4 text-center text-gray-900 dark:text-white">
          Invite Member by Username
        </h3>

        {/* Username Input */}
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Enter username (e.g. cholna)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 border px-4 py-2 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        {/* Role Selection */}
        <select
          value={permission}
          onChange={(e) => setPermission(e.target.value)}
          className="w-full border px-4 py-2 rounded-lg mb-3 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="OWNER">OWNER</option>
          <option value="EDITOR">EDITOR</option>
          <option value="VIEWER">VIEWER</option>
        </select>

        {/* Message Display */}
        {message && (
          <p
            className={`text-center text-sm mb-2 ${
              message.startsWith("✅")
                ? "text-green-600"
                : message.startsWith("⚠️")
                ? "text-yellow-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleInvite}
            disabled={loading || !foundUser}
            className={`px-5 py-2 rounded-lg text-white ${
              foundUser
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            } transition`}
          >
            {loading ? "Inviting..." : "Invite"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
