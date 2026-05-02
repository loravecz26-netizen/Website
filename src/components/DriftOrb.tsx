"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

function Ring({ size, duration, delay, opacity, dashed }: {
  size: number; duration: number; delay: number; opacity: number; dashed?: boolean;
}) {
  return (
    <div
      className="absolute rounded-full border border-primary pointer-events-none"
      style={{
        width: size, height: size,
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        opacity,
        borderStyle: dashed ? "dashed" : "solid",
        animation: `orb-spin ${duration}s linear ${delay}s infinite`,
        animationDirection: delay % 2 === 0 ? "normal" : "reverse",
      }}
    />
  );
}

const vaultDocs = [
  { label: "SEC Rule 10b-5",  angle: 0,    color: "#644a40" },
  { label: "HIPAA §164.514", angle: 72,   color: "#ffdfb5" },
  { label: "IRS §1031",       angle: 144,  color: "#644a40" },
  { label: "FINRA Rule 2010", angle: 216,  color: "#ffdfb5" },
  { label: "ADA Title III",   angle: 288,  color: "#644a40" },
];

export default function DriftOrb() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inView = useInView(ref, { once: false, margin: "-10%" });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const points = Array.from({ length: 20 }, (_, i) => ({
      angle: (i / 20) * Math.PI * 2,
      radius: 95 + Math.sin(i * 1.7) * 18,
      speed: 0.0025 + Math.random() * 0.0015,
    }));

    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < points.length; i++) {
        const a = points[i];
        const ax = cx + Math.cos(a.angle + t * a.speed) * a.radius;
        const ay = cy + Math.sin(a.angle + t * a.speed) * (a.radius * 0.42);
        for (let j = i + 1; j < points.length; j++) {
          const b = points[j];
          const bx = cx + Math.cos(b.angle + t * b.speed) * b.radius;
          const by = cy + Math.sin(b.angle + t * b.speed) * (b.radius * 0.42);
          const dist = Math.hypot(ax - bx, ay - by);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = `rgba(100,74,64,${(1 - dist / 110) * 0.25})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      for (const p of points) {
        const nx = cx + Math.cos(p.angle + t * p.speed) * p.radius;
        const ny = cy + Math.sin(p.angle + t * p.speed) * (p.radius * 0.42);
        ctx.beginPath();
        ctx.arc(nx, ny, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,224,194,0.75)";
        ctx.fill();
      }

      t++;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section ref={ref} id="vault" className="relative py-32 flex flex-col items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,rgba(100,74,64,0.06),transparent)]" />
      <div className="section-divider w-full max-w-7xl mx-auto mb-24" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20 px-6"
      >
        <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">
          The Vault
        </p>
        <h2
          className="text-4xl md:text-6xl font-bold leading-tight"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Your knowledge.
          <br />
          <span className="gold-text">Infinitely searchable.</span>
        </h2>
        <p className="mt-6 text-foreground/45 text-lg max-w-xl mx-auto leading-relaxed">
          Fill your Vault with regulations, filings, case studies, internal docs — anything your
          team needs to reason from. Drift AI reads it all and cites its sources.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[360px] h-[360px] md:w-[480px] md:h-[480px]"
      >
        <Ring size={480} duration={24} delay={0} opacity={0.08} dashed />
        <Ring size={390} duration={17} delay={0} opacity={0.16} />
        <Ring size={300} duration={11} delay={1} opacity={0.22} dashed />
        <Ring size={210} duration={7}  delay={0} opacity={0.28} />

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-36 md:h-36">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />
          <div
            className="absolute inset-2 rounded-full"
            style={{ background: "radial-gradient(circle at 35% 35%, #ffdfb5, #644a40 50%, #3d1a10)" }}
          />
          <div className="absolute top-[18%] left-[20%] w-[32%] h-[18%] rounded-full bg-white/40 blur-sm" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="opacity-60">
              <rect x="5" y="8" width="26" height="20" rx="3" stroke="#1a0f0c" strokeWidth="2"/>
              <circle cx="18" cy="18" r="5" stroke="#1a0f0c" strokeWidth="2"/>
              <path d="M18 13v-5M18 28v-5M8 18H5M31 18h-3" stroke="#1a0f0c" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {vaultDocs.map(({ label, angle, color }, i) => {
          const rad = (angle * Math.PI) / 180;
          const r = 175;
          const x = 50 + (Math.cos(rad) * r) / 4.8;
          const y = 50 + (Math.sin(rad) * r * 0.55) / 4.8;
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.4 + i * 0.12 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md text-xs font-mono whitespace-nowrap border"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                color,
                borderColor: `${color}40`,
                backgroundColor: `${color}10`,
                fontSize: "0.6rem",
                letterSpacing: "0.05em",
              }}
            >
              {label}
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
        className="mt-16 grid grid-cols-3 gap-6 max-w-3xl w-full px-6 text-center"
      >
        {[
          { label: "Any File Format", desc: "PDF, DOCX, HTML, CSV, and more" },
          { label: "Source Citations", desc: "Every answer links back to the doc" },
          { label: "Always Private", desc: "Your Vault never trains anyone else" },
        ].map(({ label, desc }) => (
          <div key={label} className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-primary">{label}</span>
            <span className="text-sm text-foreground/45 leading-relaxed">{desc}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
