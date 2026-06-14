// app/restaurant/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { restaurants } from "@/constant/dummy-data/restaurant"; // Fixed import path
import type { Restaurant, MenuCategory, MenuItem } from "@/types/restaurant";
import Navbar from "@/components/navbar/navbar";
import RestaurantHero from "@/components/restaurant/restaurant-hero";
import RestaurantInfo from "@/components/restaurant/restaurant-info";
import OperatingHours from "@/components/restaurant/operating-hours";
import PopularItems from "@/components/restaurant/popular-items";
import MenuSection from "@/components/restaurant/menu-section";
import FloatingCartBar from "@/components/restaurant/floating-cart-bar";

const mockMenus: Record<string, MenuCategory[]> = {
  "rest_1": [
    {
      id: "cat_1",
      name: "Popular Items",
      displayOrder: 1,
      items: [
        {
          id: "item_1",
          name: "Butter Chicken",
          description: "Creamy tomato curry with tender chicken pieces",
          price: 18.99,
          images: ["https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"],
          category: "Popular Items",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: false,
          containsAllergens: ["dairy"],
          isAvailable: true,
          isPopular: true,
          preparationTime: 20,
          customizationOptions: [],
          rating: 4.8,
          numberOfRatings: 245
        },
        {
          id: "item_2",
          name: "Chicken Biryani",
          description: "Aromatic basmati rice with spices and chicken",
          price: 16.99,
          images: ["https://images.unsplash.com/photo-1563379091339-03b21dd4a433"],
          category: "Popular Items",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          containsAllergens: [],
          isAvailable: true,
          isPopular: true,
          preparationTime: 25,
          customizationOptions: [],
          rating: 4.7,
          numberOfRatings: 189
        },
        {
          id: "item_3",
          name: "Garlic Naan",
          description: "Soft bread with garlic and butter",
          price: 3.99,
          images: ["https://images.unsplash.com/photo-1601050690597-df0568f70950"],
          category: "Popular Items",
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: false,
          containsAllergens: ["gluten", "dairy"],
          isAvailable: true,
          isPopular: true,
          preparationTime: 10,
          customizationOptions: [],
          rating: 4.9,
          numberOfRatings: 567
        }
      ]
    },
    {
      id: "cat_2",
      name: "Appetizers",
      displayOrder: 2,
      items: [
        {
          id: "item_4",
          name: "Samosas",
          description: "Crispy pastry filled with spiced potatoes and peas",
          price: 7.99,
          images: ["https://images.unsplash.com/photo-1601050690597-df0568f70950"],
          category: "Appetizers",
          isVegetarian: true,
          isVegan: true,
          isGlutenFree: false,
          containsAllergens: ["gluten"],
          isAvailable: true,
          isPopular: false,
          preparationTime: 15,
          customizationOptions: [],
          rating: 4.6,
          numberOfRatings: 134
        }
      ]
    }
  ],
  "rest_2": [
    {
      id: "cat_1",
      name: "Sushi Rolls",
      displayOrder: 1,
      items: [
        {
          id: "item_1",
          name: "California Roll",
          description: "Crab, avocado, cucumber",
          price: 12.99,
          images: ["https://images.unsplash.com/photo-1579871494447-9811cf80d66c"],
          category: "Sushi Rolls",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: true,
          containsAllergens: ["seafood"],
          isAvailable: true,
          isPopular: true,
          preparationTime: 15,
          customizationOptions: [],
          rating: 4.8,
          numberOfRatings: 312
        }
      ]
    }
  ],
  "rest_3": [
    {
      id: "cat_1",
      name: "Signature Sandwiches",
      displayOrder: 1,
      items: [
        {
          id: "item_1",
          name: "Smoked Meat Sandwich",
          description: "Famous Montreal smoked meat on rye bread",
          price: 14.99,
          images: ["https://images.unsplash.com/photo-1528605248644-14dd04022da1"],
          category: "Signature Sandwiches",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: false,
          containsAllergens: ["gluten"],
          isAvailable: true,
          isPopular: true,
          preparationTime: 12,
          customizationOptions: [],
          rating: 4.9,
          numberOfRatings: 234
        }
      ]
    }
  ],
  "rest_4": [
    {
      id: "cat_1",
      name: "Poutines",
      displayOrder: 1,
      items: [
        {
          id: "item_1",
          name: "Classic Poutine",
          description: "Fries, cheese curds, gravy",
          price: 9.99,
          images: ["https://images.unsplash.com/photo-1513104890138-7c749659a591"],
          category: "Poutines",
          isVegetarian: true,
          isVegan: false,
          isGlutenFree: false,
          containsAllergens: ["gluten", "dairy"],
          isAvailable: true,
          isPopular: true,
          preparationTime: 10,
          customizationOptions: [],
          rating: 4.7,
          numberOfRatings: 456
        }
      ]
    }
  ]
};

interface RestaurantPageProps {
  params: Promise<{ id: string }>;
}

export default function RestaurantPage({ params }: RestaurantPageProps) {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<Map<string, { item: MenuItem; quantity: number }>>(new Map());
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRestaurant = async () => {
      setIsLoading(true);
      const { id } = await params;
      setRestaurantId(id);
      const found = restaurants.find(r => r.id === id);
      if (found) {
        setRestaurant(found);
      }
      setIsLoading(false);
    };
    loadRestaurant();
  }, [params]);

  const addToCart = (item: MenuItem) => {
    const newCart = new Map(cart);
    const existing = newCart.get(item.id);
    if (existing) {
      newCart.set(item.id, { ...existing, quantity: existing.quantity + 1 });
    } else {
      newCart.set(item.id, { item, quantity: 1 });
    }
    setCart(newCart);
  };

  const removeFromCart = (itemId: string) => {
    const newCart = new Map(cart);
    const existing = newCart.get(itemId);
    if (existing && existing.quantity > 1) {
      newCart.set(itemId, { ...existing, quantity: existing.quantity - 1 });
    } else {
      newCart.delete(itemId);
    }
    setCart(newCart);
  };

  if (isLoading || !restaurant) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </>
    );
  }

  const menuCategories = restaurantId ? mockMenus[restaurantId] || [] : [];
  const cartItemCount = Array.from(cart.values()).reduce((sum, { quantity }) => sum + quantity, 0);
  const cartTotal = Array.from(cart.values()).reduce((sum, { item, quantity }) => sum + item.price * quantity, 0);

  return (
    <>
      <Navbar />
      <RestaurantHero restaurant={restaurant} />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1">
            <RestaurantInfo restaurant={restaurant} />
            <OperatingHours operatingHours={restaurant.operatingHours} />
            <PopularItems popularItems={restaurant.popularItems} />
            <MenuSection 
              menuCategories={menuCategories}
              cart={cart}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          </div>
        </div>
      </div>

                {cartItemCount > 0 && (
  <FloatingCartBar
    itemCount={cartItemCount}
    total={cartTotal}
  />
)}

    </>
  );
}