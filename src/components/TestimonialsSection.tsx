"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "I loaded our entire compliance library into the Vault and built a workflow that flags every new SEC filing relevant to our clients automatically. What used to be a full day of research is now a five-minute review.",
    name: "David Park",
    role: "Senior Financial Advisor, Park Wealth Management",
    industry: "Financial Services",
  },
  {
    quote:
      "We specialized it on HIPAA, our payer contracts, and our clinical protocols. Now our admin team gets instant answers to coverage questions without calling the payer. It's like having a compliance expert available 24/7.",
    name: "Dr. Amara Osei",
    role: "Medical Director, Northgate Health System",
    industry: "Healthcare",
  },
  {
    quote:
      "Built a workflow that takes any new property address, pulls the zoning code, checks our standard lease terms, and drafts a preliminary investment memo. Three minutes from address to memo.",
    name: "Renata Vidal",
    role: "Principal, Meridian Real Estate Partners",
    industry: "Real Estate",
  },
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="relative py-32 px-6 md:px-10 bg-background">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, color-mix(in srgb, var(--primary) 4%, transparent), transparent)" }}
      />
      <div className="section-divider w-full max-w-7xl mx-auto mb-24" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-4">
            Early Access Teams
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Built by them.
            <br />
            <span className="gold-text">Trusted by them.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ quote, name, role, industry }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="relative p-8 rounded-2xl border border-primary/15 bg-card hover:border-primary/35 transition-all duration-300 group flex flex-col"
            >
              {/* Industry tag */}
              <span className="inline-block mb-5 px-2.5 py-1 rounded-full text-xs font-mono uppercase tracking-widest border border-primary/25 text-primary/70 self-start">
                {industry}
              </span>

              <span
                className="text-5xl leading-none text-primary/15 group-hover:text-primary/30 transition-colors mb-2"
                style={{ fontFamily: "Georgia, serif" }}
              >
                &ldquo;
              </span>
              <p className="text-foreground/65 leading-relaxed text-sm flex-1 mb-6">
                {quote}
              </p>
              <div className="border-t border-primary/10 pt-4">
                <p className="font-semibold text-sm">{name}</p>
                <p className="text-xs text-primary/60 font-mono tracking-wide mt-0.5">{role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
