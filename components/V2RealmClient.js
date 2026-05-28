"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  BookOpenText,
  ScrollText,
  Award,
  Trophy,
  Bot,
  Cpu,
  RadioTower,
  Search,
  PenTool,
  Smartphone,
  TrendingUp,
  Blocks,
  X,
  Info,
  Github,
  Zap
} from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { V2Constellation } from "@/components/V2Constellation";
import { V2HeroSection } from "@/components/V2HeroSection";
import { V2SummonPortal } from "@/components/V2SummonPortal";
import { V2BackgroundEffects } from "@/components/V2BackgroundEffects";
import { V2RealmChrome } from "@/components/V2RealmChrome";
import { V2DeveloperClient } from "@/components/V2DeveloperClient";
import { V2GatewayPortal } from "@/components/V2GatewayPortal";
import styles from "@/app/v2/page.module.css";

const serviceIcons = [Bot, Cpu, RadioTower, Search, PenTool, Smartphone, TrendingUp, Blocks];

function splitStack(stack) {
  return String(stack || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);
}

function questStat(project) {
  if (project?.impact) return project.impact;
  if (project?.summary) return project.summary;
  return "Built for real-world execution.";
}

function formatMonth(date) {
  try {
    return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(date));
  } catch {
    return "Present";
  }
}

function buildQuestType(index) {
  if (index === 0) return "Enterprise System";
  if (index < 3) return "Core Integration";
  return "Utility Build";
}

function SolutionOverview({ projectId, isFeatured = false }) {
  let gradient = "linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)";
  let content = null;
  let initials = "PR";
  let label = "PROJECT SYSTEM";

  if (projectId === "skipq") {
    gradient = "linear-gradient(135deg, #3730a3 0%, #0f766e 100%)";
    initials = "SQ";
    label = "QUEUE PORTAL";
    content = (
      <>
        <defs>
          <linearGradient id="skipqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="skipqGlow" cx="80%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="240" cy="90" r="110" fill="url(#skipqGlow)" />
        <path d="M 0,20 L 320,20 M 0,60 L 320,60 M 0,100 L 320,100 M 0,140 L 320,140" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <path d="M 40,0 L 40,180 M 120,0 L 120,180 M 200,0 L 200,180 M 280,0 L 280,180" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        
        <path d="M -20,120 C 60,120 80,60 160,60 C 240,60 260,120 340,120" stroke="rgba(255,255,255,0.15)" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M -20,120 C 60,120 80,60 160,60 C 240,60 260,120 340,120" stroke="url(#skipqGrad)" strokeWidth="4" strokeLinecap="round" fill="none" />
        
        <circle cx="50" cy="120" r="10" fill="#312e81" stroke="white" strokeWidth="2" />
        <text x="50" y="123" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">01</text>
        
        <circle cx="110" cy="90" r="10" fill="#312e81" stroke="white" strokeWidth="2" />
        <text x="110" y="93" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">02</text>
        
        <circle cx="170" cy="65" r="10" fill="#312e81" stroke="white" strokeWidth="2" />
        <text x="170" y="68" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">03</text>
        
        <circle cx="230" cy="85" r="10" fill="#312e81" stroke="white" strokeWidth="2" />
        <text x="230" y="88" fill="white" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">04</text>
        
        <ellipse cx="270" cy="90" rx="14" ry="34" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="2" strokeDasharray="3,3" />
        <ellipse cx="270" cy="90" rx="8" ry="24" fill="white" opacity="0.85" />
        <path d="M 270,66 L 290,90 L 270,114" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </>
    );
  } else if (projectId === "r-choice") {
    gradient = "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)";
    initials = "RC";
    label = "PLACEMENT PIPELINE";
    content = (
      <>
        <defs>
          <linearGradient id="rchoiceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path d="M 0,20 L 320,20 M 0,60 L 320,60 M 0,100 L 320,100 M 0,140 L 320,140" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <path d="M 40,0 L 40,180 M 120,0 L 120,180 M 200,0 L 200,180 M 280,0 L 280,180" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        <path d="M 80,130 Q 140,40 200,75" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4,4" fill="none" />
        <path d="M 140,100 Q 200,20 260,50" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="4,4" fill="none" />

        <g transform="translate(50, 110)">
          <polygon points="30,0 60,15 30,30 0,15" fill="url(#rchoiceGrad)" stroke="white" strokeWidth="1.5" />
          <polygon points="30,30 30,40 0,25 0,15" fill="#4c1d95" opacity="0.8" />
          <polygon points="60,15 60,25 30,40 30,30" fill="#2e1065" opacity="0.8" />
          <text x="30" y="16" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold" fontFamily="monospace">APPLY</text>
        </g>

        <g transform="translate(110, 80)">
          <polygon points="30,0 60,15 30,30 0,15" fill="url(#rchoiceGrad)" stroke="white" strokeWidth="1.5" />
          <polygon points="30,30 30,40 0,25 0,15" fill="#4c1d95" opacity="0.8" />
          <polygon points="60,15 60,25 30,40 30,30" fill="#2e1065" opacity="0.8" />
          <text x="30" y="16" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold" fontFamily="monospace">VERIFY</text>
        </g>

        <g transform="translate(170, 55)">
          <polygon points="30,0 60,15 30,30 0,15" fill="url(#rchoiceGrad)" stroke="white" strokeWidth="1.5" />
          <polygon points="30,30 30,40 0,25 0,15" fill="#4c1d95" opacity="0.8" />
          <polygon points="60,15 60,25 30,40 30,30" fill="#2e1065" opacity="0.8" />
          <text x="30" y="16" fill="white" fontSize="8" textAnchor="middle" fontWeight="bold" fontFamily="monospace">MATCH</text>
        </g>

        <g transform="translate(240, 20)">
          <circle cx="25" cy="25" r="18" fill="rgba(251,191,36,0.15)" stroke="#fbbf24" strokeWidth="2" />
          <polygon points="25,12 28,20 36,20 30,25 32,33 25,28 18,33 20,25 14,20 22,20" fill="#fbbf24" />
          <circle cx="25" cy="25" r="22" stroke="white" strokeWidth="1" strokeDasharray="3,3" opacity="0.5" />
        </g>
      </>
    );
  } else if (projectId === "devs-recipe") {
    gradient = "linear-gradient(135deg, #1e293b 0%, #475569 100%)";
    initials = "DR";
    label = "COOKBOOK AUTO";
    content = (
      <>
        <defs>
          <linearGradient id="recipeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path d="M 0,20 L 320,20 M 0,60 L 320,60 M 0,100 L 320,100 M 0,140 L 320,140" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <path d="M 40,0 L 40,180 M 120,0 L 120,180 M 200,0 L 200,180 M 280,0 L 280,180" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        <circle cx="160" cy="90" r="32" fill="url(#recipeGrad)" stroke="white" strokeWidth="2.5" />
        <circle cx="160" cy="90" r="42" stroke="rgba(255,255,255,0.22)" strokeWidth="1" strokeDasharray="4,4" />
        <text x="160" y="97" fill="white" fontSize="24" textAnchor="middle" fontWeight="bold" fontFamily="monospace">{"{}"}</text>
        
        <g transform="translate(60, 40)">
          <rect x="0" y="0" width="34" height="24" rx="4" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="1.5" />
          <path d="M 6,10 L 10,14 L 6,18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="13" y1="18" x2="22" y2="18" stroke="white" strokeWidth="1.5" />
        </g>

        <g transform="translate(220, 110)">
          <circle cx="18" cy="18" r="10" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2" />
          <circle cx="18" cy="18" r="4" fill="white" />
          <path d="M 18,4 V 8 M 18,28 V 32 M 4,18 H 8 M 28,18 H 32" stroke="white" strokeWidth="2" />
        </g>

        <g transform="translate(230, 30)">
          <polygon points="15,0 30,8 15,16 0,8" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1" />
          <polygon points="15,16 15,26 0,18 0,8" fill="rgba(255,255,255,0.1)" stroke="white" strokeWidth="1" />
          <polygon points="30,8 30,18 15,26 15,16" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1" />
        </g>

        <circle cx="70" cy="130" r="3" fill="white" opacity="0.6" />
        <circle cx="100" cy="120" r="1.5" fill="white" />
        <circle cx="210" cy="40" r="2.5" fill="white" />
      </>
    );
  } else if (projectId === "gridsense") {
    gradient = "linear-gradient(135deg, #0f172a 0%, #0284c7 100%)";
    initials = "GS";
    label = "GRID SENSING CONSTELLATION";
    content = (
      <>
        <defs>
          <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path d="M 0,20 L 320,20 M 0,60 L 320,60 M 0,100 L 320,100 M 0,140 L 320,140" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <path d="M 40,0 L 40,180 M 120,0 L 120,180 M 200,0 L 200,180 M 280,0 L 280,180" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        <circle cx="160" cy="90" r="30" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeDasharray="3,3" />
        <circle cx="160" cy="90" r="55" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="4,4" />
        <circle cx="160" cy="90" r="80" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        <g transform="translate(142, 72)">
          <polygon points="18,0 36,36 0,36" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2" />
          <line x1="18" y1="12" x2="18" y2="36" stroke="white" strokeWidth="1.5" />
          <circle cx="18" cy="0" r="4" fill="white" />
        </g>

        <g transform="translate(50, 95)">
          <polygon points="10,0 20,20 0,20" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="1.5" />
          <circle cx="10" cy="0" r="2.5" fill="white" />
        </g>

        <g transform="translate(250, 95)">
          <polygon points="10,0 20,20 0,20" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="1.5" />
          <circle cx="10" cy="0" r="2.5" fill="white" />
        </g>

        <path d="M 20,90 Q 50,50 80,90 T 140,90 T 200,90 T 260,90 T 300,90" stroke="url(#gridGrad)" strokeWidth="3" strokeLinecap="round" fill="none" />
        <circle cx="80" cy="90" r="4" fill="#22c55e" stroke="white" strokeWidth="1" />
        <circle cx="200" cy="90" r="4" fill="#0ea5e9" stroke="white" strokeWidth="1" />
      </>
    );
  } else if (projectId === "neer-ai") {
    gradient = "linear-gradient(135deg, #090d16 0%, #0d9488 100%)";
    initials = "NA";
    label = "HYDRO DIAGNOSTIC AI";
    content = (
      <>
        <defs>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0d9488" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <path d="M 0,20 L 320,20 M 0,60 L 320,60 M 0,100 L 320,100 M 0,140 L 320,140" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
        <path d="M 40,0 L 40,180 M 120,0 L 120,180 M 200,0 L 200,180 M 280,0 L 280,180" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        <path d="M -20,120 Q 40,80 100,120 T 220,120 T 340,120" stroke="rgba(255,255,255,0.1)" strokeWidth="12" strokeLinecap="round" fill="none" />
        <path d="M -20,135 Q 45,95 110,135 T 230,135 T 350,135" stroke="rgba(255,255,255,0.15)" strokeWidth="8" strokeLinecap="round" fill="none" />

        <g transform="translate(138, 55)">
          <path d="M 22,0 C 22,0 44,24 44,38 C 44,50 34,60 22,60 C 10,60 0,50 0,38 C 0,24 22,0 22,0 Z" fill="url(#waterGrad)" stroke="white" strokeWidth="2.5" />
          <circle cx="22" cy="38" r="22" stroke="white" strokeWidth="1" strokeDasharray="3,3" opacity="0.6" />
        </g>

        <circle cx="95" cy="85" r="5" fill="#f59e0b" stroke="white" strokeWidth="1" />
        <line x1="100" y1="85" x2="136" y2="85" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <circle cx="225" cy="85" r="5" fill="#f59e0b" stroke="white" strokeWidth="1" />
        <line x1="220" y1="85" x2="184" y2="85" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <circle cx="160" cy="32" r="5" fill="#f59e0b" stroke="white" strokeWidth="1" />
        <line x1="160" y1="37" x2="160" y2="53" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      </>
    );
  } else if (projectId === "custom-llm-dashboard" || projectId.includes("custom-llm")) {
    gradient = "linear-gradient(135deg, #581c87 0%, #db2777 100%)";
    initials = "CU";
    label = "DECISION COGNITIVE CORE";
    content = (
      <>
        <circle cx="160" cy="90" r="24" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2" />
        <circle cx="160" cy="90" r="16" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="3,3" />
        <circle cx="100" cy="90" r="6" fill="white" />
        <circle cx="220" cy="90" r="6" fill="white" />
        <circle cx="160" cy="40" r="6" fill="white" />
        <circle cx="160" cy="140" r="6" fill="white" />
        <line x1="106" y1="90" x2="136" y2="90" stroke="white" strokeWidth="1.5" />
        <line x1="184" y1="90" x2="214" y2="90" stroke="white" strokeWidth="1.5" />
        <line x1="160" y1="46" x2="160" y2="66" stroke="white" strokeWidth="1.5" />
        <line x1="160" y1="114" x2="160" y2="134" stroke="white" strokeWidth="1.5" />
        <text x="160" y="114" fill="white" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="600">MODEL 4B+</text>
      </>
    );
  } else if (projectId.includes("zentix") || projectId.includes("campus")) {
    gradient = "linear-gradient(135deg, #312e81 0%, #6366f1 100%)";
    initials = "ZX";
    label = "CAMPUS CONTROL OS";
    content = (
      <>
        <path d="M 60,130 L 160,70 L 260,130 L 160,160 Z" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <path d="M 80,110 L 160,62 L 240,110 L 160,134 Z" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="3,3" />
        <circle cx="160" cy="70" r="5" fill="white" />
        <circle cx="100" cy="106" r="3.5" fill="white" />
        <circle cx="220" cy="106" r="3.5" fill="white" />
        <line x1="160" y1="75" x2="160" y2="147" stroke="white" strokeWidth="1.5" />
        <text x="160" y="44" fill="white" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="600">REALTIME MAP</text>
      </>
    );
  } else if (projectId.includes("libreflow")) {
    gradient = "linear-gradient(135deg, #78350f 0%, #d97706 100%)";
    initials = "LF";
    label = "CIRCULATION FLOW";
    content = (
      <>
        <rect x="70" y="60" width="54" height="38" rx="4" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2" />
        <path d="M 80,73 H 114 M 80,83 H 105" stroke="white" strokeWidth="1.5" />
        <rect x="196" y="60" width="54" height="38" rx="4" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2" />
        <path d="M 206,73 H 240 M 206,83 H 228" stroke="white" strokeWidth="1.5" />
        <path d="M 132,79 C 132,70 188,70 188,79" stroke="white" strokeWidth="1.5" strokeDasharray="3,3" />
        <path d="M 188,79 L 182,74 M 188,79 L 182,84" stroke="white" strokeWidth="1.5" />
        <text x="160" y="124" fill="white" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="600">CIRCULATION</text>
      </>
    );
  } else if (projectId.includes("resolv")) {
    gradient = "linear-gradient(135deg, #1e1b4b 0%, #ec4899 100%)";
    initials = "RA";
    label = "TICKET TRIAGE FILTER";
    content = (
      <>
        <path d="M 80,50 L 140,110 H 180 L 240,50 Z" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.06)" />
        <circle cx="110" cy="62" r="3" fill="white" />
        <circle cx="160" cy="62" r="3" fill="white" />
        <circle cx="210" cy="62" r="3" fill="white" />
        <circle cx="160" cy="85" r="4" fill="white" />
        <circle cx="160" cy="138" r="10" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2" />
        <text x="160" y="162" fill="white" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="600">AUTO CLASSIFY</text>
      </>
    );
  } else if (projectId.includes("cense")) {
    gradient = "linear-gradient(135deg, #064e3b 0%, #059669 100%)";
    initials = "CO";
    label = "IOT SENSOR GATEWAY";
    content = (
      <>
        <rect x="50" y="60" width="44" height="34" rx="4" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2" />
        <circle cx="72" cy="77" r="4" fill="white" />
        <rect x="226" y="60" width="44" height="34" rx="4" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2" />
        <circle cx="248" cy="77" r="4" fill="white" />
        <path d="M 94,77 H 226" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="3,3" />
        <circle cx="160" cy="77" r="12" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2" />
        <path d="M 155,77 L 160,82 L 168,74" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="160" y="116" fill="white" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="600">HEALTH CHECK</text>
      </>
    );
  } else {
    gradient = "linear-gradient(135deg, #115e59 0%, #10b981 100%)";
    initials = projectId.substring(0, 2).toUpperCase();
    label = "SYSTEM INTEGRATION";
    content = (
      <>
        <rect x="50" y="70" width="50" height="40" rx="6" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2" />
        <rect x="220" y="70" width="50" height="40" rx="6" fill="rgba(255,255,255,0.12)" stroke="white" strokeWidth="2" />
        <path d="M 108,90 H 212" stroke="white" strokeWidth="2" />
        <path d="M 206,84 L 212,90 L 206,96" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="160" cy="90" r="8" fill="white" />
        <text x="160" y="132" fill="white" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="600">DATA SYNC</text>
      </>
    );
  }

  return (
    <div className={styles.geometricCoverWrapper} style={{ background: gradient }}>
      <div className={styles.geometricCoverGrid} />
      <div className={styles.geometricCoverGlow} />
      <div className={styles.solutionOverviewSvgContainer}>
        <svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg">
          {content}
        </svg>
      </div>
    </div>
  );
}

function V2RealmClientInner({
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
  leetcodeStatus
}) {
  const gear = 5; // Default to Gear 5 / Sun God Nika
  const [isHakiEnabled, setIsHakiEnabled] = useState(true);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  // Map gear states to styling classes
  const getGearClass = () => {
    return styles.gearMode5; // Lock to Gear 5 / Sun God Nika
  };

  return (
    <div className={`${styles.gearScope} ${getGearClass()}`}>
      <V2BackgroundEffects
        gear={gear}
        isHakiEnabled={isHakiEnabled}
        onToggleHaki={() => setIsHakiEnabled(!isHakiEnabled)}
        projects={projects}
        progression={progression}
      />

      <main className={styles.realm}>
        <div className={styles.skyLayer} />
        <div className={styles.gridLayer} />
        <div className={styles.auraA} />
        <div className={styles.auraB} />
        <div className={styles.auraC} />

        {/* Dynamic steam clouds when in Gear 2 */}
        {gear === 2 ? (
          <div className={styles.steamOverlays} aria-hidden="true">
            <span className={styles.steam1} />
            <span className={styles.steam2} />
            <span className={styles.steam3} />
          </div>
        ) : null}

        <V2HeroSection
          profile={profile}
          progression={progression}
          projectCount={projects.length}
          skillCount={skills.length}
          certificationCount={certifications.length}
          achievementCount={achievements.length}
          v2Config={v2Config}
          onOpenInfo={() => setInfoModalOpen(true)}
          onToggleMode={onToggleMode}
        />

        <SectionReveal className={styles.originSection} delay={0.04}>
          <div className={styles.sectionHeading}>
            <span className={styles.systemBadge}>PROFILE OVERVIEW</span>
            <h2>Creative Engineering: Defying Latency, Orchestrating Impact</h2>
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

        <SectionReveal className={styles.servicesSection} delay={0.06}>
          <div className={styles.sectionHeading}>
            <span className={styles.systemBadge}>SERVICES OFFERED</span>
            <h2>Services I Offer</h2>
          </div>
          <div className={styles.servicesIntro}>
            <p>
              I design focused product systems that blend engineering clarity, strong UX direction, and real delivery speed.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {(v2Config?.services || serviceCards).map((service, index) => {
              const Icon = serviceIcons[index % serviceIcons.length];

              return (
                <article key={service.title} className={styles.serviceCard}>
                  <div className={styles.serviceIconWrap}>
                    <Icon size={18} />
                  </div>
                  <span className={styles.questType}>Service</span>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <div className={styles.serviceFoot}>
                    <span>Custom Scope</span>
                    <span>Build Ready</span>
                  </div>
                </article>
              );
            })}
          </div>
        </SectionReveal>

        <SectionReveal id="constellation" className={styles.constellationSection} delay={0.08}>
          <div className={styles.sectionHeading}>
            <span className={styles.systemBadge}>INTERACTIVE ABILITY MAP</span>
            <h2>Skills Graph</h2>
          </div>
          <V2Constellation
            profileName={profile?.name}
            floatingSkills={floatingSkills}
            domains={skillDomains}
            quotes={v2Config?.constellationQuotes}
            layout={v2Config?.skillMapLayout}
          />
        </SectionReveal>

        {/* Ascension Haki & Combat Telemetry Section */}
        <SectionReveal id="telemetry" className={styles.telemetrySection} delay={0.1}>
          <div className={styles.sectionHeading}>
            <span className={styles.systemBadge}>LORE_TELEMETRY</span>
            <h2>Ascension Status & Combat Telemetry</h2>
          </div>
          <p className={styles.servicesIntro} style={{ marginBottom: "20px" }}>
            Real-time digital battle stats mapping repositories to spell arsenals, and solved algorithms to vanquished beasts.
          </p>
          <div className={styles.telemetryGrid}>
            {/* GitHub Status Card */}
            <article className={styles.telemetryCard}>
              <div className={styles.telemetryCardHeader}>
                <div className={`${styles.telemetryIconWrap} ${styles.githubIconWrap}`}>
                  <Github size={20} />
                </div>
                <h3>GitHub: Conqueror Haki</h3>
              </div>
              
              <div className={styles.statsBlock}>
                <div className={styles.statItem}>
                  <span className={styles.statItemLabel}>Arsenal Spells</span>
                  <span className={styles.statItemValue}>
                    {githubStatus && !githubStatus.unavailable ? githubStatus.publicRepos : "18"}
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statItemLabel}>Grand Fleet</span>
                  <span className={styles.statItemValue}>
                    {githubStatus && !githubStatus.unavailable ? githubStatus.followers : "24"}
                  </span>
                </div>
              </div>
              
              <div className={styles.serviceFoot} style={{ marginTop: "10px" }}>
                <span>USER_SIGIL: {githubStatus?.username || "iamharishrohith"}</span>
                <span className={styles.purpleText} style={{ fontWeight: "700" }}>[LIBERATED_ACTIVE]</span>
              </div>
            </article>

            {/* LeetCode Status Card */}
            <article className={styles.telemetryCard}>
              <div className={styles.telemetryCardHeader}>
                <div className={`${styles.telemetryIconWrap} ${styles.leetcodeIconWrap}`}>
                  <Trophy size={20} />
                </div>
                <h3>LeetCode: Sun God Stats</h3>
              </div>

              <div className={styles.statsBlock}>
                <div className={styles.statItem}>
                  <span className={styles.statItemLabel}>Bounty Rank</span>
                  <span className={styles.statItemValue}>
                    {leetcodeStatus && !leetcodeStatus.unavailable && leetcodeStatus.ranking 
                      ? `#${leetcodeStatus.ranking.toLocaleString()}` 
                      : "#845,620"}
                  </span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statItemLabel}>Beasts Slain</span>
                  <span className={styles.statItemValue}>
                    {leetcodeStatus && !leetcodeStatus.unavailable && leetcodeStatus.solved 
                      ? leetcodeStatus.solved.all 
                      : "154"}
                  </span>
                </div>
              </div>

              <div className={styles.difficultyDistribution}>
                {/* Easy Progress Bar */}
                <div className={styles.difficultyDistributionItem}>
                  <div className={styles.diffRow}>
                    <span className={styles.diffLabel} style={{ color: "#34A853" }}>INFANTRY</span>
                    <div className={styles.diffBarBg}>
                      <div 
                        className={`${styles.diffBarFill} ${styles.easyFill}`} 
                        style={{ 
                          width: `${
                            leetcodeStatus && !leetcodeStatus.unavailable && leetcodeStatus.solved 
                              ? (leetcodeStatus.solved.easy / leetcodeStatus.solved.all) * 100 
                              : 33
                          }%` 
                        }} 
                      />
                    </div>
                    <span className={styles.diffCount}>
                      {leetcodeStatus && !leetcodeStatus.unavailable && leetcodeStatus.solved 
                        ? leetcodeStatus.solved.easy 
                        : "52"}
                    </span>
                  </div>
                </div>

                {/* Medium Progress Bar */}
                <div className={styles.difficultyDistributionItem}>
                  <div className={styles.diffRow}>
                    <span className={styles.diffLabel} style={{ color: "#fbbf24" }}>BOSSES</span>
                    <div className={styles.diffBarBg}>
                      <div 
                        className={`${styles.diffBarFill} ${styles.mediumFill}`} 
                        style={{ 
                          width: `${
                            leetcodeStatus && !leetcodeStatus.unavailable && leetcodeStatus.solved 
                              ? (leetcodeStatus.solved.medium / leetcodeStatus.solved.all) * 100 
                              : 57
                          }%` 
                        }} 
                      />
                    </div>
                    <span className={styles.diffCount}>
                      {leetcodeStatus && !leetcodeStatus.unavailable && leetcodeStatus.solved 
                        ? leetcodeStatus.solved.medium 
                        : "88"}
                    </span>
                  </div>
                </div>

                {/* Hard Progress Bar */}
                <div className={styles.difficultyDistributionItem}>
                  <div className={styles.diffRow}>
                    <span className={styles.diffLabel} style={{ color: "#ea4335" }}>LORDS</span>
                    <div className={styles.diffBarBg}>
                      <div 
                        className={`${styles.diffBarFill} ${styles.hardFill}`} 
                        style={{ 
                          width: `${
                            leetcodeStatus && !leetcodeStatus.unavailable && leetcodeStatus.solved 
                              ? (leetcodeStatus.solved.hard / leetcodeStatus.solved.all) * 100 
                              : 10
                          }%` 
                        }} 
                      />
                    </div>
                    <span className={styles.diffCount}>
                      {leetcodeStatus && !leetcodeStatus.unavailable && leetcodeStatus.solved 
                        ? leetcodeStatus.solved.hard 
                        : "14"}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </SectionReveal>

        <SectionReveal id="quests" className={styles.questSection} delay={0.12}>
          <div className={styles.sectionHeading}>
            <span className={styles.systemBadge}>FEATURED PROJECTS</span>
            <h2>Engineering Case Studies</h2>
          </div>

          {featuredProject ? (
            <article id={featuredProject.slug} className={styles.featuredQuest}>
              <div className={`${styles.featuredQuestMedia} ${projectMyths[featuredProject.slug]?.className || ""}`}>
                <SolutionOverview projectId={featuredProject.id} isFeatured={true} />
                <div className={styles.featuredQuestGlow} />
                <div className={styles.featuredQuestSeal}>
                  <span>Enterprise System</span>
                  <strong>+{featuredProject.expValue} EXP</strong>
                </div>
              </div>
              <div className={styles.featuredQuestCopy}>
                <div className={styles.questHeadlineRow}>
                  <span className={styles.questType}>Enterprise System</span>
                  <span className={styles.questMythLabel}>{projectMyths[featuredProject.slug]?.label || "Core Architecture"}</span>
                </div>
                <h3>{featuredProject.title}</h3>
                <p>{featuredProject.summary}</p>
                <strong className={styles.questImpactLine}>{featuredProject.impact}</strong>
                <div className={styles.questStatRow}>
                  <article>
                    <span>Impact Signal</span>
                    <strong>{questStat(featuredProject)}</strong>
                  </article>
                  <article>
                    <span>Tech Stack</span>
                    <strong>{splitStack(featuredProject.stack).slice(0, 2).join(" / ") || "Full Stack Build"}</strong>
                  </article>
                </div>
                <div className={styles.questMeta}>
                  {splitStack(featuredProject.stack).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                  <span>+{featuredProject.expValue} EXP</span>
                </div>
                <div className={styles.questActions}>
                  {featuredProject.liveUrl ? <a href={featuredProject.liveUrl}>Live Demo</a> : null}
                  {featuredProject.repoUrl ? <a href={featuredProject.repoUrl}>Source Code</a> : null}
                </div>
              </div>
            </article>
          ) : null}

          <div className={styles.questColumns}>
            <div className={styles.eliteQuestColumn}>
              {secondaryProjects.map((project, index) => {
                return (
                  <article key={project.id} id={project.slug} className={`${styles.questCard} ${projectMyths[project.slug]?.className || ""}`}>
                    <div className={styles.questCardTopline}>
                      <span className={styles.questType}>{buildQuestType(index + 1)}</span>
                      <span className={styles.tileExp}>+{project.expValue} EXP</span>
                    </div>

                    {/* Project Cover Block */}
                    <div className={styles.questCardMedia}>
                      <SolutionOverview projectId={project.id} />
                    </div>

                    <div className={styles.questCardBody}>
                      <span className={styles.questMythLabel}>{projectMyths[project.slug]?.label || "Core Build"}</span>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                      <strong className={styles.questImpactLine}>{project.impact}</strong>
                      <div className={styles.questMeta}>
                        {splitStack(project.stack).map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className={styles.questGrid}>
              {gridProjects.map((project, index) => {
                return (
                  <article key={project.id} id={project.slug} className={`${styles.questTile} ${projectMyths[project.slug]?.className || ""}`}>
                    <div className={styles.questTileBody}>
                      <div className={styles.questTileTopInline}>
                        <span className={styles.questType}>{buildQuestType(index + 3)}</span>
                        <span className={styles.tileExp}>+{project.expValue} EXP</span>
                      </div>
                      <span className={styles.questTileMyth}>{projectMyths[project.slug]?.label || "Utility Build"}</span>
                      <h3>{project.title}</h3>
                      <p>{project.impact || project.summary}</p>
                      <div className={styles.questTileFoot}>
                        {splitStack(project.stack).slice(0, 2).map((item) => (
                          <span key={item}>{item}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className={styles.timelineSection} delay={0.16}>
          <div className={styles.sectionHeading}>
            <span className={styles.systemBadge}>CAREER JOURNEY</span>
            <h2>Professional Experience</h2>
          </div>

          <div className={styles.timelineTrack}>
            {experiences.map((item, index) => (
              <article
                key={item.id}
                className={`${styles.timelineNode} ${index % 2 === 0 ? styles.timelineLeft : styles.timelineRight}`}
              >
                <span className={styles.timelineDot} />
                <div className={styles.timelineCard}>
                  <span className={styles.timelinePeriod}>
                    {formatMonth(item.startDate)} - {item.endDate ? formatMonth(item.endDate) : "Present"}
                  </span>
                  <h3>{item.role}</h3>
                  <p>{item.company}</p>
                  <strong>{item.highlights}</strong>
                  <span className={styles.timelineExp}>+{item.expValue} EXP</span>
                </div>
              </article>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal className={styles.vaultSection} delay={0.2}>
          <div className={styles.sectionHeading}>
            <span className={styles.systemBadge}>CREDENTIALS & HACKATHONS</span>
            <h2>Certifications & Achievements</h2>
          </div>

          <div className={styles.vaultLayout}>
            <div className={styles.artifactVault}>
              <div className={styles.vaultTitle}>
                <ScrollText size={18} />
                <h3>Certifications</h3>
              </div>
              <div className={styles.artifactGrid}>
                {certifications.map((item) => (
                  <article key={item.id} className={styles.artifactCard}>
                    <Award size={18} />
                    <strong>{item.title}</strong>
                    <span>{item.issuer}</span>
                    <span>{item.issueDate ? formatMonth(item.issueDate) : "Certified"}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className={styles.victoryVault}>
              <div className={styles.vaultTitle}>
                <Trophy size={18} />
                <h3>Hackathon Wins</h3>
              </div>
              <div className={styles.victoryHeroGrid}>
                {majorAchievements.map((item) => (
                  <article key={item.id} className={styles.victoryCard}>
                    <span className={styles.victoryGlow} />
                    <strong>{item.title}</strong>
                    <p>{item.summary}</p>
                  </article>
                ))}
              </div>
              <div className={styles.victoryTrail}>
                {supportAchievements.map((item) => (
                  <span key={item.id}>{item.title}</span>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.24}>
          <V2SummonPortal profile={profile} />
        </SectionReveal>

        <section className={styles.footerNote}>
          <div>
            <BookOpenText size={16} />
            <span>Creative Architect System</span>
          </div>
        </section>
      </main>

      {infoModalOpen ? (
        <div className={styles.portalOverlay} role="dialog" aria-modal="true">
          <div className={styles.portalBackdrop} onClick={() => setInfoModalOpen(false)} />
          <div className={styles.portalPanel} style={{ maxWidth: "680px", width: "90%", background: "rgba(10, 8, 36, 0.96)", border: "1px solid rgba(168, 85, 247, 0.3)" }}>
            <button type="button" className={styles.portalClose} onClick={() => setInfoModalOpen(false)}>
              <X size={16} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              <Info size={18} style={{ color: "#fbbf24" }} />
              <span className={styles.systemBadge}>SYSTEM PROTOCOL</span>
            </div>
            <h3 style={{ fontSize: "1.6rem", fontWeight: "700", color: "#ffffff", marginBottom: "16px", letterSpacing: "-0.02em" }}>
              Monarch Portfolio System Specs
            </h3>
            
            <div style={{
              maxHeight: "400px",
              overflowY: "auto",
              paddingRight: "12px",
              textAlign: "left",
              fontSize: "0.88rem",
              color: "#d8b4fe",
              lineHeight: "1.65",
              display: "flex",
              flexDirection: "column",
              gap: "20px"
            }}>
              <section>
                <h4 style={{ color: "#ffffff", fontSize: "1.05rem", fontWeight: "600", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>🌟</span> Why This Theme?
                </h4>
                <p style={{ color: "#a5b4fc" }}>
                  This portfolio is architected as an interactive <strong>Ascension and Progression System</strong>. It merges high-impact modern systems engineering (like Bun, ElysiaJS, real-time WebSockets, PINNs, and IoT telemetry) with the philosophy of <strong>ultimate creative freedom</strong>, drawing aesthetic inspiration from Luffy's <strong>Gear 5 / Sun God Nika</strong>. In the spirit of liberation, it defies the latency of traditional web architectures to build fluid, sub-millisecond, responsive user interfaces.
                </p>
              </section>

              <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "14px" }}>
                <h4 style={{ color: "#ffffff", fontSize: "1.05rem", fontWeight: "600", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>⚡</span> Leveling & XP Engine
                </h4>
                <p style={{ color: "#a5b4fc" }}>
                  Every item listed on this portfolio represents a milestone in Harish&apos;s engineering journey, each contributing a specific weight of <strong>EXP (Experience Points)</strong> to the system:
                </p>
                <ul style={{ listStyleType: "square", paddingLeft: "20px", color: "#c084fc", marginTop: "6px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <li><strong>Core Projects:</strong> Significant engineering builds (like SkipQ or R-Choice) yield up to <strong>+9,600 EXP</strong> based on code complexity and live product impact.</li>
                  <li><strong>Skill Nodes:</strong> Individual core competencies (e.g. ElysiaJS, TinyML, Custom LLM Training) yield EXP scaling with active proficiency levels.</li>
                  <li><strong>Chronicle Milestones:</strong> Real-world experience (founding CoLearn, Trainee work) adds baseline career EXP.</li>
                  <li><strong>System Artifacts:</strong> Professional certifications (Oracle, IBM, Google, AWS) yield EXP values verifying structured learning.</li>
                  <li><strong>Hackathon Victories:</strong> Top-tier placements (TANCAM, Nehru, VOID:V1, Vikas Saptah) yield high-tier EXP points.</li>
                </ul>
              </section>

              <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "14px" }}>
                <h4 style={{ color: "#ffffff", fontSize: "1.05rem", fontWeight: "600", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>🏆</span> Ranking & Progression Tiers
                </h4>
                <p style={{ color: "#a5b4fc" }}>
                  Your cumulative EXP determines your <strong>Power Level</strong> (calculated mathematically as <code>Lvl = ⌊√(Total_EXP / 120)⌋ + 1</code>). The level unlocks progressive architectural ranks:
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "10px", marginTop: "10px", background: "rgba(255,255,255,0.02)", padding: "10px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <div><span style={{color:"#fbbf24", fontWeight:"600"}}>Lvl 1+:</span> <br/><span style={{color:"#fff"}}>E-Rank - Initiate</span></div>
                  <div><span style={{color:"#fbbf24", fontWeight:"600"}}>Lvl 4+:</span> <br/><span style={{color:"#fff"}}>D-Rank - Builder</span></div>
                  <div><span style={{color:"#fbbf24", fontWeight:"600"}}>Lvl 7+:</span> <br/><span style={{color:"#fff"}}>C-Rank - Operator</span></div>
                  <div><span style={{color:"#fbbf24", fontWeight:"600"}}>Lvl 10+:</span> <br/><span style={{color:"#fff"}}>B-Rank - Vanguard</span></div>
                  <div><span style={{color:"#fbbf24", fontWeight:"600"}}>Lvl 13+:</span> <br/><span style={{color:"#fff"}}>A-Rank - Ascendant</span></div>
                  <div><span style={{color:"#fbbf24", fontWeight:"600"}}>Lvl 16+:</span> <br/><span style={{color:"#fff"}}>S-Rank - Monarch</span></div>
                </div>
              </section>

              <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "14px", marginBottom: "10px" }}>
                <h4 style={{ color: "#ffffff", fontSize: "1.05rem", fontWeight: "600", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
                  <span>💻</span> Interactive HUD & Commands
                </h4>
                <p style={{ color: "#a5b4fc" }}>
                  Press <kbd style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: "4px", fontSize: "0.8rem", color: "#ffffff" }}>Ctrl + K</kbd> (or click the floating Console icon in the HUD) to trigger the interactive command panel. Type and click commands to test system capabilities:
                </p>
                <ul style={{ listStyleType: "circle", paddingLeft: "20px", color: "#a78bfa", marginTop: "6px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <li><code>/joyboy</code>: Overdrives UI nodes into high-elasticity cartoon physics.</li>
                  <li><code>/haki</code>: Toggles interactive red/black Conqueror Haki particle lightning.</li>
                  <li><code>/gears</code>: Inspects current gear modes, performance latency, and active sub-components.</li>
                  <li><code>/stats</code>: Generates a complete mathematical breakdown of EXP across sections.</li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function V2RealmClient(props) {
  const [mounted, setMounted] = useState(false);
  const [portfolioMode, setPortfolioMode] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (portfolioMode === null) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [portfolioMode]);

  if (!mounted) {
    return <div style={{ minHeight: "100vh", backgroundColor: "#030209" }} />;
  }

  return (
    <AnimatePresence mode="wait">
      {portfolioMode === null ? (
        <motion.div
          key="gateway"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <V2GatewayPortal
            onSelectMode={(mode) => {
              setPortfolioMode(mode);
            }}
          />
        </motion.div>
      ) : portfolioMode === "developer" ? (
        <motion.div
          key="developer"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <V2DeveloperClient
            {...props}
            onToggleMode={() => {
              setPortfolioMode("creative");
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="creative"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <V2RealmChrome
            progression={props.progression}
            latestArtifact={props.certifications[0]}
          >
            <V2RealmClientInner
              {...props}
              onToggleMode={() => {
                setPortfolioMode("developer");
              }}
            />
          </V2RealmChrome>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
