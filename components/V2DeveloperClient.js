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
                filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const skillIconMap = {
  // Languages
  "javascript (es6+)": Braces,
  "typescript": Braces,
  "python": Code2,
  "java": CoffeeIcon, // Fallback if Coffee not imported, let's map it below
  "c++": Cpu,
  "sql": Database,
  "solidity": ShieldCheck,
  
  // AI & ML
  "ollama": Bot,
  "custom llm training (4b+ params)": BrainCircuit,
  "tx-itx architecture": Activity,
  "linear regression optimization": TrendingUp,
  "ai agents": Bot,
  "vector databases (pinecone, supabase vector)": Database,
  
  // Backend & Performance
  "bun.js": Server,
  "elysiajs": Zap,
  "redis (caching & pub/sub)": Database,
  "websockets": RadioTower,
  "node.js": Server,
  "fastify.js": Zap,
  "express.js": Server,
  
  // Frontend & Mobile
  "next.js 15": Globe,
  "react.js": Blocks,
  "react native": Smartphone,
  "antigravity (state management)": Sparkles,
  "tailwind css": Palette,
  
  // IoT & Infrastructure
  "esp32": Cpu,
  "embedded c": Terminal,
  "raspberry pi": Cpu,
  "lora": RadioTower,
  "sensors": Cpu,
  
  // Database & Cloud
  "supabase (auth/database/edge functions)": Database,
  "postgresql": Database,
  "firebase": Cloud,
  "mongodb": Database,
  "mysql": Database,
  
  // Tools & DevOps
  "figma": PenTool,
  "git/github": Github,
  "docker": Blocks,
  "postman": Terminal,
  "vercel": Globe,
  "turborepo": Blocks,

  // Fundamentals
  "dsa": Code2,
  "oops": Blocks,
  "dom": Globe,
  "system design": Cpu,
  "git & github": Github,
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
  
  // AI & ML
  "ollama": "Local LLM runtime environment hosting, model orchestration, and fast semantic token inference.",
  "custom llm training (4b+ params)": "Dataset curating, transformer pre-training hyper-parameters, and weights convergence diagnostics.",
  "tx-itx architecture": "Innovative double-transformer loop routing, state persistence matrices, and cognitive reasoning paths.",
  "linear regression optimization": "Mathematical loss reduction, gradient descent tuning, and predictive value modeling.",
  "ai agents": "Autonomous decision tree loops, tool-calling agency, and dynamic contextual system prompts.",
  "vector databases (pinecone, supabase vector)": "Cosine similarity space mapping, semantic embeddings storage, and high-speed KNN indexing.",
  
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
  
  // Tools & DevOps
  "figma": "Pixel-perfect visual design systems, interactive component wireframing, and design-token exports.",
  "git/github": "Distributed version history branches control, collaborative pull requests, and automation actions.",
  "docker": "Isolated virtual container packaging, infrastructure deployment blueprints, and multi-service networks.",
  "postman": "API endpoint verification suites, automated test scripts runner, and API schema documentation.",
  "vercel": "Global Edge network CDNs hosting, instant branch preview builds, and serverless script routes.",
  "turborepo": "Monorepo workspace build caching, parallel tasks run orchestration, and fast execution pipelines.",

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
      <Glyph size={13} className={styles.bentoSkillIcon} />
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
    <div className={styles.capabilityCard}>
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
    </div>
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
  leetcodeStatus
}) {
  const [coreTemp, setCoreTemp] = useState(38);
  const [uptime, setUptime] = useState(99.982);
  const [latency, setLatency] = useState(14);
  const [portalOpen, setPortalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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
                  border: monarchHovered ? "1.5px solid rgba(251, 191, 36, 0.7)" : "1px solid rgba(255, 255, 255, 0.06)",
                  boxShadow: monarchHovered 
                    ? "0 30px 70px rgba(168, 85, 247, 0.16), 0 0 25px rgba(251, 191, 36, 0.35)" 
                    : "0 24px 60px rgba(0, 0, 0, 0.4)",
                  background: monarchHovered ? "rgba(15, 12, 46, 0.94)" : "rgba(12, 11, 26, 0.65)",
                  color: monarchHovered ? "#ffffff" : "inherit",
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
                  color: "#d8b4fe",
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
                    
                    <div style={{ textAlign: "left", fontSize: "0.72rem", color: "#e9d5ff", lineHeight: "1.45" }}>
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
      </SectionReveal>

      {/* Frosted Capabilities Matrix Bento Grid */}
      <SectionReveal id="skills" className={styles.section} delay={0.08}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ CORE_03 ]</span>
          <h2>Capabilities Matrix</h2>
          <p>Explore full stack capabilities, programming languages, and system architectures in a responsive grid.</p>
        </div>
        <div className={styles.capabilitiesBentoGrid}>
          {Object.entries(skillGroups).map(([category, catSkills], index) => (
            <motion.div key={category} variants={cardReveal} custom={index} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
              <CapabilityCard category={category} skills={catSkills} />
            </motion.div>
          ))}
        </div>
      </SectionReveal>

      {/* GitHub & LeetCode Coding Telemetry Section */}
      <SectionReveal id="telemetry" className={styles.section} delay={0.1}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ CORE_04 ]</span>
          <h2>Coding Telemetry</h2>
          <p>Real-time analytics and algorithmic data tracking synced directly from active developer profiles.</p>
        </div>
        
        <div className={styles.telemetryGrid}>
          {/* GitHub Stats Card */}
          <article className={styles.telemetryCard}>
            <div className={styles.telemetryCardHeader}>
              <div className={`${styles.telemetryIconWrap} ${styles.githubIconWrap}`}>
                <Github size={20} />
              </div>
              <h3>GitHub Workspace Signal</h3>
            </div>
            
            <div className={styles.statsBlock}>
              <div className={styles.statItem}>
                <span className={styles.statItemLabel}>Repositories</span>
                <span className={styles.statItemValue}>
                  {githubStatus && !githubStatus.unavailable ? githubStatus.publicRepos : "18"}
                </span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statItemLabel}>Followers</span>
                <span className={styles.statItemValue}>
                  {githubStatus && !githubStatus.unavailable ? githubStatus.followers : "24"}
                </span>
              </div>
            </div>
            <div className={styles.serviceFoot} style={{ marginTop: "10px" }}>
              <span>USER_ID: {githubStatus?.username || "iamharishrohith"}</span>
              <span className={styles.greenText}>[CONNECTION_ACTIVE]</span>
            </div>
          </article>

          {/* LeetCode Stats Card */}
          <article className={styles.telemetryCard}>
            <div className={styles.telemetryCardHeader}>
              <div className={`${styles.telemetryIconWrap} ${styles.leetcodeIconWrap}`}>
                <Award size={20} />
              </div>
              <h3>LeetCode Matrix Engine</h3>
            </div>

            <div className={styles.statsBlock}>
              <div className={styles.statItem}>
                <span className={styles.statItemLabel}>Rank</span>
                <span className={styles.statItemValue}>
                  {leetcodeStatus && !leetcodeStatus.unavailable && leetcodeStatus.ranking 
                    ? `#${leetcodeStatus.ranking.toLocaleString()}` 
                    : "#845,620"}
                </span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statItemLabel}>Total Solved</span>
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
                  <span className={styles.diffLabel} style={{ color: "#34A853" }}>EASY</span>
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
                  <span className={styles.diffLabel} style={{ color: "#fbbf24" }}>MEDIUM</span>
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
                  <span className={styles.diffLabel} style={{ color: "#ea4335" }}>HARD</span>
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

      {/* Systems / Quests Section (Featured Projects Grid) */}
      <SectionReveal id="projects" className={styles.section} delay={0.12}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ CORE_05 ]</span>
          <h2>Featured Systems & Integrations</h2>
          <p>Modular systems built for latency reduction, real-time analytics, and grid telemetry.</p>
        </div>

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
      </SectionReveal>

      {/* Career Chronicle Grid Section */}
      <section id="experience" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ CORE_06 ]</span>
          <h2>Career Chronicle Grid</h2>
          <p>Chronological verification of engineering roles, operations, and development milestones.</p>
        </div>

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
      </section>

      {/* Awards & Credentials plaque grid */}
      <section id="credentials" className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIndex}>[ CORE_07 ]</span>
          <h2>Awards & Credentials</h2>
          <p>Verified certifications, accolades, and hackathon victories.</p>
        </div>

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
