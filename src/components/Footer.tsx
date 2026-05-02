export default function Footer() {
  return (
    <footer className="relative border-t border-primary/15 bg-background py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex-shrink-0"
              style={{
                background: "radial-gradient(circle at 35% 35%, color-mix(in srgb, var(--primary) 80%, white), var(--primary) 50%, color-mix(in srgb, var(--primary) 60%, black))",
              }}
            />
            <span
              className="text-xl font-bold gold-text"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Drift AI
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-foreground/40">
            {["Product", "Pricing", "Docs", "Blog", "Privacy", "Terms"].map((l) => (
              <a key={l} href="#" className="hover:text-primary transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className="section-divider mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/25 font-mono">
          <span>© {new Date().getFullYear()} Drift AI, Inc. All rights reserved.</span>
          <span className="tracking-widest uppercase">
            Your vault · Your AI · Your workflows
          </span>
        </div>
      </div>
    </footer>
  );
}
