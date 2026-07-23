import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, ArrowUpRight } from "lucide-react";
import PageHero from "../components/PageHero";
import { GlassCard, TiltCard } from "../components/ui";
import { posts } from "../lib/data";

const cats = ["All", "React", "Next.js", "Frontend Architecture", "Three.js", "Performance"];

export default function Blog() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const featured = posts.find((p) => p.featured)!;

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (p.title.toLowerCase().includes(q.toLowerCase()) ||
            p.tags.join(" ").toLowerCase().includes(q.toLowerCase()))
      ),
    [cat, q]
  );

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Writing & ideas"
        desc="Notes on frontend architecture, motion, 3D and building delightful, fast interfaces."
      />

      {/* Featured */}
      <section className="section-pad pb-8">
        <TiltCard>
          <GlassCard glow className="!p-0">
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-video overflow-hidden rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none" style={{ background: "linear-gradient(135deg,#22d3ee33,#a855f733)" }}>
                <div className="grid-bg absolute inset-0" />
                <span className="absolute left-4 top-4 rounded-full bg-cyan-400/90 px-3 py-1 text-[10px] font-semibold text-[#05060a]">Featured</span>
              </div>
              <div className="p-7 md:p-10">
                <span className="text-xs uppercase tracking-wider text-cyan-300">{featured.category}</span>
                <h2 className="mt-3 text-2xl font-bold md:text-3xl">{featured.title}</h2>
                <p className="mt-3 text-muted">{featured.excerpt}</p>
                <div className="mt-5 flex items-center gap-4 text-xs text-muted">
                  <span>{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {featured.read}</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </TiltCard>
      </section>

      {/* Filters */}
      <section className="section-pad pb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-all ${
                  cat === c ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-200" : "border-white/10 bg-white/5 text-muted"
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
              placeholder="Search articles..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted md:w-56"
            />
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="section-pad pb-24">
        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                layout
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <GlassCard glow className="flex h-full flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-cyan-300">{p.category}</span>
                    <ArrowUpRight className="h-4 w-4 text-cyan-300" />
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug">{p.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{p.excerpt}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs text-muted">#{t}</span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                    <span>{p.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.read}</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {filtered.length === 0 && <p className="py-20 text-center text-muted">No articles found.</p>}
      </section>
    </>
  );
}
