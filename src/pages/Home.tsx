import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight, Star, Quote, Award, Trophy, Medal, BadgeCheck,
  GitBranch, Mic, Code2, LayoutDashboard, PenTool, Gauge, Boxes, Sparkles, GitFork,
} from "lucide-react";
import {
  Reveal, SectionHeading, GlassCard, Counter, GradientButton, TiltCard, AnimatedText,
  Reveal3D, Parallax,
} from "../components/ui";
import HorizontalProjects from "../components/HorizontalProjects";
import StackingProcess from "../components/StackingProcess";
import ScrollSpy from "../components/ScrollSpy";
import { VelocityMarquee, ScrollScrubText, ScrollZoom } from "../components/scroll";
import {
  stats, services, projects, techEcosystem, experience,
  testimonials, achievements, openSource, posts, profile,
} from "../lib/data";
import { Github, Linkedin, Twitter } from "../components/SocialIcons";

const HeroScene = lazy(() => import("../three/HeroScene"));
const SkillsGalaxy = lazy(() => import("../three/SkillsGalaxy"));

const iconMap: Record<string, any> = {
  Code2, LayoutDashboard, Figma: PenTool, Gauge, Boxes, Sparkles,
  Award, Trophy, Medal, BadgeCheck, GitBranch, Mic,
};

function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`section-pad relative py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentBlur = useTransform(scrollYProgress, [0, 0.6], ["blur(0px)", "blur(8px)"]);
  return (
    <section id="hero" ref={heroRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full" />}>
          <HeroScene />
        </Suspense>
      </div>
      <div className="blob h-[40rem] w-[40rem]" style={{ background: "radial-gradient(circle,#3b82f6,transparent)", top: "-10%", left: "-10%" }} />
      <div className="blob h-[34rem] w-[34rem]" style={{ background: "radial-gradient(circle,#a855f7,transparent)", bottom: "-10%", right: "-10%" }} />
      {/* readability vignette over the 3D scene */}
      <div className="pointer-events-none absolute inset-0 z-[5] bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,6,10,0.55)_75%,rgba(5,6,10,0.9)_100%)]" />

      <motion.div style={{ y: contentY, opacity: contentOpacity, filter: contentBlur }} className="pointer-events-none relative z-10 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-cyan-300"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
          Available for work
        </motion.div>

        <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="block"
          >
            {profile.name}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 block grad-text"
          >
            {profile.role}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mx-auto mt-6 max-w-xl text-base text-muted md:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.8 }}
          className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/projects">
            <GradientButton>View Projects <ArrowRight className="h-4 w-4" /></GradientButton>
          </Link>
          <Link to="/contact">
            <GradientButton variant="ghost">Contact Me</GradientButton>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted"
      >
        <div className="flex flex-col items-center gap-2">
          Scroll
          <span className="h-10 w-px bg-gradient-to-b from-cyan-400 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- Velocity Marquee ---------- */
function Marquee() {
  const items = ["React", "Next.js", "TypeScript", "Three.js", "GSAP", "Tailwind", "Framer Motion", "WebGL", "Node.js"];
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/10 py-6">
      <VelocityMarquee baseVelocity={2}>
        {items.map((it, i) => (
          <span key={i} className="mx-8 text-2xl font-semibold text-muted md:text-3xl">
            {it} <span className="text-cyan-400">✦</span>
          </span>
        ))}
      </VelocityMarquee>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <ScrollSpy />
      <Hero />
      <Marquee />

      {/* SECTION 2 — Intro */}
      <Section id="intro">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div className="absolute -inset-4 rounded-3xl grad-accent opacity-20 blur-2xl" />
              <ScrollZoom className="relative aspect-[4/5] rounded-3xl glass">
                <div className="relative h-full w-full">
                  <div className="grid-bg absolute inset-0" />
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto grid h-28 w-28 place-items-center rounded-full grad-accent text-4xl font-bold text-[#05060a]">aA</div>
                      <p className="mt-4 text-sm text-muted">{profile.location}</p>
                    </div>
                  </div>
                </div>
              </ScrollZoom>
            </div>
          </Reveal>
          <div>
            <SectionHeading eyebrow="Who I Am" title="A developer obsessed with craft & motion" />
            <ScrollScrubText
              text={profile.summary}
              className="mt-6 text-lg font-medium leading-relaxed md:text-2xl md:leading-relaxed"
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { k: "Based in", v: profile.location },
                { k: "Experience", v: "1+" },
                { k: "Focus", v: "Frontend · 3D · Motion" },
                { k: "Status", v: "Open to work" },
              ].map((x) => (
                <Reveal key={x.k}>
                  <GlassCard glow className="!p-4">
                    <p className="text-xs uppercase tracking-wider text-muted">{x.k}</p>
                    <p className="mt-1 font-semibold">{x.v}</p>
                  </GlassCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 3 — Stats */}
      <Section>
        <GlassCard className="!p-8 md:!p-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="text-center">
                  <div className="text-3xl font-bold grad-text md:text-5xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-xs text-muted md:text-sm">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </GlassCard>
      </Section>

      {/* SECTION 4 — Services */}
      <Section id="services">
        <SectionHeading center eyebrow="Services" title="What I bring to the table" desc="End-to-end frontend craft, from concept to a polished, performant product." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1400 }}>
          {services.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <Reveal3D key={s.title}>
                <TiltCard>
                  <GlassCard glow className="h-full">
                    <div className="grid h-12 w-12 place-items-center rounded-xl border border-cyan-400/30 bg-cyan-400/10 text-cyan-300 transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted">{s.desc}</p>
                    <span className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(circle,#22d3ee,transparent)" }} />
                  </GlassCard>
                </TiltCard>
              </Reveal3D>
            );
          })}
        </div>
      </Section>

      {/* SECTION 5 — Skills Galaxy */}
      <Section id="skills">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Skills Galaxy" title="Technologies orbiting my craft" desc="An interactive constellation of the tools I use to build immersive products." />
            <Link to="/skills" className="mt-8 inline-block">
              <GradientButton variant="ghost">Explore all skills <ArrowRight className="h-4 w-4" /></GradientButton>
            </Link>
          </div>
          <div className="relative h-[380px] md:h-[460px]">
            <Suspense fallback={<div className="grid h-full place-items-center text-muted">Loading galaxy…</div>}>
              <SkillsGalaxy />
            </Suspense>
          </div>
        </div>
      </Section>

      {/* SECTION 6 — Featured Projects (cinematic horizontal scroll) */}
      <HorizontalProjects />

      {/* SECTION 7 — Process (scroll-stacking cards) */}
      <StackingProcess />

      {/* SECTION 8 — Tech Ecosystem */}
      <Section>
        <SectionHeading eyebrow="Tech Ecosystem" title="My toolbox" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {techEcosystem.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.05}>
              <GlassCard glow className="h-full">
                <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{g.group}</p>
                <ul className="mt-4 space-y-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" /> {it}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* SECTION 9 — Experience Highlights */}
      <Section id="experience">
        <SectionHeading eyebrow="Career" title="Experience highlights" />
        <div className="mt-12 space-y-4">
          {experience.slice(0, 3).map((e, i) => (
            <Reveal key={e.company} delay={i * 0.05}>
              <GlassCard glow className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold">{e.role}</h3>
                    <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-cyan-300">{e.type}</span>
                  </div>
                  <p className="text-sm text-muted">{e.company}</p>
                </div>
                <span className="text-sm text-muted">{e.period}</span>
              </GlassCard>
            </Reveal>
          ))}
        </div>
        <div className="mt-8"><Link to="/experience"><GradientButton variant="ghost">View Full Experience <ArrowRight className="h-4 w-4" /></GradientButton></Link></div>
      </Section>

      {/* SECTION 10 — Testimonials */}
      {/* <Section>
        <SectionHeading center eyebrow="Testimonials" title="What clients say" />
        <div className="mt-14 grid items-start gap-5 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Parallax key={t.name} speed={i % 2 ? 45 : 15}>
              <GlassCard glow className="h-full">
                <Quote className="h-7 w-7 text-cyan-400/50" />
                <p className="mt-4 text-muted">"{t.text}"</p>
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, k) => (
                        <Star key={k} className="h-4 w-4 fill-cyan-400 text-cyan-400" />
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-muted">{t.ref}</p>
                  </div>
                </div>
              </GlassCard>
            </Parallax>
          ))}
        </div>
      </Section> */}

      {/* SECTION 11 — Case Studies */}
      <Section>
        <SectionHeading eyebrow="Case Studies" title="Deep dives" desc="The thinking behind a few standout builds." />
        <div className="mt-12 grid items-start gap-5 lg:grid-cols-3">
          {projects.filter((p) => p.featured).map((p, i) => (
            <Parallax key={p.id} speed={i === 1 ? 50 : 20}>
              <GlassCard glow className="h-full">
                <h3 className="text-lg font-semibold" style={{ color: p.color }}>{p.title}</h3>
                {[
                  { k: "Challenge", v: p.challenge },
                  { k: "Process", v: p.process },
                  { k: "Solution", v: p.solution },
                  { k: "Results", v: p.results },
                ].map((row) => (
                  <div key={row.k} className="mt-4">
                    <p className="text-xs uppercase tracking-wider text-cyan-300">{row.k}</p>
                    <p className="mt-1 text-sm text-muted">{row.v}</p>
                  </div>
                ))}
              </GlassCard>
            </Parallax>
          ))}
        </div>
      </Section>

      {/* SECTION 12 — Open Source */}
      {/*
<Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeading eyebrow="Open Source" title="Building in public" desc="I maintain libraries and contribute to the ecosystem I love." />
          <div className="space-y-4">
            {openSource.map((o, i) => (
              <Reveal key={o.name} delay={i * 0.05}>
                <GlassCard glow className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GitFork className="h-5 w-5 text-cyan-400" />
                    <div>
                      <p className="font-semibold">{o.name}</p>
                      <p className="text-sm text-muted">{o.desc}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-muted"><Star className="h-4 w-4 fill-cyan-400 text-cyan-400" /> {o.stars}</span>
                </GlassCard>
              </Reveal>
            ))}

            <Reveal>
              <GlassCard>
                <p className="mb-3 text-xs uppercase tracking-wider text-muted">Contribution activity</p>
                <div className="grid grid-cols-[repeat(26,1fr)] gap-1">
                  {Array.from({ length: 26 * 5 }).map((_, i) => {
                    const lvl = Math.random();
                    return (
                      <div key={i} className="aspect-square rounded-[2px]" style={{ background: lvl > 0.7 ? "#22d3ee" : lvl > 0.45 ? "#22d3ee99" : lvl > 0.25 ? "#22d3ee44" : "rgba(255,255,255,0.06)" }} />
                    );
                  })}
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </Section>
*/}

      {/* SECTION 13 — Achievements
      <Section>
        <SectionHeading center eyebrow="Achievements" title="Recognition & milestones" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => {
            const Icon = iconMap[a.icon];
            return (
              <Reveal key={a.title} delay={i * 0.05}>
                <TiltCard>
                  <GlassCard glow className="flex items-center gap-4">
                    <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border border-cyan-400/30">
                      <div className="absolute inset-0 rounded-full grad-accent opacity-20 blur-md" />
                      <Icon className="relative h-6 w-6 text-cyan-300" />
                    </div>
                    <div>
                      <p className="font-semibold leading-tight">{a.title}</p>
                      <p className="text-xs text-muted">{a.org} · {a.year}</p>
                    </div>
                  </GlassCard>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </Section> */}

      {/* SECTION 14 — Blog
      <Section id="blog">
        <div className="flex items-end justify-between">
          <SectionHeading eyebrow="Journal" title="Latest writing" />
          <Link to="/blog" className="hidden md:block"><GradientButton variant="ghost">Read All Articles <ArrowRight className="h-4 w-4" /></GradientButton></Link>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <Link to="/blog">
                <GlassCard glow className="h-full">
                  <span className="text-xs uppercase tracking-wider text-cyan-300">{p.category}</span>
                  <h3 className="mt-3 text-lg font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted">{p.excerpt}</p>
                  <p className="mt-5 text-xs text-muted">{p.date} · {p.read} read</p>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section> */}

      {/* SECTION 15 — CTA */}
      <Section>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl glass p-10 text-center md:p-20">
            <div className="grid-bg absolute inset-0 opacity-50" />
            <div className="blob h-80 w-80" style={{ background: "radial-gradient(circle,#a855f7,transparent)", top: "-30%", left: "20%" }} />
            <div className="relative">
              <h2 className="mx-auto max-w-3xl text-3xl font-bold leading-tight md:text-6xl">
                <AnimatedText text="Let's Build Something Amazing Together" className="grad-text" />
              </h2>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <Link to="/contact"><GradientButton>Start a Project <ArrowRight className="h-4 w-4" /></GradientButton></Link>
                <Link to="/contact"><GradientButton variant="ghost">Schedule a Call</GradientButton></Link>
                <Link to="/contact"><GradientButton variant="ghost">Contact Me</GradientButton></Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* SECTION 16 — Contact preview */}
      <Section id="contact">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: () => <span className="text-cyan-300">@</span>, label: "Email", v: profile.email, href: `mailto:${profile.email}` },
            { icon: Github, label: "GitHub", v: "@amq-ahsn", href: profile.socials.github },
            { icon: Linkedin, label: "LinkedIn", v: "@AmeequeAhsan", href: profile.socials.linkedin },
            { icon: Twitter, label: "X", v: "#", href: profile.socials.twitter },
          ].map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              <a href={c.href} target="_blank" rel="noreferrer">
                <GlassCard glow className="h-full">
                  <div className="grid h-10 w-10 place-items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10">
                    <c.icon className="h-5 w-5 text-cyan-300" />
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-wider text-muted">{c.label}</p>
                  <p className="mt-1 font-medium">{c.v}</p>
                </GlassCard>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
