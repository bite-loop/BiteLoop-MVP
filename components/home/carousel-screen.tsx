// components/carousel-screen.tsx
"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { restaurants } from "@/constant/dummy-data/restaurant";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { VECTORS } from "@/public/image/image";

export function CarousleScreen() {
  const cards = restaurants.map((restaurant) => ({
    id: restaurant.id,
    src: restaurant.images.cover[0], // Use first cover image
    title: restaurant.name,
    category: restaurant.cuisine.join(" • "),
    content: (
      <div className="p-4">
        <div className="flex gap-4 mb-4">
          <div className="w-24 h-24 rounded-xl overflow-hidden">
            <Image
              src={restaurant.images.logo}
              alt={restaurant.name}
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold">{restaurant.name}</h3>
            <p className="text-sm text-muted-foreground">{restaurant.description}</p>
            <div className="flex gap-2 mt-2">
              <span className="text-sm">⭐ {restaurant.rating}</span>
              <span className="text-sm">⏱ {restaurant.deliveryTime}</span>
              <span className="text-sm">💰 {restaurant.priceRange}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-secondary/20 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">Min Order</p>
            <p className="font-semibold">${restaurant.minOrder}</p>
          </div>
          <div className="bg-secondary/20 p-3 rounded-lg">
            <p className="text-xs text-muted-foreground">Delivery Fee</p>
            <p className="font-semibold">${restaurant.deliveryFee}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {restaurant.tags.map(tag => (
            <span key={tag} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    ),
  }));

  return (
    <>
      <style>{`
        @keyframes float-y {
          0%   { transform: translateY(0px) rotate(var(--r, 0deg)); }
          50%  { transform: translateY(-14px) rotate(var(--r, 0deg)); }
          100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
        }
        @keyframes float-y-slow {
          0%   { transform: translateY(0px) rotate(var(--r, 0deg)); }
          50%  { transform: translateY(-10px) rotate(var(--r, 0deg)); }
          100% { transform: translateY(0px) rotate(var(--r, 0deg)); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0    hsl(var(--primary) / 0.4); }
          70%  { box-shadow: 0 0 0 12px hsl(var(--primary) / 0); }
          100% { box-shadow: 0 0 0 0    hsl(var(--primary) / 0); }
        }
        @keyframes shimmer-text {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .float-arrow { animation: float-y      3.8s ease-in-out infinite; }
        .float-dine  { animation: float-y-slow 4.6s ease-in-out 0.6s infinite; }
        .pulse-ring  { animation: pulse-ring   2.4s ease-out infinite; }
        .fade-up     { animation: fade-up      0.7s cubic-bezier(.22,1,.36,1) both; }

        .shimmer-word {
          background: linear-gradient(
            90deg,
            hsl(var(--primary)) 0%,
            hsl(var(--destructive)) 40%,
            hsl(var(--primary)) 80%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer-text 3s linear infinite;
        }
      `}</style>

      <section className="py-20 relative overflow-x-clip">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            {/* badge */}
            <div className="mb-5 inline-block fade-up" style={{ animationDelay: "0.05s" }}>
              <Badge
                variant="secondary"
                className="pulse-ring px-4 py-1.5 text-xs font-semibold uppercase tracking-widest gap-2 rounded-full"
              >
                <span>❤️</span> Best place for a Date
              </Badge>
            </div>

            {/* heading */}
            <h2
              className="fade-up text-center text-5xl font-black leading-tight"
              style={{ animationDelay: "0.15s" }}
            >
              Discover best <br />
              restaurants on{" "}
              <span className="bg-red-500">
                "Dineout"
              </span>
            </h2>
          </div>

          <Carousel items={cards.map((card, index) => (
            <Card key={index} card={card} index={index} />
          ))} />
        </div>

        {/* floating vectors */}
        <div
          className="float-arrow absolute top-12 right-96 w-44 h-44 pointer-events-none"
          style={{ "--r": "6deg" } as React.CSSProperties}
        >
          <Image
            alt="arrow"
            src={VECTORS.ARROW}
            fill
            className="object-contain drop-shadow-md"
          />
        </div>

        <div
          className="float-dine absolute top-12 left-96 w-44 h-44 pointer-events-none"
          style={{ "--r": "-8deg" } as React.CSSProperties}
        >
          <Image
            alt="dine"
            src={VECTORS.DINE}
            fill
            className="object-contain drop-shadow-md"
          />
        </div>
      </section>
    </>
  );
}