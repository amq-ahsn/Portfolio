import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Home" },
  { id: "intro", label: "About" },
  { id: "services", label: "Services" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "blog", label: "Journal" },
  { id: "contact", label: "Connect" },
];

export default function ScrollSpy() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex">
      {sections.map((s) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            className="group flex items-center gap-3"
            aria-label={s.label}
          >
            <span
              className={`text-[11px] uppercase tracking-[0.15em] transition-all duration-300 ${
                isActive ? "text-cyan-300 opacity-100" : "text-muted opacity-0 group-hover:opacity-100"
              }`}
            >
              {s.label}
            </span>
            <span className="relative grid h-3 w-3 place-items-center">
              <span
                className={`rounded-full transition-all duration-300 ${
                  isActive ? "h-1.5 w-1.5 bg-cyan-300" : "h-1.5 w-1.5 bg-[var(--muted)] opacity-50 group-hover:opacity-100"
                }`}
              />
              {isActive && (
                <motion.span
                  layoutId="spy-ring"
                  className="absolute inset-0 rounded-full border border-cyan-300/70"
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
