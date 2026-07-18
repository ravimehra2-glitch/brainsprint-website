import { type ReactNode } from "react";
import { motion } from "framer-motion";

export default function PhoneMockup({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto h-[520px] w-[260px] rounded-[2.5rem] border-[6px] border-[var(--color-gray-900)] bg-[var(--color-gray-900)] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.5)]">
      <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-[var(--color-gray-900)]" />
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-[var(--color-paper)]">
        {children}
      </div>
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-[var(--color-growth)]/10 blur-2xl"
      />
    </div>
  );
}
