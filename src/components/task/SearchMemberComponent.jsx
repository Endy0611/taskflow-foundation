export default function SearchMemberComponent() {
  const members = [
    { name: "Dara Dorn", initials: "DD", color: "bg-blue-500" },
    { name: "Mon Sreyneat", initials: "MS", color: "bg-orange-500" },
    { name: "Ong Endy", initials: "OE", color: "bg-purple-500" },
    { name: "Rith Saramanith", initials: "RS", color: "bg-green-500" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg w-80 p-4">
      <input
        type="text"
        placeholder="Search members..."
        className="w-full border rounded-md px-2 py-1 mb-3 focus:outline-none"
      />
      <h3 className="text-sm text-gray-500 mb-2">Board members</h3>
      <div className="space-y-2">
        {members.map((m, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${m.color}`}>
              {m.initials}
            </div>
            <span className="text-gray-700">{m.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
