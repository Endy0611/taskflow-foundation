export function DeleteChecklistComponent() {
  return (
    <div className="w-full max-w-sm bg-white rounded-lg p-6 shadow-lg text-center space-y-4">
      <h3 className="text-xl font-semibold">Are you sure to delete?</h3>
      <p className="text-gray-500 text-sm">Deleting a checklist, there is no way to get it back</p>
      <button className="bg-danger text-white px-4 py-2 rounded-md transition">Delete checklist</button>
    </div>
  )
}
