"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FOOD } from "@/public/image/image";
import FoodCursorBlob from "@/components/cursor-blob/FoodCursorBlob";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const taglineRef = useRef<HTMLParagraphElement | null>(null);
  const burgerRef = useRef<HTMLDivElement | null>(null);
  const slushyRef = useRef<HTMLDivElement | null>(null);
  const scribbleRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-line",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 }
      )
        .fromTo(
          taglineRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.4
        )
        .fromTo(
          burgerRef.current,
          { y: -60, opacity: 0, rotate: -12 },
          { y: 0, opacity: 1, rotate: 0, duration: 1 }
        )
        .fromTo(
          slushyRef.current,
          { y: -60, opacity: 0, rotate: 12 },
          { y: 0, opacity: 1, rotate: 0, duration: 1 }
        );

      if (scribbleRef.current) {
        const len = scribbleRef.current.getTotalLength();
        gsap.set(scribbleRef.current, {
          strokeDasharray: len,
          strokeDashoffset: len,
        });

        gsap.to(scribbleRef.current, {
          strokeDashoffset: 0,
          duration: 1.2,
        });
      }

      gsap.to(burgerRef.current, {
        y: -12,
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "sine.inOut",
      });

      gsap.to(slushyRef.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        duration: 3.2,
        ease: "sine.inOut",
        delay: 0.5,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden rounded-[2rem]">
      <FoodCursorBlob containerRef={containerRef} />

      <section className="relative h-screen w-full overflow-hidden p-3 md:p-4">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem]">

          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/video/hero-video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/40" />

         
       

          <div className="relative z-10 flex h-full items-end justify-center pb-16 text-center">
            <div className="relative max-w-6xl w-full">

              <div ref={burgerRef} className="absolute left-24 bottom-16 hidden md:block">
                <Image src={FOOD.BURGER} alt="" width={160} height={160} />
              </div>

              <div ref={slushyRef} className="absolute -right-10 -top-20 hidden md:block">
                <Image src={FOOD.SLURPY} alt="" width={140} height={140} />
              </div>

              <h1 ref={headingRef} className="text-white leading-[0.9]">
                <span className="hero-line block text-5xl font-black md:text-7xl">
                  fast food delivered to
                </span>

                <span className="hero-line block text-5xl font-black md:text-7xl">
                  your{" "}
                  <span className="relative">
                    doorstep
                    <svg
                      className="absolute -bottom-4 left-0 w-full"
                      viewBox="0 0 500 60"
                      fill="none"
                    >
                      <path
                        ref={scribbleRef}
                        d="M20 35 C80 10 180 8 250 20 C320 32 420 28 480 15"
                        stroke="white"
                        strokeWidth="4"
                      />
                    </svg>
                  </span>
                </span>
              </h1>

              <p ref={taglineRef} className="mt-8 text-xs uppercase tracking-[0.3em] text-white/60">
                Fresh • Fast • Delicious
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}