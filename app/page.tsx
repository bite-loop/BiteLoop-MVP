import HeroSection from "@/components/home/hero-section";
import HorizontalWords from "@/components/home/horizontal-words";
import Navbar from "@/components/navbar/navbar";
import SmoothScrolling from "@/components/scrolling/smooth-scrolling";
import Feature from "@/components/home/feature-store";

export default function Home() {
   return (
     <>
      <main className="min-h-screen">
        <SmoothScrolling/>
        <Navbar/>
        <HeroSection/>
        <HorizontalWords/>
        <Feature/>
       
      </main>
     </>
   )
}