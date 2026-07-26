import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { teamData } from "../data/teamData";
import { ArrowLeft, ArrowRight, Home, Instagram, Twitter, Linkedin, MessageSquare, Coffee } from "lucide-react";
import MagneticButton from "../components/Button/MagneticButton";

export default function TeamDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentIndex = teamData.findIndex((p) => p.id === id);
  const member = teamData[currentIndex];

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [id]);

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030308] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-mono font-bold text-cyan-400 mb-4">404 - MEMBER NOT FOUND</h1>
          <MagneticButton onClick={() => navigate("/")} className="px-8 py-3">
            RETURN TO BASE
          </MagneticButton>
        </div>
      </div>
    );
  }

  const prevMember = currentIndex > 0 ? teamData[currentIndex - 1] : teamData[teamData.length - 1];
  const nextMember = currentIndex < teamData.length - 1 ? teamData[currentIndex + 1] : teamData[0];

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
            className="mb-12 text-left"
          >
            <div className="flex items-center gap-2 text-xs font-mono tracking-[0.4em] text-cyan-400 uppercase font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>{member.studioLocation} // {member.role}</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase text-white mb-8 drop-shadow-[0_0_25px_rgba(0,240,255,0.2)]">
              {member.name}
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Main Image (Vertical format, left side) */}
            <div className="md:col-span-5">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-cyan-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group"
              >
                <div className="cyber-corner-tl opacity-80" />
                <div className="cyber-corner-tr opacity-80" />
                <div className="cyber-corner-bl opacity-80" />
                <div className="cyber-corner-br opacity-80" />
                
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Image Navigation Overlays */}
                <button 
                  onClick={() => navigate(`/team/${prevMember.id}`)}
                  className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300 z-20 hover:scale-110 cursor-pointer shadow-lg"
                >
                  <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button 
                  onClick={() => navigate(`/team/${nextMember.id}`)}
                  className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 hover:bg-black/80 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 z-20 hover:scale-110 cursor-pointer shadow-lg"
                >
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </motion.div>
            </div>

            {/* Details Grid (Right side) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-7 flex flex-col gap-10"
            >
              <div>
                <h3 className="text-xl font-mono text-cyan-400 font-bold mb-4 tracking-widest uppercase">Biography</h3>
                <p className="text-lg md:text-xl text-zinc-300 font-sans font-light leading-relaxed">
                  {member.bio}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="cyber-card p-6">
                  <h4 className="text-xs font-mono text-yellow-400 font-bold tracking-widest mb-4 uppercase">Social Links</h4>
                  <div className="flex flex-col gap-4">
                    {member.socials.instagram && (
                      <a href={member.socials.instagram} className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors group">
                        <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-mono text-sm tracking-wide">Instagram</span>
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a href={member.socials.twitter} className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors group">
                        <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-mono text-sm tracking-wide">Twitter</span>
                      </a>
                    )}
                    {member.socials.linkedin && (
                      <a href={member.socials.linkedin} className="flex items-center gap-3 text-white hover:text-cyan-400 transition-colors group">
                        <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-mono text-sm tracking-wide">LinkedIn</span>
                      </a>
                    )}
                    {member.socials.whatsapp && (
                      <a href={member.socials.whatsapp} className="flex items-center gap-3 text-white hover:text-green-400 transition-colors group">
                        <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="font-mono text-sm tracking-wide">WhatsApp</span>
                      </a>
                    )}
                    {Object.keys(member.socials).length === 0 && (
                      <span className="text-zinc-500 font-mono text-sm">NO PUBLIC LINKS</span>
                    )}
                  </div>
                </div>

                {/* Support / UPI Payment Card */}
                <div className="cyber-card p-6 flex flex-col justify-center items-center text-center gap-4">
                  {member.qrCode ? (
                    <>
                      <h4 className="text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase">Support / Direct UPI</h4>
                      <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl border border-yellow-500/50 shadow-[0_0_30px_rgba(250,204,21,0.3)] flex items-center justify-center overflow-hidden bg-black/40 p-1">
                        <img 
                          src={member.qrCode} 
                          alt="PhonePe QR Code" 
                          className="w-full h-full object-contain mix-blend-screen hover:scale-105 transition-transform duration-300" 
                        />
                      </div>
                      {member.upiId && (
                        <div className="flex flex-col items-center gap-1.5 mt-1 w-full">
                          <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">UPI ID</span>
                          <a
                            href={`upi://pay?pa=${member.upiId}&pn=${encodeURIComponent(member.name)}&cu=INR`}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-500/20 to-cyan-500/20 border border-yellow-400/60 text-yellow-300 font-mono text-xs font-bold hover:bg-yellow-400 hover:text-black transition-all shadow-[0_0_15px_rgba(250,204,21,0.2)] tracking-wider"
                          >
                            {member.upiId}
                          </a>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div>
                        <h4 className="text-xs font-mono text-cyan-400 font-bold tracking-widest mb-2 uppercase">Support Creativity</h4>
                        <p className="text-sm text-zinc-400 font-sans">Fuel my next big project by buying me a coffee.</p>
                      </div>
                      <a 
                        href="https://buymeacoffee.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-center gap-3 px-6 py-3 w-full rounded bg-zinc-900 border border-yellow-500/30 text-white hover:text-yellow-400 hover:border-yellow-400 transition-all duration-300 group shadow-[0_0_15px_rgba(250,204,21,0.1)] hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                      >
                        <Coffee className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-mono font-bold tracking-widest uppercase">Support Me</span>
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
