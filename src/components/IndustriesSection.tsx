"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CardCanvas, Card } from "@/components/CardCanvas";

const industries = [
  {
    name: "Financial Services",
    role: "Financial Advisors & Wealth Managers",
    vault: ["SEC regulations", "FINRA rules", "IRS tax code", "Client portfolios", "Fund prospectuses"],
    workflows: ["Generate compliant client reports", "Flag regulatory changes", "Draft ADV disclosures", "Auto-summarize earnings calls"],
    quote: "Your AI knows the tax code, the compliance rules, and your client's entire history — before you even open a file.",
  },
  {
    name: "Healthcare",
    role: "Clinicians, Administrators & Payers",
    vault: ["Clinical guidelines", "Payer policies", "HIPAA rules", "Drug interactions", "ICD-10 codes"],
    workflows: ["Prior auth documentation", "Clinical note summarization", "Payer policy lookup", "HIPAA compliance checks"],
    quote: "Every clinical question answered against the latest guidelines. Every note drafted to payer specs.",
  },
  {
    name: "Real Estate",
    role: "Brokers, Investors & Property Managers",
    vault: ["Lease agreements", "Zoning codes", "HOA documents", "Comparable sales", "Title reports"],
    workflows: ["Draft lease agreements", "Flag zoning conflicts", "Generate investment memos", "Summarize due diligence"],
    quote: "Every deal has its docs reviewed before you get to the table.",
  },
  {
    name: "Human Resources",
    role: "HR Teams & People Operations",
    vault: ["Employee handbook", "Benefits plans", "Labor law", "Job descriptions", "Review templates"],
    workflows: ["Draft offer letters", "Onboarding checklists", "Policy Q&A for employees", "Performance review drafts"],
    quote: "HR questions answered instantly. Policies applied consistently. Every time.",
  },
  {
    name: "Accounting & Tax",
    role: "CPAs & Tax Professionals",
    vault: ["IRS publications", "State tax codes", "Prior returns", "Client financials", "GAAP standards"],
    workflows: ["Tax position memos", "Entity structure analysis", "Deduction identification", "Client update drafts"],
    quote: "Research that used to take hours takes seconds. Cited, accurate, and ready to share.",
  },
  {
    name: "Insurance",
    role: "Brokers, Underwriters & Claims",
    vault: ["Policy documents", "State regulations", "Claims history", "Carrier guidelines", "Coverage comparisons"],
    workflows: ["Coverage gap analysis", "Claims summaries", "Renewal recommendations", "Compliance filings"],
    quote: "Every policy question has an answer. Every claim has a precedent. Instantly.",
  },
];

export default function IndustriesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState(0);

  const current = industries[active];

  return (
    <section ref={ref} id="solutions" className="relative py-32 px-6 md:px-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(201,168,76,0.05),transparent)]" />
      <div className="section-divider w-full max-w-7xl mx-auto mb-24" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] mb-4">
            Built for Every Field
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Your industry.
            <br />
            <span className="gold-text">Your AI. Your rules.</span>
          </h2>
        </motion.div>

        <CardCanvas>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
            {/* Industry tabs */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0"
            >
              {industries.map((ind, i) => (
                <button
                  key={ind.name}
                  onClick={() => setActive(i)}
                  className={`flex-shrink-0 lg:w-full text-left px-5 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    active === i
                      ? "bg-[#c9a84c]/15 border border-[#c9a84c]/40 text-[#e8c97a]"
                      : "border border-transparent text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`}
                  style={active === i ? { fontFamily: "Georgia, serif" } : {}}
                >
                  {ind.name}
                </button>
              ))}
            </motion.div>

            {/* Content panel */}
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="p-8 md:p-10 h-full">
                <p className="text-xs font-mono uppercase tracking-widest text-[#c9a84c]/60 mb-2">
                  {current.role}
                </p>
                <h3
                  className="text-2xl md:text-3xl font-bold mb-6"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  {current.name}
                </h3>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-3">
                      Vault Contents
                    </p>
                    <ul className="space-y-2">
                      {current.vault.map((v) => (
                        <li key={v} className="flex items-center gap-2.5 text-sm text-white/55">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]/50 flex-shrink-0" />
                          {v}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-3">
                      Automated Workflows
                    </p>
                    <ul className="space-y-2">
                      {current.workflows.map((w) => (
                        <li key={w} className="flex items-center gap-2.5 text-sm text-white/55">
                          <span className="text-[#c9a84c]/50 flex-shrink-0">→</span>
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <blockquote
                  className="border-l-2 border-[#c9a84c]/40 pl-5 text-white/60 italic text-sm leading-relaxed"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  &ldquo;{current.quote}&rdquo;
                </blockquote>
              </Card>
            </motion.div>
          </div>
        </CardCanvas>
      </div>
    </section>
  );
}
