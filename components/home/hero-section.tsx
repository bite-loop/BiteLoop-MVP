"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Navbar from "../navbar/navbar";
import { FOOD } from "@/public/image/image";
import gsap from "gsap";

export default function Hero() {
  const videoRef    = useRef<HTMLVideoElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const taglineRef  = useRef<HTMLParagraphElement>(null);
  const burgerRef   = useRef<HTMLDivElement>(null);
  const slushyRef   = useRef<HTMLDivElement>(null);
  const scribbleRef = useRef<SVGPathElement>(null);

  // ── Autoplay video ────────────────────────────────────────────────────────
  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  // ── Entrance + float animations ───────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // heading lines stagger in from below
      tl.fromTo(
        ".hero-line",
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 },
        0
      )
      // tagline fades up
      .fromTo(
        taglineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.5
      )
      // food images drop in with overshoot
      .fromTo(
        burgerRef.current,
        { y: -60, opacity: 0, rotate: -12 },
        { y: 0,   opacity: 1, rotate: 0, duration: 1, ease: "back.out(2)" },
        0.3
      )
      .fromTo(
        slushyRef.current,
        { y: -60, opacity: 0, rotate: 12 },
        { y: 0,   opacity: 1, rotate: 0, duration: 1, ease: "back.out(2)" },
        0.45
      );

      // scribble draws on
      if (scribbleRef.current) {
        const len = scribbleRef.current.getTotalLength();
        gsap.set(scribbleRef.current, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(scribbleRef.current, {
          strokeDashoffset: 0,
          duration: 1.2,
          ease: "power2.inOut",
          delay: 0.9,
        });
      }

      // gentle float loop — burger
      gsap.to(burgerRef.current, {
        y: -14,
        rotate: 4,
        duration: 2.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // gentle float loop — slushy (offset phase)
      gsap.to(slushyRef.current, {
        y: -10,
        rotate: -4,
        duration: 3.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 0.6,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden p-3 md:p-4">
      {/* ── Rounded container ── */}
      <div className="relative h-full w-full overflow-hidden rounded-[2rem]">

        {/* ── Background video ── */}
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

        {/* ── Dark vignette overlay — stronger at bottom so text pops ── */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* ── Subtle radial centre glow so heading area isn't flat ── */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(0,0,0,0.55),transparent)]" />

        

        {/* ── Main content ── */}
        <div className="relative z-10 flex h-full items-end justify-center px-6 pb-16 text-center md:px-12 md:pb-24">
          <div className="relative max-w-6xl w-full">

            {/* ── Burger image ── */}
            <div
              ref={burgerRef}
              className="absolute hidden md:block left-24 lg:left-36 bottom-16 z-20"
            >
              <div className="relative h-32 w-32 lg:h-44 lg:w-44">
                <Image
                  src={FOOD.BURGER}
                  alt="burger"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* ── Slushy image ── */}
            <div
              ref={slushyRef}
              className="absolute hidden md:block -right-4 lg:-right-12 -top-20 lg:-top-28 z-20"
            >
              <div className="relative h-28 w-28 lg:h-40 lg:w-40">
                <Image
                  src={FOOD.SLURPY}
                  alt="slushy"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* ── Heading ── */}
            <h1
              ref={headingRef}
              className="leading-[0.88] tracking-tight text-white"
            >
              {/* Line 1 */}
              <span className="hero-line block text-4xl font-black sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem]">
                fast food{" "}
                <span className="font-serif font-normal italic">delivered</span>{" "}
                to
              </span>

              {/* Line 2 */}
              <span className="hero-line block text-4xl font-black sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem]">
                your{" "}

                {/* "doorstep" with animated scribble underline */}
                <span className="relative inline-block px-1">
                  doorstep
                  <svg
                    className="absolute -bottom-5 left-1/2 w-[110%] -translate-x-1/2 overflow-visible"
                    viewBox="0 0 500 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      ref={scribbleRef}
                      d="M20 35 C80 10 180 8 250 20 C320 32 420 28 480 15"
                      stroke="white"
                      strokeWidth="5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </span>
            </h1>

            {/* ── Tagline ── */}
            <p
              ref={taglineRef}
              className="mt-10 text-xs font-semibold uppercase tracking-[0.38em] text-white/60 md:text-sm"
            >
              Fresh Meals&nbsp;•&nbsp;Fast Delivery&nbsp;•&nbsp;Endless Cravings
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}