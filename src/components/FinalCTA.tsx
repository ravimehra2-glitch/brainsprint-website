import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import MagneticButton from "./MagneticButton";
import { APP_URL } from "../lib/constants";

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      className="relative overflow-hidden bg-[var(--color-ink)] px-6 py-36 md:py-48"
    >
      <div className="absolute inset-0">
        <ParticleField density={30} warm interactive={false} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 40%, rgba(31,158,122,0.14), transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl leading-tight text-white sm:text-4xl md:text-5xl"
        >
          Your next sprint is one click away.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton variant="primary" href={APP_URL}>
            Start Your BrainSprint
          </MagneticButton>
          <MagneticButton variant="secondary" className="text-white" href={APP_URL}>
            Play Free Now
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
