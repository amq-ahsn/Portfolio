import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense } from "react";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import ParticleField from "./components/ParticleField";
import ScrollProgress from "./components/ScrollProgress";
import ScrollDial from "./components/ScrollDial";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import CommandPalette from "./components/CommandPalette";

import Home from "./pages/Home";
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Experience = lazy(() => import("./pages/Experience"));
const Skills = lazy(() => import("./pages/Skills"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10"
    >
      {children}
    </motion.main>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="flex h-screen items-center justify-center text-muted">Loading…</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/projects" element={<Page><Projects /></Page>} />
          <Route path="/experience" element={<Page><Experience /></Page>} />
          <Route path="/skills" element={<Page><Skills /></Page>} />
          <Route path="/blog" element={<Page><Blog /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <SmoothScroll>
        <Loader />
        <Cursor />
        <div className="noise" />
        <ParticleField />
        <ScrollProgress />
        <ScrollDial />
        <CommandPalette />
        <Navbar />
        <div className="relative">
          <AnimatedRoutes />
          <Footer />
        </div>
      </SmoothScroll>
    </HashRouter>
  );
}
