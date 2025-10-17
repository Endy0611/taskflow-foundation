import { useState } from "react";
import { X } from "lucide-react";

export function AttachFileComponent({ onAttach, onClose }) {
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);

  const handleChooseFile = () => document.getElementById("fileInput").click();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setLink("");
    }
  };

  const handleInsert = () => {
    if (file) onAttach(file);
    else if (link.trim()) onAttach(link.trim());
  };

  return (
    <div className="w-full max-w-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg p-6 shadow-lg space-y-4 relative transition-all duration-200">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-3 p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>

      <h3 className="text-xl font-semibold text-center mb-4">Attach</h3>

      {/* File Upload */}
      <div className="space-y-2">
        <label className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
          Attach file from your computer
        </label>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={handleChooseFile}
          className="border border-gray-300 dark:border-gray-700 w-full py-2 rounded-md bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition font-semibold"
        >
          {file ? `Selected: ${file.name}` : "Choose a file"}
        </button>
      </div>

      {/* Link Input */}
      <div className="space-y-2">
        <label className="text-sm text-gray-700 dark:text-gray-300 font-semibold">
          Paste a link
        </label>
        <input
          type="text"
          placeholder="Paste a link here"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
            setFile(null);
          }}
          className="w-full border border-gray-300 dark:border-gray-700 px-3 py-2 rounded-md bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-2">
        <button
          onClick={handleInsert}
          disabled={!file && !link.trim()}
          className={`px-4 py-2 rounded-md transition font-medium ${
            file || link.trim()
              ? "bg-primary text-white hover:bg-primary/90"
              : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
          }`}
        >
          Insert
        </button>
      </div>
    </div>
  );
}
