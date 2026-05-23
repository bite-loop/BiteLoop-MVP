import HeroSection from "@/components/home/hero-section";
import Navbar from "@/components/navbar/navbar";

export default function Home() {
   return (
     <>
      <main className="min-h-screen">
        <Navbar/>
        <HeroSection/>
      </main>
     </>
   )
}