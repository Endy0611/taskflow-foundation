import { motion } from 'framer-motion';
import "../../index.css";

export default function TemplateCard({ template }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
    >
      <div className="aspect-w-16 aspect-h-9">
        <img
          src={template.image}
          alt={template.title}
          className="w-full h-50 object-cover justify-items-center "
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            {template.title}
          </h3>
          <span className="px-2 py-1 text-xs font-medium text-primary bg-blue-50 rounded-full">
            {template.category}
          </span>
        </div>
        <p className="text-sm text-gray-600">{template.description}</p>
        <button
          onClick={() => console.log("Template selected:", template.id)}
          className="mt-4 w-full px-4 py-2 text-sm font-medium text-primary bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
        >
          Use Template
        </button>
      </div>
    </motion.div>
  );
}
