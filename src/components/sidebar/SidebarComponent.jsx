import { useState } from "react";
import {
  Home,
  LayoutGrid,
  FileText,
  ChevronUp,
  ChevronDown,
  X,
  Menu,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";

function NavItem({ icon, text, to }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `group flex items-center gap-2 cursor-pointer rounded px-2 py-3 text-gray-700 dark:text-gray-200 
        ${isActive ? "bg-[#1E40AF] text-white" : ""} 
        hover:bg-[#2563EB] hover:!text-white`
      }
    >
      {icon} {text}
    </NavLink>
  );
}


export default function SidebarComponent({
  sidebarOpen,
  setSidebarOpen,
  setShowModal,
}) {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <aside
      className={[
        "transform transition-transform duration-300 will-change-transform",
        "fixed inset-y-0 left-0 w-64 z-40 bg-gray-50 dark:bg-gray-900",
        "border-r border-gray-300 dark:border-gray-700",
        // hide on mobile + tablet (visible only on lg and up)
        sidebarOpen ? "translate-x-0" : "-translate-x-full",
        "lg:static lg:translate-x-0 lg:inset-auto lg:h-screen lg:z-0",
        "top-0",
      ].join(" ")}
    >
      <div className="p-4 text-sm">
        {/* Close button (only visible below lg) */}
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

      <aside
        className={[
          "transform transition-transform duration-300 will-change-transform",
          "fixed inset-y-0 left-0 w-64 z-40 bg-gray-50 dark:bg-gray-900",
          "border-r border-gray-300 dark:border-gray-700",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "lg:static lg:translate-x-0 lg:inset-auto lg:h-auto lg:z-0",
        ].join(" ")}
      >
        <div className="p-4 text-sm">
          {/* Close button for mobile/iPad */}
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
            <NavItem icon={<LayoutGrid size={16} />} text="Boards" to="/board" />
            <NavItem
              icon={<FileText size={16} />}
              text="Templates"
              to="/templateuser"
            />
          </div>

          {/* Workspace */}
        <div className="mt-6">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
            Workspace
          </h3>

          {/* Workspace */}
          <div className="mt-6">
            <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
              Workspace
            </h3>

            <div
              className={`flex items-center justify-between cursor-pointer p-2 rounded ${
                openDropdown
                  ? "bg-[#1E40AF] text-white"
                  : "text-gray-800 dark:text-gray-200"
              } hover:bg-[#2563EB] hover:text-white`}
              onClick={() => setOpenDropdown((v) => !v)}
            >
              <span className="flex items-center gap-2 font-medium">
                🌍 TaskFlow
              </span>
              {openDropdown ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </div>

            <AnimatePresence>
              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden text-gray-600 dark:text-gray-300 rounded-b-lg shadow-lg border border-gray-100 dark:border-gray-700"
                >
                  <NavLink
                    to="/workspaceboard"
                    className="block cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2"
                  >
                    Boards
                  </NavLink>
                  <NavLink
                    to="/workspacemember"
                    className="block cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2"
                  >
                    Members
                  </NavLink>
                  <NavLink
                    to="/workspacesetting"
                    className="block cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2"
                  >
                    Settings
                  </NavLink>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className="mt-3 text-[#1E40AF] dark:text-white text-sm hover:bg-[#2563EB] hover:text-white rounded py-2 px-3 w-full justify-start flex items-center gap-2 border border-blue-600 dark:border-blue-400"
              onClick={() => setShowModal(true)}
            >
              + Create a Workspace
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
