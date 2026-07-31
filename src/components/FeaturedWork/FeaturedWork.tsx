import { useState } from "react";
import { motion } from "motion/react";
import { portfolioData } from "../../data/portfolioData";
import ProjectCard from "../Card/ProjectCard";
import "./FeaturedWork.css";

export default function FeaturedWork() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const handlePlayVideo = (projectId: string) => {
    setActiveVideoId(projectId);
  };

  const handleCloseVideo = () => {
    setActiveVideoId(null);
  };

  return (
    <section id="portfolio" className="portfolio-section border-t border-cyan-500/20">
      <div className="portfolio-bg-glow" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
              FEATURED <span className="stroke-text-cyber">WORK</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-300 max-w-sm font-sans tracking-wide leading-relaxed font-light">
            A curated portfolio of ultra-luxury 3D digital architectural renders, interactive virtual structures, and aerodynamic product designs.
          </p>
        </div>

        {/* Asymmetrical Grid of Project Cards */}
        <div className="portfolio-grid">
          {portfolioData.map((project) => (
            <div key={project.id}>
              <ProjectCard
                project={project}
                isVideoPlaying={activeVideoId === project.id}
                onPlayVideo={() => handlePlayVideo(project.id)}
                onCloseVideo={handleCloseVideo}
              />
            </div>
          ))}
        </div>

        {/* Bottom Section Metric */}
        <div className="mt-28 pt-12 border-t border-cyan-500/20 flex flex-wrap justify-between gap-8 text-zinc-400 text-xs font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            GOAT STUDIOS &copy; ALL RIGHTS RESERVED
          </div>
          <div className="text-yellow-400 font-bold">GLOBAL REACH</div>
          <div className="text-cyan-400">SYS_STATUS: ONLINE // 2026</div>
        </div>
      </div>
    </section>
  );
}
