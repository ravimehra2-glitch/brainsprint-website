import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function MagneticButton({
  children,
  variant = "primary",
  onClick,
  href,
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.25, y: y * 0.25 });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-8 h-14 text-[15px] font-medium transition-colors duration-200 focus-visible:outline-2";

  const styles =
    variant === "primary"
      ? "bg-[var(--color-growth)] text-white hover:bg-[#1c8a6a]"
      : "bg-transparent text-current border border-current/25 hover:border-current/50";

  const MotionTag = href ? motion.a : motion.button;

  return (
    <MotionTag
      ref={ref as never}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.3 }}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </MotionTag>
  );
}
