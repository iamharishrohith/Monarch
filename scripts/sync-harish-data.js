require("dotenv").config();

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function calculateLevel(totalExp) {
  return Math.max(1, Math.floor(Math.sqrt(totalExp / 120)) + 1);
}

function getLevelBounds(level) {
  const levelStartExp = Math.max(0, (level - 1) * (level - 1) * 120);
  const levelEndExp = level * level * 120;
  return { levelStartExp, levelEndExp };
}

async function main() {
  const {
    harishProfile,
    skillNodes,
    experienceRecords,
    highlightedProjects,
    achievementRecords,
    certificationRecords
  } = await import("../lib/resume-data.js");

  const profile = {
    headline: harishProfile.headline,
    subheadline: harishProfile.subheadline,
    bio: harishProfile.bio,
    avatarUrl: harishProfile.avatarUrl || "",
    location: harishProfile.location,
    phone: harishProfile.phone,
    email: harishProfile.email,
    githubUrl: harishProfile.githubUrl,
    linkedinUrl: harishProfile.linkedinUrl,
    leetcodeUrl: harishProfile.leetcodeUrl,
    yearsOfExp: harishProfile.yearsOfExp,
    statsSummary: harishProfile.statsSummary
  };

  const existingProfile = await prisma.profile.findFirst();

  if (existingProfile) {
    await prisma.profile.update({
      where: { id: existingProfile.id },
      data: profile
    });
  } else {
    await prisma.profile.create({ data: profile });
  }

  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.achievement.deleteMany();
  await prisma.certification.deleteMany();
  await prisma.post.deleteMany();
  await prisma.notificationEvent.deleteMany();

  await prisma.project.createMany({
    data: highlightedProjects.map((project, index) => ({
      slug: project.slug,
      title: project.title,
      summary: project.summary,
      description: project.description,
      stack: project.stack,
      featured: project.featured,
      status: "PUBLISHED",
      expValue: project.expValue,
      impact: project.impact,
      sortOrder: index
    }))
  });
  await prisma.skill.createMany({
    data: skillNodes.map((skill, index) => ({
      name: skill.name,
      category: skill.category,
      description: skill.description,
      level: skill.level,
      featured: index < 4,
      status: "PUBLISHED",
      expValue: skill.expValue,
      sortOrder: index
    }))
  });
  await prisma.experience.createMany({
    data: experienceRecords.map((item, index) => ({
      company: item.company,
      role: item.role,
      location: item.location,
      startDate: new Date(item.startDate),
      endDate: item.endDate ? new Date(item.endDate) : null,
      summary: item.summary,
      highlights: item.highlights,
      expValue: item.expValue,
      status: "PUBLISHED",
      sortOrder: index
    }))
  });
  await prisma.achievement.createMany({
    data: achievementRecords.map((item, index) => ({
      title: item.title,
      summary: item.summary,
      awardedBy: "Hackathon / Ideathon",
      awardedAt: new Date(2025 + Math.floor(index / 6), (index % 6) + 1, 10),
      status: "PUBLISHED",
      expValue: item.expValue,
      sortOrder: index
    }))
  });
  await prisma.certification.createMany({
    data: certificationRecords.map((item, index) => ({
      title: item.title,
      issuer: item.issuer,
      issueDate: item.issueDate ? new Date(item.issueDate) : new Date(2025, index, 1),
      status: "PUBLISHED",
      expValue: item.expValue,
      sortOrder: index
    }))
  });

  const [rankTiers, allProjects, allSkills, allExperiences, allAchievements, allCertifications, allPosts] =
    await Promise.all([
      prisma.rankTier.findMany({ orderBy: { minLevel: "asc" } }),
      prisma.project.findMany({ where: { status: "PUBLISHED" } }),
      prisma.skill.findMany({ where: { status: "PUBLISHED" } }),
      prisma.experience.findMany({ where: { status: "PUBLISHED" } }),
      prisma.achievement.findMany({ where: { status: "PUBLISHED" } }),
      prisma.certification.findMany({ where: { status: "PUBLISHED" } }),
      prisma.post.findMany({ where: { status: "PUBLISHED" } })
    ]);

  const totals = {
    projects: allProjects.reduce((sum, item) => sum + item.expValue, 0),
    skills: allSkills.reduce((sum, item) => sum + item.expValue, 0),
    experiences: allExperiences.reduce((sum, item) => sum + item.expValue, 0),
    achievements: allAchievements.reduce((sum, item) => sum + item.expValue, 0),
    certifications: allCertifications.reduce((sum, item) => sum + item.expValue, 0),
    posts: allPosts.reduce((sum, item) => sum + item.expValue, 0)
  };

  const totalExp = Object.values(totals).reduce((sum, value) => sum + value, 0);
  const currentLevel = calculateLevel(totalExp);
  const { levelStartExp, levelEndExp } = getLevelBounds(currentLevel);
  const currentRank =
    [...rankTiers].reverse().find((tier) => currentLevel >= tier.minLevel)?.title || "E-Rank - Initiate";

  const snapshotData = {
    totalExp,
    currentLevel,
    currentRank,
    nextLevelExp: Math.max(0, levelEndExp - totalExp),
    levelProgressExp: totalExp - levelStartExp,
    levelStartExp,
    levelEndExp,
    statsJson: JSON.stringify(totals)
  };

  const existingSnapshot = await prisma.progressSnapshot.findFirst();
  if (existingSnapshot) {
    await prisma.progressSnapshot.update({
      where: { id: existingSnapshot.id },
      data: snapshotData
    });
  } else {
    await prisma.progressSnapshot.create({ data: snapshotData });
  }

  await prisma.notificationEvent.create({
    data: {
      kind: "LEVEL_UP",
      title: "System Online",
      message: `Progression synchronized for ${harishProfile.name} at Level ${currentLevel}.`,
      metadata: JSON.stringify({ currentLevel, currentRank, totalExp })
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
