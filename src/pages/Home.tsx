import { useState, useEffect } from "react";
import { useLenis } from "../hooks/useLenis";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import FeaturedWork from "../components/FeaturedWork/FeaturedWork";
import Showreel from "../components/Showreel/Showreel";
import Services from "../components/Services/Services";
import Music from "../components/Music/Music";
import Gallery from "../components/Gallery/Gallery";
import Team from "../components/Team/Team";
import Testimonials from "../components/Testimonials/Testimonials";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import "./Home.css";

export default function Home() {
  // Initialize smooth inertial scrolling across all sections
  useLenis();

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="home-container relative">
      {/* Immersive UI Background Decorative Grid Overlay */}
      <div className="dot-grid-overlay" />

      {/* Ambient Background Glow Orbs */}
      <div className="bg-orb-purple pointer-events-none" />
      <div className="bg-orb-blue pointer-events-none" />

      {/* Immersive HUD Vertical Scroll Progress Indicator (Right Rail) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4 z-40 select-none">
        <span className="text-[10px] text-white/40 font-mono rotate-90 mb-4 tracking-[0.2em]">SCROLL</span>
        <div className="w-[1px] h-32 bg-white/10 relative">
          <div 
            className="absolute top-0 left-0 w-full bg-purple-500 transition-all duration-75"
            style={{ height: `${scrollProgress}%` }}
          />
        </div>
        <span className="text-[10px] text-white/60 font-mono">
          {Math.min(Math.round(scrollProgress), 100).toString().padStart(2, "0")}
        </span>
      </div>

      {/* Absolute top tracking progress bar */}
      <Navbar />

      {/* Main Single Page Sections */}
      <main className="relative z-10">
        <Hero />
        <FeaturedWork />
        <Showreel />
        <Services />
        <Music />
        <Gallery />
        <Team />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
