"use client";

import { useState, useRef } from "react";
import { Terminal, Sparkles, Cpu, ShieldAlert, Binary } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./V2GatewayPortal.module.css";

function Magnet({ children, pullStrength = 0.3 }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    
    setOffset({ x: x * pullStrength, y: y * pullStrength });
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
    setIsHovered(false);
  };
  
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: isHovered 
          ? "transform 80ms linear" 
          : "transform 400ms cubic-bezier(0.25, 1, 0.5, 1)",
        display: "inline-block",
        willChange: "transform"
      }}
    >
      {children}
    </div>
  );
}

export function V2GatewayPortal({ onSelectMode }) {
  const [hoveredSide, setHoveredSide] = useState(null); // 'developer', 'creative', or null
  const [scanActive, setScanActive] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleSelect = (mode) => {
    if (scanActive) return;
    setSelected(mode);
    setScanActive(true);
    setTimeout(() => {
      onSelectMode(mode);
    }, 1200); // Laser animation duration
  };

  return (
    <div className={`${styles.portalWrapper} ${scanActive ? styles.portalActive : ""}`}>
      {/* Dynamic scan line effect */}
      <div className={`${styles.scanLine} ${scanActive ? styles.scanLineRun : ""} ${selected === "creative" ? styles.scanLineCreative : ""}`} />

      {/* Brand Watermark Overlay */}
      <div className={styles.watermark}>
        <span>HARISH ROHITH</span>
      </div>

      <div className={styles.splitLayout}>
        {/* LEFT PANEL: Technical Engineer */}
        <motion.div
          className={`${styles.splitPanel} ${styles.panelDev} ${hoveredSide === "developer" ? styles.expanded : hoveredSide === "creative" ? styles.shrunk : ""}`}
          onMouseEnter={() => setHoveredSide("developer")}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={() => handleSelect("developer")}
          animate={{
            flex: hoveredSide === "developer" ? 1.4 : hoveredSide === "creative" ? 0.6 : 1
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <div className={styles.gridOverlayDev} />
          <div className={styles.panelGlowDev} />
          
          <div className={styles.panelContent}>
            <div className={styles.iconCircleDev}>
              <Cpu size={32} className={styles.lucideIconDev} />
            </div>
            
            <span className={styles.panelIndex}>[ REALM_01 ]</span>
            <h2 className={styles.panelTitle}>Technical Engineer</h2>
            <p className={styles.panelDesc}>
              High-performance backend systems, low-latency API architectures, IoT telemetry matrices, and productionized AI workflows. Built on clean logic.
            </p>

            <div className={styles.techTags}>
              <span>Bun.js</span>
              <span>ElysiaJS</span>
              <span>Next.js 15</span>
              <span>ESP32</span>
              <span>PostgreSQL</span>
            </div>

            <Magnet>
              <button 
                className={styles.devBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect("developer");
                }}
              >
                <Terminal size={14} />
                <span>LOAD_SYSTEM_ARCHITECT</span>
              </button>
            </Magnet>
          </div>

          <div className={styles.telemetryOverlay}>
            <Binary size={120} className={styles.giantIcon} />
          </div>
        </motion.div>

        {/* RIGHT PANEL: Creative Architect */}
        <motion.div
          className={`${styles.splitPanel} ${styles.panelCreative} ${hoveredSide === "creative" ? styles.expanded : hoveredSide === "developer" ? styles.shrunk : ""}`}
          onMouseEnter={() => setHoveredSide("creative")}
          onMouseLeave={() => setHoveredSide(null)}
          onClick={() => handleSelect("creative")}
          animate={{
            flex: hoveredSide === "creative" ? 1.4 : hoveredSide === "developer" ? 0.6 : 1
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <div className={styles.gridOverlayCreative} />
          <div className={styles.panelGlowCreative} />
          
          <div className={styles.panelContent}>
            <div className={styles.iconCircleCreative}>
              <Sparkles size={32} className={styles.lucideIconCreative} />
            </div>

            <span className={styles.panelIndex}>[ REALM_02 ]</span>
            <h2 className={styles.panelTitle}>Creative Architect</h2>
            <p className={styles.panelDesc}>
              Ultra-fluid motion design, elastic mechanics, rich typography systems, and high-impact digital experiences inspired by Luffy's Gear 5 liberation.
            </p>

            <div className={styles.creativeTags}>
              <span>Joyboy.Haki</span>
              <span>Framer Motion</span>
              <span>Canvas physics</span>
              <span>Nika state</span>
              <span>State overdrive</span>
            </div>

            <Magnet>
              <button 
                className={styles.creativeBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect("creative");
                }}
              >
                <Sparkles size={14} />
                <span>AWAKEN_JOYBOY_SIGIL</span>
              </button>
            </Magnet>
          </div>

          <div className={styles.creativeOverlay}>
            <ShieldAlert size={120} className={styles.giantIcon} />
          </div>
        </motion.div>
      </div>

      <footer className={styles.portalFooter}>
        <div className={styles.footerBrand}>
          <Cpu size={12} />
          <span>Defying Latency, Orchestrating Impact</span>
        </div>
        <span>© 2026 Harish Rohith | Gateway System v3.0.0</span>
      </footer>
    </div>
  );
}
