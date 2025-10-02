// components/cards/TemplateCard.jsx
export function TemplateCard({ title, imageId, onClick }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden shadow-md group cursor-pointer"
      onClick={onClick}
    >
      <img
        src={`https://picsum.photos/600/400?random=${imageId}`}
        alt={title}
        className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-sm px-3 py-2">
        {title}
      </div>
    </div>
  );
}
