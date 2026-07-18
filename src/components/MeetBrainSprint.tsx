import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TrendingUp, Sparkles, Flame } from "lucide-react";
import PhoneMockup from "./PhoneMockup";

const wave = [30, 40, 35, 55, 48, 65, 58, 78, 70, 88];

const callouts = [
  { icon: TrendingUp, label: "Live trend", detail: "Every session updates your curve instantly.", side: "left", top: "18%" },
  { icon: Sparkles, label: "Plain-language insight", detail: "Not a score — an explanation.", side: "right", top: "42%" },
  { icon: Flame, label: "12-day streak", detail: "Built on consistency, never guilt.", side: "left", top: "68%" },
];

export default function MeetBrainSprint() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const w = 170, h = 90;
  const max = Math.max(...wave);
  const step = w / (wave.length - 1);
  const points = wave.map((v, i) => `${i * step},${h - (v / max) * (h - 14) - 6}`).join(" ");

  return (
    <section id="meet-brainsprint" ref={ref} className="bg-[var(--color-paper)] px-6 py-32 md:py-40">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-growth)]">
          Meet BrainSprint
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight text-[var(--color-gray-900)] sm:text-4xl md:text-5xl">
          A daily cognitive fitness platform — not another puzzle app.
        </h2>

        <div className="relative mx-auto mt-20 flex max-w-3xl items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <PhoneMockup>
              <div className="flex h-full flex-col p-5">
                <p className="text-[10px] uppercase tracking-[0.14em] text-[var(--color-gray-500)]">
                  Your trend
                </p>
                <p className="font-display text-lg text-[var(--color-gray-900)]">Steady improvement</p>
                <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 w-full" aria-hidden="true">
                  <motion.polyline
                    points={points}
                    fill="none"
                    stroke="var(--color-growth)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
                <div className="mt-6 flex-1 space-y-3">
                  <div className="rounded-xl bg-[var(--color-paper-dim)] p-3">
                    <p className="text-[11px] text-[var(--color-gray-700)]">
                      Focus is strongest before noon.
                    </p>
                  </div>
                  <div className="rounded-xl bg-[var(--color-growth)]/10 p-3">
                    <p className="text-[11px] text-[var(--color-growth)]">
                      12-day streak — your longest yet.
                    </p>
                  </div>
                </div>
              </div>
            </PhoneMockup>
          </motion.div>

          {callouts.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, x: c.side === "left" ? -24 : 24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                style={{ top: c.top, [c.side]: "0%" }}
                className={`absolute hidden w-52 rounded-xl border border-[var(--color-gray-100)] bg-white p-4 text-left shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] lg:block ${
                  c.side === "left" ? "-translate-x-[85%]" : "translate-x-[85%]"
                }`}
              >
                <Icon size={16} className="text-[var(--color-growth)]" strokeWidth={1.6} />
                <p className="mt-2 font-display text-sm text-[var(--color-gray-900)]">{c.label}</p>
                <p className="mt-1 text-xs text-[var(--color-gray-500)]">{c.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
