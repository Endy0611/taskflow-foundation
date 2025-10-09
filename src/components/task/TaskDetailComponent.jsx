import { useState } from "react";
import {
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

export default function TaskDetailComponent({ card, onClose, onDeleteCard }) {
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Analyze features", checked: true },
    { id: 2, text: "Analyze ERD", checked: true },
    { id: 3, text: "Analyze UI Design", checked: false },
    { id: 4, text: "Prepare documentation", checked: false },
  ]);
  const [attachments, setAttachments] = useState([]);
  const [labels, setLabels] = useState([
    { title: "Priority", color: "#22c55e" },
  ]);

  const [members, setMembers] = useState([
    { initials: "MS", color: "bg-orange-500" },
  ]);

  const [activePopup, setActivePopup] = useState(null);
  const [hideChecked, setHideChecked] = useState(false);

  const toggleCheck = (id) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const progress =
    (checklist.filter((item) => item.checked).length / checklist.length) * 100;

  // ✅ Delete checklist
  const handleDeleteChecklist = () => {
    if (onDeleteCard && card?.id) {
      onDeleteCard(card.id);
    }
    setActivePopup(null);
  };

  // ✅  toggle labels
  const handleToggleLabel = (label) => {
    setLabels((prev) => {
      const exists = prev.some((l) => l.title === label.title);
      if (exists) {
        // remove
        return prev.filter((l) => l.title !== label.title);
      } else {
        // add
        return [...prev, { title: label.title, color: label.color }];
      }
    });
  };

  // ✅ Add attachment
  const handleAddAttachment = (fileOrLink) => {
    if (fileOrLink instanceof File) {
      const fileUrl = URL.createObjectURL(fileOrLink);
      setAttachments((prev) => [
        ...prev,
        { name: fileOrLink.name, url: fileUrl, type: "file" },
      ]);
    } else if (typeof fileOrLink === "string") {
      setAttachments((prev) => [
        ...prev,
        { name: fileOrLink, url: fileOrLink, type: "link" },
      ]);
    }
    setActivePopup(null);
  };

  // ✅ Add label
  const handleAddLabel = (label) => {
    setLabels((prev) => [...prev, label]);
    setActivePopup(null);
  };

  // ✅ Add member
  const handleAddMember = (member) => {
    setMembers((prev) => [...prev, member]);
    setActivePopup(null);
  };

  // ✅ Add checklist item
  const handleAddChecklist = (text) => {
    if (!text.trim()) return;
    setChecklist((prev) => [...prev, { id: Date.now(), text, checked: false }]);
    setActivePopup(null);
  };

  // ✅ Popup rendering
  const renderPopup = () => {
    switch (activePopup) {
      case "delete":
        return (
          <DeleteChecklistComponent
            onConfirm={handleDeleteChecklist}
            onCancel={() => setActivePopup(null)}
          />
        );
      case "share":
        return <ShareBoardComponent onClose={() => setActivePopup(null)} />;
      case "labels":
        return (
          <LabelComponent
            selectedLabels={labels}
            onToggleLabel={handleToggleLabel}
            onClose={() => setActivePopup(null)}
          />
        );

      case "checklist":
        return (
          <ChecklistComponent
            onAdd={handleAddChecklist}
            onClose={() => setActivePopup(null)}
          />
        );
      case "members":
        return (
          <SearchMemberComponent
            onSelect={handleAddMember}
            onClose={() => setActivePopup(null)}
          />
        );
      case "attachment":
        return (
          <AttachFileComponent
            onAttach={handleAddAttachment}
            onClose={() => setActivePopup(null)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="max-w-xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6 relative text-gray-800 dark:text-gray-100"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center">
            <Circle className="mr-2 text-gray-700 dark:text-gray-300" />{" "}
            {card?.text || "Feature Details"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { icon: <Tag size={14} />, text: "Labels", action: "labels" },
            {
              icon: <CheckSquare size={14} />,
              text: "Checklist",
              action: "checklist",
            },
            { icon: <Users size={14} />, text: "Members", action: "members" },
            {
              icon: <Paperclip size={14} />,
              text: "Attachment",
              action: "attachment",
            },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={() => setActivePopup(btn.action)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600 transition"
            >
              {btn.icon}
              {btn.text}
            </button>
          ))}
        </div>

        {/* Members & Labels */}
        <div className="flex items-start gap-6 mb-6 flex-wrap">
          {/* ✅ Members Section */}
          <div>
            <p className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Members
            </p>
            <div className="flex flex-wrap gap-1 max-w-[210px]">
              {members.map((m, i) => (
                <div
                  key={i}
                  className={`w-9 h-9 rounded-full ${m.color} text-white flex items-center justify-center font-semibold text-sm`}
                >
                  {m.initials}
                </div>
              ))}

              <button
                onClick={() => setActivePopup("members")}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                +
              </button>
            </div>
          </div>

          {/* ✅ Labels Section */}
          <div>
            <p className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
              Labels
            </p>
            <div className="flex items-center gap-2 flex-wrap">
              {labels.map((l, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full font-medium text-white"
                  style={{ backgroundColor: l.color }}
                >
                  {l.title}
                </span>
              ))}
              <button
                onClick={() => setActivePopup("labels")}
                className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2 flex items-center text-gray-700 dark:text-gray-300">
            <ChartBarDecreasingIcon className="mr-2" /> Description
          </p>
          <textarea
            placeholder="Add a more detailed description..."
            className="w-full border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            rows="3"
          ></textarea>
        </div>

        {/* Checklist */}
        {checklist.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium flex items-center text-gray-700 dark:text-gray-300">
                <ChartBarDecreasingIcon className="mr-2" />
                Checklist
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setHideChecked((prev) => !prev)}
                  className="text-xs px-3 py-1 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                >
                  {hideChecked ? "Show checked" : "Hide checked"}
                </button>
                <button
                  onClick={() => setActivePopup("delete")}
                  className="text-xs px-3 py-1 rounded-lg bg-red-600 text-white flex items-center gap-1 hover:bg-red-700"
                >
                  <Trash size={12} /> Delete
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-8">
                {progress.toFixed(0)}%
              </span>
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
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
              {checklist
                .filter((item) => (hideChecked ? !item.checked : true))
                .map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={() => toggleCheck(item.id)}
                      className="w-4 h-4 rounded border-gray-400 text-blue-600 dark:bg-gray-700 dark:border-gray-500"
                    />
                    <span
                      className={`text-sm ${
                        item.checked
                          ? "line-through text-gray-400 dark:text-gray-500"
                          : "text-gray-800 dark:text-gray-100"
                      }`}
                    >
                      {item.text}
                    </span>
                  </label>
                ))}
            </div>
          </div>
        )}

        {/* Attachments */}
        {attachments.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-medium mb-2 flex items-center text-gray-700 dark:text-gray-300">
              <Paperclip className="mr-2" /> Attachments
            </p>
            <ul className="space-y-1 text-sm">
              {attachments.map((a, i) => (
                <li key={i}>
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-300"
                  >
                    {a.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
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
