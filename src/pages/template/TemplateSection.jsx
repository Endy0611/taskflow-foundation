export default function TemplateSection({ title, templates, viewMode }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-xl bg-white shadow-sm overflow-hidden transition ${
              viewMode === "list" ? "flex items-center space-x-4 p-4" : ""
            }`}
          >
            {/* Image */}
            <img
              src={template.image}
              alt={template.title}
              className={`object-cover ${
                viewMode === "grid"
                  ? "w-full h-40"
                  : "w-32 h-24 rounded-md flex-shrink-0"
              }`}
            />

            {/* Info */}
            <div className={`${viewMode === "grid" ? "p-4" : ""}`}>
              <h3 className="text-lg font-semibold">{template.title}</h3>
              <p className="text-gray-500 text-sm">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
