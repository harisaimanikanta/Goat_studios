import { useState, useEffect, useRef } from "react";
import { 
  Music as MusicIcon, 
  Disc, 
  Lock, 
  Radio, 
  Hammer, 
  AlertTriangle 
} from "lucide-react";
import { musicData, Track } from "../../data/musicData";
import "./Music.css";

export default function Music() {
  const [selectedTrack, setSelectedTrack] = useState<Track>(musicData[0]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const visualizerAnimationFrameRef = useRef<number | null>(null);

  // Standby Visualizer animation with Red Neon Signal
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const drawVisualizer = () => {
      time += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Draw subtle synth wave signal in standby mode (Red)
      ctx.beginPath();
      ctx.moveTo(0, centerY);

      for (let i = 0; i < width; i++) {
        const x = i;
        const wave1 = Math.sin((i * 0.03) + time) * 12;
        const wave2 = Math.sin((i * 0.015) - time * 0.8) * 8;
        const noise = (Math.random() - 0.5) * 2;
        const taper = Math.sin((i / width) * Math.PI);
        
        const y = centerY + (wave1 + wave2 + noise) * taper;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "#eb0029"; // Vibrant Red glowing studio standby line
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Mirror reflection below
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      for (let i = 0; i < width; i++) {
        const x = i;
        const wave1 = Math.sin((i * 0.03) + time) * 12;
        const wave2 = Math.sin((i * 0.015) - time * 0.8) * 8;
        const taper = Math.sin((i / width) * Math.PI);
        const y = centerY - (wave1 + wave2) * taper * 0.4;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = "rgba(235, 0, 41, 0.25)";
      ctx.lineWidth = 1;
      ctx.stroke();

      visualizerAnimationFrameRef.current = requestAnimationFrame(drawVisualizer);
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 90;
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
  }, []);

  return (
    <section id="music" className="music-section border-t border-red-500/20">
      <div className="music-bg-glow" />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-mono tracking-[0.4em] text-red-400 uppercase font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                [AUDIO_SYNTHESIZER_LAB]
              </span>
              <span className="px-3 py-1 bg-red-500/15 border border-red-500/40 text-red-400 text-[10px] font-mono font-bold tracking-widest rounded-full uppercase flex items-center gap-1.5 shadow-[0_0_12px_rgba(235,0,41,0.25)]">
                <Hammer className="w-3 h-3 text-red-400" />
                STILL IN PRODUCTION
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase">
              MUSIC & <span className="stroke-text-cyber text-red-500">SOUND DECK</span>
            </h2>
          </div>
          <p className="text-sm text-zinc-300 max-w-sm font-sans tracking-wide leading-relaxed font-light">
            Original ambient soundtracks, sonic scoring, and spatial audio compositions being engineered for GOAT Studios environments.
          </p>
        </div>

        {/* Main Production Dashboard Container */}
        <div className="music-glass-panel grid grid-cols-1 lg:grid-cols-12 relative border border-red-500/30">
          {/* Cyber HUD Corner Decorators */}
          <div className="cyber-corner-tl opacity-70" />
          <div className="cyber-corner-tr opacity-70" />
          <div className="cyber-corner-bl opacity-70" />
          <div className="cyber-corner-br opacity-70" />

          {/* Top Red Banner Notice inside Glass Panel */}
          <div className="lg:col-span-12 bg-red-950/40 border-b border-red-500/30 p-4 md:px-8 md:py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0 shadow-[0_0_15px_rgba(235,0,41,0.3)]">
                <AlertTriangle className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest block">
                  SYSTEM STATUS // AUDIO LINKS DISABLED
                </span>
                <p className="text-xs text-zinc-300 font-mono mt-0.5">
                  Audio links are currently disabled as tracks are still under production in the sound studio.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-red-400/90 bg-black/50 px-4 py-2 rounded-lg border border-red-500/20 shrink-0 uppercase font-bold">
              <Hammer className="w-4 h-4 text-red-400" />
              <span>STILL IN PRODUCTION</span>
            </div>
          </div>

          {/* Left Column: Scheduled Synth Decks (Disabled Links View) */}
          <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-red-500/20 p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-mono text-red-400 tracking-widest uppercase flex items-center gap-2 font-bold">
                <MusicIcon className="w-4 h-4 text-red-400" /> PRODUCED SOUNDTRACKS
              </h3>
              <span className="text-[10px] font-mono text-zinc-400 font-bold">
                [3 TRACKS]
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {musicData.map((track) => {
                const isSelected = selectedTrack.id === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => setSelectedTrack(track)}
                    className={`music-track-item flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-red-500/10 border-red-500/60 text-white shadow-[0_0_15px_rgba(235,0,41,0.15)]"
                        : "bg-black/40 border-red-500/10 text-zinc-400 hover:border-red-500/30 hover:bg-black/60"
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-black/80 border border-red-500/30 flex items-center justify-center text-red-400 font-mono text-xs font-bold">
                        /{track.id}
                      </div>
                      <div>
                        <h4 className="text-sm font-mono font-bold tracking-tight text-white flex items-center gap-2">
                          {track.title}
                        </h4>
                        <p className="text-[11px] font-mono text-zinc-400 uppercase mt-0.5">
                          {track.album}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-zinc-500">{track.duration}</span>
                      <div 
                        className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400/70 flex items-center justify-center cursor-not-allowed"
                        title="Audio links disabled - track under production"
                      >
                        <Lock className="w-3.5 h-3.5 text-red-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clean Notice Card */}
            <div className="mt-6 p-4 rounded-xl bg-black/60 border border-red-500/20 flex items-center gap-3">
              <Hammer className="w-4 h-4 text-red-400 animate-pulse shrink-0" />
              <span className="text-xs font-mono text-zinc-300">
                Music & Sound Deck: <strong className="text-red-400 font-bold uppercase">STILL IN PRODUCTION</strong>
              </span>
            </div>
          </div>

          {/* Right Column: Active Track Telemetry Dashboard */}
          <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between">
            <div>
              {/* Selected Track Metadata HUD */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono text-red-400 tracking-[0.3em] uppercase font-bold">
                      [TRACK_METADATA_PREVIEW]
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-mono font-bold tracking-tight text-white mt-1">
                    {selectedTrack.title}
                  </h3>
                  <p className="text-xs text-zinc-300 font-sans tracking-wide leading-relaxed font-light mt-2 max-w-lg">
                    {selectedTrack.description}
                  </p>
                </div>
                
                {/* Vinyl Record Icon with Lock overlay */}
                <div className="relative p-3.5 bg-black/90 border border-red-500/40 rounded-full shadow-[0_0_20px_rgba(235,0,41,0.25)] shrink-0">
                  <Disc className="w-7 h-7 text-red-400/80" />
                  <div className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center">
                    <Lock className="w-4 h-4 text-red-400" />
                  </div>
                </div>
              </div>

              {/* Real-time Red Studio Standby Visualizer */}
              <div className="my-6">
                <div className="flex justify-between items-center text-xs font-mono text-red-400 mb-2 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5" /> STUDIO FREQUENCY MONITOR // STANDBY
                  </span>
                  <span className="text-red-400 animate-pulse flex items-center gap-1 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    STANDBY PREVIEW
                  </span>
                </div>
                <canvas ref={canvasRef} className="player-visualizer-canvas border border-red-500/30" />
              </div>

              {/* Studio Telemetry Grid Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
                <div className="p-3 rounded-lg bg-black/50 border border-red-500/20">
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase">SAMPLE RATE</span>
                  <span className="text-xs font-mono text-white font-bold">96 kHz / 24-Bit</span>
                </div>
                <div className="p-3 rounded-lg bg-black/50 border border-red-500/20">
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase">AUDIO FORMAT</span>
                  <span className="text-xs font-mono text-red-400 font-bold">FLAC & Spatial 3D</span>
                </div>
                <div className="p-3 rounded-lg bg-black/50 border border-red-500/20 col-span-2 sm:col-span-1">
                  <span className="text-[9px] font-mono text-zinc-500 block uppercase">TRACK LINK STATUS</span>
                  <span className="text-xs font-mono text-red-400 font-bold">STILL IN PRODUCTION</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
