import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Star, Trophy } from "lucide-react";

const stages = [
  { label: "Month 1", x: 90, y: 175, icon: Star, achievement: "First streak", score: 540, delay: 0.9 },
  { label: "Month 3", x: 380, y: 95, icon: Award, achievement: "Consistency badge", score: 640, delay: 1.6 },
  { label: "Month 6", x: 700, y: 20, icon: Trophy, achievement: "Peak performer", score: 748, delay: 2.3 },
];

export default function Progress() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--color-ink)] px-6 py-32 md:py-40">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(50% 45% at 50% 30%, rgba(31,158,122,0.14), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl leading-tight text-white sm:text-4xl">
          Small sprints. Compounding growth.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-white/55">
          Six months of consistent daily practice, unfolding — and what
          unlocks along the way.
        </p>
      </div>

      <div className="relative mx-auto mt-20 max-w-5xl">
        <svg viewBox="0 0 800 220" className="w-full overflow-visible" aria-hidden="true">
          <defs>
            <filter id="progress-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <line x1="0" y1="200" x2="800" y2="200" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

          <motion.path
            d="M0,190 C100,180 150,150 220,140 C300,130 340,90 420,80 C500,70 540,50 620,35 C680,25 740,15 800,10"
            fill="none"
            stroke="var(--color-growth)"
            strokeWidth="4"
            strokeLinecap="round"
            filter="url(#progress-glow)"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          />

          {stages.map((s) => {
            const Icon = s.icon;
            return (
              <g key={s.label}>
                <motion.circle
                  cx={s.x}
                  cy={s.y}
                  r="6"
                  fill="var(--color-growth)"
                  filter="url(#progress-glow)"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: s.delay }}
                />
                <foreignObject x={s.x - 55} y={s.y - 78} width="110" height="70" style={{ overflow: "visible" }}>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: s.delay + 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-center backdrop-blur-md"
                  >
                    <Icon size={14} className="text-[var(--color-growth-soft)]" />
                    <p className="font-display text-xs text-white">{s.achievement}</p>
                    <p className="tabular text-[10px] text-white/50">
                      {s.label} · Score {s.score}
                    </p>
                  </motion.div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
        <div className="mt-2 flex justify-between text-xs text-white/40">
          <span>Month 1</span>
          <span>Month 3</span>
          <span>Month 6</span>
        </div>
      </div>
    </section>
  );
}
