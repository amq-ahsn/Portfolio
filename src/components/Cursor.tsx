import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${mx - 3.5}px, ${my - 3.5}px)`;
      }
      const t = e.target as HTMLElement;
      const interactive = t.closest("a, button, [data-cursor]");
      if (ring.current) {
        ring.current.style.opacity = "1";
        ring.current.style.width = interactive ? "60px" : "38px";
        ring.current.style.height = interactive ? "60px" : "38px";
        ring.current.style.borderColor = interactive
          ? "rgba(34,211,238,0.9)"
          : "rgba(255,255,255,0.7)";
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ring.current) {
        const w = parseFloat(ring.current.style.width || "38");
        ring.current.style.transform = `translate(${rx - w / 2}px, ${ry - w / 2}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot hidden md:block" />
      <div ref={ring} className="cursor-ring hidden md:block" style={{ opacity: 0, transition: "width .2s, height .2s, border-color .2s" }} />
    </>
  );
}
