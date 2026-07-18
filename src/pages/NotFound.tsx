import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Seo from "../components/Seo";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-32 text-center">
      <Seo
        title="Page Not Found — BrainSprint"
        description="The page you're looking for doesn't exist."
        path="/404"
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-sm font-medium uppercase tracking-[0.18em] text-[var(--color-growth)]"
      >
        404
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 font-display text-3xl leading-tight text-[var(--color-gray-900)] sm:text-4xl"
      >
        This page took a wrong turn.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 max-w-sm text-[var(--color-gray-700)]"
      >
        The page you're looking for doesn't exist or may have moved.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10"
      >
        <Link
          to="/"
          className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--color-growth)] px-8 text-[15px] font-medium text-white transition-colors hover:bg-[#1c8a6a]"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
