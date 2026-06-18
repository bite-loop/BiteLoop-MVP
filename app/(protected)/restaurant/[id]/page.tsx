// app/restaurant/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { restaurants } from "@/constant/dummy-data/restaurant"; // Fixed import path
import Navbar from "@/components/navbar/navbar";
import RestaurantHero from "@/components/restaurant/restaurant-hero";
import RestaurantInfo from "@/components/restaurant/restaurant-info";
import OperatingHours from "@/components/restaurant/operating-hours";
import PopularItems from "@/components/restaurant/popular-items";
import MenuSection from "@/components/restaurant/menu-section";
import FloatingCartBar from "@/components/restaurant/floating-cart-bar";
import { useCartStore } from "@/lib/stores/cartStore";
import type { Restaurant, MenuCategory } from "@/types/restaurant";
import { motion, AnimatePresence } from "framer-motion";

const mockMenus: Record<string, MenuCategory[]> = {
  "rest_1": [
    {
      id: "cat_1",
      name: "Popular Items",
      displayOrder: 1,
      items: [
        {
          id: "butter_chicken",
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
          id: "chicken_biryani",
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
          id: "garlic_naan",
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
          id: "samosas",
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
          id: "california_roll",
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
          id: "smoked_meat_sandwich",
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
          id: "classic_poutine",
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
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [showCartResetModal, setShowCartResetModal] =
  useState(false);

const [pendingItem, setPendingItem] =
  useState<any>(null);

const {
  cart,
  restaurantId: cartRestaurantId,
  addToCart,
  removeFromCart,
  clearCart,
  getItemCount,
  getTotal,
} = useCartStore();

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

  const handleAddToCart = (item: any) => {
  const hasItems = cart.size > 0;

  const differentRestaurant =
    cartRestaurantId &&
    cartRestaurantId !== restaurant.id;

  if (hasItems && differentRestaurant) {
    setPendingItem(item);
    setShowCartResetModal(true);
    return;
  }

  addToCart(
    item,
    restaurant.id,
    restaurant.name
  );
};

  const menuCategories = restaurantId ? mockMenus[restaurantId] || [] : [];
const cartItemCount = getItemCount();
const cartTotal = getTotal();

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
addToCart={handleAddToCart}
  removeFromCart={removeFromCart}
/>
          </div>
        </div>
      </div>

<AnimatePresence>
  {showCartResetModal && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
          y: 10,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.95,
          y: 10,
        }}
        transition={{
          duration: 0.2,
          ease: "easeOut",
        }}
        className="
        w-full
        max-w-[380px]
        bg-background
        border
        border-border
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        p-6
        "
      >

        <h2 className="
        text-xl
        font-black
        tracking-tight
        mb-5
        ">
          Items already in cart
        </h2>

        <p className="
        text-sm
        text-muted-foreground
        leading-relaxed
        mb-6
        max-w-[420px]
        ">
          Your cart contains items from another restaurant.
          Would you like to clear your cart and start a
          new order from{" "}
          <span className="font-semibold text-foreground">
            {restaurant.name}
          </span>
          ?
        </p>

        <div className="grid grid-cols-2 gap-3">

          <button
            onClick={() => setShowCartResetModal(false)}
            className="
            h-10
            border
            border-border
            font-semibold
            text-sm
            hover:bg-muted
            hover:scale-[1.02]
            active:scale-[0.98]
            transition-all
            "
          >
            Keep Cart
          </button>

          <button
            onClick={() => {
              clearCart();

              if (pendingItem) {
                addToCart(
                  pendingItem,
                  restaurant.id,
                  restaurant.name
                );
              }

              setPendingItem(null);
              setShowCartResetModal(false);
            }}
            className="
            h-10
            bg-primary
            text-white
            font-bold
            text-sm
            hover:opacity-90
            hover:scale-[1.02]
            active:scale-[0.98]
            transition-all
            "
          >
            Start Fresh
          </button>

        </div>

      </motion.div>

    </div>
  )}
</AnimatePresence>

                {cartItemCount > 0 && (
  <FloatingCartBar
    itemCount={cartItemCount}
    total={cartTotal}
  />
)}

    </>
  );
}