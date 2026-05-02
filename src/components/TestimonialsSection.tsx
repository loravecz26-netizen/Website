"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { motion as m } from "motion/react";

/* ─── Data ───────────────────────────────────────────── */
interface Testimonial {
  text: string;
  name: string;
  role: string;
  industry: string;
  initials: string;
  color: string; // avatar accent
}

const testimonials: Testimonial[] = [
  {
    text: "I loaded our entire compliance library into the Vault and built a workflow that flags every new SEC filing relevant to our clients automatically. What used to be a full day of research is now a five-minute review.",
    name: "David Park",
    role: "Senior Financial Advisor",
    industry: "Financial Services",
    initials: "DP",
    color: "#c9a84c",
  },
  {
    text: "We specialized it on HIPAA, our payer contracts, and our clinical protocols. Now our admin team gets instant answers to coverage questions without calling the payer. It's like having a compliance expert available 24/7.",
    name: "Dr. Amara Osei",
    role: "Medical Director",
    industry: "Healthcare",
    initials: "AO",
    color: "#e8c97a",
  },
  {
    text: "Built a workflow that takes any new property address, pulls the zoning code, checks our standard lease terms, and drafts a preliminary investment memo. Three minutes from address to memo.",
    name: "Renata Vidal",
    role: "Principal, Meridian RE Partners",
    industry: "Real Estate",
    initials: "RV",
    color: "#c9a84c",
  },
  {
    text: "Research that used to take a junior associate three hours now takes Drift AI forty seconds. And it cites the exact statute. We've stopped second-guessing the output.",
    name: "James Whitfield",
    role: "Managing Partner",
    industry: "Legal",
    initials: "JW",
    color: "#e8c97a",
  },
  {
    text: "Our HR team handles 400+ employees. Drift AI answers policy questions, drafts offer letters, and flags anything that needs legal review. We shipped it in a week.",
    name: "Priya Nair",
    role: "Head of People Ops",
    industry: "HR",
    initials: "PN",
    color: "#c9a84c",
  },
  {
    text: "I pointed it at our last five years of tax returns, the IRS publications we reference most, and our SOPs. Now every new engagement starts with an AI deep-dive that used to take days.",
    name: "Marcus Reid",
    role: "CPA, Partner",
    industry: "Accounting",
    initials: "MR",
    color: "#e8c97a",
  },
  {
    text: "Coverage gap analysis in seconds. Before Drift, we had associates manually cross-referencing carrier guidelines for hours. Now the AI does it and they review. Completely flipped the workflow.",
    name: "Sophia Chen",
    role: "VP, Commercial Lines",
    industry: "Insurance",
    initials: "SC",
    color: "#c9a84c",
  },
  {
    text: "The best part isn't the speed — it's that every answer links back to the source document. Our clients trust it because we can show our work instantly.",
    name: "Tobias Müller",
    role: "Wealth Manager",
    industry: "Financial Services",
    initials: "TM",
    color: "#e8c97a",
  },
  {
    text: "We were skeptical about AI hallucinating regulations. With the Vault, it only reasons from what we uploaded. That single constraint made the whole team comfortable deploying it.",
    name: "Aisha Kamara",
    role: "Compliance Officer",
    industry: "Banking",
    initials: "AK",
    color: "#c9a84c",
  },
];

/* Split into three columns */
const col1 = testimonials.slice(0, 3);
const col2 = testimonials.slice(3, 6);
const col3 = testimonials.slice(6, 9);

/* ─── Single card ────────────────────────────────────── */
function TestimonialCard({ text, name, role, industry, initials, color }: Testimonial) {
  return (
    <div
      className="relative p-6 rounded-2xl w-full max-w-xs flex flex-col gap-4 group"
      style={{
        background: "rgba(255,255,255,0.03)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(201,168,76,0.12)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Top-edge shine */}
      <div
        className="absolute top-0 left-[20%] right-[20%] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)",
        }}
      />

      {/* Industry tag */}
      <span
        className="self-start text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
        style={{
          color: "rgba(201,168,76,0.6)",
          border: "1px solid rgba(201,168,76,0.15)",
          background: "rgba(201,168,76,0.06)",
        }}
      >
        {industry}
      </span>

      {/* Quote mark */}
      <span
        className="absolute top-4 right-5 text-4xl leading-none select-none"
        style={{
          fontFamily: "Georgia, serif",
          color: "rgba(201,168,76,0.1)",
        }}
      >
        &ldquo;
      </span>

      {/* Text */}
      <p
        className="text-sm leading-relaxed flex-1"
        style={{ color: "rgba(255,255,255,0.55)" }}
      >
        {text}
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid rgba(201,168,76,0.08)" }}>
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
          style={{
            background: `linear-gradient(135deg, ${color}30, ${color}15)`,
            border: `1px solid ${color}40`,
            color,
          }}
        >
          {initials}
        </div>
        {/* Name + role */}
        <div className="flex flex-col min-w-0">
          <span
            className="text-sm font-semibold truncate"
            style={{ color: "rgba(255,255,255,0.85)", fontFamily: "Georgia, serif" }}
          >
            {name}
          </span>
          <span
            className="text-[11px] truncate"
            style={{ color: "rgba(201,168,76,0.55)", fontFamily: "monospace", letterSpacing: "0.03em" }}
          >
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Scrolling column ───────────────────────────────── */
function TestimonialsColumn({
  items,
  duration = 18,
  reverse = false,
  className,
}: {
  items: Testimonial[];
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`} style={{ maskImage: "linear-gradient(to bottom, transparent, black 12%, black 88%, transparent)" }}>
      <m.div
        animate={{ translateY: reverse ? "0%" : "-50%" }}
        initial={{ translateY: reverse ? "-50%" : "0%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-5"
      >
        {[0, 1].map((pass) => (
          <React.Fragment key={pass}>
            {items.map((t, i) => (
              <TestimonialCard key={`${pass}-${i}`} {...t} />
            ))}
          </React.Fragment>
        ))}
      </m.div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────── */
export default function TestimonialsSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background radial */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(201,168,76,0.04),transparent)]" />
      <div className="absolute inset-0 bg-[#070705]" style={{ zIndex: -1 }} />

      <div className="divider w-full max-w-7xl mx-auto mb-20" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-6"
      >
        <p className="text-xs font-mono uppercase tracking-widest text-[#c9a84c] mb-4">
          From the Field
        </p>
        <h2
          className="text-4xl md:text-5xl font-bold"
          style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
        >
          Used by professionals
          <br />
          <span className="gold-text">across every industry.</span>
        </h2>
      </motion.div>

      {/* Three scrolling columns */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex gap-5 justify-center items-start px-6 max-h-[680px]"
      >
        <TestimonialsColumn items={col1} duration={22} />
        <TestimonialsColumn items={col2} duration={28} reverse className="hidden md:flex" />
        <TestimonialsColumn items={col3} duration={19} className="hidden lg:flex" />
      </motion.div>
    </section>
  );
}
