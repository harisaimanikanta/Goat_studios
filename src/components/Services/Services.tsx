import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { servicesData } from "../../data/servicesData";
import { Box, Layers, Play, Video, Cpu, Music, HardDrive, ShieldAlert, ChevronLeft, ChevronRight } from "lucide-react";
import "./Services.css";

// Dynamic Lucide Icon mapper to match premium vibes
const getServiceIcon = (id: string) => {
  switch (id) {
    case "01":
      return <Box className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 group-hover:text-yellow-400 transition-colors" />;
    case "02":
      return <Layers className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 group-hover:text-yellow-400 transition-colors" />;
    case "03":
      return <Cpu className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 group-hover:text-yellow-400 transition-colors" />;
    case "04":
      return <Video className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 group-hover:text-yellow-400 transition-colors" />;
    case "05":
      return <Play className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 group-hover:text-yellow-400 transition-colors" />;
    case "06":
      return <Music className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 group-hover:text-yellow-400 transition-colors" />;
    case "07":
      return <HardDrive className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 group-hover:text-yellow-400 transition-colors" />;
    case "08":
      return <ShieldAlert className="w-8 h-8 md:w-10 md:h-10 text-cyan-400 group-hover:text-yellow-400 transition-colors" />;
    default:
      return <Box className="w-8 h-8 md:w-10 md:h-10 text-cyan-400" />;
  }
};

export default function Services() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [isHeld, setIsHeld] = useState(false);
  const total = servicesData.length;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Infinite loop slideshow: advances every 3.0 seconds unless user is active-holding
  useEffect(() => {
    if (isHeld) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(timer);
  }, [isHeld, nextSlide]);

  const currentService = servicesData[currentIndex];

  // Mobile drag swipe handler
  const handleDragEnd = (_event: any, info: any) => {
    if (info.offset.x < -40) {
      nextSlide();
    } else if (info.offset.x > 40) {
      prevSlide();
    }
  };

  // Press & hold handlers
  const handleHoldStart = () => setIsHeld(true);
  const handleHoldEnd = () => setIsHeld(false);

  // Slide transition animation variants (Slower & smoother transition speed)
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section id="services" className="services-section border-t border-cyan-500/20">
      <div className="services-ambient-glow" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.4em] text-cyan-400 uppercase font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              [CAPABILITIES_&_SYSTEMS]
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mt-4 uppercase">
              STUDIO <span className="stroke-text-cyber">SERVICES</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-300 max-w-sm font-sans tracking-wide leading-relaxed font-light">
            Unified ecosystem engineered for luxury 3D imagery, quantum motion, and synthetic acoustics.
          </p>
        </div>

        {/* UNIFIED CAROUSEL SLIDESHOW UNIT (PRESS & HOLD TO PAUSE) */}
        <div
          className="services-unit-wrapper relative group"
          onMouseDown={handleHoldStart}
          onMouseUp={handleHoldEnd}
          onTouchStart={handleHoldStart}
          onTouchEnd={handleHoldEnd}
          onMouseLeave={handleHoldEnd}
        >
          {/* Top HUD Status Bar */}
          <div className="services-hud-bar flex justify-between items-center px-4 sm:px-6 py-3 border-b border-cyan-500/20 bg-black/40 backdrop-blur-md rounded-t-2xl gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className={`w-2 h-2 rounded-full ${isHeld ? 'bg-yellow-400 animate-pulse' : 'bg-cyan-400 animate-ping'} flex-shrink-0`} />
              <span className="text-[11px] sm:text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold">
                {isHeld ? '[PAUSED - HOLDING]' : `[SERVICE ${String(currentIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}]`}
              </span>
            </div>

            {/* Service Tab Pills */}
            <div className="hidden sm:flex items-center gap-1.5">
              {servicesData.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(idx)}
                  className={`px-3 py-1 text-[11px] font-mono rounded-lg transition-all duration-300 ${
                    idx === currentIndex
                      ? "bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                      : "bg-black/40 border border-white/10 text-zinc-400 hover:text-white hover:border-white/30"
                  }`}
                >
                  /{s.id}
                </button>
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="services-nav-arrow p-2 rounded-xl bg-black/60 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
                aria-label="Previous Service"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="services-nav-arrow p-2 rounded-xl bg-black/60 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all duration-300"
                aria-label="Next Service"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Service Card Viewport */}
          <div className="services-card-viewport relative overflow-hidden bg-black/60 backdrop-blur-xl border-x border-b border-cyan-500/20 rounded-b-2xl min-h-[360px] sm:min-h-[400px] p-6 sm:p-10 flex flex-col justify-between">
            {/* Cyber HUD Corner Decorators */}
            <div className="cyber-corner-tl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="cyber-corner-tr opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="cyber-corner-bl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="cyber-corner-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentService.id}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="w-full flex flex-col justify-between flex-grow cursor-grab active:cursor-grabbing select-none"
              >
                <div>
                  {/* Icon & ID Header */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="p-3.5 sm:p-4 bg-black/80 border border-cyan-500/40 rounded-2xl shadow-[0_0_20px_rgba(0,240,255,0.15)] flex items-center justify-center">
                      {getServiceIcon(currentService.id)}
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-cyan-400 tracking-widest font-bold px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                      SERVICE /{currentService.id}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-2xl sm:text-4xl md:text-5xl font-mono font-black text-white tracking-tight uppercase">
                    {currentService.title}
                  </h3>
                  <span className="text-xs sm:text-base font-mono text-yellow-400 uppercase block mt-2 tracking-widest font-bold">
                    {currentService.subtitle}
                  </span>

                  {/* Description */}
                  <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-zinc-300 leading-relaxed font-light max-w-3xl">
                    {currentService.description}
                  </p>
                </div>

                {/* Tags Footer */}
                <div className="mt-8 pt-6 border-t border-cyan-500/20 flex flex-wrap gap-2 sm:gap-2.5 items-center">
                  <span className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase mr-2 tracking-wider">
                    CORE TECH:
                  </span>
                  {currentService.tags.map((tag, tIndex) => (
                    <span
                      key={tIndex}
                      className="text-[10px] sm:text-xs font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 py-1.5 px-3.5 rounded-full shadow-[0_0_12px_rgba(0,240,255,0.15)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Dot Indicators */}
          <div className="services-dots-container flex justify-center items-center gap-2 mt-6">
            {servicesData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-10 bg-cyan-400 shadow-[0_0_12px_rgba(0,240,255,0.8)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to service ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
