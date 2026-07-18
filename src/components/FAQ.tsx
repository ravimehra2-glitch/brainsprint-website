import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Is BrainSprint a medical or diagnostic tool?",
    a: "No. BrainSprint is a cognitive fitness platform designed for daily practice and self-directed improvement. It does not diagnose, treat, or assess any medical or mental health condition, and it isn't a substitute for professional care.",
  },
  {
    q: "How much time does it take each day?",
    a: "Most sprints take two to five minutes. The platform is built around short, consistent daily sessions rather than long ones.",
  },
  {
    q: "What is the Cognitive Fitness Framework™?",
    a: "It's BrainSprint's structure for five core trainable abilities: Memory, Focus, Reaction Speed, Processing Speed, and Pattern Recognition. Every sprint maps to one of these pillars.",
  },
  {
    q: "Do I need any equipment?",
    a: "No. BrainSprint runs in your browser or on your phone — no equipment, account setup friction, or special hardware required to start.",
  },
  {
    q: "What happens to my data?",
    a: "Your session data is used to build your personal trends and insights. It's yours, and it's used only to power your own dashboard, not sold to third parties.",
  },
  {
    q: "Who is BrainSprint for?",
    a: "Students, professionals, founders, competitive exam aspirants, and anyone who wants to keep their mind sharp — no prior experience or baseline needed.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[var(--color-paper)] px-6 py-28 md:py-36">
      <div className="mx-auto max-w-2xl">
        <h2 className="text-center font-display text-3xl leading-tight text-[var(--color-gray-900)] sm:text-4xl">
          Questions, answered plainly.
        </h2>

        <div className="mt-14 divide-y divide-[var(--color-gray-100)] border-t border-[var(--color-gray-100)]">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left"
                >
                  <span className="font-display text-lg text-[var(--color-gray-900)]">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 text-[var(--color-gray-500)]"
                  >
                    <Plus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[15px] leading-relaxed text-[var(--color-gray-700)]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
