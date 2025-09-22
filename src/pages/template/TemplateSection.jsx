import React from "react";
import TemplateCard from "./TemplateCard";

export default function TemplateSection({ title, templates, viewMode = "grid" }) {
  if (!templates || templates.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            : "flex flex-col gap-4"
        }
      >
        {templates.map((template) => (
          viewMode === "grid" ? (
            <TemplateCard key={template.id} template={template} />
          ) : (
            <div
              key={template.id}
              className="group border rounded-2xl bg-gradient-to-r from-white to-gray-50 shadow-sm hover:shadow-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] flex items-center space-x-6 p-6"
            >
              {/* Image with overlay effect */}
              <div className="relative">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-40 h-28 rounded-xl flex-shrink-0 object-cover shadow-lg group-hover:shadow-2xl transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {template.title}
                  </h3>
                  {template.featured && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-primary border border-blue-200">
                      ✨ Featured
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {template.description}
                </p>
                
                {/* Action button */}
                <button className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary text-white text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg">
                  <span>Use Template</span>
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>
          )
        ))}
      </div>
    </div>
  );
}