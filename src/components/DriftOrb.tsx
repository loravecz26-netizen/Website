"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* Animated ring component */
function Ring({
  size,
  duration,
  delay,
  opacity,
  dashed,
}: {
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  dashed?: boolean;
}) {
  return (
    <div
      className="absolute rounded-full border border-[#c9a84c] pointer-events-none"
      style={{
        width: size,
        height: size,
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        opacity,
        borderStyle: dashed ? "dashed" : "solid",
        animation: `orb-spin ${duration}s linear ${delay}s infinite`,
        animationDirection: delay % 2 === 0 ? "normal" : "reverse",
      }}
    />
  );
}

export default function DriftOrb() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10%" });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Draw arc-network on canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const points = Array.from({ length: 18 }, (_, i) => ({
      angle: (i / 18) * Math.PI * 2,
      radius: 90 + Math.sin(i * 1.3) * 20,
      speed: 0.003 + Math.random() * 0.002,
    }));

    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        const ax = cx + Math.cos(a.angle + t * a.speed) * a.radius;
        const ay = cy + Math.sin(a.angle + t * a.speed) * (a.radius * 0.4);
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const bx = cx + Math.cos(b.angle + t * b.speed) * b.radius;
          const by = cy + Math.sin(b.angle + t * b.speed) * (b.radius * 0.4);
          const dist = Math.hypot(ax - bx, ay - by);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(201,168,76,${(1 - dist / 120) * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (const p of points) {
        const nx = cx + Math.cos(p.angle + t * p.speed) * p.radius;
        const ny = cy + Math.sin(p.angle + t * p.speed) * (p.radius * 0.4);
        ctx.beginPath();
        ctx.arc(nx, ny, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(232,201,122,0.8)";
        ctx.fill();
      }

      t++;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section ref={ref} id="product" className="relative py-32 flex flex-col items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(201,168,76,0.06),transparent)]" />

      <div className="section-divider w-full max-w-7xl mx-auto mb-24" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 px-6"
      >
        <p className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] mb-4">
          The Engine
        </p>
        <h2
          className="text-4xl md:text-6xl font-bold leading-tight"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Every signal.
          <br />
          <span className="gold-text">Every moment.</span>
        </h2>
      </motion.div>

      {/* Orb */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[340px] h-[340px] md:w-[460px] md:h-[460px]"
      >
        {/* Rings */}
        <Ring size={460} duration={22} delay={0} opacity={0.1} dashed />
        <Ring size={380} duration={16} delay={0} opacity={0.18} />
        <Ring size={300} duration={11} delay={1} opacity={0.25} dashed />
        <Ring size={220} duration={8}  delay={0} opacity={0.3} />

        {/* Arc network canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
        />

        {/* Core sphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-[#c9a84c]/20 blur-2xl" />
          {/* Main sphere */}
          <div className="absolute inset-2 rounded-full orb-glow floating"
            style={{
              background: "radial-gradient(circle at 35% 35%, #f0d882, #c9a84c 50%, #6b4c0a)",
            }}
          />
          {/* Highlight */}
          <div className="absolute top-[20%] left-[22%] w-[30%] h-[20%] rounded-full bg-white/40 blur-sm" />
          {/* Inner pulse */}
          <div className="absolute inset-[30%] rounded-full bg-white/10"
            style={{ animation: "pulse-gold 2.5s ease-in-out infinite" }}
          />
        </div>

        {/* Orbiting dot */}
        <div
          className="absolute top-1/2 left-1/2 w-3 h-3"
          style={{
            marginTop: -6,
            marginLeft: -6,
            animation: "orb-spin 4s linear infinite",
            transformOrigin: "6px 6px",
          }}
        >
          <div
            className="absolute rounded-full bg-[#e8c97a]"
            style={{ width: 8, height: 8, top: -90, left: -1 }}
          />
        </div>
      </motion.div>

      {/* Labels around the orb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-16 grid grid-cols-3 gap-6 max-w-3xl w-full px-6 text-center"
      >
        {[
          { label: "Real-Time Streams", desc: "Live data ingestion at scale" },
          { label: "Adaptive Models", desc: "Self-tuning to your context" },
          { label: "Silent Execution", desc: "Runs behind every decision" },
        ].map(({ label, desc }) => (
          <div key={label} className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#c9a84c]">
              {label}
            </span>
            <span className="text-sm text-white/50 leading-relaxed">{desc}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
