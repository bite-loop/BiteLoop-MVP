import { notFound } from "next/navigation";

// This would normally fetch from database. Using static data for now.
const foodItems = [
  { id: "1", name: "Margherita Pizza", price: 12.99, restaurant: "Pizza Fiesta", rating: 4.5, image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&h=400&fit=crop", description: "Classic margherita with fresh mozzarella, tomato sauce, and basil.", cuisine: "Italian", preparationTime: "15-20 min" },
  { id: "2", name: "Classic Burger", price: 9.99, restaurant: "Burger Hub", rating: 4.7, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop", description: "Juicy beef patty with lettuce, tomato, onion, and special sauce.", cuisine: "American", preparationTime: "10-15 min" },
  { id: "3", name: "Chicken Biryani", price: 14.99, restaurant: "Spice Kingdom", rating: 4.8, image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&h=400&fit=crop", description: "Aromatic basmati rice cooked with tender chicken and exotic spices.", cuisine: "Indian", preparationTime: "20-25 min" },
  { id: "4", name: "Sushi Platter", price: 18.99, restaurant: "Sushi Master", rating: 4.6, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop", description: "Assorted fresh sushi rolls with wasabi and ginger.", cuisine: "Japanese", preparationTime: "15-20 min" },
  { id: "5", name: "Caesar Salad", price: 8.99, restaurant: "Green Bowl", rating: 4.3, image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?w=600&h=400&fit=crop", description: "Crisp romaine lettuce, parmesan, croutons, and creamy caesar dressing.", cuisine: "Healthy", preparationTime: "5-10 min" },
  { id: "6", name: "Pad Thai", price: 13.99, restaurant: "Thai Street", rating: 4.7, image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&h=400&fit=crop", description: "Stir-fried rice noodles with shrimp, tofu, peanuts, and tamarind sauce.", cuisine: "Thai", preparationTime: "15-20 min" },
  { id: "7", name: "Ice Cream Sundae", price: 5.99, restaurant: "Dessert Den", rating: 4.9, image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&h=400&fit=crop", description: "Vanilla ice cream with hot fudge, caramel, nuts, and cherry.", cuisine: "Dessert", preparationTime: "5 min" },
  { id: "8", name: "Tacos", price: 11.99, restaurant: "Taco Loco", rating: 4.4, image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=400&fit=crop", description: "Three soft corn tortillas with seasoned beef, salsa, and guacamole.", cuisine: "Mexican", preparationTime: "10-15 min" },
];

export default async function FoodPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = foodItems.find(i => i.id === id);

  if (!item) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-card rounded-2xl overflow-hidden shadow-lg border">
        {/* Image */}
        <div className="relative h-96 w-full">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-black mb-2">{item.name}</h1>
          <p className="text-muted-foreground mb-4">{item.restaurant} · {item.cuisine}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</span>
            <span className="text-sm bg-primary/10 px-3 py-1 rounded-full">⭐ {item.rating}</span>
            <span className="text-sm text-muted-foreground">⏱️ {item.preparationTime}</span>
          </div>

          <p className="text-foreground/80 mb-8 leading-relaxed">{item.description}</p>

          <div className="flex gap-4">
            <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
              Add to Cart
            </button>
            <button className="px-6 border rounded-xl hover:bg-secondary transition-colors">
              ❤️
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}