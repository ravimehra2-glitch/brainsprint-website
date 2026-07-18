import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sunrise, ListChecks, Timer, ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { APP_URL } from "../lib/constants";

const insights = [
  {
    icon: Sunrise,
    text: "Your Focus scores are consistently strongest before noon.",
    trend: "+12%",
    offsetY: -6,
    rotate: -2,
  },
  {
    icon: ListChecks,
    text: "You've trained Pattern Recognition on 9 of the last 10 days.",
    trend: "9/10",
    offsetY: 14,
    rotate: 1.5,
  },
  {
    icon: Timer,
    text: "Reaction Speed responds best when sessions follow a short break.",
    trend: "-40ms",
    offsetY: -2,
    rotate: -1,
  },
];

export default function PersonalizedInsights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[var(--color-paper)] px-6 py-28 md:py-36">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(40% 35% at 50% 30%, rgba(90,95,224,0.06), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-focus)]">
          Personalized Insights
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight text-[var(--color-gray-900)] sm:text-4xl">
          BrainSprint learns how your mind works — not just what it scores.
        </h2>

        <div className="mt-16 flex flex-col items-center gap-6 sm:flex-row sm:items-stretch sm:justify-center">
          {insights.map((ins, i) => {
            const Icon = ins.icon;
            return (
              <motion.div
                key={ins.text}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: ins.offsetY, rotate: ins.rotate } : {}}
                transition={{ duration: 0.7, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: ins.offsetY - 6, rotate: 0 }}
                className="w-full max-w-xs rounded-2xl border border-[var(--color-gray-100)] bg-white p-5 text-left shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] transition-shadow hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.22)]"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-focus)]/10 text-[var(--color-focus)]">
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-growth)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-growth)]">
                    <ArrowUpRight size={12} strokeWidth={2} />
                    {ins.trend}
                  </span>
                </div>
                <p className="mt-4 font-display text-base leading-snug text-[var(--color-gray-900)]">
                  {ins.text}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16">
          <MagneticButton variant="secondary" href={APP_URL}>
            Get Your Own Insights
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
