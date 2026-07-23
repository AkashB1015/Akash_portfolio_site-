import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for a high-end agency feel
  const springConfig = { damping: 30, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Laggier spring for trailing mouse spotlight shadow
  const glowSpringConfig = { damping: 45, stiffness: 80, mass: 1.2 };
  const cursorXSpringGlow = useSpring(cursorX, glowSpringConfig);
  const cursorYSpringGlow = useSpring(cursorY, glowSpringConfig);

  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.matchMedia("(max-width: 768px)").matches ||
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0);
      setIsMobile(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    if (isMobile || prefersReducedMotion) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Event delegation — one listener pair on document instead of N listeners
    // on every interactive element. No MutationObserver, no querySelectorAll.
    const HOVERABLE = 'a, button, [role="button"], input, select, textarea, .project-card, .cert-card, .clickable';
    const handleMouseOver = (e) => {
      if (e.target.closest(HOVERABLE)) setIsHovered(true);
    };
    const handleMouseOut = (e) => {
      if (e.target.closest(HOVERABLE)) setIsHovered(false);
    };
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isMobile, isVisible, prefersReducedMotion]);


  if (isMobile || prefersReducedMotion || !isVisible) return null;

  return (
    <>
      {/* Spotlight trailing mouse shadow (scrolls and follows mouse interactively without layout-repainting filters) */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-[1] select-none"
        style={{
          x: cursorXSpringGlow,
          y: cursorYSpringGlow,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(56, 189, 248, 0.02) 45%, transparent 70%)"
        }}
      />
      {/* Center Solid Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent-blue pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-accent-blue pointer-events-none z-[9998]"
        animate={{
          width: isHovered ? 48 : 22,
          height: isHovered ? 48 : 22,
          backgroundColor: isHovered ? "rgba(59, 130, 246, 0.08)" : "rgba(59, 130, 246, 0)",
          borderColor: isHovered ? "rgba(56, 189, 248, 1)" : "rgba(59, 130, 246, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
