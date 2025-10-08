import { useState } from "react";
import {
  Plus,
  Tag,
  CheckSquare,
  Users,
  Paperclip,
  Circle,
  Trash,
  ChartBarDecreasingIcon,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { DeleteChecklistComponent } from "./DeleteChecklistComponent";
import { ShareBoardComponent } from "./ShareBoardComponent";
import LabelComponent from "./LabelComponent";
import ChecklistComponent from "./ChecklistComponent";
import SearchMemberComponent from "./SearchMemberComponent";
import { AttachFileComponent } from "./AttachFileComponent";

export default function TaskDetailComponent({ onClose }) {
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Analyze features", checked: true },
    { id: 2, text: "Analyze ERD", checked: true },
    { id: 3, text: "Analyze UI Design", checked: false },
    { id: 4, text: "Prepare documentation", checked: false },
  ]);

  const [activePopup, setActivePopup] = useState(null);

  const toggleCheck = (id) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const progress =
    (checklist.filter((item) => item.checked).length / checklist.length) * 100;

  // Popup render
  const renderPopup = () => {
    switch (activePopup) {
      case "delete":
        return <DeleteChecklistComponent />;
      case "share":
        return <ShareBoardComponent onClose={() => setActivePopup(null)} />;
      case "labels":
        return <LabelComponent />;
      case "checklist":
        return <ChecklistComponent />;
      case "members":
        return <SearchMemberComponent />;
      case "attachment":
        return <AttachFileComponent />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Main Task Detail */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="max-w-xl w-full bg-white rounded-2xl shadow-2xl border p-6 relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Circle className="mr-2" /> Feature Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { icon: <Plus size={14} />, text: "Add", action: null },
            { icon: <Tag size={14} />, text: "Labels", action: "labels" },
            { icon: <CheckSquare size={14} />, text: "Checklist", action: "checklist" },
            { icon: <Users size={14} />, text: "Members", action: "members" },
            { icon: <Paperclip size={14} />, text: "Attachment", action: "attachment" },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={() => btn.action && setActivePopup(btn.action)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-100 transition"
            >
              {btn.icon}
              {btn.text}
            </button>
          ))}
        </div>

        {/* Members & Labels */}
        <div className="flex items-start gap-6 mb-6">
          {/* Members */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Members</p>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center font-semibold text-sm">
                MS
              </div>
              <button
                onClick={() => setActivePopup("share")}
                className="w-9 h-9 flex items-center justify-center rounded-full border hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Labels */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Labels</p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium">
                Priority
              </span>
              <button
                onClick={() => setActivePopup("labels")}
                className="w-9 h-9 flex items-center justify-center rounded-full border hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <ChartBarDecreasingIcon className="mr-2" /> Description
          </p>
          <textarea
            placeholder="Add a more detailed description..."
            className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            rows="3"
          ></textarea>
        </div>

        {/* Checklist */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-700 flex items-center">
              <ChartBarDecreasingIcon className="mr-2" />
              Checklist
            </p>
            <div className="flex gap-2">
              <button className="text-xs px-3 py-1 border rounded-lg hover:bg-gray-100">
                Hide checked
              </button>
              <button
                onClick={() => setActivePopup("delete")}
                className="text-xs px-3 py-1 rounded-lg bg-danger text-white flex items-center gap-1"
              >
                <Trash size={12} /> Delete
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-gray-600 w-8">
              {progress.toFixed(0)}%
            </span>
            <div className="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
              <motion.div
                className="bg-blue-600 h-2"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Checklist items */}
          <div className="space-y-2">
            {checklist.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleCheck(item.id)}
                    className="w-4 h-4 rounded border-gray-400 text-primary"
                  />
                  <span
                    className={`text-sm ${
                      item.checked
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {item.text}
                  </span>
                </label>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Popup Overlay */}
      <AnimatePresence>
        {activePopup && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePopup(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {renderPopup()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
