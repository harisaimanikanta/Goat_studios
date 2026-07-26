import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { blurReveal, staggerContainer } from "../../animations/framerAnimations";
import MagneticButton from "../Button/MagneticButton";
import Hero3DModel from "./Hero3DModel";
import { ChevronDown } from "lucide-react";
import "./Hero.css";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background cyber particle grid loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5;
        this.speedY = -(Math.random() * 0.5 + 0.1);
        this.color = Math.random() > 0.5 ? "rgba(0, 240, 255, " : "rgba(255, 0, 127, ";
      }

      update() {
        this.y += this.speedY;
        if (this.y < 0) {
          this.y = height;
          this.x = Math.random() * width;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `${this.color}${Math.random() * 0.4 + 0.2})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = Math.floor((width * height) / 12000);
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Cyber Grid Lines
      ctx.strokeStyle = "rgba(0, 240, 255, 0.03)";
      ctx.lineWidth = 0.5;
      const step = 60;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const nextSection = document.getElementById("portfolio");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="hero" className="hero-section">
      {/* Background Interactive canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Cyber Mesh and Ambient Lights */}
      <div className="hero-mesh" />
      <div className="hero-ambient-lights">
        <div className="hero-light-purple" />
        <div className="hero-light-blue" />
      </div>

      {/* Core Typographic Container */}
      <div className="relative z-10 text-center max-w-6xl mx-auto flex flex-col items-center">
        {/* Cinematic Headline with 3D model between text */}
        <motion.div
          variants={staggerContainer(0.18, 0.2)}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center select-none w-full"
        >
          <motion.h1
            variants={blurReveal}
            custom={0.2}
            className="text-[8.5vw] sm:text-6xl md:text-[7.5rem] lg:text-[105px] font-black leading-[0.88] tracking-tighter uppercase text-white drop-shadow-[0_0_35px_rgba(0,240,255,0.2)] max-w-full px-2"
          >
            WE DESIGN
          </motion.h1>

          {/* INTERACTIVE 3D MODEL BETWEEN WE DESIGN AND MONOLITHS */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="w-full my-1"
          >
            <Hero3DModel />
          </motion.div>

          <motion.h1
            variants={blurReveal}
            custom={0.38}
            className="text-[8.5vw] sm:text-6xl md:text-[7.5rem] lg:text-[105px] font-black leading-[0.88] tracking-tighter uppercase text-transparent stroke-text drop-shadow-[0_0_30px_rgba(255,230,0,0.3)] max-w-full px-2"
          >
            3D ELEMENTS AND ENVIRONMENTS
          </motion.h1>
        </motion.div>

        {/* Cyber Neon Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-sm sm:text-base md:text-xl text-zinc-300 max-w-2xl font-sans tracking-wide leading-relaxed font-light px-4"
        >
          Crafting cinematic CGI, immersive motion, and digital experiences that leave a lasting impression.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-6 justify-center items-center"
        >
          <div className="group relative inline-block">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-yellow-500 rounded-full blur-lg opacity-40 group-hover:opacity-100 transition duration-500 pointer-events-none" />
            <MagneticButton
              onClick={handleScrollClick}
              className="relative px-10 py-4 bg-cyan-400 text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-yellow-500 hover:text-white transition-all duration-300 z-10 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              Explore Our Works
            </MagneticButton>
          </div>
          <MagneticButton
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-10 py-4 border border-yellow-500/50 bg-yellow-950/20 text-yellow-300 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-yellow-500/20 hover:border-yellow-400 hover:shadow-[0_0_25px_rgba(255,230,0,0.4)] transition-all duration-300"
          >
            Lets Collaborate
          </MagneticButton>
        </motion.div>
      </div>

      {/* Downward Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-20 z-10"
      >
        <a
          href="#portfolio"
          onClick={handleScrollClick}
          className="flex flex-col items-center gap-1.5 text-[0.65rem] tracking-[0.4em] font-mono text-cyan-400/70 hover:text-cyan-300 transition-colors duration-300 group"
        >
          SCROLL TO EXPLORE ARCHIVES
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4 text-cyan-400 group-hover:text-yellow-400 transition-colors duration-300" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
