"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const industries = [
  "Financial Advisors",
  "Healthcare Providers",
  "Legal Teams",
  "Real Estate Firms",
  "HR Departments",
  "Compliance Officers",
  "Accountants",
  "Insurance Brokers",
];

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);

  /* Gold particle field */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: {
      x: number; y: number; r: number;
      dx: number; dy: number; alpha: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 1200),
        y: Math.random() * (canvas.height || 800),
        r: Math.random() * 1.4 + 0.3,
        dx: (Math.random() - 0.5) * 0.25,
        dy: -(Math.random() * 0.35 + 0.08),
        alpha: Math.random() * 0.6 + 0.2,
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
        p.alpha -= 0.003;
        if (p.alpha <= 0 || p.y < 0) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 5;
          p.alpha = Math.random() * 0.6 + 0.2;
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

  /* Ticker scroll */
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let x = 0;
    let animId: number;
    const speed = 0.5;
    const scroll = () => {
      x -= speed;
      if (x < -(el.scrollWidth / 2)) x = 0;
      el.style.transform = `translateX(${x}px)`;
      animId = requestAnimationFrame(scroll);
    };
    scroll();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-5%,rgba(201,168,76,0.13),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(201,168,76,0.04),transparent)]" />

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* CRT scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,1) 2px,rgba(0,0,0,1) 4px)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center pt-28 pb-16 w-full">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c9a84c]/40 bg-[#c9a84c]/10 text-[#c9a84c] text-xs font-mono uppercase tracking-widest mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
          Now in Early Access
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[88px] font-bold leading-[1.02] tracking-tight mb-8"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Enterprise AI.
          <br />
          <span className="gold-text">Built for</span>
          <br />
          Your Industry.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-white/55 leading-relaxed mb-4"
        >
          Load your knowledge vault. Specialize the AI for your field.
          Build workflows that run themselves.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-xl mx-auto text-base text-white/35 mb-12"
        >
          The AI platform your industry has been waiting for — without the enterprise contract.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a
            href="#waitlist"
            className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e8c97a] text-[#0a0a0a] text-base font-bold tracking-wide hover:brightness-110 transition-all duration-200 shadow-[0_0_35px_rgba(201,168,76,0.4)]"
          >
            Start Building Free
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-9 py-4 rounded-full border border-white/20 text-white/75 text-base font-medium hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-all duration-200"
          >
            See How It Works →
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.75 }}
          className="grid grid-cols-3 gap-6 max-w-md mx-auto"
        >
          {[
            { value: "Any", label: "Industry" },
            { value: "Zero", label: "Code Required" },
            { value: "100%", label: "Your Data" },
          ].map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span
                className="text-3xl md:text-4xl font-bold gold-text"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {value}
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-white/35">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Industry ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="relative w-full overflow-hidden py-5 border-t border-b border-[#c9a84c]/15"
      >
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
        <div ref={tickerRef} className="flex items-center gap-0 whitespace-nowrap will-change-transform">
          {[...industries, ...industries].map((name, i) => (
            <span key={i} className="flex items-center gap-6 px-6">
              <span className="text-xs font-mono uppercase tracking-widest text-white/30">
                {name}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#c9a84c]/40" />
            </span>
          ))}
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-10 bg-gradient-to-b from-[#c9a84c]/40 to-transparent" />
      </motion.div>
    </section>
  );
}
