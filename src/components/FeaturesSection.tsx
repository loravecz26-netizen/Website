"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const features = [
  {
    icon: "⚡",
    title: "Instant Context",
    description:
      "Drift AI reads your environment in real time — documents, signals, conversations — and surfaces exactly what you need, when you need it.",
  },
  {
    icon: "🔮",
    title: "Predictive Flow",
    description:
      "Our adaptive engine learns your patterns and anticipates next steps before you ask, reducing decision latency by an order of magnitude.",
  },
  {
    icon: "🔗",
    title: "Deep Integrations",
    description:
      "Works natively inside Slack, Notion, Linear, Salesforce, and 200+ tools. Zero context-switching, zero friction.",
  },
  {
    icon: "🛡️",
    title: "Enterprise Grade",
    description:
      "SOC 2 Type II, HIPAA-ready, and fully private deployment options. Your data stays yours — always.",
  },
  {
    icon: "🎯",
    title: "Action-First Output",
    description:
      "Drift doesn't just answer questions. It executes: drafts, schedules, routes, and resolves — closing the loop automatically.",
  },
  {
    icon: "∞",
    title: "Continuous Learning",
    description:
      "Every interaction improves the model for your team. The longer you use it, the sharper it gets — compounding intelligence over time.",
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} id="solutions" className="relative py-32 px-6 md:px-10">
      <div className="section-divider w-full max-w-7xl mx-auto mb-24" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] mb-4">
            Capabilities
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold max-w-2xl"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Built to drift
            <br />
            <span className="gold-text">not to stall.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#c9a84c]/10 rounded-2xl overflow-hidden border border-[#c9a84c]/10">
          {features.map(({ icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-[#0a0a0a] p-8 group hover:bg-[#111008] transition-colors duration-300"
            >
              <div className="text-3xl mb-5">{icon}</div>
              <h3
                className="text-xl font-bold mb-3 group-hover:text-[#c9a84c] transition-colors duration-300"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
