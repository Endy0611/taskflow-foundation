import { Pencil } from "lucide-react";

export default function LabelComponent() {
  const labels = [
    { color: "bg-green-500" },
    { color: "bg-yellow-400" },
    { color: "bg-orange-500" },
    { color: "bg-red-600" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg w-80 p-4">
      <input
        type="text"
        placeholder="Search labels..."
        className="w-full border rounded-md px-2 py-1 mb-3 focus:outline-none"
      />
      <h3 className="text-sm text-gray-500 mb-2">Labels</h3>
      <div className="space-y-2">
        {labels.map((l, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4" />
            <div className={`h-6 flex-1 rounded-sm ${l.color}`} />
            <Pencil className="w-4 h-4 text-gray-600 cursor-pointer" />
          </div>
        ))}
      </div>
      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md py-2 mt-3">
        Create a new label
      </button>
    </div>
  );
}
