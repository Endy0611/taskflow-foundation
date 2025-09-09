import { X } from "lucide-react";

export default function CreateCardModal({ onClose }) {
  return (
    <div className="bg-white rounded-lg shadow-lg w-96 p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold">Create card</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X />
        </button>
      </div>
      <textarea
        placeholder="Enter card details..."
        className="w-full h-24 border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        defaultValue="Hello"
      />
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2 mt-3">
        Create card
      </button>
    </div>
  );
}
