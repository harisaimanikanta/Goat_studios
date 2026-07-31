import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./CinematicLogoReveal.css";

const LOGO_TEXT = "GOAT STUDIOS";

interface TronLightTrail {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  dx: number;
  dy: number;
  speed: number;
  color: string;
  history: { x: number; y: number }[];
  stepTimer: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface AmbientDot {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  twinklePhase: number;
  color: string;
}

export default function CinematicLogoReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const hasTriggered = useRef(false);
  const [isSettled, setIsSettled] = useState(false);
  const [isTwoLine, setIsTwoLine] = useState(false);

  const sparksRef = useRef<Spark[]>([]);
  const ambientRef = useRef<AmbientDot[]>([]);

  // GSAP Driven Animation State Values
  const animState = useRef({
    gridOpacity: 0,
    gridPulse: 0,
    trailIntensity: 0,
    laserScanX: -200,
    laserScanActive: 0,
    shockwaveProgress: 0,
    shockwaveOpacity: 0,
  });

  // Spawns a small, tight burst of glowing sparks at a given canvas-space point.
  // Kept deliberately sparse -- a few sharp sparks read as a clean "snap",
  // a dozen+ soft ones just smear into a blob.
  const spawnSparks = (x: number, y: number, color: string, count = 5) => {
    for (let i = 0; i < count; i++) {
      // Bias toward outward/upward "electric snap" directions rather than a full random ring,
      // which keeps bursts feeling sharp instead of firework-y.
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.4;
      const speed = 1.2 + Math.random() * 2;
      sparksRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1,
        color,
        size: 0.6 + Math.random() * 0.9,
      });
    }
  };

  // Ignites a single character: spawns sparks at its screen position
  const igniteCharSparks = (charEl: HTMLSpanElement, color: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasRect = canvas.getBoundingClientRect();
    const charRect = charEl.getBoundingClientRect();
    const x = charRect.left - canvasRect.left + charRect.width / 2;
    const y = charRect.top - canvasRect.top + charRect.height / 2;
    spawnSparks(x, y, color, 5);
  };

  // Start TRON "Light Grid Awakening" Animation Sequence
  const startTronSequence = () => {
    if (!logoRef.current) return;

    const isMobile = window.innerWidth <= 768;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsSettled(true);
      },
    });

    // Ensure logo starts 100% invisible
    gsap.set(logoRef.current, { opacity: 0, x: 0 });
    charRefs.current.forEach((charEl) => {
      if (charEl) gsap.set(charEl, { opacity: 0 });
    });

    // PHASE 1: TRON Grid Ignition & Light Beams Spawn (0s -> 1.5s)
    tl.to(animState.current, {
      gridOpacity: 0.8,
      trailIntensity: 1,
      duration: 1.5,
      ease: "power2.out",
    });

    // Make Logo Container visible as laser trails hit letters (1.2s)
    tl.to(
      logoRef.current,
      {
        opacity: 1,
        duration: 0.4,
      },
      1.2
    );

    // PHASE 2: Laser Outline Tracing & Letter Ignition (1.2s -> 3.2s)
    const totalChars = charRefs.current.length;
    charRefs.current.forEach((charEl, idx) => {
      if (!charEl) return;
      const charDelay = 1.3 + (idx / totalChars) * 1.8;
      const color = idx % 4 === 1 ? "#ff6600" : "#00f0ff";

      const strokeWidth = isMobile ? "1.5px #ffffff" : "2.5px #ffffff";
      const filterEffect = isMobile
        ? idx % 4 === 1
          ? "drop-shadow(0 0 12px #ff6600)"
          : "drop-shadow(0 0 12px #00f0ff)"
        : idx % 4 === 1
          ? "drop-shadow(0 0 25px #ff6600) drop-shadow(0 0 45px #ff6600)"
          : "drop-shadow(0 0 25px #00f0ff) drop-shadow(0 0 50px #00f0ff)";

      // Laser strikes character -> Ignites with TRON Neon Cyan/Orange Flare + spark burst
      tl.to(
        charEl,
        {
          opacity: 1,
          color,
          webkitTextStroke: strokeWidth,
          filter: filterEffect,
          duration: 0.3,
          ease: "power2.out",
          onStart: () => igniteCharSparks(charEl, color),
        },
        charDelay
      );

      // Settles into sharp TRON outline
      tl.to(
        charEl,
        {
          color: "transparent",
          webkitTextStroke: isMobile ? "1px rgba(0, 240, 255, 0.6)" : "1.5px rgba(0, 240, 255, 0.5)",
          filter: isMobile
            ? "drop-shadow(0 0 8px rgba(0, 240, 255, 0.4))"
            : "drop-shadow(0 0 15px rgba(0, 240, 255, 0.35))",
          duration: 0.5,
          ease: "power2.inOut",
        },
        charDelay + 0.3
      );
    });

    // PHASE 3: Power Surge -- flash, shockwave ring, glitch jitter, and TRON laser scan wave (3.05s -> 4.2s)
    tl.to(
      flashRef.current,
      { opacity: 0.55, duration: 0.06, ease: "power1.in" },
      3.05
    ).to(
      flashRef.current,
      { opacity: 0, duration: 0.5, ease: "power2.out" },
      3.11
    );

    tl.fromTo(
      animState.current,
      { shockwaveProgress: 0, shockwaveOpacity: 0.9 },
      { shockwaveProgress: 1, shockwaveOpacity: 0, duration: 1.1, ease: "power2.out" },
      3.05
    );

    // Quick glitch jitter on the whole wordmark at the moment of climax
    tl.to(logoRef.current, { x: -4, duration: 0.035, ease: "none" }, 3.06)
      .to(logoRef.current, { x: 3, duration: 0.035, ease: "none" }, 3.1)
      .to(logoRef.current, { x: -2, duration: 0.035, ease: "none" }, 3.14)
      .to(logoRef.current, { x: 0, duration: 0.035, ease: "none" }, 3.18);

    tl.to(
      animState.current,
      {
        laserScanActive: 1,
        laserScanX: isMobile ? 600 : 1300,
        duration: 1.2,
        ease: "power2.inOut",
      },
      3.1
    );

    // PHASE 4: Grid Settle into TRON Ambient Mode (4.2s -> 5.0s)
    tl.to(
      animState.current,
      {
        gridOpacity: 0.25,
        trailIntensity: 0.2,
        duration: 0.8,
        ease: "power2.inOut",
      },
      4.2
    );
  };

  // Fit the wordmark to the screen: try it on one line first, and only if it
  // genuinely doesn't fit, wrap it onto two lines ("GOAT" / "STUDIOS") instead
  // of shrinking the text down until it's illegible. Also guards against a
  // container that auto-sizes to its content (which would otherwise always
  // "fit" by definition) by capping against the real viewport width too.
  useEffect(() => {
    const fitLogoToContainer = () => {
      const container = containerRef.current;
      const logo = logoRef.current;
      if (!container || !logo) return;

      const isMobile = window.innerWidth <= 768;
      const horizontalPadding = isMobile ? 20 : 48;
      const viewportWidth = document.documentElement.clientWidth || window.innerWidth;
      const containerWidth = container.clientWidth || viewportWidth;
      const available = Math.min(containerWidth, viewportWidth) - horizontalPadding;

      // Step 1: force single line and measure it at natural size.
      gsap.set(logo, { scale: 1 });
      logo.style.whiteSpace = "nowrap";
      const singleLineWidth = logo.scrollWidth;

      if (singleLineWidth <= available) {
        setIsTwoLine(false);
        gsap.set(logo, { scale: 1, transformOrigin: "50% 50%" });
        return;
      }

      // Step 2: doesn't fit on one line -- wrap between the two words instead
      // of squeezing everything down small.
      setIsTwoLine(true);
      logo.style.whiteSpace = "normal";

      // Let the wrap settle, then measure the widest resulting line as a
      // safety net in case even "STUDIOS" alone can't fit (very old/small phones).
      requestAnimationFrame(() => {
        if (!logoRef.current) return;
        const wrappedWidth = logoRef.current.scrollWidth;
        const scale =
          wrappedWidth > available ? Math.max(available / wrappedWidth, 0.55) : 1;
        gsap.set(logoRef.current, { scale, transformOrigin: "50% 50%" });
      });
    };

    fitLogoToContainer();
    // Re-check shortly after mount too -- web fonts swapping in after first
    // paint can change text width and invalidate the first measurement.
    const fontSettleId = window.setTimeout(fitLogoToContainer, 250);

    window.addEventListener("resize", fitLogoToContainer);
    window.addEventListener("orientationchange", fitLogoToContainer);

    return () => {
      window.clearTimeout(fontSettleId);
      window.removeEventListener("resize", fitLogoToContainer);
      window.removeEventListener("orientationchange", fitLogoToContainer);
    };
  }, []);

  // Mobile-Optimized Viewport Centering Trigger
  useEffect(() => {
    const handleViewportCheck = () => {
      if (hasTriggered.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const containerCenter = rect.top + rect.height / 2;
      const isMobile = window.innerWidth <= 768;

      // Trigger condition: Centered in viewport or mobile 85% visible threshold
      const isCentered = Math.abs(containerCenter - viewportHeight / 2) < (isMobile ? 300 : 220);
      const isMobileVisible = isMobile && rect.top < viewportHeight * 0.85 && rect.bottom > 0;
      const isScrollBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 140;

      if (isCentered || isMobileVisible || isScrollBottom) {
        hasTriggered.current = true;
        startTronSequence();
        window.removeEventListener("scroll", handleViewportCheck);
      }
    };

    window.addEventListener("scroll", handleViewportCheck, { passive: true });
    handleViewportCheck(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleViewportCheck);
    };
  }, []);

  // Randomized idle "flicker" -- occasionally re-pulses a random letter once settled
  useEffect(() => {
    if (!isSettled) return;

    const flickerLoop = () => {
      const chars = charRefs.current.filter(Boolean) as HTMLSpanElement[];
      if (chars.length) {
        const el = chars[Math.floor(Math.random() * chars.length)];
        const isOrange = Math.random() < 0.25;
        gsap.to(el, {
          filter: isOrange
            ? "drop-shadow(0 0 30px #ff6600) drop-shadow(0 0 55px #ff6600)"
            : "drop-shadow(0 0 30px #00f0ff) drop-shadow(0 0 60px #00f0ff)",
          duration: 0.15,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        });

        const canvas = canvasRef.current;
        if (canvas) {
          const canvasRect = canvas.getBoundingClientRect();
          const charRect = el.getBoundingClientRect();
          spawnSparks(
            charRect.left - canvasRect.left + charRect.width / 2,
            charRect.top - canvasRect.top + charRect.height / 2,
            isOrange ? "#ff6600" : "#00f0ff",
            3
          );
        }
      }
      timeoutId = window.setTimeout(flickerLoop, 3000 + Math.random() * 4000);
    };

    let timeoutId = window.setTimeout(flickerLoop, 3000 + Math.random() * 4000);
    return () => window.clearTimeout(timeoutId);
  }, [isSettled]);

  // TRON Canvas 60 FPS Render Engine (Mobile Optimized)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    const activeDprRef = { current: 1 };

    const getCanvasHeight = () => (window.innerWidth <= 768 ? 260 : 520);

    const resizeCanvas = () => {
      const parent = containerRef.current;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const isMobileNow = window.innerWidth <= 768;
      // Capping DPR to 1 on mobile roughly halves (or quarters, on 3x-density
      // phones) the pixels the canvas has to push every frame. At this canvas
      // size the crispness difference is not worth the frame-rate cost.
      const dpr = isMobileNow ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      activeDprRef.current = dpr;
      const canvasH = getCanvasHeight();

      canvas.width = rect.width * dpr;
      canvas.height = canvasH * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${canvasH}px`;
      // Reset the transform before scaling -- ctx.scale() is multiplicative,
      // so without this every resize event (mobile browsers fire these
      // constantly as the address bar shows/hides) compounds on the last one
      // and the whole scene silently zooms in more each time, which both
      // mis-renders everything and tanks frame rate.
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const isMobile = window.innerWidth <= 768;
    const trailCount = isMobile ? 5 : 16;

    // Initialize TRON Light Cycle Beams
    const trails: TronLightTrail[] = Array.from({ length: trailCount }, (_, i) => {
      const isOrange = i % 5 === 0;
      const side = i % 4; // 0: left, 1: right, 2: top, 3: bottom
      let startX = 0;
      let startY = 0;
      const canvasH = getCanvasHeight();

      if (side === 0) {
        startX = -50;
        startY = 40 + Math.random() * (canvasH - 80);
      } else if (side === 1) {
        startX = 800;
        startY = 40 + Math.random() * (canvasH - 80);
      } else if (side === 2) {
        startX = 50 + Math.random() * 700;
        startY = -50;
      } else {
        startX = 50 + Math.random() * 700;
        startY = canvasH + 50;
      }

      return {
        x: startX,
        y: startY,
        targetX: 100 + Math.random() * 600,
        targetY: 80 + Math.random() * 100,
        dx: side === 0 ? 8 : side === 1 ? -8 : 0,
        dy: side === 2 ? 8 : side === 3 ? -8 : 0,
        speed: 6 + Math.random() * 6,
        color: isOrange ? "#ff6600" : "#00f0ff",
        history: [],
        stepTimer: 0,
      };
    });

    // Initialize slow-drifting ambient light motes (constant atmospheric depth layer)
    const ambientCount = isMobile ? 8 : 36;
    const initialWidth = canvas.clientWidth || 800;
    ambientRef.current = Array.from({ length: ambientCount }, () => {
      const canvasH = getCanvasHeight();
      return {
        x: Math.random() * initialWidth,
        y: Math.random() * canvasH,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        size: 0.6 + Math.random() * 1.6,
        baseAlpha: 0.15 + Math.random() * 0.35,
        twinklePhase: Math.random() * Math.PI * 2,
        color: Math.random() < 0.15 ? "#ff6600" : "#00f0ff",
      };
    });

    let tick = 0;

    // Render TRON Frame Loop
    const render = () => {
      tick++;
      const w = canvas.width / activeDprRef.current;
      const h = getCanvasHeight();
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      const {
        gridOpacity,
        trailIntensity,
        laserScanX,
        shockwaveProgress,
        shockwaveOpacity,
      } = animState.current;

      // 0. Ambient drifting light motes (subtle atmospheric depth, always present)
      if (gridOpacity > 0.01 || trailIntensity > 0.01) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ambientRef.current.forEach((dot) => {
          dot.x += dot.vx;
          dot.y += dot.vy;
          dot.twinklePhase += 0.02;

          if (dot.x < -10) dot.x = w + 10;
          if (dot.x > w + 10) dot.x = -10;
          if (dot.y < -10) dot.y = h + 10;
          if (dot.y > h + 10) dot.y = -10;

          const twinkle = 0.6 + Math.sin(dot.twinklePhase) * 0.4;
          ctx.globalAlpha = dot.baseAlpha * twinkle * Math.max(gridOpacity, trailIntensity * 0.6);
          ctx.fillStyle = dot.color;
          // shadowBlur is one of the costliest canvas 2D ops and this runs per-dot,
          // per-frame -- skip it on mobile where dozens of dots would otherwise
          // each trigger a soft-blur pass every tick.
          if (!isMobile) {
            ctx.shadowColor = dot.color;
            ctx.shadowBlur = 6;
          }
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      // 1. Draw TRON Perspective Digital Grid (Bounded to logo section)
      if (gridOpacity > 0.01) {
        ctx.save();
        ctx.globalAlpha = gridOpacity;

        const horizonY = cy + (isMobile ? 42 : 40);

        // Grid Horizon Line
        ctx.beginPath();
        ctx.moveTo(0, horizonY);
        ctx.lineTo(w, horizonY);
        ctx.strokeStyle = "rgba(0, 240, 255, 0.35)";
        ctx.lineWidth = 1.2;
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 8;
        ctx.stroke();

        // Converging Vertical Grid Lines.
        // On narrow phone widths a steep convergence factor sends lines shooting
        // out at extreme angles that visually slice across the wordmark, so mobile
        // gets a much gentler convergence and fewer columns.
        const gridCols = isMobile ? 9 : 24;
        const convergence = isMobile ? 1.15 : 2.5;
        for (let i = 0; i <= gridCols; i++) {
          const xTop = (i / gridCols) * w;
          const xBottom = cx + (xTop - cx) * convergence;

          ctx.beginPath();
          ctx.moveTo(xTop, horizonY);
          ctx.lineTo(xBottom, h);
          ctx.strokeStyle = "rgba(0, 240, 255, 0.1)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Horizontal Grid Lines
        const gridRows = isMobile ? 5 : 8;
        for (let j = 1; j <= gridRows; j++) {
          const rowY = horizonY + Math.pow(j / gridRows, 1.7) * (h - horizonY);
          ctx.beginPath();
          ctx.moveTo(0, rowY);
          ctx.lineTo(w, rowY);
          ctx.strokeStyle = "rgba(0, 240, 255, 0.12)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
      }

      // 2. Draw TRON Light Cycle Laser Trails with Right-Angle Turns
      if (trailIntensity > 0.01) {
        ctx.globalCompositeOperation = "lighter";

        trails.forEach((t) => {
          t.stepTimer++;

          // Move along orthogonal paths (TRON 90-degree turns)
          t.x += t.dx;
          t.y += t.dy;

          // Periodic 90-degree sharp turns
          if (t.stepTimer % 18 === 0 && Math.random() < 0.6) {
            if (t.dx !== 0) {
              t.dy = t.dx * (Math.random() > 0.5 ? 1 : -1);
              t.dx = 0;
            } else {
              t.dx = t.dy * (Math.random() > 0.5 ? 1 : -1);
              t.dy = 0;
            }
          }

          // Boundary wrap within canvas
          if (t.x < -60 || t.x > w + 60 || t.y < -60 || t.y > h + 60) {
            t.x = cx + (Math.random() - 0.5) * (w * 0.8);
            t.y = cy + (Math.random() - 0.5) * (h * 0.6);
          }

          t.history.push({ x: t.x, y: t.y });
          if (t.history.length > (isMobile ? 8 : 14)) t.history.shift();

          // Draw Glowing Laser Ribbon
          if (t.history.length > 1) {
            ctx.beginPath();
            ctx.moveTo(t.history[0].x, t.history[0].y);
            for (let k = 1; k < t.history.length; k++) {
              ctx.lineTo(t.history[k].x, t.history[k].y);
            }
            ctx.strokeStyle = t.color;
            ctx.lineWidth = isMobile ? 1.8 : 2.5;
            ctx.shadowColor = t.color;
            ctx.shadowBlur = isMobile ? 5 : 15;
            ctx.globalAlpha = trailIntensity * 0.8;
            ctx.stroke();

            // Bright hot core at the head of the trail for extra punch
            const head = t.history[t.history.length - 1];
            ctx.beginPath();
            ctx.arc(head.x, head.y, isMobile ? 1.8 : 2.6, 0, Math.PI * 2);
            ctx.fillStyle = "#ffffff";
            ctx.globalAlpha = trailIntensity;
            ctx.fill();
          }
        });

        ctx.globalCompositeOperation = "source-over";
      }

      // 3. Draw ignition spark bursts
      if (sparksRef.current.length) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        sparksRef.current = sparksRef.current.filter((p) => p.life > 0);
        sparksRef.current.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.9;
          p.vy *= 0.9;
          p.life -= isMobile ? 0.09 : 0.075;

          // Ease-out fade (fast at the end) reads cleaner than a linear fade
          const alpha = Math.max(p.life / p.maxLife, 0);
          ctx.globalAlpha = alpha * alpha;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = isMobile ? 2 : 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }

      // 4. Draw expanding power-surge shockwave ring
      if (shockwaveOpacity > 0.01) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        const maxRadius = Math.max(w, h) * 0.55;
        const radius = shockwaveProgress * maxRadius;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.strokeStyle = "#e8ffff";
        ctx.lineWidth = isMobile ? 2 : 3;
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = isMobile ? 14 : 24;
        ctx.globalAlpha = shockwaveOpacity;
        ctx.stroke();
        ctx.restore();
      }

      // 5. Draw TRON Laser Sweep Line (intro only -- no more repeating idle sweep)
      const currentScanX = laserScanX;
      if (!isSettled && currentScanX > -100 && currentScanX < w + 150) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        // Vertical Laser Beam
        const scanGrad = ctx.createLinearGradient(currentScanX - 20, 0, currentScanX + 20, 0);
        scanGrad.addColorStop(0, "rgba(0, 240, 255, 0)");
        scanGrad.addColorStop(0.5, "rgba(0, 240, 255, 0.85)");
        scanGrad.addColorStop(1, "rgba(0, 240, 255, 0)");

        ctx.fillStyle = scanGrad;
        ctx.fillRect(currentScanX - 20, cy - 60, 40, 120);

        // Core Laser Line
        ctx.beginPath();
        ctx.moveTo(currentScanX, cy - 60);
        ctx.lineTo(currentScanX, cy + 60);
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.shadowColor = "#00f0ff";
        ctx.shadowBlur = 12;
        ctx.stroke();

        ctx.restore();
      }

      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isSettled]);

  return (
    <div
      ref={containerRef}
      className={`tron-logo-container ${isSettled ? "is-settled" : ""}`}
    >
      <canvas ref={canvasRef} className="tron-logo-canvas" />

      {/* Quick white power-surge flash, purely inline-styled so no CSS file changes are required */}
      <div
        ref={flashRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(0,240,255,0.3) 45%, rgba(0,0,0,0) 75%)",
          opacity: 0,
          pointerEvents: "none",
          mixBlendMode: "screen",
        }}
      />

      <h2
        ref={logoRef}
        className={`tron-logo-heading footer-logo-text${isTwoLine ? " tron-logo-two-line" : ""}`}
      >
        {LOGO_TEXT.split("").map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              charRefs.current[i] = el;
            }}
            className="tron-char"
          >
            {/* A real breakable space (not nbsp) so the browser can wrap
                between "GOAT" and "STUDIOS" when isTwoLine kicks in. */}
            {char}
          </span>
        ))}
      </h2>
    </div>
  );
}
