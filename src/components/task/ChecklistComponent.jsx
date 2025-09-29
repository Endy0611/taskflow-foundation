export default function ChecklistComponent() {
  return (
    <div className="bg-white rounded-lg shadow-lg w-80 p-4">
      <h2 className="text-lg font-semibold mb-3 flex justify-center">Checklist</h2>
      <label className="text-sm text-gray-700 block mb-1">Title</label>
      <input
        type="text"
        placeholder="Checklist name..."
        className="w-full border rounded-md px-2 py-1 focus:outline-none"
      />
      <button className="bg-primary text-white rounded-md px-4 py-2 mt-3">
        Add
      </button>
    </div>
  );
}
