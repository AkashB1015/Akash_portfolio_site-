import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, staggerContainer, blurReveal } from "../utils/motionVariants";
import { LineReveal, TypewriterLabel } from "./TextReveal";

function StatCounter({ value, duration = 1.5, suffix = "", onComplete }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const isFloat = value.toString().includes('.');
    if (isFloat) {
      const end = parseFloat(value);
      const totalSteps = 50;
      const stepTime = (duration * 1000) / totalSteps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const currentVal = (end * (step / totalSteps)).toFixed(2);
        setCount(parseFloat(currentVal));
        if (step >= totalSteps) {
          setCount(end);
          clearInterval(timer);
          if (onComplete) onComplete();
        }
      }, stepTime);
      return () => clearInterval(timer);
    } else {
      let start = 0;
      const end = parseInt(value, 10);
      if (start === end) {
        setCount(end);
        if (onComplete) onComplete();
        return;
      }
      const totalSteps = Math.min(end, 50);
      const stepTime = (duration * 1000) / totalSteps;
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const currentVal = Math.round(end * (step / totalSteps));
        setCount(currentVal);
        if (step >= totalSteps) {
          setCount(end);
          clearInterval(timer);
          if (onComplete) onComplete();
        }
      }, stepTime);
      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const labelRef = useRef(null);

  // States to trigger card scale-pulse on counter completion
  const [completed, setCompleted] = useState({
    projects: false,
    certs: false,
    stacks: false,
    cgpa: false
  });

  const triggerPulse = (key) => {
    setCompleted(prev => ({ ...prev, [key]: true }));
  };

  return (
    <section 
      id="about" 
      className="py-24 md:py-36 border-t border-line bg-base-950 px-6 md:px-12 relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Eyebrow: Styled as a thin rounded pill with a soft blue border and subtle inner glow */}
        <div ref={labelRef} className="mb-8 block h-fit w-fit">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 shadow-[inset_0_1px_12px_rgba(59,130,246,0.15)] backdrop-blur-sm">
            <TypewriterLabel 
              text="01 // ABOUT ME" 
              className="font-sans text-[10px] tracking-widest font-bold text-accent-blue uppercase" 
            />
          </span>
        </div>

        {/* Section Heading: Curtain Line reveal */}
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-ink-100 tracking-tight mb-16 max-w-3xl leading-tight">
          <LineReveal lines={[
            "Architecting solutions at the",
            "intersection of security,",
            <span>scalability, and <span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">code discipline.</span></span>
          ]} />
        </h2>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left: Narrative Bio */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="lg:col-span-7 space-y-6 text-ink-400 font-body font-light text-sm md:text-base leading-relaxed"
          >
            <motion.p variants={blurReveal}>
              Hi, I'm <span className="text-ink-100 font-medium">Akash Bhadane</span>. 
              I design and build enterprise application architectures that deliver high availability and sub-second response times. 
              My fascination with technology lies in composing distinct database layers, routing parameters, and API controllers 
              into unified, secure systems that users love.
            </motion.p>
            <motion.p variants={blurReveal}>
              I specialize in bridging the robust, typed backend power of <span className="text-ink-100 font-medium whitespace-nowrap">Java / Spring Boot</span> and{" "}
              <span className="text-ink-100 font-medium whitespace-nowrap">C# / ASP.NET Core</span> with fluid frontends designed in <span className="text-ink-100 font-medium whitespace-nowrap">React.js</span>. 
              I write secure, structured APIs using JWT authentication, role-based controls (RBAC), and clean relational or document models.
            </motion.p>
            <motion.p variants={blurReveal}>
              Currently undergoing rigorous training in advanced full-stack technologies at <span className="text-ink-100 font-medium">CDAC Mumbai</span>, 
              I have forged a strict discipline for writing clean, testable, and maintainable codebases. 
              I treat architecture as a craft, aiming always for reliable software solutions.
            </motion.p>

            {/* Currently Status Pill */}
            <motion.div 
              variants={blurReveal}
              className="inline-flex items-center gap-2.5 px-4 py-2 border border-accent-blue/20 bg-base-900/60 backdrop-blur-sm rounded-full text-xs font-sans text-ink-100 shadow-[inset_0_1px_8px_rgba(59,130,246,0.08)]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-accent-blue animate-pulse"></span>
              <span>Currently: <strong className="text-accent-cyan font-semibold">PG-DAC at CDAC, Mumbai (2025–2026)</strong></span>
            </motion.div>
          </motion.div>

          {/* Right: Stat Grid with Counters */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="lg:col-span-5 grid grid-cols-2 gap-4 md:gap-6 w-full"
          >
            {/* Stat 1: Projects */}
            <motion.div 
              variants={fadeUp}
              animate={completed.projects ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="p-6 md:p-8 bg-base-900 border border-line flex flex-col justify-between aspect-square group hover:border-accent-blue/50 rounded-2xl shadow-[0_8px_30px_rgba(59,130,246,0.02)] hover:shadow-[0_12px_36px_rgba(59,130,246,0.1)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="font-sans text-[10px] tracking-widest font-bold text-ink-400 group-hover:text-accent-blue transition-colors">PROJECTS</div>
              <div className="font-display font-extrabold text-4xl md:text-6xl bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent mt-2 select-none">
                <StatCounter value="3" onComplete={() => triggerPulse("projects")} />
                <span>+</span>
              </div>
              <p className="text-xs text-ink-400 mt-2 leading-tight">Full-Stack production-ready projects built</p>
            </motion.div>

            {/* Stat 2: Credentials */}
            <motion.div 
              variants={fadeUp} 
              animate={completed.certs ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="p-6 md:p-8 bg-base-900 border border-line flex flex-col justify-between aspect-square group hover:border-accent-blue/50 rounded-2xl shadow-[0_8px_30px_rgba(59,130,246,0.02)] hover:shadow-[0_12px_36px_rgba(59,130,246,0.1)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="font-sans text-[10px] tracking-widest font-bold text-ink-400 group-hover:text-accent-blue transition-colors">CREDENTIALS</div>
              <div className="font-display font-extrabold text-4xl md:text-6xl bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent mt-2 select-none">
                <StatCounter value="6" onComplete={() => triggerPulse("certs")} />
              </div>
              <p className="text-xs text-ink-400 mt-2 leading-tight">Industry certifications (AWS, OCI, IBM...)</p>
            </motion.div>

            {/* Stat 3: Backend Stacks */}
            <motion.div 
              variants={fadeUp} 
              animate={completed.stacks ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="p-6 md:p-8 bg-base-900 border border-line flex flex-col justify-between aspect-square group hover:border-accent-blue/50 rounded-2xl shadow-[0_8px_30px_rgba(59,130,246,0.02)] hover:shadow-[0_12px_36px_rgba(59,130,246,0.1)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="font-sans text-[10px] tracking-widest font-bold text-ink-400 group-hover:text-accent-blue transition-colors">BACKEND STACKS</div>
              <div className="font-display font-extrabold text-4xl md:text-6xl bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent mt-2 select-none">
                <StatCounter value="2" onComplete={() => triggerPulse("stacks")} />
              </div>
              <p className="text-xs text-ink-400 mt-2 leading-tight">Java/Spring &amp; .NET core framework stacks</p>
            </motion.div>

            {/* Stat 4: CGPA */}
            <motion.div 
              variants={fadeUp} 
              animate={completed.cgpa ? { scale: [1, 1.03, 1] } : {}}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="p-6 md:p-8 bg-base-900 border border-line flex flex-col justify-between aspect-square group hover:border-accent-blue/50 rounded-2xl shadow-[0_8px_30px_rgba(59,130,246,0.02)] hover:shadow-[0_12px_36px_rgba(59,130,246,0.1)] hover:-translate-y-1 transition-all duration-300"
            >
              <div className="font-sans text-[10px] tracking-widest font-bold text-ink-400 group-hover:text-accent-blue transition-colors">ACADEMIC CGPA</div>
              <div className="font-display font-extrabold text-4xl md:text-6xl bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent mt-2 select-none">
                <StatCounter value="7.99" onComplete={() => triggerPulse("cgpa")} />
              </div>
              <p className="text-xs text-ink-400 mt-2 leading-tight">Graduated CS engineering first division</p>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
