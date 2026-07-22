import { useRef, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { projects } from "../data/projects";
import { projectSlideLeft, projectSlideRight } from "../utils/motionVariants";
import { ArrowUpRight } from "lucide-react";
import { SplitText, TypewriterLabel, LineReveal } from "./TextReveal";
import ImageWithSkeleton from "./ImageWithSkeleton";

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

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECT UI MOCKUPS
   Rich SVG illustrations that represent each project's actual dashboard UI.
   These replace the generic dot/line placeholder (BrowserVisualizer).
───────────────────────────────────────────────────────────────────────────── */

/** RoadRescue — ASSISTLY roadside assistance dashboard */
function RoadRescueMockup() {
  return (
    <svg viewBox="0 0 320 192" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Dark dashboard background */}
      <rect width="320" height="192" fill="#0a0f1c" />

      {/* ── Sidebar ── */}
      <rect width="52" height="192" fill="#0f1628" />
      {/* Logo area */}
      <circle cx="26" cy="22" r="10" fill="#3B82F6" opacity="0.9" />
      <text x="26" y="26" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="sans-serif">R</text>
      {/* Nav dots */}
      {[52, 72, 92, 112, 132].map((y, i) => (
        <rect key={i} x="14" y={y} width="24" height="6" rx="3" fill={i === 0 ? "#3B82F6" : "#1e2a3a"} />
      ))}
      {/* Active indicator line */}
      <rect x="0" y="48" width="3" height="12" rx="1.5" fill="#3B82F6" />

      {/* ── Top navbar ── */}
      <rect x="52" y="0" width="268" height="32" fill="#0d1520" />
      <text x="68" y="20" fill="#94a3b8" fontSize="7" fontFamily="sans-serif">RoadRescue · Live Dashboard</text>
      {/* Status pill */}
      <rect x="240" y="10" width="48" height="12" rx="6" fill="#3B82F61a" />
      <circle cx="250" cy="16" r="3" fill="#22c55e" />
      <text x="256" y="19" fill="#22c55e" fontSize="6" fontFamily="sans-serif">ACTIVE</text>

      {/* ── Map area (main content) ── */}
      <rect x="52" y="32" width="162" height="108" fill="#0f1a2e" />
      {/* Map grid roads */}
      {[50, 65, 80, 95, 108, 122].map((y) => (
        <line key={y} x1="52" y1={y} x2="214" y2={y} stroke="#1e3050" strokeWidth="0.5" />
      ))}
      {[80, 106, 132, 158, 184, 210].map((x) => (
        <line key={x} x1={x} y1="32" x2={x} y2="140" stroke="#1e3050" strokeWidth="0.5" />
      ))}
      {/* Major roads */}
      <line x1="52" y1="86" x2="214" y2="86" stroke="#263d5e" strokeWidth="2.5" />
      <line x1="133" y1="32" x2="133" y2="140" stroke="#263d5e" strokeWidth="2.5" />
      {/* Route path */}
      <path d="M85 120 Q110 90 133 86 Q155 82 175 65" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 2" fill="none" />
      {/* User pin */}
      <circle cx="85" cy="120" r="5" fill="#3B82F6" opacity="0.9" />
      <circle cx="85" cy="120" r="9" fill="#3B82F6" opacity="0.15" />
      <circle cx="85" cy="120" r="13" fill="#3B82F6" opacity="0.08" />
      {/* Provider pins */}
      <circle cx="175" cy="65" r="4" fill="#f59e0b" />
      <circle cx="155" cy="100" r="3" fill="#f59e0b" opacity="0.6" />
      <circle cx="110" cy="70" r="3" fill="#f59e0b" opacity="0.6" />
      {/* Map label */}
      <text x="58" y="44" fill="#38BDF8" fontSize="5.5" fontFamily="sans-serif" opacity="0.7">LIVE MAP · NASHIK, MH</text>

      {/* ── Request card ── */}
      <rect x="218" y="32" width="102" height="70" rx="4" fill="#0f1628" stroke="#1e2a3a" strokeWidth="0.5" />
      <text x="226" y="44" fill="#94a3b8" fontSize="5.5" fontFamily="sans-serif">ACTIVE REQUEST</text>
      <rect x="225" y="48" width="30" height="3" rx="1.5" fill="#3B82F6" />
      <text x="226" y="62" fill="#f1f5f9" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">Flat Tyre · Sector 4</text>
      <text x="226" y="72" fill="#64748b" fontSize="5.5" fontFamily="sans-serif">Raj Mehta · ★ 4.9</text>
      {/* ETA badge */}
      <rect x="225" y="78" width="36" height="14" rx="7" fill="#3B82F620" />
      <text x="242" y="88" fill="#38BDF8" fontSize="6" textAnchor="middle" fontFamily="sans-serif">ETA 8 min</text>
      {/* Accept button */}
      <rect x="266" y="78" width="44" height="14" rx="7" fill="#3B82F6" />
      <text x="288" y="88" fill="white" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif">DISPATCH</text>

      {/* ── Payment panel ── */}
      <rect x="218" y="108" width="102" height="32" rx="4" fill="#0f1628" stroke="#1e2a3a" strokeWidth="0.5" />
      <text x="226" y="120" fill="#94a3b8" fontSize="5.5" fontFamily="sans-serif">PAYMENT · Razorpay</text>
      <text x="226" y="132" fill="#f1f5f9" fontSize="7" fontWeight="bold" fontFamily="sans-serif">₹ 599.00</text>
      <rect x="280" y="120" width="32" height="12" rx="6" fill="#22c55e" />
      <text x="296" y="129" fill="white" fontSize="5" textAnchor="middle" fontFamily="sans-serif">PAID</text>

      {/* ── Bottom stats bar ── */}
      <rect x="52" y="140" width="268" height="52" fill="#0d1520" />
      {[
        { x: 80, label: "Active Jobs", val: "12" },
        { x: 160, label: "Providers", val: "8" },
        { x: 240, label: "Response", val: "~4m" },
      ].map(({ x, label, val }) => (
        <g key={x}>
          <text x={x} y="156" fill="#475569" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif">{label}</text>
          <text x={x} y="169" fill="#38BDF8" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">{val}</text>
        </g>
      ))}
      {/* Bottom dividers */}
      <line x1="120" y1="148" x2="120" y2="180" stroke="#1e2a3a" strokeWidth="0.5" />
      <line x1="200" y1="148" x2="200" y2="180" stroke="#1e2a3a" strokeWidth="0.5" />

      {/* JWT / RBAC badge */}
      <rect x="62" y="178" width="28" height="8" rx="4" fill="#3B82F615" />
      <text x="76" y="184" fill="#3B82F6" fontSize="4.5" textAnchor="middle" fontFamily="sans-serif">JWT AUTH</text>
      <rect x="95" y="178" width="28" height="8" rx="4" fill="#8B5CF615" />
      <text x="109" y="184" fill="#8B5CF6" fontSize="4.5" textAnchor="middle" fontFamily="sans-serif">RBAC</text>
      <rect x="128" y="178" width="40" height="8" rx="4" fill="#f59e0b15" />
      <text x="148" y="184" fill="#f59e0b" fontSize="4.5" textAnchor="middle" fontFamily="sans-serif">GOOGLE MAPS API</text>
    </svg>
  );
}

/** Think-X — QUANTA quiz dashboard */
function ThinkXMockup() {
  return (
    <svg viewBox="0 0 320 192" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="320" height="192" fill="#080c18" />

      {/* ── Top navbar ── */}
      <rect width="320" height="28" fill="#0d1225" />
      {/* Logo */}
      <text x="16" y="18" fill="#38BDF8" fontSize="9" fontWeight="bold" fontFamily="sans-serif">ThinkX</text>
      <text x="58" y="18" fill="#475569" fontSize="7" fontFamily="sans-serif">· Quiz Site</text>
      {/* User pill */}
      <rect x="248" y="7" width="56" height="14" rx="7" fill="#1e293b" />
      <circle cx="258" cy="14" r="4" fill="#3B82F6" />
      <text x="268" y="18" fill="#94a3b8" fontSize="6" fontFamily="sans-serif">Student</text>

      {/* ── Left panel: Question card ── */}
      <rect x="8" y="36" width="190" height="148" rx="6" fill="#0d1a30" stroke="#1e2a3a" strokeWidth="0.5" />
      {/* Question header */}
      <rect x="16" y="44" width="50" height="10" rx="5" fill="#3B82F620" />
      <text x="41" y="52" fill="#3B82F6" fontSize="6" textAnchor="middle" fontFamily="sans-serif">Q 7 / 15</text>
      {/* Timer */}
      <rect x="160" y="44" width="30" height="10" rx="5" fill="#ef444420" />
      <text x="175" y="52" fill="#ef4444" fontSize="6" textAnchor="middle" fontFamily="sans-serif">⏱ 0:42</text>

      {/* Question text */}
      <text x="16" y="68" fill="#e2e8f0" fontSize="6.5" fontFamily="sans-serif">Which data structure uses</text>
      <text x="16" y="78" fill="#e2e8f0" fontSize="6.5" fontFamily="sans-serif">LIFO ordering?</text>

      {/* Answer options */}
      {[
        { y: 90, text: "A.  Queue", correct: false, selected: false },
        { y: 104, text: "B.  Stack", correct: true, selected: true },
        { y: 118, text: "C.  Tree", correct: false, selected: false },
        { y: 132, text: "D.  Heap", correct: false, selected: false },
      ].map(({ y, text, correct, selected }) => (
        <g key={y}>
          <rect
            x="16" y={y - 8} width="174" height="12" rx="4"
            fill={correct ? "#22c55e18" : selected ? "#3B82F618" : "#0f1a2a"}
            stroke={correct ? "#22c55e" : selected ? "#3B82F6" : "#1e2a3a"}
            strokeWidth="0.5"
          />
          <text x="24" y={y} fill={correct ? "#22c55e" : selected ? "#38BDF8" : "#64748b"} fontSize="6" fontFamily="sans-serif">{text}</text>
          {correct && <text x="178" y={y} fill="#22c55e" fontSize="7" textAnchor="end" fontFamily="sans-serif">✓</text>}
        </g>
      ))}

      {/* Next button */}
      <rect x="16" y="148" width="174" height="16" rx="8" fill="#3B82F6" />
      <text x="103" y="159" fill="white" fontSize="7" textAnchor="middle" fontFamily="sans-serif">NEXT QUESTION →</text>

      {/* Progress bar */}
      <rect x="16" y="168" width="174" height="4" rx="2" fill="#1e2a3a" />
      <rect x="16" y="168" width="82" height="4" rx="2" fill="#38BDF8" />
      <text x="103" y="178" fill="#475569" fontSize="5" textAnchor="middle" fontFamily="sans-serif">47% Complete</text>

      {/* ── Right panel: Stats ── */}
      <rect x="206" y="36" width="106" height="56" rx="6" fill="#0d1a30" stroke="#1e2a3a" strokeWidth="0.5" />
      <text x="214" y="50" fill="#475569" fontSize="5.5" fontFamily="sans-serif">SCORE</text>
      <text x="214" y="64" fill="#38BDF8" fontSize="16" fontWeight="bold" fontFamily="sans-serif">840</text>
      <text x="250" y="64" fill="#22c55e" fontSize="7" fontFamily="sans-serif">↑ +120</text>
      <text x="214" y="76" fill="#475569" fontSize="5" fontFamily="sans-serif">Accuracy: 78% · Streak: 5</text>
      <text x="214" y="84" fill="#475569" fontSize="5" fontFamily="sans-serif">Rank: #3 of 42</text>

      {/* Leaderboard */}
      <rect x="206" y="100" width="106" height="84" rx="6" fill="#0d1a30" stroke="#1e2a3a" strokeWidth="0.5" />
      <text x="214" y="113" fill="#475569" fontSize="5.5" fontFamily="sans-serif">LEADERBOARD</text>
      {[
        { rank: "1", name: "Priya S.", score: "980", color: "#f59e0b" },
        { rank: "2", name: "Rahul M.", score: "910", color: "#94a3b8" },
        { rank: "3", name: "Akash B.", score: "840", color: "#38BDF8" },
        { rank: "4", name: "Sneha D.", score: "790", color: "#475569" },
      ].map(({ rank, name, score, color }, i) => (
        <g key={rank}>
          <text x="214" y={126 + i * 13} fill={color} fontSize="5.5" fontFamily="sans-serif">{rank}. {name}</text>
          <text x="302" y={126 + i * 13} fill={color} fontSize="5.5" textAnchor="end" fontFamily="sans-serif">{score}</text>
          {rank === "3" && <rect x="210" y={116 + i * 13} width="102" height="12" rx="3" fill="#38BDF608" stroke="#38BDF620" strokeWidth="0.5" />}
        </g>
      ))}

      {/* Tech badges */}
      <rect x="206" y="185" width="26" height="7" rx="3.5" fill="#33990015" />
      <text x="219" y="191" fill="#22c55e" fontSize="4" textAnchor="middle" fontFamily="sans-serif">MongoDB</text>
      <rect x="236" y="185" width="22" height="7" rx="3.5" fill="#3B82F615" />
      <text x="247" y="191" fill="#3B82F6" fontSize="4" textAnchor="middle" fontFamily="sans-serif">MySQL</text>
      <rect x="262" y="185" width="22" height="7" rx="3.5" fill="#8B5CF615" />
      <text x="273" y="191" fill="#8B5CF6" fontSize="4" textAnchor="middle" fontFamily="sans-serif">JWT</text>
      <rect x="288" y="185" width="22" height="7" rx="3.5" fill="#38BDF815" />
      <text x="299" y="191" fill="#38BDF8" fontSize="4" textAnchor="middle" fontFamily="sans-serif">React</text>
    </svg>
  );
}

/** Cookify — Cookie store e-commerce platform */
function CookifyMockup() {
  return (
    <svg viewBox="0 0 320 192" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="320" height="192" fill="#0a0d18" />

      {/* ── Navbar ── */}
      <rect width="320" height="28" fill="#0d1225" />
      <text x="16" y="18" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="sans-serif">🍪</text>
      <text x="30" y="18" fill="#f1f5f9" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Cookify</text>
      <text x="90" y="18" fill="#475569" fontSize="6" fontFamily="sans-serif">Store · Bakery Platform</text>
      {/* Cart */}
      <rect x="270" y="7" width="34" height="14" rx="7" fill="#f59e0b20" stroke="#f59e0b40" strokeWidth="0.5" />
      <text x="279" y="17" fill="#f59e0b" fontSize="7" fontFamily="sans-serif">🛒 3</text>

      {/* ── Category nav ── */}
      <rect x="0" y="28" width="320" height="16" fill="#080c18" />
      {["All", "Choco", "Sugar", "Butter", "Custom", "Seasonal"].map((cat, i) => (
        <g key={cat}>
          <rect x={8 + i * 52} y="31" width={cat === "All" ? 24 : 44} height="10" rx="5"
            fill={i === 0 ? "#f59e0b" : "#1e293b"}
            stroke={i === 0 ? "#f59e0b" : "none"}
          />
          <text x={8 + i * 52 + (cat === "All" ? 12 : 22)} y="39"
            fill={i === 0 ? "white" : "#64748b"} fontSize="5" textAnchor="middle" fontFamily="sans-serif">{cat}</text>
        </g>
      ))}

      {/* ── Product grid (3 cards) ── */}
      {[
        { x: 8, name: "Dark Choco Chunk", price: "₹199", rating: "4.9", badge: "BESTSELLER", bc: "#f59e0b" },
        { x: 112, name: "Sugar Sprinkle", price: "₹149", rating: "4.7", badge: "NEW", bc: "#22c55e" },
        { x: 216, name: "Butter Classic", price: "₹129", rating: "4.8", badge: "", bc: "" },
      ].map(({ x, name, price, rating, badge, bc }) => (
        <g key={x}>
          <rect x={x} y="44" width="96" height="100" rx="5" fill="#0d1a2e" stroke="#1e2a3a" strokeWidth="0.5" />
          {/* Product image placeholder */}
          <rect x={x + 6} y="50" width="84" height="52" rx="4" fill="#1a2540" />
          <text x={x + 48} y="80" fill="#f59e0b" fontSize="22" textAnchor="middle" fontFamily="sans-serif">🍪</text>
          {badge && (
            <>
              <rect x={x + 6} y="52" width={badge === "BESTSELLER" ? 44 : 22} height="9" rx="4.5" fill={bc} />
              <text x={x + 6 + (badge === "BESTSELLER" ? 22 : 11)} y="59"
                fill="white" fontSize="5" textAnchor="middle" fontFamily="sans-serif">{badge}</text>
            </>
          )}
          <text x={x + 8} y="116" fill="#e2e8f0" fontSize="6" fontWeight="bold" fontFamily="sans-serif">{name}</text>
          <text x={x + 8} y="126" fill="#f59e0b" fontSize="6.5" fontWeight="bold" fontFamily="sans-serif">{price}</text>
          <text x={x + 72} y="126" fill="#94a3b8" fontSize="5.5" fontFamily="sans-serif">★{rating}</text>
          {/* Add to cart */}
          <rect x={x + 8} y="130" width="80" height="10" rx="5" fill="#f59e0b20" stroke="#f59e0b60" strokeWidth="0.5" />
          <text x={x + 48} y="137" fill="#f59e0b" fontSize="6" textAnchor="middle" fontFamily="sans-serif">+ Add to Cart</text>
        </g>
      ))}

      {/* ── Cart / checkout summary ── */}
      <rect x="8" y="150" width="304" height="36" rx="5" fill="#0d1a2e" stroke="#1e2a3a" strokeWidth="0.5" />
      <text x="18" y="162" fill="#94a3b8" fontSize="5.5" fontFamily="sans-serif">CART SUMMARY</text>
      <text x="18" y="174" fill="#f1f5f9" fontSize="7" fontWeight="bold" fontFamily="sans-serif">3 items · Dark Choco ×2 · Sugar ×1</text>
      {/* Total */}
      <text x="200" y="162" fill="#94a3b8" fontSize="5.5" fontFamily="sans-serif">TOTAL</text>
      <text x="200" y="174" fill="#f59e0b" fontSize="8" fontWeight="bold" fontFamily="sans-serif">₹ 547.00</text>
      {/* Checkout button */}
      <rect x="264" y="153" width="42" height="26" rx="5" fill="#f59e0b" />
      <text x="285" y="162" fill="white" fontSize="5.5" textAnchor="middle" fontFamily="sans-serif">CHECKOUT</text>
      <text x="285" y="172" fill="#fff8" fontSize="4.5" textAnchor="middle" fontFamily="sans-serif">Razorpay →</text>

      {/* Tech badges bottom */}
      <rect x="8" y="184" width="42" height="7" rx="3.5" fill="#33990015" />
      <text x="29" y="190" fill="#22c55e" fontSize="4" textAnchor="middle" fontFamily="sans-serif">Spring JPA</text>
      <rect x="54" y="184" width="36" height="7" rx="3.5" fill="#47a24815" />
      <text x="72" y="190" fill="#47a248" fontSize="4" textAnchor="middle" fontFamily="sans-serif">MongoDB</text>
      <rect x="94" y="184" width="22" height="7" rx="3.5" fill="#3B82F615" />
      <text x="105" y="190" fill="#3B82F6" fontSize="4" textAnchor="middle" fontFamily="sans-serif">JWT</text>
      <rect x="120" y="184" width="38" height="7" rx="3.5" fill="#61dafb15" />
      <text x="139" y="190" fill="#61DAFB" fontSize="4" textAnchor="middle" fontFamily="sans-serif">React + Bootstrap</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3D TILT HOVER FRAME
   spring-physics cursor-tracked tilt, scale lift, teal glow border.
   Desktop only (hover:hover + pointer:fine via JS detection).
───────────────────────────────────────────────────────────────────────────── */
function TiltMockupFrame({ children, project }) {
  const prefersReduced = useReducedMotion();
  const frameRef = useRef(null);

  // Motion values for rotation axes
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const scale   = useMotionValue(1);

  // Spring physics — gentle settle, not linear
  const springConfig = { stiffness: 200, damping: 22, mass: 0.8 };
  const springRotX  = useSpring(rotateX, springConfig);
  const springRotY  = useSpring(rotateY, springConfig);
  const springScale = useSpring(scale, { stiffness: 180, damping: 20 });

  // Glow opacity
  const glowOpacity = useMotionValue(0);
  const springGlow  = useSpring(glowOpacity, { stiffness: 160, damping: 20 });

  const handleMouseMove = useCallback(
    (e) => {
      if (prefersReduced || !frameRef.current) return;
      // Only apply on fine-pointer (desktop) devices
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const rect = frameRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Normalise cursor offset to -1..1, clamp tilt to ±6°
      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);

      rotateY.set(nx * 6);
      rotateX.set(-ny * 6);
    },
    [prefersReduced, rotateX, rotateY]
  );

  const handleMouseEnter = useCallback(() => {
    if (prefersReduced) return;
    scale.set(1.025);
    glowOpacity.set(1);
  }, [prefersReduced, scale, glowOpacity]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    glowOpacity.set(0);
  }, [rotateX, rotateY, scale, glowOpacity]);

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "900px" }}
      className="w-full relative"
    >
      <motion.div
        style={{
          rotateX: prefersReduced ? 0 : springRotX,
          rotateY: prefersReduced ? 0 : springRotY,
          scale:   prefersReduced ? 1 : springScale,
          transformStyle: "preserve-3d",
        }}
        className="w-full bg-base-900 border border-line rounded-2xl overflow-hidden relative group"
      >
        {/* Teal glow border on hover — layered via box-shadow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none z-10"
          style={{
            opacity: prefersReduced ? 0 : springGlow,
            boxShadow: "0 0 0 1.5px #38BDF8, 0 0 28px rgba(56,189,248,0.22), 0 12px 40px rgba(56,189,248,0.12)",
          }}
        />

        {/* ── macOS-style Faux Browser Title Bar (stays flat, not tilted content) ── */}
        <div className="flex items-center justify-between px-4 py-3 bg-base-800 border-b border-line select-none relative z-[2]">
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

        {/* ── Mockup viewport ── */}
        <div className="bg-base-950 aspect-[5/3] relative overflow-hidden">
          {project.imageUrl ? (
            <ImageWithSkeleton
              src={project.imageUrl}
              alt={project.title}
              aspectRatio="5/3"
              className="absolute inset-0"
            />
          ) : (
            <div className="absolute inset-0">
              {project.id === "roadrescue" && <RoadRescueMockup />}
              {project.id === "think-x"   && <ThinkXMockup />}
              {project.id === "cookify"   && <CookifyMockup />}
            </div>
          )}

          {/* View Source Code Hover Overlay */}
          <div className="absolute inset-0 bg-base-950/75 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 backdrop-blur-[2px] z-[3]">
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
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECT GLOWS
   Renders custom scroll-linked ambient glows for each project card.
───────────────────────────────────────────────────────────────────────────── */
function ProjectGlows({ projectId, progress }) {
  const glowX1 = useTransform(progress, [0, 1], [-25, 25]);
  const glowY1 = useTransform(progress, [0, 1], [-20, 20]);
  const glowX2 = useTransform(progress, [0, 1], [25, -25]);
  const glowY2 = useTransform(progress, [0, 1], [20, -20]);

  // Smooth fade curve to crossfade as user scrolls into/out of viewport
  const opacity = useTransform(progress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);

  if (projectId === "roadrescue") {
    return (
      <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none z-0">
        <motion.div style={{ x: glowX1, y: glowY1 }} className="glow-ambient glow-violet absolute -left-20 -top-24 w-96 h-96" />
        <motion.div style={{ x: glowX2, y: glowY2 }} className="glow-ambient glow-amber absolute -right-20 -bottom-24 w-96 h-96" />
      </motion.div>
    );
  }

  if (projectId === "think-x") {
    return (
      <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none z-0">
        <motion.div style={{ x: glowX1, y: glowY1 }} className="glow-ambient glow-teal absolute left-1/4 -top-20 w-[450px] h-[450px]" />
      </motion.div>
    );
  }

  if (projectId === "cookify") {
    return (
      <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none z-0">
        <motion.div style={{ x: glowX1, y: glowY1 }} className="glow-ambient glow-violet absolute -left-20 -top-24 w-96 h-96" />
        <motion.div style={{ x: glowX2, y: glowY2 }} className="glow-ambient glow-teal absolute -right-20 -bottom-24 w-96 h-96" />
      </motion.div>
    );
  }

  return null;
}

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECT ITEM
───────────────────────────────────────────────────────────────────────────── */
function ProjectItem({ project, index }) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
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
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center relative"
    >
      {/* Scroll-driven custom ambient glow behind each project */}
      <ProjectGlows projectId={project.id} progress={scrollYProgress} />

      {/* Browser Mockup Frame (with 3D tilt) */}
      <div className={`lg:col-span-6 relative z-10 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        <TiltMockupFrame project={project}>
          {/* children not used directly — mockup rendered inside TiltMockupFrame */}
        </TiltMockupFrame>
      </div>

      {/* Project Details Content */}
      <div className={`lg:col-span-6 flex flex-col justify-center space-y-6 relative z-10 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
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

/* ─────────────────────────────────────────────────────────────────────────────
   PROJECTS SECTION
───────────────────────────────────────────────────────────────────────────── */
export default function Projects() {
  const labelRef = useRef(null);

  return (
    <section
      id="projects"
      className="py-12 md:py-20 border-t border-line bg-base-950 px-6 md:px-12 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Eyebrow */}
        <div ref={labelRef} className="mb-8 block h-fit w-fit">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-accent-blue/30 bg-accent-blue/5 shadow-[inset_0_1px_12px_rgba(59,130,246,0.15)] backdrop-blur-sm">
            <TypewriterLabel
              text="03 // PROJECTS"
              className="font-sans text-[10px] tracking-widest font-bold text-accent-blue uppercase"
            />
          </span>
        </div>

        {/* Section Heading */}
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

        {/* Projects alternating layout */}
        <div className="space-y-16 md:space-y-24">
          {projects.map((project, index) => (
            <ProjectItem key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
