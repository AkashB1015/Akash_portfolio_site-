import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  SiSpringboot,
  SiSpringsecurity,
  SiHibernate,
  SiDotnet,
  SiReact,
  SiNodedotjs,
  SiJavascript,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiGithub
} from "react-icons/si";
import { X } from "lucide-react";

// Specific icon mapping to maintain bundle size tree-shaking
const iconMapping = {
  SiSpringboot: SiSpringboot,
  SiSpringsecurity: SiSpringsecurity,
  SiHibernate: SiHibernate,
  SiDotnet: SiDotnet,
  SiReact: SiReact,
  SiNodedotjs: SiNodedotjs,
  SiJavascript: SiJavascript,
  SiMysql: SiMysql,
  SiPostgresql: SiPostgresql,
  SiMongodb: SiMongodb,
  SiDocker: SiDocker,
  SiGit: SiGit,
  SiGithub: SiGithub
};

const skillsList = [
  { name: "Java", icon: "SiJava", color: "#E85D2C", proof: "Built robust multithreaded core architectures" },
  { name: "Spring Boot", icon: "SiSpringboot", color: "#6DB33F", proof: "Developed enterprise REST APIs for high load" },
  { name: "Spring Security", icon: "SiSpringsecurity", color: "#6DB33F", proof: "Implemented custom filters and JWT authentication" },
  { name: "Hibernate", icon: "SiHibernate", color: "#C9941F", proof: "Optimized complex JPA database queries by 40%" },
  { name: "ASP.NET Core", icon: "SiDotnet", color: "#512BD4", proof: "Configured resilient microservices and routing" },
  { name: "C#", icon: "SiCsharp", color: "#9B4F96", proof: "Engineered async task queues and modules" },
  { name: "React.js", icon: "SiReact", color: "#61DAFB", proof: "Created responsive interactive SPA layouts" },
  { name: "Node.js", icon: "SiNodedotjs", color: "#339933", proof: "Built real-time websocket microservices" },
  { name: "JavaScript", icon: "SiJavascript", color: "#F7DF1E", proof: "Implemented complex DOM, ES6+, and API wrappers" },
  { name: "MySQL", icon: "SiMysql", color: "#00758F", proof: "Designed normalized schemas and stored procedures" },
  { name: "PostgreSQL", icon: "SiPostgresql", color: "#336791", proof: "Managed triggers, constraints, and index tunings" },
  { name: "MongoDB", icon: "SiMongodb", color: "#47A248", proof: "Designed flexible NoSQL collection aggregations" },
  { name: "AWS", icon: "SiAmazonaws", color: "#FF9900", proof: "Deployed container setups on ECS and EC2 instances" },
  { name: "Docker", icon: "SiDocker", color: "#2496ED", proof: "Containerized microservices for seamless deploys" },
  { name: "Git", icon: "SiGit", color: "#F05032", proof: "Managed multi-developer branches and merge strategies" },
  { name: "GitHub", icon: "SiGithub", color: "#FAF8F4", proof: "Automated test runs and coverage via Actions" },
  { name: "REST API", icon: null, color: "#0E9488", proof: "Designed standard JSON-compliant request interfaces" },
  { name: "JWT", icon: null, color: "#0E9488", proof: "Secured cross-domain user authorization payloads" },
  { name: "RBAC", icon: null, color: "#0E9488", proof: "Built user-permission grids for admins and roles" },
  { name: "Microservices", icon: null, color: "#0E9488", proof: "Configured API gateways and load routing configurations" },
  { name: "CI/CD", icon: null, color: "#0E9488", proof: "Built pipelines reducing deploy times by 35%" },
  { name: "OOP", icon: null, color: "#C9941F", proof: "Followed SOLID design principles for modularity" },
  { name: "Agile", icon: null, color: "#C9941F", proof: "Participated in sprints and daily scrum routines" }
];

function SkillIcon({ name, className }) {
  if (name === "SiCsharp") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 7 22 17 12 22 2 17 2 7" className="stroke-current opacity-30" />
        <path d="M8.5 10a2.2 2.2 0 1 0 0 4" />
        <path d="M13.5 8.5v7M16 8.5v7M12 10.5h5.5M12 13.5h5.5" />
      </svg>
    );
  }
  if (name === "SiJava") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a3 3 0 0 1 0 6h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <path d="M6 1v3M10 1v3M14 1v3" />
      </svg>
    );
  }
  if (name === "SiAmazonaws" || name === "SiAmazonwebservices") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 14c3.5 4 9 4 12.5 0" />
        <path d="M14 12.5l2 1.5-1 2" />
      </svg>
    );
  }

  const IconComponent = iconMapping[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} />;
}

export default function TechOrbitSphere() {
  const prefersReduced = useReducedMotion();
  const [isMobileMode, setIsMobileMode] = useState(false);
  const [sphereRadius, setSphereRadius] = useState(180);
  const [renderedPoints, setRenderedPoints] = useState([]);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [hoveredNodeIndex, setHoveredNodeIndex] = useState(null);
  const [debouncedHoveredIndex, setDebouncedHoveredIndex] = useState(null);
  const [activeTooltipIndex, setActiveTooltipIndex] = useState(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const hoverTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  // Math ref variables for 3D rotations, drags, and inertia momentum decay
  const rotationX = useRef(0);
  const rotationY = useRef(0);
  const velocityX = useRef(0);
  const velocityY = useRef(0);
  const isDragging = useRef(false);
  const lastPointer = useRef({ x: 0, y: 0 });
  const requestRef = useRef(null);
  const isHovered = useRef(false);

  // Debounced hover event handlers to limit CPU and transition noise
  const handleNodeHover = (index) => {
    setHoveredNodeIndex(index);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setDebouncedHoveredIndex(index);
    }, 50);
  };

  const handleNodeLeave = () => {
    setHoveredNodeIndex(null);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setDebouncedHoveredIndex(null);
    }, 50);
  };

  const handleBadgeTap = (e, index) => {
    e.stopPropagation();
    setActiveTooltipIndex((prev) => (prev === index ? null : index));
  };

  const getTooltipAlignmentClass = (index) => {
    const el = document.getElementById(`skill-node-${index}`);
    if (el) {
      const rect = el.getBoundingClientRect();
      const rightSpace = window.innerWidth - rect.right;
      const leftSpace = rect.left;

      if (rightSpace < 120) {
        return "right-0 translate-x-0 origin-bottom-right text-right";
      }
      if (leftSpace < 120) {
        return "left-0 translate-x-0 origin-bottom-left text-left";
      }
    }
    return "left-1/2 -translate-x-1/2 text-center";
  };

  // Monitor screen sizes to dynamically scale radius or apply fallbacks
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileMode(width < 768);
      if (width < 400) {
        setSphereRadius(90);
      } else if (width < 480) {
        setSphereRadius(110);
      } else if (width < 768) {
        setSphereRadius(140);
      } else if (width < 1024) {
        setSphereRadius(185);
      } else {
        setSphereRadius(225);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Tap-elsewhere-to-dismiss handler for mobile touch screen tooltips
  useEffect(() => {
    if (!isMobileMode) return;
    const handleGlobalClick = () => {
      setActiveTooltipIndex(null);
    };
    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [isMobileMode]);

  // Monitor mouse movements for subtle graph parallax offsets
  useEffect(() => {
    if (prefersReduced || isMobileMode) return;
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) * 0.005; // 2-4px offset max
      const y = (e.clientY - window.innerHeight / 2) * 0.005;
      setMouseOffset({ x: -x, y: -y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReduced, isMobileMode]);

  // Pre-calculate Golden Spiral / Fibonacci distribution vectors
  const points = useRef([]);
  const connections = useRef([]);

  useEffect(() => {
    const N = skillsList.length;
    const tempPoints = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / goldenRatio;

      tempPoints.push({
        x: Math.cos(theta) * r,
        y: y,
        z: Math.sin(theta) * r,
        skill: skillsList[i]
      });
    }
    points.current = tempPoints;

    const tempConnections = [];
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = tempPoints[i].x - tempPoints[j].x;
        const dy = tempPoints[i].y - tempPoints[j].y;
        const dz = tempPoints[i].z - tempPoints[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 0.75) { // Proximity bound on unit sphere
          tempConnections.push([i, j]);
        }
      }
    }
    connections.current = tempConnections;
  }, []);

  // Main 3D render tick animation frame loop
  useEffect(() => {
    if (isMobileMode) return;

    if (prefersReduced) {
      // Draw static arrangement if reduced motion is requested
      const staticPoints = points.current.map(pt => ({
        ...pt,
        rx: pt.x * sphereRadius,
        ry: pt.y * sphereRadius,
        rz: pt.z * sphereRadius
      }));
      setRenderedPoints(staticPoints);
      return;
    }

    const tick = () => {
      if (isDragging.current) {
        // Friction decay on active drag moves
        velocityX.current *= 0.85;
        velocityY.current *= 0.85;
      } else {
        // Continuous slow idle auto-rotation in a real spherical path (slow down when hovered)
        const speedY = (isHovered.current || hoveredNodeIndex !== null) ? 0.0002 : 0.0012;
        const speedX = (isHovered.current || hoveredNodeIndex !== null) ? 0.0001 : 0.0006;
        rotationY.current += speedY;
        rotationX.current += speedX;

        // Apply friction-based decay to velocity after user drag release
        rotationX.current += velocityX.current;
        rotationY.current += velocityY.current;
        velocityX.current *= 0.95;
        velocityY.current *= 0.95;
      }

      const cosX = Math.cos(rotationX.current);
      const sinX = Math.sin(rotationX.current);
      const cosY = Math.cos(rotationY.current);
      const sinY = Math.sin(rotationY.current);

      const time = Date.now() * 0.0015;

      const rotated = points.current.map((pt, idx) => {
        // Rotate Y Axis (Horizontal)
        const x1 = pt.x * cosY - pt.z * sinY;
        const z1 = pt.x * sinY + pt.z * cosY;
        const y1 = pt.y;

        // Rotate X Axis (Vertical)
        const x2 = x1;
        const y2 = y1 * cosX - z1 * sinX;
        const z2 = y1 * sinX + z1 * cosX;

        // Add gentle independent breathing/drift
        const drift = Math.sin(time + idx * 1.5) * 5; // ±5px breathing

        return {
          ...pt,
          rx: x2 * sphereRadius + (x2 > 0 ? drift * 0.35 : -drift * 0.35),
          ry: y2 * sphereRadius + drift,
          rz: z2 * sphereRadius
        };
      });

      setRenderedPoints(rotated);

      // Recalculate highlighted lines using DOM positions
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();

        connections.current.forEach(([i, j], idx) => {
          const lineEl = document.getElementById(`hover-line-el-${idx}`);
          if (!lineEl) return;

          const isHighlighted = debouncedHoveredIndex === i || debouncedHoveredIndex === j;

          if (isHighlighted) {
            const el1 = document.getElementById(`skill-node-${i}`);
            const el2 = document.getElementById(`skill-node-${j}`);

            if (el1 && el2) {
              const r1 = el1.getBoundingClientRect();
              const r2 = el2.getBoundingClientRect();

              // Coordinates relative to sphere container center
              const cx = containerRect.width / 2;
              const cy = containerRect.height / 2;

              const x1 = r1.left - containerRect.left + r1.width / 2 - cx;
              const y1 = r1.top - containerRect.top + r1.height / 2 - cy;
              const x2 = r2.left - containerRect.left + r2.width / 2 - cx;
              const y2 = r2.top - containerRect.top + r2.height / 2 - cy;

              const dx = x2 - x1;
              const dy = y2 - y1;
              const length = Math.sqrt(dx * dx + dy * dy);

              lineEl.setAttribute("x1", x1);
              lineEl.setAttribute("y1", y1);
              lineEl.setAttribute("x2", x2);
              lineEl.setAttribute("y2", y2);
              lineEl.setAttribute("stroke-dasharray", length);

              if (!lineEl.dataset.initialized) {
                lineEl.setAttribute("stroke-dashoffset", length);
                lineEl.style.opacity = "0";
                lineEl.getBoundingClientRect(); // trigger layout reflow
                lineEl.dataset.initialized = "true";
              }
              lineEl.style.strokeDashoffset = "0";
              lineEl.style.opacity = "0.9";
            }
          } else {
            // Fade out and reset dashoffset
            if (lineEl.dataset.initialized) {
              const dasharray = lineEl.getAttribute("stroke-dasharray") || "100";
              lineEl.style.strokeDashoffset = dasharray;
              lineEl.style.opacity = "0";
              delete lineEl.dataset.initialized;
            }
          }
        });
      }

      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestRef.current);
  }, [sphereRadius, isMobileMode, prefersReduced, debouncedHoveredIndex]);

  // Pointer drag hooks (combines touch + mouse seamlessly)
  const handlePointerDown = (e) => {
    isDragging.current = true;
    setHasInteracted(true);
    lastPointer.current = { x: e.clientX, y: e.clientY };
    velocityX.current = 0;
    velocityY.current = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastPointer.current.x;
    const deltaY = e.clientY - lastPointer.current.y;

    const scaleFactor = 0.005; // drag to rotation scale
    rotationY.current -= deltaX * scaleFactor;
    rotationX.current += deltaY * scaleFactor;

    // Track velocities for momentum calculations on release
    velocityX.current = deltaY * scaleFactor;
    velocityY.current = -deltaX * scaleFactor;

    lastPointer.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  // Mobile/Tablet responsive reflow layout
  if (isMobileMode) {
    return (
      <div
        ref={containerRef}
        className="w-full py-6 px-4 text-center select-none z-10 relative"
        aria-label="Technical skills list"
      >
        <ul className="flex flex-wrap justify-center gap-2.5 max-w-xl mx-auto">
          {skillsList.map((skill, index) => {
            const isTooltipActive = activeTooltipIndex === index;

            return (
              <li
                key={index}
                id={`skill-node-${index}`}
                onClick={(e) => handleBadgeTap(e, index)}
                className="relative flex items-center gap-1.5 px-3 py-2 bg-base-900 border border-line text-ink-100 font-mono text-xs rounded-xl shadow-sm cursor-pointer select-none active:bg-base-800 transition-colors pointer-events-auto"
                style={{
                  '--skill-color': skill.color || 'rgb(var(--color-accent-teal))',
                }}
              >
                {skill.icon ? (
                  <SkillIcon name={skill.icon} className="w-3.5 h-3.5" style={{ color: skill.color || 'inherit' }} />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                )}
                <span>{skill.name}</span>

                {/* Tap Tooltip with Proof Point */}
                {isTooltipActive && (
                  <div
                    onClick={(e) => e.stopPropagation()} // Prevent close on clicking inside the tooltip
                    className={`absolute bottom-full mb-2.5 w-48 bg-base-900 border border-accent-blue/35 text-[9px] font-sans text-ink-100 p-2.5 rounded-xl shadow-xl z-[999] text-center backdrop-blur-md ${getTooltipAlignmentClass(index)}`}
                  >
                    {/* Close Button */}
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveTooltipIndex(null); }}
                      className="absolute top-1 right-1.5 text-ink-400 hover:text-ink-100 p-0.5"
                      aria-label="Close tooltip"
                    >
                      <X size={10} />
                    </button>
                    <div className="text-accent-cyan font-bold uppercase text-[7px] tracking-widest block mb-0.5">Proof Point</div>
                    <p className="leading-tight pr-3 font-light text-left">{skill.proof}</p>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  // Desktop interactive 3D constellation layout
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-center justify-center select-none cursor-grab active:cursor-grabbing w-full aspect-square max-w-[550px]"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onMouseEnter={() => { isHovered.current = true; }}
      onMouseLeave={() => { isHovered.current = false; }}
      style={{
        touchAction: "none",
        transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`
      }}
    >

      {/* Pulse energy core centered behind all orbited tags */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-tr from-accent-blue/10 to-accent-cyan/15 blur-3xl z-0 pointer-events-none animate-pulse"
        style={{ animationDuration: '6s' }}
      />

      {/* SVG Canvas for drawing connecting lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
        viewBox={`-${sphereRadius + 50} -${sphereRadius + 50} ${(sphereRadius + 50) * 2} ${(sphereRadius + 50) * 2}`}
      >
        {/* Draw background standard connections */}
        {connections.current.map(([i, j], idx) => {
          const pt1 = renderedPoints[i];
          const pt2 = renderedPoints[j];
          if (!pt1 || !pt2) return null;

          // Fade connections based on depth relative to center
          const avgZ = (pt1.rz + pt2.rz) / 2;
          const lineOpacity = 0.04 + 0.12 * (avgZ + sphereRadius) / (2 * sphereRadius);

          return (
            <line
              key={idx}
              x1={pt1.rx}
              y1={pt1.ry}
              x2={pt2.rx}
              y2={pt2.ry}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-line/35"
              style={{ opacity: lineOpacity }}
            />
          );
        })}

        {/* Draw traveling dots along connecting lines */}
        {connections.current.map(([i, j], idx) => {
          const pt1 = renderedPoints[i];
          const pt2 = renderedPoints[j];
          if (!pt1 || !pt2) return null;

          const isHighlighted = hoveredNodeIndex === i || hoveredNodeIndex === j;
          const avgZ = (pt1.rz + pt2.rz) / 2;
          const lineOpacity = 0.04 + 0.12 * (avgZ + sphereRadius) / (2 * sphereRadius);

          if (idx % 3 === 0 || isHighlighted) {
            const t = (Date.now() % 3500) / 3500;
            const offset = (idx * 0.17) % 1.0;
            const progress = (t + offset) % 1.0;
            const dotX = pt1.rx + (pt2.rx - pt1.rx) * progress;
            const dotY = pt1.ry + (pt2.ry - pt1.ry) * progress;

            return (
              <circle
                key={`dot-${idx}`}
                cx={dotX}
                cy={dotY}
                r={isHighlighted ? "1.6" : "1.2"}
                className={isHighlighted ? "fill-accent-cyan" : "fill-accent-blue/60"}
                style={{ opacity: isHighlighted ? 0.9 : lineOpacity * 2 }}
              />
            );
          }
          return null;
        })}

        {/* Render all potential dynamic hover lines */}
        {connections.current.map(([i, j], idx) => (
          <line
            key={`hover-line-${idx}`}
            id={`hover-line-el-${idx}`}
            stroke="var(--color-accent-cyan)"
            strokeWidth="1.5"
            style={{
              opacity: 0,
              pointerEvents: "none",
              transition: "opacity 150ms ease, stroke-dashoffset 300ms ease"
            }}
          />
        ))}
      </svg>

      {/* Accessible semantic list of rotating skills */}
      <ul
        aria-label="3D Drag to explore technical skills"
        className="absolute inset-0 w-full h-full"
        style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      >
        {renderedPoints.map((pt, index) => {
          // Perspective scale based on Z depth position
          const scale = 0.75 + 0.5 * (pt.rz + sphereRadius) / (2 * sphereRadius);

          // Raised baseline opacity to keep background elements clearly visible
          const opacity = 0.35 + 0.65 * (pt.rz + sphereRadius) / (2 * sphereRadius);

          // Reduced blur and desaturation multipliers to keep background text legible
          const blurValue = Math.max(0, -pt.rz / 150);
          const grayscale = Math.max(0, -pt.rz / sphereRadius * 60);

          return (
            <li
              key={index}
              id={`skill-node-${index}`}
              className="absolute left-1/2 top-1/2 origin-center -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none"
              style={{
                transform: `translate3d(${pt.rx}px, ${pt.ry}px, ${pt.rz}px) scale(${hoveredNodeIndex === index ? scale * 1.15 : scale})`,
                zIndex: Math.round(pt.rz + sphereRadius) + (hoveredNodeIndex === index ? 1000 : 0),
                opacity: opacity,
                filter: hoveredNodeIndex === index ? "none" : `blur(${blurValue}px) grayscale(${grayscale}%)`,
                '--skill-color': pt.skill.color || 'rgb(var(--color-accent-teal))',
                '--skill-color-glow': pt.skill.color ? `${pt.skill.color}45` : 'rgba(14,148,136,0.35)',
                willChange: "transform" // hardware compositor layer acceleration for rotation
              }}
              onMouseEnter={() => handleNodeHover(index)}
              onMouseLeave={handleNodeLeave}
            >
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 bg-base-900/85 border text-ink-100 font-mono text-[9px] sm:text-xs rounded-xl shadow-lg hover:border-[var(--skill-color)] hover:text-[var(--skill-color)] hover:shadow-[0_8px_20px_var(--skill-color-glow)] transition-all duration-300 pointer-events-auto ${hoveredNodeIndex === index ? "border-[var(--skill-color)] text-[var(--skill-color)]" : "border-line/80"
                  }`}
                style={{
                  borderColor: pt.skill.color && hoveredNodeIndex !== index ? `${pt.skill.color}30` : undefined
                }}
              >
                {pt.skill.icon ? (
                  <SkillIcon
                    name={pt.skill.icon}
                    className="w-3.5 h-3.5 transition-colors"
                    style={{ color: hoveredNodeIndex === index || !pt.skill.color ? 'inherit' : pt.skill.color }}
                  />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                )}
                <span>{pt.skill.name}</span>
              </div>

              {/* Recruiter Tooltip with Proof Point */}
              {debouncedHoveredIndex === index && (
                <div
                  className={`absolute bottom-full mb-2.5 w-48 bg-base-900 border border-accent-blue/35 text-[9px] font-sans text-ink-100 p-2.5 rounded-xl shadow-xl z-[999] pointer-events-none backdrop-blur-md ${getTooltipAlignmentClass(index)}`}
                >
                  <div className="text-accent-cyan font-bold uppercase text-[7px] tracking-widest block mb-0.5">Proof Point</div>
                  <p className="leading-tight font-light text-center">{pt.skill.proof}</p>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Floating prompt instructional badge (fades out after first interaction) */}
      {!hasInteracted && (
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1.5 border border-accent-blue/30 bg-base-900/80 text-accent-blue font-mono text-[9px] uppercase tracking-widest rounded-full shadow-lg flex items-center gap-1.5 pointer-events-none animate-bounce">
          <span>↻ Drag to explore</span>
        </div>
      )}
    </motion.div>
  );
}
