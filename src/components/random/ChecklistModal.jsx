export default function ChecklistModal() {
  return (
    <div className="bg-white rounded-lg shadow-lg w-80 p-4">
      <h2 className="text-lg font-semibold mb-3">Checklist</h2>
      <label className="text-sm text-gray-700 block mb-1">Title</label>
      <input
        type="text"
        placeholder="Checklist name..."
        className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 mt-3">
        Add
      </button>
    </div>
  );
}
