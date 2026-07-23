import { lazy, Suspense, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Import Components — critical above-fold (synchronous, in initial bundle)
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import Preloader from "./components/Preloader";

// Below-fold sections — lazy loaded (split into separate chunks, fetched after first paint)
const About = lazy(() => import("./components/About"));
const Education = lazy(() => import("./components/Education"));
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const Certifications = lazy(() => import("./components/Certifications"));
const Contact = lazy(() => import("./components/Contact"));
const ChatWidget = lazy(() => import("./components/ChatWidget"));
// Lenis is imported dynamically inside useEffect to keep it out of the initial bundle

const NAV_ITEMS = [
  { label: "HOME", target: "hero" },
  { label: "ABOUT", target: "about" },
  { label: "EDUCATION", target: "education" },
  { label: "PROJECTS", target: "projects" },
  { label: "SKILLS", target: "skills" },
  { label: "CERTIFICATIONS", target: "certifications" },
  { label: "CONTACT", target: "contact" }
];

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showChatbot] = useState(true);

  // ── Scoped copy protection ──────────────────────────────────────────────────
  // Prevents casual text selection/copy across the site while keeping the
  // Contact section's email/phone fully selectable and all form fields usable.
  useEffect(() => {
    // 1. CSS-level: apply user-select:none to body; Contact section overrides it
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";

    // 2. Right-click context menu — suppressed everywhere except Contact details
    const handleContextMenu = (e) => {
      const inContact = e.target.closest("#contact");
      if (!inContact) e.preventDefault();
    };

    // 3. Keyboard shortcut intercepts — skip when focus is inside a form field
    const FORM_TAGS = new Set(["INPUT", "TEXTAREA", "SELECT"]);
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName;
      // Never block inside form fields (chatbot input, etc.)
      if (FORM_TAGS.has(tag)) return;

      const ctrl = e.ctrlKey || e.metaKey;
      if (!ctrl) return;

      const key = e.key.toLowerCase();
      // Block: Ctrl+C (copy), Ctrl+A (select-all), Ctrl+U (view-source)
      if (key === "c" || key === "a" || key === "u") {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // ── Track active section for side dots progress navigation ─────────────────

  useEffect(() => {
    const sections = ["hero", "about", "education", "projects", "skills", "certifications", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250; // offset
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize Lenis smooth scroll — deferred until after first paint
  // Dynamic import keeps Lenis out of the initial JS bundle entirely
  useEffect(() => {
    let lenis;
    let rafId;

    const initLenis = async () => {
      const { default: Lenis } = await import("lenis");
      lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        infinite: false,
      });

      function raf(time) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      // Synchronize Lenis scrolling state with scroll-to-hash overrides
      const handleAnchorClick = (e) => {
        const href = e.target.closest("a")?.getAttribute("href");
        if (href && href.startsWith("#")) {
          e.preventDefault();
          const targetId = href.replace("#", "");
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            lenis.scrollTo(targetEl, {
              offset: targetId === "hero" ? 0 : -80,
              duration: 1.2,
            });
          }
        }
      };
      document.addEventListener("click", handleAnchorClick);
      // Store cleanup ref on lenis instance for teardown
      lenis.__clickCleanup = () => document.removeEventListener("click", handleAnchorClick);
    };

    // requestIdleCallback defers until after first paint; setTimeout fallback for Safari
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(() => initLenis(), { timeout: 2000 });
      return () => {
        cancelIdleCallback(id);
        if (lenis) { lenis.__clickCleanup?.(); lenis.destroy(); }
        if (rafId) cancelAnimationFrame(rafId);
      };
    } else {
      const id = setTimeout(() => initLenis(), 200);
      return () => {
        clearTimeout(id);
        if (lenis) { lenis.__clickCleanup?.(); lenis.destroy(); }
        if (rafId) cancelAnimationFrame(rafId);
      };
    }
  }, []);


  // Framer Motion scroll progress bar hook
  const { scrollY, scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Dynamic parallax transformations for the ambient background glows (scroll time shadow)
  const trGlowY = useTransform(scrollY, [0, 3000], [0, -120]);
  const trGlowScale = useTransform(scrollY, [0, 3000], [1, 1.2]);
  const trGlowOpacity = useTransform(scrollY, [0, 800], [1, 0.2]); // fades to a subtle accent after Hero

  const blGlowY = useTransform(scrollY, [0, 3000], [0, 120]);
  const blGlowScale = useTransform(scrollY, [0, 3000], [1, 1.25]);
  const blGlowOpacity = useTransform(scrollY, [0, 800], [1, 0]); // fades out completely past Hero section

  // Scroll-Progress Rail state computations
  const progressPoints = [];
  const heightValues = [];
  for (let i = 0; i <= 6; i++) {
    progressPoints.push(i / 6);
    heightValues.push(10);
    if (i < 6) {
      progressPoints.push((i + 0.5) / 6);
      heightValues.push(18); // mid-way stretch
    }
  }

  const indicatorY = useTransform(scrollYProgress, [0, 1], [0, 236]);
  const indicatorYSpring = useSpring(indicatorY, { stiffness: 140, damping: 22 });
  const indicatorHeight = useTransform(scrollYProgress, progressPoints, heightValues);
  const indicatorHeightSpring = useSpring(indicatorHeight, { stiffness: 160, damping: 20 });

  const colorPoints = [0, 1/6, 2/6, 3/6, 4/6, 5/6, 1];
  const indicatorColors = [
    "#8B5CF6", // hero -> violet
    "#a78bfa", // about -> violet-amber
    "#14B8A6", // education -> teal
    "#a855f7", // projects -> purple-accent
    "#f59e0b", // skills -> amber
    "#14B8A6", // certifications -> teal
    "#6366f1"  // contact -> indigo resolution
  ];
  const indicatorColor = useTransform(scrollYProgress, colorPoints, indicatorColors);

  const sectionAccents = {
    hero: { baseColor: "#8B5CF6" },
    about: { baseColor: "#a78bfa" },
    education: { baseColor: "#14B8A6" },
    projects: { baseColor: "#a855f7" },
    skills: { baseColor: "#f59e0b" },
    certifications: { baseColor: "#14B8A6" },
    contact: { baseColor: "#6366f1" }
  };

  // Fade out side navigation progress rail on Hero (first page) and fade in on scroll
  const sideRailOpacity = useTransform(scrollY, [0, 200], [0, 1]);

  return (
    <>
      {/* Tier 1 — Global Preloader (sessionStorage-gated, once per session) */}
      <Preloader />

      {/* Top Edge Gradient Border Light */}
      <div className="top-gradient-border" />

      {/* Large Soft Radial Glows - Dynamic scroll shadows + ambient drift loops */}
      <motion.div
        className="radial-glow-tr"
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -15, 10, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut"
        }}
        style={{ y: trGlowY, scale: trGlowScale, opacity: trGlowOpacity }}
      />
      <motion.div
        className="radial-glow-bl"
        animate={{
          x: [0, -15, 20, 0],
          y: [0, 20, -15, 0]
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "easeInOut"
        }}
        style={{ y: blGlowY, scale: blGlowScale, opacity: blGlowOpacity }}
      />

      {/* Subtle Noise Texture Overlay */}
      <div className="noise-overlay" />

      {/* Faint Floating Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-accent-blue/15 animate-float"
            style={{
              left: `${(i * 7.3) % 100}%`,
              top: `${(i * 13.7) % 100}%`,
              animationDelay: `${(i * 0.9) % 8}s`,
              animationDuration: `${14 + ((i * 3.1) % 10)}s`,
            }}
          />
        ))}
      </div>

      {/* Side Progress Dots Navigation for Recruiters (fades out completely on Hero section) */}
      <motion.div 
        style={{ opacity: sideRailOpacity }}
        className="fixed right-6 top-1/2 -translate-y-1/2 z-[80] hidden xl:flex flex-col items-center select-none"
      >
        <div className="relative flex flex-col items-center justify-between h-[280px] w-11">
          {/* Dim track line behind dots */}
          <div className="absolute top-[22px] bottom-[22px] w-[2px] bg-line/25 rounded-full pointer-events-none" />
          
          {/* Active fill line driven by scroll progress */}
          <motion.div 
            className="absolute top-[22px] w-[2px] rounded-full pointer-events-none origin-top"
            style={{
              height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
              background: "linear-gradient(to bottom, #8B5CF6, #F59E0B, #14B8A6)",
            }}
          />

          {/* Morphing active capsule indicator */}
          <motion.div
            className="absolute left-1/2 w-2.5 rounded-full z-20 pointer-events-none"
            style={{
              x: "-50%",
              top: 22, // first dot center
              y: indicatorYSpring,
              height: indicatorHeightSpring,
              backgroundColor: indicatorColor,
              boxShadow: useTransform(indicatorColor, (c) => `0 0 10px ${c}, 0 0 4px ${c}`),
              translateY: useTransform(indicatorHeightSpring, (h) => -h / 2),
            }}
          />

          {/* Dot items */}
          {NAV_ITEMS.map((item, index) => {
            const isActive = activeSection === item.target;
            const accent = sectionAccents[item.target] || sectionAccents.hero;

            return (
              <a
                key={item.target}
                href={`#${item.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  const scrollToEl = (el) => {
                    const offset = item.target === "hero" ? 0 : 80;
                    window.scrollTo({ top: el.offsetTop - offset, behavior: "smooth" });
                  };
                  const el = document.getElementById(item.target);
                  if (el) { scrollToEl(el); return; }
                  // Lazy section not yet in DOM — poll until mounted
                  let tries = 0;
                  const poll = setInterval(() => {
                    tries++;
                    const found = document.getElementById(item.target);
                    if (found) { clearInterval(poll); scrollToEl(found); }
                    else if (tries > 30) { clearInterval(poll); window.location.hash = item.target; }
                  }, 100);
                }}
                className="relative flex items-center justify-center w-11 h-11 group cursor-pointer"
                style={{ height: 44, width: 44 }} // 44x44 tap target size
                aria-label={`Scroll to ${item.label}`}
              >
                {/* Slow pulsing active ring */}
                {isActive && (
                  <motion.div
                    className="absolute w-6 h-6 rounded-full border opacity-30 pointer-events-none"
                    style={{ borderColor: accent.baseColor }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.35, 0, 0.35]
                    }}
                    transition={{
                      duration: 2.8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}

                {/* Dot shape */}
                <motion.div
                  className="w-2 h-2 rounded-full border z-10 transition-all duration-300"
                  style={{
                    borderColor: isActive ? accent.baseColor : "rgba(var(--color-ink-400), 0.35)",
                    backgroundColor: isActive ? accent.baseColor : "transparent"
                  }}
                  whileHover={{
                    scale: 1.3,
                    borderColor: accent.baseColor,
                    backgroundColor: accent.baseColor
                  }}
                />

                {/* Hover Tooltip Label */}
                <div className="absolute right-10 pointer-events-none opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 z-30">
                  <div
                    className="px-3 py-1 bg-base-900 border text-[9px] font-sans tracking-widest font-bold text-ink-100 rounded-lg shadow-xl whitespace-nowrap"
                    style={{
                      borderColor: accent.baseColor + "55",
                      boxShadow: `0 4px 12px ${accent.baseColor}15`
                    }}
                  >
                    {item.label}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </motion.div>

      {/* Top Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-accent-blue to-accent-cyan origin-left relative"
          style={{ scaleX }}
        >
          {/* Moving soft glow tip at the end of the progress bar */}
          <div className="absolute top-0 right-0 w-16 h-3 bg-accent-cyan/45 rounded-full blur-sm -translate-y-0.5" />
        </motion.div>
      </div>

      {/* Custom Mouse Cursor for Desktop Devices */}
      <CustomCursor />

      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Layout Wrap */}
      <main className="w-full min-h-screen bg-transparent text-ink-100 flex flex-col relative z-10">
        {/* Hero Section — synchronous, above fold, in initial bundle */}
        <Hero />

        {/* Below-fold sections — each lazy-loaded, renders when chunk arrives */}
        <Suspense fallback={null}>
          {/* Section 01: About */}
          <About />

          {/* Section 02: Education */}
          <Education />

          {/* Section 03: Projects */}
          <Projects />

          {/* Section 04: Skills */}
          <Skills />

          {/* Section 05: Certifications */}
          <Certifications />

          {/* Section 06: Contact & Footer */}
          <Contact />
        </Suspense>
      </main>

      {/* Chatbot Floating Widget — lazy, loads after everything else */}
      {showChatbot && (
        <Suspense fallback={null}>
          <ChatWidget />
        </Suspense>
      )}
    </>
  );
}
