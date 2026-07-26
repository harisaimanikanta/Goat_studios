import React, { useState } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import VideoEmbed from "../VideoEmbed/VideoEmbed";
import "./Showreel.css";

const SHOWREEL_YOUTUBE_URL = "https://www.youtube.com/embed/uXE4OrL0uXw";

export default function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPlaying(false);
  };

  return (
    <section id="showreel" className="showreel-section border-t border-cyan-500/20">
      <div className="showreel-bg-glow" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-[0.4em] text-cyan-400 uppercase font-bold flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            [CYBER_VISUAL_VELOCITY]
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mt-4 uppercase">
            CINEMATIC <span className="stroke-text-cyber">SHOWREEL</span>
          </h2>
        </div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="showreel-container group relative"
        >
          {/* Cyber HUD Corner Decorators */}
          <div className="cyber-corner-tl opacity-80 z-20 pointer-events-none" />
          <div className="cyber-corner-tr opacity-80 z-20 pointer-events-none" />
          <div className="cyber-corner-bl opacity-80 z-20 pointer-events-none" />
          <div className="cyber-corner-br opacity-80 z-20 pointer-events-none" />

          {/* YouTube Video Embed inside the website */}
          {isPlaying && (
            <VideoEmbed
              videoUrl={SHOWREEL_YOUTUBE_URL}
              title="GOAT Studios Showreel"
              onClose={handleClose}
              closeButtonClass="close-video-btn absolute top-4 right-4 z-40 w-11 h-11 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-500 backdrop-blur-md transition-all duration-300 shadow-lg"
            />
          )}

          {/* Cover Art Poster (visible when not playing) */}
          <div 
            className={`absolute inset-0 z-10 transition-opacity duration-700 cursor-pointer ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            onClick={handlePlay}
          >
            <img
              src="https://res.cloudinary.com/bjzirr40/image/upload/v1784836515/ChatGPT_Image_Jul_21_2026_09_04_53_AM_uqmokk.png"
              alt="Showreel Poster"
              className="showreel-poster"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Interactive Play Button (visible when not playing) */}
          {!isPlaying && (
            <div 
              className="play-button-wrap z-20 cursor-pointer"
              onClick={handlePlay}
            >
              <div className="play-circle">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <span className="text-xs font-mono tracking-[0.3em] text-cyan-300 group-hover:text-yellow-400 font-bold transition-colors duration-400 drop-shadow-md">
                PLAY FILM • 8K CYBER_REEL
              </span>
            </div>
          )}

          {/* Lower Floating Cinematic Tag */}
          <div className={`absolute bottom-8 left-8 right-8 flex justify-between items-center text-[0.65rem] tracking-[0.25em] font-mono text-cyan-400 z-20 font-bold bg-black/60 p-3 rounded-lg backdrop-blur-md border border-cyan-500/30 transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <div>RESOLUTION &mdash; 8K ULTRA HDR</div>
            <div>FPS &mdash; 60 UNREAL_5</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
