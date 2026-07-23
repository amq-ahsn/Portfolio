import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const x = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <motion.div
      style={{ scaleX: x }}
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left grad-accent"
    />
  );
}
