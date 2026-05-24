import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "portfolio.json");

// Default initial shell in case the file doesn't exist (though it should)
const defaultShell = {
  profile: {},
  settings: {},
  projects: [],
  skills: [],
  experiences: [],
  certifications: [],
  achievements: [],
  posts: [],
  notifications: [],
  rankTiers: [
    { title: "E-Rank - Initiate", minLevel: 1 },
    { title: "D-Rank - Builder", minLevel: 4 },
    { title: "C-Rank - Operator", minLevel: 7 },
    { title: "B-Rank - Vanguard", minLevel: 10 },
    { title: "A-Rank - Ascendant", minLevel: 13 },
    { title: "S-Rank - Monarch", minLevel: 16 }
  ]
};

// Thread-safe read/write sync helper
export function getData() {
  try {
    if (!fs.existsSync(DATA_PATH)) {
      const dir = path.dirname(DATA_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_PATH, JSON.stringify(defaultShell, null, 2), "utf8");
      return defaultShell;
    }
    const raw = fs.readFileSync(DATA_PATH, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to read JSON portfolio data:", error);
    return defaultShell;
  }
}

export function saveData(data) {
  try {
    const dir = path.dirname(DATA_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Failed to save JSON portfolio data:", error);
    return false;
  }
}

// ─── Progression Engine ────────────────────────────────────────────────────────

const expRules = {
  Project: { baseExp: 250, publishedOnly: true, multiplier: 1.2, bonusThreshold: 3, bonusExp: 120 },
  Skill: { baseExp: 80, publishedOnly: true, multiplier: 1, bonusThreshold: 8, bonusExp: 90 },
  Experience: { baseExp: 180, publishedOnly: true, multiplier: 1, bonusThreshold: 4, bonusExp: 140 },
  Certification: { baseExp: 120, publishedOnly: true, multiplier: 1, bonusThreshold: 2, bonusExp: 80 },
  Achievement: { baseExp: 140, publishedOnly: true, multiplier: 1, bonusThreshold: 3, bonusExp: 100 },
  Post: { baseExp: 100, publishedOnly: true, multiplier: 1, bonusThreshold: 5, bonusExp: 120 }
};

function calculateLevel(totalExp) {
  return Math.max(1, Math.floor(Math.sqrt(totalExp / 120)) + 1);
}

function getLevelBounds(level) {
  const levelStartExp = Math.max(0, (level - 1) * (level - 1) * 120);
  const levelEndExp = level * level * 120;
  return { levelStartExp, levelEndExp };
}

function countBonus(count, rule) {
  if (!rule?.bonusThreshold || count < rule.bonusThreshold) {
    return 0;
  }
  return Math.floor(count / rule.bonusThreshold) * rule.bonusExp;
}

function scoreCollection(items = [], rule) {
  const publishedItems = items.filter((item) => !rule?.publishedOnly || item.status === "PUBLISHED");
  const itemTotal = publishedItems.reduce((sum, item) => {
    const base = item.expValue ?? rule?.baseExp ?? 0;
    const multiplier = rule?.multiplier ?? 1;
    return sum + Math.round(base * multiplier);
  }, 0);

  return itemTotal + countBonus(publishedItems.length, rule);
}

export function computeProgression() {
  const data = getData();
  const totals = {
    projects: scoreCollection(data.projects, expRules.Project),
    skills: scoreCollection(data.skills, expRules.Skill),
    experiences: scoreCollection(data.experiences, expRules.Experience),
    certifications: scoreCollection(data.certifications, expRules.Certification),
    achievements: scoreCollection(data.achievements, expRules.Achievement),
    posts: scoreCollection(data.posts, expRules.Post)
  };

  const totalExp = Object.values(totals).reduce((sum, value) => sum + value, 0);
  const currentLevel = calculateLevel(totalExp);
  const { levelStartExp, levelEndExp } = getLevelBounds(currentLevel);
  const levelProgressExp = totalExp - levelStartExp;
  const nextLevelExp = Math.max(0, levelEndExp - totalExp);

  const rankTiers = data.rankTiers || defaultShell.rankTiers;
  const currentRank =
    [...rankTiers].reverse().find((tier) => currentLevel >= tier.minLevel)?.title || "E-Rank - Initiate";

  return {
    totalExp,
    currentLevel,
    currentRank,
    nextLevelExp,
    levelProgressExp,
    levelStartExp,
    levelEndExp,
    statsJson: JSON.stringify(totals)
  };
}

// ─── Profile & Settings ────────────────────────────────────────────────────────

export function updateProfile(profileData) {
  const data = getData();
  data.profile = {
    ...data.profile,
    ...profileData
  };
  saveData(data);
  return data.profile;
}

export function updateSettings(settingsData) {
  const data = getData();
  data.settings = {
    ...data.settings,
    ...settingsData
  };
  saveData(data);
  return data.settings;
}

// ─── Projects CRUD ─────────────────────────────────────────────────────────────

export function addProject(project) {
  const data = getData();
  const newProject = {
    id: `project-${Date.now()}`,
    slug: project.slug || `project-${Date.now()}`,
    title: project.title,
    summary: project.summary,
    description: project.description,
    stack: project.stack,
    featured: !!project.featured,
    expValue: Number(project.expValue) || 250,
    impact: project.impact || "",
    status: project.status || "PUBLISHED",
    coverImage: project.coverImage || "",
    repoUrl: project.repoUrl || "",
    liveUrl: project.liveUrl || "",
    caseStudyUrl: project.caseStudyUrl || "",
    sortOrder: data.projects.length + 1
  };
  data.projects.push(newProject);
  saveData(data);
  return newProject;
}

export function updateProject(id, fields) {
  const data = getData();
  const idx = data.projects.findIndex((p) => p.id === id);
  if (idx === -1) return null;

  data.projects[idx] = {
    ...data.projects[idx],
    ...fields,
    expValue: fields.expValue !== undefined ? Number(fields.expValue) : data.projects[idx].expValue
  };
  saveData(data);
  return data.projects[idx];
}

export function deleteProject(id) {
  const data = getData();
  const idx = data.projects.findIndex((p) => p.id === id);
  if (idx === -1) return false;
  data.projects.splice(idx, 1);
  saveData(data);
  return true;
}

// ─── Skills CRUD ───────────────────────────────────────────────────────────────

export function addSkill(skill) {
  const data = getData();
  const newSkill = {
    id: `skill-${Date.now()}`,
    name: skill.name,
    category: skill.category,
    description: skill.description,
    level: Number(skill.level) || 1,
    expValue: Number(skill.expValue) || 80,
    featured: !!skill.featured,
    status: skill.status || "PUBLISHED"
  };
  data.skills.push(newSkill);
  saveData(data);
  return newSkill;
}

export function updateSkill(id, fields) {
  const data = getData();
  const idx = data.skills.findIndex((s) => s.id === id);
  if (idx === -1) return null;

  data.skills[idx] = {
    ...data.skills[idx],
    ...fields,
    level: fields.level !== undefined ? Number(fields.level) : data.skills[idx].level,
    expValue: fields.expValue !== undefined ? Number(fields.expValue) : data.skills[idx].expValue
  };
  saveData(data);
  return data.skills[idx];
}

export function deleteSkill(id) {
  const data = getData();
  const idx = data.skills.findIndex((s) => s.id === id);
  if (idx === -1) return false;
  data.skills.splice(idx, 1);
  saveData(data);
  return true;
}

// ─── Experiences CRUD ──────────────────────────────────────────────────────────

export function addExperience(exp) {
  const data = getData();
  const newExp = {
    id: `experience-${Date.now()}`,
    company: exp.company,
    role: exp.role,
    location: exp.location || "",
    startDate: exp.startDate,
    endDate: exp.endDate || null,
    summary: exp.summary,
    highlights: exp.highlights || "",
    expValue: Number(exp.expValue) || 180,
    status: exp.status || "PUBLISHED"
  };
  data.experiences.push(newExp);
  saveData(data);
  return newExp;
}

export function updateExperience(id, fields) {
  const data = getData();
  const idx = data.experiences.findIndex((e) => e.id === id);
  if (idx === -1) return null;

  data.experiences[idx] = {
    ...data.experiences[idx],
    ...fields,
    expValue: fields.expValue !== undefined ? Number(fields.expValue) : data.experiences[idx].expValue
  };
  saveData(data);
  return data.experiences[idx];
}

export function deleteExperience(id) {
  const data = getData();
  const idx = data.experiences.findIndex((e) => e.id === id);
  if (idx === -1) return false;
  data.experiences.splice(idx, 1);
  saveData(data);
  return true;
}

// ─── Certifications CRUD ───────────────────────────────────────────────────────

export function addCertification(cert) {
  const data = getData();
  const newCert = {
    id: `cert-${Date.now()}`,
    title: cert.title,
    issuer: cert.issuer,
    issueDate: cert.issueDate,
    credentialUrl: cert.credentialUrl || "",
    expValue: Number(cert.expValue) || 120,
    status: cert.status || "PUBLISHED"
  };
  data.certifications.push(newCert);
  saveData(data);
  return newCert;
}

export function updateCertification(id, fields) {
  const data = getData();
  const idx = data.certifications.findIndex((c) => c.id === id);
  if (idx === -1) return null;

  data.certifications[idx] = {
    ...data.certifications[idx],
    ...fields,
    expValue: fields.expValue !== undefined ? Number(fields.expValue) : data.certifications[idx].expValue
  };
  saveData(data);
  return data.certifications[idx];
}

export function deleteCertification(id) {
  const data = getData();
  const idx = data.certifications.findIndex((c) => c.id === id);
  if (idx === -1) return false;
  data.certifications.splice(idx, 1);
  saveData(data);
  return true;
}

// ─── Achievements CRUD ─────────────────────────────────────────────────────────

export function addAchievement(ach) {
  const data = getData();
  const newAch = {
    id: `ach-${Date.now()}`,
    title: ach.title,
    summary: ach.summary,
    awardedBy: ach.awardedBy || "",
    awardedAt: ach.awardedAt,
    expValue: Number(ach.expValue) || 140,
    status: ach.status || "PUBLISHED"
  };
  data.achievements.push(newAch);
  saveData(data);
  return newAch;
}

export function updateAchievement(id, fields) {
  const data = getData();
  const idx = data.achievements.findIndex((a) => a.id === id);
  if (idx === -1) return null;

  data.achievements[idx] = {
    ...data.achievements[idx],
    ...fields,
    expValue: fields.expValue !== undefined ? Number(fields.expValue) : data.achievements[idx].expValue
  };
  saveData(data);
  return data.achievements[idx];
}

export function deleteAchievement(id) {
  const data = getData();
  const idx = data.achievements.findIndex((a) => a.id === id);
  if (idx === -1) return false;
  data.achievements.splice(idx, 1);
  saveData(data);
  return true;
}
