import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Brain, CheckCircle2, Sparkles, TrendingUp } from "lucide-react";
import PhoneMockup from "./PhoneMockup";

const steps = [
  {
    key: "start",
    icon: Brain,
    title: "Focus Sprint",
    sub: "60 seconds · Tap to begin",
  },
  {
    key: "progress",
    icon: Brain,
    title: "In progress…",
    sub: "Stay with it",
  },
  {
    key: "complete",
    icon: CheckCircle2,
    title: "Sprint complete",
    sub: "+40 XP earned",
  },
  {
    key: "insight",
    icon: Sparkles,
    title: "New insight",
    sub: "Focus is trending up this week",
  },
  {
    key: "dashboard",
    icon: TrendingUp,
    title: "Dashboard updated",
    sub: "Your trend just moved",
  },
];

export default function DailyWorkout() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setStep((s) => (s + 1) % steps.length), 2400);
    return () => clearInterval(id);
  }, [inView]);

  useEffect(() => {
    if (steps[step].key !== "progress") {
      setProgress(0);
      return;
    }
    let p = 0;
    const id = setInterval(() => {
      p += 8;
      setProgress(Math.min(p, 100));
    }, 90);
    return () => clearInterval(id);
  }, [step]);

  const current = steps[step];
  const Icon = current.icon;

  return (
    <section ref={ref} className="bg-[var(--color-paper)] px-6 py-32 md:py-40">
      <div className="mx-auto max-w-lg text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-growth)]">
          The Daily Sprint
        </p>
        <h2 className="mt-4 font-display text-3xl leading-tight text-[var(--color-gray-900)] sm:text-4xl">
          One sprint. A few minutes. The whole loop, in one scroll.
        </h2>

        <div className="mt-14">
          <PhoneMockup>
            <div className="flex h-full flex-col items-center justify-center gap-5 p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-4 text-center"
                >
                  <span
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${
                      current.key === "complete"
                        ? "bg-[var(--color-growth)]/15 text-[var(--color-growth)]"
                        : current.key === "insight"
                        ? "bg-[var(--color-focus)]/15 text-[var(--color-focus)]"
                        : "bg-[var(--color-gray-100)] text-[var(--color-gray-700)]"
                    }`}
                  >
                    <Icon size={28} strokeWidth={1.6} />
                  </span>
                  <p className="font-display text-lg text-[var(--color-gray-900)]">
                    {current.title}
                  </p>
                  <p className="text-xs text-[var(--color-gray-500)]">{current.sub}</p>

                  {current.key === "progress" && (
                    <div className="mt-1 h-1.5 w-32 overflow-hidden rounded-full bg-[var(--color-gray-100)]">
                      <motion.div
                        className="h-full bg-[var(--color-growth)]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </PhoneMockup>

          <div className="mt-8 flex justify-center gap-2">
            {steps.map((s, i) => (
              <span
                key={s.key}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  i === step ? "bg-[var(--color-growth)]" : "bg-[var(--color-gray-100)]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
