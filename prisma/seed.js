require("dotenv").config();

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

function toDate(input) {
  return new Date(input);
}

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@monarch.dev";
  const password = process.env.ADMIN_PASSWORD || "ChangeThisNow123!";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name: "Monarch Admin" },
    create: {
      email,
      name: "Monarch Admin",
      passwordHash
    }
  });

  const profileCount = await prisma.profile.count();
  if (!profileCount) {
    await prisma.profile.create({
      data: {
        headline: "Full-Stack Engineer Building Cinematic Digital Systems",
        subheadline: "A premium progression-driven portfolio inspired by futuristic system interfaces and limitless creative energy.",
        bio: "I design and ship performance-aware products that blend polished UI, resilient backend architecture, and memorable storytelling. This portfolio turns career growth into a living progression system with measurable EXP, rank evolution, and premium product craft.",
        avatarUrl: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        location: "India",
        email,
        githubUrl: "https://github.com/your-handle",
        linkedinUrl: "https://linkedin.com/in/your-handle",
        websiteUrl: "https://your-domain.dev",
        resumeUrl: "https://example.com/resume.pdf",
        yearsOfExp: 6,
        statsSummary: "Frontend systems, product architecture, content platforms, and motion-led interfaces."
      }
    });
  }

  const rankCount = await prisma.rankTier.count();
  if (!rankCount) {
    await prisma.rankTier.createMany({
      data: [
        { title: "E-Rank - Initiate", minLevel: 1, sortOrder: 1, description: "Beginning the climb." },
        { title: "D-Rank - Operator", minLevel: 5, sortOrder: 2, description: "Reliable system contributor." },
        { title: "C-Rank - Specialist", minLevel: 10, sortOrder: 3, description: "Recognized technical depth." },
        { title: "B-Rank - Vanguard", minLevel: 15, sortOrder: 4, description: "Cross-functional builder." },
        { title: "A-Rank - Architect", minLevel: 20, sortOrder: 5, description: "Owns systems end-to-end." },
        { title: "S-Rank - Monarch", minLevel: 25, sortOrder: 6, description: "Top-tier execution and design leadership." }
      ]
    });
  }

  const ruleCount = await prisma.expRule.count();
  if (!ruleCount) {
    await prisma.expRule.createMany({
      data: [
        { entityType: "Project", baseExp: 250, publishedOnly: true, multiplier: 1.2, bonusThreshold: 3, bonusExp: 120 },
        { entityType: "Skill", baseExp: 80, publishedOnly: true, multiplier: 1, bonusThreshold: 8, bonusExp: 90 },
        { entityType: "Experience", baseExp: 180, publishedOnly: true, multiplier: 1, bonusThreshold: 4, bonusExp: 140 },
        { entityType: "Certification", baseExp: 120, publishedOnly: true, multiplier: 1, bonusThreshold: 2, bonusExp: 80 },
        { entityType: "Achievement", baseExp: 140, publishedOnly: true, multiplier: 1, bonusThreshold: 3, bonusExp: 100 },
        { entityType: "Post", baseExp: 100, publishedOnly: true, multiplier: 1, bonusThreshold: 5, bonusExp: 120 }
      ]
    });
  }

  const settingsCount = await prisma.siteSettings.count();
  if (!settingsCount) {
    await prisma.siteSettings.create({
      data: {
        siteTitle: "Monarch Portfolio System",
        siteDescription: "A progression-driven developer portfolio with a built-in CMS and premium motion system.",
        heroPrimaryCtaLabel: "Explore Projects",
        heroPrimaryCtaHref: "#projects",
        heroSecondaryCtaLabel: "Open Contact",
        heroSecondaryCtaHref: "#contact",
        levelLabel: "S-Rank - Monarch"
      }
    });
  }

  const projectCount = await prisma.project.count();
  if (!projectCount) {
    await prisma.project.createMany({
      data: [
        {
          slug: "monarch-control-center",
          title: "Monarch Control Center",
          summary: "A cinematic admin dashboard for content operations, growth analytics, and progression snapshots.",
          description: "Built a full-stack CMS interface with structured content pipelines, precomputed progression data, and motion-led admin feedback loops.",
          stack: "Next.js, Prisma, SQLite, Auth.js, GSAP",
          coverImage: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
          liveUrl: "https://example.com",
          repoUrl: "https://github.com/your-handle/monarch-control-center",
          featured: true,
          status: "PUBLISHED",
          expValue: 320,
          impact: "Reduced editorial friction and made growth data instantly visible."
        },
        {
          slug: "solo-leveling-portfolio",
          title: "Solo Leveling Portfolio Experience",
          summary: "A recruiter-friendly portfolio wrapped in a premium progression system.",
          description: "Designed a polished public experience with cloud layers, aura glows, animated level signals, and content-driven leveling logic.",
          stack: "Next.js, Framer Motion, anime.js, Cloudinary",
          coverImage: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
          featured: true,
          status: "PUBLISHED",
          expValue: 290,
          impact: "Turned conventional portfolio browsing into a memorable product interaction."
        }
      ]
    });
  }

  const skillCount = await prisma.skill.count();
  if (!skillCount) {
    await prisma.skill.createMany({
      data: [
        { name: "Next.js", category: "Frontend", description: "App Router, caching, ISR, and production web architecture.", level: 24, featured: true, status: "PUBLISHED" },
        { name: "Prisma", category: "Backend", description: "Schema design, relational content modeling, and migrations.", level: 19, featured: true, status: "PUBLISHED" },
        { name: "Motion Systems", category: "Design Engineering", description: "GSAP, Framer Motion, anime.js choreography and microinteractions.", level: 22, featured: true, status: "PUBLISHED" },
        { name: "Cloudinary", category: "Media", description: "Media pipelines, image optimization, and transformation delivery.", level: 17, featured: false, status: "PUBLISHED" }
      ]
    });
  }

  const experienceCount = await prisma.experience.count();
  if (!experienceCount) {
    await prisma.experience.createMany({
      data: [
        {
          company: "Independent Product Studio",
          role: "Lead Full-Stack Developer",
          location: "Remote",
          startDate: toDate("2023-01-01"),
          summary: "Led product engineering across portfolio, SaaS, and internal platform experiences.",
          highlights: "Built app shells, CMS systems, analytics views, and animation-heavy marketing surfaces.",
          status: "PUBLISHED",
          expValue: 240
        },
        {
          company: "Creative Technology Lab",
          role: "Frontend Engineer",
          location: "Hybrid",
          startDate: toDate("2020-04-01"),
          endDate: toDate("2022-12-31"),
          summary: "Created responsive component systems and experimental interaction layers for web products.",
          highlights: "Improved UX consistency, rendering performance, and design system coverage.",
          status: "PUBLISHED",
          expValue: 180
        }
      ]
    });
  }

  const certificationCount = await prisma.certification.count();
  if (!certificationCount) {
    await prisma.certification.create({
      data: {
        title: "Professional Cloud Developer",
        issuer: "Google Cloud",
        issueDate: toDate("2024-08-15"),
        credentialId: "MONARCH-GCP-001",
        credentialUrl: "https://example.com/credential",
        imageUrl: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg",
        status: "PUBLISHED",
        expValue: 140
      }
    });
  }

  const achievementCount = await prisma.achievement.count();
  if (!achievementCount) {
    await prisma.achievement.create({
      data: {
        title: "Launched a progression-driven portfolio platform",
        summary: "Unified brand storytelling, structured CMS authoring, and gameplay-inspired professional progression.",
        awardedBy: "Internal Milestone",
        awardedAt: toDate("2026-05-16"),
        status: "PUBLISHED",
        expValue: 180
      }
    });
  }

  const postCount = await prisma.post.count();
  if (!postCount) {
    await prisma.post.create({
      data: {
        slug: "building-a-level-up-portfolio-system",
        title: "Building a Level-Up Portfolio System",
        excerpt: "How I turned a personal portfolio into a living progression engine with premium UX.",
        content: "This system blends structured content, computed experience points, and premium motion design to create a portfolio that evolves as new work ships.",
        tags: "nextjs,design systems,portfolio,cms",
        status: "PUBLISHED",
        publishedAt: new Date(),
        expValue: 120,
        readTime: 6
      }
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
