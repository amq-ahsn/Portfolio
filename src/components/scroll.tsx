import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  wrap,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "../utils/cn";

/* ---------- Apple-style scroll-scrub text (words fill with color) ---------- */
export function ScrollScrubText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <ScrubWord key={i} progress={scrollYProgress} range={[start, end]}>
            {w}
          </ScrubWord>
        );
      })}
    </p>
  );
}

function ScrubWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: any;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <span className="relative mr-[0.28em] mt-[0.12em]">
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
}

/* ---------- Velocity-reactive marquee ---------- */
export function VelocityMarquee({
  children,
  baseVelocity = 3,
  className,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], {
    clamp: false,
  });
  const x = useTransform(baseX, (v) => `${wrap(-25, -75, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={cn("flex flex-nowrap overflow-hidden whitespace-nowrap", className)}>
      <motion.div className="flex flex-nowrap whitespace-nowrap" style={{ x }}>
        {children}
        {children}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

/* ---------- Horizontal progress line tied to a section ---------- */
export function ScrollLine() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="h-px origin-left grad-accent" />;
}

/* ---------- Scroll-driven horizontal scale line that grows in view ---------- */
export function GrowLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.4"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scaleX }} className="h-px origin-left grad-accent" />
    </div>
  );
}

/* ---------- Pinned scroll-zoom image / panel ---------- */
export function ScrollZoom({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1, 1.1]);
  const sscale = useSpring(scale, { stiffness: 100, damping: 30 });
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div style={{ scale: sscale }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
