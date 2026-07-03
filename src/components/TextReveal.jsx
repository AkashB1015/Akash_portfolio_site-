import { useEffect, useState, useRef } from "react";
import { motion, useInView, useScroll, useVelocity, useTransform, useSpring, useReducedMotion } from "framer-motion";

/**
 * SplitText splits a string into words and animates each word.
 * Supports 'animate' parameter to bypass viewport checking for hero elements.
 */
export function SplitText({ text, className = "", wordClassName = "", delayOffset = 0, animate = false }) {
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  if (prefersReduced) {
    return <span className={`${className} ${wordClassName}`}>{text}</span>;
  }

  const animationProps = animate
    ? { animate: { y: 0, rotateX: 0, opacity: 1 } }
    : { whileInView: { y: 0, rotateX: 0, opacity: 1 }, viewport: { once: false } };

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em] py-0.5">
          <motion.span
            initial={{ y: "100%", rotateX: 90, opacity: 0 }}
            {...animationProps}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: delayOffset + idx * 0.045,
            }}
            className={`inline-block origin-bottom transform-style-3d ${wordClassName}`}
          >
            {word === "" ? "\u00A0" : word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * LineReveal curtain reveals lines behind an overflow mask.
 * Supports 'animate' parameter to run instantly on load.
 */
export function LineReveal({ lines, className = "", delayOffset = 0, animate = false }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <span className={className}>
        {lines.map((line, idx) => (
          <span key={idx} className="block">{line}</span>
        ))}
      </span>
    );
  }

  const animationProps = animate
    ? { animate: { y: 0 } }
    : { whileInView: { y: 0 }, viewport: { once: false } };

  return (
    <span className={`block ${className}`}>
      {lines.map((line, idx) => (
        <span key={idx} className="block overflow-hidden py-1">
          <motion.span
            initial={{ y: "105%" }}
            {...animationProps}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: delayOffset + idx * 0.08,
            }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/**
 * TypewriterLabel prints characters sequentially.
 * Triggers as soon as a single pixel enters viewport (removed negative margins).
 */
export function TypewriterLabel({ text, className = "", animate = false }) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setDisplayText(text);
      return;
    }
    if (!isInView && !animate) return;

    let index = 0;
    const interval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, 45); // character print duration

    return () => clearInterval(interval);
  }, [isInView, text, prefersReduced, animate]);

  return (
    <span ref={ref} className={`uppercase inline-block min-h-[1.2em] min-w-[2px] ${className}`}>
      {displayText}
      {!prefersReduced && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="text-accent-blue ml-0.5 font-bold"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

/**
 * useScrollSkew evaluates scroll velocity in pixels per ms and transforms
 * it into a slight letter/heading skew factor, easing back to 0.
 */
export function useScrollSkew() {
  const prefersReduced = useReducedMotion();
  
  if (prefersReduced) {
    return 0;
  }

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Transform scroll velocity to a minor skew angle (max 3 degrees)
  const skewRaw = useTransform(scrollVelocity, [-2000, 2000], [-3, 3]);
  const skew = useSpring(skewRaw, { damping: 25, stiffness: 220 });
  
  return skew;
}
