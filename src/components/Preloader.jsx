import { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";

const RADIUS = 54;
const STROKE_WIDTH = 4;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const MIN_DURATION = 1200; // ms — minimum preloader duration

const STATUS_LABELS = [
  { threshold: 0, label: "Compiling..." },
  { threshold: 40, label: "Linking stacks..." },
  { threshold: 85, label: "Ready" },
];

function getStatusLabel(progress) {
  let label = STATUS_LABELS[0].label;
  for (const s of STATUS_LABELS) {
    if (progress >= s.threshold) label = s.label;
  }
  return label;
}

/**
 * Tier 1 — Global Preloader
 *
 * Shows once per session (sessionStorage-gated).
 * Features:
 *  - Dual-arc SVG ring: blue arc (Java) + purple arc (.NET) both driven from the same 0–100 progress
 *  - At 90%+ arcs cross-fade into a solid cyan convergence ring
 *  - Exit: ring scales up + fades, then clip-path circular wipe reveals the hero
 *  - Cursor parallax on desktop (2–4px tilt)
 *  - Mobile: idle slow rotation instead of parallax
 *  - prefers-reduced-motion: simple spinner + fade, no arc/wipe choreography
 */
export default function Preloader() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("entering"); // entering | converging | exiting | done
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const overlayRef = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);

  // Session-gate check
  useEffect(() => {
    const seen = sessionStorage.getItem("hasSeenPreloader");
    if (!seen) {
      setVisible(true);
      sessionStorage.setItem("hasSeenPreloader", "1");
    }
  }, []);

  // Detect mobile
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window);
  }, []);

  // Progress rAF loop + real readiness gate
  useEffect(() => {
    if (!visible) return;

    startRef.current = performance.now();

    // ── Real readiness promise: resolves when Hero has mounted ──
    // We create a promise that the Hero component can resolve via
    // window.__heroMountedResolve(). If Hero already mounted (warm reload
    // path where preloader is skipped), this resolves immediately.
    const heroReadyPromise = new Promise((resolve) => {
      if (window.__heroMounted) {
        resolve();
      } else {
        window.__heroMountedResolve = resolve;
        // Safety fallback — if Hero never signals in 5s, release anyway
        setTimeout(resolve, 5000);
      }
    });

    // ── Fonts ready promise ──
    const fontsReadyPromise = document.fonts
      ? document.fonts.ready.catch(() => Promise.resolve())
      : Promise.resolve();

    // ── Minimum duration promise (floor, not ceiling) ──
    let minDurationResolve;
    const minDurationPromise = new Promise((resolve) => {
      minDurationResolve = resolve;
    });

    let exitScheduled = false;

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const linearPct = Math.min(1, elapsed / MIN_DURATION);
      const easedPct = 1 - Math.pow(1 - linearPct, 2.2);
      const pct = easedPct * 100;

      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Visual bar hit 100 — resolve the minimum duration gate
        if (!exitScheduled) {
          exitScheduled = true;
          setPhase("converging");
          minDurationResolve();

          // Wait for ALL real readiness signals before exiting
          Promise.all([
            minDurationPromise,
            fontsReadyPromise,
            heroReadyPromise,
            // Extra 200ms convergence visual hold
            new Promise((r) => setTimeout(r, 200)),
          ]).then(() => {
            setPhase("exiting");
            // wipe + fade combined = ~750ms
            setTimeout(() => setVisible(false), 800);
          });
        }
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      // Clean up the hero mount resolver so it doesn't linger
      if (window.__heroMountedResolve) {
        delete window.__heroMountedResolve;
      }
    };
  }, [visible]);


  // Cursor parallax (desktop only)
  const handleMouseMove = useCallback(
    (e) => {
      if (isMobile || prefersReduced) return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      // Map cursor offset to ±4px parallax
      const x = ((e.clientX - cx) / cx) * 4;
      const y = ((e.clientY - cy) / cy) * 4;
      setParallax({ x, y });
    },
    [isMobile, prefersReduced]
  );

  useEffect(() => {
    if (!visible || isMobile || prefersReduced) return;
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [visible, isMobile, prefersReduced, handleMouseMove]);

  if (!visible) return null;

  const isExiting = phase === "exiting";
  const isConverging = phase === "converging" || isExiting;

  // Arc lengths — each arc sweeps from 0 → half-circumference at 100%
  // Blue arc starts at 12 o'clock, sweeps clockwise (top → bottom right)
  // Purple arc starts at 12 o'clock, sweeps counter-clockwise (top → bottom left)
  // At 100% they both reach 6 o'clock and cross-fade to the solid cyan ring
  const arcLength = (CIRCUMFERENCE / 2) * Math.min(progress / 100, 1);
  const arcOffset = CIRCUMFERENCE - arcLength;

  const viewBox = `${RADIUS + STROKE_WIDTH + 2}`;
  const center = RADIUS + STROKE_WIDTH + 2;
  const svgSize = center * 2;

  // ---- Reduced Motion Fallback ----
  if (prefersReduced) {
    return (
      <div
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-base-950 transition-opacity duration-500 ${
          isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Loading"
        role="status"
      >
        <div className="flex flex-col items-center gap-4">
          {/* Simple spinner */}
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            className="reduced-motion-spinner"
          >
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="40 124"
            />
          </svg>
          <span className="font-mono text-sm text-ink-400">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Preloader overlay ── */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-base-950 ${
          isExiting ? "preloader-exit" : ""
        }`}
        aria-label="Loading site content"
        role="status"
        style={{
          // Block interaction during wipe
          pointerEvents: isExiting ? "none" : "auto",
        }}
      >
        {/* ── Ring wrapper — parallax tilt or mobile idle rotation ── */}
        <div
          className="flex flex-col items-center gap-5 select-none"
          style={{
            transform: isMobile
              ? undefined
              : `translate(${parallax.x}px, ${parallax.y}px)`,
            transition: isMobile
              ? undefined
              : "transform 0.12s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {/* SVG Ring */}
          <div
            className={`relative ${isMobile ? "preloader-idle-rotate" : ""}`}
            style={{ width: svgSize, height: svgSize }}
          >
            <svg
              width={svgSize}
              height={svgSize}
              viewBox={`0 0 ${svgSize} ${svgSize}`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* ── Track ring (very subtle) ── */}
              <circle
                cx={center}
                cy={center}
                r={RADIUS}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth={STROKE_WIDTH}
              />

              {/* ── Arc 1: Blue (Java / Spring) — clockwise from 12 o'clock ── */}
              <circle
                cx={center}
                cy={center}
                r={RADIUS}
                stroke="#3B82F6"
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="round"
                strokeDasharray={`${arcLength} ${CIRCUMFERENCE - arcLength}`}
                strokeDashoffset={0}
                transform={`rotate(-90 ${center} ${center})`}
                style={{
                  opacity: isConverging ? 0 : 1,
                  transition: "opacity 0.2s ease",
                  filter: "drop-shadow(0 0 6px rgba(59,130,246,0.7))",
                }}
              />

              {/* ── Arc 2: Purple (.NET / C#) — counter-clockwise from 12 o'clock ── */}
              {/* Achieved by rotating 90deg (so start is at 12 o'clock) then negating dashoffset
                  to draw in the counter-clockwise direction (opposite of Arc 1) */}
              <circle
                cx={center}
                cy={center}
                r={RADIUS}
                stroke="#8B5CF6"
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="round"
                strokeDasharray={`${arcLength} ${CIRCUMFERENCE - arcLength}`}
                strokeDashoffset={0}
                transform={`rotate(90 ${center} ${center})`}
                style={{
                  opacity: isConverging ? 0 : 1,
                  transition: "opacity 0.2s ease",
                  filter: "drop-shadow(0 0 6px rgba(139,92,246,0.7))",
                  transformOrigin: `${center}px ${center}px`,
                }}
              />

              {/* ── Convergence ring: solid cyan — fades in when arcs meet ── */}
              <circle
                cx={center}
                cy={center}
                r={RADIUS}
                stroke="#38BDF8"
                strokeWidth={STROKE_WIDTH}
                strokeLinecap="round"
                strokeDasharray={`${CIRCUMFERENCE} 0`}
                style={{
                  opacity: isConverging ? 1 : 0,
                  transition: "opacity 0.2s ease",
                  filter: "drop-shadow(0 0 10px rgba(56,189,248,0.8))",
                }}
              />

              {/* ── Outer subtle glow ring ── */}
              <circle
                cx={center}
                cy={center}
                r={RADIUS + STROKE_WIDTH}
                stroke={isConverging ? "rgba(56,189,248,0.12)" : "rgba(59,130,246,0.07)"}
                strokeWidth={1}
                style={{ transition: "stroke 0.2s ease" }}
              />
            </svg>

            {/* ── Center content: percentage + label ── */}
            <div
              className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
              style={{
                opacity: isExiting ? 0 : 1,
                transition: "opacity 0.2s ease",
              }}
            >
              <span
                className="font-mono font-bold text-lg text-ink-100 leading-none tabular-nums"
                style={{ letterSpacing: "-0.03em" }}
              >
                {Math.round(progress)}
                <span className="text-xs text-ink-400 ml-0.5">%</span>
              </span>
            </div>
          </div>

          {/* ── Status label ── */}
          <div
            className="font-mono text-[11px] tracking-widest text-ink-400 uppercase"
            style={{
              opacity: isExiting ? 0 : 1,
              transition: "opacity 0.15s ease",
              minWidth: "120px",
              textAlign: "center",
            }}
          >
            {getStatusLabel(progress)}
          </div>

          {/* ── Stack duality label ── */}
          <div className="flex items-center gap-3 opacity-40">
            <span className="flex items-center gap-1.5 text-[9px] font-mono text-[#3B82F6] tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] inline-block" />
              JAVA
            </span>
            <span className="text-[9px] font-mono text-ink-400">×</span>
            <span className="flex items-center gap-1.5 text-[9px] font-mono text-[#8B5CF6] tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] inline-block" />
              .NET
            </span>
          </div>
        </div>
      </div>

      {/* ── Clip-path wipe layer — expands to reveal the site content underneath ── */}
      {isExiting && (
        <div
          className="fixed inset-0 z-[9998] bg-base-950 clip-wipe-reveal"
          style={{ animationDelay: "0.3s" }}
          aria-hidden="true"
        />
      )}
    </>
  );
}
