import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import { TrendingUp, Sparkles, Brain } from "lucide-react";
import RadarChart from "./RadarChart";
import MagneticButton from "./MagneticButton";
import { APP_URL } from "../lib/constants";

// Illustrative sample data — two states representing "early days" vs "months later".
// Flagged in the design spec as needing real/realistic data before production;
// these values are directional placeholders, not live user data.
const early = {
  points: [20, 24, 22, 28, 26, 30],
  label: "Week 1–2",
  headline: "Just getting started",
  brainScore: 512,
  radar: [35, 42, 30, 38, 25],
  insights: [{ icon: Sparkles, text: "Your first Focus sprint is in the books." }],
  strength: null as string | null,
  developing: "Pattern Recognition",
  week: [10, 0, 15, 0, 20, 0, 0],
};

const later = {
  points: [20, 28, 26, 38, 42, 40, 52, 58, 55, 68, 72, 80],
  label: "Month 1–6",
  headline: "Steady, compounding growth",
  brainScore: 748,
  radar: [78, 82, 60, 70, 55],
  insights: [
    { icon: TrendingUp, text: "Focus sessions are strongest in the morning." },
    { icon: Sparkles, text: "Pattern Recognition is up 34% since week one." },
  ],
  strength: "Focus",
  developing: "Reaction Speed",
  week: [22, 18, 25, 15, 28, 20, 12],
};

const pillarLabels = ["Memory", "Focus", "Reaction", "Processing", "Patterns"];

function buildPath(points: number[], w: number, h: number) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = w / (points.length - 1);
  return points
    .map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * (h - 20) - 10;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

export default function Dashboard() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [later_, setLater] = useState(false);
  const data = later_ ? later : early;

  const path = useMemo(() => buildPath(data.points, 460, 160), [data]);
  const maxWeek = Math.max(...data.week, 1);

  return (
    <section id="dashboard" ref={ref} className="bg-[var(--color-paper-dim)] px-6 py-32 md:py-40">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-growth)]">
            Your Cognitive Dashboard
          </p>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl leading-tight text-[var(--color-gray-900)] sm:text-4xl md:text-5xl">
            Numbers tell you where you are. Insight tells you why.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 rounded-3xl border border-[var(--color-gray-100)] bg-white/80 p-6 shadow-[0_30px_90px_-30px_rgba(0,0,0,0.2)] backdrop-blur-xl md:p-10"
        >
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-gray-500)]">{data.label}</p>
              <p className="mt-1 font-display text-xl text-[var(--color-gray-900)]">{data.headline}</p>
            </div>
            <div className="flex rounded-full border border-[var(--color-gray-100)] bg-[var(--color-paper)] p-1 text-xs">
              <button
                onClick={() => setLater(false)}
                aria-pressed={!later_}
                className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
                  !later_ ? "bg-[var(--color-growth)] text-white" : "text-[var(--color-gray-500)]"
                }`}
              >
                Early days
              </button>
              <button
                onClick={() => setLater(true)}
                aria-pressed={later_}
                className={`rounded-full px-3 py-1.5 font-medium transition-colors ${
                  later_ ? "bg-[var(--color-growth)] text-white" : "text-[var(--color-gray-500)]"
                }`}
              >
                Months later
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.3fr_1fr_1fr]">
            {/* Trend + brain score */}
            <div>
              <div className="flex items-baseline gap-3">
                <Brain size={18} className="text-[var(--color-growth)]" strokeWidth={1.6} />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={later_ ? "score-later" : "score-early"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="tabular font-display text-3xl text-[var(--color-gray-900)]"
                  >
                    {data.brainScore}
                  </motion.p>
                </AnimatePresence>
                <span className="text-xs text-[var(--color-gray-500)]">Brain Score</span>
              </div>

              <svg viewBox="0 0 460 160" className="mt-4 w-full" aria-hidden="true">
                <AnimatePresence mode="wait">
                  <motion.path
                    key={later_ ? "later" : "early"}
                    d={path}
                    fill="none"
                    stroke="var(--color-growth)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                </AnimatePresence>
              </svg>

              <div className="mt-2 flex gap-6 text-xs text-[var(--color-gray-500)]">
                {data.strength && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-growth)]" />
                    Strength: {data.strength}
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-amber)]" />
                  Developing: {data.developing}
                </span>
              </div>

              {/* Weekly consistency heat strip */}
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-gray-500)]">
                  This week
                </p>
                <div className="mt-2 flex gap-1.5">
                  {data.week.map((v, i) => (
                    <div
                      key={i}
                      className="h-6 flex-1 rounded"
                      style={{
                        background:
                          v === 0
                            ? "var(--color-gray-100)"
                            : `rgba(31,158,122,${0.25 + (v / maxWeek) * 0.6})`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Radar */}
            <div className="flex flex-col items-center rounded-2xl border border-[var(--color-gray-100)] bg-[var(--color-paper)] p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-gray-500)]">
                Five pillars
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={later_ ? "radar-later" : "radar-early"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full max-w-[200px]"
                >
                  <RadarChart values={data.radar} labels={pillarLabels} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* AI coach insights */}
            <div className="flex flex-col gap-3">
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-gray-500)]">
                Coach notes
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={later_ ? "later-insights" : "early-insights"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-3"
                >
                  {data.insights.map((ins, i) => {
                    const Icon = ins.icon;
                    return (
                      <motion.div
                        key={ins.text}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                        className="flex items-start gap-3 rounded-xl border border-[var(--color-gray-100)] bg-[var(--color-paper)] p-4"
                      >
                        <Icon size={18} className="mt-0.5 shrink-0 text-[var(--color-growth)]" strokeWidth={1.6} />
                        <p className="text-sm text-[var(--color-gray-700)]">{ins.text}</p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        <div className="mt-10 text-center">
          <MagneticButton variant="primary" href={APP_URL}>
            See Your Own Dashboard
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
