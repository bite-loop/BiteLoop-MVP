export interface MenuItemType {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  preparationTime: string;
  isVegetarian?: boolean;
  isPopular?: boolean;
}

export interface RestaurantType {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  image: string;
  menu: MenuItemType[];
}

// Static restaurant data (will be replaced with Firestore later)
export const restaurants: RestaurantType[] = [
  {
    id: "pizza-fiesta",
    name: "Pizza Fiesta",
    cuisine: "Italian",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop",
    menu: [
      { id: "1", name: "Margherita Pizza", price: 12.99, description: "Classic margherita with fresh mozzarella, tomato sauce, and basil.", image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=600&h=400&fit=crop", rating: 4.5, preparationTime: "15-20 min", isVegetarian: true, isPopular: true },
      { id: "p2", name: "Pepperoni Pizza", price: 14.99, description: "Spicy pepperoni with mozzarella and tomato sauce.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&h=400&fit=crop", rating: 4.7, preparationTime: "15-20 min", isPopular: true },
      { id: "p3", name: "Garlic Bread", price: 4.99, description: "Toasted bread with garlic butter and herbs.", image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=600&h=400&fit=crop", rating: 4.3, preparationTime: "5-10 min", isVegetarian: true },
    ],
  },
  {
    id: "burger-hub",
    name: "Burger Hub",
    cuisine: "American",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&h=400&fit=crop",
    menu: [
      { id: "2", name: "Classic Burger", price: 9.99, description: "Juicy beef patty with lettuce, tomato, onion, and special sauce.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop", rating: 4.7, preparationTime: "10-15 min", isPopular: true },
      { id: "b2", name: "Cheese Burger", price: 11.99, description: "Beef patty with cheddar cheese, caramelized onions, and pickles.", image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&h=400&fit=crop", rating: 4.8, preparationTime: "10-15 min" },
      { id: "b3", name: "Veggie Burger", price: 10.99, description: "Plant-based patty with avocado, lettuce, and tomato.", image: "https://images.unsplash.com/photo-1585238342024-66e6c1d5e5e9?w=600&h=400&fit=crop", rating: 4.4, preparationTime: "10-15 min", isVegetarian: true },
    ],
  },
  {
    id: "spice-kingdom",
    name: "Spice Kingdom",
    cuisine: "Indian",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356c36?w=600&h=400&fit=crop",
    menu: [
      { id: "3", name: "Chicken Biryani", price: 14.99, description: "Aromatic basmati rice cooked with tender chicken and exotic spices.", image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&h=400&fit=crop", rating: 4.8, preparationTime: "20-25 min", isPopular: true },
      { id: "s2", name: "Butter Chicken", price: 16.99, description: "Creamy tomato-based curry with tender chicken pieces.", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&h=400&fit=crop", rating: 4.9, preparationTime: "20-25 min", isPopular: true },
      { id: "s3", name: "Garlic Naan", price: 2.99, description: "Soft bread with garlic and cilantro.", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=400&fit=crop", rating: 4.5, preparationTime: "5-10 min", isVegetarian: true },
    ],
  },
  {
    id: "sushi-master",
    name: "Sushi Master",
    cuisine: "Japanese",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=400&fit=crop",
    menu: [
      { id: "4", name: "Sushi Platter", price: 18.99, description: "Assorted fresh sushi rolls with wasabi and ginger.", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&h=400&fit=crop", rating: 4.6, preparationTime: "15-20 min", isPopular: true },
      { id: "su2", name: "Rainbow Roll", price: 16.99, description: "California roll topped with assorted sashimi.", image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=600&h=400&fit=crop", rating: 4.7, preparationTime: "15-20 min" },
      { id: "su3", name: "Miso Soup", price: 3.99, description: "Traditional Japanese soup with tofu and seaweed.", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&h=400&fit=crop", rating: 4.2, preparationTime: "5 min", isVegetarian: true },
    ],
  },
  // Add other restaurants similarly for items 5-8 (Caesar Salad, Pad Thai, Ice Cream, Tacos)
  {
    id: "green-bowl",
    name: "Green Bowl",
    cuisine: "Healthy",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
    menu: [
      { id: "5", name: "Caesar Salad", price: 8.99, description: "Crisp romaine lettuce, parmesan, croutons, and creamy caesar dressing.", image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?w=600&h=400&fit=crop", rating: 4.3, preparationTime: "5-10 min", isVegetarian: true },
    ],
  },
  {
    id: "thai-street",
    name: "Thai Street",
    cuisine: "Thai",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&h=400&fit=crop",
    menu: [
      { id: "6", name: "Pad Thai", price: 13.99, description: "Stir-fried rice noodles with shrimp, tofu, peanuts, and tamarind sauce.", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=600&h=400&fit=crop", rating: 4.7, preparationTime: "15-20 min", isPopular: true },
    ],
  },
  {
    id: "dessert-den",
    name: "Dessert Den",
    cuisine: "Dessert",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&h=400&fit=crop",
    menu: [
      { id: "7", name: "Ice Cream Sundae", price: 5.99, description: "Vanilla ice cream with hot fudge, caramel, nuts, and cherry.", image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&h=400&fit=crop", rating: 4.9, preparationTime: "5 min", isVegetarian: true, isPopular: true },
    ],
  },
  {
    id: "taco-loco",
    name: "Taco Loco",
    cuisine: "Mexican",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&h=400&fit=crop",
    menu: [
      { id: "8", name: "Tacos", price: 11.99, description: "Three soft corn tortillas with seasoned beef, salsa, and guacamole.", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&h=400&fit=crop", rating: 4.4, preparationTime: "10-15 min", isPopular: true },
    ],
  },
];

// Helper: find restaurant by menu item ID
export function getRestaurantByMenuItemId(itemId: string): RestaurantType | undefined {
  return restaurants.find(rest => rest.menu.some(item => item.id === itemId));
}

// Helper: get all menu items (for global search later)
export function getAllMenuItems(): MenuItemType[] {
  return restaurants.flatMap(rest => rest.menu);
}