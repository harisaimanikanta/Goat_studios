import { useEffect, useState } from "react";
import "./Loader.css";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2400; // 2.4 seconds loading feel

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const currentProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(currentProgress);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        setIsDone(true);
        setTimeout(() => {
          onComplete();
        }, 1200); // Wait for the clip/sliding animation to finish
      }
    };

    requestAnimationFrame(step);
  }, [onComplete]);

  return (
    <div className={`loader-container ${isDone ? "pointer-events-none" : ""}`}>
      <div className="loader-background" />
      <div className={`loader-split ${isDone ? "loaded" : ""}`} />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full w-full">
        {/* Top bar */}
        <div className="flex justify-between items-center text-xs tracking-widest text-zinc-500 font-mono">
          <div>GOAT STUDIOS &copy; 2026</div>
          <div className="text-violet-500 font-medium">EST. 2018</div>
        </div>

        {/* Center monumental logo statement */}
        <div className="my-auto self-center text-center">
          <h1 className="text-4xl md:text-7xl font-sans font-medium tracking-tighter text-zinc-100 flex flex-col gap-2">
            <span>WELCOME TO </span>
            <span className="text-zinc-600">GOAT STUDIOS</span>
          </h1>
          <p className="mt-4 text-xs tracking-[0.4em] text-zinc-500 font-mono">
            ESTABLISHING DIGITAL FUTURES
          </p>
        </div>

        {/* Bottom bar with progress meter */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <div className="text-xs text-zinc-500 max-w-xs font-mono tracking-wider leading-relaxed hidden md:block">
              INITIALIZING ENGINE &bull; BUFFERING TEXTURES &bull; LOADING SYNTHESIZERS
            </div>
            <div className="text-[5rem] md:text-[9rem] font-sans font-medium leading-none tracking-tighter text-violet-500 flex items-start select-none">
              <span>{progress.toString().padStart(3, "0")}</span>
              <span className="text-lg md:text-2xl mt-4 ml-1 text-zinc-500">%</span>
            </div>
          </div>

          <div className="relative w-full h-[1px] bg-zinc-900 overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-violet-500 to-blue-500 transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
