"use client";

import { LOGOS } from "@/public/logo/logo";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Headset, Menu, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useState } from "react";

const NAV_LINKS = [
  { label: "About Us", href: "#" },
  { label: "Menu",     href: "#" },
  { label: "Location", href: "#" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute left-0 top-3 z-50 w-full px-5 py-4 md:px-16">
      <div className="relative flex items-center justify-between">

        {/* ── Left nav links (desktop) ── */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-sm font-black uppercase tracking-wide text-white transition hover:text-orange-400"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* ── Center logo ── */}
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer"
        >
          <div className="relative h-10 w-10 md:h-28 md:w-28">
            <Image src={LOGOS.DARK} alt="Biteloop Logo" fill className="object-contain" />
          </div>
        </Link>

        {/* ── Right side (desktop) ── */}
        <div className="ml-auto hidden items-center gap-3 md:flex">
         <Tooltip>
  <TooltipTrigger className="inline-flex cursor-pointer h-10 w-9 items-center justify-center rounded-md bg-red-500 text-white transition hover:bg-red-600">
    <Link
    
     href={"/helpline"}
    >
    <Headset  className="h-4 w-4" />
    </Link>
  </TooltipTrigger>

  <TooltipContent>
    <p>Helpline</p>
  </TooltipContent>
</Tooltip>

          <Link href="/login">
            <Button className="bg-red-500 font-bold px-6 py-5 hover:bg-red-600 cursor-pointer">
              Order Now
            </Button>
          </Link>
        </div>

        {/* ── Mobile: hamburger ── */}
        <button
          className="ml-auto flex items-center justify-center rounded-md p-2 text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-black/80 px-6 py-6 backdrop-blur-md md:hidden">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-black uppercase tracking-wide text-white transition hover:text-orange-400"
            >
              {l.label}
            </Link>
          ))}

          <div className="mt-2 flex items-center gap-3">
           
                <Button className="bg-red-500 hover:bg-red-600 cursor-pointer" size="icon">
                  <Headset className="h-4 w-4" />
                </Button>
              

            <Link href="/login" className="flex-1" onClick={() => setOpen(false)}>
              <Button className="w-full bg-red-500 font-bold hover:bg-red-600 cursor-pointer">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}