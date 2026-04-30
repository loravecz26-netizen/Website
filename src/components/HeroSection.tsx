"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function GoldParticle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute rounded-full bg-[#c9a84c] opacity-70 pointer-events-none"
      style={style}
    />
  );
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Particle field on canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number; y: number; r: number;
      dx: number; dy: number; alpha: number; fade: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: -(Math.random() * 0.4 + 0.1),
        alpha: Math.random(),
        fade: Math.random() * 0.005 + 0.002,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= p.fade;
        if (p.alpha <= 0 || p.y < 0) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 5;
          p.alpha = Math.random() * 0.7 + 0.3;
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(201,168,76,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_50%,rgba(201,168,76,0.05),transparent)]" />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Scan-line overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center pt-24 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-mono uppercase tracking-widest mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
          Now in Early Access
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Intelligence
          <br />
          <span className="gold-text">That Moves</span>
          <br />
          With You
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 leading-relaxed mb-10"
        >
          Drift AI delivers real-time adaptive intelligence that anticipates your
          next move — seamlessly embedded into the tools your team already uses.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#waitlist"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-[#0a0a0a] text-base font-bold tracking-wide hover:brightness-110 transition-all duration-200 shadow-[0_0_30px_rgba(201,168,76,0.4)]"
          >
            Get Early Access
          </a>
          <a
            href="#product"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white/80 text-base font-medium hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-all duration-200"
          >
            See How It Works →
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "10×", label: "Faster Decisions" },
            { value: "98%", label: "Accuracy Rate" },
            { value: "< 50ms", label: "Response Time" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span
                className="text-3xl md:text-4xl font-bold gold-text"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {value}
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-white/40">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-mono uppercase tracking-widest text-white/30">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#c9a84c]/50 to-transparent" />
      </motion.div>
    </section>
  );
}
