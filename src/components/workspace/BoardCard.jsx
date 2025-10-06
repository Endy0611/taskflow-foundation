// components/cards/BoardCard.jsx
import { motion } from "framer-motion";

export function BoardCard({ title, subtitle, color, image, isCreate }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -4 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative rounded-2xl shadow-lg overflow-hidden cursor-pointer bg-white/70 dark:bg-gray-700/70 backdrop-blur-md border border-gray-200/50 dark:border-gray-600/50"
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-36 object-cover group-hover:opacity-90 transition"
        />
      ) : (
        <div
          className={`w-full h-36 flex items-center justify-center bg-gradient-to-br ${color} text-white text-lg font-semibold`}
        >
          {isCreate ? "+" : title}
        </div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
        )}
      </div>
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
    </motion.div>
  );
}