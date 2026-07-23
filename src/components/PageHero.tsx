import { motion } from "framer-motion";

export default function PageHero({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <section className="section-pad relative overflow-hidden pt-36 pb-12 md:pt-44 md:pb-16">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <div className="blob h-[28rem] w-[28rem]" style={{ background: "radial-gradient(circle,#3b82f6,transparent)", top: "-30%", right: "-5%" }} />
      <div className="relative">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-cyan-300"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl text-4xl font-bold leading-[1] md:text-7xl"
        >
          <span className="grad-text">{title}</span>
        </motion.h1>
        {desc && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="mt-6 max-w-2xl text-lg text-muted"
          >
            {desc}
          </motion.p>
        )}
      </div>
    </section>
  );
}
