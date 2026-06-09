"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { VECTORS } from "@/public/image/image";
import Image from "next/image";
import Link from "next/link";

/* ─── floating food vectors (emoji-based, no external dep) ──── */
const FOOD_FLOATS = [
  { emoji: "🍕", top: "8%",  left: "3%",  size: 52, rot: -15, dur: "5.2s", delay: "0s"   },
  { emoji: "🍔", top: "14%", right: "4%", size: 48, rot: 10,  dur: "4.7s", delay: "0.4s" },
  { emoji: "🌮", top: "55%", left: "1%",  size: 44, rot: -8,  dur: "6.1s", delay: "0.9s" },
  { emoji: "🍜", top: "70%", right: "2%", size: 50, rot: 12,  dur: "5.5s", delay: "0.2s" },
  { emoji: "🧁", top: "38%", left: "2%",  size: 40, rot: 6,   dur: "4.9s", delay: "1.1s" },
  { emoji: "🍣", top: "82%", left: "5%",  size: 46, rot: -12, dur: "5.8s", delay: "0.6s" },
  { emoji: "🥗", top: "25%", right: "3%", size: 42, rot: 9,   dur: "6.3s", delay: "1.4s" },
  { emoji: "🍦", top: "62%", right: "5%", size: 44, rot: -6,  dur: "5.0s", delay: "0.7s" },
  { emoji: "🧆", top: "90%", right: "7%", size: 38, rot: 14,  dur: "4.6s", delay: "1.8s" },
  { emoji: "🥐", top: "46%", right: "1%", size: 40, rot: -10, dur: "5.4s", delay: "0.3s" },
];

/* scattered small ones behind marquee */
const SCATTER = [
  { emoji: "🌶️", top: "22%", left: "18%", size: 28, rot: 20,  dur: "7s",   delay: "0s"   },
  { emoji: "🧄", top: "75%", left: "22%", size: 24, rot: -14, dur: "8s",   delay: "1s"   },
  { emoji: "🫐", top: "48%", left: "42%", size: 22, rot: 5,   dur: "6.5s", delay: "0.5s" },
  { emoji: "🍋", top: "18%", right: "20%",size: 26, rot: -18, dur: "7.5s", delay: "1.3s" },
  { emoji: "🥜", top: "85%", right: "25%",size: 24, rot: 11,  dur: "6.8s", delay: "0.8s" },
  { emoji: "🌿", top: "34%", left: "30%", size: 30, rot: -7,  dur: "9s",   delay: "2s"   },
];

// Static food items (temporary until database is ready)
const foodItems = [
  {
    id: "1",
    name: "Margherita Pizza",
    price: 12.99,
    restaurant: "Pizza Fiesta",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop",
    emoji: "🍕",
  },
  {
    id: "2",
    name: "Classic Burger",
    price: 9.99,
    restaurant: "Burger Hub",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    emoji: "🍔",
  },
  {
    id: "3",
    name: "Chicken Biryani",
    price: 14.99,
    restaurant: "Spice Kingdom",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&h=300&fit=crop",
    emoji: "🍛",
  },
  {
    id: "4",
    name: "Sushi Platter",
    price: 18.99,
    restaurant: "Sushi Master",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop",
    emoji: "🍣",
  },
{
  id: "5",
  name: "Caesar Salad",
  price: 8.99,
  restaurant: "Green Bowl",
  rating: 4.3,
  image: "https://images.pexels.com/photos/1211887/pexels-photo-1211887.jpeg?w=400&h=300&fit=crop",
  emoji: "🥗",
},
  {
    id: "6",
    name: "Pad Thai",
    price: 13.99,
    restaurant: "Thai Street",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop",
    emoji: "🍜",
  },
  {
    id: "7",
    name: "Ice Cream Sundae",
    price: 5.99,
    restaurant: "Dessert Den",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&h=300&fit=crop",
    emoji: "🍦",
  },
  {
    id: "8",
    name: "Tacos",
    price: 11.99,
    restaurant: "Taco Loco",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
    emoji: "🌮",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 12 12" className={`w-3 h-3 ${i < count ? "fill-primary" : "fill-muted-foreground/20"}`}>
          <path d="M6 1l1.4 2.8 3.1.4-2.25 2.2.53 3.1L6 8.1 3.22 9.5l.53-3.1L1.5 4.2l3.1-.4z" />
        </svg>
      ))}
    </div>
  );
}

function FoodCard({ item }: { item: typeof foodItems[0] }) {
  return (
    <Link href={`/food/${item.id}`} className="block h-full">
      <div className="group relative bg-card border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
        {/* Image area */}
        <div className="relative h-40 bg-gradient-to-br from-primary/10 to-primary/5">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-2 right-2 text-2xl opacity-50">{item.emoji}</span>
        </div>
        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-base leading-tight line-clamp-1">{item.name}</h3>
            <Stars count={Math.floor(item.rating)} />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{item.restaurant}</p>
          <div className="mt-3 flex items-center justify-between pt-2 border-t border-border/50">
            <span className="text-lg font-black">${item.price.toFixed(2)}</span>
            <span className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
              Order now →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function MarqueeRow({ items, reverse = false, speed = 38 }: { items: typeof foodItems; reverse?: boolean; speed?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden relative">
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-28 z-10 bg-gradient-to-l from-background to-transparent" />
      <div
        className="flex gap-4 w-max"
        style={{ animation: `marquee-${reverse ? "rev" : "fwd"} ${speed}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <div key={i} className="w-[260px] shrink-0">
            <FoodCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes marquee-fwd {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes marquee-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes float-food {
          0%   { transform: rotate(var(--fr)) translateY(0px)   scale(1);    }
          50%  { transform: rotate(var(--fr)) translateY(-16px) scale(1.06); }
          100% { transform: rotate(var(--fr)) translateY(0px)   scale(1);    }
        }
        @keyframes float-scatter {
          0%   { transform: rotate(var(--fr)) translateY(0px);   }
          33%  { transform: rotate(var(--fr)) translateY(-8px);  }
          66%  { transform: rotate(var(--fr)) translateY(4px);   }
          100% { transform: rotate(var(--fr)) translateY(0px);   }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0    hsl(var(--primary) / 0.4); }
          70%  { box-shadow: 0 0 0 12px hsl(var(--primary) / 0); }
          100% { box-shadow: 0 0 0 0    hsl(var(--primary) / 0); }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop-in {
          0%   { opacity: 0; transform: scale(0.5) rotate(var(--fr)); }
          70%  { transform: scale(1.1) rotate(var(--fr)); }
          100% { opacity: 1; transform: scale(1)   rotate(var(--fr)); }
        }
        @keyframes count-in {
          from { opacity: 0; transform: translateY(10px) scale(0.9); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        .pulse-ring   { animation: pulse-ring 2.4s ease-out infinite; }
        .fade-up      { opacity: 0; }
        .fade-up.show { animation: fade-up  0.7s cubic-bezier(.22,1,.36,1) both; }
        .count-stat   { opacity: 0; }
        .count-stat.show { animation: count-in 0.6s cubic-bezier(.34,1.56,.64,1) both; }

        .marquee-pause:hover .marquee-inner { animation-play-state: paused; }

        /* wobble on hover for food floats */
        .food-float:hover { animation: spin-slow 1.2s ease-in-out !important; }
      `}</style>

      <section ref={ref} className="py-24 overflow-hidden relative">

        {/* ── dot grid bg ── */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* ── large floating food vectors (sides) ── */}
        {FOOD_FLOATS.map((f, i) => (
          <div
            key={i}
            className="food-float pointer-events-none absolute select-none z-0"
            style={{
              top: f.top,
              left: ("left" in f) ? f.left : undefined,
              right: ("right" in f) ? (f as any).right : undefined,
              fontSize: f.size,
              "--fr": `${f.rot}deg`,
              opacity: visible ? 1 : 0,
              animation: visible
                ? `float-food ${f.dur} ease-in-out ${f.delay} infinite, pop-in 0.6s cubic-bezier(.34,1.56,.64,1) ${f.delay} both`
                : "none",
            } as React.CSSProperties}
          >
            {f.emoji}
          </div>
        ))}

        {/* ── small scatter vectors (behind content) ── */}
        {SCATTER.map((s, i) => (
          <div
            key={i}
            className="pointer-events-none absolute select-none z-0"
            style={{
              top: s.top,
              left: ("left" in s) ? s.left : undefined,
              right: ("right" in s) ? (s as any).right : undefined,
              fontSize: s.size,
              "--fr": `${s.rot}deg`,
              opacity: visible ? 0.45 : 0,
              transition: `opacity 0.5s ease ${parseFloat(s.delay) + 0.3}s`,
              animation: visible
                ? `float-scatter ${s.dur} ease-in-out ${s.delay} infinite`
                : "none",
            } as React.CSSProperties}
          >
            {s.emoji}
          </div>
        ))}

        {/* ── header ── */}
        <div className="container mx-auto mb-14 text-center px-4 relative z-10">
          <div
            className={`mb-5 inline-block fade-up ${visible ? "show" : ""}`}
            style={{ animationDelay: "0s" }}
          >
            <Badge
              variant="secondary"
              className="pulse-ring px-4 py-1.5 text-xs font-semibold uppercase tracking-widest gap-2 rounded-full"
            >
              <span>💬</span> Popular dishes near you
            </Badge>
          </div>

          <h2
            className={`fade-up ${visible ? "show" : ""} text-4xl md:text-6xl font-black leading-[1.08] tracking-tight mb-4`}
            style={{ animationDelay: "0.12s" }}
          >
            Loved by food lovers
            <br />
            <span className="">
              across <span className="bg-red-500">Canada</span> 
            </span>
          </h2>

          <p
            className={`fade-up ${visible ? "show" : ""} text-base md:text-lg opacity-60 max-w-md mx-auto`}
            style={{ animationDelay: "0.22s" }}
          >
            From solo lunches to anniversary dinners — hear why millions trust
            Dineout for every meal that matters.
          </p>

          {/* stat pills */}
          <div
            className={`fade-up ${visible ? "show" : ""} flex flex-wrap justify-center gap-4 mt-8`}
            style={{ animationDelay: "0.34s" }}
          >
            {[
              { value: "4.9★",  label: "App Store rating",   icon: VECTORS.PHONE },
              { value: "2M+",   label: "Happy diners",        icon: VECTORS.SMILEY},
              { value: "98%",   label: "Would recommend",     icon: VECTORS.RECOM },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`count-stat ${visible ? "show" : ""} flex items-center gap-3 bg-card border rounded-2xl px-5 py-3 hover:border-primary/40 hover:shadow-md transition-all duration-200`}
                style={{ animationDelay: `${0.4 + i * 0.1}s` }}
              >
                <Image
                 src={s.icon}
                 alt={s.label}
                 className="h-10 w-10 object-contain"
                />
                <div className="text-left">
                  <span className="text-xl font-black tracking-tight block leading-none">{s.value}</span>
                  <span className="text-[10px] opacity-50 mt-0.5 block">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── marquee rows ── */}
        <div className="space-y-4 relative z-10 marquee-pause">
<MarqueeRow items={foodItems.slice(0, 4)} reverse={false} speed={38} />
<MarqueeRow items={foodItems.slice(4)}    reverse={true}  speed={46} />
        </div>

        {/* ── bottom cta strip ── */}
        <div
          className={`fade-up ${visible ? "show" : ""} container mx-auto mt-14 px-4 flex flex-col items-center gap-3 relative z-10`}
          style={{ animationDelay: "0.5s" }}
        >
          <p className="text-sm opacity-50 flex items-center gap-2">
            <span>🍽️</span> Join 2 million+ diners already on Dineout
          </p>
          <div className="flex -space-x-2">
            {["PS","AM","SP","RN","KR","VJ"].map((init, i) => (
              <Avatar key={i} className="w-8 h-8 border-2 border-background text-[10px] font-bold">
                <AvatarFallback className="bg-primary/10 text-primary">{init}</AvatarFallback>
              </Avatar>
            ))}
            <div className="w-8 h-8 rounded-full border-2 border-background bg-primary flex items-center justify-center text-primary-foreground text-[9px] font-black">
              2M+
            </div>
          </div>
        </div>

      </section>
    </>
  );
}