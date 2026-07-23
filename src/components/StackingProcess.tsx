import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { processSteps } from "../lib/data";

const colors = ["#22d3ee", "#3b82f6", "#a855f7", "#5eead4", "#38bdf8", "#c084fc"];

function StackCard({
  i,
  total,
  progress,
}: {
  i: number;
  total: number;
  progress: any;
}) {
  const step = processSteps[i];
  const start = i / total;
  const end = (i + 1) / total;
  // each card scales down slightly as the next one comes over it
  const scale = useTransform(progress, [start, 1], [1, 1 - (total - i) * 0.04]);
  const rotate = useTransform(progress, [start, end], [i % 2 ? 2 : -2, 0]);
  const c = colors[i % colors.length];

  return (
    <div className="sticky top-0 flex h-screen items-center justify-center">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 22}px)` }}
        className="relative w-full max-w-3xl"
      >
        <motion.div
          style={{ rotate }}
          className="relative overflow-hidden rounded-3xl glass glow-border p-8 md:p-14"
        >
          <div
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
            style={{ background: `radial-gradient(circle, ${c}, transparent)` }}
          />
          <div className="grid-bg absolute inset-0 opacity-30" />
          <div className="relative flex items-start gap-6">
            <span
              className="text-6xl font-bold leading-none md:text-8xl"
              style={{ color: c, opacity: 0.9 }}
            >
              {step.n}
            </span>
            <div className="pt-2">
              <h3 className="text-2xl font-bold md:text-4xl">{step.title}</h3>
              <p className="mt-3 max-w-md text-muted md:text-lg">{step.desc}</p>
              <div className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted">
                Step {i + 1} of {total}
                <span className="h-px w-16" style={{ background: c }} />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function StackingProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const total = processSteps.length;

  return (
    <section className="section-pad relative py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Process
        </span>
        <h2 className="mt-5 text-3xl font-bold md:text-5xl">
          <span className="grad-text">How I work</span>
        </h2>
        <p className="mt-4 text-muted">
          Scroll through my workflow — each step stacks into focus.
        </p>
      </div>

      <div ref={ref} className="relative mt-10">
        {processSteps.map((_, i) => (
          <StackCard key={i} i={i} total={total} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
