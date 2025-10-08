// src/components/workspace/ConfirmDialog.jsx
export default function ConfirmDialog({ title, message, confirmText="Confirm", cancelText="Cancel", onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-sm rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 rounded border" onClick={onCancel}>{cancelText}</button>
          <button className="px-4 py-2 rounded bg-red-600 text-white" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
}
