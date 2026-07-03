import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fadeUp, staggerContainer, blurReveal } from "../utils/motionVariants";
import { TypewriterLabel } from "./TextReveal";
import { Mail, Phone, MapPin, Copy, Check } from "lucide-react";

function Github({ size = 16, className }) {
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

function Linkedin({ size = 16, className }) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}


export default function Contact() {
  const [copied, setCopied] = useState(false);
  const labelRef = useRef(null);
  const labelInView = useInView(labelRef, { once: false, margin: "-100px" });

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("akashbhadane7227@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="contact" 
      className="py-24 md:py-36 border-t border-line bg-base-900/10 px-6 md:px-12 grid-bg relative"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between min-h-[50vh]">
        
        {/* Contact content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full">
          
          {/* Left Column: Bold statement */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow: Styled as a thin rounded pill with a soft blue border and subtle inner glow */}
            <div ref={labelRef} className="mb-8 block h-fit w-fit">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 shadow-[inset_0_1px_12px_rgba(59,130,246,0.15)] backdrop-blur-sm">
                <TypewriterLabel 
                  text="06 // CONTACT & CONNECT" 
                  className="font-sans text-[10px] tracking-widest font-bold text-accent-blue uppercase" 
                />
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold text-ink-100 tracking-tight leading-[1.05]">
              <span className="block overflow-hidden py-1">
                <motion.span
                  initial={{ y: "105%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="block"
                >
                  Let's build something
                </motion.span>
              </span>
              <span className="block overflow-hidden py-1">
                <motion.span
                  initial={{ y: "105%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                  className="block"
                >
                  secure &amp; <span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent animate-pulse">scalable.</span>
                </motion.span>
              </span>
            </h2>

            <motion.p
              variants={blurReveal}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, margin: "-100px" }}
              className="text-ink-400 font-body font-light text-sm md:text-base max-w-lg leading-relaxed pt-2"
            >
              Whether you are looking to hire a full-stack engineer, discuss system architecture, or just share technical practices, feel free to reach out. I am currently open to full-time opportunities.
            </motion.p>
          </div>

          {/* Right Column: Details Card */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            className="lg:col-span-5 bg-base-900 border border-line p-6 md:p-8 space-y-8 rounded-2xl w-full shadow-[0_8px_30px_rgba(59,130,246,0.02)] hover:border-accent-blue/50 hover:shadow-[0_12px_36px_rgba(59,130,246,0.1)] transition-all duration-300"
          >
            <h3 className="font-sans text-[10px] text-accent-cyan tracking-widest uppercase font-extrabold border-b border-line pb-3">
              DIRECT CONTACT
            </h3>

            {/* Email field with Clipboard toast */}
            <motion.div variants={fadeUp} className="space-y-2 relative">
              <span className="font-sans text-[9px] text-ink-400 tracking-widest uppercase block font-bold">EMAIL</span>
              <div className="flex items-center justify-between gap-3 p-3 bg-base-950 border border-line hover:border-accent-blue/50 rounded-xl transition-colors duration-300">
                <span className="font-mono text-xs md:text-sm text-ink-100 truncate select-all">
                  akashbhadane7227@gmail.com
                </span>
                
                {/* Copy Clipboard trigger */}
                <div className="relative">
                  <button
                    onClick={copyEmailToClipboard}
                    className="p-1.5 border border-line hover:border-accent-blue hover:bg-accent-blue/5 text-ink-400 hover:text-accent-blue rounded-full transition-colors duration-300 relative"
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? <Check size={14} className="text-accent-blue" /> : <Copy size={14} />}
                  </button>

                  {/* Toast Bubble */}
                  <AnimatePresence>
                    {copied && (
                      <motion.span
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        className="absolute right-0 bottom-full mb-2.5 px-3 py-1.5 bg-gradient-to-r from-accent-blue to-accent-cyan text-white font-sans text-[9px] font-bold tracking-widest uppercase rounded-full shadow-lg z-20"
                      >
                        Copied!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Phone Field */}
            <motion.div variants={fadeUp} className="space-y-1">
              <span className="font-sans text-[9px] text-ink-400 tracking-widest uppercase block font-bold">PHONE</span>
              <a 
                href="tel:+917499490541"
                className="font-mono text-sm md:text-base text-ink-100 hover:text-accent-blue transition-colors inline-block"
              >
                +91 74994 90541
              </a>
            </motion.div>

            {/* Location Field */}
            <motion.div variants={fadeUp} className="space-y-1">
              <span className="font-sans text-[9px] text-ink-400 tracking-widest uppercase block font-bold">LOCATION</span>
              <span className="font-body text-sm md:text-base text-ink-100 block">
                Nashik, Maharashtra, India
              </span>
            </motion.div>

            {/* Socials Row */}
            <motion.div variants={fadeUp} className="pt-2 border-t border-line">
              <span className="font-sans text-[9px] text-ink-400 tracking-widest uppercase block mb-3 font-bold">SOCIAL NETWORKS</span>
              <div className="flex gap-3">
                {/* LinkedIn */}
                <a
                  href="https://linkedin.com/in/akash-bhadane3501"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center p-3 border border-line hover:border-accent-blue bg-base-950 text-ink-400 hover:text-accent-blue rounded-full hover:-translate-y-1 transition-all duration-350"
                  aria-label="Akash Bhadane LinkedIn profile link"
                >
                  <Linkedin size={16} />
                </a>
                
                {/* GitHub */}
                <a
                  href="https://github.com/AkashB1015"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center p-3 border border-line hover:border-accent-blue bg-base-950 text-ink-400 hover:text-accent-blue rounded-full hover:-translate-y-1 transition-all duration-350"
                  aria-label="Akash Bhadane GitHub profile link"
                >
                  <Github size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer line at very bottom */}
        <div className="border-t border-line/60 pt-8 mt-24 flex flex-col sm:flex-row items-center justify-between gap-4 w-full font-sans text-[10px] font-bold text-ink-400 tracking-wider">
          <div>
            DESIGNED &amp; BUILT BY AKASH BHADANE
          </div>
          <div>
            &copy; {new Date().getFullYear()} · ALL RIGHTS RESERVED
          </div>
        </div>

      </div>
    </section>
  );
}
