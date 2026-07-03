import { useRef } from "react";
import { motion } from "framer-motion";
import { education } from "../data/education";
import { fadeUp, staggerContainer } from "../utils/motionVariants";
import { LineReveal, TypewriterLabel } from "./TextReveal";

export default function Education() {
  const labelRef = useRef(null);

  return (
    <section 
      id="education" 
      className="py-24 md:py-36 border-t border-line bg-base-950 px-6 md:px-12 relative"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Eyebrow: Styled as a thin rounded pill with a soft blue border and subtle inner glow */}
        <div ref={labelRef} className="mb-8 block h-fit w-fit">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 shadow-[inset_0_1px_12px_rgba(59,130,246,0.15)] backdrop-blur-sm">
            <TypewriterLabel 
              text="05 // EDUCATION" 
              className="font-sans text-[10px] tracking-widest font-bold text-accent-blue uppercase" 
            />
          </span>
        </div>

        {/* Section Heading: Curtain Line reveal */}
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-ink-100 tracking-tight mb-20 max-w-3xl leading-tight">
          <LineReveal lines={[
            <span>An <span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">academic base</span> in CS engineering</span>,
            "reinforced by specialized system programming."
          ]} />
        </h2>

        {/* Timeline container */}
        <div className="relative max-w-3xl mx-auto pl-8 md:pl-16">
          
          {/* Background Track Line (hairline border) */}
          <div className="absolute left-[6px] md:left-[10px] top-2 bottom-2 w-[2px] bg-line" />
          
          {/* Animated drawing active line on scroll */}
          <motion.div
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: false, margin: "-150px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-[6px] md:left-[10px] top-2 w-[2px] bg-gradient-to-b from-accent-blue via-accent-blue/50 to-transparent origin-top overflow-hidden"
          >
            {/* Travelling pulse glow current running down */}
            <div className="timeline-pulse" />
          </motion.div>

          {/* Timeline Nodes */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="space-y-16 md:space-y-24"
          >
            {education.map((edu) => (
              <motion.div 
                key={edu.id}
                variants={fadeUp}
                className="relative"
              >
                {/* Bullet node dot */}
                <div className="absolute -left-[34px] md:-left-[66px] top-1.5 flex items-center justify-center">
                  {edu.current ? (
                    <div className="relative w-[14px] h-[14px] md:w-[18px] md:h-[18px] flex items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-accent-blue/35 animate-ping" />
                      <span className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-accent-blue relative z-10 border-2 border-base-950" />
                    </div>
                  ) : (
                    <div className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] rounded-full bg-base-950 border-2 border-line flex items-center justify-center">
                      <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-line" />
                    </div>
                  )}
                </div>

                {/* Card Content Panel */}
                <div className="bg-base-900 border border-line p-6 md:p-8 rounded-2xl shadow-[0_8px_30px_rgba(59,130,246,0.02)] hover:shadow-[0_12px_36px_rgba(59,130,246,0.1)] hover:border-accent-blue/50 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
                    
                    {/* Degree & Institutional Details */}
                    <div>
                      <h3 className="font-display font-extrabold text-lg md:text-xl text-ink-100 tracking-tight">
                        {edu.degree}
                      </h3>
                      <p className="font-sans text-[10px] text-accent-cyan tracking-wider font-extrabold mt-1.5 uppercase">
                        {edu.institution} · <span className="font-light text-ink-400">{edu.location}</span>
                      </p>
                    </div>

                    {/* Date badge */}
                    <div className="text-left md:text-right font-sans text-[9px] font-bold text-ink-400 bg-base-950/65 px-3 py-1 border border-line rounded-full h-fit w-fit select-none">
                      {edu.duration}
                    </div>

                  </div>

                  {/* Grade Badge */}
                  <div className="mt-3 inline-flex items-center gap-1 px-2.5 py-0.5 bg-accent-blue/5 border border-accent-blue/20 text-accent-cyan font-sans text-[9px] font-bold uppercase rounded-full select-none shadow-[inset_0_1px_6px_rgba(59,130,246,0.06)]">
                    <span>{edu.grade}</span>
                  </div>

                  {/* Description details */}
                  <p className="mt-4 text-xs md:text-sm text-ink-400 font-body font-light leading-relaxed">
                    {edu.details}
                  </p>
                </div>

              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
