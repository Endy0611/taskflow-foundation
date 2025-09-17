import { useState } from "react";
import TemplateSection from "../template/TemplateSection";
import {
  templates,
  categories,
  categoryIcons,
} from "../../features/template/templatesData";

export default function TemplatePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Group templates by category
  const templatesByCategory = categories.reduce((acc, category) => {
    acc[category] = templates.filter((t) => t.category === category);
    return acc;
  }, {});

  // Filter templates based on search and selected category
  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch =
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group filtered templates by category
  const filteredTemplatesByCategory = categories.reduce((acc, category) => {
    acc[category] = filteredTemplates.filter((t) => t.category === category);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {selectedCategory === "All"
              ? "All Templates"
              : `${selectedCategory} Templates`}
          </h1>
          <p className="mt-2 text-gray-600">
            {selectedCategory === "All"
              ? "Browse all available templates"
              : `Browse our ${selectedCategory.toLowerCase()} templates`}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <button
            onClick={() => setSelectedCategory("All")}
            className={`flex flex-col items-center p-4 rounded-lg ${
              selectedCategory === "All"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            } transition-colors duration-200`}
          >
            <span className="text-2xl mb-2">📑</span>
            <span className="text-sm font-medium">All</span>
            <span className="text-xs mt-1">{templates.length}</span>
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex flex-col items-center p-4 rounded-lg ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } transition-colors duration-200`}
            >
              <span className="text-2xl mb-2">{categoryIcons[category]}</span>
              <span className="text-sm font-medium">{category}</span>
              <span className="text-xs mt-1">
                {templatesByCategory[category].length}
              </span>
            </button>
          ))}
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-100 px-4 py-2 rounded-lg border border-gray-300 "
          />
        </div>

        {/* Template Sections */}
        {selectedCategory === "All" ? (
          categories.map((category) => {
            const categoryTemplates = filteredTemplatesByCategory[category];
            if (categoryTemplates.length === 0) return null;
            return (
              <TemplateSection
                key={category}
                title={category}
                templates={categoryTemplates}
              />
            );
          })
        ) : (
          // Show only selected category
          <TemplateSection
            title={selectedCategory}
            templates={filteredTemplatesByCategory[selectedCategory]}
          />
        )}

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">
              No templates found
            </h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your search or filter to find what you're looking
              for
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
