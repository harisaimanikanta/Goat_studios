import React from "react";
import { motion } from "motion/react";
import { Project } from "../../data/portfolioData";
import { ArrowUpRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import VideoEmbed from "../VideoEmbed/VideoEmbed";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
  isVideoPlaying: boolean;
  onPlayVideo: () => void;
  onCloseVideo: () => void;
}

export default function ProjectCard({ project, isVideoPlaying, onPlayVideo, onCloseVideo }: ProjectCardProps) {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.arrow-nav-btn')) return;
    if ((e.target as HTMLElement).closest('.close-video-btn')) return;
    if (isVideoPlaying) return;
    
    onPlayVideo();
  };

  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/project/${project.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="project-card-container group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Cyber HUD Corner Decorators */}
      <div className="cyber-corner-tl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="cyber-corner-tr opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="cyber-corner-bl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="cyber-corner-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="project-image-wrap">
        {/* YouTube Video Embed with loading animation */}
        {isVideoPlaying && (
          <VideoEmbed
            videoUrl={project.videoUrl}
            title={`${project.title} Video`}
            onClose={(e) => { e.stopPropagation(); onCloseVideo(); }}
          />
        )}

        {/* Thumbnail Image */}
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={`project-image transition-opacity duration-500 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}
          referrerPolicy="no-referrer"
        />
        <div className={`project-overlay transition-opacity duration-500 ${isVideoPlaying ? 'opacity-0' : ''}`} />

        {/* Play Button Overlay */}
        {!isVideoPlaying && (
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-black/60 backdrop-blur-md border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 group-hover:border-yellow-400 group-hover:text-yellow-400 transition-all duration-500 shadow-[0_0_25px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_35px_rgba(255,230,0,0.4)] group-hover:scale-110">
              <Play className="w-7 h-7 md:w-8 md:h-8 fill-current ml-1" />
            </div>
          </div>
        )}
      </div>

      <div className={`project-content flex flex-col justify-end transition-opacity duration-400 p-4 sm:p-6 ${isVideoPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        {/* Category & Year (Smaller Text) */}
        <div className="flex justify-between items-center text-[10px] sm:text-xs tracking-widest text-white font-mono mb-1.5 sm:mb-2">
          <span className="flex items-center gap-1 sm:gap-1.5 font-bold text-white">
            <span className="w-1.5 h-1.5 bg-[#eb0029] rounded-full animate-pulse flex-shrink-0" />
            {project.category}
          </span>
          <span className="text-white/90 font-bold">{project.year}</span>
        </div>

        {/* Title (Bigger Text - Reduced on mobile) */}
        <div className="flex justify-between items-end gap-2">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-mono font-bold tracking-tight text-[#eb0029] group-hover:text-red-400 transition-colors duration-400">
            {project.title}
          </h3>
          
          <button
            onClick={handleArrowClick}
            className="arrow-nav-btn w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-black/80 border border-[#eb0029]/40 flex items-center justify-center text-[#eb0029] hover:bg-[#eb0029] hover:text-white hover:border-[#eb0029] hover:shadow-[0_0_15px_rgba(235,0,41,0.6)] transition-all duration-400 flex-shrink-0"
          >
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 hover:rotate-45 transition-transform duration-400" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
