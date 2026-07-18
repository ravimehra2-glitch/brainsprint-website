import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const fragments = [
  { label: "3 new messages", top: "12%", left: "8%" },
  { label: "Reminder: reply to Priya", top: "22%", left: "68%" },
  { label: "12 unread", top: "58%", left: "12%" },
  { label: "Someone liked your post", top: "70%", left: "62%" },
  { label: "Meeting in 5 minutes", top: "38%", left: "42%" },
  { label: "4 tabs open", top: "80%", left: "35%" },
  { label: "New follower", top: "15%", left: "40%" },
  { label: "Breaking: read now", top: "50%", left: "78%" },
];

export default function AttentionCrisis() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const sentenceOpacity = useTransform(scrollYProgress, [0.55, 0.75], [0, 1]);
  const sentenceY = useTransform(scrollYProgress, [0.55, 0.75], [16, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[260vh] bg-[var(--color-ink)]"
      aria-label="The modern attention crisis"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {fragments.map((f, i) => {
          const start = 0.05 + i * 0.02;
          const end = 0.4 + i * 0.03;
          return (
            <Fragment
              key={f.label}
              label={f.label}
              top={f.top}
              left={f.left}
              progress={scrollYProgress}
              start={start}
              end={end}
              direction={i % 2 === 0 ? 1 : -1}
            />
          );
        })}

        <motion.p
          style={{ opacity: sentenceOpacity, y: sentenceY }}
          className="relative z-10 max-w-3xl px-6 text-center font-display text-3xl leading-snug text-white sm:text-4xl md:text-5xl"
        >
          The world got faster than the mind it was built for.
        </motion.p>
      </div>
    </section>
  );
}

function Fragment({
  label,
  top,
  left,
  progress,
  start,
  end,
  direction,
}: {
  label: string;
  top: string;
  left: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  direction: 1 | -1;
}) {
  const opacity = useTransform(progress, [0, start, end], [0, 0.85, 0]);
  const x = useTransform(progress, [start, end], [0, direction * 140]);
  const y = useTransform(progress, [start, end], [0, -60]);

  return (
    <motion.div
      style={{ top, left, opacity, x, y }}
      className="absolute rounded-xl border border-white/10 bg-white/[0.06] px-4 py-2.5 text-xs text-white/70 backdrop-blur-sm sm:text-sm"
    >
      {label}
    </motion.div>
  );
}
