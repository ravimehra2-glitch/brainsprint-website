import { motion } from "framer-motion";
import { MessageCircle, Handshake, Lightbulb, Bug } from "lucide-react";
import Seo from "../components/Seo";

const channels = [
  {
    icon: MessageCircle,
    heading: "General Enquiries",
    body: "Questions about BrainSprint, how it works, or anything else on your mind.",
    subject: "General enquiry",
  },
  {
    icon: Handshake,
    heading: "Partnerships",
    body: "Interested in working with BrainSprint — clinics, creators, or organizations.",
    subject: "Partnership enquiry",
  },
  {
    icon: Lightbulb,
    heading: "Feature Suggestions",
    body: "Have an idea that would make your daily sprint better? We read every one.",
    subject: "Feature suggestion",
  },
  {
    icon: Bug,
    heading: "Bug Reports",
    body: "Something not working as expected? Let us know so we can fix it fast.",
    subject: "Bug report",
  },
];

const EMAIL = "hello@brainsprint.online";

export default function Contact() {
  return (
    <div className="bg-[var(--color-paper)] px-6 pb-32 pt-40">
      <Seo
        title="Contact BrainSprint"
        description="Get in touch with BrainSprint for general enquiries, partnerships, feature suggestions, or bug reports."
        path="/contact"
      />
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-growth)]"
        >
          Get in touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 font-display text-4xl leading-tight text-[var(--color-gray-900)] sm:text-5xl"
        >
          We'd love to hear from you.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-4 max-w-lg text-[var(--color-gray-700)]"
        >
          Question, idea, or something that broke? Pick the option below and
          we'll make sure it reaches the right person.
        </motion.p>
      </div>

      <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
        {channels.map((c, i) => {
          const Icon = c.icon;
          const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(c.subject)}`;
          return (
            <motion.a
              key={c.heading}
              href={mailto}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group rounded-2xl border border-[var(--color-gray-100)] bg-[var(--color-paper-dim)] p-6 text-left transition-shadow hover:shadow-[0_20px_50px_-25px_rgba(0,0,0,0.25)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-growth)]/10 text-[var(--color-growth)] transition-colors group-hover:bg-[var(--color-growth)] group-hover:text-white">
                <Icon size={18} strokeWidth={1.6} />
              </span>
              <h2 className="mt-4 font-display text-lg text-[var(--color-gray-900)]">
                {c.heading}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-gray-700)]">
                {c.body}
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-[var(--color-growth)]">
                {EMAIL} →
              </span>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}
