"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";

type BadgeType =
  | "product-of-the-day"
  | "product-of-the-week"
  | "product-of-the-month"
  | "ai-pioneer";

interface AwardBadgeProps {
  type: BadgeType;
  place?: number;
  link?: string;
}

const identityMatrix =
  "1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1";

const maxRotate = 0.25;
const minRotate = -0.25;
const maxScale  = 1;
const minScale  = 0.97;

const bgColors = ["#2a1e1a", "#1e1512", "#140f0d"];

const badgeTitle: Record<BadgeType, string> = {
  "product-of-the-day":   "Product of the Day",
  "product-of-the-week":  "Product of the Week",
  "product-of-the-month": "Product of the Month",
  "ai-pioneer":           "AI Pioneer Award",
};

const foilColors = [
  "hsl(15, 50%, 40%)",
  "hsl(25, 70%, 65%)",
  "hsl(20, 80%, 72%)",
  "hsl(10, 55%, 48%)",
  "hsl(15, 40%, 28%)",
  "hsl(30, 75%, 80%)",
  "rgba(255,235,210,0.85)",
  "transparent",
  "transparent",
  "rgba(255,255,255,0.5)",
];

const DriftMark = () => (
  <g transform="translate(10, 9)">
    <circle cx="18" cy="18" r="14" fill="none"
      stroke="rgba(100,74,64,0.35)" strokeWidth="1" />
    <path
      d="M10 8 L10 28 L18 28 C26 28 31 23 31 18 C31 13 26 8 18 8 Z"
      fill="none"
      stroke="rgba(100,74,64,0.9)"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M13 18 Q16.5 13.5 20 18 Q23.5 22.5 27 18"
      fill="none"
      stroke="rgba(100,74,64,0.65)"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="18" cy="18" r="1.5" fill="rgba(255,224,194,0.8)" />
  </g>
);

export function AwardBadge({ type, place, link }: AwardBadgeProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const [overlayAngle,   setOverlayAngle]   = useState(0);
  const [matrix,         setMatrix]         = useState(identityMatrix);
  const [currentMatrix,  setCurrentMatrix]  = useState(identityMatrix);
  const [animFrozen,     setAnimFrozen]     = useState(false);
  const [transitionOff,  setTransitionOff]  = useState(true);
  const [timeoutDone,    setTimeoutDone]    = useState(false);

  const tEnter  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tLeave1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tLeave2 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tLeave3 = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rect = () => {
    const el = ref.current;
    if (!el) return { left: 0, right: 0, top: 0, bottom: 0 };
    const r = el.getBoundingClientRect();
    return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
  };

  const buildMatrix = (cx: number, cy: number) => {
    const { left, right, top, bottom } = rect();
    const xC = (left + right) / 2;
    const yC = (top  + bottom) / 2;

    const scale = [
      maxScale - (maxScale - minScale) * Math.abs(xC - cx) / (xC - left),
      maxScale - (maxScale - minScale) * Math.abs(yC - cy) / (yC - top),
      maxScale - (maxScale - minScale) * (Math.abs(xC - cx) + Math.abs(yC - cy)) / (xC - left + yC - top),
    ];

    const r = {
      x1: 0.25  * ((yC - cy) / yC - (xC - cx) / xC),
      x2: maxRotate - (maxRotate - minRotate) * Math.abs(right - cx) / (right - left),
      x3: 0,
      y0: 0,
      y2: maxRotate - (maxRotate - minRotate) * (top - cy) / (top - bottom),
      y3: 0,
      z0: -(maxRotate - (maxRotate - minRotate) * Math.abs(right - cx) / (right - left)),
      z1: 0.2 - (0.2 + 0.6) * (top - cy) / (top - bottom),
      z3: 0,
    };

    return `${scale[0]}, ${r.y0}, ${r.z0}, 0, ` +
           `${r.x1}, ${scale[1]}, ${r.z1}, 0, ` +
           `${r.x2}, ${r.y2}, ${scale[2]}, 0, ` +
           `${r.x3}, ${r.y3}, ${r.z3}, 1`;
  };

  const oppositeMatrix = (m: string, clientY: number, onEnter?: boolean) => {
    const { top, bottom } = rect();
    const oppY     = bottom - clientY + top;
    const weaken   = onEnter ? 0.7 : 4;
    const mult     = onEnter ? -1  : 1;

    return m.split(", ").map((v, i) => {
      if ([2, 4, 8].includes(i))  return String(-parseFloat(v) * mult / weaken);
      if ([0, 5, 10].includes(i)) return "1";
      if (i === 6) return String(mult * (maxRotate - (maxRotate - minRotate) * (top - oppY) / (top - bottom)) / weaken);
      if (i === 9) return String((maxRotate - (maxRotate - minRotate) * (top - oppY) / (top - bottom)) / weaken);
      return v;
    }).join(", ");
  };

  const handleEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    [tLeave1, tLeave2, tLeave3].forEach(t => t.current && clearTimeout(t.current));
    setAnimFrozen(true);

    const { left, right, top, bottom } = rect();
    const xC = (left + right) / 2;
    const yC = (top  + bottom) / 2;

    setTransitionOff(false);
    tEnter.current = setTimeout(() => setTransitionOff(true), 350);

    requestAnimationFrame(() =>
      requestAnimationFrame(() =>
        setOverlayAngle((Math.abs(xC - e.clientX) + Math.abs(yC - e.clientY)) / 1.5)
      )
    );

    const m = buildMatrix(e.clientX, e.clientY);
    setMatrix(oppositeMatrix(m, e.clientY, true));
    setTimeoutDone(false);
    setTimeout(() => setTimeoutDone(true), 200);
  };

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const { left, right, top, bottom } = rect();
    const xC = (left + right) / 2;
    const yC = (top  + bottom) / 2;
    setTimeout(() =>
      setOverlayAngle((Math.abs(xC - e.clientX) + Math.abs(yC - e.clientY)) / 1.5),
    150);
    if (timeoutDone) setCurrentMatrix(buildMatrix(e.clientX, e.clientY));
  };

  const handleLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    if (tEnter.current) clearTimeout(tEnter.current);

    const opp = oppositeMatrix(matrix, e.clientY);
    setCurrentMatrix(opp);
    setTimeout(() => setCurrentMatrix(identityMatrix), 200);

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setTransitionOff(false);
        tLeave1.current = setTimeout(() => setOverlayAngle(a => -a / 4), 150);
        tLeave2.current = setTimeout(() => setOverlayAngle(0), 300);
        tLeave3.current = setTimeout(() => {
          setAnimFrozen(false);
          setTransitionOff(true);
        }, 500);
      })
    );
  };

  useEffect(() => {
    if (timeoutDone) setMatrix(currentMatrix);
  }, [currentMatrix, timeoutDone]);

  const keyframes = Array.from({ length: 10 }, (_, i) => `
    @keyframes driftOverlay${i + 1} {
      0%   { transform: rotate(${i * 10}deg); }
      50%  { transform: rotate(${(i + 1) * 10}deg); }
      100% { transform: rotate(${i * 10}deg); }
    }
  `).join(" ");

  const bg = bgColors[(place ?? 2) - 1] ?? bgColors[1];

  return (
    <a
      ref={ref}
      href={link ?? "#waitlist"}
      target={link ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="block w-[180px] sm:w-[260px] cursor-pointer select-none"
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <style>{keyframes}</style>

      <div
        style={{
          transform: `perspective(700px) matrix3d(${matrix})`,
          transformOrigin: "center center",
          transition: "transform 200ms ease-out",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 260 54"
          className="w-full h-auto"
        >
          <defs>
            <filter id="driftBlur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>
            <mask id="driftMask">
              <rect width="260" height="54" fill="white" rx="10" />
            </mask>
            <radialGradient id="bgGlow" cx="50%" cy="0%" r="80%">
              <stop offset="0%"   stopColor="rgba(100,74,64,0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          <rect width="260" height="54" rx="10" fill={bg} />
          <rect width="260" height="54" rx="10" fill="url(#bgGlow)" />

          <rect
            x="0.5" y="0.5" width="259" height="53" rx="9.5"
            fill="transparent"
            stroke="rgba(100,74,64,0.45)"
            strokeWidth="1"
          />
          <rect
            x="3.5" y="3.5" width="253" height="47" rx="7.5"
            fill="transparent"
            stroke="rgba(100,74,64,0.15)"
            strokeWidth="0.75"
          />

          <line
            x1="12" y1="1" x2="248" y2="1"
            stroke="rgba(255,235,210,0.18)"
            strokeWidth="1"
          />

          <text
            fontFamily="'Courier New', monospace"
            fontSize="7.5"
            fontWeight="bold"
            letterSpacing="1.5"
            fill="rgba(100,74,64,0.7)"
            x="52"
            y="21"
          >
            DRIFT AI
          </text>

          <text
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="15"
            fontWeight="bold"
            fill="rgba(255,224,194,0.95)"
            x="52"
            y="40"
          >
            {badgeTitle[type]}{place ? ` #${place}` : ""}
          </text>

          <DriftMark />

          <g style={{ mixBlendMode: "overlay" }} mask="url(#driftMask)">
            {foilColors.map((color, i) => (
              <g
                key={i}
                style={{
                  transform: `rotate(${overlayAngle + i * 10}deg)`,
                  transformOrigin: "center center",
                  transition: !transitionOff ? "transform 200ms ease-out" : "none",
                  animation: animFrozen
                    ? "none"
                    : `driftOverlay${i + 1} 5s infinite`,
                  willChange: "transform",
                }}
              >
                <polygon
                  points="0,0 260,54 260,0 0,54"
                  fill={color}
                  filter="url(#driftBlur)"
                  opacity="0.55"
                />
              </g>
            ))}
          </g>
        </svg>
      </div>
    </a>
  );
}
