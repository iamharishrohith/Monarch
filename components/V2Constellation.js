"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Binary,
  Blocks,
  BookOpenText,
  BrainCircuit,
  Braces,
  Cloud,
  Code2,
  Component,
  Cpu,
  Database,
  Figma,
  Orbit,
  Palette,
  PenTool,
  Server,
  Shield,
  Smartphone,
  Sparkles,
  WandSparkles,
  Bot,
  TrendingUp,
  Activity
} from "lucide-react";
import styles from "@/app/v2/page.module.css";

const defaultRealmQuotes = [
  "Pressure is privilege. I'm the artist, and pressure is the paint on my canvas.",
  "As long as I'm alive, there are infinite chances ahead.",
  "Awakening begins when chaos becomes direction."
];

const floatingSkillLayout = [
  { top: "15%", left: "18%" },
  { top: "24%", left: "31%" },
  { top: "13%", left: "50%" },
  { top: "18%", left: "67%" },
  { top: "25%", left: "79%" },
  { top: "36%", left: "84%" },
  { top: "49%", left: "81%" },
  { top: "61%", left: "77%" },
  { top: "74%", left: "70%" },
  { top: "84%", left: "57%" },
  { top: "86%", left: "41%" },
  { top: "80%", left: "27%" },
  { top: "69%", left: "18%" },
  { top: "56%", left: "13%" },
  { top: "39%", left: "16%" },
  { top: "30%", left: "56%" },
  { top: "45%", left: "69%" },
  { top: "67%", left: "63%" },
  { top: "29%", left: "88%" },
  { top: "78%", left: "16%" },
  { top: "85%", left: "78%" },
  { top: "14%", left: "73%" },
  { top: "32%", left: "24%" },
  { top: "57%", left: "88%" },
  { top: "47%", left: "25%" },
  { top: "70%", left: "86%" },
  { top: "20%", left: "82%" },
  { top: "82%", left: "33%" },
  { top: "52%", left: "88%" },
  { top: "76%", left: "86%" }
];

// Custom Brand SVG Icons for Skills
function JavaScriptIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#f7df1e" d="M0 0h24v24H0z"/>
      <path fill="#000" d="M18.66 12.02c-.8-.44-1.8-.73-2.65-.73-1.4 0-2.3.62-2.3 1.7 0 1.25.96 1.62 2.65 2.19 2.22.75 3.3 1.66 3.3 3.65 0 2.2-1.78 3.5-4.4 3.5-2.07 0-3.7-.85-4.48-2.35l1.83-1.07c.56.98 1.48 1.48 2.62 1.48 1.34 0 2.25-.56 2.25-1.57 0-1.25-.9-1.63-2.62-2.22-2.2-.77-3.33-1.63-3.33-3.66 0-2.05 1.72-3.4 4.07-3.4 1.74 0 3.2.66 3.98 1.93l-1.92 1.07zm-7.66 4.31v4c0 1.28-.62 1.95-1.77 1.95-.9 0-1.5-.47-1.75-1.32l-1.9 1.15c.66 1.5 2.05 2.2 3.8 2.2 2.64 0 3.94-1.4 3.94-3.9v-8.4h-2.32v4.32z"/>
    </svg>
  );
}

function TypeScriptIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#3178c6" d="M0 0h24v24H0z"/>
      <path fill="#fff" d="M12.92 20.35v-8.42h-3.4v8.42zm7.1 0c.93 0 1.7-.35 2.1-.98l-1.23-1c-.24.33-.55.5-.86.5-.44 0-.74-.23-.74-.93v-4.9h2.36v-1.12H19.4v-2.2l-1.25.33v1.87h-1.66v1.12h1.66v5.2c0 1.3.83 2.1 2.87 2.1z"/>
    </svg>
  );
}

function ReactIcon({ size, className }) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
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
    <svg viewBox="0 0 180 180" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0, filter: "drop-shadow(0 0 1px rgba(255,255,255,0.8))" }}>
      <circle cx="90" cy="90" r="90" fill="#000"/>
      <path fill="url(#nextjs-grad-creative)" d="M149.508 157.52L69.142 54H54v72h14.4V72.234l72.2 92.427c3.213-2.14 6.184-4.52 8.908-7.14z"/>
      <rect x="115" y="54" width="14" height="72" fill="#fff"/>
      <defs>
        <linearGradient id="nextjs-grad-creative" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#fff"/>
          <stop offset="1" stopColor="#fff" stopOpacity="0"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function TailwindIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#38bdf8" d="M12 6.018C15.6 2.418 20.4 4.818 24 8.418c-3.6 3.6-8.4 1.2-12-2.4-3.6-3.6-8.4-1.2-12 2.4 3.6-3.6 8.4-1.2 12-2.4zm0 6c3.6-3.6 8.4-1.2 12 2.4-3.6 3.6-8.4 1.2-12-2.4-3.6-3.6-8.4-1.2-12 2.4 3.6-3.6 8.4-1.2 12-2.4z"/>
    </svg>
  );
}

function NodejsIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#339933" d="M12 1.344L2.247 6.974v11.26L12 23.86l9.753-5.626v-11.26L12 1.344zm7.986 6.302l-2.02 1.16v1.986L12 14.288 6.034 10.79V8.805l-2.02-1.16v10.18l7.986 4.607 7.986-4.607V7.646zm-2.02 5.093l-2.02 1.16v1.985l-3.946 2.274-3.947-2.274v-1.985l-2.02-1.16v4.617l5.967 3.441 5.967-3.441v-4.617z"/>
    </svg>
  );
}

function BunIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#fbf0d9" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5V14h3v2.5zm0-4.5h-3v-1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V12z" stroke="#cca43b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9.5" cy="11.5" r="1.2" fill="#cca43b" />
      <circle cx="14.5" cy="11.5" r="1.2" fill="#cca43b" />
      <path d="M11 13.5h2" stroke="#cca43b" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function ElysiaIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="url(#elysia-grad-creative)" d="M12 2L2 22h20L12 2zm0 4l6.5 13H5.5L12 6z"/>
      <defs>
        <linearGradient id="elysia-grad-creative" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#00f2fe"/>
          <stop offset="1" stopColor="#4facfe"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function RedisIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#dc382c" d="M12 .587l11.455 5.867v11.092L12 23.413.545 17.546V6.454L12 .587zm0 4.195L4.417 8.654l7.583 3.882 7.583-3.882-7.583-3.872zm-7.583 6.94l6.453 3.305v4.205L4.417 15.93v-4.208zm8.713 7.51v-4.205l6.453-3.305v4.208l-6.453 3.302z"/>
    </svg>
  );
}

function PostgresIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#336791" d="M21.907 10.963c-.305-1.921-1.391-3.666-2.91-4.912l-1.37 1.37c1.077.892 1.83 2.115 2.052 3.542h2.228zm-3.522-6.52c-1.667-.938-3.53-1.443-5.385-1.443s-3.718.505-5.385 1.443l1.109 1.917c1.32-.73 2.802-1.12 4.276-1.12s2.956.39 4.276 1.12l1.109-1.917zm-14.83 4.208c-.732 1.321-1.12 2.802-1.12 4.276 0 1.474.388 2.955 1.12 4.276l1.918-1.109c-.502-.911-.778-1.94-.778-3.167s.276-2.256.778-3.167L3.555 8.651zm8.445 12.349c1.474 0 2.956-.388 4.276-1.12l-1.109-1.918c-.911.502-1.94.778-3.167.778s-2.256-.276-3.167-.778l-1.109 1.918c1.32.732 2.802 1.12 4.276 1.12zm10.207-6.037h-2.228c-.222 1.427-.975 2.65-2.052 3.542l1.37 1.37c1.519-1.246 2.605-2.991 2.91-4.912z"/>
    </svg>
  );
}

function MongodbIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#13aa52" d="M12 1.5C9 3.5 7.5 6 7.5 9c0 4 3 6.5 4.5 13.5 1.5-7 4.5-9.5 4.5-13.5 0-3-1.5-5.5-4.5-7.5zm.3 6.5c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/>
    </svg>
  );
}

function FirebaseIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#FFCA28" d="M3.89 15.67L2 5.09a.46.46 0 0 1 .8-.4l3.19 3.19z"/>
      <path fill="#FFA000" d="M13.6 3.15a.5.5 0 0 0-.7 0L2 14.77l5.08-5.08z"/>
      <path fill="#F57C00" d="M12 21.64l9.11-9.11a.5.5 0 0 0-.7-.7L2 21.64z"/>
    </svg>
  );
}

function SupabaseIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#3ecf8e" d="M12 2L2 14h9v8l10-12h-9z"/>
    </svg>
  );
}

function DockerIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#2496ed" d="M13.983 11.078h2.119c.102 0 .186-.083.186-.185V8.902c0-.102-.084-.186-.186-.186h-2.119c-.103 0-.186.084-.186.186v1.99c0 .103.083.186.186.186zm-2.913 0h2.119c.102 0 .185-.083.185-.185V8.902c0-.102-.083-.186-.185-.186h-2.119c-.103 0-.186.084-.186.186v1.99c0 .103.083.186.186.186zM8.157 8.166h2.119c.102 0 .185-.083.185-.185V5.99c0-.102-.083-.186-.185-.186h-2.119c-.103 0-.186.084-.186.186v1.99c0 .103.083.186.186.186zM.05 13.068c.03.35.132.966.529 1.48 1.139 1.477 3.593 1.42 4.47 1.402.13-.002.261-.006.393-.01.378-.012.753-.024 1.127-.024 2.012.052 4.092.748 5.378 1.942.277.257.568.643.568 1.101a3.523 3.523 0 0 0 1.258-2.613l.006-.118c.01-.174.028-.344.053-.51.096-.641.344-1.222.757-1.745.92-1.163 2.27-1.8 3.99-1.895l.385-.021c.143-.008.236-.123.236-.266v-.41c0-.13-.08-.244-.206-.279-1.285-.36-2.58-.69-3.896-.69h-.33a.473.473 0 0 0-.472.483l-.004.148c-.021.67-.091 1.341-.212 2.003-.064.354-.265.656-.566.852-.352.228-.783.279-1.18.138a3.782 3.782 0 0 1-1.921-1.507c-.438-.59-.641-1.218-.582-1.821v-.15c0-.127-.09-.234-.216-.255l-.364-.061c-1.743-.292-3.48-.46-5.234-.46-2.632 0-5.22.378-7.766 1.127a.264.264 0 0 0-.19.255v.714z"/>
    </svg>
  );
}

function GitIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#f05032" d="M23.384 11.41L12.59.616a1.686 1.686 0 0 0-2.384 0L8.243 2.58l3.19 3.19a2.823 2.823 0 0 1 3.985 0 2.825 2.825 0 0 1 0 3.985 2.827 2.827 0 0 1-3.985 0 2.823 2.823 0 0 1 0-3.985l-3.19-3.19L.616 10.206a1.686 1.686 0 0 0 0 2.384l10.79 10.79a1.686 1.686 0 0 0 2.384 0l10.79-10.79a1.688 1.688 0 0 0 0-2.384z"/>
    </svg>
  );
}

function FigmaIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
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
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <rect x="3" y="3" width="18" height="18" rx="2" fill="#d97706" />
      <rect x="7" y="7" width="10" height="10" fill="#000" />
      <text x="12" y="13" fill="#fff" fontSize="5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">ESP32</text>
      <path d="M5 3v-2M9 3v-2M13 3v-2M17 3v-2M5 21v2M9 21v2M13 21v2M17 21v2M3 5H1M3 9H1M3 13H1M3 17H1M21 5h2M21 9h2M21 13h2M21 17h2" stroke="#fff" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  );
}

function CoffeeIcon({ size, className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size || 15} height={size || 15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
      <line x1="6" x2="6" y1="2" y2="4" />
      <line x1="10" x2="10" y1="2" y2="4" />
      <line x1="14" x2="14" y1="2" y2="4" />
    </svg>
  );
}

function SolidityIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#363636" d="M12 1.5L4.5 9 12 16.5 19.5 9 12 1.5zm0 15L4.5 16.5l7.5 7.5 7.5-7.5-7.5 0z" />
      <path fill="#8c8c8c" d="M12 1.5L12 16.5l7.5-7.5L12 1.5zm0 15L12 24l7.5-7.5-7.5 0z" />
    </svg>
  );
}

function PythonIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#3776ab" d="M11.898.05c-2.42 0-4.63.16-5.59.45-3.32 1.01-3.23 3.16-3.23 5.34v2.02h8.92v1.27H3.078c-2.18 0-4.33-.09-5.34 3.23C-3.27 15.68-3.27 17.89-3.27 20.31s.16 4.63.45 5.59c1.01 3.32 3.16 3.23 5.34 3.23h2.02v-8.92h-1.27v8.92c2.18 0 4.33.09 5.34-3.23.99-3.23.99-5.44.99-7.86s-.16-4.63-.45-5.59c-1.01-3.32-3.16-3.23-5.34-3.23H2.078v1.27H11c2.18 0 4.33-.09 5.34 3.23z"/>
    </svg>
  );
}

function FramerIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#000000" stroke="#fff" strokeWidth="0.5" d="M5 2h14v6l-7 7H5V2zm0 14h7l7-7v13H5v-6z"/>
    </svg>
  );
}

function ArduinoIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#00979d" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 13.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm4 0c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"/>
      <path fill="#fff" d="M9 11.5h2v1H9zM13 12h2v-2h-1v2z"/>
    </svg>
  );
}

function N8nIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#FF6D5A" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-3 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
      <path fill="none" stroke="#FF6D5A" strokeWidth="2" d="M9 12h6"/>
    </svg>
  );
}

function OpenRouterIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
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
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#1c3d2f" />
      <path fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" d="M8 12h8M6 8a4 4 0 0 1 4 4 4 4 0 0 1-4 4M18 8a4 4 0 0 0-4 4 4 4 0 0 0 4 4" />
    </svg>
  );
}

function FlowiseIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#2b6cb0" />
      <path d="M7 17v-6h4v2h2v-2h4v6" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="7" cy="11" r="2" fill="#fff" />
      <circle cx="17" cy="11" r="2" fill="#fff" />
    </svg>
  );
}

function LovableIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <path fill="#ff4b91" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

function V0DevIcon({ size, className }) {
  return (
    <svg viewBox="0 0 24 24" width={size || 15} height={size || 15} className={className} style={{ flexShrink: 0 }}>
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#000000" />
      <path fill="#ffffff" d="M12 17.5L5.5 6h13L12 17.5zm0-3l3.5-6.5h-7l3.5 6.5z"/>
    </svg>
  );
}

function getSkillGlyph(skill) {
  const skillKey = skill.name.toLowerCase();
  
  const exactIconMap = {
    // Custom SVGs
    "javascript (es6+)": JavaScriptIcon,
    "typescript": TypeScriptIcon,
    "react.js": ReactIcon,
    "react native": ReactIcon,
    "next.js 15": NextjsIcon,
    "tailwind css": TailwindIcon,
    "node.js": NodejsIcon,
    "bun.js": BunIcon,
    "elysiajs": ElysiaIcon,
    "redis": RedisIcon,
    "redis (caching & pub/sub)": RedisIcon,
    "postgresql": PostgresIcon,
    "mongodb": MongodbIcon,
    "firebase": FirebaseIcon,
    "supabase": SupabaseIcon,
    "supabase (auth/database/edge functions)": SupabaseIcon,
    "docker": DockerIcon,
    "git/github": GitIcon,
    "git & github": GitIcon,
    "figma": FigmaIcon,
    "esp32": Esp32Icon,
    "arduino": ArduinoIcon,
    "java": CoffeeIcon,
    "solidity": SolidityIcon,
    "python": PythonIcon,
    "framer": FramerIcon,
    "lovable": LovableIcon,
    "v0.dev": V0DevIcon,
    "n8n": N8nIcon,
    "openrouter": OpenRouterIcon,
    "langchain": LangChainIcon,
    "flowise": FlowiseIcon,
    
    // Lucide Fallbacks
    "supervised learning": TrendingUp,
    "regression & classification": Activity,
    "neural networks": BrainCircuit,
    "data preprocessing": Blocks,
    "ai agents": Bot,
    "flowise": FlowiseIcon,
    "n8n": N8nIcon,
    "openrouter": OpenRouterIcon,
    "langchain": LangChainIcon,
    "ai studio": Sparkles,
    "stitch": Sparkles,
    "jules": Bot,
    "pomeilli": PenTool,
    "claude code": Braces,
    "codex": Code2,
    
    "capacitor.js": Smartphone,
    "antigravity": Sparkles,
    "dom": Component,
    "dsa": Binary,
    "express.js": Code2,
    "mysql": Database,
    "oops": Blocks,
    "embedded c": Braces,
    "raspberry pi": Cpu,
    "lora": Orbit,
    "sensors": Component,
    "system design": Cpu,
    "rest apis": Braces
  };

  return exactIconMap[skillKey] || exactIconMap[skill.name] || Code2;
}

function getDomainIcon(title) {
  const icons = {
    "Frontend & Mobile": WandSparkles,
    "Backend & Performance": Cpu,
    "P-Languages": Braces,
    "IoT & Infrastructure": Orbit,
    "Vibe Coding [GDG Dev]": Sparkles,
    "Vibe Coding": Sparkles,
    "ML": TrendingUp,
    "Agent Orchestration": Bot,
    Fundamentals: BookOpenText
  };

  return icons[title] || Shield;
}

export function V2Constellation({ profileName, floatingSkills, domains, quotes = [], layout = [] }) {
  const [activeDomain, setActiveDomain] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cores = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 8;
      if (prefersReduced || cores < 4 || memory < 4) {
        setIsLowEnd(true);
      }
    }
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);
  const [marqueePaused, setMarqueePaused] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [typedQuote, setTypedQuote] = useState("");
  const shellRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const marqueeGroupRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 800, height: 700 });

  const activeItems = activeDomain
    ? domains.find((domain) => domain.title === activeDomain)?.items || []
    : [];
  const quotePool = quotes.length ? quotes : defaultRealmQuotes;
  const visibleSkills = useMemo(
    () => (activeDomain ? floatingSkills.filter((skill) => activeItems.includes(skill.name)) : []),
    [activeDomain, activeItems, floatingSkills]
  );
  const activeLayout = layout.length ? layout : floatingSkillLayout;

  useEffect(() => {
    if (!shellRef.current) return;
    const updateDims = () => {
      setDimensions({
        width: shellRef.current.offsetWidth,
        height: shellRef.current.offsetHeight
      });
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    
    // Run after component mount to ensure accurate sizes
    const timer = setTimeout(updateDims, 150);
    
    return () => {
      window.removeEventListener("resize", updateDims);
      clearTimeout(timer);
    };
  }, []);

  const handlePointerMove = (e) => {
    const rect = shellRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handlePointerLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  useEffect(() => {
    const track = marqueeTrackRef.current;
    const group = marqueeGroupRef.current;

    if (!track || !group) {
      return undefined;
    }

    let animationFrameId = 0;
    let lastTime = performance.now();
    let offset = 0;
    let groupWidth = group.offsetWidth + 12;

    const resizeObserver = new ResizeObserver(() => {
      groupWidth = group.offsetWidth + 12;
      if (groupWidth > 0) {
        offset %= groupWidth;
      }
    });

    resizeObserver.observe(group);

    const tick = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      if (isLowEnd || isTransitioning) {
        animationFrameId = window.requestAnimationFrame(tick);
        return;
      }

      if (window.innerWidth > 1100) {
        if (!marqueePaused && groupWidth > 0) {
          offset = (offset + delta * 0.05) % groupWidth;
          track.style.transform = `translate3d(${-offset}px, 0, 0)`;
        }
      } else {
        track.style.transform = "";
      }

      animationFrameId = window.requestAnimationFrame(tick);
    };

    animationFrameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [marqueePaused]);

  useEffect(() => {
    if (activeDomain) {
      setTypedQuote("");
      return undefined;
    }

    const quote = quotePool[quoteIndex % quotePool.length];
    let charIndex = 0;
    let typingTimer = 0;
    let rotateTimer = 0;

    setTypedQuote("");

    const typeNext = () => {
      charIndex += 1;
      setTypedQuote(quote.slice(0, charIndex));

      if (charIndex < quote.length) {
        typingTimer = window.setTimeout(typeNext, 38);
      } else {
        rotateTimer = window.setTimeout(() => {
          setQuoteIndex((current) => (current + 1) % quotePool.length);
        }, 2600);
      }
    };

    typingTimer = window.setTimeout(typeNext, 220);

    return () => {
      window.clearTimeout(typingTimer);
      window.clearTimeout(rotateTimer);
    };
  }, [activeDomain, quoteIndex, quotePool]);

  return (
    <>
      <div className={styles.constellationLayout}>
        <div 
          className={styles.constellationShell}
          ref={shellRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className={styles.constellationBackdropLabel}>AWAKENED</div>
          <div className={styles.constellationCore}>
            <span>CORE</span>
            <strong>{profileName}</strong>
            <p>Technical Architect // Solutions Developer</p>
          </div>

          {!activeDomain ? (
            <div className={styles.constellationQuote}>
              <span className={styles.constellationQuoteLabel}>Realm Signal</span>
              <p className={styles.constellationQuoteText}>{typedQuote}<span className={styles.constellationCaret} /></p>
            </div>
          ) : null}

          <div className={styles.mobileSkillsGrid}>
            {visibleSkills.map((skill, index) => {
              const Glyph = getSkillGlyph(skill);
              const layoutStyle = activeLayout[index] || activeLayout[activeLayout.length - 1];
              
              let customTransform = "translate(-50%, -50%)";
              if (!isLowEnd && !isTransitioning && mousePos.x !== 0 && mousePos.y !== 0) {
                const leftPct = parseFloat(layoutStyle.left);
                const topPct = parseFloat(layoutStyle.top);
                const nodeX = (leftPct / 100) * dimensions.width;
                const nodeY = (topPct / 100) * dimensions.height;
                
                const dx = nodeX - mousePos.x;
                const dy = nodeY - mousePos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxRadius = 180;
                
                if (distance < maxRadius) {
                  const force = (maxRadius - distance) / maxRadius; // 0 to 1 strength
                  const maxPush = 45; // max displacement in px
                  const pushX = (dx / distance) * force * maxPush;
                  const pushY = (dy / distance) * force * maxPush;
                  customTransform = `translate(calc(-50% + ${pushX}px), calc(-50% + ${pushY}px))`;
                }
              }

              const combinedStyle = {
                ...layoutStyle,
                transform: customTransform
              };

              return (
                <article
                  key={skill.id}
                  className={`${styles.floatingSkill} ${styles.floatingSkillActive}`}
                  style={combinedStyle}
                >
                  <div className={styles.floatingSkillIconWrap}>
                    <Glyph size={22} className={styles.floatingSkillGlyph} />
                  </div>
                  <div className={styles.floatingSkillCopy}>
                    <strong>{skill.name}</strong>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={styles.domainMarquee}
        onMouseEnter={() => setMarqueePaused(true)}
        onMouseLeave={() => setMarqueePaused(false)}
        onFocus={() => setMarqueePaused(true)}
        onBlur={() => setMarqueePaused(false)}
      >
        <div className={styles.domainMarqueeTrack} ref={marqueeTrackRef}>
          {[0, 1].map((groupIndex) => (
            <div
              className={styles.domainGrid}
              key={groupIndex}
              aria-hidden={groupIndex === 1}
              ref={groupIndex === 0 ? marqueeGroupRef : null}
            >
              {domains.map((domain) => {
                const Icon = getDomainIcon(domain.title);
                const active = domain.title === activeDomain;

                return (
                  <button
                    key={`${groupIndex}-${domain.title}`}
                    type="button"
                    className={active ? styles.domainPillActive : styles.domainPill}
                    onMouseEnter={() => setActiveDomain(domain.title)}
                    onMouseLeave={() => setActiveDomain(null)}
                    onFocus={() => setActiveDomain(domain.title)}
                    onBlur={() => setActiveDomain(null)}
                  >
                    <span className={styles.domainGlyph}><Icon size={18} /></span>
                    <div className={styles.domainPillHead}>
                      <h3>{domain.title}</h3>
                      <p>{domain.items.length} skills</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
