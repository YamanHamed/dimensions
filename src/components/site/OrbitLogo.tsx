import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

type Orbit = "A" | "B";
const CENTERS = { A: { x: 160, y: 215 }, B: { x: 160, y: 175 } };
const RX = 150, RY = 59.6;
const ANG = { A: (-45 * Math.PI) / 180, B: (45 * Math.PI) / 180 };
const DOTS: { orbit: Orbit; speed: number; start: { x: number; y: number } }[] = [
  { orbit: "A", speed: 1, start: { x: 160, y: 141 } },
  { orbit: "B", speed: -0.8, start: { x: 81, y: 180 } },
  { orbit: "B", speed: -0.8, start: { x: 239, y: 180 } },
  { orbit: "A", speed: 1, start: { x: 160, y: 299 } },
];
function startParameter(o: Orbit, p: { x: number; y: number }) {
  const c = CENTERS[o], a = ANG[o], dx = p.x - c.x, dy = p.y - c.y;
  const u = dx * Math.cos(a) + dy * Math.sin(a), v = -dx * Math.sin(a) + dy * Math.cos(a);
  return Math.atan2(v / RY, u / RX);
}
function pointOnOrbit(o: Orbit, t: number) {
  const c = CENTERS[o], a = ANG[o], u = RX * Math.cos(t), v = RY * Math.sin(t);
  return { x: c.x + u * Math.cos(a) - v * Math.sin(a), y: c.y + u * Math.sin(a) + v * Math.cos(a) };
}

export function OrbitLogo({ className = "" }: { className?: string }) {
  const dots = useRef<(SVGCircleElement | null)[]>([]);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    let id = 0, last = performance.now(), phase = 0;
    const frame = (now: number) => {
      phase += ((now - last) / 1000) * 0.6; last = now;
      DOTS.forEach((d, i) => {
        const p = pointOnOrbit(d.orbit, startParameter(d.orbit, d.start) + phase * d.speed);
        dots.current[i]?.setAttribute("cx", p.x.toFixed(2));
        dots.current[i]?.setAttribute("cy", p.y.toFixed(2));
      });
      id = requestAnimationFrame(frame);
    };
    id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [reduce]);
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 0.8, delay, ease: [0.65, 0, 0.35, 1] as const },
  });
  return (
    <svg viewBox="0 0 340 400" role="img" aria-label="Dimensions logo" className={className}>
      <g fill="none" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" className="stroke-primary">
        <motion.path {...draw(0)} d="M75 62 H150 C235 62 297 120 297 198 C297 280 235 335 150 335 H75 Q45 335 45 305 V92 Q45 62 75 62 Z" />
        <motion.ellipse {...draw(0.2)} cx="175" cy="195" rx="150" ry="59.6" transform="translate(-15 20) rotate(-45 175 195)" />
        <motion.ellipse {...draw(0.35)} cx="175" cy="195" rx="150" ry="59.6" transform="translate(-15 -20) rotate(45 175 195)" />
      </g>
      <g className="fill-accent">
        {DOTS.map((d, i) => (
          <motion.circle key={i} ref={(el) => { dots.current[i] = el; }} r="16" cx={d.start.x} cy={d.start.y}
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 + i * 0.08, type: "spring", stiffness: 300, damping: 15 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }} />
        ))}
      </g>
    </svg>
  );
}
