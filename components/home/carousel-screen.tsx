"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { data } from "@/constant/dummy-data";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { VECTORS } from "@/public/image/image";

export function CarousleScreen() {
  const cards = data.map((card, index) => (
    <Card key={index} card={card} index={index} />
  ));

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
              <span className="bg-red-500">"Dineout"</span>
            </h2>
          </div>

          <Carousel items={cards} />
        </div>

        {/* ── floating vector: arrow (right) ── */}
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

        {/* ── floating vector: dine (left) ── */}
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