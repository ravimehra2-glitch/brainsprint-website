import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import MagneticButton from "./MagneticButton";
import { APP_URL } from "../lib/constants";

const wave = [4, 7, 5, 9, 8, 12, 10, 15, 13, 18, 16, 22, 19, 25];

export default function Hero() {
  const w = 320;
  const h = 140;
  const step = w / (wave.length - 1);
  const max = Math.max(...wave);
  const points = wave
    .map((v, i) => `${i * step},${h - (v / max) * (h - 20) - 10}`)
    .join(" ");

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-[var(--color-ink)] pt-20"
    >
      <div className="absolute inset-0">
        <ParticleField density={50} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 75% 45%, rgba(90,95,224,0.16), transparent 70%), radial-gradient(45% 40% at 15% 75%, rgba(31,158,122,0.14), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-16 px-6 py-20 md:px-10 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-growth-soft)]"
          >
            A Daily Cognitive Fitness Platform
          </motion.p>

          <h1 className="font-display text-[13vw] leading-[1.02] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            {["Your mind", "deserves a", "workout too."].map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-md text-lg text-white/60"
          >
            Ten minutes a day. Structured cognitive training across five
            core abilities, with real progress you can actually see.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton variant="primary" href={APP_URL}>
              Start Your BrainSprint
            </MagneticButton>
            <MagneticButton variant="secondary" className="text-white" href={APP_URL}>
              Play Free Now
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:justify-self-end"
        >
          <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl shadow-[0_20px_80px_-20px_rgba(0,0,0,0.6)]">
            <p className="text-xs uppercase tracking-[0.14em] text-white/40">
              Cognitive trend
            </p>
            <p className="mt-1 font-display text-2xl text-white">
              Steady improvement
            </p>
            <svg
              viewBox={`0 0 ${w} ${h}`}
              className="mt-6 w-full"
              aria-hidden="true"
            >
              <motion.polyline
                points={points}
                fill="none"
                stroke="var(--color-growth-soft)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <div className="mt-4 flex items-center justify-between text-xs text-white/40">
              <span>8 weeks ago</span>
              <span>Today</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
