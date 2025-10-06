// components/cards/BoardPreviewCard.jsx
export function BoardPreviewCard({ title, imageId, isCreateNew, onClick }) {
  return (
    <div
      className={`relative rounded-xl overflow-hidden shadow-md border ${
        isCreateNew
          ? "bg-gray-200 dark:bg-gray-800 flex items-center justify-center cursor-pointer"
          : "cursor-pointer"
      }`}
      onClick={onClick}
    >
      {!isCreateNew ? (
        <>
          <img
            src={`https://picsum.photos/600/400?random=${imageId}`}
            alt={title}
            className="w-full h-32 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-3 py-1">
            {title}
          </div>
        </>
      ) : (
        <span className="text-gray-600 dark:text-gray-300 font-medium">
          + {title}
        </span>
      )}
    </div>
  );
}