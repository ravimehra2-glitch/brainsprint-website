import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { APP_URL } from "../lib/constants";

interface Testimonial {
  text: string;
  name: string;
  role: string;
  country: string;
  photo?: string;
  stat: string;
}

const quotes: Testimonial[] = [
  {
    text: "I didn't feel different overnight. I got consistent, and eight weeks in, the difference in my focus at work is obvious.",
    name: "Ananya R.",
    role: "Product Manager",
    country: "India",
    stat: "62-day streak",
  },
  {
    text: "It's the first cognitive app that didn't feel like a puzzle game I'd abandon in a week. Ten minutes, every morning, done.",
    name: "Marcus T.",
    role: "Graduate Student",
    country: "United States",
    stat: "+28% Focus score",
  },
  {
    text: "The dashboard actually explains what's happening instead of just throwing a score at me. That's the part that kept me coming back.",
    name: "Fatima K.",
    role: "Founder",
    country: "United Arab Emirates",
    stat: "Early access user",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((i + 1) % quotes.length);
  const prev = () => setI((i - 1 + quotes.length) % quotes.length);
  const current = quotes[i];

  return (
    <section className="relative overflow-hidden bg-[var(--color-ink)] px-6 py-28 md:py-36">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(45% 40% at 50% 20%, rgba(31,158,122,0.08), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-growth-soft)]">
          Real Progress, Real People
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8"
          >
            <p className="font-display text-2xl leading-snug text-white sm:text-3xl">
              "{current.text}"
            </p>

            <div className="mt-8 flex items-center justify-center gap-4">
              {current.photo ? (
                <img
                  src={current.photo}
                  alt={current.name}
                  className="h-12 w-12 rounded-full border border-white/15 object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] font-display text-sm text-white"
                >
                  {current.name.charAt(0)}
                </span>
              )}
              <div className="text-left">
                <p className="text-sm font-medium text-white">{current.name}</p>
                <p className="text-xs text-white/45">
                  {current.role} · {current.country}
                </p>
              </div>
              <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-growth-soft)]/30 bg-[var(--color-growth)]/10 px-3 py-1.5 text-xs text-[var(--color-growth-soft)]">
                <TrendingUp size={12} strokeWidth={2} />
                {current.stat}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-1.5">
            {quotes.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 w-1.5 rounded-full ${
                  idx === i ? "bg-[var(--color-growth)]" : "bg-white/15"
                }`}
              />
            ))}
          </div>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-white/40 hover:text-white"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="mt-14">
          <MagneticButton variant="secondary" href={APP_URL} className="text-white">
            Join Them — Start Free
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
