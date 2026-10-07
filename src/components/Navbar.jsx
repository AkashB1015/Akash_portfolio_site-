import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", target: "about" },
  { label: "Education", target: "education" },
  { label: "Projects", target: "projects" },
  { label: "Skills", target: "skills" },
  { label: "Certifications", target: "certifications" },
  { label: "Contact", target: "contact" }
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [hoveredSection, setHoveredSection] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isProgrammaticScroll = useRef(false);

  // Theme state
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored;
      const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      return prefersLight ? "light" : "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  // Robust on-scroll section detector
  useEffect(() => {
    const updateActiveSection = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Skip scroll spy during programmatic navigation clicks
      if (isProgrammaticScroll.current) return;

      // Bottom of page: activate Contact
      const isAtBottom =
        scrollY > 300 &&
        window.innerHeight + scrollY >= document.documentElement.scrollHeight - 90;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      // Top of page: Hero section has no active nav pill
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        if (heroRect.bottom > 220) {
          setActiveSection("");
          return;
        }
      } else if (scrollY < 140) {
        setActiveSection("");
        return;
      }

      // Reading trigger line: ~35% of viewport height
      const viewportTrigger = Math.max(120, window.innerHeight * 0.35);

      let current = "";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.target);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportTrigger && rect.bottom > viewportTrigger) {
          current = item.target;
          break;
        }
      }

      // Fallback: choose the lowest section whose top has scrolled past the trigger
      if (!current) {
        for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
          const el = document.getElementById(NAV_ITEMS[i].target);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= viewportTrigger) {
              current = NAV_ITEMS[i].target;
              break;
            }
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (targetId !== "hero") {
      setActiveSection(targetId);
      isProgrammaticScroll.current = true;
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 1100);
    } else {
      setActiveSection("");
    }

    const scrollToTarget = (el) => {
      const offset = 85;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    };

    const element = document.getElementById(targetId);
    if (element) {
      scrollToTarget(element);
      return;
    }

    let attempts = 0;
    const poll = setInterval(() => {
      attempts++;
      const el = document.getElementById(targetId);
      if (el) {
        clearInterval(poll);
        scrollToTarget(el);
      } else if (attempts > 30) {
        clearInterval(poll);
        window.location.hash = targetId;
      }
    }, 100);
  };

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const ThemeToggleButton = () => (
    <button
      onClick={toggleTheme}
      className="w-9 h-5 sm:w-10 sm:h-5.5 rounded-full p-0.5 flex items-center cursor-pointer relative transition-all duration-300 flex-shrink-0"
      style={{
        background:
          theme === "dark"
            ? "rgba(255, 255, 255, 0.08)"
            : "rgba(0, 0, 0, 0.07)",
        border:
          theme === "dark"
            ? "1px solid rgba(255, 255, 255, 0.18)"
            : "1px solid rgba(0, 0, 0, 0.08)",
        boxShadow:
          theme === "dark"
            ? "inset 0 1px 2px rgba(0,0,0,0.3)"
            : "inset 0 1.5px 2px rgba(0,0,0,0.12)",
      }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        className={`w-4 h-4 rounded-full flex items-center justify-center shadow-sm relative ${
          theme === "dark"
            ? "ml-auto bg-neutral-800 text-amber-400"
            : "mr-auto bg-white text-amber-500 shadow-[0_1.5px_4px_rgba(0,0,0,0.18)]"
        }`}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {theme === "dark" ? (
            <Moon size={10} className="text-blue-300 fill-blue-300" />
          ) : (
            <Sun size={10} className="text-amber-500 fill-amber-500" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );

  return (
    <>
      {/* ─── Top Chromatic Accent Line ─── */}
      <div
        className="fixed top-0 left-0 right-0 h-[1.5px] z-[70] pointer-events-none opacity-85"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(90deg, transparent 0%, rgba(30,107,255,0.7) 25%, rgba(0,194,255,0.9) 50%, rgba(139,92,246,0.7) 75%, transparent 100%)"
              : "linear-gradient(90deg, transparent 0%, rgba(30,107,255,0.4) 25%, rgba(0,194,255,0.6) 50%, rgba(139,92,246,0.4) 75%, transparent 100%)",
        }}
      />

      {/* ─── Floating Pill Outer Container — Matching Reference Image ─── */}
      <header
        className={`fixed left-0 right-0 z-50 flex justify-center px-3 sm:px-6 transition-all duration-300 pointer-events-none ${
          isScrolled ? "top-2 sm:top-2.5" : "top-2.5 sm:top-3.5"
        }`}
      >
        <motion.div
          initial={{ y: -60, opacity: 0, scale: 0.95 }}
          animate={{
            y: 0,
            opacity: 1,
            scale: isScrolled ? 0.99 : 1,
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto relative w-full max-w-[1030px] rounded-full flex items-center justify-between px-3.5 py-1.5 sm:px-5 sm:py-1.5 transition-all duration-300"
          style={{
            background:
              theme === "dark"
                ? isScrolled
                  ? "rgba(18, 22, 34, 0.38)"
                  : "rgba(255, 255, 255, 0.06)"
                : isScrolled
                ? "linear-gradient(180deg, rgba(238, 241, 246, 0.90) 0%, rgba(216, 222, 232, 0.82) 100%)"
                : "linear-gradient(180deg, rgba(245, 247, 250, 0.84) 0%, rgba(225, 230, 238, 0.76) 100%)",
            backdropFilter: isScrolled
              ? "blur(20px) saturate(190%)"
              : "blur(16px) saturate(180%)",
            WebkitBackdropFilter: isScrolled
              ? "blur(20px) saturate(190%)"
              : "blur(16px) saturate(180%)",
            border:
              theme === "dark"
                ? "1px solid rgba(255, 255, 255, 0.22)"
                : "1px solid rgba(255, 255, 255, 0.85)",
            boxShadow:
              theme === "dark"
                ? [
                    "0 18px 40px -10px rgba(0,0,0,0.55)",
                    "0 0 25px rgba(30,107,255,0.18)",
                    "inset 0 1.5px 1px rgba(255,255,255,0.45)",
                    "inset 0 -1px 2px rgba(0,0,0,0.25)",
                  ].join(", ")
                : [
                    "0 20px 42px -10px rgba(0, 0, 0, 0.15)",
                    "0 6px 16px -4px rgba(0, 0, 0, 0.07)",
                    "inset 0 1.5px 1px rgba(255, 255, 255, 0.98)", // bright white top specular catch
                    "inset 0 -2px 3px rgba(0, 0, 0, 0.08)",         // bottom cylindrical bevel shadow
                    "0 0 0 1px rgba(0, 0, 0, 0.06)",               // thin outer contour
                  ].join(", "),
          }}
        >
          {/* Top specular highlight reflection */}
          <div
            className="absolute top-0 left-[6%] right-[6%] h-[1px] rounded-full pointer-events-none"
            style={{
              background:
                theme === "dark"
                  ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.45) 25%, rgba(0,194,255,0.6) 50%, rgba(255,255,255,0.45) 75%, transparent 100%)"
                  : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 50%, transparent 100%)",
            }}
          />
          {/* Bottom edge refraction line */}
          <div
            className="absolute bottom-0 left-[15%] right-[15%] h-[1px] rounded-full pointer-events-none"
            style={{
              background:
                theme === "dark"
                  ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)"
                  : "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.06) 50%, transparent 100%)",
            }}
          />

          {/* ─── LEFT: Name Only (Clean Typography) ─── */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="group flex items-center flex-shrink-0 cursor-pointer pl-1 sm:pl-1.5 select-none"
          >
            <span className="font-display text-[14.5px] sm:text-[15.5px] tracking-tight flex items-center transition-transform duration-200 group-hover:scale-105">
              <span className="font-black bg-gradient-to-r from-[#1E6BFF] via-[#00C2FF] to-[#38BDF8] bg-clip-text text-transparent mr-1.5 drop-shadow-[0_0_12px_rgba(0,194,255,0.35)]">
                AKASH
              </span>
              <span
                className={
                  theme === "dark"
                    ? "text-neutral-100 font-medium tracking-wide"
                    : "text-[#0F172A] font-semibold tracking-wide"
                }
              >
                BHADANE
              </span>
            </span>
          </a>

          {/* ─── CENTER: Nav Links (Desktop) ─── */}
          <nav
            className="hidden lg:flex items-center gap-0.5 sm:gap-1 relative px-1 py-0.5"
            onMouseLeave={() => setHoveredSection(null)}
          >
            {NAV_ITEMS.map((item) => {
              const isActualActive = activeSection === item.target;
              const isHovered = hoveredSection === item.target;
              const isHighlighted = isHovered || isActualActive;

              return (
                <motion.a
                  key={item.target}
                  href={`#${item.target}`}
                  onClick={(e) => handleNavClick(e, item.target)}
                  onMouseEnter={() => setHoveredSection(item.target)}
                  whileTap={{ scale: 0.94 }}
                  className={`relative px-3.5 py-1.5 text-[14px] font-sans tracking-wide rounded-full transition-all duration-200 select-none ${
                    isActualActive
                      ? theme === "dark"
                        ? "text-[#00C2FF] font-bold drop-shadow-[0_0_12px_rgba(0,194,255,0.7)]"
                        : "text-[#0F172A] font-bold drop-shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                      : isHovered
                      ? theme === "dark"
                        ? "text-white font-semibold"
                        : "text-[#0F172A] font-semibold"
                      : theme === "dark"
                      ? "text-neutral-200 hover:text-white font-semibold"
                      : "text-[#475569] hover:text-[#0F172A] font-semibold"
                  }`}
                >
                  {/* Sliding Elevated Liquid Glass Pill Capsule (Vitrio style in Light Mode) */}
                  {isHighlighted && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full -z-10"
                      transition={{
                        type: "spring",
                        stiffness: 440,
                        damping: 30,
                      }}
                      style={{
                        background:
                          theme === "dark"
                            ? isActualActive
                              ? "linear-gradient(135deg, rgba(30, 107, 255, 0.35) 0%, rgba(0, 194, 255, 0.24) 100%)"
                              : "rgba(255, 255, 255, 0.08)"
                            : isActualActive
                            ? "#FFFFFF"
                            : "rgba(255, 255, 255, 0.65)",
                        backdropFilter: theme === "dark" ? "blur(16px)" : "none",
                        border:
                          theme === "dark"
                            ? isActualActive
                              ? "1px solid rgba(0, 194, 255, 0.55)"
                              : "1px solid rgba(255, 255, 255, 0.18)"
                            : isActualActive
                            ? "1px solid rgba(0, 0, 0, 0.06)"
                            : "1px solid rgba(255, 255, 255, 0.8)",
                        boxShadow:
                          theme === "dark"
                            ? isActualActive
                              ? "0 0 22px rgba(30, 107, 255, 0.45), inset 0 1px 1.5px rgba(255, 255, 255, 0.45), 0 4px 14px rgba(0, 0, 0, 0.35)"
                              : "inset 0 1px 0 rgba(255, 255, 255, 0.25), 0 2px 8px rgba(0, 0, 0, 0.2)"
                            : isActualActive
                            ? [
                                "0 4px 14px rgba(0, 0, 0, 0.11)",
                                "0 1px 3px rgba(0, 0, 0, 0.07)",
                                "inset 0 1px 1.5px #ffffff",
                              ].join(", ")
                            : [
                                "0 2px 8px rgba(0, 0, 0, 0.06)",
                                "inset 0 1px 1px #ffffff",
                              ].join(", "),
                      }}
                    />
                  )}
                  {item.label}
                </motion.a>
              );
            })}
          </nav>

          {/* ─── RIGHT: Controls & "Let's Talk" Button ─── */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            {/* Theme Toggle Button */}
            <ThemeToggleButton />

            {/* "Let's Talk" Gradient Button (Desktop) */}
            <motion.a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="hidden sm:inline-flex items-center justify-center relative text-xs sm:text-[13px] font-sans font-bold tracking-wide text-white px-4.5 py-1.5 sm:px-5 sm:py-2 rounded-full overflow-hidden transition-all duration-300 group cursor-pointer shadow-lg select-none"
              style={{
                background: "linear-gradient(135deg, #1E6BFF 0%, #00C2FF 100%)",
                boxShadow:
                  theme === "dark"
                    ? "0 4px 18px rgba(30, 107, 255, 0.42), inset 0 1px 1.5px rgba(255, 255, 255, 0.45)"
                    : "0 4px 16px rgba(30, 107, 255, 0.35), inset 0 1px 1.5px rgba(255, 255, 255, 0.5)",
              }}
            >
              {/* Specular light sheen across button */}
              <span
                className="absolute inset-0 rounded-full pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 60%)",
                }}
              />
              <span className="relative flex items-center gap-1.5 z-10">
                Let's Talk
              </span>
            </motion.a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-full text-ink-100 hover:text-accent-blue transition-colors focus:outline-none flex items-center justify-center"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.08)"
                    : "rgba(0, 0, 0, 0.05)",
                border:
                  theme === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.16)"
                    : "1px solid rgba(0, 0, 0, 0.08)",
              }}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* ─── Mobile Menu: High-Gloss Liquid Glass Dropdown with Backdrop ─── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Tap-outside dismiss overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[3px] lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.95 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-[60px] sm:top-[68px] left-3.5 right-3.5 sm:left-6 sm:right-6 z-50 lg:hidden flex flex-col items-stretch gap-1.5 p-4 sm:p-5 overflow-hidden rounded-3xl max-h-[calc(100vh-80px)] overflow-y-auto"
              style={{
                background:
                  theme === "dark"
                    ? "rgba(14, 16, 26, 0.88)"
                    : "linear-gradient(180deg, rgba(245, 247, 250, 0.94) 0%, rgba(228, 233, 241, 0.90) 100%)",
                backdropFilter: "blur(32px) saturate(200%)",
                WebkitBackdropFilter: "blur(32px) saturate(200%)",
                border:
                  theme === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.20)"
                    : "1px solid rgba(255, 255, 255, 0.9)",
                boxShadow:
                  theme === "dark"
                    ? [
                        "0 24px 60px rgba(0,0,0,0.75)",
                        "0 0 32px rgba(30,107,255,0.2)",
                        "inset 0 1.5px 1.5px rgba(255,255,255,0.35)",
                      ].join(", ")
                    : [
                        "0 24px 50px rgba(0,0,0,0.14)",
                        "inset 0 1.5px 2px rgba(255,255,255,1)",
                      ].join(", "),
              }}
            >
              {/* Top specular reflection line inside dropdown */}
              <div
                className="absolute top-0 left-[10%] right-[10%] h-[1px] pointer-events-none"
                style={{
                  background:
                    theme === "dark"
                      ? "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)"
                      : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,1) 50%, transparent 100%)",
                }}
              />

              {NAV_ITEMS.map((item, idx) => {
                const isActive = activeSection === item.target;
                return (
                  <motion.a
                    key={item.target}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.035 }}
                    href={`#${item.target}`}
                    onClick={(e) => handleNavClick(e, item.target)}
                    className={`w-full flex items-center justify-between px-5 py-2.5 font-sans text-sm font-semibold tracking-wide rounded-2xl transition-all duration-200 ${
                      isActive
                        ? theme === "dark"
                          ? "text-[#00C2FF] font-bold"
                          : "text-[#0F172A] font-bold"
                        : theme === "dark"
                        ? "text-neutral-200 hover:text-white hover:bg-white/[0.04]"
                        : "text-[#475569] hover:text-[#0F172A] hover:bg-white/50"
                    }`}
                    style={
                      isActive
                        ? {
                            background:
                              theme === "dark"
                                ? "linear-gradient(135deg, rgba(30, 107, 255, 0.32) 0%, rgba(0, 194, 255, 0.20) 100%)"
                                : "#FFFFFF",
                            border:
                              theme === "dark"
                                ? "1px solid rgba(0, 194, 255, 0.50)"
                                : "1px solid rgba(0, 0, 0, 0.06)",
                            boxShadow:
                              theme === "dark"
                                ? "0 0 18px rgba(30, 107, 255, 0.35), inset 0 1px 1px rgba(255,255,255,0.3)"
                                : "0 4px 12px rgba(0, 0, 0, 0.09), inset 0 1px 1.5px #ffffff",
                          }
                        : { border: "1px solid transparent" }
                    }
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        className={`w-2 h-2 rounded-full ${
                          theme === "dark"
                            ? "bg-[#00C2FF] shadow-[0_0_8px_#00C2FF]"
                            : "bg-[#1E6BFF] shadow-[0_0_8px_#1E6BFF]"
                        }`}
                      />
                    )}
                  </motion.a>
                );
              })}

              {/* Mobile "Let's Talk" Button */}
              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.035 }}
                href="#contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="w-full text-center py-3 text-white font-sans text-sm font-bold tracking-wide rounded-2xl mt-1.5 cursor-pointer select-none"
                style={{
                  background:
                    "linear-gradient(135deg, #1E6BFF 0%, #00C2FF 100%)",
                  boxShadow:
                    "0 4px 22px rgba(30, 107, 255, 0.45), inset 0 1px 1.5px rgba(255, 255, 255, 0.4)",
                }}
              >
                Let's Talk
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
