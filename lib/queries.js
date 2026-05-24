import { prisma } from "@/lib/prisma";
import { getRedis } from "@/lib/cache";
import { recomputeProgression } from "@/lib/progression";
import { getGithubStatus, getLeetCodeStatus } from "@/lib/coding-status";
import {
  achievementRecords,
  certificationRecords,
  educationRecords,
  experienceRecords,
  harishProfile,
  highlightedProjects,
  skillNodes,
  technicalSkillGroups
} from "@/lib/resume-data";

const snapshotKey = "monarch:progression:snapshot";
const fallbackRankTiers = [
  { title: "E-Rank - Initiate", minLevel: 1 },
  { title: "D-Rank - Builder", minLevel: 4 },
  { title: "C-Rank - Operator", minLevel: 7 },
  { title: "B-Rank - Vanguard", minLevel: 10 },
  { title: "A-Rank - Ascendant", minLevel: 13 },
  { title: "S-Rank - Monarch", minLevel: 16 }
];

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

function calculateLevel(totalExp) {
  return Math.max(1, Math.floor(Math.sqrt(totalExp / 120)) + 1);
}

function getLevelBounds(level) {
  const levelStartExp = Math.max(0, (level - 1) * (level - 1) * 120);
  const levelEndExp = level * level * 120;
  return { levelStartExp, levelEndExp };
}

function buildVisibleProgression({ projects, skills, experiences, certifications, achievements, posts }) {
  const stats = {
    projects: projects.reduce((sum, item) => sum + (item.expValue || 0), 0),
    skills: skills.reduce((sum, item) => sum + (item.expValue || 0), 0),
    experiences: experiences.reduce((sum, item) => sum + (item.expValue || 0), 0),
    certifications: certifications.reduce((sum, item) => sum + (item.expValue || 0), 0),
    achievements: achievements.reduce((sum, item) => sum + (item.expValue || 0), 0),
    posts: posts.reduce((sum, item) => sum + (item.expValue || 0), 0)
  };
  const totalExp = Object.values(stats).reduce((sum, value) => sum + value, 0);
  const currentLevel = calculateLevel(totalExp);
  const { levelStartExp, levelEndExp } = getLevelBounds(currentLevel);
  const currentRank =
    [...fallbackRankTiers].reverse().find((tier) => currentLevel >= tier.minLevel)?.title || fallbackRankTiers[0].title;

  return {
    totalExp,
    currentLevel,
    currentRank,
    nextLevelExp: Math.max(0, levelEndExp - totalExp),
    levelProgressExp: totalExp - levelStartExp,
    levelStartExp,
    levelEndExp,
    stats
  };
}

export async function getPortfolioData() {
  const [dbProfile, settings, dbProjects, skills, dbExperiences, dbCertifications, dbAchievements, posts, notifications] =
    await Promise.all([
      prisma.profile.findFirst(),
      prisma.siteSettings.findFirst(),
      prisma.project.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }]
      }),
      prisma.skill.findMany({
        where: { status: "PUBLISHED" },
        orderBy: [{ featured: "desc" }, { level: "desc" }]
      }),
      prisma.experience.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { startDate: "desc" }
      }),
      prisma.certification.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { issueDate: "desc" }
      }),
      prisma.achievement.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { awardedAt: "desc" }
      }),
      prisma.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { publishedAt: "desc" }
      }),
      prisma.notificationEvent.findMany({
        where: { acknowledged: false },
        orderBy: { createdAt: "desc" },
        take: 3
      })
    ]);

  const profile = {
    ...harishProfile,
    ...dbProfile
  };
  const mergedProjectPool = dbProjects.length
    ? dbProjects.map((item) => ({ ...item }))
    : highlightedProjects.map((project, index) => ({
        ...project,
        status: "PUBLISHED",
        sortOrder: index
      }));
  const pinnedProjectSlugs = parseSlugList(settings?.pinnedProjectSlugs);
  const pinnedProjects = pinnedProjectSlugs
    .map((slug) => mergedProjectPool.find((project) => project.slug === slug))
    .filter(Boolean);
  const remainingProjects = mergedProjectPool.filter(
    (project) => !pinnedProjects.some((pinned) => pinned.slug === project.slug)
  );
  const projects = [...pinnedProjects, ...remainingProjects];

  const skillsToRender = skills.length
    ? skills.map((item) => ({ ...item }))
    : skillNodes.map((skill, index) => ({
        ...skill,
        featured: skill.featured ?? index < 4,
        status: "PUBLISHED",
        sortOrder: index
      }));

  const experiences = dbExperiences.length
    ? dbExperiences.map((item) => ({ ...item }))
    : experienceRecords.map((item, index) => ({
        ...item,
        status: "PUBLISHED",
        sortOrder: index
      }));

  const certifications = dbCertifications.length
    ? dbCertifications.map((item) => ({ ...item }))
    : certificationRecords.map((item, index) => ({
        ...item,
        issueDate: item.issueDate ? new Date(item.issueDate) : undefined,
        status: "PUBLISHED",
        sortOrder: index
      }));

  const achievements = dbAchievements.length
    ? dbAchievements.map((item) => ({ ...item }))
    : achievementRecords.map((item, index) => ({
        ...item,
        status: "PUBLISHED",
        sortOrder: index
      }));

  const visiblePosts = posts;

  const [githubStatus, leetcodeStatus] = await Promise.all([
    getGithubStatus(profile?.githubUrl),
    getLeetCodeStatus(profile?.leetcodeUrl)
  ]);
  const progression = buildVisibleProgression({
    projects,
    skills: skillsToRender,
    experiences,
    certifications,
    achievements,
    posts: visiblePosts
  });

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
    notifications,
    progression,
    githubStatus,
    leetcodeStatus,
    educationRecords,
    technicalSkillGroups
  };
}

export async function getProgressionSnapshot() {
  const redis = getRedis();
  if (redis) {
    const cached = await redis.get(snapshotKey);
    if (cached) {
      return cached;
    }
  }

  let snapshot = await prisma.progressSnapshot.findFirst();
  if (!snapshot) {
    snapshot = await recomputeProgression();
  }

  const normalized = {
    ...snapshot,
    stats: JSON.parse(snapshot.statsJson || "{}")
  };

  if (redis) {
    await redis.set(snapshotKey, normalized, { ex: 300 });
  }

  return normalized;
}

export async function bustProgressionCache() {
  const redis = getRedis();
  if (redis) {
    await redis.del(snapshotKey);
  }
}
