// components/restaurant/menu-item-card.tsx
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import type { MenuItem } from "@/types/restaurant";
import { Button } from "@/components/ui/button";

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  addToCart: () => void;
  removeFromCart: () => void;
}

export default function MenuItemCard({ item, quantity, addToCart, removeFromCart }: MenuItemCardProps) {
  return (
    <div className="flex gap-4 p-4 border rounded-xl hover:shadow-lg transition-shadow">
      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
        {item.isPopular && (
          <span className="absolute top-2 left-2 bg-yellow-400 text-xs px-2 py-0.5 rounded-full text-black">Popular</span>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
            <div className="flex gap-2 mt-2">
              {item.isVegetarian && <span className="text-xs text-green-600">🌱 Veg</span>}
              <span className="text-xs text-muted-foreground">⏱ {item.preparationTime} min</span>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg">${item.price}</p>
            <div className="flex items-center gap-2 mt-2">
              {quantity > 0 ? (
                <div className="flex items-center gap-2">
                  <Button onClick={removeFromCart} variant="outline" size="icon" className="w-7 h-7">
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="font-semibold w-5 text-center">{quantity}</span>
                  <Button onClick={addToCart} size="icon" className="w-7 h-7 bg-primary hover:bg-primary/90">
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <Button onClick={addToCart} className="px-3 py-1 h-8 bg-primary hover:bg-primary/90">
                  Add
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}