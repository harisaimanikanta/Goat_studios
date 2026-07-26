import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { testimonialsData } from "../../data/testimonialsData";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import "./Testimonials.css";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000); // cycle every 6 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  // Custom slide-fade variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 120 : -120,
      opacity: 0,
      filter: "blur(8px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        x: { type: "spring", stiffness: 100, damping: 20 },
        opacity: { duration: 0.6 },
        filter: { duration: 0.6 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -120 : 120,
      opacity: 0,
      filter: "blur(8px)",
      transition: {
        x: { type: "spring", stiffness: 100, damping: 20 },
        opacity: { duration: 0.4 },
        filter: { duration: 0.4 },
      },
    }),
  };

  const current = testimonialsData[activeIndex];

  return (
    <section id="testimonials" className="testimonials-section border-t border-cyan-500/20">
      <div className="testimonials-bg-glow" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-[0.4em] text-cyan-400 uppercase font-bold flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            [PATRON_ENDORSEMENTS]
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mt-4 uppercase">
            CLIENT <span className="stroke-text-cyber">ENDORSEMENTS</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="testimonial-glass-card relative p-8 md:p-16 min-h-[380px] flex flex-col justify-between">
          {/* Cyber HUD Corner Decorators */}
          <div className="cyber-corner-tl opacity-70" />
          <div className="cyber-corner-tr opacity-70" />
          <div className="cyber-corner-bl opacity-70" />
          <div className="cyber-corner-br opacity-70" />

          <div className="absolute top-8 left-8 text-cyan-400/30">
            <Quote className="w-12 h-12 stroke-[1.5]" />
          </div>

          {/* Slide Animation Wrapper */}
          <div className="relative overflow-hidden flex-grow flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex flex-col items-center text-center"
              >
                {/* Quote */}
                <p className="text-lg md:text-2xl text-zinc-100 font-sans tracking-wide leading-relaxed font-light italic mb-8 max-w-2xl relative z-10">
                  &ldquo;{current.quote}&rdquo;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 mt-4">
                  <img
                    src={current.avatar}
                    alt={current.author}
                    className="w-12 h-12 rounded-full border border-cyan-400/50 object-cover shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-left">
                    <h4 className="text-sm font-mono font-bold tracking-tight text-white uppercase">
                      {current.author}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-400 tracking-wider block mt-0.5 uppercase">
                      {current.role} &mdash;{" "}
                      <span className="text-cyan-400 font-bold">
                        {current.company}
                      </span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t border-cyan-500/20">
            {/* Arrows */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-black/80 border border-cyan-400/40 hover:border-yellow-500 text-cyan-400 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(255,230,0,0.4)] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-black/80 border border-cyan-400/40 hover:border-yellow-500 text-cyan-400 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(255,230,0,0.4)] flex items-center justify-center transition-all cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dots indicators */}
            <div className="flex gap-2">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  className={`testimonial-dot ${idx === activeIndex ? "active" : ""}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
