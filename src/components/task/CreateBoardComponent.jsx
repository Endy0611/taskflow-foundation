import { X } from "lucide-react";

export function CreateBoardComponent({ onClose }) {
  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 dark:text-white rounded-lg p-6 shadow-lg relative space-y-6">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-white"
      >
        <X size={20} />
      </button>

      <h2 className="text-2xl font-semibold text-center text-primary">
        Create Board
      </h2>

      {/* Board Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Board title</label>
        <input
          type="text"
          className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md bg-white dark:bg-gray-700 dark:text-white focus:outline-none"
        />
        <p className="text-danger text-sm">Board title is required</p>
      </div>

      {/* Visibility */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Visibility</label>
        <select className="w-full border border-gray-300 dark:border-gray-600 px-2 py-2 rounded-md bg-white dark:bg-gray-700 dark:text-white">
          <option>Workspace</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <button className="bg-primary text-white px-4 py-2 rounded-md flex-1">
          Create
        </button>
        <button className="bg-secondary text-white px-4 py-2 rounded-md flex-1">
          Start with a template
        </button>
      </div>
    </div>
  );
}
