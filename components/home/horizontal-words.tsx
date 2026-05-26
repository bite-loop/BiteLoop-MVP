"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// ─── Food SVG Doodles ────────────────────────────────────────────────────────

const Burger = () => (
  <svg width="96" height="96" viewBox="0 0 96 96" fill="none">
    <ellipse cx="48" cy="72" rx="40" ry="20" fill="#ffe066" opacity="0.85" />
    <path d="M18 44 C18 28 78 28 78 44" stroke="#c0622a" strokeWidth="2.5" strokeLinecap="round" fill="#f4a84a" />
    <ellipse cx="48" cy="44" rx="30" ry="6" fill="#f4a84a" />
    <ellipse cx="40" cy="38" rx="3" ry="1.5" fill="#c0622a" transform="rotate(-20 40 38)" />
    <ellipse cx="52" cy="36" rx="3" ry="1.5" fill="#c0622a" transform="rotate(10 52 36)" />
    <ellipse cx="58" cy="40" rx="2.5" ry="1.5" fill="#c0622a" transform="rotate(-10 58 40)" />
    <path d="M16 52 Q24 46 32 52 Q40 58 48 52 Q56 46 64 52 Q72 58 80 52" stroke="#5a9e2f" strokeWidth="3" strokeLinecap="round" fill="none" />
    <rect x="18" y="54" width="60" height="10" rx="5" fill="#7a3b10" />
    <path d="M16 54 L80 54 L76 62 L20 62 Z" fill="#f5c842" opacity="0.7" />
    <ellipse cx="48" cy="66" rx="32" ry="7" fill="#f4a84a" />
  </svg>
);

const DrinkCup = () => (
  <svg width="80" height="110" viewBox="0 0 80 110" fill="none">
    <ellipse cx="40" cy="28" rx="34" ry="12" fill="#ff6b9d" opacity="0.8" />
    <path d="M8 28 L14 92 Q14 98 40 98 Q66 98 66 92 L72 28 Z" fill="#ff6b9d" opacity="0.85" />
    <path d="M8 28 L14 92 Q14 98 40 98 Q66 98 66 92 L72 28 Z" stroke="#c0336a" strokeWidth="2" fill="none" />
    <rect x="44" y="4" width="6" height="52" rx="3" fill="#fff" stroke="#c0336a" strokeWidth="1.5" />
    <rect x="44" y="10" width="6" height="5" rx="1" fill="#ff6b9d" />
    <rect x="44" y="22" width="6" height="5" rx="1" fill="#ff6b9d" />
    <rect x="44" y="34" width="6" height="5" rx="1" fill="#ff6b9d" />
    <ellipse cx="40" cy="28" rx="34" ry="10" fill="#fff" stroke="#c0336a" strokeWidth="2" />
    <ellipse cx="40" cy="28" rx="26" ry="6" fill="#ffe0ef" />
    <path d="M68 12 L70 6 L72 12 L78 14 L72 16 L70 22 L68 16 L62 14 Z" stroke="#c0336a" strokeWidth="1.5" strokeLinejoin="round" fill="#ffe0ef" />
    <path d="M6 18 L7 14 L8 18 L12 19 L8 20 L7 24 L6 20 L2 19 Z" stroke="#c0336a" strokeWidth="1" strokeLinejoin="round" fill="#ffe0ef" />
  </svg>
);

const Fries = () => (
  <svg width="84" height="100" viewBox="0 0 84 100" fill="none">
    <ellipse cx="42" cy="80" rx="36" ry="18" fill="#ffe066" opacity="0.8" />
    <path d="M20 60 L24 90 Q24 96 42 96 Q60 96 60 90 L64 60 Z" fill="#e8282a" />
    <path d="M20 60 L64 60 L60 90 Q60 96 42 96 Q24 96 24 90 Z" stroke="#b01a1a" strokeWidth="1.5" fill="none" />
    <line x1="42" y1="60" x2="42" y2="96" stroke="#b01a1a" strokeWidth="1" opacity="0.5" />
    <path d="M20 72 Q42 68 64 72" stroke="#b01a1a" strokeWidth="1" fill="none" opacity="0.5" />
    <rect x="28" y="22" width="8" height="42" rx="4" fill="#f5c842" stroke="#c9902a" strokeWidth="1.5" />
    <rect x="38" y="16" width="8" height="48" rx="4" fill="#f5c842" stroke="#c9902a" strokeWidth="1.5" />
    <rect x="48" y="20" width="8" height="44" rx="4" fill="#f5c842" stroke="#c9902a" strokeWidth="1.5" />
    <rect x="22" y="28" width="7" height="36" rx="3.5" fill="#ffd966" stroke="#c9902a" strokeWidth="1.5" />
    <rect x="55" y="26" width="7" height="38" rx="3.5" fill="#ffd966" stroke="#c9902a" strokeWidth="1.5" />
  </svg>
);

const StarBadge = () => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
    <path
      d="M36 8 L41 26 L60 26 L45 37 L51 55 L36 44 L21 55 L27 37 L12 26 L31 26 Z"
      stroke="#e8282a" strokeWidth="2" strokeLinejoin="round" fill="#ffe066" opacity="0.9"
    />
    <path d="M58 10 L60 4 L62 10 L68 12 L62 14 L60 20 L58 14 L52 12 Z" stroke="#e8282a" strokeWidth="1.5" strokeLinejoin="round" fill="#ffe066" />
    <path d="M10 50 L11.5 45 L13 50 L18 51.5 L13 53 L11.5 58 L10 53 L5 51.5 Z" stroke="#c9902a" strokeWidth="1" strokeLinejoin="round" fill="#ffe066" />
  </svg>
);

// ─── Doodle config — wordIndex ties SVG to a word in the track ───────────────
// top/left are px offsets relative to the word's position inside the track
const DOODLES: {
  id: string;
  Component: () => React.ReactElement;
  wordIndex: number;
  top: number;
  left: number;
}[] = [
  { id: "burger", Component: Burger,    wordIndex: 0, top: -100, left: 40  },
  { id: "drink",  Component: DrinkCup,  wordIndex: 2, top: -115, left: 20  },
  { id: "fries",  Component: Fries,     wordIndex: 4, top: -105, left: 30  },
  { id: "star",   Component: StarBadge, wordIndex: 3, top:   10, left: 70  },
];

const WORDS = ["Cravings", "delivered", "fresh", "in", "minutes", "·"];

// ─── Component ───────────────────────────────────────────────────────────────

export default function HorizontalScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const wordRefs   = useRef<(HTMLSpanElement | null)[]>([]);

  const drag = useRef({
    active:   false,
    startX:   0,
    startPos: 0,
    lastX:    0,
    velocity: 0,
    currentX: 0,
    targetX:  0,
  });

  const rafRef         = useRef<number | null>(null);
  const lastActiveWord = useRef<number>(-1);
  const progressRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    const maxScroll = () => -(track.scrollWidth - section.offsetWidth);
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

    const getClosestWordIdx = () => {
      const cx   = section.offsetWidth / 2;
      const sOff = section.getBoundingClientRect().left;
      let best = 0, bestD = Infinity;
      wordRefs.current.forEach((w, i) => {
        if (!w) return;
        const r  = w.getBoundingClientRect();
        const wc = r.left - sOff + r.width / 2;
        const d  = Math.abs(wc - cx);
        if (d < bestD) { bestD = d; best = i; }
      });
      return best;
    };

    const bounceWord = (idx: number) => {
      if (idx === lastActiveWord.current) return;
      const prev = lastActiveWord.current;
      if (prev >= 0 && wordRefs.current[prev]) {
        gsap.to(wordRefs.current[prev], { y: 0, scale: 1, duration: 0.35, ease: "elastic.out(1,0.5)" });
      }
      if (wordRefs.current[idx]) {
        gsap.fromTo(
          wordRefs.current[idx],
          { y: 0, scale: 1 },
          { y: -24, scale: 1.07, duration: 0.28, ease: "back.out(3)", yoyo: true, repeat: 1 }
        );
      }
      lastActiveWord.current = idx;
    };

    const tick = () => {
      const d = drag.current;
      if (!d.active) {
        d.velocity *= 0.88;
        d.targetX  += d.velocity;
        d.targetX   = clamp(d.targetX, maxScroll(), 0);
        d.currentX += (d.targetX - d.currentX) * 0.1;
        if (Math.abs(d.targetX - d.currentX) < 0.1) d.currentX = d.targetX;
      }

      gsap.set(track, { x: d.currentX });
      bounceWord(getClosestWordIdx());

      const ms = maxScroll();
      if (progressRef.current && ms < 0) {
        progressRef.current.style.width = `${clamp((-d.currentX / Math.abs(ms)) * 100, 0, 100)}%`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // ── Scroll trap ───────────────────────────────────────────────────────────
    const onWheel = (e: WheelEvent) => {
      const d      = drag.current;
      const ms     = maxScroll();
      const delta  = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const atStart = d.targetX >= 0;
      const atEnd   = d.targetX <= ms;

      if (delta < 0 && atStart) return;
      if (delta > 0 && atEnd)   return;

      e.preventDefault();
      e.stopPropagation();
      d.targetX = clamp(d.targetX - delta * 2.0, ms, 0);
    };

    // ── Mouse drag ────────────────────────────────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      drag.current = { ...drag.current, active: true, startX: e.clientX, startPos: drag.current.currentX, lastX: e.clientX, velocity: 0 };
      section.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!drag.current.active) return;
      const dx = e.clientX - drag.current.startX;
      drag.current.velocity = (e.clientX - drag.current.lastX) * 1.1;
      drag.current.lastX    = e.clientX;
      const nx = clamp(drag.current.startPos + dx * 1.3, maxScroll(), 0);
      drag.current.currentX = nx;
      drag.current.targetX  = nx;
    };
    const onMouseUp = () => {
      if (!drag.current.active) return;
      drag.current.active  = false;
      drag.current.targetX = clamp(drag.current.currentX + drag.current.velocity * 8, maxScroll(), 0);
      section.style.cursor = "grab";
    };

    // ── Touch ─────────────────────────────────────────────────────────────────
    const onTouchStart = (e: TouchEvent) => {
      drag.current = { ...drag.current, active: true, startX: e.touches[0].clientX, startPos: drag.current.currentX, lastX: e.touches[0].clientX, velocity: 0 };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!drag.current.active) return;
      const dx = e.touches[0].clientX - drag.current.startX;
      drag.current.velocity = (e.touches[0].clientX - drag.current.lastX) * 1.1;
      drag.current.lastX    = e.touches[0].clientX;
      const nx = clamp(drag.current.startPos + dx * 1.3, maxScroll(), 0);
      drag.current.currentX = nx;
      drag.current.targetX  = nx;
    };
    const onTouchEnd = () => {
      drag.current.active  = false;
      drag.current.targetX = clamp(drag.current.currentX + drag.current.velocity * 8, maxScroll(), 0);
    };

    section.addEventListener("mousedown",  onMouseDown);
    window.addEventListener("mousemove",   onMouseMove);
    window.addEventListener("mouseup",     onMouseUp);
    section.addEventListener("touchstart", onTouchStart, { passive: true });
    section.addEventListener("touchmove",  onTouchMove,  { passive: true });
    section.addEventListener("touchend",   onTouchEnd);
    section.addEventListener("wheel",      onWheel,      { passive: false });

    setTimeout(() => { drag.current.targetX = maxScroll() * 0.05; }, 350);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      section.removeEventListener("mousedown",  onMouseDown);
      window.removeEventListener("mousemove",   onMouseMove);
      window.removeEventListener("mouseup",     onMouseUp);
      section.removeEventListener("touchstart", onTouchStart);
      section.removeEventListener("touchmove",  onTouchMove);
      section.removeEventListener("touchend",   onTouchEnd);
      section.removeEventListener("wheel",      onWheel);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative  w-full overflow-hidden cursor-grab select-none"
      style={{ height: "100svh" }}
    >
      {/* ── Track — doodles live INSIDE here so they scroll with the words ── */}
      <div className="absolute inset-0 flex items-center">
        <div
          ref={trackRef}
          className="relative flex items-baseline will-change-transform whitespace-nowrap"
          style={{ paddingLeft: "45vw", paddingRight: "45vw" }}
        >
          {WORDS.map((word, i) => (
            // Each word is position:relative so doodles can anchor to it
            <span
              key={i}
              ref={(el) => { wordRefs.current[i] = el; }}
              className="relative inline-block will-change-transform"
              style={{
                fontSize:      "clamp(4rem, 10.5vw, 9rem)",
                fontWeight:    900,
                letterSpacing: "-0.04em",
                lineHeight:    1,
                padding:       "0 18px",
              }}
            >
              {word}

              {/* Render any doodle anchored to this word index */}
              {DOODLES.filter((d) => d.wordIndex === i).map((d) => (
                <span
                  key={d.id}
                  className="absolute pointer-events-none"
                  style={{
                    top:  `${d.top}px`,
                    left: `${d.left}px`,
                    // lift doodles above text
                    zIndex: 10,
                  }}
                >
                  <d.Component />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Subtitle ── */}
      <div className="absolute bottom-[13%] left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 w-[540px] max-w-[90vw]">
        <p style={{ fontSize: "14px", lineHeight: 1.8 }}>
          Cravings hit different when it arrives <em>fresh</em>.{" "}
          <br className="hidden md:block" />
          Order from your favourites — delivered in minutes.
        </p>
      </div>

      {/* ── Progress bar ── */}
    {/*   <div className="absolute bottom-0 left-0 w-full h-[2px] opacity-20">
        <div className="h-full w-full absolute opacity-30" />
        <div
          ref={progressRef}
          className="h-full opacity-60 transition-[width] duration-75"
          style={{ width: "0%", background: "currentColor" }}
        />
      </div> */}

      {/* ── Drag hint ── */}
      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none opacity-30"
        style={{ fontFamily: "monospace", fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase" }}
      >
        <svg width="26" height="8" viewBox="0 0 26 8" fill="none">
          <path d="M0 4 L22 4 M17 1 L22 4 L17 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        drag
        <svg width="26" height="8" viewBox="0 0 26 8" fill="none" style={{ transform: "scaleX(-1)" }}>
          <path d="M0 4 L22 4 M17 1 L22 4 L17 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}