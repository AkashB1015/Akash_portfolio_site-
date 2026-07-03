import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Lenis from "lenis";

// Import Components
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Education from "./components/Education";
import Contact from "./components/Contact";
import ChatWidget from "./components/ChatWidget";

const NAV_ITEMS = [
  { label: "HOME", target: "hero" },
  { label: "ABOUT", target: "about" },
  { label: "SKILLS", target: "skills" },
  { label: "PROJECTS", target: "projects" },
  { label: "CERTIFICATIONS", target: "certifications" },
  { label: "EDUCATION", target: "education" },
  { label: "CONTACT", target: "contact" }
];

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [showChatbot] = useState(true);


  // Track active section for side dots progress navigation
  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "certifications", "education", "contact"];
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

  // Initialize Lenis smooth scroll on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0, // slightly swifter for more responsive scrolling
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth exponential ease-out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

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

    return () => {
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
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

  return (
    <>
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

      {/* Side Progress Dots Navigation for Recruiters */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[80] hidden xl:flex flex-col gap-4">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.target;
          return (
            <a
              key={item.target}
              href={`#${item.target}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.target);
                if (el) {
                  const offset = item.target === "hero" ? 0 : 80;
                  window.scrollTo({
                    top: el.offsetTop - offset,
                    behavior: "smooth"
                  });
                }
              }}
              className="relative group flex items-center justify-end"
              aria-label={`Scroll to ${item.label}`}
            >
              {/* Tooltip Label */}
              <span className="absolute right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2.5 py-1 bg-base-900 border border-line rounded-lg text-[9px] font-sans tracking-wider font-extrabold text-ink-100 whitespace-nowrap">
                {item.label}
              </span>
              {/* Dot */}
              <div
                className={`w-2 h-2 rounded-full border transition-all duration-300 ${isActive
                    ? "bg-accent-blue border-accent-blue scale-125 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                    : "bg-transparent border-line group-hover:border-accent-blue/60"
                  }`}
              />
            </a>
          );
        })}
      </div>

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
        {/* Hero Section */}
        <Hero />

        {/* Section 01: About */}
        <About />

        {/* Section 02: Skills */}
        <Skills />

        {/* Section 03: Projects */}
        <Projects />

        {/* Section 04: Certifications */}
        <Certifications />

        {/* Section 05: Education */}
        <Education />

        {/* Section 06: Contact & Footer */}
        <Contact />
      </main>

      {/* Chatbot Floating Widget */}
      {showChatbot && <ChatWidget />}
    </>
  );
}
