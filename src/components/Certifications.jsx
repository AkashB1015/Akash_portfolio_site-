import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { certifications } from "../data/certifications";
import { badgePop } from "../utils/motionVariants";
import * as LucideIcons from "lucide-react";
import { LineReveal, TypewriterLabel } from "./TextReveal";

function CertIcon({ iconName }) {
  const IconComponent = LucideIcons[iconName] || LucideIcons.Award;
  return <IconComponent className="text-accent-blue w-6 h-6 relative z-10" />;
}

export default function Certifications() {
  const sectionRef = useRef(null);
  const [activeCert, setActiveCert] = useState(null);
  const labelRef = useRef(null);
  // Mount-delay skeleton: shows shape-matching card skeletons for ~200ms on mount
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

  const glowTealX = useTransform(scrollYProgress, [0, 1], [-15, 20]);
  const glowTealY = useTransform(scrollYProgress, [0, 1], [15, -20]);

  return (
    <section 
      ref={sectionRef}
      id="certifications" 
      className="py-24 md:py-36 border-t border-line bg-base-900/10 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Ambient background glow: soft teal centered behind cards */}
      <motion.div 
        style={{ x: glowTealX, y: glowTealY }}
        className="glow-ambient glow-teal absolute left-1/3 top-10 w-[550px] h-[550px] opacity-100"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Eyebrow: Styled as a thin rounded pill with a soft blue border and subtle inner glow */}
        <div ref={labelRef} className="mb-8 block h-fit w-fit">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 shadow-[inset_0_1px_12px_rgba(59,130,246,0.15)] backdrop-blur-sm">
            <TypewriterLabel 
              text="05 // CERTIFICATIONS" 
              className="font-sans text-[10px] tracking-widest font-bold text-accent-blue uppercase" 
            />
          </span>
        </div>

        {/* Section Heading: Curtain Line reveal */}
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-ink-100 tracking-tight mb-20 max-w-3xl leading-tight">
          <LineReveal lines={[
            <span><span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">Validated credentials</span> from leading</span>,
            "technology providers."
          ]} />
        </h2>

        {/* Staggered Badge Trading Card Grid — skeleton while !ready */}
        {!ready ? (
          /* Shape-matching skeleton: same 3-col grid, same 280px card height */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="relative w-full h-[280px] bg-base-900 border border-line rounded-2xl overflow-hidden"
              >
                <div className="skeleton-shimmer absolute inset-0" />
                {/* Badge circle placeholder */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-14 h-14 skeleton-shimmer rounded-full" />
                {/* Title placeholder */}
                <div className="absolute top-28 left-1/2 -translate-x-1/2 w-32 h-3 skeleton-shimmer rounded-full" />
                <div className="absolute top-36 left-1/2 -translate-x-1/2 w-20 h-2.5 skeleton-shimmer rounded-full" />
                {/* Badge pill placeholder */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-28 h-6 skeleton-shimmer rounded-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              variants={badgePop}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              animate={{
                y: [0, -4, 0]
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                  delay: index * 0.25
                }
              }}
              className="relative w-full h-[280px] perspective-1000 group cursor-pointer"
            >
              {/* Card Container for 3D Flip */}
              <div className="absolute inset-0 transition-transform duration-700 transform-style-3d group-hover:rotate-y-180 w-full h-full">
                
                {/* Front Face */}
                <div className="absolute inset-0 backface-hidden bg-base-900 border border-line p-6 flex flex-col justify-between items-center rounded-2xl shadow-[0_8px_30px_rgba(59,130,246,0.02)] hover:shadow-[0_12px_36px_rgba(59,130,246,0.1)] group-hover:border-accent-blue/50 transition-all duration-300">
                  
                  {/* Glowing Badge Area with Shine Sweep */}
                  <div className="relative w-14 h-14 rounded-full bg-base-950 border border-accent-blue/35 flex items-center justify-center overflow-hidden group-hover:rotate-[360deg] group-hover:scale-110 group-hover:border-accent-blue transition-all duration-[800ms] ease-out">
                    <CertIcon iconName={cert.icon} />
                    
                    {/* Continuous shine sweep element */}
                    <div className="absolute top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 animate-shine-sweep" />
                  </div>

                  {/* Title & Organization */}
                  <div className="text-center space-y-1.5">
                    <h3 className="font-display font-bold text-base text-ink-100 px-2 line-clamp-2">
                      {cert.title}
                    </h3>
                    <p className="font-sans text-[10px] tracking-wider font-semibold text-ink-400">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Verified Credential Tag */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-blue/5 border border-accent-blue/20 text-accent-cyan font-sans text-[8px] font-bold uppercase tracking-wider rounded-full select-none shadow-[inset_0_1px_6px_rgba(59,130,246,0.06)] group-hover:bg-accent-blue/15 group-hover:border-accent-blue/45 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.2)] transition-all duration-300">
                    <LucideIcons.ShieldCheck size={10} className="text-accent-cyan fill-accent-cyan/10" />
                    <span>Verified License</span>
                  </div>
                </div>

                {/* Back Face (Detail Face) */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 bg-base-900 border border-accent-blue/40 p-6 flex flex-col justify-between items-center text-center rounded-2xl shadow-[0_8px_30px_rgba(59,130,246,0.02)]">
                  <div className="space-y-3">
                    <span className="font-sans text-[8px] uppercase tracking-widest font-bold text-accent-cyan border border-accent-cyan/30 px-2 py-0.5 rounded-full">
                      {cert.type}
                    </span>
                    <h4 className="font-display font-bold text-sm text-ink-100 mt-2">
                      {cert.title}
                    </h4>
                    <p className="text-[11px] text-ink-400 leading-normal font-light">
                      {cert.details}
                    </p>
                  </div>

                  <div className="w-full flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveCert(cert);
                      }}
                      className="flex-grow py-2 bg-base-950 border border-line hover:border-accent-blue text-ink-100 hover:text-accent-blue transition-colors duration-300 font-sans text-[9px] font-bold tracking-widest uppercase rounded-full"
                    >
                      VIEW CERTIFICATE
                    </button>
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 border border-line hover:border-accent-blue bg-base-950 text-ink-400 hover:text-accent-blue rounded-full transition-colors duration-300"
                      aria-label="Verify credential link"
                    >
                      <LucideIcons.ExternalLink size={12} />
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
          </div>
        )}

        {/* Modal/Lightbox for Certificate Images */}
        <AnimatePresence>
          {activeCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCert(null)}
              className="fixed inset-0 bg-base-950/90 backdrop-blur-md z-[100] flex items-center justify-center p-6 cursor-zoom-out"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl bg-base-900 border border-line rounded-2xl p-8 md:p-12 relative cursor-default shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveCert(null)}
                  className="absolute top-4 right-4 text-ink-400 hover:text-accent-blue transition-colors p-2"
                  aria-label="Close certificate detail"
                >
                  <LucideIcons.X size={20} />
                </button>

                {activeCert.imageUrl ? (
                  <img
                    src={activeCert.imageUrl}
                    alt={activeCert.title}
                    className="w-full h-auto rounded-xl object-contain border border-line"
                  />
                ) : (
                  /* Procedurally render a gorgeous virtual certificate template */
                  <div className="w-full aspect-[4/3] bg-[#0E1013] border border-accent-blue/30 flex flex-col justify-between p-6 md:p-10 text-center relative overflow-hidden rounded-xl select-none">
                    
                    {/* Background faint logo watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] text-accent-blue scale-[3] pointer-events-none">
                      <LucideIcons.Award size={150} />
                    </div>

                    {/* Certificate Header */}
                    <div className="space-y-1">
                      <span className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.25em] text-accent-blue uppercase block">
                        CERTIFICATE OF COMPLETION
                      </span>
                      <div className="w-16 h-[1px] bg-accent-blue/30 mx-auto mt-2" />
                    </div>

                    {/* Certificate Body */}
                    <div className="space-y-4 my-auto">
                      <p className="font-body font-light text-[11px] md:text-sm text-ink-400">
                        This is to certify that the credential for
                      </p>
                      <h3 className="font-display font-extrabold text-xl md:text-3xl text-ink-100 tracking-wide">
                        {activeCert.title}
                      </h3>
                      <p className="font-body font-light text-[11px] md:text-sm text-ink-400">
                        has been successfully awarded and verified by
                      </p>
                      <h4 className="font-sans text-xs md:text-sm text-accent-cyan font-bold tracking-widest uppercase">
                        {activeCert.issuer.toUpperCase()}
                      </h4>
                    </div>

                    {/* Certificate Footer */}
                    <div className="flex justify-between items-end border-t border-line/60 pt-4 md:pt-6">
                      <div className="text-left space-y-1">
                        <span className="text-[8px] md:text-[9px] font-sans font-bold text-ink-400 block">CREDENTIAL ID</span>
                        <span className="text-[9px] md:text-xs font-sans text-ink-100 tracking-wider">VERIFIED-{activeCert.id.toUpperCase()}-2026</span>
                      </div>

                      {/* Blue Seal Medallion */}
                      <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 aspect-square rounded-full bg-accent-blue/10 border-2 border-accent-blue flex items-center justify-center relative">
                        <LucideIcons.Award className="text-accent-blue w-6 h-6 md:w-8 md:h-8" />
                        <div className="absolute inset-0 rounded-full border border-dashed border-accent-cyan/40 animate-spin" style={{ animationDuration: '20s' }} />
                      </div>

                      <div className="text-right space-y-1">
                        <span className="text-[8px] md:text-[9px] font-sans font-bold text-ink-400 block">ISSUED YEAR</span>
                        <span className="text-[9px] md:text-xs font-sans text-ink-100">{activeCert.year}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* External link back inside modal */}
                <div className="mt-6 flex justify-between items-center">
                  <p className="text-xs text-ink-400">
                    Verify this license directly with the official authority.
                  </p>
                  <a
                    href={activeCert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-gradient-to-r from-accent-blue to-accent-cyan text-white font-sans text-[10px] font-bold tracking-widest px-5 py-2.5 rounded-full hover:shadow-[0_4px_16px_rgba(56,189,248,0.3)] transition-all duration-300"
                  >
                    <span>VERIFY LICENSE</span>
                    <LucideIcons.ExternalLink size={12} />
                  </a>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
