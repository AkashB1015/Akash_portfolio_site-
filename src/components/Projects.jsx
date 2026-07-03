import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { projects } from "../data/projects";
import { projectSlideLeft, projectSlideRight, fadeUp } from "../utils/motionVariants";
import { ArrowUpRight } from "lucide-react";
import { SplitText, TypewriterLabel, LineReveal } from "./TextReveal";

// Local Custom Github Icon SVG component
function GithubIcon({ size = 14, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

// Scroll-linked abstract canvas visualizer
function BrowserVisualizer({ projectId, progress }) {
  const prefersReduced = useReducedMotion();

  // Scroll-linked node coordinates drift calculations (active only if motion allowed)
  const node1X = useTransform(progress, [0, 1], [20, prefersReduced ? 20 : 25]);
  const node1Y = useTransform(progress, [0, 1], [15, prefersReduced ? 15 : 10]);

  const node2X = useTransform(progress, [0, 1], [80, prefersReduced ? 80 : 75]);
  const node2Y = useTransform(progress, [0, 1], [45, prefersReduced ? 45 : 50]);

  const node3X = useTransform(progress, [0, 1], [80, prefersReduced ? 80 : 85]);
  const node3Y = useTransform(progress, [0, 1], [15, prefersReduced ? 15 : 20]);

  const centerR = useTransform(progress, [0, 1], [4, prefersReduced ? 4 : 5.5]);

  if (projectId === "roadrescue") {
    return (
      <svg className="w-full h-full text-accent-blue/40 opacity-70" viewBox="0 0 100 60">
        {/* Faux map grid lines */}
        <line x1="0" y1="15" x2="100" y2="15" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 1" />
        <line x1="0" y1="30" x2="100" y2="30" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 1" />
        <line x1="0" y1="45" x2="100" y2="45" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 1" />
        <line x1="25" y1="0" x2="25" y2="60" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 1" />
        <line x1="50" y1="0" x2="50" y2="60" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 1" />
        <line x1="75" y1="0" x2="75" y2="60" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 1" />

        {/* Server Central Node */}
        <motion.circle cx="50" cy="30" r={centerR} fill="none" stroke="#3B82F6" strokeWidth="0.5" />
        <circle cx="50" cy="30" r="1.5" className="fill-accent-cyan" />

        {/* Moving Client Nodes (Tied to scroll offsets) */}
        <motion.circle cx={node1X} cy={node1Y} r="1" className="fill-accent-cyan" />
        <motion.circle cx={node2X} cy={node2Y} r="1" className="fill-accent-cyan" />
        <motion.circle cx={node3X} cy={node3Y} r="1.2" className="fill-accent-blue" />
        <circle cx="20" cy="45" r="1" className="fill-accent-cyan" />

        {/* Connecting links redrawing/stretching on scroll */}
        <motion.line x1={node1X} y1={node1Y} x2="50" y2="30" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 1" />
        <motion.line x1={node2X} y1={node2Y} x2="50" y2="30" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 1" />
        <motion.line x1={node3X} y1={node3Y} x2="50" y2="30" stroke="#38BDF8" strokeWidth="0.25" />
      </svg>
    );
  }

  if (projectId === "think-x") {
    const orbitRotate = useTransform(progress, [0, 1], [0, prefersReduced ? 0 : 45]);
    const outerRotate = useTransform(progress, [0, 1], [0, prefersReduced ? 0 : -35]);

    return (
      <svg className="w-full h-full text-accent-blue/40 opacity-70" viewBox="0 0 100 60">
        {/* Orbit database rings */}
        <motion.circle cx="50" cy="30" r="14" fill="none" stroke="currentColor" strokeWidth="0.15" strokeDasharray="2 2"
                       style={{ rotate: orbitRotate, transformOrigin: '50px 30px' }} />
        <motion.circle cx="50" cy="30" r="22" fill="none" stroke="currentColor" strokeWidth="0.15"
                       style={{ rotate: outerRotate, transformOrigin: '50px 30px' }} />
        
        {/* Core application node */}
        <circle cx="50" cy="30" r="2.5" className="fill-accent-blue" />
        
        {/* Orbiting particles */}
        <circle cx="50" cy="16" r="1" className="fill-accent-cyan" />
        <circle cx="50" cy="44" r="1" className="fill-accent-cyan" />
        <circle cx="28" cy="30" r="1.2" className="fill-accent-purple" />
        <circle cx="72" cy="30" r="1.2" className="fill-accent-purple" />
      </svg>
    );
  }

  // cookify visualizer: e-commerce database nodes
  return (
    <svg className="w-full h-full text-accent-cyan/40 opacity-70" viewBox="0 0 100 60">
      {/* Catalog connection grid */}
      <line x1="10" y1="10" x2="90" y2="10" stroke="currentColor" strokeWidth="0.1" />
      <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="0.1" />
      
      {/* Spring relational Data JPA database (Cyan) vs MongoDB (Blue) */}
      <circle cx="30" cy="20" r="3" className="fill-accent-cyan animate-pulse" />
      <circle cx="70" cy="40" r="3" className="fill-accent-blue" />
      
      {/* Center e-commerce ordering cart node */}
      <motion.circle cx="50" cy="30" r={centerR} fill="none" stroke="#3B82F6" strokeWidth="0.5" />
      <circle cx="50" cy="30" r="1.5" className="fill-accent-blue" />

      {/* Floating particles nodes connected to catalog */}
      <motion.line x1="30" y1="20" x2={node1X} y2={node1Y} stroke="currentColor" strokeWidth="0.2" />
      <motion.line x1="70" y1="40" x2={node2X} y2={node2Y} stroke="currentColor" strokeWidth="0.2" />
      <motion.line x1="50" y1="30" x2="30" y2="20" stroke="#3B82F6" strokeWidth="0.3" strokeDasharray="1 1" />
      <motion.line x1="50" y1="30" x2="70" y2="40" stroke="#38BDF8" strokeWidth="0.3" strokeDasharray="1 1" />

      <motion.circle cx={node1X} cy={node1Y} r="1" className="fill-accent-blue" />
      <motion.circle cx={node2X} cy={node2Y} r="1" className="fill-accent-cyan" />
    </svg>
  );
}

// Single Project layout wrapper for parsing local scroll offsets
function ProjectItem({ project, index }) {
  const containerRef = useRef(null);
  
  // Track this specific item scroll progress through viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isEven = index % 2 === 0;
  const slideVariant = isEven ? projectSlideLeft : projectSlideRight;

  return (
    <motion.div
      ref={containerRef}
      variants={slideVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-120px" }}
      className="perspective-1000 transform-style-3d grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
    >
      {/* Browser Mockup Frame Window */}
      <div className={`lg:col-span-6 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <div className="w-full bg-base-900 border border-line rounded-2xl overflow-hidden shadow-[0_8px_30px_rgba(59,130,246,0.02)] hover:shadow-[0_12px_36px_rgba(59,130,246,0.1)] hover:border-accent-blue/50 transition-all duration-300 relative group">
          {/* macOS-style Faux Browser Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-base-800 border-b border-line select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] inline-block" />
            </div>
            
            {/* Faux URL */}
            <div className="w-2/3 md:w-1/2 bg-base-950 border border-line/60 rounded px-3 py-0.5 text-[10px] font-sans font-bold text-ink-400 text-center truncate">
              {project.githubUrl.replace("https://", "")}
            </div>

            {/* Spacer */}
            <div className="w-10" />
          </div>

          {/* Faux Browser Viewport content */}
          <div className="bg-base-950 aspect-[5/3] flex items-center justify-center p-6 relative overflow-hidden">
            {project.imageUrl ? (
              /* TODO: replace with project screenshot */
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover rounded-sm filter brightness-95 hover:brightness-100 transition-all duration-300"
              />
            ) : (
              /* Scroll-linked dynamic nodes visualization */
              <BrowserVisualizer projectId={project.id} progress={scrollYProgress} />
            )}
            
            {/* View Source Code Hover Overlay */}
            <div className="absolute inset-0 bg-base-950/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-[2px]">
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 border border-accent-cyan text-accent-cyan font-sans font-bold text-xs flex items-center gap-2 bg-base-950/90 rounded-full hover:border-accent-blue hover:text-accent-blue transition-colors duration-300"
              >
                <GithubIcon size={14} />
                <span>github.com/AkashB1015</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Content */}
      <div className={`lg:col-span-6 flex flex-col justify-center space-y-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        {/* Eyebrow technology tags list */}
        <div className="flex flex-wrap gap-x-3 gap-y-1.5">
          {project.tags.map((tag, i) => (
            <span key={i} className="font-sans text-[9px] text-accent-cyan tracking-widest uppercase font-bold">
              {tag}
            </span>
          ))}
        </div>

        {/* Word-by-word letter flip transition title */}
        <SplitText text={project.title} className="text-2xl md:text-4xl text-ink-100 font-extrabold" animate={true} />

        <p className="text-ink-400 font-body font-light text-sm md:text-base leading-relaxed">
          {project.description}
        </p>

        {/* Feature Highlights */}
        <ul className="space-y-2.5">
          {project.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-ink-100 font-body">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 inline-block flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Link to Source Code */}
        <div className="pt-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-[11px] font-sans font-extrabold tracking-widest text-accent-blue hover:text-accent-cyan transition-colors duration-300"
          >
            <span>VIEW SOURCE CODE</span>
            <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const labelRef = useRef(null);

  return (
    <section 
      id="projects" 
      className="py-12 md:py-20 border-t border-line bg-base-950 px-6 md:px-12 relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Eyebrow: Styled as a thin rounded pill with a soft blue border and subtle inner glow */}
        <div ref={labelRef} className="mb-8 block h-fit w-fit">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 shadow-[inset_0_1px_12px_rgba(59,130,246,0.15)] backdrop-blur-sm">
            <TypewriterLabel 
              text="03 // PROJECTS" 
              className="font-sans text-[10px] tracking-widest font-bold text-accent-blue uppercase" 
            />
          </span>
        </div>

        {/* Section Heading: Curtain Line reveal */}
        <h2 className="text-4xl md:text-6xl font-display font-extrabold text-ink-100 tracking-tight mb-10 max-w-4xl leading-tight">
          <span className="block">Featured full-stack platforms</span>
          <span className="block">
            engineered from{" "}
            <span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">
              backend databases
            </span>
          </span>
          <span className="block">to responsive interfaces.</span>
        </h2>

        {/* Projects Showcase alternating container */}
        <div className="space-y-16 md:space-y-24">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
