import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { education } from "../data/education";
import { LineReveal, TypewriterLabel } from "./TextReveal";

/* ─────────────────────────────────────────────────────────────────────────
   CONSTANTS & META
───────────────────────────────────────────────────────────────────────── */
// The rail column is RAIL_COL_W px wide. The vertical line sits at its center.
const RAIL_COL_W = 64; // px — total width of the rail/node column
const RAIL_LINE_LEFT = RAIL_COL_W / 2; // 32px from the left — line center

// Card-to-card gap (external to both node and card so centering math is clean)
const CARD_GAP = "mb-14"; // ~56px — Tailwind class on every entry except last

const eduMeta = {
  "pg-dac": {
    accent: "#38BDF8",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M10 2L2 6l8 4 8-4-8-4z" />
        <path d="M2 10l8 4 8-4" />
        <path d="M2 14l8 4 8-4" />
      </svg>
    ),
    tags: ["Java EE", "Spring Boot", "ASP.NET Core", "MERN Stack", "Microservices", "SQL / NoSQL"],
  },
  btech: {
    accent: "#3B82F6",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <rect x="2" y="7" width="16" height="11" rx="1.5" />
        <path d="M6 7V5a4 4 0 0 1 8 0v2" />
        <path d="M10 11v3" />
        <circle cx="10" cy="11" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    tags: ["Data Structures", "OOP (C++/Java)", "DBMS", "OS", "Software Engineering"],
  },
};

/* ─────────────────────────────────────────────────────────────────────────
   RAIL NODE
   isActive  — in-view scroll state
   isHovered — shared hover state from parent EduEntry
───────────────────────────────────────────────────────────────────────── */
function RailNode({ meta, isActive, isHovered }) {
  const accent = meta.accent;

  // Node reacts both to scroll-active state AND card hover
  const glowIntensity = isHovered ? "strong" : isActive ? "normal" : "off";

  const borderColor = {
    strong: accent,
    normal: accent,
    off:    accent + "50",
  }[glowIntensity];

  const bgColor = {
    strong: accent + "30",
    normal: accent + "22",
    off:    "rgb(var(--color-base-950))",
  }[glowIntensity];

  const iconColor = {
    strong: accent,
    normal: accent,
    off:    accent + "80",
  }[glowIntensity];

  const boxShadow = {
    strong: `0 0 20px ${accent}66, 0 0 40px ${accent}28`,
    normal: `0 0 14px ${accent}44, 0 0 28px ${accent}18`,
    off:    "none",
  }[glowIntensity];

  const nodeScale = isHovered ? 1.08 : isActive ? 1.12 : 1;

  return (
    <motion.div
      className="relative flex items-center justify-center flex-shrink-0 z-20"
      style={{ width: 44, height: 44 }}
      animate={{
        scale: nodeScale,
        transition: { type: "spring", stiffness: 320, damping: 22 },
      }}
    >
      {/* Ping rings — active scroll state */}
      {isActive && (
        <>
          <span
            className="absolute inset-0 rounded-full animate-ping opacity-20 pointer-events-none"
            style={{ background: accent }}
          />
          <span
            className="absolute inset-[-7px] rounded-full animate-ping opacity-10 pointer-events-none"
            style={{ background: accent, animationDelay: "0.45s" }}
          />
        </>
      )}

      {/* Extra hover-only ring (on top of ping) */}
      {isHovered && (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-[-4px] rounded-full pointer-events-none"
          style={{ border: `1.5px solid ${accent}55` }}
        />
      )}

      {/* Node circle */}
      <motion.div
        className="relative w-11 h-11 rounded-full flex items-center justify-center z-10 border-2"
        animate={{
          background:  bgColor,
          borderColor: borderColor,
          color:       iconColor,
          boxShadow:   boxShadow,
          transition:  { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{
          background:  bgColor,
          borderColor: borderColor,
          color:       iconColor,
          boxShadow:   boxShadow,
        }}
      >
        {meta.icon}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   TAG PILLS
───────────────────────────────────────────────────────────────────────── */
const tagStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.22 } },
};
const tagItem = {
  hidden:  { opacity: 0, y: 7, scale: 0.87 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.36, ease: [0.16, 1, 0.3, 1] } },
};

/* ─────────────────────────────────────────────────────────────────────────
   CARD CONTENT
   isActive  — scroll in-view state
   isHovered — shared hover state from parent EduEntry
───────────────────────────────────────────────────────────────────────── */
function EduCardContent({ edu, meta, isActive, isHovered, onHoverStart, onHoverEnd }) {
  const accent = meta.accent;

  return (
    <motion.div
      className="relative bg-base-900 rounded-2xl p-6 md:p-8 overflow-hidden will-change-transform cursor-default"
      // Border is set via animate so it crossfades (300ms) between states
      animate={{
        border: isHovered
          ? `1px solid ${accent}66`
          : isActive
          ? `1px solid ${accent}40`
          : "1px solid rgb(var(--color-line))",
        boxShadow: isHovered
          ? `0 12px 36px ${accent}20, 0 4px 16px ${accent}12, 0 0 0 1px ${accent}22`
          : isActive
          ? `0 6px 24px ${accent}0a`
          : "0 4px 16px rgba(0,0,0,0.1)",
        y: isHovered ? -3 : 0,
        transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
      }}
      // Touch tap equivalent (scale instead of lift)
      whileTap={{ scale: 0.99 }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
    >
      {/* Scroll-triggered top accent bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
        className="absolute top-0 left-0 right-0 h-[2px] origin-left rounded-t-2xl"
        style={{ background: `linear-gradient(to right, ${accent}, ${accent}00)` }}
      />

      {/* Top-right corner glow — brightens on hover */}
      <motion.div
        className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl pointer-events-none"
        animate={{
          opacity: isHovered ? 0.55 : isActive ? 0.18 : 0,
          transition: { duration: 0.32 },
        }}
        style={{ background: accent + "30" }}
      />

      {/* Active/current radial tint */}
      {isActive && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at top left, ${accent}09 0%, transparent 65%)`,
          }}
        />
      )}

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-extrabold text-base md:text-xl text-ink-100 leading-tight tracking-tight">
            {edu.degree}
          </h3>
          <p
            className="font-sans text-[10px] tracking-widest font-bold uppercase mt-1.5 leading-tight"
            style={{ color: accent }}
          >
            {edu.institution}
          </p>
          <p className="font-sans text-[10px] text-ink-400 mt-0.5">{edu.location}</p>
        </div>

        {/* Duration + active badge */}
        <div className="flex-shrink-0 text-right space-y-1.5">
          <motion.div
            className="font-sans text-[9px] font-bold text-ink-400 bg-base-950/70 border border-line
                       px-2.5 py-1 rounded-full whitespace-nowrap inline-block"
            animate={{
              scale: isHovered ? 1.05 : 1,
              transition: { duration: 0.25 },
            }}
          >
            {edu.duration}
          </motion.div>
          {edu.current && (
            <div className="flex items-center gap-1 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] font-sans text-emerald-400 font-bold tracking-wide">ACTIVE</span>
            </div>
          )}
        </div>
      </div>

      {/* Grade badge */}
      <div
        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px]
                   font-sans font-bold uppercase tracking-wider mb-4 select-none"
        style={{ color: accent, borderColor: accent + "40", background: accent + "0f" }}
      >
        <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: accent }} />
        {edu.grade}
      </div>

      {/* Description */}
      <p className="text-xs text-ink-400 font-body font-light leading-relaxed mb-5">
        {edu.details}
      </p>

      {/* Tag pills — stagger on scroll-enter; per-pill hover is always-on */}
      <motion.div
        variants={tagStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-40px" }}
        className="flex flex-wrap gap-1.5"
      >
        {(meta.tags || []).map((tag) => (
          <motion.span
            key={tag}
            variants={tagItem}
            whileHover={{
              scale: 1.07,
              color: "#f1f5f9",
              borderColor: accent + "60",
              transition: { duration: 0.18 },
            }}
            className="px-2.5 py-0.5 rounded-full border border-line bg-base-950/50
                       text-[9px] font-sans font-bold text-ink-400
                       cursor-default select-none"
          >
            {tag}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SINGLE ENTRY ROW
   ┌─ RAIL_COL_W ─┬─ flex-1 card ─┐
   │   [node]     │  [card]        │
   └──────────────┴────────────────┘
   Row uses items-center so the node is always vertically centered against
   the card, regardless of card content length — no JS measurement needed.
   The gap between cards is a bottom margin on the outer row (not pb on the
   card column), so it doesn't factor into the node-centering math.
───────────────────────────────────────────────────────────────────────── */
function EduEntry({ edu, index, isLast }) {
  const meta    = eduMeta[edu.id] || { accent: "#38BDF8", icon: null, tags: [] };
  const rowRef  = useRef(null);

  // ── Scroll in-view (drives "active" rail/node state) ──
  // -25% top/bottom margin = card must be >25% scrolled into the viewport to activate
  const inView = useInView(rowRef, { margin: "-25% 0px -25% 0px" });

  // ── Shared hover state (card hover → node reacts) ──
  const [hovered, setHovered] = useState(false);

  // ── Subtle parallax on node only (rail moves at ~93% scroll rate) ──
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start bottom", "end top"],
  });
  const nodeY = useSpring(
    useTransform(scrollYProgress, [0, 1], [5, -5]),
    { stiffness: 65, damping: 18 }
  );

  // Card entrance: slides in from rail side (x: -18 → 0)
  const cardVariant = {
    hidden:  { opacity: 0, x: -18 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.68, ease: [0.16, 1, 0.3, 1], delay: 0.10 },
    },
  };

  return (
    // items-center: node is always at the vertical center of the card row
    // The bottom margin (CARD_GAP) creates breathing room *outside* the row,
    // so it doesn't affect the centering math at all.
    <div
      ref={rowRef}
      className={`flex items-center gap-0 relative ${isLast ? "" : CARD_GAP}`}
    >
      {/* ── Rail column (fixed width, node centered) ── */}
      <div
        className="flex-shrink-0 flex items-center justify-center self-stretch"
        style={{ width: `${RAIL_COL_W}px` }}
      >
        <motion.div style={{ y: nodeY }}>
          <RailNode
            meta={meta}
            isActive={inView}
            isHovered={hovered}
          />
        </motion.div>
      </div>

      {/* ── Card column ── */}
      <div className="flex-1 min-w-0">
        <motion.div
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-80px" }}
        >
          <EduCardContent
            edu={edu}
            meta={meta}
            isActive={inView}
            isHovered={hovered}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={()   => setHovered(false)}
          />
        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SCROLL-FILL RAIL LINE
   One continuous line: dim track (always) + filled portion (scroll-scrubbed).
   Both are absolute elements spanning the full height of timelineRef.
   Since timelineRef height = sum of natural card heights + gaps, the fill
   animation stays in sync automatically after any spacing change.
───────────────────────────────────────────────────────────────────────── */
function ScrollRail({ containerRef }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 78%", "end 22%"],
  });

  const fillH = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
    { stiffness: 55, damping: 16 }
  );

  const lineLeft = `${RAIL_LINE_LEFT}px`;

  return (
    <>
      {/* Dim track — always full height */}
      <div
        className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
        style={{ left: lineLeft, background: "rgb(var(--color-line))", opacity: 0.45 }}
      />
      {/* Scroll-driven fill — grows downward as user scrolls */}
      <motion.div
        className="absolute top-0 w-[2px] pointer-events-none"
        style={{
          left:       lineLeft,
          height:     fillH,
          background: "linear-gradient(to bottom, #38BDF8, #3B82F6 80%)",
          boxShadow:  "0 0 10px rgba(56,189,248,0.55), 0 0 4px rgba(56,189,248,0.9)",
        }}
      />
    </>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────────────────────────────────────── */
export default function Education() {
  const sectionRef  = useRef(null);
  const timelineRef = useRef(null);

  const { scrollYProgress: secProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(secProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="py-24 md:py-36 border-t border-line bg-base-950 px-6 md:px-12 relative overflow-hidden"
    >
      {/* Ambient glow: soft teal centered behind the timeline rail */}
      <motion.div
        style={{ y: bgY }}
        aria-hidden="true"
        className="glow-ambient glow-teal absolute top-12 left-8 md:left-24 w-[500px] h-[500px] opacity-100"
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── Eyebrow ── */}
        <div className="mb-8 block h-fit w-fit">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 shadow-[inset_0_1px_12px_rgba(59,130,246,0.15)] backdrop-blur-sm">
            <TypewriterLabel
              text="02 // EDUCATION"
              className="font-sans text-[10px] tracking-widest font-bold text-accent-blue uppercase"
            />
          </span>
        </div>

        {/* ── Heading ── */}
        <h2 className="text-3xl md:text-5xl font-display font-extrabold text-ink-100 tracking-tight mb-20 max-w-3xl leading-tight">
          <LineReveal lines={[
            <span key="l1">
              An{" "}
              <span className="bg-gradient-to-r from-accent-blue to-accent-cyan bg-clip-text text-transparent">
                academic base
              </span>{" "}
              in CS engineering
            </span>,
            "reinforced by specialized system programming.",
          ]} />
        </h2>

        {/* ── Timeline ─────────────────────────────────────────────────────
            Structure:
              [timelineRef — position:relative]
                [ScrollRail — absolute, full height of container]
                [EduEntry]  — flex row: [RAIL_COL_W node] [flex-1 card]
                              items-center → node at vertical center of card
                              mb-14 (external gap, doesn't affect centering)
                [EduEntry]  — last, no mb
          ────────────────────────────────────────────────────────────────── */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          <ScrollRail containerRef={timelineRef} />
          {education.map((edu, index) => (
            <EduEntry
              key={edu.id}
              edu={edu}
              index={index}
              isLast={index === education.length - 1}
            />
          ))}
        </div>

        {/* ── Currently enrolled pill ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          className="flex justify-center mt-14 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-accent-cyan/30 bg-accent-cyan/5 backdrop-blur-sm shadow-[inset_0_1px_8px_rgba(56,189,248,0.08)]">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            <span className="font-sans text-[10px] tracking-widest text-accent-cyan font-bold uppercase">
              Currently enrolled · CDAC Mumbai 2025–2026
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
