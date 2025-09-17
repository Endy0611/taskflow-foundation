export function AttachFileComponent() {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg p-6 shadow-lg space-y-4">
      <h3 className="text-xl font-semibold text-center">Attach</h3>

      <div className="space-y-1">
        <label className="text-sm text-gray-600 font-semibold">Attach file from your computer</label>
        <button className="border border-gray-300 w-full py-2 rounded-md hover:bg-gray-100 transition mt-2 font-semibold">Choose a file</button>
      </div>

      <div className="space-y-1">
        <label className="text-sm text-gray-600 font-semibold">Paste a link</label>
        <input
          type="text"
          placeholder="Paste a link here"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none mt-2"
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button className="text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md transition">Cancel</button>
        <button className="bg-primary text-white px-4 py-2 rounded-md transition">Insert</button>
      </div>
    </div>
  )
}
