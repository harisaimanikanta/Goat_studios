import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData } from "../data/portfolioData";
import { ArrowLeft, ArrowRight, Home, Play } from "lucide-react";
import VideoEmbed from "../components/VideoEmbed/VideoEmbed";
import MagneticButton from "../components/Button/MagneticButton";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const currentIndex = portfolioData.findIndex((p) => p.id === id);
  const project = portfolioData[currentIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setIsVideoPlaying(false);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030308] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-mono font-bold text-cyan-400 mb-4">404 - PROJECT NOT FOUND</h1>
          <MagneticButton onClick={() => navigate("/")} className="px-8 py-3">
            RETURN TO ARCHIVES
          </MagneticButton>
        </div>
      </div>
    );
  }

  const prevProject = currentIndex > 0 ? portfolioData[currentIndex - 1] : portfolioData[portfolioData.length - 1];
  const nextProject = currentIndex < portfolioData.length - 1 ? portfolioData[currentIndex + 1] : portfolioData[0];

  return (
    <div className="project-details-page min-h-screen bg-[#030308]">
      {/* Background Decorators */}
      <div className="dot-grid-overlay" />
      <div className="bg-orb-purple pointer-events-none" />
      
      {/* Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 p-6 z-50 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-black/60 border border-cyan-500/30 text-white hover:text-cyan-400 hover:border-cyan-400 backdrop-blur-md transition-all duration-300 group shadow-[0_0_15px_rgba(0,240,255,0.1)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            <Home className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase">Home</span>
          </button>
        </div>
      </div>

      <AnimatePresence 
        mode="wait"
        onExitComplete={() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' })}
      >
        <motion.main 
          key={id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 pt-24 pb-20 px-6 max-w-7xl mx-auto"
        >
          {/* Header / Hero */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-[0.4em] text-cyan-400 uppercase font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{project.category} // {project.year}</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-white mb-8 drop-shadow-[0_0_25px_rgba(0,240,255,0.2)]">
              {project.title}
            </h1>
          </motion.div>

          {/* Main Image / Video Player */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-video rounded-2xl overflow-hidden border border-cyan-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] mb-16 group"
          >
            <div className="cyber-corner-tl opacity-80" />
            <div className="cyber-corner-tr opacity-80" />
            <div className="cyber-corner-bl opacity-80" />
            <div className="cyber-corner-br opacity-80" />

            {/* YouTube Video Embed with loading animation */}
            {isVideoPlaying && (
              <VideoEmbed
                videoUrl={project.videoUrl}
                title={`${project.title} Video`}
                onClose={() => setIsVideoPlaying(false)}
                closeButtonClass="close-video-btn absolute top-4 right-4 z-40 w-11 h-11 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white hover:bg-red-600 hover:border-red-500 backdrop-blur-md transition-all duration-300 shadow-lg"
              />
            )}
            
            {/* Project Image */}
            <img 
              src={project.image} 
              alt={project.title}
              className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`}
              referrerPolicy="no-referrer"
            />
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none transition-opacity duration-500 ${isVideoPlaying ? 'opacity-0' : 'opacity-100'}`} />

            {/* Play Button Overlay (visible when not playing) */}
            {!isVideoPlaying && (
              <div 
                className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer"
                onClick={() => setIsVideoPlaying(true)}
              >
                <div className="play-btn-details flex flex-col items-center gap-4 opacity-80 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black/60 backdrop-blur-md border-2 border-cyan-500/50 flex items-center justify-center text-cyan-400 group-hover:border-yellow-400 group-hover:text-yellow-400 transition-all duration-500 shadow-[0_0_30px_rgba(0,240,255,0.3)] group-hover:shadow-[0_0_45px_rgba(255,230,0,0.5)] group-hover:scale-110">
                    <Play className="w-9 h-9 md:w-10 md:h-10 fill-current ml-1" />
                  </div>
                  <span className="text-xs font-mono tracking-[0.3em] text-cyan-300 group-hover:text-yellow-400 font-bold transition-colors duration-400 drop-shadow-md uppercase">
                    Play Project Video
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Details Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12"
          >
            <div className="md:col-span-8">
              <h3 className="text-xl font-mono text-cyan-400 font-bold mb-4 tracking-widest uppercase">Project Overview</h3>
              <p className="text-lg md:text-xl text-zinc-300 font-sans font-light leading-relaxed">
                {project.description}
              </p>
            </div>
            
            <div className="md:col-span-4 flex flex-col gap-8">
              <div className="cyber-card p-6">
                <h4 className="text-xs font-mono text-yellow-400 font-bold tracking-widest mb-2 uppercase">Client</h4>
                <p className="text-lg text-white font-medium">{project.client}</p>
              </div>
              <div className="cyber-card p-6">
                <h4 className="text-xs font-mono text-cyan-400 font-bold tracking-widest mb-2 uppercase">Role</h4>
                <p className="text-lg text-white font-medium">{project.role}</p>
              </div>
            </div>
          </motion.div>

          {/* Minimalist Footer Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-32 pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8"
          >
            <button 
              onClick={() => navigate(`/project/${prevProject.id}`)}
              className="group flex items-center gap-6 w-full sm:w-auto text-left"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-500/10 transition-all duration-500">
                <ArrowLeft className="w-5 h-5 text-white group-hover:text-cyan-400 transition-colors" />
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase mb-1">Previous</div>
                <div className="text-xl md:text-2xl font-light text-white group-hover:text-cyan-300 transition-colors">{prevProject.title}</div>
              </div>
            </button>

            <button 
              onClick={() => navigate(`/project/${nextProject.id}`)}
              className="group flex items-center gap-6 w-full sm:w-auto text-right flex-row-reverse"
            >
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-yellow-400 group-hover:bg-yellow-500/10 transition-all duration-500">
                <ArrowRight className="w-5 h-5 text-white group-hover:text-yellow-400 transition-colors" />
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase mb-1">Next</div>
                <div className="text-xl md:text-2xl font-light text-white group-hover:text-yellow-300 transition-colors">{nextProject.title}</div>
              </div>
            </button>
          </motion.div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
