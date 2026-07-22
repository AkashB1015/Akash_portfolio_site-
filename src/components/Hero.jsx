import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ChevronDown, ArrowRight, Download } from "lucide-react";
import { handleMagneticHover, resetMagneticHover, blurReveal } from "../utils/motionVariants";
import { SplitText, TypewriterLabel } from "./TextReveal";
import TechOrbitSphere from "./TechOrbitSphere";

const MARQUEE_ITEMS = [
  "Java", "Spring Boot", "ASP.NET Core", "C#", "React.js", "MySQL",
  "MongoDB", "AWS", "Docker", "RESTful APIs", "Spring Security", "JWT",
  "RBAC", "PostgreSQL", "Git", "JavaScript", "Microservices"
];

const DUP_MARQUEE_ITEMS = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

function HoverFact({ text, tooltip }) {
  return (
    <span className="relative group/fact inline-block cursor-help border-b border-dashed border-accent-blue/60 text-ink-100 font-medium px-0.5">
      {text}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 hidden group-hover/fact:block bg-base-900 border border-accent-blue/35 text-[9px] font-sans text-ink-100 p-2.5 rounded-xl shadow-xl z-50 text-center backdrop-blur-md font-normal leading-normal select-none pointer-events-none">
        <span className="text-accent-cyan font-bold uppercase text-[7px] tracking-widest block mb-0.5">Quick Fact</span>
        {tooltip}
      </span>
    </span>
  );
}

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobileScreen(window.innerWidth < 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Scroll exit parallax: Drift the title text and fade it out faster on scroll
  const titleY = useTransform(scrollY, [0, 500], [0, -120]);
  const titleOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const bgY = useTransform(scrollY, [0, 500], [0, -60]);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = projectsSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[620px] flex flex-col justify-between pt-16 md:pt-20 pb-28 md:pb-32 overflow-hidden grid-bg"
    >


      {/* Hero Content (Parallax exit tie-in) */}
      <motion.div
        style={{ y: isMobileScreen || prefersReduced ? 0 : titleY, opacity: titleOpacity }}
        className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow flex flex-col justify-center py-2 md:py-4 z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center w-full">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-4 md:space-y-5 max-w-4xl">
            {/* Eyebrow: Styled as a thin rounded pill with a soft blue border and subtle inner glow */}
            <div className="block h-fit w-fit">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 shadow-[inset_0_1px_12px_rgba(59,130,246,0.15)] backdrop-blur-sm">
                <TypewriterLabel
                  text="SOFTWARE ENGINEER — JAVA & .NET FULL-STACK"
                  className="font-sans text-[10px] tracking-widest font-bold text-accent-blue uppercase"
                  animate={true}
                />
              </span>
            </div>

            {/* Headline: Word-by-word 3D reveal with custom glowing text accent */}
            <h1 className="text-[2.6rem] sm:text-[4rem] md:text-[5.2rem] lg:text-[4.2rem] xl:text-[5.2rem] font-display font-extrabold text-ink-100 leading-[0.95] tracking-tight select-none">
              <span className="block overflow-hidden py-1">
                <SplitText text="Building secure," delayOffset={0.1} animate={true} />
              </span>
              <span className="block mt-1 sm:mt-2 overflow-hidden py-1">
                <SplitText text="scalable" delayOffset={0.25} animate={true} />{" "}
                <SplitText
                  text="systems."
                  delayOffset={0.35}
                  animate={true}
                  wordClassName="bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-blue bg-clip-text text-transparent shimmer-sweep"
                />
              </span>
            </h1>

            {/* Paragraph: Refined blur-to-sharp reveal */}
            <motion.p
              variants={blurReveal}
              initial="hidden"
              animate="visible"
              className="text-ink-400 text-base md:text-xl font-light leading-relaxed max-w-3xl font-body"
            >
              I am a <HoverFact text="CDAC-trained" tooltip="Completed intensive Post Graduate Diploma in Advanced Computing (PG-DAC) with top performance" /> Software Engineer specializing in designing robust backends with{" "}
              <HoverFact text="Java / Spring Boot" tooltip="Architected high-throughput transaction backends and modular MVC applications" /> and{" "}
              <HoverFact text="C# / ASP.NET Core" tooltip="Developed high-performance microservices, web hooks, and API gateways" />, integrated with dynamic{" "}
              <HoverFact text="React.js" tooltip="Created interactive dashboards, modular components, and custom hooks structures" /> frontends. Focused on secure APIs, RBAC, and{" "}
              <HoverFact text="scalable architectures" tooltip="Optimized DB indexing, caching mechanisms, and connection pools for load management" />.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.7 }}
              className="flex flex-wrap items-center gap-4 !mt-8 md:!mt-12"
            >
              {/* View Projects - Primary CTA */}
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                onMouseMove={(e) => handleMagneticHover(e, 0.25)}
                onMouseLeave={resetMagneticHover}
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-blue bg-[size:200%_auto] hover:bg-right text-white font-sans text-xs font-bold tracking-widest uppercase px-8 py-4 rounded-full shadow-[0_4px_16px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_24px_rgba(56,189,248,0.55)] transition-all duration-500 transform"
              >
                <span>View Projects</span>
                <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </a>

              {/* Resume Button - Secondary CTA */}
              <a
                href="#contact"
                onMouseMove={(e) => handleMagneticHover(e, 0.25)}
                onMouseLeave={resetMagneticHover}
                className="group inline-flex items-center justify-center gap-2 border border-line hover:border-accent-blue px-8 py-4 text-ink-100 hover:text-accent-cyan font-sans text-xs font-bold tracking-widest uppercase rounded-full bg-transparent transition-all duration-300 transform"
              >
                <span>Download Resume</span>
                <Download size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Draggable 3D Tech Skill Orbiting Sphere */}
          <div className="lg:col-span-5 flex justify-center lg:justify-center">
            <TechOrbitSphere />
          </div>
        </div>
      </motion.div>

      {/* Tech Marquee strip */}
      <div className="relative mt-8 mb-4 lg:absolute lg:bottom-12 lg:left-0 lg:w-full lg:m-0 h-12 flex items-center overflow-hidden border-y border-line bg-base-900/60 backdrop-blur-sm z-20 ticker-mask">
        <div className="w-full overflow-hidden relative flex items-center">
          <div
            className={`flex whitespace-nowrap gap-12 text-ink-400 font-sans text-[11px] tracking-widest font-semibold uppercase hover:[animation-play-state:paused] cursor-default ${prefersReduced ? "animate-none" : "animate-scroll-marquee"
              }`}
            style={{
              willChange: prefersReduced ? "auto" : "transform",
              display: "flex",
              width: "max-content"
            }}
          >
            {DUP_MARQUEE_ITEMS.map((tech, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan"></span>
                <span>{tech}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Gentle bouncing scroll indicator (absolute centered at viewport bottom) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex justify-center z-20">
        <motion.a
          href="#about"
          animate={prefersReduced ? { y: 0 } : { y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="text-ink-400 hover:text-accent-cyan transition-colors p-2"
          aria-label="Scroll down to About section"
          style={{ willChange: prefersReduced ? "auto" : "transform" }}
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("about");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <ChevronDown size={20} />
        </motion.a>
      </div>
    </section>
  );
}
