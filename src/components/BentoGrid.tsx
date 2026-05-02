"use client";

import { cn } from "@/lib/utils";
import {
  BookOpen,
  Cpu,
  GitBranch,
  Globe,
  Lock,
  Puzzle,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────── */
export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
}

interface BentoGridProps {
  items?: BentoItem[];
}

/* ─── Drift AI default items ────────────────────────── */
const driftItems: BentoItem[] = [
  {
    title: "Knowledge Vault",
    meta: "Any file format",
    description:
      "Upload your firm's regulations, filings, SOPs, and case files. The Vault becomes the single source of truth — every answer is cited back to the source doc.",
    icon: <BookOpen className="w-4 h-4" />,
    status: "Core",
    tags: ["PDF", "DOCX", "CSV", "HTML"],
    colSpan: 2,
    hasPersistentHover: true,
    cta: "Explore Vault →",
  },
  {
    title: "AI Reasoning Engine",
    meta: "< 50ms",
    description:
      "Specialized on your industry's language, compliance rules, and terminology — not a generic model.",
    icon: <Cpu className="w-4 h-4" />,
    status: "Live",
    tags: ["Adaptive", "Cited"],
    cta: "See Models →",
  },
  {
    title: "Workflow Builder",
    meta: "Zero code",
    description:
      "Chain actions end-to-end: research → draft → review → route → send. Set triggers once, run forever.",
    icon: <GitBranch className="w-4 h-4" />,
    status: "New",
    tags: ["Triggers", "Actions", "Approvals"],
    colSpan: 2,
    cta: "Build Now →",
  },
  {
    title: "Compliance Guard",
    meta: "SOC 2 · HIPAA",
    description:
      "Every AI output checked against your compliance rules before delivery. Full audit trail included.",
    icon: <Lock className="w-4 h-4" />,
    status: "Always On",
    tags: ["Audit", "Guardrails"],
    cta: "Learn More →",
  },
  {
    title: "200+ Integrations",
    meta: "Slack · Notion · Linear",
    description:
      "Embedded natively into the tools your team already uses. No new tab, no context switching.",
    icon: <Puzzle className="w-4 h-4" />,
    status: "Available",
    tags: ["Native", "API", "Webhooks"],
    colSpan: 2,
    cta: "Browse →",
  },
  {
    title: "Any Industry",
    meta: "6 verticals",
    description:
      "Financial services, healthcare, real estate, HR, accounting, and insurance — each with its own Vault template.",
    icon: <Globe className="w-4 h-4" />,
    status: "Global",
    tags: ["Finance", "Health", "Legal"],
    cta: "Choose Yours →",
  },
];

/* ════════════════════════════════════════════════════ */
export function BentoGrid({ items = driftItems }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            /* layout */
            "group relative p-5 rounded-2xl overflow-hidden transition-all duration-300",
            /* base glass card */
            "border border-[#c9a84c]/12 bg-[#0d0d0a]",
            /* hover lift + glow */
            "hover:shadow-[0_0_0_1px_rgba(201,168,76,0.2),0_8px_32px_rgba(201,168,76,0.08)]",
            "hover:-translate-y-0.5 will-change-transform",
            /* persistent hover variant */
            item.hasPersistentHover && [
              "-translate-y-0.5",
              "shadow-[0_0_0_1px_rgba(201,168,76,0.18),0_8px_32px_rgba(201,168,76,0.07)]",
            ],
            /* col span */
            item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
          )}
        >
          {/* ── Dot-grid texture (shows on hover / persistent) ── */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100",
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,168,76,0.06)_1px,transparent_1px)] bg-[length:18px_18px]" />
          </div>

          {/* ── Top-edge gold shine ─────────────────────────── */}
          <div
            className={cn(
              "absolute top-0 left-[15%] right-[15%] h-px transition-opacity duration-300",
              "bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent",
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100",
            )}
          />

          {/* ── Card content ────────────────────────────────── */}
          <div className="relative flex flex-col space-y-3">

            {/* Header row */}
            <div className="flex items-center justify-between">
              {/* Icon */}
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                  "bg-[#c9a84c]/10 text-[#c9a84c]/70",
                  "group-hover:bg-[#c9a84c]/20 group-hover:text-[#c9a84c]",
                )}
              >
                {item.icon}
              </div>

              {/* Status badge */}
              <span
                className={cn(
                  "text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full",
                  "bg-[#c9a84c]/08 text-[#c9a84c]/60 border border-[#c9a84c]/15",
                  "transition-colors duration-300",
                  "group-hover:bg-[#c9a84c]/15 group-hover:text-[#c9a84c]/90 group-hover:border-[#c9a84c]/30",
                )}
              >
                {item.status ?? "Active"}
              </span>
            </div>

            {/* Title + description */}
            <div className="space-y-2">
              <h3
                className="font-semibold text-white/90 tracking-tight text-[15px] group-hover:text-white transition-colors duration-200"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {item.title}
                {item.meta && (
                  <span className="ml-2 text-[11px] text-[#c9a84c]/50 font-mono font-normal tracking-wide">
                    {item.meta}
                  </span>
                )}
              </h3>
              <p className="text-sm text-white/45 leading-relaxed group-hover:text-white/60 transition-colors duration-200">
                {item.description}
              </p>
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between mt-1 pt-2 border-t border-[#c9a84c]/08 group-hover:border-[#c9a84c]/15 transition-colors duration-300">
              {/* Tags */}
              <div className="flex items-center flex-wrap gap-1.5">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className={cn(
                      "px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide",
                      "bg-[#c9a84c]/06 text-[#c9a84c]/55 border border-[#c9a84c]/10",
                      "transition-all duration-200",
                      "hover:bg-[#c9a84c]/12 hover:text-[#c9a84c]/80",
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <span className="text-[11px] font-mono text-[#c9a84c]/0 group-hover:text-[#c9a84c]/70 transition-all duration-300 whitespace-nowrap ml-3 flex-shrink-0">
                {item.cta ?? "Explore →"}
              </span>
            </div>
          </div>

          {/* ── Gradient border glow (behind card) ─────────── */}
          <div
            className={cn(
              "absolute inset-0 -z-10 rounded-2xl",
              "bg-gradient-to-br from-[#c9a84c]/0 via-[#c9a84c]/04 to-[#c9a84c]/0",
              item.hasPersistentHover
                ? "opacity-100"
                : "opacity-0 group-hover:opacity-100",
              "transition-opacity duration-300",
            )}
          />
        </div>
      ))}
    </div>
  );
}
