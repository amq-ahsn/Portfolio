import { Download } from "lucide-react";
import PageHero from "../components/PageHero";
import { Reveal, GlassCard, SectionHeading, GradientButton, Counter } from "../components/ui";
import { ScrollScrubText } from "../components/scroll";
import { profile, values, funFacts, experience, education, stats } from "../lib/data";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Me"
        title="The story behind the pixels"
        desc={profile.summary}
      />

      <section className="section-pad py-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <GlassCard glow className="sticky top-28">
              <div className="aspect-square overflow-hidden rounded-2xl grad-accent p-px">
                <div className="grid h-full w-full place-items-center rounded-2xl bg-[#070912]">
                  <span className="text-6xl font-bold grad-text">AM</span>
                </div>
              </div>
              <h3 className="mt-5 text-xl font-bold">{profile.name}</h3>
              <p className="text-sm text-muted">{profile.role}</p>
              <p className="mt-1 text-sm text-muted">{profile.location}</p>
              <div className="mt-5">
  <a href="/resume.docs" download>
    <GradientButton>
      <Download className="h-4 w-4" />
      Download Resume
    </GradientButton>
  </a>
</div>
            </GlassCard>
          </Reveal>

          <div className="space-y-12">
            <div>
              <SectionHeading eyebrow="Biography" title="Where it began" />
              <ScrollScrubText
                text="I started building for the web at 15, hand-coding HTML pages for fun. That curiosity grew into a career spanning startups, studios and global agencies. Today I focus on the intersection of engineering and design — where motion, 3D and performance combine to create experiences people remember."
                className="mt-5 text-lg font-medium leading-relaxed md:text-xl md:leading-relaxed"
              />
              <Reveal delay={0.15}>
                <p className="mt-4 leading-relaxed text-muted">
                  My mission is simple: make the web feel more human, more alive, and faster for
                  everyone. I believe great frontend work is invisible — it just feels right.
                </p>
              </Reveal>
            </div>

            <div>
              <SectionHeading eyebrow="Values" title="What I stand for" />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {values.map((v, i) => (
                  <Reveal key={v.title} delay={i * 0.05}>
                    <GlassCard glow className="h-full">
                      <h4 className="font-semibold text-cyan-300">{v.title}</h4>
                      <p className="mt-2 text-sm text-muted">{v.desc}</p>
                    </GlassCard>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="By the numbers" title="A snapshot" />
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {stats.slice(0, 4).map((s) => (
                  <Reveal key={s.label}>
                    <GlassCard className="text-center">
                      <div className="text-3xl font-bold grad-text"><Counter value={s.value} suffix={s.suffix} /></div>
                      <p className="mt-1 text-xs text-muted">{s.label}</p>
                    </GlassCard>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Journey" title="Career & education" />
              <div className="mt-6 space-y-3">
                {[...experience.slice(0, 3), ...education.map((e) => ({ role: e.title, company: e.org, period: e.period }))].map((e: any, i) => (
                  <Reveal key={i} delay={i * 0.04}>
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                      <div>
                        <p className="font-medium">{e.role}</p>
                        <p className="text-sm text-muted">{e.company}</p>
                      </div>
                      <span className="text-sm text-muted">{e.period}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <SectionHeading eyebrow="Off the clock" title="Fun facts" />
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {funFacts.map((f, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-muted">
                      <span className="text-cyan-400">✦</span> {f}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
