import { lazy, Suspense, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import PageHero from "../components/PageHero";
import { Reveal, GlassCard, SectionHeading } from "../components/ui";
import { VelocityMarquee } from "../components/scroll";
import { skills, achievements } from "../lib/data";

const SkillsGalaxy = lazy(() => import("../three/SkillsGalaxy"));

const cats = ["Frontend", "Styling", "Animation", "3D", "Tools"];

function Bar({ name, level }: { name: string; level: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted">{level}%</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full grad-accent"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <>
      <PageHero
        eyebrow="Skills"
        title="Capabilities & craft"
        desc="A breakdown of the technologies I work with daily, from core languages to the 3D and motion stack."
      />

      <section className="section-pad pb-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Constellation" title="An interactive skill galaxy" desc="Drag your eyes across the orbiting technologies that power my work." />
          </div>
          <div className="h-[360px] md:h-[440px]">
            <Suspense fallback={<div className="grid h-full place-items-center text-muted">Loading…</div>}>
              <SkillsGalaxy />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="section-pad py-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cats.map((c, i) => (
            <Reveal key={c} delay={i * 0.05}>
              <GlassCard glow className="h-full">
                <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">{c}</h3>
                <div className="space-y-4">
                  {skills.filter((s) => s.cat === c).map((s) => (
                    <Bar key={s.name} name={s.name} level={s.level} />
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad py-12">
        <SectionHeading center eyebrow="Tech Cloud" title="Everything I touch" />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.02}>
              <span
                className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm transition-all hover:border-cyan-400/50 hover:text-cyan-200"
                style={{ fontSize: `${0.85 + (s.level / 100) * 0.6}rem` }}
              >
                {s.name}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="relative my-6 overflow-hidden border-y border-white/10 py-5">
        <VelocityMarquee baseVelocity={2.5}>
          {["React", "TypeScript", "Three.js", "GSAP", "Tailwind", "Next.js", "Framer Motion", "WebGL", "Python"].map((t, i) => (
            <span key={i} className="mx-6 text-xl font-semibold text-muted md:text-2xl">
              {t} <span className="text-cyan-400">✦</span>
            </span>
          ))}
        </VelocityMarquee>
      </div>

      <section className="section-pad pb-24">
        {/* <SectionHeading eyebrow="Certifications" title="Verified expertise" /> */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.slice(0, 6).map((a, i) => (
            <Reveal key={a.title} delay={i * 0.05}>
              <GlassCard glow className="flex items-center gap-3">
                <BadgeCheck className="h-6 w-6 shrink-0 text-cyan-300" />
                <div>
                  <p className="text-sm font-semibold leading-tight">{a.title}</p>
                  <p className="text-xs text-muted">{a.org} · {a.year}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
