// components/navbar.tsx
import { LOGOS } from "@/public/logo/logo";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Headset } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function Navbar() {
  return (
    <nav className="absolute left-0 top-3 z-50 w-full px-5 py-6 md:px-16">
      <div className="relative flex items-center justify-between">
        
        {/* Left Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="#"
            className="text-sm font-black uppercase tracking-wide text-white transition hover:text-orange-400"
          >
            About Us
          </Link>

          <Link
            href="#"
            className="text-sm font-black uppercase tracking-wide text-white transition hover:text-orange-400"
          >
            Menu
          </Link>

          <Link
            href="#"
            className="text-sm font-black uppercase tracking-wide text-white transition hover:text-orange-400"
          >
            Location
          </Link>
        </div>

        {/* Center Logo */}
       <Link href={"/"} className="cursor-pointer absolute left-1/2 flex -translate-x-1/2 flex-col items-center">
        
          <div className="relative h-10 w-10 md:h-32 md:w-32">
            <Image
              src={LOGOS.DARK}
              alt="Biteloop Logo"
              fill
              className="object-contain  "
            />
          </div>
       
       </Link>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-4">
          
          {/* Circle Buttons */}
        <Tooltip>
          <TooltipTrigger >
             <Button className={"bg-red-500  cursor-pointer hover:bg-red-600"} size={'icon-lg'}>
              <Headset/>
            </Button>
          </TooltipTrigger>
         <TooltipContent>
        <p>Helpline</p>
      </TooltipContent>
        </Tooltip>

         

          {/* CTA Button */}
        <Link href={"/login"}>
         <Button className="bg-red-500 font-bold px-7 py-5 hover:bg-red-600 cursor-pointer transi">
            Order Now
         </Button>
        </Link>
        </div>
      </div>
    </nav>
  );
}