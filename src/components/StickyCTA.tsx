import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Brain } from "lucide-react";
import { APP_URL } from "../lib/constants";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.9);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[var(--color-ink)] px-5 py-3.5 text-sm font-medium text-white shadow-[0_15px_40px_-10px_rgba(0,0,0,0.4)] transition-transform hover:scale-[1.03] sm:bottom-8 sm:right-8"
        >
          <Brain size={16} strokeWidth={1.8} className="text-[var(--color-growth-soft)]" />
          Start Training Free
        </motion.a>
      )}
    </AnimatePresence>
  );
}
