import { motion } from "framer-motion";
import { Brain, Target, Eye, Sparkles, Compass, CalendarClock } from "lucide-react";
import MagneticButton from "../components/MagneticButton";
import Seo from "../components/Seo";
import { APP_URL } from "../lib/constants";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
};

const sections = [
  {
    icon: Compass,
    heading: "Why BrainSprint Exists",
    body: "Life stopped exercising the mind by default the same day it stopped exercising the body by default. We built BrainSprint because that gap needed a real answer — not another game competing for the attention it claims to protect.",
  },
  {
    icon: Target,
    heading: "Our Mission",
    body: "To make daily cognitive training as normal and accessible as physical exercise — helping people build healthier brain habits through short, science-inspired daily practice.",
  },
  {
    icon: Eye,
    heading: "Our Vision",
    body: "A world where \"brain day\" is as common a phrase as \"leg day\" — where mental fitness is a universal daily habit, measured the way people already measure their steps.",
  },
  {
    icon: Brain,
    heading: "What Cognitive Fitness Means",
    body: "Cognitive fitness is the practice of intentionally strengthening core mental abilities — Memory, Focus, Reaction Speed, Processing Speed, and Pattern Recognition — through short, repeatable exercises. It isn't a test and it isn't intelligence. It's a trainable state.",
  },
  {
    icon: Sparkles,
    heading: "Our Product Philosophy",
    body: "Every metric should explain itself. Every score should become an insight. We build for consistency over intensity, and effort before excellence — a coach, never a clinic.",
  },
  {
    icon: CalendarClock,
    heading: "Why Daily Brain Training Matters",
    body: "The mind responds to consistency far more than intensity. Ten focused minutes a day, sustained over months, does more for cognitive sharpness than an occasional hour of effort — and it's far more sustainable for actual human lives.",
  },
];

export default function About() {
  return (
    <div className="bg-[var(--color-paper)]">
      <Seo
        title="About BrainSprint — Our Mission & Approach"
        description="Learn why BrainSprint exists, our mission and vision, and how the Cognitive Fitness Framework helps people build healthier brain habits."
        path="/about"
      />
      <section className="relative overflow-hidden bg-[var(--color-ink)] px-6 pb-24 pt-40 text-center">
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(50% 45% at 50% 30%, rgba(31,158,122,0.14), transparent 70%)",
          }}
        />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-growth-soft)]"
        >
          About BrainSprint
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-6 max-w-3xl font-display text-4xl leading-tight text-white sm:text-5xl md:text-6xl"
        >
          Building better brain health, one sprint at a time.
        </motion.h1>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.heading}
                initial={fadeUp.initial}
                whileInView={fadeUp.whileInView}
                viewport={fadeUp.viewport}
                transition={{ ...fadeUp.transition, delay: (i % 2) * 0.1 }}
                className="rounded-2xl border border-[var(--color-gray-100)] bg-[var(--color-paper-dim)] p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-growth)]/10 text-[var(--color-growth)]">
                  <Icon size={20} strokeWidth={1.6} />
                </span>
                <h2 className="mt-5 font-display text-xl text-[var(--color-gray-900)]">
                  {s.heading}
                </h2>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-gray-700)]">
                  {s.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-[var(--color-gray-100)] px-6 py-24 text-center md:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-xl font-display text-3xl leading-tight text-[var(--color-gray-900)] sm:text-4xl"
        >
          Your mind deserves a workout too.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10"
        >
          <MagneticButton variant="primary" href={APP_URL}>
            Start Your First BrainSprint
          </MagneticButton>
        </motion.div>
      </section>
    </div>
  );
}
