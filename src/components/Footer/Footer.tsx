import React from "react";
import { SECTIONS, SOCIAL_LINKS, BRAND_INFO } from "../../utils/constants";
import { Instagram, Twitter, Youtube } from "lucide-react";
import GoatLogo from "../GoatLogo";
import CinematicLogoReveal from "./CinematicLogoReveal";
import "./Footer.css";

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="footer-section border-t border-cyan-500/20">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-6 md:mb-12">
          {/* Brand info column */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black border border-cyan-400/50 flex items-center justify-center p-1 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                <GoatLogo className="w-full h-full" />
              </div>
              <span className="text-2xl font-black font-mono tracking-tighter text-white">
                GOAT<span className="text-cyan-400">.</span>STUDIOS
              </span>
            </div>

            <p className="text-xs font-sans text-zinc-300 max-w-sm leading-relaxed tracking-wide font-light mt-2">
              Creative architecture pioneering hyper-real 3D CGI, procedural monoliths, and bespoke sound design for visionary world brands.
            </p>

            {/* Social Row */}
            <div className="flex gap-4 mt-2">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-black/80 border border-cyan-400/40 hover:border-yellow-500 text-cyan-400 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(255,230,0,0.4)] flex items-center justify-center transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-black/80 border border-cyan-400/40 hover:border-yellow-500 text-cyan-400 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(255,230,0,0.4)] flex items-center justify-center transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-black/80 border border-cyan-400/40 hover:border-yellow-500 text-cyan-400 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(255,230,0,0.4)] flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Nav links column (SITEMAP ARCHITECTURE) */}
          <div className="md:col-span-7">
            <h4 className="text-xs font-mono text-cyan-400 font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              SITEMAP ARCHITECTURE
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => handleNavClick(e, id)}
                  className="footer-nav-link text-xs block py-1"
                >
                  // {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Cinematic Energy Awakening Logo Statement */}
        <CinematicLogoReveal />

        {/* Lower terms */}
        <div className="pt-8 border-t border-cyan-500/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] font-mono text-cyan-400 font-bold tracking-wider uppercase">
          <div>&copy; 2026 {BRAND_INFO.name}. ALL RIGHTS SECURED.</div>
          <div className="flex gap-6">
            <a href="#hero" className="hover:text-yellow-400 transition-colors">
              PRIVACY POLICIES
            </a>
            <a href="#hero" className="hover:text-yellow-400 transition-colors">
              SYSTEM TERMS
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
