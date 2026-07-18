import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Seo from "./Seo";

interface LegalPageLayoutProps {
  title: string;
  updated?: string;
  children: ReactNode;
  description: string;
  path: string;
}

export default function LegalPageLayout({
  title,
  updated,
  children,
  description,
  path,
}: LegalPageLayoutProps) {
  return (
    <div className="bg-[var(--color-paper)] px-6 pb-32 pt-40">
      <Seo title={`${title} — BrainSprint`} description={description} path={path} />
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-gray-500)] transition-colors hover:text-[var(--color-gray-900)]"
        >
          <ArrowLeft size={14} />
          Back to BrainSprint
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 font-display text-4xl leading-tight text-[var(--color-gray-900)]"
        >
          {title}
        </motion.h1>

        {updated && (
          <p className="mt-3 text-sm text-[var(--color-gray-500)]">
            Last updated: {updated}
          </p>
        )}

        <div className="prose-legal mt-10 space-y-6 text-[15px] leading-relaxed text-[var(--color-gray-700)]">
          {children}
        </div>
      </div>
    </div>
  );
}
