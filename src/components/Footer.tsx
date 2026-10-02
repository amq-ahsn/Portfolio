import { Link } from "react-router-dom";
import { ArrowUp, Mail } from "lucide-react";
import { Github, Linkedin, Instagram } from "./SocialIcons";
import { motion } from "framer-motion";
import { profile } from "../lib/data";
import { Magnetic } from "./ui";
import { scrollToTop } from "./SmoothScroll";

const nav = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  // { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-24 overflow-hidden border-t border-white/10">
      {/* portal animation */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="h-80 w-80 rounded-full border border-cyan-400/20"
        />
        <div
          className="blob h-72 w-72"
          style={{
            background: "radial-gradient(circle,#22d3ee,transparent)",
            top: 0,
            left: 0,
          }}
        />
      </div>

      <div className="section-pad relative z-10 py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <h3 className="text-2xl font-bold grad-text">Let's connect</h3>

            <p className="mt-3 max-w-sm text-sm text-muted">
              Open to freelance projects,{" "}
              <span className="line-through">full-time roles</span> and
              ambitious collaborations.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-cyan-300 hover:underline"
            >
              <Mail className="h-4 w-4" /> {profile.email}
            </a>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    className="text-muted transition-colors hover:text-cyan-300"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-muted">
              Social
            </p>
            <div className="flex gap-3">
              {[
                { icon: Github, href: profile.socials.github },
                { icon: Linkedin, href: profile.socials.linkedin },
                // { icon: Twitter, href: profile.socials.twitter },
              ].map(({ icon: Icon, href }, i) => (
                <Magnetic key={i} strength={0.4}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 transition-all hover:border-cyan-400/50 hover:text-cyan-300"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name}. Crafted with React, R3F
            & Framer Motion.
          </p>
          <Magnetic strength={0.3}>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 transition-colors hover:border-cyan-400/50 hover:text-cyan-300"
            >
              Back to top <ArrowUp className="h-3.5 w-3.5" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
