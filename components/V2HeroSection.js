"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useRef } from "react";
import { trackEvent } from "@/lib/analytics";
import styles from "@/app/v2/page.module.css";

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function VisualOrb({ initials }) {
  return (
    <div className={styles.heroOrb} aria-hidden="true">
      <div className={styles.heroOrbOuter} />
      <div className={styles.heroOrbMiddle} />
      <div className={styles.heroOrbCore}>{initials}</div>
    </div>
  );
}

export function V2HeroSection({ profile, progression, projectCount, skillCount, certificationCount, achievementCount, v2Config = null }) {
  const heroRef = useRef(null);
  const initials = useMemo(() => getInitials(profile?.name || "Harish Rohith"), [profile?.name]);

  function handlePointerMove(event) {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    heroRef.current.style.setProperty("--hero-x", `${x}%`);
    heroRef.current.style.setProperty("--hero-y", `${y}%`);
  }

  return (
    <section className={styles.hero} ref={heroRef} onPointerMove={handlePointerMove}>
      <div className={styles.navStrip}>
        <div>
          <span className={styles.kicker}>WELCOME SIGNAL</span>
          <p className={styles.navTitle}>Welcome to {profile?.name || "Harish Rohith"}&apos;s Ascension Realm</p>
        </div>
        <div className={styles.navActions}>
          <a
            href={v2Config?.heroPrimaryCtaHref || "#quests"}
            onClick={() => trackEvent("Hero Header", "Button Click", v2Config?.heroPrimaryCtaLabel || "Enter Quest Log")}
            className={styles.primaryButton}
          >
            {v2Config?.heroPrimaryCtaLabel || "Enter Quest Log"}
          </a>
        </div>
      </div>

      <div className={styles.heroLayout}>
        <div className={styles.heroCopy}>
          <span className={styles.systemBadge}>AWAKENING GATE</span>
          <h1>{profile?.name}</h1>
          <p className={styles.heroLead}>{profile?.headline}</p>
          <p className={styles.heroText}>{profile?.bio}</p>
          <div className={styles.heroActions}>
            <a
              href={v2Config?.heroPrimaryCtaHref || "#constellation"}
              onClick={() => trackEvent("Hero Content", "Button Click", v2Config?.heroPrimaryCtaLabel || "View Awakening Map")}
              className={styles.primaryButton}
            >
              {v2Config?.heroPrimaryCtaLabel || "View Awakening Map"}
            </a>
            <a
              href={v2Config?.heroSecondaryCtaHref || "#final-form"}
              onClick={() => trackEvent("Hero Content", "Button Click", v2Config?.heroSecondaryCtaLabel || "Summon Collaboration")}
              className={styles.ghostButton}
            >
              {v2Config?.heroSecondaryCtaLabel || "Summon Collaboration"}
            </a>
          </div>
        </div>

        <div className={styles.heroCenterpiece}>
          <div className={styles.heroAuraField} />
          <div className={styles.heroLuffyContainer}>
            <VisualOrb initials={initials} />
            <div className={styles.luffyAvatarOverlay}>
              <Image
                src="/luffy-gear5-transparent.png"
                alt="Sun God Nika Luffy"
                fill
                sizes="280px"
                className={styles.luffyHeroImg}
                priority
              />
            </div>
          </div>

          <div className={styles.luffyCaption}>
            Inspired by Luffy to be a Warrior of Liberation
          </div>

          <div className={styles.floatCardWrapper}>
            <div className={`${styles.floatCard} ${styles.floatCardTop}`}>
              <span>{v2Config?.levelLabel || "RANK"}</span>
              <strong>{progression.currentRank}</strong>
            </div>
            <div className={`${styles.floatCard} ${styles.floatCardRight}`}>
              <span>POWER LVL</span>
              <strong>{progression.currentLevel}</strong>
            </div>
            <div className={`${styles.floatCard} ${styles.floatCardBottom}`}>
              <span>TOTAL EXP</span>
              <strong>{progression.totalExp}</strong>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.metricRibbon}>
        <article onClick={() => trackEvent("Metrics", "Card Click", "Quest Count")}>
          <span>Quest Count</span>
          <strong>{projectCount}</strong>
        </article>
        <article onClick={() => trackEvent("Metrics", "Card Click", "Skill Nodes")}>
          <span>Skill Nodes</span>
          <strong>{skillCount}</strong>
        </article>
        <article onClick={() => trackEvent("Metrics", "Card Click", "Artifacts")}>
          <span>Artifacts</span>
          <strong>{certificationCount}</strong>
        </article>
        <article onClick={() => trackEvent("Metrics", "Card Click", "Victories")}>
          <span>Victories</span>
          <strong>{achievementCount}</strong>
        </article>
      </div>
    </section>
  );
}
