"use client";

import { useState } from "react";
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
  Blocks
} from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { V2Constellation } from "@/components/V2Constellation";
import { V2HeroSection } from "@/components/V2HeroSection";
import { V2SummonPortal } from "@/components/V2SummonPortal";
import { V2BackgroundEffects } from "@/components/V2BackgroundEffects";
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
  if (index === 0) return "World Quest";
  if (index < 3) return "Elite Quest";
  return "Rapid Quest";
}

export function V2RealmClient({
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
  serviceCards
}) {
  const gear = 5; // Default to Gear 5 / Sun God Nika
  const [isHakiEnabled, setIsHakiEnabled] = useState(true);

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
        />

        <SectionReveal className={styles.originSection} delay={0.04}>
          <div className={styles.sectionHeading}>
            <span className={styles.systemBadge}>ORIGIN SCROLL</span>
            <h2>Awakened Engineering: Defying Latency, Orchestrating Impact</h2>
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
                <span>Current Realm</span>
                <strong>{profile?.location}</strong>
              </div>
              <div>
                <span>Primary Signal</span>
                <strong>{profile?.email}</strong>
              </div>
              <div>
                <span>Battle Focus</span>
                <strong>AI, Full Stack, Mobile, IoT</strong>
              </div>
            </article>
          </div>
        </SectionReveal>

        <SectionReveal className={styles.servicesSection} delay={0.06}>
          <div className={styles.sectionHeading}>
            <span className={styles.systemBadge}>SERVICE MAP</span>
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
            <span className={styles.systemBadge}>POWER CONSTELLATION</span>
            <h2>Awakened Ability Map</h2>
          </div>
          <V2Constellation
            profileName={profile?.name}
            floatingSkills={floatingSkills}
            domains={skillDomains}
            quotes={v2Config?.constellationQuotes}
            layout={v2Config?.skillMapLayout}
          />
        </SectionReveal>

        <SectionReveal id="quests" className={styles.questSection} delay={0.12}>
          <div className={styles.sectionHeading}>
            <span className={styles.systemBadge}>LEGENDARY QUESTS</span>
            <h2>Mission Dossiers</h2>
          </div>

          {featuredProject ? (
            <article id={featuredProject.slug} className={styles.featuredQuest}>
              <div className={`${styles.featuredQuestMedia} ${projectMyths[featuredProject.slug]?.className || ""}`}>
                {featuredProject.coverImage ? (
                  <Image
                    src={featuredProject.coverImage}
                    alt={featuredProject.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 40vw"
                  />
                ) : null}
                <div className={styles.featuredQuestGlow} />
                <div className={styles.featuredQuestSeal}>
                  <span>World Quest</span>
                  <strong>+{featuredProject.expValue} EXP</strong>
                </div>
              </div>
              <div className={styles.featuredQuestCopy}>
                <div className={styles.questHeadlineRow}>
                  <span className={styles.questType}>World Quest</span>
                  <span className={styles.questMythLabel}>{projectMyths[featuredProject.slug]?.label || "Legendary Mission Artifact"}</span>
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
                    <span>Quest Stack</span>
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
                  {featuredProject.liveUrl ? <a href={featuredProject.liveUrl}>Live System</a> : null}
                  {featuredProject.repoUrl ? <a href={featuredProject.repoUrl}>Source Archive</a> : null}
                </div>
              </div>
            </article>
          ) : null}

          <div className={styles.questColumns}>
            <div className={styles.eliteQuestColumn}>
              {secondaryProjects.map((project, index) => (
                <article key={project.id} id={project.slug} className={`${styles.questCard} ${projectMyths[project.slug]?.className || ""}`}>
                  <div className={styles.questCardTopline}>
                    <span className={styles.questType}>{buildQuestType(index + 1)}</span>
                    <span className={styles.tileExp}>+{project.expValue} EXP</span>
                  </div>
                  <span className={styles.questMythLabel}>{projectMyths[project.slug]?.label || "Elite Relic"}</span>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <strong className={styles.questImpactLine}>{project.impact}</strong>
                  <div className={styles.questMeta}>
                    {splitStack(project.stack).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.questGrid}>
              {gridProjects.map((project, index) => (
                <article key={project.id} id={project.slug} className={`${styles.questTile} ${projectMyths[project.slug]?.className || ""}`}>
                  <div className={styles.questTileTop}>
                    <span className={styles.questType}>{buildQuestType(index + 3)}</span>
                    <span className={styles.tileExp}>+{project.expValue} EXP</span>
                  </div>
                  <span className={styles.questTileMyth}>{projectMyths[project.slug]?.label || "Rapid Relic"}</span>
                  <h3>{project.title}</h3>
                  <p>{project.impact || project.summary}</p>
                  <div className={styles.questTileFoot}>
                    {splitStack(project.stack).slice(0, 2).map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className={styles.timelineSection} delay={0.16}>
          <div className={styles.sectionHeading}>
            <span className={styles.systemBadge}>BATTLE CHRONICLE</span>
            <h2>Ascension Timeline</h2>
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
            <span className={styles.systemBadge}>ARTIFACTS & VICTORIES</span>
            <h2>Relics of Progress</h2>
          </div>

          <div className={styles.vaultLayout}>
            <div className={styles.artifactVault}>
              <div className={styles.vaultTitle}>
                <ScrollText size={18} />
                <h3>Artifacts</h3>
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
                <h3>Victories</h3>
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
            <span>Monarch Portfolio System</span>
          </div>
        </section>
      </main>
    </div>
  );
}
