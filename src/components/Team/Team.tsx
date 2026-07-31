import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { teamData } from "../../data/teamData";
import { staggerContainer } from "../../animations/framerAnimations";
import { Instagram, Twitter, Linkedin } from "lucide-react";
import "./Team.css";

export default function Team() {
  const navigate = useNavigate();

  return (
    <section id="team" className="team-section border-t border-cyan-500/20">
      <div className="team-bg-glow" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
              THE <span className="stroke-text-cyber">TEAM</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-300 max-w-sm font-sans tracking-wide leading-relaxed font-light">
            Our multi-disciplinary team synthesizes high-end architecture and synthetic soundscapes.
          </p>
        </div>

        {/* Team Grid Layout */}
        <motion.div
          variants={staggerContainer(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="team-grid"
        >
          {teamData.map((member) => (
            <motion.div
              key={member.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              className="team-member-card group cursor-pointer" onClick={() => navigate(`/team/${member.id}`)}
            >
              {/* Cyber HUD Corner Decorators */}
              <div className="cyber-corner-tl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="cyber-corner-tr opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="cyber-corner-bl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="cyber-corner-br opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Portrait */}
              <div className="team-portrait-wrap">
                <img
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  className="team-portrait"
                  referrerPolicy="no-referrer"
                />
                <div className="team-portrait-overlay" />

                {/* Floating Social Handles - Reveals on Hover */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 z-20 opacity-0 transform translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400">
                  {member.socials.instagram && (
                    <a
                      href={member.socials.instagram}
                      className="team-social-icon"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      className="team-social-icon"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      className="team-social-icon"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6">
                <span className="text-[10px] font-mono text-yellow-400 font-bold tracking-widest uppercase">
                  {member.role}
                </span>
                <h3 className="text-lg font-mono font-bold text-white tracking-tight mt-1 group-hover:text-cyan-300 transition-colors">
                  {member.name}
                </h3>
                <p className="mt-3 text-xs text-zinc-300 leading-relaxed font-light font-sans">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
