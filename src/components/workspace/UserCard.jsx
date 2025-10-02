// components/cards/UserCard.jsx
export function UserCard({ name, tag, color, role }) {
  return (
    <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-400 dark:border-gray-600">
      <div
        className={`w-10 h-10 ${color} text-white flex items-center justify-center rounded-full font-medium`}
      >
        {tag}
      </div>
      <div className="flex-1">
        <p className="font-medium text-sm md:text-base">{name}</p>
      </div>
      <span className="text-xs bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded hover:bg-gray-300 dark:hover:bg-gray-500">
        {role}
      </span>
    </div>
  );
}