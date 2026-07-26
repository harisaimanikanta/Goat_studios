import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./Gallery.css";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: "g1",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    title: "Misty Mountain Valley",
    category: "CGI Environments",
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
    title: "Alpine Peaks Sunrise",
    category: "Architecture",
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=1200&q=80",
    title: "Aerial Coastal Landscape",
    category: "Product Detail",
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    title: "Golden Hour Wilderness",
    category: "3D Particle Dynamics",
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80",
    title: "Forest Cathedral Light",
    category: "Lighting Study",
  },
];

const total = galleryImages.length;

// Shortest-path offset from `current` — for 5 items always resolves to
// [-2, -1, 0, 1, 2], so exactly 3 of those (-1, 0, 1) end up "visible."
function getOffset(index: number, current: number) {
  let diff = index - current;
  if (diff > total / 2) diff -= total;
  if (diff < -total / 2) diff += total;
  return diff;
}

// Angle just under 90° so the visible side panels read as extremely
// turned / near edge-on, without crossing into backface-flip territory.
const VISIBLE_ROTATION = 84;
// Anything past 90° gets hidden automatically by backface-visibility,
// so the exact value here only matters for a smooth approach angle.
const HIDDEN_ROTATION = 130;

const VISIBLE_X_RATIO = 0.4;
const HIDDEN_X_RATIO = 0.58;

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const [width, setWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, 3000);
    return () => clearInterval(timer);
  }, [advance]);

  const goToSlide = (index: number) => setCurrent(index);

  const cardW = width * 0.42;
  const cardH = cardW * (10 / 16);

  const getSlotStyle = (offset: number) => {
    const abs = Math.abs(offset);
    const sign = Math.sign(offset);

    if (offset === 0) {
      return { x: 0, rotateY: 0, scale: 1, opacity: 1, zIndex: 30 };
    }
    if (abs === 1) {
      return {
        x: sign * width * VISIBLE_X_RATIO,
        rotateY: -sign * VISIBLE_ROTATION,
        scale: 0.94,
        opacity: 1,
        zIndex: 20,
      };
    }
    return {
      x: sign * width * HIDDEN_X_RATIO,
      rotateY: -sign * HIDDEN_ROTATION,
      scale: 0.85,
      opacity: 0,
      zIndex: 5,
    };
  };

  return (
    <section id="gallery" className="gallery-section border-t border-zinc-900">
      <div className="gallery-bg-glow" />

      <div className="relative z-10">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <span className="text-xs font-mono tracking-[0.4em] text-purple-500 uppercase">
                STUDIO EXPLORATIONS
              </span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mt-4 uppercase">
                TEXTURES & <span className="stroke-text">SPACES</span>
              </h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-sm font-sans tracking-wide leading-relaxed font-light">
              A visual repository of digital research, procedural shaders, real-time lighting physics, and architectural concepts.
            </p>
          </div>
        </div>

        {/* Slideshow Carousel */}
        <div className="gallery-carousel-wrapper">
          <div className="gallery-track" ref={trackRef}>
            {width > 0 &&
              galleryImages.map((img, i) => {
                const offset = getOffset(i, current);
                const slot = getSlotStyle(offset);
                const isCenter = offset === 0;

                return (
                  <motion.div
                    key={img.id}
                    className="gallery-card"
                    style={{
                      width: cardW,
                      height: cardH,
                      zIndex: slot.zIndex,
                      cursor: isCenter ? "default" : "pointer",
                    }}
                    animate={{
                      x: slot.x,
                      rotateY: slot.rotateY,
                      scale: slot.scale,
                      opacity: slot.opacity,
                    }}
                    initial={false}
                    transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
                    onClick={() => !isCenter && Math.abs(offset) === 1 && goToSlide(i)}
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      className="gallery-card-img"
                      referrerPolicy="no-referrer"
                    />

                    <motion.div
                      className="gallery-card-dim"
                      animate={{ opacity: isCenter ? 0 : 0.45 }}
                      transition={{ duration: 0.95, ease: [0.65, 0, 0.35, 1] }}
                    />

                    <AnimatePresence>
                      {isCenter && (
                        <motion.div
                          className="gallery-card-info"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                          <span className="gallery-card-category">{img.category}</span>
                          <h4 className="gallery-card-title">{img.title}</h4>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
          </div>

          {/* Dot Indicators */}
          <div className="gallery-dots">
            {galleryImages.map((img, i) => (
              <button
                key={img.id}
                onClick={() => goToSlide(i)}
                className={`gallery-dot ${i === current ? "gallery-dot-active" : ""}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}