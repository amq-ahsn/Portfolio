import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { scrollToTop } from "./SmoothScroll";

export default function ScrollDial() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const dash = useTransform(progress, (v) => `${v * 100}, 100`);
  const pct = useTransform(progress, (v) => Math.round(v * 100));
  const [show, setShow] = useState(false);
  const [label, setLabel] = useState(0);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    const unsub = pct.on("change", (v) => setLabel(v));
    return () => {
      window.removeEventListener("scroll", onScroll);
      unsub();
    };
  }, [pct]);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="group fixed bottom-6 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full glass"
        >
          <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 36 36">
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            <motion.circle
              cx="18" cy="18" r="15.9" fill="none"
              stroke="url(#dialGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength="100"
              style={{ strokeDasharray: dash }}
            />
            <defs>
              <linearGradient id="dialGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
          <span className="relative text-[11px] font-semibold tabular-nums text-[var(--fg)] transition-opacity group-hover:opacity-0">
            {label}%
          </span>
          <ArrowUp className="absolute h-4 w-4 text-cyan-300 opacity-0 transition-opacity group-hover:opacity-100" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
