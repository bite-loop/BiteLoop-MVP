// components/restaurant/popular-items.tsx
import { Award } from "lucide-react";

interface PopularItemsProps {
  popularItems: string[];
}

export default function PopularItems({ popularItems }: PopularItemsProps) {
  if (!popularItems || popularItems.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Award className="w-5 h-5 text-primary" /> Popular Items
      </h2>
      <div className="flex flex-wrap gap-3">
        {popularItems.map(item => (
          <span key={item} className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            {item.replace("-", " ").toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
}