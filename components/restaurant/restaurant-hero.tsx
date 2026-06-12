// components/restaurant/restaurant-hero.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Clock, MapPin, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import type { Restaurant } from "@/types/restaurant";
import { Button } from "@/components/ui/button";

interface RestaurantHeroProps {
  restaurant: Restaurant;
}

export default function RestaurantHero({ restaurant }: RestaurantHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Combine cover array and gallery images, limit to 4
  const allImages = [
    ...(restaurant.images.cover || []),
    ...(restaurant.images.gallery || [])
  ].slice(0, 4);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="relative h-[400px] w-full">
      {/* Main Image with Carousel */}
      <div className="relative w-full h-full">
        {allImages.length > 0 && (
          <Image
            src={allImages[currentImageIndex]}
            alt={`${restaurant.name} - image ${currentImageIndex + 1}`}
            fill
            className="object-cover transition-opacity duration-300"
            priority
          />
        )}
        
        {/* Navigation Buttons - only show if more than 1 image */}
        {allImages.length > 1 && (
          <>
            <Button
              onClick={prevImage}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 p-0 z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              onClick={nextImage}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 p-0 z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}
        
        {/* Dots Indicator */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {allImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`transition-all rounded-full ${
                  currentImageIndex === idx
                    ? "w-2 h-2 bg-white"
                    : "w-1.5 h-1.5 bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/40 to-background/20" />
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start gap-6">
            <div className="w-28 h-28 rounded-2xl bg-card  shadow-xl border">
              <Image
                src={restaurant.images.logo}
                alt={restaurant.name}
                width={100}
                height={100}
                className="object-cover h-[100%] w-[100%] rounded-xl"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{restaurant.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  {restaurant.rating} ({restaurant.reviewCount}+ reviews)
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {restaurant.deliveryTime}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {restaurant.address.city}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  {restaurant.priceRange}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  restaurant.isOpen ? "bg-green-500/20 text-green-600" : "bg-red-500/20 text-red-600"
                }`}>
                  {restaurant.isOpen ? "Open Now" : "Closed"}
                </span>
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl">{restaurant.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {restaurant.tags.map(tag => (
                  <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}