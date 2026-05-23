// components/hero.tsx
"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Navbar from "../navbar/navbar";
import { FOOD } from "@/public/image/image";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black p-3 md:p-4">
      {/* Rounded Hero Container */}
      <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
        
        {/* Background Video */}
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

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/20" />

        {/* Navbar */}
       

        {/* Main Content */}
        <div className="relative z-10 flex h-full items-end justify-center px-6 pb-20 text-center md:px-12 md:pb-24">
          <div className="relative max-w-6xl">

            {/* Burger Image */}
            <div className="absolute hidden md:block left-48 bottom-10 z-20 md:-top-20">
              <div className="relative h-24 w-24 md:h-40 md:w-40">
                <Image
                  src={FOOD.BURGER}
                  alt="burger"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Slushy Image */}
            <div className="absolute hidden md:block -right-8 -top-14 z-20 md:-right-16 md:-top-24">
              <div className="relative h-20 w-20 md:h-36 md:w-36">
                <Image
                  src={FOOD.SLURPY}
                  alt="slushy"
                  fill
                  
                  className="object-contain drop-shadow-2xl"
                />
              </div>
            </div>

            {/* Heading */}
            <h1 className="leading-[0.9] tracking-tight text-white">
              
              {/* First Line */}
              <span className="block text-4xl font-black sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem]">
                fast food 
                <span className="mx-3 inline-block font-serif font-normal italic">
                  delivered
                </span>
                to
              </span>

              {/* Second Line */}
             {/* Second Line */}
<span className="block text-4xl font-black sm:text-5xl md:text-6xl lg:text-7xl xl:text-[6.5rem]">
  your{" "}

  {/* Doorstep Word */}
  <span className="relative inline-block px-2">
    doorstep

    {/* Multiple Scribbles */}
    <svg
      className="absolute -bottom-8 left-1/2 w-[115%] -translate-x-1/2"
      viewBox="0 0 500 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Scribble */}
      <path
        d="M60 80C80 20 420 20 440 80C455 125 390 145 250 145C110 145 45 125 60 80Z"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Middle Scribble */}
    
    </svg>
  </span>
</span>

              {/* Small Tagline */}
              <p className="mt-8 text-sm font-medium uppercase tracking-[0.35em] text-white/70 md:text-base">
                Fresh Meals • Fast Delivery • Endless Cravings
              </p>

              {/* Rounded Scribble */}
             
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}