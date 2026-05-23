'use client'
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FOOD, VECTORS } from "@/public/image/image";

/* ─── data ─────────────────────────────────────────────────── */
const stats = [
  { value: "3,00,000+", label: "Restaurants", icon: VECTORS.OUTLATE },
  { value: "800+",      label: "Cities",      icon: VECTORS.PIN },
  { value: "3B+",       label: "Orders",      icon: VECTORS.PACK },
];

// rotate values must be plain numbers (degrees) — used in inline style
const floatingItems = [
  {
    src: FOOD.SLICE,
    alt: "Burger",
    emoji: "🍔",
    cls: "top-[8%] left-[4%] w-44 h-44 md:w-52 md:h-52 hidden md:block",
    rotateDeg: -12,
    floatDelay: "0s",
    floatDuration: "5s",
  },
  {
    src: FOOD.FRIES,
    alt: "Fries",
    emoji: "🍟",
    cls: "top-[6%] right-[5%] w-36 h-36 md:w-44 md:h-44 hidden md:block",
    rotateDeg: 8,
    floatDelay: "0.4s",
    floatDuration: "4.5s",
  },
  {
    src: FOOD.LEG,
    alt: "Pizza",
    emoji: "🍕",
    cls: "bottom-[14%] right-[4%] w-40 h-40 md:w-48 md:h-48 hidden md:block",
    rotateDeg: -7,
    floatDelay: "0.9s",
    floatDuration: "5.5s",
  },
  {
    src: FOOD.PASTRY,
    alt: "Dumplings",
    emoji: "🥟",
    cls: "bottom-[20%] left-[3%] w-32 h-32 md:w-40 md:h-40 hidden md:block",
    rotateDeg: 11,
    floatDelay: "1.3s",
    floatDuration: "4.8s",
  },
];

/* ─── counter hook ──────────────────────────────────────────── */
//@ts-ignore
function useCounter(target, duration = 1800, started = false) {
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    if (!started) return;
    const numeric = parseInt(target.replace(/[^0-9]/g, ""), 10);
    if (!numeric) { setDisplay(target); return; }
    //@ts-ignore
    let raf;
    const t0 = performance.now();
    //@ts-ignore
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = Math.floor(eased * numeric);
      setDisplay(target.replace(/[0-9,]+/, cur.toLocaleString("en-IN")));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf = requestAnimationFrame(tick);
    //@ts-ignore
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);
  return display;
}

/* ─── stat card ─────────────────────────────────────────────── */
//@ts-ignore
function StatCard({ stat, started, index }) {
  const animated = useCounter(stat.value, 1800, started);
  return (
    <div
      className="flex items-center gap-3 px-7 py-5 group"
      style={{ animationDelay: `${0.5 + index * 0.12}s` }}
    >
     <Image
      src={stat.icon}
      alt=""
      className="w-10 h-10 object-contain"
     />
      <div>
        <p className="text-xl font-black leading-none tracking-tight">
          {animated}
        </p>
        <p className="text-xs font-medium mt-1 opacity-60 uppercase tracking-widest">
          {stat.label}
        </p>
      </div>
    </div>
  );
}

/* ─── floating food item ─────────────────────────────────────── */
//@ts-ignore
function FloatingFood({ item, visible }) {
  const hasImage = Boolean(item.src);

  return (
    <div
      className={`absolute ${item.cls} z-10 food-card`}
      style={{
        transform: `rotate(${item.rotateDeg}deg)`,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.7s ease",
        animation: visible
          ? `float-bob ${item.floatDuration} ease-in-out ${item.floatDelay} infinite`
          : "none",
      }}
    >
      {hasImage ? (
        <div className="relative w-full h-full food-img-wrap transition-transform duration-500">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 144px, 208px"
            className="object-contain drop-shadow-2xl"
          />
        </div>
      ) : (
        <div className="w-full h-full rounded-2xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-1 bg-primary/5 backdrop-blur-sm">
          <span className="text-4xl">{item.emoji}</span>
          <span className="text-[10px] font-medium opacity-50 uppercase tracking-widest">{item.alt}</span>
        </div>
      )}
    </div>
  );
}

/* ─── main ───────────────────────────────────────────────────── */
export default function FoodHero() {
  const [visible, setVisible] = useState(false);
  const [statsStarted, setStatsStarted] = useState(false);
  const statsRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStatsStarted(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [mounted]);

  return (
    <>
      <style>{`
        /* float: pure translateY — rotate is on the parent wrapper */
        @keyframes float-bob {
          0%   { transform: translateY(0px)   scale(1); }
          50%  { transform: translateY(-18px) scale(1.04); }
          100% { transform: translateY(0px)   scale(1); }
        }

        @keyframes shimmer-in {
          from { opacity: 0; filter: blur(8px); transform: translateY(28px); }
          to   { opacity: 1; filter: blur(0);   transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badge-pop {
          0%   { opacity: 0; transform: scale(0.7) rotate(-4deg); }
          70%  { transform: scale(1.08) rotate(1deg); }
          100% { opacity: 1; transform: scale(1)   rotate(0deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes spin-slow-rev {
          from { transform: rotate(0deg); }
          to   { transform: rotate(-360deg); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0   hsl(var(--primary) / 0.4); }
          70%  { box-shadow: 0 0 0 14px hsl(var(--primary) / 0); }
          100% { box-shadow: 0 0 0 0   hsl(var(--primary) / 0); }
        }
        @keyframes word-in {
          from { opacity: 0; transform: translateY(110%) skewY(4deg); }
          to   { opacity: 1; transform: translateY(0)    skewY(0deg); }
        }
        @keyframes shimmer-sweep {
          0%   { transform: translateX(-200%) skewX(-20deg); }
          60%  { transform: translateX(500%)  skewX(-20deg); }
          100% { transform: translateX(500%)  skewX(-20deg); }
        }

        .anim-shimmer-in { animation: shimmer-in  0.85s cubic-bezier(.22,1,.36,1) both; }
        .anim-slide-up   { animation: slide-up    0.75s cubic-bezier(.22,1,.36,1) both; }
        .anim-badge-pop  { animation: badge-pop   0.6s  cubic-bezier(.34,1.56,.64,1) both; }
        .anim-pulse-ring { animation: pulse-ring  2.4s  ease-out infinite; }

        /* word reveal: spans start hidden; JS adds .revealed to trigger */
        .word-span {
          display: inline-block;
          opacity: 0;
          transform: translateY(110%) skewY(4deg);
        }
        .word-span.revealed {
          animation: word-in 0.55s cubic-bezier(.22,1,.36,1) forwards;
        }

        /* hover tilt on food images */
        .food-card:hover .food-img-wrap {
          transform: scale(1.1) rotate(-4deg);
        }

        /* orbit rings - fixed positioning */
        .orbit-ring-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        
        .orbit-ring-1 {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(700px, 80vw);
          height: min(700px, 80vw);
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          border: 1px solid hsl(var(--border));
          opacity: 0.2;
          animation: spin-slow 20s linear infinite;
        }
        
        .orbit-ring-2 {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(500px, 60vw);
          height: min(500px, 60vw);
          transform: translate(-50%, -50%);
          border-radius: 9999px;
          border: 1px dashed hsl(var(--border));
          opacity: 0.15;
          animation: spin-slow-rev 30s linear infinite;
        }
      `}</style>

      <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center px-4 py-20">
        {/* orbiting rings container */}
        <div className="orbit-ring-container">
          <div className="orbit-ring-1" />
          <div className="orbit-ring-2" />
        </div>

        {/* dot scatter */}
        {[
          "top-[22%] left-[28%] w-2   h-2",
          "top-[65%] left-[18%] w-1.5 h-1.5",
          "top-[30%] right-[22%] w-3  h-3",
          "bottom-[28%] right-[30%] w-1.5 h-1.5",
        ].map((c, i) => (
          <div key={i} className={`absolute ${c} rounded-full bg-primary/20 pointer-events-none`} />
        ))}

        {/* floating food */}
        {floatingItems.map((item, i) => (
          <FloatingFood key={i} item={item} visible={visible} />
        ))}

        {/* ── hero copy ── */}
        <div className={`relative z-20 text-center max-w-xl transition-opacity duration-700 ${visible ? "opacity-100" : "opacity-0"}`}>
          {/* badge */}
          <div className={`mb-5 inline-block ${visible ? "anim-badge-pop" : "opacity-0"}`} style={{ animationDelay: "0.05s" }}>
            <Badge
              variant="secondary"
              className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest gap-2 rounded-full anim-pulse-ring"
            >
              <span>🍽️</span> Over a decade of flavour
            </Badge>
          </div>

          {/* headline line 1 */}
          <div className="mb-1 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black  ">
             Trusted by food lovers across cities
            </h1>
          </div>

     
          

          {/* subtext */}
          <p
            className={`text-base md:text-md mt-5 leading-relaxed opacity-70 max-w-md mx-auto mb-5 ${visible ? "anim-shimmer-in" : "opacity-0"}`}
            style={{ animationDelay: "0.55s" }}
          >
            For over a decade, we&apos;ve enabled our customers to discover new tastes,
            delivered right to their doorstep.
          </p>

          {/* CTAs */}
          <div
            className={`flex items-center justify-center gap-3 flex-wrap ${visible ? "anim-slide-up" : "opacity-0"}`}
            style={{ animationDelay: "0.68s" }}
          >
            <Button
              size="lg"
              className="py-5 px-8 bg-red-500 font-semibold tracking-wide shadow-lg hover:shadow-primary/70 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              Order Now →
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="py-5 px-8 cursor-pointer  font-semibold tracking-wide hover:-translate-y-0.5 transition-all duration-200"
            >
              Explore Menu
            </Button>
          </div>
        </div>

        {/* ── stats bar ── */}
        <div
          ref={statsRef}
          className={`relative z-20 mt-16 rounded-3xl border bg-card/80 backdrop-blur-md shadow-xl overflow-hidden ${visible ? "anim-slide-up" : "opacity-0"}`}
          style={{ animationDelay: "0.82s" }}
        >
          <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-border">
            {stats.map((stat, i) => (
              <StatCard key={i} stat={stat} started={statsStarted} index={i} />
            ))}
          </div>
          {/* shimmer sweep */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <div
              className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/5 to-transparent"
              style={{ animation: "shimmer-sweep 3.5s ease-in-out 1.5s infinite" }}
            />
          </div>
        </div>
      </section>
    </>
  );
}