import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "../lib/data";
import { GradientButton } from "./ui";
import { Github } from "./SocialIcons";

gsap.registerPlugin(ScrollTrigger);

const feat = projects.filter((p) => p.featured);

export default function HorizontalProjects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    if (window.innerWidth < 768) return; // vertical stack on mobile

    const ctx = gsap.context(() => {
      const scrollLen = track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: -scrollLen,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${scrollLen + window.innerHeight * 0.6}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // parallax + depth per card
      const cards = gsap.utils.toArray<HTMLElement>(".hp-card");
      cards.forEach((card) => {
        const img = card.querySelector(".hp-visual");
        const content = card.querySelector(".hp-content");
        if (img) {
          gsap.fromTo(
            img,
            { xPercent: -12, scale: 1.12 },
            {
              xPercent: 12,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        }
        if (content) {
          gsap.fromTo(
            content,
            { opacity: 0, y: 60, rotateY: 8 },
            {
              opacity: 1,
              y: 0,
              rotateY: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 80%",
                end: "left 40%",
                scrub: true,
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative">
      {/* heading */}
      <div className="section-pad pb-2 pt-20 md:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> Featured Work
        </span>
        <h2 className="mt-5 text-3xl font-bold md:text-5xl">
          <span className="grad-text">Cinematic project journey</span>
        </h2>
        <p className="mt-3 max-w-xl text-muted">
          Scroll to glide horizontally through selected builds — each with depth, parallax and motion.
        </p>
      </div>

      {/* pinned horizontal track (desktop) */}
      <div ref={sectionRef} className="relative hidden overflow-hidden md:block">
        <div ref={trackRef} className="flex w-max items-center gap-8 px-[8vw] py-16">
          {feat.map((p, i) => (
            <article
              key={p.id}
              className="hp-card group relative flex h-[62vh] w-[78vw] shrink-0 overflow-hidden rounded-3xl glass lg:w-[64vw]"
              style={{ perspective: 1200 }}
            >
              <div
                className="hp-visual absolute inset-0 will-change-transform"
                style={{ background: `radial-gradient(120% 120% at 30% 20%, ${p.color}33, transparent 60%), linear-gradient(135deg, ${p.color}22, #05060a)` }}
              >
                <div className="grid-bg absolute inset-0 opacity-60" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[14rem] font-bold leading-none opacity-[0.08]" style={{ color: p.color }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="hp-content relative z-10 flex max-w-xl flex-col justify-end p-8 md:p-12">
                <span className="text-xs uppercase tracking-[0.2em]" style={{ color: p.color }}>
                  {p.category} · {p.year}
                </span>
                <h3 className="mt-3 text-4xl font-bold lg:text-6xl">{p.title}</h3>
                <p className="mt-4 max-w-md text-muted">{p.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span key={t} className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs text-muted">{t}</span>
                  ))}
                </div>
                <div className="mt-7 flex gap-3">
                  <a href={p.demo}><GradientButton>Live Demo <ArrowUpRight className="h-4 w-4" /></GradientButton></a>
                  <a href={p.github}><GradientButton variant="ghost"><Github className="h-4 w-4" /> Code</GradientButton></a>
                </div>
              </div>
            </article>
          ))}
          {/* end card */}
          <div className="flex h-[62vh] w-[40vw] shrink-0 flex-col items-center justify-center gap-5 text-center">
            <h3 className="text-3xl font-bold grad-text">Want to see more?</h3>
            <Link to="/projects"><GradientButton>Explore all projects <ArrowUpRight className="h-4 w-4" /></GradientButton></Link>
          </div>
        </div>
      </div>

      {/* mobile vertical fallback */}
      <div className="section-pad space-y-6 py-10 md:hidden">
        {feat.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl glass">
            <div className="relative aspect-video" style={{ background: `linear-gradient(135deg, ${p.color}33, transparent)` }}>
              <div className="grid-bg absolute inset-0" />
              <span className="absolute inset-0 grid place-items-center text-6xl font-bold opacity-20" style={{ color: p.color }}>{p.title.charAt(0)}</span>
            </div>
            <div className="p-6">
              <span className="text-xs uppercase tracking-wider" style={{ color: p.color }}>{p.category} · {p.year}</span>
              <h3 className="mt-2 text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.desc}</p>
              <div className="mt-4 flex gap-3">
                <a href={p.demo}><GradientButton>Demo <ArrowUpRight className="h-4 w-4" /></GradientButton></a>
                <a href={p.github}><GradientButton variant="ghost"><Github className="h-4 w-4" /></GradientButton></a>
              </div>
            </div>
          </div>
        ))}
        <div className="text-center">
          <Link to="/projects"><GradientButton variant="ghost">All Projects <ArrowUpRight className="h-4 w-4" /></GradientButton></Link>
        </div>
      </div>
    </section>
  );
}
