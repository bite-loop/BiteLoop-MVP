// components/restaurant/restaurant-info.tsx
import { DollarSign, Clock, Award, CreditCard } from "lucide-react";
import type { Restaurant } from "@/types/restaurant";

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

export default function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
  const infoCards = [
    { icon: DollarSign, label: "Min Order", value: `$${restaurant.minOrder}` },
    { icon: Clock, label: "Delivery Time", value: restaurant.deliveryTime },
    { icon: CreditCard, label: "Delivery Fee", value: `$${restaurant.deliveryFee}` },
    { icon: Award, label: "Avg. Order", value: `$${restaurant.averageOrderValue}` },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {infoCards.map((card, idx) => (
        <div key={idx} className="bg-secondary/30 rounded-xl p-4 text-center">
          <card.icon className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">{card.label}</p>
          <p className="font-bold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}