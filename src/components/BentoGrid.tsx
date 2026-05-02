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

export function BentoGrid({ items = driftItems }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 max-w-7xl mx-auto">
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "group relative p-5 rounded-2xl overflow-hidden transition-all duration-300",
            "border border-primary/12 bg-card",
            "hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_20%,transparent),0_8px_32px_color-mix(in_srgb,var(--primary)_8%,transparent)]",
            "hover:-translate-y-0.5 will-change-transform",
            item.hasPersistentHover && [
              "-translate-y-0.5",
              "shadow-[0_0_0_1px_color-mix(in_srgb,var(--primary)_18%,transparent),0_8px_32px_color-mix(in_srgb,var(--primary)_7%,transparent)]",
            ],
            item.colSpan === 2 ? "md:col-span-2" : "col-span-1",
          )}
        >
          {/* Dot-grid texture */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,74,64,0.06)_1px,transparent_1px)] bg-[length:18px_18px]" />
          </div>

          {/* Top-edge shine */}
          <div
            className={cn(
              "absolute top-0 left-[15%] right-[15%] h-px transition-opacity duration-300",
              "bg-gradient-to-r from-transparent via-primary/40 to-transparent",
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            )}
          />

          <div className="relative flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                  "bg-primary/10 text-primary/70",
                  "group-hover:bg-primary/20 group-hover:text-primary",
                )}
              >
                {item.icon}
              </div>

              <span
                className={cn(
                  "text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full",
                  "bg-primary/8 text-primary/60 border border-primary/15",
                  "transition-colors duration-300",
                  "group-hover:bg-primary/15 group-hover:text-primary/90 group-hover:border-primary/30",
                )}
              >
                {item.status ?? "Active"}
              </span>
            </div>

            <div className="space-y-2">
              <h3
                className="font-semibold text-foreground/90 tracking-tight text-[15px] group-hover:text-foreground transition-colors duration-200"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {item.title}
                {item.meta && (
                  <span className="ml-2 text-[11px] text-primary/50 font-mono font-normal tracking-wide">
                    {item.meta}
                  </span>
                )}
              </h3>
              <p className="text-sm text-foreground/45 leading-relaxed group-hover:text-foreground/60 transition-colors duration-200">
                {item.description}
              </p>
            </div>

            <div className="flex items-center justify-between mt-1 pt-2 border-t border-primary/8 group-hover:border-primary/15 transition-colors duration-300">
              <div className="flex items-center flex-wrap gap-1.5">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className={cn(
                      "px-2 py-0.5 rounded-md text-[10px] font-mono tracking-wide",
                      "bg-primary/6 text-primary/55 border border-primary/10",
                      "transition-all duration-200",
                      "hover:bg-primary/12 hover:text-primary/80",
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="text-[11px] font-mono text-primary/0 group-hover:text-primary/70 transition-all duration-300 whitespace-nowrap ml-3 flex-shrink-0">
                {item.cta ?? "Explore →"}
              </span>
            </div>
          </div>

          <div
            className={cn(
              "absolute inset-0 -z-10 rounded-2xl",
              "bg-gradient-to-br from-primary/0 via-primary/4 to-primary/0",
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100",
              "transition-opacity duration-300",
            )}
          />
        </div>
      ))}
    </div>
  );
}
