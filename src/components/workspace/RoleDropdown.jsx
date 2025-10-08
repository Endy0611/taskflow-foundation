// src/components/workspace/RoleDropdown.jsx
import { useState } from "react";
import { updateMemberRole } from "../../services/workspaceService";

export default function RoleDropdown({ membershipId, initial, disabled, onChanged }) {
  const [val, setVal] = useState(initial);
  const [busy, setBusy] = useState(false);

  async function onSelect(next) {
    setVal(next);
    setBusy(true);
    try {
      await updateMemberRole({ membershipId, permission: next });
      onChanged?.(next);
    } finally {
      setBusy(false);
    }
  }

  return (
    <select disabled={disabled || busy}
      className="px-3 py-1.5 text-sm border rounded-lg bg-gray-100 dark:bg-gray-600 dark:text-white"
      value={val} onChange={(e)=>onSelect(e.target.value)}>
      <option value="OWNER">Owner</option>
      <option value="EDITOR">Editor</option>
      <option value="VIEWER">Viewer</option>
    </select>
  );
}