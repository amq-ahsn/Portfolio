import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, Moon, Sun, Command, Hexagon } from "lucide-react";
import { useStore } from "../store/useStore";
import { Magnetic } from "./ui";
import { cn } from "../utils/cn";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  // { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { pathname } = useLocation();
  const { theme, toggleTheme, setPalette } = useStore();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 md:px-6",
            scrolled ? "glass shadow-2xl shadow-black/30" : "bg-transparent"
          )}
        >
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="relative grid h-9 w-9 place-items-center">
              <Hexagon className="absolute h-9 w-9 text-cyan-400 spin-slow" strokeWidth={1} />
              <span className="text-sm grad-text">aA</span>
            </span>
            <span className="hidden text-sm tracking-tight sm:block">Ameeque<span className="text-cyan-400">.in</span></span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  pathname === l.to ? "text-cyan-300" : "text-muted hover:text-[var(--fg)]"
                )}
              >
                {pathname === l.to && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-cyan-400/30 bg-cyan-400/10"
                  />
                )}
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPalette(true)}
              className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-muted transition-colors hover:text-[var(--fg)] md:flex"
            >
              <Command className="h-3.5 w-3.5" /> <span>⌘K</span>
            </button>
            <Magnetic strength={0.3}>
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 transition-colors hover:border-cyan-400/40"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </Magnetic>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex flex-col bg-[#05060a]/95 px-6 pt-28 backdrop-blur-xl lg:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * i }}
              >
                <Link
                  to={l.to}
                  className={cn(
                    "block border-b border-white/5 py-5 text-3xl font-semibold",
                    pathname === l.to ? "grad-text" : "text-muted"
                  )}
                >
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
