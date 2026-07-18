import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { HeartPulse, Footprints, Flame, Brain, Focus, Zap } from "lucide-react";

const pulsePath = "M0,60 L40,60 L55,20 L70,100 L85,60 L100,60 L115,40 L130,60 L170,60";
const trendPath = "M0,90 C40,85 60,70 90,55 C120,40 150,35 170,15";

const bodyMetrics = [
  { icon: HeartPulse, label: "Resting heart rate", value: "58 bpm" },
  { icon: Footprints, label: "Daily steps", value: "8,240" },
  { icon: Flame, label: "Active minutes", value: "42 min" },
];

const mindMetrics = [
  { icon: Brain, label: "Memory recall", value: "+18%" },
  { icon: Focus, label: "Sustained focus", value: "12 min" },
  { icon: Zap, label: "Reaction speed", value: "310 ms" },
];

export default function CognitiveFitness() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [morphed, setMorphed] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setMorphed(true), 1400);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section ref={ref} className="bg-[var(--color-paper)] px-6 py-32 md:py-40">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl leading-tight text-[var(--color-gray-900)] sm:text-4xl md:text-5xl"
          >
            Your body deserves exercise.
            <br />
            Your mind deserves it too.
          </motion.h2>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto_1fr]">
          <div className="flex flex-col gap-3">
            {bodyMetrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={
                    inView
                      ? { opacity: morphed ? 0.35 : 1, x: 0, scale: morphed ? 0.94 : 1 }
                      : {}
                  }
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                  className="flex items-center gap-3 rounded-xl border border-[var(--color-gray-100)] bg-[var(--color-paper-dim)] px-4 py-3"
                >
                  <Icon size={18} className="text-[var(--color-gray-500)]" strokeWidth={1.6} />
                  <div>
                    <p className="text-xs text-[var(--color-gray-500)]">{m.label}</p>
                    <p className="tabular font-display text-sm text-[var(--color-gray-900)]">{m.value}</p>
                  </div>
                </motion.div>
              );
            })}
            <p className="mt-1 text-center text-xs uppercase tracking-[0.14em] text-[var(--color-gray-500)]">
              Physical fitness
            </p>
          </div>

          <div className="flex flex-col items-center">
            <svg viewBox="0 0 170 120" className="w-40 sm:w-48" aria-hidden="true">
              <motion.path
                d={pulsePath}
                fill="none"
                stroke="var(--color-gray-300)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ opacity: 1 }}
                animate={inView && morphed ? { opacity: 0 } : {}}
                transition={{ duration: 0.5 }}
              />
              <motion.path
                d={trendPath}
                fill="none"
                stroke="var(--color-growth)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={inView && morphed ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <motion.span
              animate={{ x: morphed ? [0, 6, 0] : 0 }}
              transition={{ duration: 1.2, repeat: morphed ? Infinity : 0, repeatDelay: 1.5 }}
              className="mt-1 text-2xl text-[var(--color-gray-300)]"
              aria-hidden="true"
            >
              →
            </motion.span>
          </div>

          <div className="flex flex-col gap-3">
            {mindMetrics.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={m.label}
                  initial={{ opacity: 0, x: 16 }}
                  animate={
                    inView
                      ? { opacity: morphed ? 1 : 0.35, x: 0, scale: morphed ? 1 : 0.94 }
                      : {}
                  }
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.12 }}
                  className="flex items-center gap-3 rounded-xl border border-[var(--color-growth-soft)]/50 bg-[var(--color-growth)]/[0.06] px-4 py-3"
                >
                  <Icon size={18} className="text-[var(--color-growth)]" strokeWidth={1.6} />
                  <div>
                    <p className="text-xs text-[var(--color-gray-500)]">{m.label}</p>
                    <p className="tabular font-display text-sm text-[var(--color-gray-900)]">{m.value}</p>
                  </div>
                </motion.div>
              );
            })}
            <p className="mt-1 text-center text-xs uppercase tracking-[0.14em] text-[var(--color-growth)]">
              Cognitive fitness
            </p>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mx-auto mt-14 max-w-lg text-center text-[var(--color-gray-700)]"
        >
          Cognitive fitness isn't a fixed trait — it's a trainable state,
          built the same way physical fitness is: a little, consistently,
          on purpose.
        </motion.p>
      </div>
    </section>
  );
}
