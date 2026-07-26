import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SECTIONS, BRAND_INFO } from "../../utils/constants";
import { motion, AnimatePresence } from "motion/react";
import MagneticButton from "../Button/MagneticButton";
import GoatLogo from "../GoatLogo";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import "./Navbar.css";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(isHomePage ? "hero" : "");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Monitor scroll for navbar glass styling and active section highlights
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (!isHomePage) {
        setActiveSection("");
        return;
      }

      // Check if scrolled near bottom of page -> set active to contact
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 120) {
        setActiveSection("contact");
        return;
      }

      // Calculate section top offsets for active section highlight
      const scrollPosition = window.scrollY + 220;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const id = SECTIONS[i].id;
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (!isHomePage) {
      navigate("/");
      setTimeout(() => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    } else {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <>
      <header className={`navbar-header flex items-center justify-between ${scrolled ? "scrolled" : ""}`}>
        {/* Brand Logo with Both Studios Prominently Highlighted */}
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, "hero")}
          className="flex items-center gap-3.5 group text-white transition-all duration-300"
        >
          {/* Cyberpunk Neon Goat Studio Logo Mark */}
          <div className="relative w-10 h-10 rounded-xl bg-black/90 border border-cyan-400/50 flex items-center justify-center transition-all duration-300 group-hover:border-yellow-500 group-hover:shadow-[0_0_20px_rgba(255,230,0,0.5)] shadow-[0_0_15px_rgba(0,240,255,0.3)] overflow-hidden p-1.5">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-yellow-500/10 pointer-events-none" />
            <GoatLogo className="w-full h-full transform group-hover:scale-110 transition-transform duration-300 relative z-10" />
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-mono font-black tracking-tighter text-base sm:text-lg uppercase text-white group-hover:text-cyan-300 transition-colors">
                {BRAND_INFO.name}
              </span>
            </div>
            
            {/* Global Reach Sub-tag */}
            <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-zinc-400">
              <span className="text-cyan-400 font-semibold">GLOBAL REACH</span>
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => scrollToSection(e, id)}
              className={`nav-link ${activeSection === id ? "active" : ""}`}
            >
              {label}
              <span className="nav-link-dot" />
            </a>
          ))}
        </nav>

        {/* Floating glass Call-To-Action & Theme Toggle (Desktop & Tablet) */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`px-3.5 py-2 rounded-full border flex items-center gap-2 text-xs font-mono font-bold tracking-wider transition-all duration-300 cursor-pointer ${
              theme === "dark"
                ? "bg-red-950/40 border-red-500/50 text-red-400 hover:bg-red-600 hover:text-white hover:border-red-500 shadow-[0_0_15px_rgba(235,0,40,0.3)]"
                : "bg-red-600 border-red-700 text-white hover:bg-black hover:border-black shadow-[0_2px_15px_rgba(235,0,40,0.4)]"
            }`}
            title={theme === "dark" ? "Switch to OnePlus Red Light Theme" : "Switch to Cyber Dark Theme"}
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-extrabold tracking-wider">LIGHT MODE</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" />
                <span className="text-[10px] uppercase font-extrabold tracking-wider">DARK MODE</span>
              </>
            )}
          </button>

          <MagneticButton
            onClick={(e: React.MouseEvent) => scrollToSection(e, "contact")}
            className="text-xs py-2 px-4 lg:py-2.5 lg:px-6"
          >
            INITIATE
          </MagneticButton>
        </div>

        {/* Mobile Hamburger Controls & Theme Toggle */}
        <div className="md:hidden flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggleTheme}
            className={`px-3 py-2 rounded-xl border font-mono text-[10px] font-bold flex items-center gap-1.5 transition-all shadow-md ${
              theme === "dark"
                ? "bg-red-950/60 border-red-500/60 text-red-400 hover:bg-red-600 hover:text-white"
                : "bg-red-600 border-red-700 text-white hover:bg-black"
            }`}
            aria-label="Toggle theme"
            title={theme === "dark" ? "Light Theme" : "Dark Theme"}
          >
            {theme === "dark" ? (
              <>
                <Sun className="w-3.5 h-3.5" />
                <span>LIGHT</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5" />
                <span>DARK</span>
              </>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`hamburger-button ${mobileMenuOpen ? "open" : ""}`}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line hamburger-line-1" />
            <span className="hamburger-line hamburger-line-2" />
            <span className="hamburger-line hamburger-line-3" />
          </button>
        </div>
      </header>

      {/* Mobile Modal Drawer with stagger list animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mobile-nav-overlay"
          >
            <div className="mobile-nav-container">
              {/* HUD Corner Accents */}
              <div className="cyber-corner-tl opacity-60" />
              <div className="cyber-corner-tr opacity-60" />
              <div className="cyber-corner-bl opacity-60" />
              <div className="cyber-corner-br opacity-60" />

              <nav className="flex flex-col gap-2.5 w-full max-w-xs sm:max-w-sm py-4">
                <div className="text-[10px] font-mono tracking-[0.3em] text-cyan-400 uppercase font-bold mb-3 flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>[NAVIGATION_MATRIX]</span>
                </div>

                {SECTIONS.map(({ id, label }, index) => {
                  const isActive = activeSection === id;
                  return (
                    <motion.div
                      key={id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.03, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <a
                        href={`#${id}`}
                        onClick={(e) => scrollToSection(e, id)}
                        className={`group relative flex items-center justify-between px-5 py-2.5 rounded-xl border transition-all duration-300 ${
                          isActive
                            ? "bg-cyan-500/15 border-cyan-400/80 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] font-bold"
                            : "bg-black/50 border-white/10 text-zinc-300 hover:text-white hover:border-cyan-400/50 hover:bg-white/5"
                        }`}
                      >
                        <span className="text-[10px] font-mono text-cyan-400/70 group-hover:text-cyan-400 font-semibold">
                          0{index + 1}
                        </span>
                        <span className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-semibold">
                          {label}
                        </span>
                        <span
                          className={`w-2 h-2 rounded-full transition-colors ${
                            isActive
                              ? "bg-cyan-400 shadow-[0_0_8px_#00f0ff]"
                              : "bg-zinc-700 group-hover:bg-cyan-400/50"
                          }`}
                        />
                      </a>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: SECTIONS.length * 0.03 + 0.1, duration: 0.3 }}
                  className="mt-3"
                >
                  <MagneticButton
                    onClick={(e: React.MouseEvent) => scrollToSection(e, "contact")}
                    className="w-full py-3 text-xs tracking-[0.2em] font-mono font-bold bg-gradient-to-r from-cyan-400 to-yellow-500 text-black border-0 shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                  >
                    INITIATE DIRECTIVE
                  </MagneticButton>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
