"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { AwardBadge } from "@/components/AwardBadge";

export default function WaitlistSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section ref={ref} id="waitlist" className="relative py-40 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(100,74,64,0.07),transparent)]" />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,74,64,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,74,64,1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="section-divider w-full max-w-7xl mx-auto mb-24" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs font-mono uppercase tracking-widest text-primary mb-6">
            Early Access
          </p>
          <h2
            className="text-4xl md:text-6xl font-bold leading-tight mb-6"
            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
          >
            Your industry&apos;s AI
            <br />
            <span className="gold-text">starts here.</span>
          </h2>
          <p className="text-foreground/50 mb-12 text-lg leading-relaxed">
            Join the waitlist for early access. Founding teams get free onboarding,
            custom Vault setup, and lifetime pricing locked in.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-primary/40 bg-primary/10 text-primary"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="font-mono uppercase tracking-widest text-sm">
                You&apos;re on the list — we&apos;ll be in touch
              </span>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@company.com"
                className="flex-1 px-5 py-4 rounded-full bg-foreground/5 border border-foreground/10 text-foreground placeholder-foreground/30 text-sm outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="submit"
                className="px-7 py-4 rounded-full text-primary-foreground text-sm font-bold tracking-wide hover:brightness-110 transition-all whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                  boxShadow: "0 0 30px color-mix(in srgb, var(--primary) 30%, transparent)",
                }}
              >
                Join Waitlist
              </button>
            </form>
          )}

          <p className="mt-6 text-xs text-foreground/25 font-mono tracking-wide">
            No spam. No credit card. Just early access.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-14 flex flex-col items-center gap-3"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-foreground/20 mb-2">
              Recognition
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <AwardBadge type="product-of-the-week"  place={1} />
              <AwardBadge type="product-of-the-day"   place={1} />
              <AwardBadge type="ai-pioneer" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
