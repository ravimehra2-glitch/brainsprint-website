import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Clock, Sparkles, LineChart } from "lucide-react";

const items = [
  { icon: Clock, label: "10 minutes a day" },
  { icon: Sparkles, label: "Personalized insights" },
  { icon: LineChart, label: "Track measurable progress" },
];

export default function TrustStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <section ref={ref} className="border-b border-[var(--color-gray-100)] bg-[var(--color-paper)] px-6 py-10">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-center gap-6 sm:flex-row sm:gap-14">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-2.5 text-[var(--color-gray-700)]"
            >
              <Icon size={16} className="text-[var(--color-growth)]" strokeWidth={1.8} />
              <span className="text-sm font-medium">{item.label}</span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
