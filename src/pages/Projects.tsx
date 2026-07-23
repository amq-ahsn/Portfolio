import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ArrowUpRight, X } from "lucide-react";
import PageHero from "../components/PageHero";
import { GlassCard, GradientButton, TiltCard } from "../components/ui";
import { Github } from "../components/SocialIcons";
import { projects } from "../lib/data";

const cats = ["All", "Web App", "3D", "UI"];

export default function Projects() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [active, setActive] =
    useState<(typeof projects)[number] | null>(null);

  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = cat === "All" || p.category === cat;

      const matchSearch =
        p.title.toLowerCase().includes(q.toLowerCase()) ||
        p.tech.join(" ").toLowerCase().includes(q.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [cat, q]);

  const handleEnter = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.play().catch(() => {});
    }
  };

  const handleLeave = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      video.pause();
      video.currentTime = 0; // optional reset for clean preview
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Selected works"
        desc="A curated showcase of products, experiments and client work. Filter, search and dive into the details."
      />

      {/* FILTERS */}
      <section className="section-pad pb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  cat === c
                    ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200"
                    : "border-white/10 bg-white/5 text-muted hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5">
            <Search className="h-4 w-4 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search projects..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted md:w-56"
            />
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="section-pad pb-20">
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <TiltCard>
                  <button
                    onClick={() => setActive(p)}
                    className="w-full text-left"
                  >
                    <GlassCard glow className="group h-full overflow-hidden !p-0">
                      {/* VIDEO */}
                      <div
                        className="relative aspect-video overflow-hidden"
                        onMouseEnter={() => handleEnter(p.id)}
                        onMouseLeave={() => handleLeave(p.id)}
                      >
                        <video
                          ref={(el) => {
                            videoRefs.current[p.id] = el;
                          }}
                          src={p.video}
                          muted
                          playsInline
                          loop
                          preload="metadata"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                        {/* featured */}
                        {p.featured && (
                          <span className="absolute right-3 top-3 rounded-full bg-cyan-400 px-2.5 py-0.5 text-[10px] font-semibold text-black">
                            Featured
                          </span>
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted">
                            {p.category} · {p.year}
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-cyan-300" />
                        </div>

                        <h3 className="mt-2 text-lg font-semibold">
                          {p.title}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-sm text-muted">
                          {p.desc}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {p.tech.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-muted"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </button>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-muted">
            No projects match your search.
          </p>
        )}
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl glass p-8"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5"
              >
                <X className="h-4 w-4" />
              </button>

              {/* MAIN VIDEO */}
              <div className="mb-6 overflow-hidden rounded-2xl">
                <video
                  src={active.video}
                  controls
                  playsInline
                  autoPlay
                  loop
                  className="w-full rounded-2xl"
                />
              </div>

              <span className="text-xs text-muted">
                {active.category} · {active.year}
              </span>

              <h2
                className="mt-1 text-3xl font-bold"
                style={{ color: active.color }}
              >
                {active.title}
              </h2>

              <p className="mt-4 text-muted">{active.desc}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {active.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { k: "Challenge", v: active.challenge },
                  { k: "Process", v: active.process },
                  { k: "Solution", v: active.solution },
                  { k: "Results", v: active.results },
                ].map((row) => (
                  <div key={row.k}>
                    <p className="text-xs uppercase tracking-wider text-cyan-300">
                      {row.k}
                    </p>
                    <p className="mt-1 text-sm text-muted">{row.v}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex gap-3">
                <a href={active.demo}>
                  <GradientButton>
                    Live Demo <ArrowUpRight className="h-4 w-4" />
                  </GradientButton>
                </a>

                <a href={active.github}>
                  <GradientButton variant="ghost">
                    <Github className="h-4 w-4" />
                    GitHub
                  </GradientButton>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}