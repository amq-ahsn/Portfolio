export const profile = {
  name: "Ameeque Ahsan",
  role: "Frontend Developer",
  tagline: "Crafting immersive digital experiences with modern web technologies.",
  location: "Maharashtra, India ·",
  email: "ameequeahsan@gmail.com",
  available: true,
  summary:
    "I design and engineer high-performance interfaces where motion, 3D and precision typography meet. I obsess over the details that make products feel alive — buttery 60fps animations, accessible interactions and architecture that scales.",
  socials: {
    github: "https://github.com/amq-ahsn",
    linkedin: "https://www.linkedin.com/in/ameeque-ahsan-75b693373/",
    // twitter: "#",
  },
};

export const stats = [
  { label: "Projects Completed", value: 19, suffix: "+" },
  { label: "Years Experience", value: 2, suffix: "+" },
  { label: "Happy Clients", value: 11, suffix: "+" },
  { label: "Technologies", value: 20, suffix: "+" },
  { label: "Cinematic Works ", value: 3, suffix: "+" },
];

export const services = [
  { title: "Frontend Development", desc: "Pixel-perfect, accessible interfaces built with React, Next.js & TypeScript.", icon: "Code2" },
  { title: "Web Applications", desc: "Robust, scalable SPAs and dashboards with clean state architecture.", icon: "LayoutDashboard" },
  { title: "UI Implementation", desc: "Translating Figma into production code with design-system fidelity.", icon: "Figma" },
  { title: "Performance Optimization", desc: "Lighthouse 90+, code splitting, lazy loading and Core Web Vitals.", icon: "Gauge" },
  { title: "Three.js Experiences", desc: "Immersive WebGL scenes, particles and scroll-driven 3D storytelling.", icon: "Boxes" },
  { title: "Motion Design", desc: "Cinematic micro-interactions with GSAP & Framer Motion.", icon: "Sparkles" },
];

export const skills = [
  { name: "HTML", level: 98, cat: "Frontend" },
  { name: "CSS", level: 96, cat: "Styling" },
  { name: "JavaScript", level: 60, cat: "Frontend" },
  { name: "TypeScript", level: 65, cat: "Frontend" },
  { name: "React", level: 60, cat: "Frontend" },
  { name: "Next.js", level: 55, cat: "Frontend" },
  { name: "Tailwind", level: 65, cat: "Styling" },
  { name: "SCSS", level: 63, cat: "Styling" },
  // { name: "Redux", level: 85, cat: "Frontend" },
  // { name: "Zustand", level: 90, cat: "Frontend" },
  { name: "GSAP", level: 52, cat: "Animation" },
  { name: "Framer Motion", level: 59, cat: "Animation" },
  { name: "Three.js", level: 86, cat: "3D" },
  // { name: "R3F", level: 84, cat: "3D" },
  { name: "Git", level: 72, cat: "Tools" },
  { name: "Figma", level: 78, cat: "Tools" },
];

export const techEcosystem = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript"] },
  { group: "Styling", items: ["Tailwind", "SCSS"] },
  { group: "Animation", items: ["GSAP", "Framer Motion"] },
  { group: "3D", items: ["Three.js", "React Three Fiber"] },
  { group: "Tools", items: ["Git", "GitHub", "Figma", "VS Code"] },
];
export interface Project {
  id: string;
  title: string;
  category: "Web App" | "3D" | "UI";
  year: string;
  desc: string;
  tech: string[];
  demo: string;
  github: string;
  color: string;
  featured: boolean;
  challenge: string;
  process: string;
  solution: string;
  results: string;

  // ✅ NEW FIELDS FOR VIDEO SUPPORT
  video: string;
}

export const projects: Project[] = [
  {
    id: "nebula",
    title: "Daisy: Hybrid Assistant",
    category: "Web App",
    year: "2024",
    desc: "Designed Daisy, a hybrid AI assistant featuring real-time voice interaction, speech recognition, and intelligent automation.",
    tech: ["Next.js", "TypeScript", "Tailwind", "Zustand", "React"],
    demo: "#",
    github: "#",
    color: "#22d3ee",
    featured: true,
    challenge: "Building a reliable hybrid AI assistant with accurate voice recognition and natural conversations.",
    process: "Integrated speech recognition, text-to-speech, multilingual support, and AI model connectivity.",
    solution: "A streaming pipeline feeding canvas charts at a stable 60fps.",
    results: "Delivered a responsive voice assistant capable of real-time, intelligent, and hands-free user interactions.",

    video: "/videos/daisy.mp4",
  },

  {
    id: "aurora",
    title: "Astral Voyage",
    category: "3D",
    year: "2026",
    desc: "An immersive 3D space journey where scroll controls travel through a cinematic universe of planets, nebulae, and cosmic phenomena.",
    tech: ["Three.js", "Typescript", "GSAP", "React"],
    demo: "#",
    github: "#",
    color: "#a855f7",
    featured: true,
    challenge: "Loading 3D assets while keeping first paint instant.",
    process: "Progressive GLTF streaming, instanced meshes and texture compression.",
    solution: "An interactive configurator with under-2s time-to-interactive.",
    results: "Boosted conversions 41% and average session +3m.",

    video: "/videos/astral-voyage.mp4",
  },

  {
    id: "pulse",
    title: "CloudAtlas",
    category: "UI",
    year: "2025",
    desc: "A themeable component library with 60+ accessible primitives and live documentation.",
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "#",
    github: "#",
    color: "#3b82f6",
    featured: true,
    challenge: "Creating an engaging online presence for a technology training institute",
    process: "Built a responsive website with HTML, CSS, and JavaScript, focusing on performance and user experience.",
    solution: "A modern educational website showcasing courses, faculty, and admission information.",
    results: "Enhanced user engagement, increased inquiry submissions, and strengthened the institute's brand credibility.",

    video: "/videos/cloudatlas.mp4",
  },

  {
    id: "orbi",
    title: "Infiqo Solutions",
    category: "Web App",
    year: "2025",
    desc: "A blend of design, animation, and development focused on building modern, high-performance digital products.",
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "#",
    github: "#",
    color: "#5eead4",
    featured: false,
    challenge: "Generating performant 3D scenes from user templates.",
    process: "Scene graph abstraction and lazy chunk loading per template.",
    solution: "A drag-and-drop editor with instant preview.",
    results: "1.2k creators onboarded in first month.",

    video: "/videos/infiqo.mp4",
  },

  {
    id: "lumen",
    title: "Forma",
    category: "3D",
    year: "2026",
    desc: "FORMA 3D is a WebGL-powered e-commerce platform built with React and Three.js, featuring real-time 3D product visualization, interactive material customization, and an immersive studio-lit shopping experience.",
    tech: ["React", "R3F", "Next.js", "TypeScript", "Tailwind"],
    demo: "#",
    github: "#",
    color: "#22d3ee",
    featured: false,
    challenge: "Static e-commerce lacked depth and realistic product understanding.",
    process: "Built a WebGL storefront using React + Three.js with real-time 3D product rendering.",
    solution: "Created interactive 3D models with live material switching and optimized lighting.",
    results: "An immersive, high-performance shopping experience with realistic product visualization.",

    video: "/videos/forma.mp4",
  },

  {
    id: "flux",
    title: "Branfy",
    category: "Web App",
    year: "Crafting",
    desc: "A modern service-oriented web platform designed to showcase and connect digital services with a clean, responsive, and user-friendly interface.",
    tech: ["Three.js", "GLSL", "R3F"],
    demo: "#",
    github: "#",
    color: "#a855f7",
    featured: false,
    challenge: "Designing a clean and structured platform to showcase services clearly and effectively.",
    process: "Built a responsive UI with a focus on simplicity, layout hierarchy, and smooth navigation.",
    solution: "Created a modern, user-friendly service website with a clean and organized interface.",
    results: "Improved service presentation, usability, and overall user engagement.",

    video: "#",
  },
];

export const experience = [
  // {
  //   role: "Senior Frontend Developer",
  //   company: "Vertex Labs",
  //   period: "2023 — Present",
  //   type: "Current role",
  //   points: [
  //     "Lead the web platform team building 3D-first product experiences.",
  //     "Architected a Next.js design system used across 6 products.",
  //     "Mentored 4 engineers and set the animation performance standard.",
  //   ],
  // },
{
role: "Frontend Developer",
company: "Mapmygenome",
period: "2026 — Present",
type: "Current",
points: [
"Building polished, responsive interfaces for data-driven digital experiences.",
"Translating product and design concepts into performant, reusable frontend components.",
],
},

  // {
  //   role: "UI Engineer",
  //   company: "Brightwave",
  //   period: "2019 — 2021",
  //   type: "Previous",
  //   points: [
  //     "Built the company's first React component library.",
  //     "Partnered with design to define motion guidelines.",
  //   ],
  // },
  {
    role: "Freelance Developer",
    company: "Independent",
    period: "2024 — 2025",
    type: "Freelance",
    points: [
      "Delivered 10+ projects for startups and agencies nationally.",
      "Specialised in high-end animated landing pages.",
    ],
  },
];

export const education = [
  { title: "B.Tech, Computer Science", org: "JNTUH", period: "2018 — 2023" },
  { title: "Fundamentals Of Web Developement", org: "CloudAtlas", period: "2024" },
  { title: "Data Analytics", org: "CloudAtlas", period: "2025" },
];

export const processSteps = [
  { n: "01", title: "Discovery", desc: "Understand goals, audience and constraints." },
  { n: "02", title: "Planning", desc: "Define scope, architecture and milestones." },
  { n: "03", title: "Design", desc: "Wireframes, motion language and prototypes." },
  { n: "04", title: "Development", desc: "Clean, typed, component-driven code." },
  { n: "05", title: "Testing", desc: "A11y, performance and cross-device QA." },
  { n: "06", title: "Deployment", desc: "Ship, monitor and iterate." },
];

export const testimonials = [
  { name: "Sara Lin", role: "Product Lead, Vertex", rating: 5, ref: "Nebula Analytics", text: "Ameeque turned a complex dashboard into something people actually love using. The motion polish is unreal." },
  { name: "Marco Reyes", role: "Founder, Aurora", rating: 5, ref: "Aurora 3D Store", text: "Our 3D store felt impossible. He delivered it fast, performant and absolutely beautiful." },
  { name: "Priya Nair", role: "Design Director", rating: 5, ref: "Pulse Design System", text: "A rare engineer who truly respects design. Every pixel and easing curve was intentional." },
  { name: "Tom Becker", role: "CTO, Lumen", rating: 5, ref: "Lumen Docs", text: "Search went from painful to instant. Communication and code quality were top tier." },
];

export const achievements = [
  // { title: "Awwwards Honorable Mention", org: "Awwwards", year: "2025", icon: "Award" },
  // { title: "CSS Design Awards — UI", org: "CSSDA", year: "2024", icon: "Trophy" },
  // { title: "Hackathon Winner", org: "JSConf Hack", year: "2023", icon: "Medal" },
  // { title: "Meta Frontend Certified", org: "Coursera", year: "2022", icon: "BadgeCheck" },
  // { title: "Open Source Contributor", org: "R3F Ecosystem", year: "2024", icon: "GitBranch" },
  // { title: "Speaker — Web Motion", org: "FrontConf", year: "2025", icon: "Mic" },
];

export const openSource = [
  { name: "react-magnetic", stars: "2.1k", desc: "Magnetic hover interactions for React." },
  { name: "lenis-react", stars: "980", desc: "Hooks for buttery smooth scrolling." },
  { name: "shader-kit", stars: "1.4k", desc: "Composable GLSL utilities for R3F." },
];

export const posts = [
  { id: "p1", title: "Building 60fps Scroll Experiences with Lenis & GSAP", category: "Performance", read: "8 min", date: "Mar 2026", excerpt: "A practical guide to orchestrating smooth, GPU-friendly scroll animations.", tags: ["GSAP", "Lenis"], featured: true },
  { id: "p2", title: "An Architecture for Scalable Three.js Scenes", category: "Three.js", read: "12 min", date: "Feb 2026", excerpt: "Patterns for organising R3F scenes that stay maintainable as they grow.", tags: ["Three.js", "R3F"] },
  { id: "p3", title: "Designing a Token-Driven Component System", category: "Frontend Architecture", read: "10 min", date: "Jan 2026", excerpt: "How to build a themeable, accessible component library teams love.", tags: ["React", "Design Systems"] },
  { id: "p4", title: "Next.js App Router: Lessons from Production", category: "Next.js", read: "9 min", date: "Dec 2025", excerpt: "Real-world patterns, gotchas and wins after a year on the App Router.", tags: ["Next.js"] },
  { id: "p5", title: "The Art of Micro-Interactions in React", category: "React", read: "6 min", date: "Nov 2025", excerpt: "Small details, big delight — crafting interactions that feel alive.", tags: ["React", "Framer Motion"] },
  { id: "p6", title: "GPU Particles: A Gentle Introduction", category: "Three.js", read: "11 min", date: "Oct 2025", excerpt: "Render a million points at 60fps with GPGPU techniques.", tags: ["Three.js", "GLSL"] },
];

export const values = [
  { title: "Craft over speed", desc: "Details compound. I sweat the small stuff so the product feels effortless." },
  { title: "Performance is UX", desc: "A fast interface is a kind one. Every millisecond matters." },
  { title: "Accessible by default", desc: "Great experiences work for everyone, on every device." },
  { title: "Calm collaboration", desc: "Clear communication and reliable delivery, always." },
];

export const funFacts = [
  "I prototype shaders for fun on weekends.",
  "Coffee count: roughly 1,200 cups a year.",
  // "I've visited 14 countries chasing good design.",
  "I can recite easing curves from memory.",
];
