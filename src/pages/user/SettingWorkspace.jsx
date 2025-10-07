import React, { useState } from "react";
import {
  Lock,
  Globe,
  Users,
  ShieldAlert,
  X,
  Edit2,
  Check,
  ChevronDown,
} from "lucide-react";

export default function SettingWorkspace() {
  const [modal, setModal] = useState(null);
  const [visibility, setVisibility] = useState("private");
  const [workspaceName, setWorkspaceName] = useState("TaskFlow Workspace");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(workspaceName);

  const openModal = (type) => setModal(type);
  const closeModal = () => setModal(null);

  const saveName = () => {
    if (tempName.trim()) {
      setWorkspaceName(tempName);
      setIsEditingName(false);
    }
  };

  const isPrivate = visibility === "private";
  const VisibilityIcon = isPrivate ? Lock : Globe;
  const visibilityLabel = isPrivate ? "Private" : "Public";
  const visibilityColor = isPrivate ? "text-red-500" : "text-green-500";

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex justify-center py-10 px-6 transition-colors">
      <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        {/* ---------- Sidebar ---------- */}
        <aside className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 h-fit transition-colors">
          <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">
            Personal Settings
          </h3>
          <nav className="flex flex-col text-sm space-y-2">
            <a
              href="/profile"
              className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" /> Profile
            </a>
            <a
              href="/settingworkspace"
              className="px-3 py-2 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium flex items-center gap-2"
            >
              <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Setting
            </a>
          </nav>
        </aside>

        {/* ---------- Main ---------- */}
        <main className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 transition-colors">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-orange-500 text-white font-bold text-2xl rounded-lg flex items-center justify-center">
                TF
              </div>
              <div>
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveName()}
                      autoFocus
                      onBlur={saveName}
                      className="border-b border-blue-500 text-lg font-semibold px-1 bg-transparent focus:outline-none dark:text-white"
                    />
                    <button
                      onClick={saveName}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      <Check size={16} />
                    </button>
                  </div>
                ) : (
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    {workspaceName}
                    <button
                      onClick={() => {
                        setTempName(workspaceName);
                        setIsEditingName(true);
                      }}
                      className="p-1 border dark:border-gray-700 rounded-md text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    >
                      <Edit2 size={15} />
                    </button>
                  </h2>
                )}

                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1 mt-1">
                  <VisibilityIcon className={`w-4 h-4 ${visibilityColor}`} />{" "}
                  {visibilityLabel}
                </p>
              </div>
            </div>

            <button className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 px-3 py-1.5 rounded-md text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              English <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* ---------- Settings Sections ---------- */}
          <SettingSection
            title="Workspace visibility"
            value={
              <>
                <VisibilityIcon
                  className={`inline w-4 h-4 ${visibilityColor} mr-1`}
                />
                {visibilityLabel} – This Workspace is{" "}
                {isPrivate
                  ? "private and not indexed or visible to outsiders."
                  : "public and visible to anyone with the link."}
              </>
            }
            onChange={() => openModal("visibility")}
          />

          <SettingSection
            title="Workspace membership restriction"
            value="Anyone can be added to this Workspace."
            onChange={() => openModal("membership")}
          />

          <SettingSection
            title="Board creation restrictions"
            custom={
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <p>
                  Any Workspace member can create{" "}
                  <Globe className="inline w-4 h-4 text-green-500" /> public
                  boards.
                </p>
                <p>
                  Any Workspace member can create{" "}
                  <Users className="inline w-4 h-4 text-orange-500" /> Workspace
                  visible boards.
                </p>
                <p>
                  Any Workspace member can create{" "}
                  <Lock className="inline w-4 h-4 text-red-500" /> private
                  boards.
                </p>
              </div>
            }
            onChange={() => openModal("creation")}
          />

          <SettingSection
            title="Board deletion restrictions"
            custom={
              <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                <p>
                  Any Workspace member can delete{" "}
                  <Globe className="inline w-4 h-4 text-green-500" /> public
                  boards.
                </p>
                <p>
                  Any Workspace member can delete{" "}
                  <Users className="inline w-4 h-4 text-orange-500" /> Workspace
                  visible boards.
                </p>
                <p>
                  Any Workspace member can delete{" "}
                  <Lock className="inline w-4 h-4 text-red-500" /> private
                  boards.
                </p>
              </div>
            }
            onChange={() => openModal("deletion")}
          />

          <SettingSection
            title="Sharing boards with guests"
            value="Anybody can send or receive invitations to boards in this Workspace."
            onChange={() => openModal("sharing")}
          />

          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            Need to delete your Workspace? Please cancel your subscription on
            the billing tab first.
          </p>
        </main>
      </div>

      {/* ---------- Modal ---------- */}
      <PopupModal
        type={modal}
        close={closeModal}
        visibility={visibility}
        setVisibility={setVisibility}
      />
    </div>
  );
}

/* ---------- Setting Section ---------- */
function SettingSection({ title, value, custom, onChange }) {
  return (
    <div className="py-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <div className="text-sm text-gray-700 dark:text-gray-300">{custom || value}</div>
      </div>
      <button
        onClick={onChange}
        className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 text-sm px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600"
      >
        Change
      </button>
    </div>
  );
}

/* ---------- Popup Modal ---------- */
function PopupModal({ type, close, visibility, setVisibility }) {
  if (!type) return null;

  const modalTitle = {
    visibility: "Select Workspace visibility",
    membership: "Workspace membership restriction",
    creation: "Board creation restrictions",
    deletion: "Board deletion restrictions",
    sharing: "Inviting guests",
  }[type];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 w-[540px] relative border border-gray-200 dark:border-gray-700 transition-colors">
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-base font-semibold mb-5">{modalTitle}</h2>
        <OptionGroup
          type={type}
          visibility={visibility}
          setVisibility={setVisibility}
        />
        <div className="flex justify-end mt-6">
          <button
            onClick={close}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-sm font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- OptionGroup + RadioList unchanged (dark mode added) ---------- */
function OptionGroup({ type, visibility, setVisibility }) {
  const [selectedOptions, setSelectedOptions] = useState({
    public: 0,
    visible: 0,
    private: 0,
  });
  const [selected, setSelected] = useState(visibility === "private" ? 0 : 1);

  const setOption = (category, value) =>
    setSelectedOptions((prev) => ({ ...prev, [category]: value }));

  if (type === "creation" || type === "deletion") {
    const action = type === "creation" ? "create" : "delete";
    const categories = [
      { key: "public", icon: <Globe className="text-green-500" />, label: "public" },
      { key: "visible", icon: <Users className="text-orange-500" />, label: "workspace visible" },
      { key: "private", icon: <Lock className="text-red-500" />, label: "private" },
    ];

    return (
      <div className="bg-[#f9fafb] dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 space-y-6 shadow-sm">
        {categories.map((cat, idx) => (
          <div key={idx} className={idx !== 0 ? "pt-5 border-t border-gray-200 dark:border-gray-700" : ""}>
            <div className="flex items-center gap-2 mb-2">
              {cat.icon}
              <p className="font-medium text-sm text-gray-800 dark:text-gray-200">
                Who can {action} {cat.label} boards?
              </p>
            </div>

            <div className="flex flex-col gap-2 pl-6">
              {["Any Workspace member", "Only Workspace admins", "Nobody"].map(
                (option, i) => {
                  const isSelected = selectedOptions[cat.key] === i;
                  return (
                    <label
                      key={i}
                      onClick={() => setOption(cat.key, i)}
                      className={`flex items-center gap-2 rounded-md cursor-pointer transition-all border px-3 py-2 ${
                        isSelected
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-600 font-medium"
                          : "border-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`${cat.key}-radio`}
                        checked={isSelected}
                        onChange={() => setOption(cat.key, i)}
                        className="accent-blue-600"
                      />
                      <span className="text-sm">{option}</span>
                    </label>
                  );
                }
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "visibility") {
    const options = [
      {
        icon: <Lock className="text-red-500" />,
        title: "Private",
        desc: "This Workspace is private. It’s not indexed or visible to those outside the Workspace.",
      },
      {
        icon: <Globe className="text-green-500" />,
        title: "Public",
        desc: "This Workspace is public. It’s visible to anyone with the link and will show up in search engines.",
      },
    ];

    return (
      <div className="space-y-3">
        {options.map((o, i) => {
          const active = selected === i;
          return (
            <label
              key={i}
              onClick={() => {
                setSelected(i);
                setVisibility(i === 0 ? "private" : "public");
              }}
              className={`flex items-start gap-3 border rounded-lg p-3 cursor-pointer transition ${
                active
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <input
                type="radio"
                checked={active}
                onChange={() => {
                  setSelected(i);
                  setVisibility(i === 0 ? "private" : "public");
                }}
                className="mt-1 accent-blue-600"
              />
              <div>
                <p className="font-medium flex items-center gap-2">
                  {o.icon} {o.title}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{o.desc}</p>
              </div>
            </label>
          );
        })}
      </div>
    );
  }

  if (type === "membership") {
    const options = [
      {
        icon: <Users className="text-blue-500" />,
        title: "Anybody",
        desc: "Anybody can be added to this Workspace.",
      },
      {
        icon: <ShieldAlert className="text-orange-500" />,
        title: "Only specific email domains",
        desc: "Only members with approved email domains can be added to this Workspace.",
      },
    ];
    return <RadioList options={options} />;
  }

  if (type === "sharing") {
    const options = [
      {
        title: "Anybody",
        desc: "Workspace boards can be shared with anybody.",
      },
      {
        title: "Only Workspace members",
        desc: "Workspace boards can only be shared with members of this Workspace.",
      },
    ];
    return <RadioList options={options} />;
  }

  return null;
}

function RadioList({ options }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="space-y-3">
      {options.map((o, i) => {
        const active = selected === i;
        return (
          <label
            key={i}
            onClick={() => setSelected(i)}
            className={`flex items-start gap-3 border rounded-lg p-3 cursor-pointer transition ${
              active
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <input
              type="radio"
              checked={active}
              onChange={() => setSelected(i)}
              className="mt-1 accent-blue-600"
            />
            <div>
              <p className="font-medium flex items-center gap-2">
                {o.icon} {o.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{o.desc}</p>
            </div>
          </label>
        );
      })}
    </div>
  );
}
