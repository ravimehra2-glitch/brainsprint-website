import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Bell, Flame } from "lucide-react";

// Organic rhythm — heights vary naturally, no calendar grid, no red "missed" marks.
const rhythm = [40, 55, 35, 62, 48, 30, 58, 66, 44, 52, 38, 60, 70, 50];
const weekDots = [true, true, false, true, true, true, false];
const weeklyGoalPct = 0.72;

export default function HabitFormation() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const r = 34;
  const circumference = 2 * Math.PI * r;

  return (
    <section ref={ref} className="bg-[var(--color-paper)] px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl leading-tight text-[var(--color-gray-900)] sm:text-4xl">
            Built for real life, not perfect streaks.
          </h2>
          <p className="mt-4 max-w-md text-[var(--color-gray-700)]">
            A quiet reminder, a flexible session, and a rhythm that
            forgives an off day — because consistency beats perfection.
          </p>

          <div className="mt-10 flex items-center gap-8">
            <div className="relative h-24 w-24">
              <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
                <circle cx="40" cy="40" r={r} fill="none" stroke="var(--color-gray-100)" strokeWidth="6" />
                <motion.circle
                  cx="40"
                  cy="40"
                  r={r}
                  fill="none"
                  stroke="var(--color-growth)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={inView ? { strokeDashoffset: circumference * (1 - weeklyGoalPct) } : {}}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="tabular font-display text-lg text-[var(--color-gray-900)]">72%</span>
                <span className="text-[9px] text-[var(--color-gray-500)]">weekly goal</span>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-[var(--color-amber)]/30 bg-[var(--color-amber)]/10 px-4 py-2">
              <Flame size={16} className="text-[var(--color-amber)]" strokeWidth={1.8} />
              <span className="tabular text-sm font-medium text-[var(--color-gray-900)]">12-day streak</span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            {weekDots.map((done, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.5 + i * 0.06 }}
                className={`h-2.5 w-2.5 rounded-full ${
                  done ? "bg-[var(--color-growth)]" : "bg-[var(--color-gray-100)]"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex w-full max-w-xs items-start gap-3 rounded-2xl border border-[var(--color-gray-100)] bg-[var(--color-paper-dim)] p-4 shadow-sm"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-growth)]/10 text-[var(--color-growth)]">
              <Bell size={16} strokeWidth={1.8} />
            </span>
            <div>
              <p className="font-display text-sm text-[var(--color-gray-900)]">BrainSprint</p>
              <p className="text-xs text-[var(--color-gray-500)]">
                Good morning — your Focus sprint is ready whenever you are.
              </p>
            </div>
          </motion.div>

          <div className="flex h-24 items-end justify-center gap-2 sm:gap-2.5">
            {rhythm.map((v, i) => (
              <motion.div
                key={i}
                initial={{ height: 0, opacity: 0 }}
                animate={inView ? { height: v, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
                className="w-2.5 rounded-full bg-[var(--color-growth)]/70 sm:w-3"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
