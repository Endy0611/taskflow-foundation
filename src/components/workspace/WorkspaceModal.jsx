// components/modals/WorkspaceModal.jsx
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function WorkspaceModal({ showModal, setShowModal }) {
  return (
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
  );
}