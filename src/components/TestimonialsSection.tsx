"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "Drift AI changed the way our ops team works. It's not a tool you open — it's intelligence that's just there.",
    name: "Sarah Chen",
    role: "COO, Meridian Health",
  },
  {
    quote:
      "The predictive flow feature alone saved our team 3 hours a day. The accuracy is uncanny.",
    name: "Marcus Reid",
    role: "VP Engineering, Foundry Labs",
  },
  {
    quote:
      "We evaluated six AI platforms. Drift was the only one that felt like it was reading our minds.",
    name: "Priya Nair",
    role: "Head of Product, Vela Capital",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-10 bg-[#070705]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(201,168,76,0.04),transparent)]" />
      <div className="section-divider w-full max-w-7xl mx-auto mb-24" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] mb-4">
            What Teams Say
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            The teams that drift
            <br />
            <span className="gold-text">never look back.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative p-8 rounded-2xl border border-[#c9a84c]/15 bg-[#0d0d0a] hover:border-[#c9a84c]/35 transition-all duration-300 group"
            >
              {/* Quote mark */}
              <span
                className="absolute top-6 left-8 text-5xl leading-none text-[#c9a84c]/20 group-hover:text-[#c9a84c]/40 transition-colors"
                style={{ fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </span>
              <p className="text-white/70 leading-relaxed text-sm mt-6 mb-6">
                {quote}
              </p>
              <div className="border-t border-[#c9a84c]/10 pt-4">
                <p className="font-semibold text-sm">{name}</p>
                <p className="text-xs text-[#c9a84c]/70 font-mono tracking-wide mt-0.5">
                  {role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
