import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { skillCategories } from "../data/skills";
import { fadeUp } from "../utils/motionVariants";
import { LineReveal, TypewriterLabel } from "./TextReveal";
import { Server, Code, Atom, Database, BookOpen, Terminal, Cloud, Brain } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 160,
      damping: 15,
      delay: i * 0.03, // Diagonal stagger wave delay calculation
    },
  }),
};

// Returns styling parameters for each programming language (borders, custom glows, active text states)
const getLanguageTheme = (name) => {
  switch (name) {
    case "Java":
      return { 
        border: "hover:border-accent-blue", 
        shadow: "rgba(59, 130, 246, 0.22)", 
        text: "group-hover/chip:text-accent-blue" 
      };
    case "C#":
      return { 
        border: "hover:border-accent-cyan", 
        shadow: "rgba(56, 189, 248, 0.22)", 
        text: "group-hover/chip:text-accent-cyan" 
      };
    case "JavaScript":
      return { 
        border: "hover:border-accent-cyan", 
        shadow: "rgba(56, 189, 248, 0.22)", 
        text: "group-hover/chip:text-accent-cyan" 
      };
    case "SQL":
      return { 
        border: "hover:border-accent-blue", 
        shadow: "rgba(59, 130, 246, 0.22)", 
        text: "group-hover/chip:text-accent-blue" 
      };
    case "C":
      return { 
        border: "hover:border-ink-100", 
        shadow: "rgba(245, 245, 247, 0.15)", 
        text: "group-hover/chip:text-ink-100" 
      };
    case "C++":
      return { 
        border: "hover:border-accent-cyan", 
        shadow: "rgba(56, 189, 248, 0.22)", 
        text: "group-hover/chip:text-accent-cyan" 
      };
    default:
      return { 
        border: "hover:border-accent-blue", 
        shadow: "rgba(59, 130, 246, 0.22)", 
        text: "group-hover/chip:text-accent-blue" 
      };
  }
};

// Custom language vector logos featuring detailed animations triggered on parent hover
function LanguageIcon({ name }) {
  const baseClass = "w-6 h-6 transition-all duration-500 ease-out";
  
  switch (name) {
    case "Java":
      return (
        <svg viewBox="0 0 24 24" className={`${baseClass} text-accent-blue group-hover/chip:-translate-y-1 group-hover/chip:-rotate-6`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Steaming Coffee Cup logo */}
          <path d="M18 8h1a3 3 0 0 1 0 6h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <path d="M6 1v3M10 1v3M14 1v3" />
        </svg>
      );
    case "C#":
      return (
        <svg viewBox="0 0 24 24" className={`${baseClass} text-accent-cyan group-hover/chip:rotate-90 group-hover/chip:scale-105`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Hexagon with internal C# characters */}
          <polygon points="12 2 22 7 22 17 12 22 2 17 2 7" className="stroke-accent-cyan/30" />
          <path d="M8.5 10a2.2 2.2 0 1 0 0 4" />
          <path d="M13.5 8.5v7M16 8.5v7M12 10.5h5.5M12 13.5h5.5" />
        </svg>
      );
    case "JavaScript":
      return (
        <svg viewBox="0 0 24 24" className={`${baseClass} text-accent-cyan fill-current group-hover/chip:scale-110 group-hover/chip:rotate-6`} stroke="none">
          {/* JavaScript box logo */}
          <rect x="3" y="3" width="18" height="18" rx="2" className="fill-accent-cyan/10 stroke-accent-cyan stroke-[1.5]" />
          <text x="11" y="16" className="fill-accent-cyan font-sans text-[8px] font-bold tracking-tight">JS</text>
        </svg>
      );
    case "SQL":
      return (
        <svg viewBox="0 0 24 24" className={`${baseClass} text-accent-blue group-hover/chip:scale-y-110 group-hover/chip:-translate-y-0.5`} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Cylinder database stack */}
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v5c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 10v5c0 1.66 4 3 9 3s9-1.34 9-3v-5" />
        </svg>
      );
    case "C":
      return (
        <svg viewBox="0 0 24 24" className={`${baseClass} text-ink-400 group-hover/chip:scale-115`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Custom C logo */}
          <circle cx="12" cy="12" r="9" className="stroke-line" />
          <path d="M14.5 9.5a3 3 0 1 0 0 5" />
        </svg>
      );
    case "C++":
      return (
        <svg viewBox="0 0 24 24" className={`${baseClass} text-accent-cyan group-hover/chip:rotate-12 group-hover/chip:scale-110`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* C++ details */}
          <circle cx="12" cy="12" r="9" className="stroke-accent-cyan/30" />
          <path d="M10.5 9.5A2.5 2.5 0 1 0 10.5 14.5" />
          <path d="M14 12h4M16 10v4" />
        </svg>
      );
    default:
      return null;
  }
}

// Renders specific vector brand icons inside the other skill tag chips, falling back to Lucide categories.
function SkillBrandIcon({ skillName, categoryId }) {
  const size = 12;
  const iconClass = "w-3 h-3 group-hover/chip:scale-110 group-hover/chip:text-accent-ember transition-all duration-300 mr-2 flex-shrink-0 inline-block";

  // Check specific matching brand logos
  if (skillName.startsWith("Spring")) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#6DB33F]`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Spring leaf vein curve */}
        <path d="M2 22c1.25-5.83 5-9.17 10-10 4.17.83 7.92 4.17 10 10H2z" />
        <path d="M12 12c3.33-3.33 5.83-3.33 7.5-1.67C21.17 12 21.17 14.5 17.83 17.83L12 12z" />
      </svg>
    );
  }
  if (skillName === "Hibernate" || skillName === "JPA" || skillName === "Spring Data JPA") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-accent-gold`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3v18M18 3v18M6 12h12" />
        <circle cx="12" cy="12" r="2" className="fill-accent-gold stroke-none" />
      </svg>
    );
  }
  if (skillName.includes(".NET") || skillName.includes("Web API") || skillName.includes("Entity Framework")) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#512BD4]`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 15V9h2.5v1.5H8v1.5h2.5v1.5H8zM14 9l-3 6" />
      </svg>
    );
  }
  if (skillName === "React.js" || skillName === "React") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#61DAFB]`} fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3" transform="rotate(150 12 12)" />
      </svg>
    );
  }
  if (skillName === "Node.js") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#339933]`} fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 21 6.5 21 16.5 12 21 3 16.5 3 6.5" />
      </svg>
    );
  }
  if (skillName === "Express.js") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-ink-400`} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M7 10h4M7 14h4" />
      </svg>
    );
  }
  if (skillName === "HTML5") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#E34F26]`} fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="5 3 19 3 17.5 18 12 20 6.5 18" />
      </svg>
    );
  }
  if (skillName === "CSS3") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#1572B6]`} fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="5 3 19 3 17.5 18 12 20 6.5 18" />
      </svg>
    );
  }
  if (skillName === "Bootstrap") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#7952B3]`} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8h4a2 2 0 0 1 0 4H8v4h4" />
      </svg>
    );
  }
  if (skillName.startsWith("JavaScript")) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-accent-teal fill-current`} stroke="none">
        <rect x="4" y="4" width="16" height="16" rx="1.5" className="fill-accent-teal/10 stroke-accent-teal stroke-[1.5]" />
        <text x="10" y="14" className="fill-accent-teal font-sans text-[7px] font-bold">JS</text>
      </svg>
    );
  }
  if (skillName === "MySQL") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#00758F]`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v8c0 1.5 3.5 2.5 8 2.5s8-1 8-2.5V6" />
      </svg>
    );
  }
  if (skillName === "PostgreSQL") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#336791]`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="9" />
        <path d="M8 10h5c1 0 2 1 2 2s-1 2-2 2H8" />
      </svg>
    );
  }
  if (skillName === "MongoDB") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#47A248]`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3c0 0 4.5 4 4.5 7.5s-2 5.5-4.5 6.5c-2.5-1-4.5-3-4.5-6.5S12 3 12 3z" />
      </svg>
    );
  }
  if (skillName === "Git" || skillName === "GitHub" || skillName === "GitHub Actions") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#F05032]`} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4.5" y="4.5" width="15" height="15" rx="2" transform="rotate(45 12 12)" />
        <circle cx="12" cy="9" r="1.5" fill="currentColor" />
        <path d="M12 10.5v4.5" />
      </svg>
    );
  }
  if (skillName === "Docker") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#2496ED]`} fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2 14c2.5 0 3-1.5 5.5-1.5s3.5 1.5 6 1.5 3.5-1.5 6-1.5" />
        <rect x="7" y="9" width="2" height="1.5" />
        <rect x="10" y="9" width="2" height="1.5" />
      </svg>
    );
  }
  if (skillName.startsWith("AWS")) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#FF9900]`} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 14c3.5 4 9 4 12.5 0" />
        <path d="M14 12.5l2 1.5-1 2" />
      </svg>
    );
  }
  if (skillName.startsWith("Oracle")) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#F80000]`} fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="7" ry="5" />
      </svg>
    );
  }
  if (skillName.startsWith("Linux")) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-ink-100`} fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 13.5c1 1.5 3 1.5 4 0" />
      </svg>
    );
  }
  if (skillName === "Windows") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#0078D7]`} fill="currentColor" stroke="none">
        <path d="M3 5.3L9.8 4.3V11.2H3V5.3zm0 6.6H9.8V19L3 17.9V11.9zm7.7-7.7L21 2.7V11.2H10.7V4.2zm0 7.7H21V20.5l-10.3-1.6V11.9z" />
      </svg>
    );
  }
  if (skillName === "Kubernetes") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#326CE5]`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 20 5.5 22 14.5 16 21 8 21 2 14.5 4 5.5" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v7M20 5.5l-6 4.5M22 14.5l-7-2.5M16 21l-4-6M8 21l-4-6M2 14.5l7-2.5M4 5.5l6 4.5" />
      </svg>
    );
  }
  if (skillName === "Jenkins") {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-[#D24939]`} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0-6 6c0 3 2.5 5 2.5 5l-1.5 5h10l-1.5-5s2.5-2 2.5-5a6 6 0 0 0-6-6z" />
        <circle cx="10" cy="8" r="0.8" fill="currentColor" />
        <path d="M11 12h2M10 15h4M12 18v2M10 20h4" />
      </svg>
    );
  }
  if (skillName.includes("CI/CD")) {
    return (
      <svg viewBox="0 0 24 24" className={`${iconClass} text-accent-teal`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 12c-2-3-5-4-7-2a5 5 0 0 0 0 8c2 2 5 1 7-2 2 3 5 4 7 2a5 5 0 0 0 0-8c-2-2-5-1-7 2z" />
      </svg>
    );
  }

  // Fallback to Category Lucide Icons if specific brand logo isn't declared
  const fallbackClass = "text-accent-cyan group-hover/chip:text-accent-blue transition-colors duration-300 mr-2 flex-shrink-0 inline-block";
  switch (categoryId) {
    case "java-backend":
      return <Server size={size} className={fallbackClass} />;
    case "net-tech":
      return <Code size={size} className={fallbackClass} />;
    case "frontend-fullstack":
      return <Atom size={size} className={fallbackClass} />;
    case "databases":
      return <Database size={size} className={fallbackClass} />;
    case "core-concepts":
      return <BookOpen size={size} className={fallbackClass} />;
    case "tools-devops":
      return <Terminal size={size} className={fallbackClass} />;
    case "cloud-platforms":
      return <Cloud size={size} className={fallbackClass} />;
    case "ai-ml":
      return <Brain size={size} className={fallbackClass} />;
    default:
      return null;
  }
}

export default function Skills() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  // Mount-delay skeleton: shows shape-matching skeleton pills for ~200ms on mount,
  // covering initial hydration lag. Real content resolves in place with no layout shift.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Scroll-linked drift for ambient background glows
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const glowVioletX = useTransform(scrollYProgress, [0, 1], [-25, 25]);
  const glowVioletY = useTransform(scrollYProgress, [0, 1], [-15, 25]);
  const glowAmberX  = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const glowAmberY  = useTransform(scrollYProgress, [0, 1], [15, -25]);
  const glowTealX   = useTransform(scrollYProgress, [0, 1], [-10, 15]);
  const glowTealY   = useTransform(scrollYProgress, [0, 1], [20, -10]);

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="py-24 md:py-36 border-t border-line bg-base-900/10 px-6 md:px-12 grid-bg relative overflow-hidden"
    >
      {/* Ambient background glows: three colors at very low opacity to feel atmospheric */}
      {/* Violet (Java side - left) */}
      <motion.div 
        style={{ x: glowVioletX, y: glowVioletY }}
        className="glow-ambient glow-violet absolute -left-20 top-10 w-96 h-96 opacity-100"
      />
      {/* Amber (.NET side - right) */}
      <motion.div 
        style={{ x: glowAmberX, y: glowAmberY }}
        className="glow-ambient glow-amber absolute -right-20 top-20 w-96 h-96 opacity-100"
      />
      {/* Teal (Shared/Tools/Cloud - center-bottom) */}
      <motion.div 
        style={{ x: glowTealX, y: glowTealY }}
        className="glow-ambient glow-teal absolute left-1/3 -bottom-24 w-[450px] h-[450px] opacity-100"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Eyebrow: Styled as a thin rounded pill with a soft blue border and subtle inner glow */}
        <div ref={labelRef} className="mb-8 block h-fit w-fit">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 shadow-[inset_0_1px_12px_rgba(59,130,246,0.15)] backdrop-blur-sm">
            <TypewriterLabel 
              text="04 // SKILLS & STACK" 
              className="font-sans text-[10px] tracking-widest font-bold text-accent-blue uppercase" 
            />
          </span>
        </div>

        {/* Section Heading: Curtain Line reveal */}
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-ink-100 tracking-tight mb-16 max-w-3xl leading-tight">
          <LineReveal lines={[
            "A balanced stack engineered for",
            <span>backend power and <span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">frontend responsiveness.</span></span>
          ]} />
        </h2>

        {/* Categories Grid — skeleton while !ready, real content once mounted */}
        {!ready ? (
          /* Shape-matching skeleton: same 3-col grid, same card count, shimmer pills */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {skillCategories.map((category) => (
              <div
                key={category.id}
                className="p-6 md:p-8 bg-base-900 border border-line flex flex-col justify-start rounded-2xl"
              >
                {/* Category title skeleton */}
                <div className="skeleton-shimmer h-3 w-28 rounded-full mb-6" />
                {/* Pill skeletons — same count as real skills */}
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((_, i) => (
                    <div
                      key={i}
                      className="skeleton-shimmer h-7 rounded-full"
                      style={{ width: `${60 + (i % 3) * 20}px` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {skillCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                className="p-6 md:p-8 bg-base-900 border border-line flex flex-col justify-start rounded-2xl hover:border-accent-blue/50 shadow-[0_8px_30px_rgba(59,130,246,0.02)] hover:shadow-[0_12px_36px_rgba(59,130,246,0.1)] hover:-translate-y-1 transition-all duration-300 relative group"
              >
                {/* Subtle top edge blue-cyan gradient strip highlight on card hover */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-blue to-accent-cyan group-hover:w-full transition-all duration-500 rounded-t-2xl" />
                
                {/* Category Title */}
                <h3 className="font-sans text-[10px] tracking-widest text-accent-cyan uppercase mb-6 font-extrabold select-none">
                  {category.title}
                </h3>

                {/* Tag Grid / Flex Container */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-100px" }}
                  className="w-full"
                >
                  {category.id === "languages" ? (
                    /* Custom 2-Column symmetric layout for programming languages using vector logo cards. */
                    <div className="grid grid-cols-2 gap-3 w-full">
                      {category.skills.map((skill, index) => {
                        const theme = getLanguageTheme(skill);
                        return (
                          <motion.div
                            key={index}
                            variants={chipVariants}
                            custom={index}
                            whileHover={{ 
                              y: -4,
                              boxShadow: `0 4px 18px ${theme.shadow}`
                            }}
                            className={`flex flex-col items-center justify-center py-4 px-2 bg-base-950/60 border border-line rounded-xl ${theme.border} transition-all duration-350 group/chip cursor-pointer select-none shadow-sm`}
                          >
                            <LanguageIcon name={skill} />
                            <span className={`text-[10px] font-sans font-bold text-ink-400 ${theme.text} mt-2.5 tracking-wider transition-colors duration-300`}>
                              {skill}
                            </span>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    /* Standard chip elements with dynamic brand logo icons, falling back to clean category Lucide icons */
                    <div className="flex flex-wrap gap-2.5">
                      {category.skills.map((skill, index) => (
                        <motion.span
                          key={index}
                          variants={chipVariants}
                          custom={index}
                          whileHover={{ 
                            y: -2.5,
                            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.15)"
                          }}
                          className="flex items-center px-3 py-1.5 bg-base-950/60 border border-line text-ink-100 font-sans font-bold text-xs tracking-wider rounded-full hover:border-accent-blue/60 hover:text-accent-blue hover:bg-gradient-to-br hover:from-accent-blue/[0.04] hover:to-transparent transition-all duration-350 group/chip cursor-pointer select-none shadow-sm"
                        >
                          <SkillBrandIcon skillName={skill} categoryId={category.id} />
                          <span>{skill}</span>
                        </motion.span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
