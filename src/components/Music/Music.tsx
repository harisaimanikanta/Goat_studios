import { useState, useEffect, useRef } from "react";
import { Music as MusicIcon, Play, Pause, SkipBack, SkipForward, Volume2, Disc } from "lucide-react";
import { musicData, Track } from "../../data/musicData";
import "./Music.css";

export default function Music() {
  const [currentTrack, setCurrentTrack] = useState<Track>(musicData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const visualizerAnimationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.error("Audio play failed:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrack]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const selectTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePrevTrack = () => {
    const currentIndex = musicData.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + musicData.length) % musicData.length;
    selectTrack(musicData[prevIndex]);
  };

  const handleNextTrack = () => {
    const currentIndex = musicData.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % musicData.length;
    selectTrack(musicData[nextIndex]);
  };

  // Fake visualizer since we can't reliably use Web Audio API Analyzer with external cross-origin media
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const drawVisualizer = () => {
      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.beginPath();
      ctx.moveTo(0, centerY);
      
      for (let i = 0; i < width; i++) {
        const x = i;
        let y = centerY;
        
        if (isPlaying) {
          // Complex pseudo-random wave
          const wave1 = Math.sin((i * 0.05) + time) * 20;
          const wave2 = Math.sin((i * 0.02) - time * 1.5) * 15;
          const noise = (Math.random() - 0.5) * 5;
          
          // Modulate amplitude based on x position (taper edges)
          const taper = Math.sin((i / width) * Math.PI);
          
          y = centerY + (wave1 + wave2 + noise) * taper;
        } else {
          y = centerY + Math.sin(i * 0.02) * 2;
        }

        ctx.lineTo(x, y);
      }
      
      ctx.strokeStyle = isPlaying ? "#00f0ff" : "#3f3f46";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Mirror reflection below
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      for (let i = 0; i < width; i++) {
        const x = i;
        let y = centerY;
        if (isPlaying) {
          const wave1 = Math.sin((i * 0.05) + time) * 20;
          const wave2 = Math.sin((i * 0.02) - time * 1.5) * 15;
          const noise = (Math.random() - 0.5) * 5;
          const taper = Math.sin((i / width) * Math.PI);
          y = centerY - (wave1 + wave2 + noise) * taper * 0.5;
        } else {
          y = centerY - Math.sin(i * 0.02) * 2;
        }
        ctx.lineTo(x, y);
      }
      
      ctx.strokeStyle = isPlaying ? "rgba(0, 240, 255, 0.2)" : "rgba(63, 63, 70, 0.2)";
      ctx.lineWidth = 2;
      ctx.stroke();

      visualizerAnimationFrameRef.current = requestAnimationFrame(drawVisualizer);
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 100;
      }
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    visualizerAnimationFrameRef.current = requestAnimationFrame(drawVisualizer);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (visualizerAnimationFrameRef.current) {
        cancelAnimationFrame(visualizerAnimationFrameRef.current);
      }
    };
  }, [isPlaying]);

  return (
    <section id="music" className="music-section border-t border-cyan-500/20">
      <div className="music-bg-glow" />
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Hidden Audio Player */}
        <audio 
          ref={audioRef}
          src={currentTrack.audioUrl}
          onEnded={handleNextTrack}
          crossOrigin="anonymous"
        />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-xs font-mono tracking-[0.4em] text-cyan-400 uppercase font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              [CYBER_SYNTH_SYNCHRONIZER]
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mt-4 uppercase">
              AMBIENT <span className="stroke-text-cyber">PLAYER</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-300 max-w-sm font-sans tracking-wide leading-relaxed font-light">
            Real-time audio synth decks scoring the spatial digital environments designed by our team.
          </p>
        </div>

        {/* Player Dual Layout Panel */}
        <div className="music-glass-panel grid grid-cols-1 lg:grid-cols-12 relative">
          {/* Cyber HUD Corner Decorators */}
          <div className="cyber-corner-tl opacity-70" />
          <div className="cyber-corner-tr opacity-70" />
          <div className="cyber-corner-bl opacity-70" />
          <div className="cyber-corner-br opacity-70" />

          {/* Left panel: Custom tracklists */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-cyan-500/20 p-6 md:p-8">
            <h3 className="text-xs font-mono text-cyan-400 tracking-widest mb-6 uppercase flex items-center gap-2 font-bold">
              <MusicIcon className="w-4 h-4 text-yellow-400" /> AVAILABLE SYNTH DECKS
            </h3>
            <div className="flex flex-col">
              {musicData.map((track) => (
                <button
                  key={track.id}
                  onClick={() => selectTrack(track)}
                  className={`music-track-item flex items-center justify-between p-4 text-left rounded-lg transition-all ${
                    currentTrack.id === track.id ? "active text-white" : "text-zinc-400"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-cyan-400 font-bold">/{track.id}</span>
                    <div>
                      <h4 className="text-sm font-mono font-bold tracking-tight text-white">
                        {track.title}
                      </h4>
                      <p className="text-xs font-mono text-zinc-400 uppercase mt-0.5">
                        {track.album}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-cyan-400">{track.duration}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel: Active YouTube Video Player & Interactive controls */}
          <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between min-h-[420px]">
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono text-yellow-400 tracking-[0.3em] uppercase block font-bold">
                  [GOAT_STUDIOS_OFFICIAL_TRACK]
                </span>
                <h3 className="text-2xl font-mono font-bold tracking-tight text-white mt-1">
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-zinc-300 font-sans tracking-wide leading-relaxed font-light mt-2 max-w-md">
                  {currentTrack.description}
                </p>
              </div>
              {/* Animated vinyl disk */}
              <div className={`p-3 bg-black/80 border border-cyan-400/50 rounded-full shadow-[0_0_15px_rgba(0,240,255,0.3)] ${isPlaying ? "animate-spin border-yellow-500 shadow-[0_0_20px_rgba(255,230,0,0.5)]" : ""}`} style={{ animationDuration: "12s" }}>
                <Disc className="w-6 h-6 text-cyan-400" />
              </div>
            </div>

            {/* YouTube Video Player in Music Section */}
            <div className="my-6 relative w-full aspect-video rounded-xl overflow-hidden border border-cyan-500/30 shadow-[0_0_30px_rgba(0,240,255,0.2)] bg-black">
              <div className="cyber-corner-tl opacity-70 z-20 pointer-events-none" />
              <div className="cyber-corner-tr opacity-70 z-20 pointer-events-none" />
              <div className="cyber-corner-bl opacity-70 z-20 pointer-events-none" />
              <div className="cyber-corner-br opacity-70 z-20 pointer-events-none" />
              <iframe
                src={`https://www.youtube.com/embed/${currentTrack.youtubeId || "uXE4OrL0uXw"}?autoplay=0&rel=0&modestbranding=1`}
                title={currentTrack.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: 'none' }}
              />
            </div>

            {/* Controls interface */}
            <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6">
              {/* Media buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevTrack}
                  className="w-11 h-11 rounded-xl bg-black border border-cyan-400/50 hover:border-yellow-500 text-cyan-400 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(255,230,0,0.4)] flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Previous Track"
                  title="Previous Track"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="w-14 h-14 rounded-xl bg-gradient-to-r from-cyan-400 to-yellow-500 text-black hover:scale-105 flex items-center justify-center transition-all shadow-[0_0_25px_rgba(0,240,255,0.5)] cursor-pointer"
                  aria-label={isPlaying ? "Pause" : "Play"}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6 fill-current" />
                  ) : (
                    <Play className="w-6 h-6 fill-current ml-1" />
                  )}
                </button>
                <button
                  onClick={handleNextTrack}
                  className="w-11 h-11 rounded-xl bg-black border border-cyan-400/50 hover:border-yellow-500 text-cyan-400 hover:text-yellow-400 hover:shadow-[0_0_15px_rgba(255,230,0,0.4)] flex items-center justify-center transition-all cursor-pointer"
                  aria-label="Next Track"
                  title="Next Track"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-32 h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  aria-label="Volume Slider"
                />
                <span className="text-xs font-mono text-cyan-400 font-bold w-8 text-right">
                  {Math.floor(volume * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
