import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";
import PageHero from "../components/PageHero";
import { Reveal, GlassCard, SectionHeading } from "../components/ui";
import { experience, education } from "../lib/data";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const lineH = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      <PageHero
        eyebrow="Experience"
        title="Career timeline"
        desc="Three years of shipping fast, beautiful and reliable frontend products across startups, studios and agencies."
      />

      <section className="section-pad pb-16">
        <div ref={ref} className="relative mx-auto max-w-4xl">
          <div className="absolute left-5 top-0 h-full w-px bg-white/10 md:left-1/2" />
          <motion.div style={{ height: lineH }} className="absolute left-5 top-0 w-px grad-accent md:left-1/2" />

          <div className="space-y-12">
            {experience.map((e, i) => (
              <Reveal key={e.company}>
                <div className={`relative flex ${i % 2 ? "md:flex-row-reverse" : ""}`}>
                  <div className="absolute left-5 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-cyan-400/40 bg-[#070912] md:left-1/2">
                    <Briefcase className="h-4 w-4 text-cyan-300" />
                  </div>
                  <div className="ml-14 md:ml-0 md:w-1/2 md:px-10">
                    <GlassCard glow>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-cyan-300">{e.type}</span>
                        <span className="text-xs text-muted">{e.period}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-bold">{e.role}</h3>
                      <p className="text-sm text-cyan-300">{e.company}</p>
                      <ul className="mt-4 space-y-2">
                        {e.points.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-sm text-muted">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400/70" /> {p}
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad pb-24">
        <SectionHeading eyebrow="Education" title="Foundations & certifications" />
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.title} delay={i * 0.05}>
              <GlassCard glow className="flex items-center gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-400/10">
                  <GraduationCap className="h-6 w-6 text-cyan-300" />
                </div>
                <div>
                  <h3 className="font-semibold">{e.title}</h3>
                  <p className="text-sm text-muted">{e.org} · {e.period}</p>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
