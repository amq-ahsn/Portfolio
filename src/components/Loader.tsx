import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";

export default function Loader() {
  const { loaded, setLoaded } = useStore();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let cur = 0;
    const id = setInterval(() => {
      cur += Math.random() * 18 + 6;
      if (cur >= 100) {
        cur = 100;
        clearInterval(id);
        setTimeout(() => setLoaded(true), 450);
      }
      setPct(Math.floor(cur));
    }, 160);
    return () => clearInterval(id);
  }, [setLoaded]);

  return (
    <AnimatePresence>
      {!loaded && (
        <motion.div
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#05060a]"
        >
          <div className="grid-bg absolute inset-0 opacity-40" />
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center"
          >
            <div className="mb-6 font-[var(--font-display)] text-5xl font-bold tracking-tight grad-text md:text-7xl">
              {pct}%
            </div>
            <div className="h-px w-56 overflow-hidden bg-white/10 md:w-72">
              <motion.div
                className="h-full grad-accent"
                style={{ width: `${pct}%` }}
              />
            </div>
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-muted">
              Initializing experience
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
