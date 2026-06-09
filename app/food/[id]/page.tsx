import { notFound } from "next/navigation";
import Link from "next/link";
import { getRestaurantByMenuItemId, restaurants } from "@/lib/restaurant-data";
import { Star, Heart, Clock, Plus, Minus } from "lucide-react" ;// optional icons, we'll use simple emoji fallback
import Navbar from "@/components/navbar/navbar";

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < full ? "text-yellow-500" : (i === full && half ? "text-yellow-500" : "text-gray-300")}>
          ★
        </span>
      ))}
    </div>
  );
}

export default async function FoodPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Find the restaurant that contains this menu item
  const restaurant = getRestaurantByMenuItemId(id);
  if (!restaurant) return notFound();
  
  const foodItem = restaurant.menu.find(item => item.id === id);
  if (!foodItem) return notFound();

  // Other items from same restaurant (exclude current)
  const otherItems = restaurant.menu.filter(item => item.id !== id);

  return (
    <main className="container mx-auto px-4 py-32 max-w-6xl">
      <Navbar/>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Image */}
        <div className="relative rounded-2xl overflow-hidden bg-gray-100">
          <img src={foodItem.image} alt={foodItem.name} className="w-full h-full object-cover aspect-square" />
        </div>

        {/* Right: Details */}
        <div className="space-y-6">
          {/* Restaurant link */}
          <Link href={`/restaurant/${restaurant.id}`} className="text-sm text-primary hover:underline inline-block">
            ← {restaurant.name} • {restaurant.cuisine}
          </Link>

          <h1 className="text-3xl md:text-4xl font-black">{foodItem.name}</h1>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Stars rating={foodItem.rating} />
              <span className="text-sm text-muted-foreground">{foodItem.rating}</span>
            </div>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="w-4 h-4" /> {foodItem.preparationTime}
            </span>
            {foodItem.isVegetarian && <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Vegetarian</span>}
            {foodItem.isPopular && <span className="text-xs bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">🔥 Popular</span>}
          </div>

          <p className="text-muted-foreground">{foodItem.description}</p>

          <div className="text-3xl font-bold">${foodItem.price.toFixed(2)}</div>

          {/* Quantity and Buttons */}
          <div className="flex items-center gap-4 pt-4 border-t">
            <div className="flex items-center border rounded-lg">
              <button className="px-3 py-2 hover:bg-gray-100">-</button>
              <span className="w-10 text-center">1</span>
              <button className="px-3 py-2 hover:bg-gray-100">+</button>
            </div>
            <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition">
              Add to Cart
            </button>
            <button className="p-3 border rounded-xl hover:bg-gray-100">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Related items from same restaurant */}
      {otherItems.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">More from {restaurant.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {otherItems.map(item => (
              <Link key={item.id} href={`/food/${item.id}`} className="group">
                <div className="bg-card rounded-xl overflow-hidden border hover:shadow-lg transition">
                  <img src={item.image} alt={item.name} className="w-full h-40 object-cover group-hover:scale-105 transition duration-300" />
                  <div className="p-4">
                    <h3 className="font-bold line-clamp-1">{item.name}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-semibold">${item.price.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground">⭐ {item.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}