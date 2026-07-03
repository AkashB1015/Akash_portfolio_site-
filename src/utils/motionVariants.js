/**
 * Reusable Framer Motion animation variants.
 * Respects clean motion design systems: subtle, premium, and calm.
 */

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1], // Custom calm, premium ease-out
      ...custom,
    },
  }),
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      ...custom,
    },
  }),
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const badgePop = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

// 3D slide and tilt reveal for projects
export const projectSlideLeft = {
  hidden: {
    opacity: 0,
    x: -50,
    rotateY: 8,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const projectSlideRight = {
  hidden: {
    opacity: 0,
    x: 50,
    rotateY: -8,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotateY: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const textReveal = {
  hidden: {
    y: "100%",
  },
  visible: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// Magnetic hover helper function for React mouse events
export const handleMagneticHover = (e, strength = 0.3) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  
  e.currentTarget.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
};

export const resetMagneticHover = (e) => {
  e.currentTarget.style.transform = `translate(0px, 0px)`;
};

export const blurReveal = {
  hidden: {
    opacity: 0,
    filter: "blur(6px)",
    y: 15,
  },
  visible: (custom = {}) => ({
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      ...custom,
    },
  }),
};

