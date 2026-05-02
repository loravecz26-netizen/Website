"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-primary/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/70 orb-glow" />
            <div className="absolute inset-[3px] rounded-full bg-background" />
            <div className="absolute inset-[6px] rounded-full bg-gradient-to-br from-primary-foreground/80 to-primary" />
          </div>
          <span
            className="text-xl font-bold tracking-tight gold-text"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Drift AI
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
          {["Product", "Solutions", "Pricing", "Docs", "Company"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="hover:text-primary transition-colors duration-200 tracking-wide"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="hidden md:block text-sm text-foreground/60 hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="#waitlist"
            className="text-sm px-4 py-2 rounded-full bg-primary text-primary-foreground font-semibold hover:brightness-110 transition-all duration-200"
          >
            Get Early Access
          </Link>
        </div>
      </div>
    </nav>
  );
}
