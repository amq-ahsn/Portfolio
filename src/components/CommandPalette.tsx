import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Search, Home, User, FolderGit2, Briefcase, Zap, FileText, Mail, Moon, Sun, CornerDownLeft,
} from "lucide-react";
import { useStore } from "../store/useStore";

export default function CommandPalette() {
  const { paletteOpen, setPalette, toggleTheme, theme } = useStore();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);

  const items = [
    { label: "Home", icon: Home, action: () => navigate("/") },
    { label: "About", icon: User, action: () => navigate("/about") },
    { label: "Projects", icon: FolderGit2, action: () => navigate("/projects") },
    { label: "Experience", icon: Briefcase, action: () => navigate("/experience") },
    { label: "Skills", icon: Zap, action: () => navigate("/skills") },
    { label: "Blog", icon: FileText, action: () => navigate("/blog") },
    { label: "Contact", icon: Mail, action: () => navigate("/contact") },
    { label: `Toggle ${theme === "dark" ? "Light" : "Dark"} Mode`, icon: theme === "dark" ? Sun : Moon, action: toggleTheme },
  ];
  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette(!paletteOpen);
      }
      if (e.key === "Escape") setPalette(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, setPalette]);

  useEffect(() => {
    setActive(0);
    if (paletteOpen) setQ("");
  }, [paletteOpen, q]);

  const run = (i: number) => {
    filtered[i]?.action();
    setPalette(false);
  };

  return (
    <AnimatePresence>
      {paletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setPalette(false)}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/60 px-4 pt-[18vh] backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: -16, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -16, opacity: 0, scale: 0.98 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-2xl glass shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <Search className="h-4 w-4 text-muted" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") setActive((a) => Math.min(a + 1, filtered.length - 1));
                  if (e.key === "ArrowUp") setActive((a) => Math.max(a - 1, 0));
                  if (e.key === "Enter") run(active);
                }}
                placeholder="Search pages & actions..."
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-muted">ESC</kbd>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {filtered.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => run(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      active === i ? "bg-cyan-400/10 text-cyan-200" : "text-muted"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {active === i && <CornerDownLeft className="h-3.5 w-3.5 opacity-60" />}
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted">No results</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
