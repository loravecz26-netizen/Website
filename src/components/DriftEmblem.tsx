"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";

export default function DriftEmblem() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10%" });

  /* Animated flowing streams around the emblem */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    interface Stream {
      offset: number;
      speed: number;
      radius: number;
      width: number;
      alpha: number;
    }

    const streams: Stream[] = Array.from({ length: 6 }, (_, i) => ({
      offset: (i / 6) * Math.PI * 2,
      speed: 0.008 + i * 0.002,
      radius: 120 + i * 15,
      width: 1.5 - i * 0.15,
      alpha: 0.6 - i * 0.07,
    }));

    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const s of streams) {
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.05) {
          const wobble = Math.sin(a * 3 + t * s.speed + s.offset) * 12;
          const r = s.radius + wobble;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * (r * 0.55);
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `rgba(201,168,76,${s.alpha})`;
        ctx.lineWidth = s.width;
        ctx.stroke();
      }

      // Flowing particles along streams
      for (let i = 0; i < 12; i++) {
        const a = ((i / 12) * Math.PI * 2 + t * 0.015) % (Math.PI * 2);
        const wobble = Math.sin(a * 3 + t * 0.012) * 12;
        const r = 135 + wobble;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * (r * 0.55);
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,201,122,${0.4 + Math.sin(t * 0.05 + i) * 0.3})`;
        ctx.fill();
      }

      t++;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section ref={ref} className="relative py-40 flex flex-col items-center overflow-hidden bg-[#070705]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(201,168,76,0.08),transparent)]" />
      <div className="section-divider w-full max-w-7xl mx-auto mb-24" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-6"
      >
        <p className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] mb-4">
          The Symbol
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Always in motion.
          <br />
          <span className="gold-text">Never off course.</span>
        </h2>
      </motion.div>

      {/* Emblem */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[360px] h-[360px] md:w-[440px] md:h-[440px]"
      >
        {/* Stream canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* Central emblem */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
          {/* Outer ring */}
          <div
            className="relative w-28 h-28 rounded-full flex items-center justify-center orb-glow"
            style={{
              background: "radial-gradient(circle at 40% 35%, #f0d882, #c9a84c 60%, #6b4c0a)",
            }}
          >
            {/* Inner dark */}
            <div className="absolute inset-3 rounded-full bg-[#0a0a0a] flex items-center justify-center">
              {/* D letter mark */}
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                {/* Stylised "D" / drift-wave mark */}
                <path
                  d="M10 8 L10 36 L20 36 C32 36 36 28 36 22 C36 16 32 8 20 8 Z"
                  stroke="url(#goldGrad)"
                  strokeWidth="2.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Wave accent */}
                <path
                  d="M16 22 Q20 17 24 22 Q28 27 32 22"
                  stroke="url(#goldGrad)"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#f0d882" />
                    <stop offset="100%" stopColor="#c9a84c" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            {/* Highlight */}
            <div className="absolute top-[15%] left-[20%] w-[30%] h-[18%] rounded-full bg-white/35 blur-sm" />
          </div>

          {/* Scroll banner — equivalent of TrumpRx eagle scroll */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={inView ? { scaleX: 1, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative flex items-center justify-center"
          >
            {/* Left curl */}
            <div className="w-6 h-8 rounded-l-full border-l-2 border-t-2 border-b-2 border-[#c9a84c]/60 bg-gradient-to-r from-[#1a1408] to-[#241c0a]" />
            {/* Main scroll body */}
            <div className="px-6 py-2 bg-gradient-to-b from-[#241c0a] to-[#1a1408] border-t-2 border-b-2 border-[#c9a84c]/60 flex items-center">
              <span
                className="text-base font-bold gold-text whitespace-nowrap"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Drift AI
              </span>
            </div>
            {/* Right curl */}
            <div className="w-6 h-8 rounded-r-full border-r-2 border-t-2 border-b-2 border-[#c9a84c]/60 bg-gradient-to-l from-[#1a1408] to-[#241c0a]" />
          </motion.div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="mt-12 text-sm text-white/40 font-mono uppercase tracking-widest"
      >
        Engineered in motion · Built for velocity
      </motion.p>
    </section>
  );
}
