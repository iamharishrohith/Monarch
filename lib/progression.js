import { prisma } from "@/lib/prisma";

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

function scoreCollection(items, rule) {
  const publishedItems = items.filter((item) => !rule?.publishedOnly || item.status === "PUBLISHED");
  const itemTotal = publishedItems.reduce((sum, item) => {
    const base = item.expValue ?? rule?.baseExp ?? 0;
    const multiplier = rule?.multiplier ?? 1;
    return sum + Math.round(base * multiplier);
  }, 0);

  return itemTotal + countBonus(publishedItems.length, rule);
}

export async function calculateProgressionPreview() {
  const [projects, skills, experiences, certifications, achievements, posts, rankTiers, expRules] =
    await Promise.all([
      prisma.project.findMany(),
      prisma.skill.findMany(),
      prisma.experience.findMany(),
      prisma.certification.findMany(),
      prisma.achievement.findMany(),
      prisma.post.findMany(),
      prisma.rankTier.findMany({ orderBy: { minLevel: "asc" } }),
      prisma.expRule.findMany()
    ]);

  const ruleMap = Object.fromEntries(expRules.map((rule) => [rule.entityType, rule]));
  const totals = {
    projects: scoreCollection(projects, ruleMap.Project),
    skills: scoreCollection(skills, ruleMap.Skill),
    experiences: scoreCollection(experiences, ruleMap.Experience),
    certifications: scoreCollection(certifications, ruleMap.Certification),
    achievements: scoreCollection(achievements, ruleMap.Achievement),
    posts: scoreCollection(posts, ruleMap.Post)
  };

  const totalExp = Object.values(totals).reduce((sum, value) => sum + value, 0);
  const currentLevel = calculateLevel(totalExp);
  const { levelStartExp, levelEndExp } = getLevelBounds(currentLevel);
  const levelProgressExp = totalExp - levelStartExp;
  const nextLevelExp = Math.max(0, levelEndExp - totalExp);
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

export async function recomputeProgression() {
  const next = await calculateProgressionPreview();
  const current = await prisma.progressSnapshot.findFirst();

  if (!current) {
    const created = await prisma.progressSnapshot.create({ data: next });
    await prisma.notificationEvent.create({
      data: {
        kind: "LEVEL_UP",
        title: "System Online",
        message: `Progression initialized at Level ${created.currentLevel}.`,
        metadata: JSON.stringify({ currentLevel: created.currentLevel, currentRank: created.currentRank })
      }
    });

    return created;
  }

  const updated = await prisma.progressSnapshot.update({
    where: { id: current.id },
    data: next
  });

  if (updated.currentLevel > current.currentLevel) {
    await prisma.notificationEvent.create({
      data: {
        kind: "LEVEL_UP",
        title: `Level Up: ${updated.currentLevel}`,
        message: `You advanced from Level ${current.currentLevel} to Level ${updated.currentLevel}.`,
        metadata: JSON.stringify({
          previousLevel: current.currentLevel,
          currentLevel: updated.currentLevel
        })
      }
    });
  }

  if (updated.currentRank !== current.currentRank) {
    await prisma.notificationEvent.create({
      data: {
        kind: "RANK_UP",
        title: `Rank Ascension: ${updated.currentRank}`,
        message: `Your title evolved from ${current.currentRank} to ${updated.currentRank}.`,
        metadata: JSON.stringify({
          previousRank: current.currentRank,
          currentRank: updated.currentRank
        })
      }
    });
  }

  return updated;
}
