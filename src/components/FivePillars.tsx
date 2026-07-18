import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const pillars = [
  { name: "Memory", detail: "Encode, retain, and recall — the infrastructure behind nearly every task.", angle: -90 },
  { name: "Focus", detail: "Sustain attention on one thing while resisting the pull of everything else.", angle: -18 },
  { name: "Reaction Speed", detail: "How quickly your mind perceives and responds.", angle: 54 },
  { name: "Processing Speed", detail: "How quickly you make sense of new information.", angle: 126 },
  { name: "Pattern Recognition", detail: "Spotting structure and trends in complex information.", angle: 198 },
];

export default function FivePillars() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [active, setActive] = useState<number | null>(null);
  const [radius, setRadius] = useState(170);
  const size = 480;
  const c = size / 2;

  useEffect(() => {
    function updateRadius() {
      // Keeps orbit nodes safely inside the viewport on narrow screens.
      const w = window.innerWidth;
      if (w < 360) setRadius(100);
      else if (w < 480) setRadius(130);
      else setRadius(170);
    }
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  return (
    <section id="pillars" ref={ref} className="relative overflow-hidden bg-[var(--color-ink)] px-6 py-32 md:py-40">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 45% at 50% 45%, rgba(90,95,224,0.16), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-focus-soft)]">
          The Cognitive Fitness Framework™
        </p>
        <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
          Five abilities. One framework.
        </h2>

        <div className="relative mx-auto mt-20 h-[420px] w-full max-w-[420px] sm:h-[480px] sm:max-w-[480px]">
          <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {pillars.map((p, i) => {
              const rad = (p.angle * Math.PI) / 180;
              const x = c + Math.cos(rad) * radius;
              const y = c + Math.sin(rad) * radius;
              return (
                <g key={p.name}>
                  <motion.line
                    x1={c}
                    y1={c}
                    x2={x}
                    y2={y}
                    stroke="var(--color-focus-soft)"
                    strokeOpacity={active === i ? 0.55 : 0.18}
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : {}}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                  />
                  {inView && (
                    <motion.circle
                      r="2.5"
                      fill="var(--color-focus-soft)"
                      filter="url(#glow)"
                      initial={{ opacity: 0 }}
                      animate={{
                        cx: [c, x],
                        cy: [c, y],
                        opacity: [0, 0.9, 0],
                      }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        repeatDelay: 1.6,
                        delay: 1 + i * 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[var(--color-focus-soft)]/60 bg-white/[0.06] text-center backdrop-blur-md shadow-[0_0_60px_-10px_rgba(90,95,224,0.5)]"
          >
            <span className="font-display text-sm leading-tight text-white">
              Cognitive
              <br />
              Fitness
            </span>
          </motion.div>

          <motion.div
            animate={inView ? { rotate: 360 } : {}}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            {pillars.map((p, i) => {
              const rad = (p.angle * Math.PI) / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              return (
                <motion.button
                  key={p.name}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                  className="absolute flex w-24 -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
                >
                  <motion.span
                    animate={inView ? { rotate: -360 } : {}}
                    transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
                    className="flex"
                  >
                    <span
                      className={`flex h-16 w-16 items-center justify-center rounded-full border text-xs font-medium transition-all ${
                        active === i
                          ? "border-[var(--color-focus-soft)] bg-[var(--color-focus)] text-white scale-110 shadow-[0_0_30px_-4px_rgba(90,95,224,0.8)]"
                          : "border-white/20 bg-white/[0.05] text-white/70 backdrop-blur-sm"
                      }`}
                    >
                      {p.name.split(" ")[0]}
                    </span>
                  </motion.span>
                </motion.button>
              );
            })}
          </motion.div>

          {active !== null && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-4 left-1/2 w-64 -translate-x-1/2 rounded-xl border border-white/10 bg-white/[0.06] px-5 py-4 text-left backdrop-blur-md"
            >
              <p className="font-display text-base text-white">{pillars[active].name}</p>
              <p className="mt-1 text-xs text-white/60">{pillars[active].detail}</p>
            </motion.div>
          )}
        </div>

        <p className="mt-10 text-sm text-white/40 sm:hidden">
          Tap a pillar to learn what it trains.
        </p>
      </div>
    </section>
  );
}
