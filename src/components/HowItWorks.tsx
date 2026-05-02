"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Build Your Vault",
    subtitle: "Your knowledge. Your rules.",
    description:
      "Upload your firm's documents, regulations, SOPs, case files, and proprietary data. Your Vault becomes the single source of truth your AI reasons from — nothing else, nothing outside it.",
    examples: ["SEC filings & FINRA rules", "Medical protocols & payer policies", "Lease agreements & zoning laws", "Internal playbooks & runbooks"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M4 12h24" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="10" cy="9" r="1.5" fill="currentColor"/>
        <circle cx="16" cy="9" r="1.5" fill="currentColor"/>
        <path d="M10 18h12M10 22h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "02",
    title: "Specialize Your AI",
    subtitle: "Trained on your world.",
    description:
      "Drift AI doesn't just read your Vault — it reasons from it. Configure the AI's expertise, tone, and compliance rules for your industry. A financial adviser's AI cites the tax code. A healthcare team's AI references clinical guidelines.",
    examples: ["Industry-specific reasoning", "Compliance guardrails baked in", "Trained by domain experts", "Prompt templates for your field"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M16 6V4M16 28v-2M6 16H4M28 16h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M9.17 9.17L7.76 7.76M24.24 24.24l-1.41-1.41M22.83 9.17l1.41-1.41M7.76 24.24l1.41-1.41" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: "03",
    title: "Automate Your Workflows",
    subtitle: "Work that runs itself.",
    description:
      "Build automations that execute end-to-end — draft documents, flag compliance issues, summarize filings, route approvals, generate reports. Set them up once. They run every time.",
    examples: ["Document drafting & review", "Compliance monitoring", "Client report generation", "Approval routing & alerts"],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M6 10h8l3 4-3 4H6l3-4-3-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M18 14h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="22" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="22" cy="22" r="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M18 14v4a4 4 0 004 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} id="how-it-works" className="relative py-32 px-6 md:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(100,74,64,0.05),transparent)]" />
      <div className="section-divider w-full max-w-7xl mx-auto mb-24" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">
            How It Works
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold leading-tight"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Three steps to your
            <br />
            <span className="gold-text">own AI platform.</span>
          </h2>
        </motion.div>

        <div className="space-y-6">
          {steps.map(({ number, title, subtitle, description, examples, icon }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group relative rounded-2xl border border-primary/12 bg-card hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_0%_50%,rgba(100,74,64,0.04),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative p-8 md:p-10 grid md:grid-cols-[auto_1fr_auto] gap-8 md:gap-12 items-start">
                <div className="flex items-start gap-6 md:gap-0 md:flex-col">
                  <span
                    className="text-5xl md:text-7xl font-bold leading-none gold-text opacity-30 group-hover:opacity-60 transition-opacity duration-300"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {number}
                  </span>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-2 text-primary">
                    {icon}
                    <span className="text-xs font-mono uppercase tracking-widest text-primary/70">
                      {subtitle}
                    </span>
                  </div>
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors duration-300"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-foreground/55 leading-relaxed max-w-2xl">{description}</p>
                </div>

                <div className="md:min-w-[220px]">
                  <p className="text-xs font-mono uppercase tracking-widest text-foreground/25 mb-3">
                    Examples
                  </p>
                  <ul className="space-y-2">
                    {examples.map((ex) => (
                      <li key={ex} className="flex items-start gap-2 text-sm text-foreground/45">
                        <span className="text-primary/50 mt-0.5 flex-shrink-0">→</span>
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
