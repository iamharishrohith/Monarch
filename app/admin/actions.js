"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { bustProgressionCache } from "@/lib/queries";
import { recomputeProgression } from "@/lib/progression";
import { auth } from "@/lib/auth";

async function checkAuth() {
  const session = await auth();
  return !!session?.user;
}

const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  stack: z.string().min(2),
  summary: z.string().min(10),
  description: z.string().min(20),
  coverImage: z.string().optional(),
  repoUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  caseStudyUrl: z.string().optional(),
  impact: z.string().optional(),
  expValue: z.coerce.number().min(10),
  featured: z.boolean().optional(),
  published: z.boolean().optional()
});

const skillSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  description: z.string().min(8),
  level: z.coerce.number().min(1).max(99),
  expValue: z.coerce.number().min(10),
  featured: z.boolean().optional(),
  published: z.boolean().optional()
});

const experienceSchema = z.object({
  company: z.string().min(2),
  role: z.string().min(2),
  location: z.string().optional(),
  startDate: z.string().min(4),
  endDate: z.string().optional(),
  summary: z.string().min(8),
  highlights: z.string().min(8),
  expValue: z.coerce.number().min(10),
  published: z.boolean().optional()
});

const certificationSchema = z.object({
  title: z.string().min(2),
  issuer: z.string().min(2),
  issueDate: z.string().min(4),
  credentialUrl: z.string().optional(),
  expValue: z.coerce.number().min(10)
});

const achievementSchema = z.object({
  title: z.string().min(2),
  summary: z.string().min(8),
  awardedBy: z.string().optional(),
  awardedAt: z.string().min(4),
  expValue: z.coerce.number().min(10)
});

const profileSchema = z.object({
  headline: z.string().min(2),
  subheadline: z.string().min(2),
  bio: z.string().min(20),
  location: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  leetcodeUrl: z.string().optional(),
  avatarUrl: z.string().optional(),
  statsSummary: z.string().optional()
});

const siteSettingsSchema = z.object({
  siteTitle: z.string().min(2),
  siteDescription: z.string().min(2),
  heroPrimaryCtaLabel: z.string().min(1),
  heroPrimaryCtaHref: z.string().min(1),
  heroSecondaryCtaLabel: z.string().min(1),
  heroSecondaryCtaHref: z.string().min(1),
  levelLabel: z.string().min(1),
  servicesJson: z.string().optional(),
  constellationQuotes: z.string().optional(),
  skillMapLayoutJson: z.string().optional(),
  pinnedProjectSlugs: z.string().optional()
});

function normalizeBoolean(value) {
  return value === "on";
}

async function refreshExperienceSystem() {
  await recomputeProgression();
  await bustProgressionCache();
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createProjectAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    stack: formData.get("stack"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage") || undefined,
    repoUrl: formData.get("repoUrl") || undefined,
    liveUrl: formData.get("liveUrl") || undefined,
    caseStudyUrl: formData.get("caseStudyUrl") || undefined,
    impact: formData.get("impact") || undefined,
    expValue: formData.get("expValue"),
    featured: normalizeBoolean(formData.get("featured")),
    published: normalizeBoolean(formData.get("published"))
  });

  if (!parsed.success) {
    return { success: false, message: "Project data is incomplete or invalid." };
  }

  await prisma.project.create({
    data: {
      ...parsed.data,
      status: parsed.data.published ? "PUBLISHED" : "DRAFT"
    }
  });

  await refreshExperienceSystem();
  return { success: true, message: "Project deployed into the progression system." };
}

export async function updateProjectAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const id = String(formData.get("id") || "");
  if (!id) {
    return { success: false, message: "Missing project id." };
  }

  const parsed = projectSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    stack: formData.get("stack"),
    summary: formData.get("summary"),
    description: formData.get("description"),
    coverImage: formData.get("coverImage") || undefined,
    repoUrl: formData.get("repoUrl") || undefined,
    liveUrl: formData.get("liveUrl") || undefined,
    caseStudyUrl: formData.get("caseStudyUrl") || undefined,
    impact: formData.get("impact") || undefined,
    expValue: formData.get("expValue"),
    featured: normalizeBoolean(formData.get("featured")),
    published: normalizeBoolean(formData.get("published"))
  });

  if (!parsed.success) {
    return { success: false, message: "Project update data is incomplete or invalid." };
  }

  await prisma.project.update({
    where: { id },
    data: {
      ...parsed.data,
      status: parsed.data.published ? "PUBLISHED" : "DRAFT"
    }
  });

  await refreshExperienceSystem();
  return { success: true, message: "Project updated." };
}

export async function deleteProjectAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const id = String(formData.get("id") || "");
  if (!id) {
    return { success: false, message: "Missing project id." };
  }

  await prisma.project.delete({ where: { id } });
  await refreshExperienceSystem();
  return { success: true, message: "Project deleted." };
}

export async function createSkillAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const parsed = skillSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description"),
    level: formData.get("level"),
    expValue: formData.get("expValue"),
    featured: normalizeBoolean(formData.get("featured")),
    published: normalizeBoolean(formData.get("published"))
  });

  if (!parsed.success) {
    return { success: false, message: "Skill data is incomplete or invalid." };
  }

  await prisma.skill.create({
    data: {
      ...parsed.data,
      status: parsed.data.published ? "PUBLISHED" : "DRAFT"
    }
  });

  await refreshExperienceSystem();
  return { success: true, message: "Skill node added and EXP recomputed." };
}

export async function createExperienceAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const parsed = experienceSchema.safeParse({
    company: formData.get("company"),
    role: formData.get("role"),
    location: formData.get("location") || undefined,
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || undefined,
    summary: formData.get("summary"),
    highlights: formData.get("highlights"),
    expValue: formData.get("expValue"),
    published: normalizeBoolean(formData.get("published"))
  });

  if (!parsed.success) {
    return { success: false, message: "Experience data is incomplete or invalid." };
  }

  await prisma.experience.create({
    data: {
      company: parsed.data.company,
      role: parsed.data.role,
      location: parsed.data.location,
      startDate: new Date(parsed.data.startDate),
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
      summary: parsed.data.summary,
      highlights: parsed.data.highlights,
      expValue: parsed.data.expValue,
      status: parsed.data.published ? "PUBLISHED" : "DRAFT"
    }
  });

  await refreshExperienceSystem();
  return { success: true, message: "Experience entry added." };
}

export async function updateSkillAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const id = String(formData.get("id") || "");
  if (!id) {
    return { success: false, message: "Missing skill id." };
  }

  const parsed = skillSchema.safeParse({
    name: formData.get("name"),
    category: formData.get("category"),
    description: formData.get("description"),
    level: formData.get("level"),
    expValue: formData.get("expValue"),
    featured: normalizeBoolean(formData.get("featured")),
    published: normalizeBoolean(formData.get("published"))
  });

  if (!parsed.success) {
    return { success: false, message: "Skill update data is incomplete or invalid." };
  }

  await prisma.skill.update({
    where: { id },
    data: {
      ...parsed.data,
      status: parsed.data.published ? "PUBLISHED" : "DRAFT"
    }
  });

  await refreshExperienceSystem();
  return { success: true, message: "Skill updated." };
}

export async function deleteSkillAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const id = String(formData.get("id") || "");
  if (!id) {
    return { success: false, message: "Missing skill id." };
  }

  await prisma.skill.delete({ where: { id } });
  await refreshExperienceSystem();
  return { success: true, message: "Skill deleted." };
}

export async function updateExperienceAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const id = String(formData.get("id") || "");
  if (!id) {
    return { success: false, message: "Missing experience id." };
  }

  const parsed = experienceSchema.safeParse({
    company: formData.get("company"),
    role: formData.get("role"),
    location: formData.get("location") || undefined,
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate") || undefined,
    summary: formData.get("summary"),
    highlights: formData.get("highlights"),
    expValue: formData.get("expValue"),
    published: normalizeBoolean(formData.get("published"))
  });

  if (!parsed.success) {
    return { success: false, message: "Experience update data is incomplete or invalid." };
  }

  await prisma.experience.update({
    where: { id },
    data: {
      company: parsed.data.company,
      role: parsed.data.role,
      location: parsed.data.location,
      startDate: new Date(parsed.data.startDate),
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
      summary: parsed.data.summary,
      highlights: parsed.data.highlights,
      expValue: parsed.data.expValue,
      status: parsed.data.published ? "PUBLISHED" : "DRAFT"
    }
  });

  await refreshExperienceSystem();
  return { success: true, message: "Experience updated." };
}

export async function deleteExperienceAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const id = String(formData.get("id") || "");
  if (!id) {
    return { success: false, message: "Missing experience id." };
  }

  await prisma.experience.delete({ where: { id } });
  await refreshExperienceSystem();
  return { success: true, message: "Experience deleted." };
}

export async function createCertificationAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const parsed = certificationSchema.safeParse({
    title: formData.get("title"),
    issuer: formData.get("issuer"),
    issueDate: formData.get("issueDate"),
    credentialUrl: formData.get("credentialUrl") || undefined,
    expValue: formData.get("expValue")
  });

  if (!parsed.success) {
    return { success: false, message: "Certification data is incomplete or invalid." };
  }

  await prisma.certification.create({
    data: {
      title: parsed.data.title,
      issuer: parsed.data.issuer,
      issueDate: new Date(parsed.data.issueDate),
      credentialUrl: parsed.data.credentialUrl,
      expValue: parsed.data.expValue,
      status: "PUBLISHED"
    }
  });

  await refreshExperienceSystem();
  return { success: true, message: "Certification added and leveling updated." };
}

export async function updateCertificationAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const id = String(formData.get("id") || "");
  if (!id) {
    return { success: false, message: "Missing certification id." };
  }

  const parsed = certificationSchema.safeParse({
    title: formData.get("title"),
    issuer: formData.get("issuer"),
    issueDate: formData.get("issueDate"),
    credentialUrl: formData.get("credentialUrl") || undefined,
    expValue: formData.get("expValue")
  });

  if (!parsed.success) {
    return { success: false, message: "Certification update data is incomplete or invalid." };
  }

  await prisma.certification.update({
    where: { id },
    data: {
      title: parsed.data.title,
      issuer: parsed.data.issuer,
      issueDate: new Date(parsed.data.issueDate),
      credentialUrl: parsed.data.credentialUrl,
      expValue: parsed.data.expValue,
      status: "PUBLISHED"
    }
  });

  await refreshExperienceSystem();
  return { success: true, message: "Certification updated." };
}

export async function deleteCertificationAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const id = String(formData.get("id") || "");
  if (!id) {
    return { success: false, message: "Missing certification id." };
  }

  await prisma.certification.delete({ where: { id } });
  await refreshExperienceSystem();
  return { success: true, message: "Certification deleted." };
}

export async function createAchievementAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const parsed = achievementSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    awardedBy: formData.get("awardedBy") || undefined,
    awardedAt: formData.get("awardedAt"),
    expValue: formData.get("expValue")
  });

  if (!parsed.success) {
    return { success: false, message: "Achievement data is incomplete or invalid." };
  }

  await prisma.achievement.create({
    data: {
      title: parsed.data.title,
      summary: parsed.data.summary,
      awardedBy: parsed.data.awardedBy,
      awardedAt: new Date(parsed.data.awardedAt),
      expValue: parsed.data.expValue,
      status: "PUBLISHED"
    }
  });

  await refreshExperienceSystem();
  return { success: true, message: "Achievement added and leveling updated." };
}

export async function updateAchievementAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const id = String(formData.get("id") || "");
  if (!id) {
    return { success: false, message: "Missing achievement id." };
  }

  const parsed = achievementSchema.safeParse({
    title: formData.get("title"),
    summary: formData.get("summary"),
    awardedBy: formData.get("awardedBy") || undefined,
    awardedAt: formData.get("awardedAt"),
    expValue: formData.get("expValue")
  });

  if (!parsed.success) {
    return { success: false, message: "Achievement update data is incomplete or invalid." };
  }

  await prisma.achievement.update({
    where: { id },
    data: {
      title: parsed.data.title,
      summary: parsed.data.summary,
      awardedBy: parsed.data.awardedBy,
      awardedAt: new Date(parsed.data.awardedAt),
      expValue: parsed.data.expValue,
      status: "PUBLISHED"
    }
  });

  await refreshExperienceSystem();
  return { success: true, message: "Achievement updated." };
}

export async function deleteAchievementAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const id = String(formData.get("id") || "");
  if (!id) {
    return { success: false, message: "Missing achievement id." };
  }

  await prisma.achievement.delete({ where: { id } });
  await refreshExperienceSystem();
  return { success: true, message: "Achievement deleted." };
}

export async function updateProfileAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const parsed = profileSchema.safeParse({
    headline: formData.get("headline"),
    subheadline: formData.get("subheadline"),
    bio: formData.get("bio"),
    location: formData.get("location") || undefined,
    phone: formData.get("phone") || undefined,
    email: formData.get("email") || undefined,
    githubUrl: formData.get("githubUrl") || undefined,
    linkedinUrl: formData.get("linkedinUrl") || undefined,
    leetcodeUrl: formData.get("leetcodeUrl") || undefined,
    avatarUrl: formData.get("avatarUrl") || undefined,
    statsSummary: formData.get("statsSummary") || undefined
  });

  if (!parsed.success) {
    return { success: false, message: "Profile data is incomplete or invalid." };
  }

  const existing = await prisma.profile.findFirst();

  if (existing) {
    await prisma.profile.update({
      where: { id: existing.id },
      data: parsed.data
    });
  } else {
    await prisma.profile.create({ data: parsed.data });
  }

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true, message: "Profile system updated." };
}

export async function updateSiteSettingsAction(_prevState, formData) {
  if (!(await checkAuth())) {
    return { success: false, message: "Unauthorized operation." };
  }

  const parsed = siteSettingsSchema.safeParse({
    siteTitle: formData.get("siteTitle"),
    siteDescription: formData.get("siteDescription"),
    heroPrimaryCtaLabel: formData.get("heroPrimaryCtaLabel"),
    heroPrimaryCtaHref: formData.get("heroPrimaryCtaHref"),
    heroSecondaryCtaLabel: formData.get("heroSecondaryCtaLabel"),
    heroSecondaryCtaHref: formData.get("heroSecondaryCtaHref"),
    levelLabel: formData.get("levelLabel"),
    servicesJson: formData.get("servicesJson") || undefined,
    constellationQuotes: formData.get("constellationQuotes") || undefined,
    skillMapLayoutJson: formData.get("skillMapLayoutJson") || undefined,
    pinnedProjectSlugs: formData.get("pinnedProjectSlugs") || undefined
  });

  if (!parsed.success) {
    return { success: false, message: "Site settings are incomplete or invalid." };
  }

  const existing = await prisma.siteSettings.findFirst();
  if (existing) {
    await prisma.siteSettings.update({
      where: { id: existing.id },
      data: parsed.data
    });
  } else {
    await prisma.siteSettings.create({
      data: parsed.data
    });
  }

  revalidatePath("/");
  revalidatePath("/v2");
  revalidatePath("/admin");
  return { success: true, message: "V2 CMS settings updated." };
}
