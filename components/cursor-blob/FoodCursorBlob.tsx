"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const FOOD_ICONS = [
  // burger
  <svg key="burger" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M7 16 C7 10 29 10 29 16" stroke="#f4a84a" strokeWidth="2" strokeLinecap="round" fill="#f4a84a" fillOpacity="0.3"/>
    <ellipse cx="18" cy="16" rx="11" ry="3" fill="#f4a84a" fillOpacity="0.5"/>
    <path d="M6 19 Q10 17 14 19 Q18 21 22 19 Q26 17 30 19" stroke="#5a9e2f" strokeWidth="2" strokeLinecap="round" fill="none"/>
    <rect x="7" y="20" width="22" height="4" rx="2" fill="#7a3b10" fillOpacity="0.8"/>
    <ellipse cx="18" cy="26" rx="12" ry="3" fill="#f4a84a" fillOpacity="0.6"/>
  </svg>,

  // fries
  <svg key="fries" width="32" height="36" viewBox="0 0 32 36" fill="none">
    <path d="M6 20 L8 32 Q8 35 16 35 Q24 35 24 32 L26 20 Z" fill="#e8282a" fillOpacity="0.8"/>
    <rect x="10" y="8"  width="3" height="14" rx="1.5" fill="#f5c842"/>
    <rect x="14" y="5"  width="3" height="17" rx="1.5" fill="#f5c842"/>
    <rect x="18" y="7"  width="3" height="15" rx="1.5" fill="#f5c842"/>
    <rect x="8"  y="11" width="2.5" height="11" rx="1.2" fill="#ffd966"/>
    <rect x="21" y="10" width="2.5" height="12" rx="1.2" fill="#ffd966"/>
  </svg>,

  // drink
  <svg key="drink" width="28" height="38" viewBox="0 0 28 38" fill="none">
    <ellipse cx="14" cy="10" rx="12" ry="4" fill="#ff6b9d" fillOpacity="0.7"/>
    <path d="M3 10 L5 32 Q5 36 14 36 Q23 36 23 32 L25 10 Z" fill="#ff6b9d" fillOpacity="0.6"/>
    <rect x="15" y="2" width="2.5" height="18" rx="1.2" fill="white" fillOpacity="0.9"/>
    <rect x="15" y="4" width="2.5" height="3" rx="1" fill="#ff6b9d"/>
    <rect x="15" y="10" width="2.5" height="3" rx="1" fill="#ff6b9d"/>
  </svg>,

  // pizza slice
  <svg key="pizza" width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 4 L32 30 L4 30 Z" fill="#f4a84a" fillOpacity="0.7" stroke="#c0622a" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M18 4 L32 30 Q18 26 4 30 Z" fill="#e8282a" fillOpacity="0.5"/>
    <circle cx="16" cy="20" r="2" fill="#c0622a"/>
    <circle cx="22" cy="17" r="1.5" fill="#c0622a"/>
    <circle cx="13" cy="14" r="1.5" fill="#c0622a"/>
  </svg>,

  // taco
  <svg key="taco" width="38" height="32" viewBox="0 0 38 32" fill="none">
    <path d="M4 28 Q19 4 34 28 Z" fill="#f4a84a" fillOpacity="0.5" stroke="#c0622a" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M8 28 Q19 8 30 28" fill="#5a9e2f" fillOpacity="0.6"/>
    <path d="M10 28 Q19 12 28 28" fill="#e8282a" fillOpacity="0.5"/>
    <path d="M12 28 Q19 16 26 28" fill="#f5c842" fillOpacity="0.7"/>
  </svg>,
];

// blob morph shapes — organic, slightly different each time
const MORPHS = [
  "M54 14C72 10 92 28 90 54C88 78 72 94 54 92C34 90 12 74 14 54C16 32 36 18 54 14Z",
  "M54 18C70 10 94 26 92 54C90 80 72 96 52 92C30 88 10 72 14 52C18 30 38 26 54 18Z",
  "M56 12C78 14 96 32 92 56C88 80 70 96 52 94C30 92 10 76 12 54C14 30 36 10 56 12Z",
  "M52 16C74 8 96 28 94 56C92 82 74 96 52 94C28 92 8 74 12 52C16 28 32 24 52 16Z",
  "M56 16C76 12 94 30 92 56C90 80 72 96 54 94C32 92 10 76 14 54C18 32 38 20 56 16Z",
];
interface Props {
    containerRef: React.RefObject<HTMLDivElement | null>
}

export default function FoodCursorBlob({containerRef}: Props) {
  const blobRef     = useRef<HTMLDivElement>(null);
  const pathRef     = useRef<SVGPathElement>(null);
 /*  const containerRef= useRef<HTMLDivElement>(null); */

  const pos     = useRef({ x: 0, y: 0 });   // target (mouse)
  const cur     = useRef({ x: 0, y: 0 });   // current (lerped)
  const rafRef  = useRef<number | null>(null);
  const inside  = useRef(false);

  const [iconIdx,  setIconIdx]  = useState(0);
  const [morphIdx, setMorphIdx] = useState(0);
  const [visible,  setVisible]  = useState(false);

  useEffect(() => {
    const el   = containerRef.current;
    const blob = blobRef.current;
    if (!el || !blob) return;

    // ── lerp loop ────────────────────────────────────────────────────────────
    const tick = () => {
      cur.current.x += (pos.current.x - cur.current.x) * 0.1;
      cur.current.y += (pos.current.y - cur.current.y) * 0.1;
      gsap.set(blob, { x: cur.current.x, y: cur.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    // ── mouse tracking ────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      pos.current.x = e.clientX - r.left;
      pos.current.y = e.clientY - r.top;
    };

    const onEnter = () => {
      inside.current = true;
      setVisible(true);
      gsap.to(blob, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" });
    };

    const onLeave = () => {
      inside.current = false;
      gsap.to(blob, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in",
        onComplete: () => setVisible(false) });
    };

    el.addEventListener("mousemove",  onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mousemove",  onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // ── cycle icon + morph every 900ms while inside ───────────────────────────
  useEffect(() => {
    if (!visible) return;
    const id = setInterval(() => {
      setIconIdx(i  => (i  + 1) % FOOD_ICONS.length);
      setMorphIdx(m => (m  + 1) % MORPHS.length);
    }, 900);
    return () => clearInterval(id);
  }, [visible]);

  // ── morph the blob path ───────────────────────────────────────────────────
  useEffect(() => {
    if (!pathRef.current) return;
    gsap.to(pathRef.current, {
      attr: { d: MORPHS[morphIdx] },
      duration: 0.7,
      ease: "power2.inOut",
    });
  }, [morphIdx]);

  return (
    // This div wraps your entire hero — it's the hover boundary.
    // Replace this wrapper with your actual <section> in hero.tsx
    // by passing containerRef as ref to the section instead.
    <div ref={containerRef} className="contents">

      {/* Blob — absolutely positioned inside the hero section */}
      <div
        ref={blobRef}
        className="pointer-events-none absolute z-30"
        style={{
          width: 110,
          height: 110,
          top: 0,
          left: 0,
          transform: "translate(-50%, -50%)",
          opacity: 0,
          scale: "0",
        }}
      >
        <svg
          viewBox="0 0 110 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Blob shape */}
          <path
            ref={pathRef}
            d={MORPHS[0]}
            fill="rgba(255, 80, 30, 0.15)"
            stroke="rgba(255, 80, 30, 0.5)"
            strokeWidth="1.5"
          />

          {/* Food icon centered */}
          <foreignObject x="37" y="37" width="36" height="36">
            <div
              // @ts-ignore — xmlns needed for foreignObject
              xmlns="http://www.w3.org/1999/xhtml"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }}
            >
              {FOOD_ICONS[iconIdx]}
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}