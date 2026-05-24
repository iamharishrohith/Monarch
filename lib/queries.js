import { getData, computeProgression } from "@/lib/data";
import { getGithubStatus, getLeetCodeStatus } from "@/lib/coding-status";
import {
  educationRecords,
  harishProfile,
  technicalSkillGroups
} from "@/lib/resume-data";

const defaultServices = [
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

const defaultConstellationQuotes = [
  "Pressure is privilege. And I am the artist who turns pressure into impact.",
  "As long as I'm alive, there are infinite chances ahead.",
  "Power is not noise. It is clarity under pressure."
];

const defaultSkillMapLayout = [
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
  { top: "80%", left: "27%" }
];

function parseJsonArray(value, fallback) {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function parseLineList(value, fallback) {
  if (!value) return fallback;
  const items = String(value)
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length ? items : fallback;
}

function parseSlugList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function getPortfolioData() {
  const data = getData();
  const { settings, notifications } = data;

  const profile = {
    ...harishProfile,
    ...data.profile
  };

  const dbProjects = data.projects.filter((p) => p.status === "PUBLISHED");
  const mergedProjectPool = dbProjects.length
    ? dbProjects.map((item) => ({ ...item }))
    : [];

  const pinnedProjectSlugs = parseSlugList(settings?.pinnedProjectSlugs);
  const pinnedProjects = pinnedProjectSlugs
    .map((slug) => mergedProjectPool.find((project) => project.slug === slug))
    .filter(Boolean);
  const remainingProjects = mergedProjectPool.filter(
    (project) => !pinnedProjects.some((pinned) => pinned.slug === project.slug)
  );
  const projects = [...pinnedProjects, ...remainingProjects];

  const skillsToRender = data.skills
    .filter((s) => s.status === "PUBLISHED")
    .map((item) => ({ ...item }));

  const experiences = data.experiences
    .filter((e) => e.status === "PUBLISHED")
    .map((item) => ({ ...item }));

  const certifications = data.certifications
    .filter((c) => c.status === "PUBLISHED")
    .map((item) => ({ ...item }));

  const achievements = data.achievements
    .filter((a) => a.status === "PUBLISHED")
    .map((item) => ({ ...item }));

  const visiblePosts = (data.posts || []).filter((p) => p.status === "PUBLISHED");

  const [githubStatus, leetcodeStatus] = await Promise.all([
    getGithubStatus(profile?.githubUrl),
    getLeetCodeStatus(profile?.leetcodeUrl)
  ]);

  const progression = computeProgression();

  return {
    profile,
    settings,
    v2Config: {
      services: parseJsonArray(settings?.servicesJson, defaultServices),
      constellationQuotes: parseLineList(settings?.constellationQuotes, defaultConstellationQuotes),
      skillMapLayout: parseJsonArray(settings?.skillMapLayoutJson, defaultSkillMapLayout),
      pinnedProjectSlugs
    },
    projects,
    skills: skillsToRender,
    experiences,
    certifications,
    achievements,
    posts: visiblePosts,
    notifications: notifications || [],
    progression,
    githubStatus,
    leetcodeStatus,
    educationRecords,
    technicalSkillGroups
  };
}

export async function getProgressionSnapshot() {
  return computeProgression();
}

export async function bustProgressionCache() {
  // No-op — progression is computed on read from JSON
}
