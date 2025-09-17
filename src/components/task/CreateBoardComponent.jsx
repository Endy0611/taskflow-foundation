import { X } from 'lucide-react'

export function CreateBoardComponent() {
  return (
    <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg relative space-y-6">
      <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
        <X size={20} />
      </button>

      <h2 className="text-2xl font-semibold text-center text-primary">Create Board</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Board title</label>
        <input
          type="text"
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none"
        />
        <p className="text-danger text-sm">Board title is required</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Visibility</label>
        <select className="w-full border border-gray-300 px-4 py-2 rounded-md">
          <option>Workspace</option>
        </select>
      </div>

      <div className="flex gap-3 pt-4">
        <button className="bg-primary text-white px-4 py-2 rounded-md flex-1">Create</button>
        <button className="bg-secondary text-white px-4 py-2 rounded-md flex-1">Start with a template</button>
      </div>
    </div>
  )
}
