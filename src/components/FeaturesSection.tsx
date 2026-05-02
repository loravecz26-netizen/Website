"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TiltCard } from "@/components/TiltCard";

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "Knowledge Vault",
    description:
      "Upload your firm's documents — regulations, filings, SOPs, case law — and Drift AI reasons exclusively from them. No hallucinations. No outside knowledge bleeding in.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12"/>
      </svg>
    ),
    title: "Industry Specialization",
    description:
      "Configure your AI's reasoning for your field. A financial adviser's model cites the tax code and FINRA rules. A medical team's model references clinical protocols. Every industry, every context.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M17.5 14v7M14 17.5h7"/>
      </svg>
    ),
    title: "Workflow Builder",
    description:
      "Build automations visually — no code. Chain actions together: research → draft → review → send. Set triggers, conditions, and approvals. Workflows run themselves while you focus on what matters.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
      </svg>
    ),
    title: "Document Drafting",
    description:
      "Generate compliant documents in seconds — client memos, compliance reports, proposals, contracts. Every draft grounded in your Vault, matching your firm's tone and format.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Compliance Guardrails",
    description:
      "Every response is checked against your compliance rules before it reaches you. Flag, block, or escalate based on your firm's policies. Built-in audit trails for every AI action.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: "Works Where You Work",
    description:
      "Embedded into Slack, Teams, Chrome, and 200+ tools via native integrations. Your AI is available in every tab, every conversation — no context-switching required.",
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} id="solutions" className="relative py-32 px-6 md:px-10 bg-[#070705]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(201,168,76,0.04),transparent)]" />
      <div className="section-divider w-full max-w-7xl mx-auto mb-24" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] mb-4">
            Platform
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2
              className="text-4xl md:text-5xl font-bold max-w-lg"
              style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
            >
              Everything you need.
              <br />
              <span className="gold-text">Nothing you don&apos;t.</span>
            </h2>
            <p className="text-white/40 max-w-sm text-sm leading-relaxed">
              Drift AI is a complete platform — vault, AI engine, workflow builder,
              and integrations — all in one place.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#c9a84c]/08 rounded-2xl overflow-hidden border border-[#c9a84c]/10">
          {features.map(({ icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-[#070705]"
            >
              <TiltCard
                effect="gravitate"
                tiltLimit={8}
                scale={1}
                className="p-8 group hover:bg-[#0f0e0a] h-full"
              >
                <div className="text-[#c9a84c]/60 group-hover:text-[#c9a84c] transition-colors duration-300 mb-5">
                  {icon}
                </div>
                <h3
                  className="text-lg font-bold mb-3 group-hover:text-[#c9a84c] transition-colors duration-300"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {title}
                </h3>
                <p className="text-sm text-white/45 leading-relaxed">{description}</p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
