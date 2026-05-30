"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import { 
  Terminal, 
  Cpu, 
  Award, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  TrendingUp, 
  CheckCircle,
  Sparkles,
  Activity,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Globe,
  Bot,
  RadioTower,
  Search,
  PenTool,
  Smartphone,
  Blocks,
  X,
  Braces,
  Code2,
  Database,
  Server,
  Palette,
  Cloud,
  BrainCircuit
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionReveal } from "./SectionReveal";
import styles from "./V2DeveloperClient.module.css";
import { technicalSkillGroups } from "@/lib/resume-data";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function VisualOrb({ initials }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.heroOrb}
      aria-hidden="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <div className={styles.heroOrbOuter} />
      <div className={styles.heroOrbMiddle} />
      <div className={styles.heroOrbCore}>
        <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
          {/* Default initials */}
          <span style={{
            opacity: hovered ? 0 : 1,
            transform: hovered ? "scale(0.8) rotate(-15deg)" : "scale(1)",
            transition: "all 450ms cubic-bezier(0.16, 1, 0.3, 1)",
            position: "absolute"
          }}>
            {initials}
          </span>
          
          {/* Secret Monarchs Logo on Hover */}
          <div style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1.1) rotate(0deg)" : "scale(0.8) rotate(15deg)",
            transition: "all 450ms cubic-bezier(0.16, 1, 0.3, 1)",
            position: "absolute",
            width: "70%",
            height: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Image
              src="/Monarchs.png"
              alt="Monarchs Logo"
              width={75}
              height={75}
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 0 10px rgba(14, 165, 233, 0.45)) drop-shadow(0 0 4px rgba(14, 165, 233, 0.2))"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TiltCard({ children, className, style, ...props }) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((centerY - y) / centerY) * 6; // subtle max 6 degrees tilt
    const rotateY = ((x - centerX) / centerX) * 6; // subtle max 6 degrees tilt
    
    card.style.setProperty("--rx", `${rotateX}deg`);
    card.style.setProperty("--ry", `${rotateY}deg`);
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    setIsHovered(false);
  };
  
  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: "perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        transition: isHovered 
          ? "transform 80ms linear" 
          : "transform 500ms cubic-bezier(0.25, 1, 0.5, 1)",
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
      {...props}
    >
      {children}
    </div>
  );
}

// Native brand SVG icons for skills
function JavaScriptIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#f7df1e" d="M0 0h24v24H0z"/>
      <path fill="#000" d="M18.66 12.02c-.8-.44-1.8-.73-2.65-.73-1.4 0-2.3.62-2.3 1.7 0 1.25.96 1.62 2.65 2.19 2.22.75 3.3 1.66 3.3 3.65 0 2.2-1.78 3.5-4.4 3.5-2.07 0-3.7-.85-4.48-2.35l1.83-1.07c.56.98 1.48 1.48 2.62 1.48 1.34 0 2.25-.56 2.25-1.57 0-1.25-.9-1.63-2.62-2.22-2.2-.77-3.33-1.63-3.33-3.66 0-2.05 1.72-3.4 4.07-3.4 1.74 0 3.2.66 3.98 1.93l-1.92 1.07zm-7.66 4.31v4c0 1.28-.62 1.95-1.77 1.95-.9 0-1.5-.47-1.75-1.32l-1.9 1.15c.66 1.5 2.05 2.2 3.8 2.2 2.64 0 3.94-1.4 3.94-3.9v-8.4h-2.32v4.32z"/>
    </svg>
  );
}

function TypeScriptIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#3178c6" d="M0 0h24v24H0z"/>
      <path fill="#fff" d="M12.92 20.35v-8.42h-3.4v8.42zm7.1 0c.93 0 1.7-.35 2.1-.98l-1.23-1c-.24.33-.55.5-.86.5-.44 0-.74-.23-.74-.93v-4.9h2.36v-1.12H19.4v-2.2l-1.25.33v1.87h-1.66v1.12h1.66v5.2c0 1.3.83 2.1 2.87 2.1z"/>
    </svg>
  );
}

function ReactIcon({ size, className }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
      <g stroke="#61dafb" strokeWidth="1.2" fill="none">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  );
}

function NextjsIcon({ size, className }) {
  return (
    <svg viewBox="0 0 180 180" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0, filter: "drop-shadow(0 0 1px rgba(255,255,255,0.8))" }}>
      <circle cx="90" cy="90" r="90" fill="#000"/>
      <path fill="url(#nextjs-grad)" d="M149.508 157.52L69.142 54H54v72h14.4V72.234l72.2 92.427c3.213-2.14 6.184-4.52 8.908-7.14z"/>
      <rect x="115" y="54" width="14" height="72" fill="#fff"/>
      <defs>
        <linearGradient id="nextjs-grad" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff"/>
          <stop offset="1" stopColor="#fff" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function TailwindIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#38bdf8" d="M12 6.018C15.6 2.418 20.4 4.818 24 8.418c-3.6 3.6-8.4 1.2-12-2.4-3.6-3.6-8.4-1.2-12 2.4 3.6-3.6 8.4-1.2 12-2.4zm0 6c3.6-3.6 8.4-1.2 12 2.4-3.6 3.6-8.4 1.2-12-2.4-3.6-3.6-8.4-1.2-12 2.4 3.6-3.6 8.4-1.2 12-2.4z"/>
    </svg>
  );
}

function NodejsIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#339933" d="M12 1.344L2.247 6.974v11.26L12 23.86l9.753-5.626v-11.26L12 1.344zm7.986 6.302l-2.02 1.16v1.986L12 14.288 6.034 10.79V8.805l-2.02-1.16v10.18l7.986 4.607 7.986-4.607V7.646zm-2.02 5.093l-2.02 1.16v1.985l-3.946 2.274-3.947-2.274v-1.985l-2.02-1.16v4.617l5.967 3.441 5.967-3.441v-4.617z"/>
    </svg>
  );
}

function BunIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#fbf0d9" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V14h3v2.5zm0-4.5h-3v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V12z" stroke="#cca43b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9.5" cy="11.5" r="1.2" fill="#cca43b" />
      <circle cx="14.5" cy="11.5" r="1.2" fill="#cca43b" />
      <path d="M11 13.5h2" stroke="#cca43b" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function ElysiaIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="url(#elysia-grad)" d="M12 2L2 22h20L12 2zm0 4l6.5 13H5.5L12 6z"/>
      <defs>
        <linearGradient id="elysia-grad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#00f2fe"/>
          <stop offset="1" stopColor="#4facfe"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function RedisIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#dc382c" d="M12 .587l11.455 5.867v11.092L12 23.413.545 17.546V6.454L12 .587zm0 4.195L4.417 8.654l7.583 3.882 7.583-3.882-7.583-3.872zm-7.583 6.94l6.453 3.305v4.205L4.417 15.93v-4.208zm8.713 7.51v-4.205l6.453-3.305v4.208l-6.453 3.302z"/>
    </svg>
  );
}

function PostgresIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#336791" d="M21.907 10.963c-.305-1.921-1.391-3.666-2.91-4.912l-1.37 1.37c1.077.892 1.83 2.115 2.052 3.542h2.228zm-3.522-6.52c-1.667-.938-3.53-1.443-5.385-1.443s-3.718.505-5.385 1.443l1.109 1.917c1.32-.73 2.802-1.12 4.276-1.12s2.956.39 4.276 1.12l1.109-1.917zm-14.83 4.208c-.732 1.321-1.12 2.802-1.12 4.276 0 1.474.388 2.955 1.12 4.276l1.918-1.109c-.502-.911-.778-1.94-.778-3.167s.276-2.256.778-3.167L3.555 8.651zm8.445 12.349c1.474 0 2.956-.388 4.276-1.12l-1.109-1.918c-.911.502-1.94.778-3.167.778s-2.256-.276-3.167-.778l-1.109 1.918c1.32.732 2.802 1.12 4.276 1.12zm10.207-6.037h-2.228c-.222 1.427-.975 2.65-2.052 3.542l1.37 1.37c1.519-1.246 2.605-2.991 2.91-4.912z"/>
    </svg>
  );
}

function MongodbIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#13aa52" d="M12 1.5C9 3.5 7.5 6 7.5 9c0 4 3 6.5 4.5 13.5 1.5-7 4.5-9.5 4.5-13.5 0-3-1.5-5.5-4.5-7.5zm.3 6.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/>
    </svg>
  );
}

function FirebaseIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#FFCA28" d="M3.89 15.67L2 5.09a.46.46 0 0 1 .8-.4l3.19 3.19z"/>
      <path fill="#FFA000" d="M13.6 3.15a.5.5 0 0 0-.7 0L2 14.77l5.08-5.08z"/>
      <path fill="#F57C00" d="M12 21.64l9.11-9.11a.5.5 0 0 0-.7-.7L2 21.64z"/>
    </svg>
  );
}

function SupabaseIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#3ecf8e" d="M12 2L2 14h9v8l10-12h-9z"/>
    </svg>
  );
}

function DockerIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#2496ed" d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.902c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.99c0 .103.083.186.186.186zm-2.913 0h2.119c.102 0 .185-.083.185-.185V8.902c0-.102-.083-.186-.185-.186h-2.119c-.103 0-.186.084-.186.186v1.99c0 .103.083.186.186.186zM8.157 8.166h2.119c.102 0 .185-.083.185-.185V5.99c0-.102-.083-.186-.185-.186h-2.119c-.103 0-.186.084-.186.186v1.99c0 .103.083.186.186.186zM.05 13.068c.03.35.132.966.529 1.48 1.139 1.477 3.593 1.42 4.47 1.402.13-.002.261-.006.393-.01.378-.012.753-.024 1.127-.024 2.012.052 4.092.748 5.378 1.942.277.257.568.643.568 1.101a3.523 3.523 0 0 0 1.258-2.613l.006-.118c.01-.174.028-.344.053-.51.096-.641.344-1.222.757-1.745.92-1.163 2.27-1.8 3.99-1.895l.385-.021c.143-.008.236-.123.236-.266v-.41c0-.13-.08-.244-.206-.279-1.285-.36-2.58-.69-3.896-.69h-.33a.473.473 0 0 0-.472.483l-.004.148c-.021.67-.091 1.341-.212 2.003-.064.354-.265.656-.566.852-.352.228-.783.279-1.18.138a3.782 3.782 0 0 1-1.921-1.507c-.438-.59-.641-1.218-.582-1.821v-.15c0-.127-.09-.234-.216-.255l-.364-.061c-1.743-.292-3.48-.46-5.234-.46-2.632 0-5.22.378-7.766 1.127a.264.264 0 0 0-.19.255v.714z"/>
    </svg>
  );
}

function GitIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#f05032" d="M23.384 11.41L12.59.616a1.686 1.686 0 0 0-2.384 0L8.243 2.58l3.19 3.19a2.823 2.823 0 0 1 3.985 0 2.825 2.825 0 0 1 0 3.985 2.827 2.827 0 0 1-3.985 0 2.823 2.823 0 0 1 0-3.985l-3.19-3.19L.616 10.206a1.686 1.686 0 0 0 0 2.384l10.79 10.79a1.686 1.686 0 0 0 2.384 0l10.79-10.79a1.688 1.688 0 0 0 0-2.384z"/>
    </svg>
  );
}

function FigmaIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#F24E1E" d="M12 5C12 3.34 10.66 2 9 2S6 3.34 6 5s1.34 3 3 3h3V5z"/>
      <path fill="#A259FF" d="M9 8c-1.66 0-3 1.34-3 3s1.34 3 3 3h3V8H9z"/>
      <path fill="#1ABC9C" d="M9 14c-1.66 0-3 1.34-3 3s1.34 3 3 3h3v-6H9z"/>
      <path fill="#19BCFE" d="M15 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3v6h3z"/>
      <path fill="#FF7262" d="M15 14c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3v-3h3z"/>
    </svg>
  );
}

function Esp32Icon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="#d97706" />
      <rect x="7" y="7" width="10" height="10" fill="#000" />
      <text x="12" y="13" fill="#fff" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ESP32</text>
      <path d="M5 3v-2M9 3v-2M13 3v-2M17 3v-2M5 21v2M9 21v2M13 21v2M17 21v2M3 5H1M3 9H1M3 13H1M3 17H1M21 5h2M21 9h2M21 13h2M21 17h2" stroke="#fff" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

function FramerIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#000000" stroke="#fff" strokeWidth="0.5" d="M5 2h14v6l-7 7H5V2zm0 14h7l7-7v13H5v-6z"/>
    </svg>
  );
}

function PythonIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#3776ab" d="M11.898.05c-2.42 0-4.63.16-5.59.45-3.32 1.01-3.23 3.16-3.23 5.34v2.02h8.92v1.27H3.078c-2.18 0-4.33-.09-5.34 3.23C-3.27 15.68-3.27 17.89-3.27 20.31s.16 4.63.45 5.59c1.01 3.32 3.16 3.23 5.34 3.23h2.02v-8.92h-1.27v8.92c2.18 0 4.33.09 5.34-3.23.99-3.23.99-5.44.99-7.86s-.16-4.63-.45-5.59c-1.01-3.32-3.16-3.23-5.34-3.23H2.078v1.27H11c2.18 0 4.33-.09 5.34 3.23z"/>
    </svg>
  );
}

function SolidityIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#363636" d="M12 1.5L4.5 9 12 16.5 19.5 9 12 1.5zm0 15L4.5 16.5l7.5 7.5 7.5-7.5-7.5 0z" />
      <path fill="#8c8c8c" d="M12 1.5L12 16.5l7.5-7.5L12 1.5zm0 15L12 24l7.5-7.5-7.5 0z" />
    </svg>
  );
}

function ArduinoIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#00979d" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 13.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm4 0c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
      <path fill="#fff" d="M9 11.5h2v1H9zM13 12h2v-2h-1v2z"/>
    </svg>
  );
}

function N8nIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#FF6D5A" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      <path fill="none" stroke="#FF6D5A" strokeWidth="2" d="M9 12h6"/>
    </svg>
  );
}

function OpenRouterIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#000000" />
      <path fill="none" stroke="#ffffff" strokeWidth="2" d="M6 18V9a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v9"/>
      <circle cx="6" cy="18" r="2" fill="#0ea5e9"/>
      <circle cx="18" cy="18" r="2" fill="#22c55e"/>
      <circle cx="12" cy="6" r="2" fill="#a855f7"/>
    </svg>
  );
}

function LangChainIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#1c3d2f" />
      <path fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" d="M8 12h8M6 8a4 4 0 0 1 4 4 4 4 0 0 1-4 4M18 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4" />
    </svg>
  );
}

function FlowiseIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#2b6cb0" />
      <path d="M7 17v-6h4v2h2v-2h4v6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="11" r="2" fill="#fff" />
      <circle cx="17" cy="11" r="2" fill="#fff" />
    </svg>
  );
}

function LovableIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <path fill="#ff4b91" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

function V0DevIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 13} height={size || 13} className={className} style={{ flexShrink: 0 }}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#000000" />
      <path fill="#ffffff" d="M12 17.5L5.5 6h13L12 17.5zm0-3l3.5-6.5h-7l3.5 6.5z"/>
    </svg>
  );
}

function GreenCheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: "#10b981", flexShrink: 0 }}>
      <circle cx="6" cy="6" r="5" fill="#10b981" />
      <path d="M3.6 6L4.8 7.2L8.4 3.6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const skillIconMap = {
  // Languages
  "javascript (es6+)": JavaScriptIcon,
  "typescript": TypeScriptIcon,
  "python": PythonIcon,
  "java": CoffeeIcon,
  "c++": Esp32Icon,
  "sql": Database,
  "solidity": SolidityIcon,
  
  // ML
  "supervised learning": TrendingUp,
  "regression & classification": Activity,
  "neural networks": BrainCircuit,
  "data preprocessing": Blocks,
  
  // Agent Orchestration
  "ai agents": Bot,
  "flowise": FlowiseIcon,
  "n8n": N8nIcon,
  "openrouter": OpenRouterIcon,
  "langchain": LangChainIcon,
  
  // Backend & Performance
  "bun.js": BunIcon,
  "elysiajs": ElysiaIcon,
  "redis (caching & pub/sub)": RedisIcon,
  "redis": RedisIcon,
  "websockets": RadioTower,
  "node.js": NodejsIcon,
  "fastify.js": Zap,
  "express.js": Server,
  
  // Frontend & Mobile
  "next.js 15": NextjsIcon,
  "react.js": ReactIcon,
  "react native": ReactIcon,
  "antigravity (state management)": Sparkles,
  "antigravity": Sparkles,
  "tailwind css": TailwindIcon,
  "capacitor.js": Smartphone,
  
  // IoT & Infrastructure
  "esp32": Esp32Icon,
  "arduino": ArduinoIcon,
  "embedded c": Terminal,
  "raspberry pi": Cpu,
  "lora": RadioTower,
  "sensors": Cpu,
  
  // Database & Cloud
  "supabase (auth/database/edge functions)": SupabaseIcon,
  "supabase": SupabaseIcon,
  "postgresql": PostgresIcon,
  "firebase": FirebaseIcon,
  "mongodb": MongodbIcon,
  "mysql": Database,
  
  // Vibe Coding [GDG Dev]
  "ai studio": Sparkles,
  "stitch": Sparkles,
  "jules": Bot,
  "pomeilli": PenTool,
  "claude code": Braces,
  "codex": Code2,
  "framer": FramerIcon,
  "lovable": LovableIcon,
  "v0.dev": V0DevIcon,

  // Fundamentals
  "dsa": Code2,
  "oops": Blocks,
  "dom": Globe,
  "system design": Cpu,
  "git & github": GitIcon,
  "git/github": GitIcon,
  "rest apis": Braces
};

// Fallback technical dictionary for all 45 skills
const skillDescriptionFallback = {
  // Languages
  "javascript (es6+)": "Asynchronous runtime orchestration, event loop optimization, and modern ESNext syntax architectures.",
  "typescript": "Strict structural typing, advanced generic interfaces, mapped types, and compile-time safety assurances.",
  "python": "Machine learning pipelines, automation orchestration, data analysis, and mathematical scripting.",
  "java": "Object-oriented enterprise systems, strict typing compilation, and multi-threaded JVM tuning.",
  "c++": "Low-level system programming, manual memory management, pointer arithmetic, and hardware interfaces.",
  "sql": "High-efficiency query construction, complex join queries, index structures, and transaction optimization.",
  "solidity": "Decentralized smart contract design, EVM execution cost optimization, and secure cryptographic protocols.",
  
  // ML
  "supervised learning": "Implementing training algorithms on labeled datasets for highly accurate prediction systems.",
  "regression & classification": "Supervised ML mapping discrete classes and predicting continuous outcomes.",
  "neural networks": "Designing layered neural connections, backpropagation tuning, and custom weight adjustments.",
  "data preprocessing": "Cleaning datasets, normalizations, scaling input matrices, and feature scaling operations.",
  
  // Agent Orchestration
  "ai agents": "Autonomous decision tree loops, tool-calling agency, and dynamic contextual system prompts.",
  "flowise": "Visual drag-drop interface automation for rapidly staging and deploying custom LLM flows.",
  "n8n": "Self-hosted event-driven node workflow integrations and low-latency API connections.",
  "openrouter": "Unified LLM routing, latency-based model switching, and optimized cost-effective token delivery.",
  "langchain": "Developing modular model-chain logic pipelines, memory state persistence, and tool-calling execution.",
  
  // Backend & Performance
  "bun.js": "Ultra-fast Javascript runtime execution, native package management, and zero-overhead compilation.",
  "elysiajs": "Strictly typed, sub-millisecond REST end-point handler routing, and fast execution pipelines.",
  "redis (caching & pub/sub)": "In-memory database caching, low-latency publish-subscribe networks, and atomic data structures.",
  "websockets": "Bi-directional low-latency telemetry transport stream sockets, and concurrent clients coordination.",
  "node.js": "Non-blocking I/O runtime engineering, event-driven microservices, and server-side logic.",
  "fastify.js": "Low-overhead high-throughput Node.js micro-framework, and strict schema validation pipelines.",
  "express.js": "Classic REST API server routing, middleware stack orchestration, and fast-moving web endpoints.",
  
  // Frontend & Mobile
  "next.js 15": "Full-stack React App Router architecture, server-rendered components, and static layout optimization.",
  "react.js": "Virtual DOM differential rendering, dynamic component state synchronization, and reactive state nodes.",
  "react native": "Native mobile component bridge compilation, multi-platform UI orchestration, and hardware-accelerated layouts.",
  "antigravity (state management)": "Supercharged fast-moving client-side state managers, action flows, and interaction-reactive cycles.",
  "tailwind css": "Utility-first design token styling, responsive grids coordination, and lightweight styling compilation.",
  
  // IoT & Infrastructure
  "esp32": "Microcontroller firmware flashing, deep-sleep cycles management, and WiFi/BLE telemetry integration.",
  "arduino": "Microcontroller system programming, digital/analog signal processing, and direct hardware instrumentation.",
  "embedded c": "Hardware registers manipulation, interrupt handling routines, and strict memory resource constraints.",
  "raspberry pi": "Single-board Linux hosting automation, sensor bus aggregation, and network gateways orchestration.",
  "lora": "Long-range sub-GHz RF data telemetry packet transmission, and low-power remote communications.",
  "sensors": "Analog/digital sensing registers reading (I2C, SPI, ADC), and noise filtering algorithms.",
  
  // Database & Cloud
  "supabase (auth/database/edge functions)": "Serverless Auth engines, PostgreSQL database synchronization, and low-latency Edge scripting.",
  "postgresql": "Relational database transaction management, advanced indexing trees, and JSON query processing.",
  "firebase": "Real-time key-value database synchronization, serverless user auth flows, and edge cloud storage.",
  "mongodb": "Document-oriented storage models, flexible schema scaling, and aggregate pipelines optimization.",
  "mysql": "Classic structured data queries execution, transaction-safe ACID states, and relational table indexing.",
  
  // Vibe Coding [GDG Dev]
  "ai studio": "Direct API benchmarking for Gemini models, system instruction testing, and high-performance prompts tuning.",
  "stitch": "Component rendering orchestration, live data connections, and fast app builder scaffolding.",
  "antigravity": "Interaction flow orchestration for fast-moving product interfaces.",
  "jules": "Interactive terminal agents, automated project code reviews, and high-efficiency task orchestration.",
  "pomeilli": "Rapid custom styling presets, dynamic CSS utilities compilation, and design-token systems.",
  "claude code": "Advanced agentic command-line system prompts, test suite runners, and surgical file refactorings.",
  "codex": "Autonomous codebase code generator tools, type mapping, and rapid feature prototyping scripts.",
  "framer": "Rich pixel-perfect animations layout prototyping, dynamic components transitions, and visual microcopy.",
  "lovable": "Full-stack client compiler execution, rapid UI iteration, and clean codebase generation.",
  "v0.dev": "Vercel-native generative UI design tokens, component wireframing, and custom Tailwind styling templates.",

  // Fundamentals
  "dsa": "Advanced data structures and algorithms, complexity analysis, and runtime performance.",
  "oops": "Object-oriented programming paradigms, abstraction, encapsulation, inheritance, and polymorphism.",
  "dom": "Browser Document Object Model manipulation, event bubbling, and rendering optimization.",
  "system design": "Distributed software architectures, horizontal/vertical scaling, and microservices coordination.",
  "git & github": "Distributed version control pipelines, repository orchestration, and collaborative action flows.",
  "rest apis": "RESTful architecture endpoints design, status code compliance, payload schemas, and JSON structures."
};

function CoffeeIcon({ size, className, style }) {
  // SVG Custom render for Coffee/Java icon to avoid missing lucide icon
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 15} 
      height={size || 15} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      style={style}
    >
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  );
}

function BentoSkillChip({ skill, accentColor, isSelected, onHover }) {
  const skillKey = skill.name.toLowerCase();
  const Glyph = skillIconMap[skillKey] || Terminal;

  return (
    <div
      className={`${styles.bentoSkillChip} ${isSelected ? styles.bentoSkillChipSelected : ""}`}
      onMouseEnter={onHover}
      style={{
        "--badge-accent": accentColor,
      }}
    >
      <Glyph size={24} className={styles.bentoSkillIcon} />
      <span className={styles.bentoSkillName}>{skill.name}</span>
    </div>
  );
}

function CapabilityCard({ category, skills }) {
  const getDomainOperationTag = (category) => {
    if (category.includes("Backend")) return "LATENCY_OPTIMIZED";
    if (category.includes("AI")) return "NEURAL_TRAINED";
    if (category.includes("IoT")) return "EDGE_SYNCED";
    if (category.includes("Frontend")) return "RENDER_COMPILED";
    if (category.includes("Vibe")) return "AGENTIC_PRODUCT";
    if (category.includes("P-Languages") || category.includes("Languages")) return "SYNTAX_PARSED";
    if (category.includes("Tools")) return "COMPILER_SHIELDED";
    return "STACK_RESOLVED";
  };

  const getGoogleColor = (category, index) => {
    const colors = ["#4285F4", "#EA4335", "#FBBC05", "#34A853"];
    const idx = (category.length + index) % colors.length;
    return colors[idx];
  };

  const defaultColor = getGoogleColor(category, 0);

  return (
    <TiltCard className={styles.capabilityCard}>
      <div className={styles.capabilityCardHead}>
        <div className={styles.capabilityTitleRow}>
          <h3>{category}</h3>
          <span 
            className={styles.operationTag} 
            style={{ 
              color: defaultColor, 
              borderColor: defaultColor + "33", 
              background: defaultColor + "0f" 
            }}
          >
            {getDomainOperationTag(category)}
          </span>
        </div>
      </div>

      {/* Bento compact grid of skills */}
      <div className={styles.bentoSkillsGrid}>
        {skills.map((skill, idx) => {
          const accentColor = getGoogleColor(category, idx);
          return (
            <BentoSkillChip
              key={skill.id || skill.name}
              skill={skill}
              accentColor={accentColor}
              isSelected={false}
              onHover={null}
            />
          );
        })}
      </div>
    </TiltCard>
  );
}



const serviceIcons = [Bot, Cpu, RadioTower, Search, PenTool, Smartphone, TrendingUp, Blocks];

// Project SVG Overview / SolutionOverview
function SolutionOverview({ projectId }) {
  let gradient = "linear-gradient(135deg, #1e3a8a 0%, #0d9488 100%)";
  let content = null;

  if (projectId === "skipq") {
    gradient = "linear-gradient(135deg, rgba(66, 133, 244, 0.15) 0%, rgba(52, 168, 83, 0.1) 100%)";
    content = (
      <>
        <defs>
          <linearGradient id="skipqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4285F4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34A853" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path d="M 0,20 L 320,20 M 0,60 L 320,60 M 0,100 L 320,100 M 0,140 L 320,140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <path d="M 40,0 L 40,180 M 120,0 L 120,180 M 200,0 L 200,180 M 280,0 L 280,180" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        
        <path d="M -20,120 C 60,120 80,60 160,60 C 240,60 260,120 340,120" stroke="rgba(255,255,255,0.05)" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M -20,120 C 60,120 80,60 160,60 C 240,60 260,120 340,120" stroke="url(#skipqGrad)" strokeWidth="3" strokeLinecap="round" fill="none" />
        
        <circle cx="50" cy="120" r="10" fill="#0f172a" stroke="#4285F4" strokeWidth="1.5" />
        <text x="50" y="123" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">01</text>
        
        <circle cx="110" cy="90" r="10" fill="#0f172a" stroke="#4285F4" strokeWidth="1.5" />
        <text x="110" y="93" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">02</text>
        
        <circle cx="170" cy="65" r="10" fill="#0f172a" stroke="#34A853" strokeWidth="1.5" />
        <text x="170" y="68" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">03</text>
        
        <ellipse cx="270" cy="90" rx="14" ry="34" fill="rgba(255,255,255,0.02)" stroke="#34A853" strokeWidth="1.5" strokeDasharray="3,3" />
        <ellipse cx="270" cy="90" rx="6" ry="20" fill="#34A853" opacity="0.7" />
      </>
    );
  } else if (projectId === "r-choice") {
    gradient = "linear-gradient(135deg, rgba(66, 133, 244, 0.15) 0%, rgba(234, 67, 53, 0.1) 100%)";
    content = (
      <>
        <path d="M 0,20 L 320,20 M 0,60 L 320,60 M 0,100 L 320,100 M 0,140 L 320,140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <path d="M 80,130 Q 140,40 200,75" stroke="rgba(66,133,244,0.3)" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />
        <path d="M 140,100 Q 200,20 260,50" stroke="rgba(234,67,53,0.3)" strokeWidth="1.5" strokeDasharray="4,4" fill="none" />

        <g transform="translate(50, 100)">
          <rect x="0" y="0" width="50" height="24" rx="4" fill="rgba(66,133,244,0.1)" stroke="#4285F4" strokeWidth="1" />
          <text x="25" y="15" fill="#ffffff" fontSize="7" textAnchor="middle" fontFamily="monospace">APPLY</text>
        </g>
        <g transform="translate(130, 70)">
          <rect x="0" y="0" width="50" height="24" rx="4" fill="rgba(234,67,53,0.1)" stroke="#EA4335" strokeWidth="1" />
          <text x="25" y="15" fill="#ffffff" fontSize="7" textAnchor="middle" fontFamily="monospace">VERIFY</text>
        </g>
        <g transform="translate(210, 40)">
          <rect x="0" y="0" width="50" height="24" rx="4" fill="rgba(52,168,83,0.1)" stroke="#34A853" strokeWidth="1" />
          <text x="25" y="15" fill="#ffffff" fontSize="7" textAnchor="middle" fontFamily="monospace">MATCH</text>
        </g>
      </>
    );
  } else if (projectId === "devs-recipe") {
    gradient = "linear-gradient(135deg, rgba(251, 188, 5, 0.12) 0%, rgba(234, 67, 53, 0.08) 100%)";
    content = (
      <>
        <circle cx="160" cy="90" r="32" fill="rgba(251,188,5,0.06)" stroke="#FBBC05" strokeWidth="1.5" />
        <circle cx="160" cy="90" r="42" stroke="rgba(234,67,53,0.2)" strokeWidth="1" strokeDasharray="4,4" />
        <text x="160" y="96" fill="#ffffff" fontSize="20" textAnchor="middle" fontWeight="bold" fontFamily="monospace">{"{}"}</text>
        <g transform="translate(60, 40)">
          <rect x="0" y="0" width="34" height="22" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
          <path d="M 6,9 L 10,13 L 6,17" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g transform="translate(220, 110)">
          <circle cx="15" cy="15" r="8" fill="rgba(255,255,255,0.02)" stroke="#34A853" strokeWidth="1" />
          <circle cx="15" cy="15" r="3" fill="#34A853" />
        </g>
      </>
    );
  } else if (projectId === "gridsense") {
    gradient = "linear-gradient(135deg, rgba(66, 133, 244, 0.15) 0%, rgba(52, 168, 83, 0.1) 100%)";
    content = (
      <>
        <circle cx="160" cy="90" r="28" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" strokeDasharray="3,3" />
        <circle cx="160" cy="90" r="50" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
        <path d="M 20,90 Q 50,55 80,90 T 140,90 T 200,90 T 260,90 T 300,90" stroke="#4285F4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <circle cx="80" cy="90" r="4" fill="#34A853" stroke="#ffffff" strokeWidth="1" />
        <circle cx="200" cy="90" r="4" fill="#4285F4" stroke="#ffffff" strokeWidth="1" />
      </>
    );
  } else if (projectId === "neer-ai") {
    gradient = "linear-gradient(135deg, rgba(52, 168, 83, 0.15) 0%, rgba(66, 133, 244, 0.1) 100%)";
    content = (
      <>
        <g transform="translate(138, 50)">
          <path d="M 22,0 C 22,0 44,24 44,38 C 44,50 34,60 22,60 C 10,60 0,50 0,38 C 0,24 22,0 22,0 Z" fill="rgba(52,168,83,0.08)" stroke="#34A853" strokeWidth="1.5" />
        </g>
        <circle cx="95" cy="80" r="4" fill="#FBBC05" />
        <line x1="100" y1="80" x2="136" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <circle cx="225" cy="80" r="4" fill="#EA4335" />
        <line x1="220" y1="80" x2="184" y2="80" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      </>
    );
  } else {
    gradient = "linear-gradient(135deg, rgba(66, 133, 244, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%)";
    content = (
      <>
        <rect x="50" y="70" width="50" height="40" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
        <rect x="220" y="70" width="50" height="40" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
        <line x1="108" y1="90" x2="212" y2="90" stroke="#4285F4" strokeWidth="1.5" strokeDasharray="3,3" />
        <circle cx="160" cy="90" r="6" fill="#34A853" />
      </>
    );
  }

  return (
    <div className={styles.projectSvgWrapper} style={{ background: gradient }}>
      <div className={styles.projectSvgGrid} />
      <div className={styles.projectSvgGlow} />
      <div className={styles.projectSvgContainer}>
        <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {content}
        </svg>
      </div>
    </div>
  );
}



function splitStack(stack) {
  return String(stack || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function questStat(project) {
  if (project?.impact) return project.impact;
  if (project?.summary) return project.summary;
  return "Operational System";
}

export function V2DeveloperClient({ 
  profile, 
  projects, 
  skills, 
  experiences, 
  certifications, 
  achievements, 
  progression, 
  v2Config,
  skillDomains,
  floatingSkills,
  featuredProject,
  secondaryProjects,
  gridProjects,
  majorAchievements,
  supportAchievements,
  projectMyths,
  serviceCards,
  onToggleMode,
  githubStatus,
  leetcodeStatus,
  isLowEnd = false
}) {
  const [coreTemp, setCoreTemp] = useState(38);
  const [uptime, setUptime] = useState(99.982);
  const [latency, setLatency] = useState(14);
  const [portalOpen, setPortalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loadStage, setLoadStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setLoadStage(1), 350);
    const t2 = setTimeout(() => setLoadStage(2), 700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  
  const isDeferredLoaded = loadStage >= 2;
  
  const [monarchHovered, setMonarchHovered] = useState(false);
  const heroRef = useRef(null);
  const initials = useMemo(() => getInitials(profile?.name || "Harish Rohith"), [profile?.name]);

  // Navbar scroll effect
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handlePointerMove(event) {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    heroRef.current.style.setProperty("--hero-x", `${x}%`);
    heroRef.current.style.setProperty("--hero-y", `${y}%`);
  }
  
  // Merge database skills with all technical skill groups to ensure no skills are missing
  const unifiedSkills = [];
  if (technicalSkillGroups && Array.isArray(technicalSkillGroups)) {
    technicalSkillGroups.forEach((group) => {
      group.items.forEach((skillName) => {
        // Find matching database skill if exists
        const dbSkill = (skills || []).find(
          (s) => s.name.toLowerCase() === skillName.toLowerCase() || 
                 s.name.toLowerCase().includes(skillName.toLowerCase()) ||
                 skillName.toLowerCase().includes(s.name.toLowerCase())
        );
        
        unifiedSkills.push({
          id: dbSkill?.id || `skill-${skillName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
          name: skillName,
          category: group.title,
          level: dbSkill?.level || (group.title === "Tools & DevOps" ? 27 : 29), // Default high-level stats
          expValue: dbSkill?.expValue || 3600,
          description: dbSkill?.description || skillDescriptionFallback[skillName.toLowerCase()] || "High-performance systems capability node."
        });
      });
    });
  } else if (skills && Array.isArray(skills)) {
    skills.forEach((s) => {
      unifiedSkills.push({
        ...s,
        description: s.description || skillDescriptionFallback[s.name.toLowerCase()] || "High-performance systems capability node."
      });
    });
  }

  // Group skills by category
  const skillGroups = {};
  unifiedSkills.forEach(skill => {
    const cat = skill.category || "General";
    if (!skillGroups[cat]) {
      skillGroups[cat] = [];
    }
    skillGroups[cat].push(skill);
  });

  // Telemetry updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCoreTemp(Math.floor(35 + Math.random() * 8));
      setLatency(Math.floor(10 + Math.random() * 8));
      setUptime(+(99.980 + Math.random() * 0.015).toFixed(3));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] } })
  };

  const cardReveal = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] } })
  };

  const orbEntrance = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] } }
  };

  const floatEntrance = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.7 + i * 0.15, ease: [0.16, 1, 0.3, 1] } })
  };

  const getDomainOperationTag = (category) => {
    if (category.includes("Backend")) return "LATENCY_OPTIMIZED";
    if (category.includes("AI")) return "NEURAL_TRAINED";
    if (category.includes("IoT")) return "EDGE_SYNCED";
    if (category.includes("Frontend")) return "RENDER_COMPILED";
    if (category.includes("Vibe")) return "AGENTIC_PRODUCT";
    return "STACK_RESOLVED";
  };

  const mainFeaturedProject = featuredProject || projects[0];
  const listSecondaryProjects = secondaryProjects || projects.slice(1, 3);
  const listGridProjects = gridProjects || projects.slice(3);

  return (
    <div className={styles.container}>
      <div className={styles.gridOverlay} />
      <div className={styles.ambientGlow} />

      <header className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}>
        <div className={styles.navLogo}>
          <Terminal size={14} className={styles.logoIcon} />
          <strong>iamharishrohith.env</strong>
          <span className={styles.navVersion}>sys_v2.5.0</span>
        </div>
        <div className={styles.navActions}>
          <button 
            type="button" 
            onClick={onToggleMode} 
            className={styles.creativeSwitch}
            title="Switch to Creative Mode"
          >
            <Sparkles size={12} />
            <span>Creative Mode</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="about" ref={heroRef} onPointerMove={handlePointerMove} className={styles.heroSection}>
        <div className={styles.heroGrid}>
          {/* Left: Bio info */}
          <motion.div className={styles.heroText} initial="hidden" animate="visible">
            <motion.span className={styles.sectionBadge} variants={fadeUp} custom={0}>SYSTEM_ARCHITECT_OVERVIEW</motion.span>
            <motion.h1 className={styles.heroName} variants={fadeUp} custom={1}>
              {profile?.name}
            </motion.h1>
            <motion.p className={styles.heroHeadline} variants={fadeUp} custom={2}>
              {profile?.headline}
            </motion.p>
            <motion.p className={styles.heroBio} variants={fadeUp} custom={3}>
              {profile?.bio}
            </motion.p>
            
            <motion.div className={styles.metaStatGrid} variants={fadeUp} custom={4}>
              <div className={styles.metaStatBox}>
                <span>POWER_LEVEL</span>
                <strong className={styles.amberText}>LVL {progression?.currentLevel || 42}</strong>
              </div>
              <div className={styles.metaStatBox}>
                <span>TOTAL_EXP</span>
                <strong className={styles.purpleText}>+{progression?.totalExp?.toLocaleString()}</strong>
              </div>
              <div className={styles.metaStatBox}>
                <span>RANK_TIER</span>
                <strong className={styles.cyanText}>S-RANK</strong>
              </div>
            </motion.div>

            <motion.div className={styles.heroActions} variants={fadeUp} custom={5}>
              <a href="#projects" className={styles.btnPrimary}>
                <span>Inspect Systems</span>
                <ArrowRight size={13} />
              </a>
              <a href="#contact" className={styles.btnSecondary}>
                <Mail size={13} />
                <span>Contact Portal</span>
              </a>
              <div className={styles.heroSocials}>
                <a href={profile?.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <Github size={14} />
                </a>
                <a href={profile?.linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <Linkedin size={14} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Centerpiece (Visual Orb & Floating Cards) */}
          <div className={styles.heroCenterpiece}>
            <div className={styles.heroAuraField} />
            <motion.div className={styles.heroOrbContainer} variants={orbEntrance} initial="hidden" animate="visible">
              <VisualOrb initials={initials} />
            </motion.div>

            <div className={styles.floatCardWrapper}>
              <motion.div className={`${styles.floatCard} ${styles.floatCardTop}`} variants={floatEntrance} custom={0} initial="hidden" animate="visible">
                <span>ARCHITECT TIER</span>
                <strong>{progression?.currentRank || "MONARCH"}</strong>
              </motion.div>
              <motion.div className={`${styles.floatCard} ${styles.floatCardRight}`} variants={floatEntrance} custom={1} initial="hidden" animate="visible">
                <span>ARCHITECT LVL</span>
                <strong>{progression?.currentLevel || 42}</strong>
              </motion.div>
              <motion.div className={`${styles.floatCard} ${styles.floatCardBottom}`} variants={floatEntrance} custom={2} initial="hidden" animate="visible">
                <span>TOTAL EXP</span>
                <strong>{progression?.totalExp?.toLocaleString()}</strong>
              </motion.div>
              
              <div
                className={`${styles.floatCard}`}
                onMouseEnter={() => setMonarchHovered(true)}
                onMouseLeave={() => setMonarchHovered(false)}
                style={{
                  bottom: "12%",
                  right: "-2%",
                  width: "14.5rem",
                  transform: monarchHovered 
                    ? "translate(calc((var(--hero-x, 50%) - 50%) * -0.22px), calc((var(--hero-y, 50%) - 50%) * -0.22px)) scale(1.08)"
                    : "translate(calc((var(--hero-x, 50%) - 50%) * -0.22px), calc((var(--hero-y, 50%) - 50%) * -0.22px)) scale(1)",
                  transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                  cursor: "pointer",
                  border: monarchHovered ? "1.5px solid rgba(14, 165, 233, 0.5)" : "1px solid rgba(14, 165, 233, 0.15)",
                  boxShadow: monarchHovered 
                    ? "0 30px 70px rgba(14, 165, 233, 0.16), 0 0 25px rgba(14, 165, 233, 0.35)" 
                    : "0 24px 60px rgba(14, 165, 233, 0.06)",
                  background: monarchHovered ? "rgba(255, 255, 255, 0.95)" : "rgba(255, 255, 255, 0.7)",
                  color: monarchHovered ? "#0ea5e9" : "inherit",
                  zIndex: 30,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "4px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: "12px" }}>
                  <div>
                    <span style={{ 
                      color: monarchHovered ? "#fbbf24" : "#71717a", 
                      transition: "color 300ms ease",
                      marginBottom: "4px" 
                    }}>
                      {monarchHovered ? "⚜️ ORIGIN SIGIL ACTIVE" : "TEAM ORIGIN"}
                    </span>
                    <strong style={{ 
                      fontSize: "1.25rem", 
                      fontWeight: "700", 
                      color: monarchHovered ? "#ffffff" : "#f4f4f5",
                      transition: "color 300ms ease"
                    }}>
                      Monarchs
                    </strong>
                  </div>
                  
                  {!monarchHovered && (
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#ffffff",
                      border: "1.5px solid rgba(251, 191, 36, 0.7)",
                      boxShadow: "0 4px 12px rgba(168, 85, 247, 0.16), 0 0 8px rgba(251, 191, 36, 0.22)",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0,
                      overflow: "hidden",
                      padding: "2px"
                    }}>
                      <Image
                        src="/Monarchs.png"
                        alt="Monarchs Logo"
                        width={30}
                        height={30}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )}
                </div>

                <div style={{
                  maxHeight: monarchHovered ? "280px" : "0px",
                  opacity: monarchHovered ? 1 : 0,
                  overflow: "hidden",
                  transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                  marginTop: monarchHovered ? "10px" : "0px",
                  fontSize: "0.74rem",
                  color: "#0369a1",
                  fontFamily: "monospace",
                  lineHeight: "1.4",
                  width: "100%"
                }}>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "8px" }}>
                    <div style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginBottom: "14px",
                      marginTop: "6px"
                    }}>
                      <div style={{
                        background: "#ffffff",
                        border: "1px solid rgba(251, 191, 36, 0.5)",
                        padding: "10px 20px",
                        borderRadius: "16px",
                        boxShadow: "0 10px 28px rgba(0, 0, 0, 0.35), 0 0 20px rgba(251, 191, 36, 0.25)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}>
                        <Image
                          src="/Monarchs.png"
                          alt="Monarchs Logo"
                          width={90}
                          height={90}
                          style={{
                            objectFit: "contain",
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))"
                          }}
                        />
                      </div>
                    </div>
                    
                    <div style={{ textAlign: "left", fontSize: "0.72rem", color: "#475569", lineHeight: "1.45" }}>
                      ⚔️ Harish&apos;s strategic design orbit and core developer crew. Architecting the future of high-performance decentralized systems.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Profile Overview (Origin Panel) */}
      <SectionReveal id="overview" className={styles.section} delay={0.04}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ CORE_01 ]</span>
          <h2>Profile Overview</h2>
          <p>Technical architecture, systems engineering, and rapid product implementation.</p>
        </div>
        <div className={styles.originLayout}>
          <div className={styles.originGhost}>ORIGIN</div>
          <article className={styles.originPanel}>
            <p>{profile?.subheadline}</p>
            <div className={styles.philosophyRow}>
              {[
                "Creator Code",
                "System Thinking",
                "Execution Speed",
                "Design Intent"
              ].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
          <article className={styles.originStats}>
            <div>
              <span>Location</span>
              <strong>{profile?.location}</strong>
            </div>
            <div>
              <span>Contact</span>
              <strong>{profile?.email}</strong>
            </div>
            <div>
              <span>Core Focus</span>
              <strong>AI, Full Stack, Mobile, IoT</strong>
            </div>
          </article>
        </div>
      </SectionReveal>

      {/* Services Grid Section */}
      <SectionReveal id="services" className={styles.section} delay={0.06}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ CORE_02 ]</span>
          <h2>Services Offered</h2>
          <p>Building scalable systems that combine mechanical precision with top-tier user experiences.</p>
        </div>
        {loadStage >= 1 ? (
          <div className={styles.servicesGrid}>
            {(v2Config?.services || serviceCards || []).map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];
              return (
                <motion.article key={service.title} className={styles.serviceCard} variants={cardReveal} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                  <div className={styles.serviceIconWrap}>
                    <Icon size={18} />
                  </div>
                  <span className={styles.serviceType}>Service Node</span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <div className={styles.serviceFoot}>
                    <span>Custom Scope</span>
                    <span>Build Ready</span>
                  </div>
                </motion.article>
              );
            })}
          </div>
        ) : (
          <div style={{ height: "140px", display: "grid", placeItems: "center", background: "rgba(255, 255, 255, 0.4)", borderRadius: "20px", border: "1px solid rgba(14, 165, 233, 0.12)" }}>
            <span className={styles.sectionBadge}>COMPILING CORE SERVICE SCHEMAS...</span>
          </div>
        )}
      </SectionReveal>

      {/* Frosted Capabilities Matrix Bento Grid */}
      <SectionReveal id="skills" className={styles.section} delay={0.08}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ CORE_03 ]</span>
          <h2>Capabilities Matrix</h2>
          <p>Explore full stack capabilities, programming languages, and system architectures in a responsive grid.</p>
        </div>
        {isDeferredLoaded ? (
          <div className={styles.capabilitiesBentoGrid}>
            {Object.entries(skillGroups).map(([category, catSkills], index, arr) => {
              const isLastAndOdd = arr.length % 2 !== 0 && index === arr.length - 1;
              return (
                <motion.div 
                  key={category} 
                  className={isLastAndOdd ? styles.bentoCardSpan2 : ""}
                  variants={cardReveal} 
                  custom={index} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <CapabilityCard category={category} skills={catSkills} />
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div style={{ height: "350px", display: "grid", placeItems: "center", background: "rgba(255, 255, 255, 0.4)", borderRadius: "20px", border: "1px solid rgba(14, 165, 233, 0.12)" }}>
            <span className={styles.sectionBadge}>LOADING CAPABILITIES MATRIX...</span>
          </div>
        )}
      </SectionReveal>

      {/* GitHub & LeetCode Coding Telemetry Section */}
      <SectionReveal id="telemetry" className={styles.section} delay={0.1}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ CORE_04 ]</span>
          <h2>Coding Telemetry</h2>
          <p>Real-time analytics and algorithmic data tracking synced directly from active developer profiles.</p>
        </div>
        
        {loadStage >= 1 ? (
          <div className={styles.telemetryGrid}>
            {/* GitHub Stats Card */}
            <TiltCard className={styles.telemetryCard} style={{
              background: "rgba(255, 255, 255, 0.8)",
              border: "1px solid rgba(14, 165, 233, 0.15)",
              borderRadius: "24px",
              padding: "28px 24px",
              boxShadow: "0 20px 40px rgba(14, 165, 233, 0.05)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              gap: "24px"
            }}>
              {/* Header: Github Stats | Brand Logo */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(14, 165, 233, 0.1)", paddingBottom: "12px" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>Github Status</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg height="20" viewBox="0 0 16 16" width="20" fill="#0284c7" style={{ flexShrink: 0 }}>
                    <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: "0.85rem", color: "#0284c7", letterSpacing: "0.05em" }}>GITHUB.EXE</span>
                </div>
              </div>

              {/* Sub-layout: 2x3 Grid of spacious Numbers */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
                width: "100%"
              }}>
                {[
                  { label: "Arsenal Spells (Repos)", value: githubStatus && !githubStatus.unavailable ? githubStatus.publicRepos || "18" : "18", color: "#0284c7" },
                  { label: "Grand Fleet (Followers)", value: githubStatus && !githubStatus.unavailable ? githubStatus.followers || "24" : "24", color: "#0284c7" },
                  { label: "Total Commits", value: githubStatus && !githubStatus.unavailable ? githubStatus.totalCommits || "218" : "218", color: "#0ea5e9" },
                  { label: "Total Contributions", value: githubStatus && !githubStatus.unavailable ? githubStatus.totalContributions || "196" : "196", color: "#0ea5e9" },
                  { label: "Active Pull Requests", value: githubStatus && !githubStatus.unavailable ? githubStatus.pullsCount || "23" : "23", color: "#34A853" },
                  { label: "Current Active Streak", value: githubStatus && !githubStatus.unavailable ? `${githubStatus.streak || "6"} Days` : "6 Days", color: "#fbbf24" }
                ].map((stat, idx) => (
                  <div key={idx} style={{
                    background: "rgba(255, 255, 255, 0.7)",
                    border: "1px solid rgba(14, 165, 233, 0.12)",
                    borderRadius: "16px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(14, 165, 233, 0.02)",
                    transition: "transform 250ms ease, border-color 250ms ease"
                  }}>
                    <span style={{ fontSize: "0.78rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "6px" }} title={stat.label}>{stat.label}</span>
                    <strong style={{ fontSize: "1.75rem", color: stat.color, fontWeight: "900", letterSpacing: "-0.02em" }}>{stat.value}</strong>
                  </div>
                ))}
              </div>

              {/* Bottom Row: Verified Seal */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(14, 165, 233, 0.1)", paddingTop: "14px", marginTop: "auto" }}>
                <span style={{ fontSize: "0.74rem", fontFamily: "monospace", color: "#64748b", fontWeight: "700" }}>
                  USER_SIGIL: {githubStatus?.username || "iamharishrohith"}
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.06)", border: "1px solid rgba(16, 185, 129, 0.15)", padding: "5px 12px", borderRadius: "100px", boxShadow: "0 2px 6px rgba(16, 185, 129, 0.02)" }}>
                  <GreenCheckIcon />
                  <span style={{ fontSize: "0.72rem", color: "#16a34a", fontWeight: 700, fontFamily: "monospace" }}>VERIFIED</span>
                </div>
              </div>
            </TiltCard>

            {/* LeetCode Stats Card */}
            <TiltCard className={styles.telemetryCard} style={{
              background: "rgba(255, 255, 255, 0.8)",
              border: "1px solid rgba(14, 165, 233, 0.15)",
              borderRadius: "24px",
              padding: "28px 24px",
              boxShadow: "0 20px 40px rgba(14, 165, 233, 0.05)",
              backdropFilter: "blur(20px)",
              display: "flex",
              flexDirection: "column",
              gap: "24px"
            }}>
              {/* Header: Leet Code | Brand Logo */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(14, 165, 233, 0.1)", paddingBottom: "12px" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "800", color: "#0f172a", margin: 0 }}>LeetCode Status</h3>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                    <path d="M13.483 0a1.374 1.374 0 0 0-.961.397L6.237 6.417a1.367 1.367 0 0 0 0 1.933l6.285 6.285c.255.255.6.398.961.398.362 0 .707-.143.962-.398l6.285-6.285a1.367 1.367 0 0 0 0-1.933L14.444.397A1.374 1.374 0 0 0 13.483 0zm-.961 17.065a1.367 1.367 0 0 0-1.933 0l-6.285 6.285a1.367 1.367 0 0 0 0 1.933c.255.255.6.398.961.398.362 0 .707-.143.962-.398l6.285-6.285a1.367 1.367 0 0 0 0-1.933l-6.285-6.285z" fill="#f97316"/>
                    <path d="M16.107 10.428H6.5c-.3 0-.5.2-.5.5s.2.5.5.5h9.607c.3 0 .5-.2.5-.5s-.2-.5-.5-.5z" fill="#f97316"/>
                  </svg>
                  <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: "0.85rem", color: "#f97316", letterSpacing: "0.05em" }}>LEETCODE.EXE</span>
                </div>
              </div>

              {/* Sub-layout: 2x3 Grid of spacious Numbers */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
                width: "100%"
              }}>
                {[
                  { label: "Problems Solved", value: leetcodeStatus && !leetcodeStatus.unavailable && leetcodeStatus.solved ? leetcodeStatus.solved.all || "154" : "154", color: "#16a34a" },
                  { label: "Global Ranking", value: leetcodeStatus && !leetcodeStatus.unavailable && leetcodeStatus.ranking ? `#${leetcodeStatus.ranking.toLocaleString()}` : "#845,620", color: "#0284c7" },
                  { label: "Contributed Items", value: leetcodeStatus && !leetcodeStatus.unavailable ? leetcodeStatus.contributed || "27" : "27", color: "#ea4335" },
                  { label: "Active Days", value: leetcodeStatus && !leetcodeStatus.unavailable ? `${leetcodeStatus.activeDays || "10"} Days` : "10 Days", color: "#fbbf24" },
                  { label: "Infantry (Easy)", value: leetcodeStatus && !leetcodeStatus.unavailable && leetcodeStatus.solved ? leetcodeStatus.solved.easy || "52" : "52", color: "#16a34a" },
                  { label: "Bosses (Medium)", value: leetcodeStatus && !leetcodeStatus.unavailable && leetcodeStatus.solved ? leetcodeStatus.solved.medium || "88" : "88", color: "#fbbf24" },
                  { label: "Lords (Hard)", value: leetcodeStatus && !leetcodeStatus.unavailable && leetcodeStatus.solved ? leetcodeStatus.solved.hard || "14" : "14", color: "#ea4335" },
                  { label: "Total Submissions", value: leetcodeStatus && !leetcodeStatus.unavailable ? leetcodeStatus.submissions || "27" : "27", color: "#0ea5e9" }
                ].map((stat, idx) => (
                  <div key={idx} style={{
                    background: "rgba(255, 255, 255, 0.7)",
                    border: "1px solid rgba(14, 165, 233, 0.12)",
                    borderRadius: "16px",
                    padding: "12px 16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(14, 165, 233, 0.02)",
                    transition: "transform 250ms ease, border-color 250ms ease"
                  }}>
                    <span style={{ fontSize: "0.78rem", color: "#475569", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "4px" }} title={stat.label}>{stat.label}</span>
                    <strong style={{ fontSize: "1.6rem", color: stat.color, fontWeight: "900", letterSpacing: "-0.02em" }}>{stat.value}</strong>
                  </div>
                ))}
              </div>

              {/* Bottom Row: Verified Seal */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(14, 165, 233, 0.1)", paddingTop: "14px", marginTop: "auto" }}>
                <span style={{ fontSize: "0.74rem", fontFamily: "monospace", color: "#64748b", fontWeight: "700" }}>
                  RANK_TIER: S-RANK
                </span>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(16, 185, 129, 0.06)", border: "1px solid rgba(16, 185, 129, 0.15)", padding: "5px 12px", borderRadius: "100px", boxShadow: "0 2px 6px rgba(16, 185, 129, 0.02)" }}>
                  <GreenCheckIcon />
                  <span style={{ fontSize: "0.72rem", color: "#16a34a", fontWeight: 700, fontFamily: "monospace" }}>VERIFIED</span>
                </div>
              </div>
            </TiltCard>
          </div>
        ) : (
          <div style={{ height: "200px", display: "grid", placeItems: "center", background: "rgba(255, 255, 255, 0.4)", borderRadius: "20px", border: "1px solid rgba(14, 165, 233, 0.12)" }}>
            <span className={styles.sectionBadge}>LINKING ALGORITHMIC TELEMETRY FLUX...</span>
          </div>
        )}
      </SectionReveal>

      {/* Systems / Quests Section (Featured Projects Grid) */}
      <SectionReveal id="projects" className={styles.section} delay={0.12}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ CORE_05 ]</span>
          <h2>Featured Systems & Integrations</h2>
          <p>Modular systems built for latency reduction, real-time analytics, and grid telemetry.</p>
        </div>

        {loadStage >= 1 ? (
          <>
            {mainFeaturedProject ? (
              <motion.article className={styles.featuredProjectCard} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <div className={styles.featuredProjectMedia}>
                  <SolutionOverview projectId={mainFeaturedProject.id} />
                  <div className={styles.featuredProjectSeal}>
                    <span>Enterprise System</span>
                    <strong>+{mainFeaturedProject.expValue} EXP</strong>
                  </div>
                </div>
                <div className={styles.featuredProjectCopy}>
                  <div className={styles.projectTypeRow}>
                    <span className={styles.tagType}>Enterprise Build</span>
                    <span className={styles.tagMyth}>{projectMyths?.[mainFeaturedProject.slug]?.label || "Core System"}</span>
                  </div>
                  <h3>{mainFeaturedProject.title}</h3>
                  <p>{mainFeaturedProject.summary}</p>
                  <strong className={styles.projectImpactLine}>{mainFeaturedProject.impact}</strong>
                  
                  <div className={styles.projectMetadataRow}>
                    <div className={styles.metaCol}>
                      <span>Impact Metrics</span>
                      <strong>{questStat(mainFeaturedProject)}</strong>
                    </div>
                    <div className={styles.metaCol}>
                      <span>Core Stack</span>
                      <strong>{splitStack(mainFeaturedProject.stack).slice(0, 2).join(" / ") || "Full Stack Build"}</strong>
                    </div>
                  </div>

                  <div className={styles.tagBadges}>
                    {splitStack(mainFeaturedProject.stack).map((item) => (
                      <span key={item} className={styles.techTag}>{item}</span>
                    ))}
                  </div>

                  <div className={styles.projectCtaRow}>
                    {mainFeaturedProject.liveUrl ? (
                      <a href={mainFeaturedProject.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.cardBtnPrimary}>
                        <span>Deploy Live</span>
                        <ExternalLink size={12} />
                      </a>
                    ) : null}
                    {mainFeaturedProject.repoUrl ? (
                      <a href={mainFeaturedProject.repoUrl} target="_blank" rel="noopener noreferrer" className={styles.cardBtn}>
                        <Github size={12} />
                        <span>Repository</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            ) : null}

            <div className={styles.projectSecondaryGrid}>
              {/* Elite Column: 2 columns */}
              <div className={styles.eliteProjectsColumn}>
                {listSecondaryProjects.map((project, idx) => (
                  <motion.article key={project.id} className={styles.secondaryProjectCard} variants={cardReveal} custom={idx} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                    <div className={styles.projectCardTop}>
                      <span className={styles.tagType}>Core Pipeline</span>
                      <span className={styles.xpTag}>+{project.expValue} EXP</span>
                    </div>
                    <div className={styles.secondaryProjectMedia}>
                      <SolutionOverview projectId={project.id} />
                    </div>
                    <div className={styles.secondaryProjectBody}>
                      <span className={styles.tagMyth}>{projectMyths?.[project.slug]?.label || "Verify Node"}</span>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                      <strong className={styles.projectImpactLine}>{project.impact}</strong>
                      <div className={styles.tagBadges}>
                        {splitStack(project.stack).map((item) => (
                          <span key={item} className={styles.techTag}>{item}</span>
                        ))}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Rapid Grid: Grid of tiles */}
              <div className={styles.rapidProjectsGrid}>
                {listGridProjects.map((project, idx) => (
                  <motion.article key={project.id} className={styles.projectTileCard} variants={cardReveal} custom={idx} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                    <div className={styles.projectTileHead}>
                      <span className={styles.tagType}>System utility</span>
                      <span className={styles.xpTag}>+{project.expValue} EXP</span>
                    </div>
                    <span className={styles.tileMythLabel}>{projectMyths?.[project.slug]?.label || "Ingest Node"}</span>
                    <h3>{project.title}</h3>
                    <p>{project.impact || project.summary}</p>
                    <div className={styles.tileStackTags}>
                      {splitStack(project.stack).slice(0, 3).map((item) => (
                        <span key={item} className={styles.techTagMini}>{item}</span>
                      ))}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div style={{ height: "250px", display: "grid", placeItems: "center", background: "rgba(255, 255, 255, 0.4)", borderRadius: "20px", border: "1px solid rgba(14, 165, 233, 0.12)" }}>
            <span className={styles.sectionBadge}>RESTORING ACTIVE SYSTEM BLUEPRINTS...</span>
          </div>
        )}
      </SectionReveal>

      {/* Career Chronicle Grid Section */}
      <section id="experience" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ CORE_06 ]</span>
          <h2>Career Chronicle Grid</h2>
          <p>Chronological verification of engineering roles, operations, and development milestones.</p>
        </div>

        {isDeferredLoaded ? (
          <div className={styles.experienceGrid}>
            {experiences.map((exp, index) => (
              <motion.div key={exp.id} className={styles.experienceCard} variants={cardReveal} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                <div className={styles.expHeader}>
                  <div>
                    <span className={styles.expDate}>
                      {new Date(exp.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "Present"}
                    </span>
                    <h3>{exp.role}</h3>
                  </div>
                  <span className={styles.expCompany}>{exp.company}</span>
                </div>
                <p className={styles.expSummary}>{exp.summary}</p>
                <div className={styles.expHighlight}>
                  <Zap size={11} className={styles.purpleText} />
                  <span>{exp.highlights}</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{ height: "250px", display: "grid", placeItems: "center", background: "rgba(255, 255, 255, 0.4)", borderRadius: "20px", border: "1px solid rgba(14, 165, 233, 0.12)" }}>
            <span className={styles.sectionBadge}>COMPILING ENGINEERING ROLES TIMELINE...</span>
          </div>
        )}
      </section>

      {/* Awards & Credentials plaque grid */}
      <section id="credentials" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ CORE_07 ]</span>
          <h2>Awards & Credentials</h2>
          <p>Verified certifications, accolades, and hackathon victories.</p>
        </div>

        {isDeferredLoaded ? (
          <div className={styles.credentialsGrid}>
            {/* Hackathons */}
            <div className={styles.credentialsBlock}>
              <div className={styles.blockHeader}>
                <Award size={14} className={styles.logoIcon} />
                <h4>HACKATHON_FINALS_VICTORIES</h4>
              </div>
              <div className={styles.awardsPlaquesGrid}>
                {achievements.map((ach, index) => (
                  <motion.div key={ach.id} className={styles.plaqueCard} variants={cardReveal} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                    <div className={styles.plaqueGlow} />
                    <TrendingUp size={16} className={styles.plaqueIcon} />
                    <h5>{ach.title}</h5>
                    <p>{ach.summary}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className={styles.credentialsBlock}>
              <div className={styles.blockHeader}>
                <ShieldCheck size={14} className={styles.logoIcon} />
                <h4>VERIFIED_COMPILER_SHIELDS</h4>
              </div>
              <div className={styles.certsPlaquesGrid}>
                {certifications.map((cert, index) => (
                  <motion.div key={cert.id} className={styles.plaqueCard} variants={cardReveal} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
                    <div className={styles.plaqueGlow} />
                    <Award size={16} className={styles.plaqueIconPurple} />
                    <h5>{cert.title}</h5>
                    <span className={styles.plaqueIssuer}>{cert.issuer}</span>
                    <span className={styles.plaqueDate}>
                      {new Date(cert.issueDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ height: "250px", display: "grid", placeItems: "center", background: "rgba(255, 255, 255, 0.4)", borderRadius: "20px", border: "1px solid rgba(14, 165, 233, 0.12)" }}>
            <span className={styles.sectionBadge}>RESTORING HACKATHON & CERTIFICATE VAULTS...</span>
          </div>
        )}
      </section>

      {/* Contact Portal CTA */}
      <section id="contact" className={styles.contactCta}>
        <div className={styles.contactCtaRing} />
        <span className={styles.sectionBadge}>COLLABORATION_GATEWAY</span>
        <h2 className={styles.contactCtaTitle}>Let&apos;s Build Something Great</h2>
        <p className={styles.contactCtaDesc}>
          Bring me in when the product needs more than clean code and more than pretty visuals.
          I build the system, the motion, and the experience people carry away from it.
        </p>
        <div className={styles.contactCtaActions}>
          <button type="button" className={styles.btnPrimary} onClick={() => setPortalOpen(true)}>
            <span>Open Contact Portal</span>
            <ArrowUpRight size={14} />
          </button>
          {profile?.githubUrl ? (
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
              <Github size={14} />
              <span>View GitHub Profile</span>
            </a>
          ) : null}
        </div>
      </section>

      {/* Contact Portal Modal */}
      {portalOpen ? (
        <div className={styles.portalOverlay} role="dialog" aria-modal="true">
          <div className={styles.portalBackdrop} onClick={() => setPortalOpen(false)} />
          <div className={styles.portalPanel}>
            <button type="button" className={styles.portalClose} onClick={() => setPortalOpen(false)}>
              <X size={16} />
            </button>
            <div className={styles.portalSigil} />
            <span className={styles.portalBadge}>CONTACT PORTAL</span>
            <h3 className={styles.portalTitle}>Send a Signal</h3>
            <p className={styles.portalDesc}>Select your preferred channel to collaborate.</p>
            <div className={styles.portalLinks}>
              <a href={`mailto:${profile?.email}`} className={styles.portalLink}>
                <Mail size={16} />
                <span>{profile?.email}</span>
              </a>
              {profile?.linkedinUrl ? (
                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className={styles.portalLink}>
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              ) : null}
              {profile?.githubUrl ? (
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.portalLink}>
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      {/* Footer */}
      <motion.footer className={styles.footer} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}>
        <div className={styles.footerCol}>
          <Activity size={12} className={styles.logoIcon} />
          <span>Systems Architect Interface v2.5.0</span>
        </div>
        <div className={styles.footerCol}>
          <span>Coimbatore, India</span>
          <span>© 2026 Harish Rohith. All Rights Reserved.</span>
        </div>
      </motion.footer>
    </div>
  );
}
