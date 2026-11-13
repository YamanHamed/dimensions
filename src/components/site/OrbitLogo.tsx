import { motion, useReducedMotion } from "motion/react";

// The agency mark: a D outline with two crossing orbits and four dots.
// Only the outline is animated — each stroke draws itself in, then the dots settle.
const DOTS = [
  { cx: 190, cy: 120 },
  { cx: 100, cy: 195 },
  { cx: 250, cy: 195 },
  { cx: 190, cy: 270 },
];

export function OrbitLogo({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const draw = (delay: number) => ({
    initial: reduce ? false : { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] as const },
  });
  return (
    <svg viewBox="0 0 340 400" role="img" aria-label="Dimensions logo" className={className}>
      <g fill="none" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" className="stroke-primary">
        <motion.path {...draw(0)} d="M75 62 H150 C235 62 297 120 297 198 C297 280 235 335 150 335 H75 Q45 335 45 305 V92 Q45 62 75 62 Z" />
        <motion.ellipse {...draw(0.25)} cx="175" cy="195" rx="150" ry="59.6" transform="translate(-15 20) rotate(-45 175 195)" />
        <motion.ellipse {...draw(0.45)} cx="175" cy="195" rx="150" ry="59.6" transform="translate(-15 -20) rotate(45 175 195)" />
      </g>
      <g className="fill-accent">
        {DOTS.map((d, i) => (
          <motion.circle
            key={i}
            r="16"
            cx={d.cx}
            cy={d.cy}
            initial={reduce ? false : { scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.15 + i * 0.08, type: "spring", stiffness: 300, damping: 15 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </g>
    </svg>
  );
}
