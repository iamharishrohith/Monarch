import Image from "next/image";
import {
  Bot,
  Award,
  BookOpenText,
  Cpu,
  RadioTower,
  ScrollText,
  Trophy,
  Search,
  PenTool,
  Smartphone,
  TrendingUp,
  Blocks
} from "lucide-react";
import { getPortfolioData } from "@/lib/queries";
import { V2RealmChrome } from "@/components/V2RealmChrome";
import { V2RealmClient } from "@/components/V2RealmClient";
import styles from "./page.module.css";

export const metadata = {
  title: "Harish Rohith | Ascension Realm | AI & Full-Stack Systems Engineer",
  description: "Explore the ascension-themed portfolio of Harish Rohith. High-performance full-stack web applications, AI product systems, IoT telemetry, and digital growth platforms.",
  keywords: [
    "Harish Rohith",
    "Ascension Realm",
    "AI Product Engineer",
    "Full-Stack Developer",
    "Next.js 15",
    "React Native",
    "IoT Platforms",
    "Vibe Coding",
    "Search Engine Optimization",
    "Answer Engine Optimization",
    "SXO",
    "AEO",
    "GEO"
  ],
  authors: [{ name: "Harish Rohith" }],
  creator: "Harish Rohith",
  openGraph: {
    title: "Harish Rohith | Ascension Realm | AI & Full-Stack Systems Engineer",
    description: "Explore the ascension-themed portfolio of Harish Rohith. High-performance full-stack web applications, AI product systems, IoT telemetry, and digital growth platforms.",
    type: "profile",
    firstName: "Harish",
    lastName: "Rohith",
    username: "harishrohith",
    gender: "male"
  },
  twitter: {
    card: "summary_large_image",
    title: "Harish Rohith | Ascension Realm",
    description: "High-performance systems, AI product interfaces, and low-latency full-stack applications."
  }
};

const curatedFloatingSkills = [
  { name: "Bun.js", category: "Backend & Performance" },
  { name: "ElysiaJS", category: "Backend & Performance" },
  { name: "Redis", category: "Backend & Performance" },
  { name: "Node.js", category: "Backend & Performance" },
  { name: "Express.js", category: "Backend & Performance" },
  { name: "Next.js 15", category: "Frontend & Mobile" },
  { name: "React.js", category: "Frontend & Mobile" },
  { name: "React Native", category: "Frontend & Mobile" },
  { name: "Capacitor.js", category: "Frontend & Mobile" },
  { name: "Tailwind CSS", category: "Frontend & Mobile" },
  { name: "Antigravity", category: "Vibe Coding" },
  { name: "Figma", category: "Vibe Coding" },
  { name: "Framer", category: "Vibe Coding" },
  { name: "Codex", category: "Vibe Coding" },
  { name: "Claude Code", category: "Vibe Coding" },
  { name: "Google Stitch", category: "Vibe Coding" },
  { name: "Google AI Studio", category: "Vibe Coding" },
  { name: "Pomeilli", category: "Vibe Coding" },
  { name: "Firebase", category: "Database & Cloud" },
  { name: "PostgreSQL", category: "Database & Cloud" },
  { name: "MongoDB", category: "Database & Cloud" },
  { name: "MySQL", category: "Database & Cloud" },
  { name: "Supabase", category: "Database & Cloud" },
  { name: "JavaScript (ES6+)", category: "P-Languages" },
  { name: "TypeScript", category: "P-Languages" },
  { name: "Python", category: "P-Languages" },
  { name: "Java", category: "P-Languages" },
  { name: "C++", category: "P-Languages" },
  { name: "PHP", category: "P-Languages" },
  { name: "SQL", category: "P-Languages" },
  { name: "Solidity", category: "P-Languages" },
  { name: "DSA", category: "Fundamentals" },
  { name: "OOPS", category: "Fundamentals" },
  { name: "DOM", category: "Fundamentals" },
  { name: "System Design", category: "Fundamentals" },
  { name: "Git & GitHub", category: "Fundamentals" },
  { name: "REST APIs", category: "Fundamentals" },
  { name: "Sensors", category: "IoT & Infrastructure" },
  { name: "ESP32", category: "IoT & Infrastructure" },
  { name: "Embedded C", category: "IoT & Infrastructure" },
  { name: "Raspberry Pi", category: "IoT & Infrastructure" },
  { name: "LoRa", category: "IoT & Infrastructure" }
];

const curatedDomainCards = [
  {
    title: "Frontend & Mobile",
    items: ["Next.js 15", "React.js", "React Native", "Capacitor.js", "Tailwind CSS"]
  },
  {
    title: "Backend & Performance",
    items: ["Bun.js", "ElysiaJS", "Redis", "Node.js", "Express.js"]
  },
  {
    title: "P-Languages",
    items: ["JavaScript (ES6+)", "TypeScript", "Python", "Java", "C++", "PHP", "SQL", "Solidity"]
  },
  {
    title: "IoT & Infrastructure",
    items: ["Sensors", "ESP32", "Embedded C", "Raspberry Pi", "LoRa"]
  },
  {
    title: "Vibe Coding",
    items: ["Antigravity", "Figma", "Framer", "Codex", "Claude Code", "Google Stitch", "Google AI Studio", "Pomeilli"]
  },
  {
    title: "Fundamentals",
    items: ["DSA", "OOPS", "DOM", "System Design", "Git & GitHub", "REST APIs"]
  }
];

const projectMyths = {
  "custom-llm-decision-intelligence-dashboard": {
    className: styles.questMythCelestial,
    label: "Celestial Intelligence Core"
  },
  "tneb-gridsense": {
    className: styles.questMythStorm,
    label: "Storm-Engine Grid telemetry"
  },
  "zentix-smart-campus-management": {
    className: styles.questMythCampus,
    label: "Monarch Campus Operating System"
  },
  "devs-recipe": {
    className: styles.questMythCookbook,
    label: "Joyboy Artifact Library"
  },
  "neer-ai": {
    className: styles.questMythWater,
    label: "Nirvana Flow Telemetry"
  }
};

const serviceCards = [
  {
    title: "AI Product Systems",
    summary: "Decision-driven interfaces, workflow design, and productized intelligence for practical use."
  },
  {
    title: "High-Performance Full Stack",
    summary: "Low-latency backend architecture, scalable frontend systems, and polished delivery across the stack."
  },
  {
    title: "IoT & Telemetry Platforms",
    summary: "Connected sensing, operational dashboards, and real-world telemetry flows built for action."
  },
  {
    title: "Digital Marketing",
    summary: "End-to-end search visibility via SEO, AEO, GEO, SXO, AIO & CXO — from classic rankings to AI-era answer-engine optimization."
  },
  {
    title: "UI/UX Designing & Sketching",
    summary: "Wireframes, prototypes, interaction design, and pixel-perfect visual systems crafted for usability and delight."
  },
  {
    title: "Mobile App Development",
    summary: "Native-quality cross-platform apps with React Native, optimized UX, and real-time data synchronization."
  },
  {
    title: "Brand Strategy & Growth",
    summary: "Identity systems, audience profiling, content funnels, and performance campaigns that scale with purpose."
  },
  {
    title: "API & Microservices Architecture",
    summary: "RESTful & GraphQL APIs, modular microservices, event-driven pipelines, and scalable backend orchestration."
  }
];

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
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(date));
}

function buildCuratedDomainDetails(cards, skills) {
  return cards.map((card) => {
    const matchedSkills = card.items
      .map((item) => skills.find((skill) => skill.name === item))
      .filter(Boolean);

    return {
      ...card,
      maxLevel: matchedSkills.length
        ? Math.max(...matchedSkills.map((skill) => skill.level || 1))
        : card.title === "Fundamentals"
          ? 26
          : 28,
      totalExp: matchedSkills.reduce((sum, skill) => sum + (skill.expValue || 0), 0)
    };
  });
}

function buildQuestType(index) {
  if (index === 0) return "World Quest";
  if (index < 3) return "Elite Quest";
  return "Rapid Quest";
}

export default async function V2Page() {
  const {
    profile,
    projects,
    skills,
    experiences,
    certifications,
    achievements,
    progression,
    v2Config
  } = await getPortfolioData();

  const skillDomains = buildCuratedDomainDetails(curatedDomainCards, skills);
  const floatingSkills = curatedFloatingSkills.map((skill, index) => ({
    id: `${skill.category}-${skill.name}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    ...skill,
    orbitIndex: index
  }));
  const featuredProject = projects[0];
  const secondaryProjects = projects.slice(1, 3);
  const gridProjects = projects.slice(3);
  const majorAchievements = achievements.slice(0, 4);
  const supportAchievements = achievements.slice(4);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Harish Rohith",
    "jobTitle": profile?.headline || "AI & Full-Stack Systems Engineer",
    "description": profile?.bio || "An ultra-creative portfolio experience built around systems, motion, and high-impact engineering.",
    "knowsAbout": skills.map((s) => s.name),
    "alumniOf": experiences.map((e) => ({
      "@type": "Organization",
      "name": e.company
    })),
    "knowsLanguage": ["English", "Tamil"],
    "sameAs": [
      profile?.githubUrl,
      profile?.linkedinUrl,
      profile?.leetcodeUrl
    ].filter(Boolean)
  };

  const projectsSchema = {
    "@context": "https://schema.org",
    "@graph": projects.map((p) => ({
      "@type": "CreativeWork",
      "name": p.title,
      "headline": p.summary,
      "description": p.description,
      "creator": {
        "@type": "Person",
        "name": "Harish Rohith"
      },
      "programmingLanguage": splitStack(p.stack),
      "codeRepository": p.repoUrl || undefined,
      "url": p.liveUrl || undefined
    }))
  };

  const jsonLd = [personSchema, projectsSchema];

  return (
    <V2RealmChrome
      progression={progression}
      latestArtifact={certifications[0]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <V2RealmClient
        profile={profile}
        projects={projects}
        skills={skills}
        experiences={experiences}
        certifications={certifications}
        achievements={achievements}
        progression={progression}
        v2Config={v2Config}
        skillDomains={skillDomains}
        floatingSkills={floatingSkills}
        featuredProject={featuredProject}
        secondaryProjects={secondaryProjects}
        gridProjects={gridProjects}
        majorAchievements={majorAchievements}
        supportAchievements={supportAchievements}
        projectMyths={projectMyths}
        serviceCards={serviceCards}
      />
    </V2RealmChrome>
  );
}
