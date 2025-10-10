import { X } from "lucide-react";

export default function CreateCardComponent({ onClose }) {
  return (
    <div className="bg-white rounded-lg shadow-lg w-96 p-4">
      <div className="relative flex justify-center items-center">
        <h2 className="text-lg font-semibold flex justify-center">
          Create Card
        </h2>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700" onClick={onClose}>
          <X />
        </button>
      </div>
      <textarea
        placeholder="Enter card details..."
        className="w-full h-24 border rounded-md p-2 focus:outline-none mt-4"
        defaultValue="Hello"
      />
      <button className="w-full bg-primary text-white rounded-md py-2 mt-3 ">
        Create card
      </button>
    </div>
  );
}

