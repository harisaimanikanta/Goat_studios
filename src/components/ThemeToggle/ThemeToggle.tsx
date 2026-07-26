import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full font-mono text-xs font-bold tracking-wider backdrop-blur-md transition-all duration-300 border hover:scale-105 active:scale-95 cursor-pointer ${
        theme === "dark"
          ? "bg-black/80 text-white border-red-500/50 hover:border-red-500 shadow-[0_0_20px_rgba(235,0,40,0.3)] hover:shadow-[0_0_25px_rgba(235,0,40,0.6)]"
          : "bg-white text-black border-zinc-300 hover:border-red-600 shadow-xl hover:shadow-2xl"
      }`}
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to OnePlus Red Light Theme" : "Switch to Cyber Dark Theme"}
    >
      <div className="relative flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white">
        {theme === "dark" ? (
          <Sun className="w-3.5 h-3.5 animate-spin-slow" />
        ) : (
          <Moon className="w-3.5 h-3.5" />
        )}
      </div>
      <span className="uppercase text-[11px] font-extrabold tracking-widest">
        {theme === "dark" ? "LIGHT THEME" : "DARK THEME"}
      </span>
    </button>
  );
}
