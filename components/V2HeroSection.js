"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useRef, useState, useEffect } from "react";
import { trackEvent } from "@/lib/analytics";
import styles from "@/app/v2/page.module.css";

function LottiePlayer({ animationPath, className }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let anim;
    let isCancelled = false;

    import("lottie-web").then((lottie) => {
      if (isCancelled || !containerRef.current) return;
      
      // Clear any existing children to prevent duplicate animations
      containerRef.current.innerHTML = "";

      anim = lottie.default.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: animationPath,
      });
    });

    return () => {
      isCancelled = true;
      if (anim) anim.destroy();
    };
  }, [animationPath]);

  return <div ref={containerRef} className={className} style={{ width: "100%", height: "100%" }} />;
}

function getInitials(name) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

function VisualOrb({ initials }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={styles.heroOrb}
      aria-hidden="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "pointer", position: "relative" }}
    >
      <div className={styles.heroOrbOuter} />
      <div className={styles.heroOrbMiddle} />
      <div className={styles.heroOrbCore}>
        <div style={{ position: "relative", width: "100%", height: "100%", display: "grid", placeItems: "center" }}>
          {/* Default initials */}
          <span style={{
            opacity: hovered ? 0 : 1,
            transform: hovered ? "scale(0.8) rotate(-15deg)" : "scale(1)",
            transition: "all 450ms cubic-bezier(0.16, 1, 0.3, 1)",
            position: "absolute"
          }}>
            {initials}
          </span>
          
          {/* Secret Monarchs Logo on Hover */}
          <div style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1.1) rotate(0deg)" : "scale(0.8) rotate(15deg)",
            transition: "all 450ms cubic-bezier(0.16, 1, 0.3, 1)",
            position: "absolute",
            width: "70%",
            height: "70%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <Image
              src="/Monarchs.png"
              alt="Monarchs Logo"
              width={75}
              height={75}
              style={{
                objectFit: "contain",
                filter: "drop-shadow(0 0 10px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 4px rgba(251, 191, 36, 0.4))"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function V2HeroSection({ profile, progression, projectCount, skillCount, certificationCount, achievementCount, v2Config = null, onOpenInfo, onToggleMode }) {
  const heroRef = useRef(null);
  const initials = useMemo(() => getInitials(profile?.name || "Harish Rohith"), [profile?.name]);
  const [monarchHovered, setMonarchHovered] = useState(false);

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
          <p className={styles.navTitle}>Welcome to {profile?.name || "Harish Rohith"}&apos;s Creative Studio</p>
        </div>
        <div className={styles.navActions}>
          <button
            type="button"
            onClick={onToggleMode}
            className={styles.ghostButton}
            style={{ marginRight: "10px", padding: "8px 16px", fontSize: "0.75rem", background: "rgba(6,182,212,0.06)", borderColor: "rgba(6,182,212,0.2)" }}
          >
            Technical Mode
          </button>
          <button
            type="button"
            onClick={onOpenInfo}
            className={styles.ghostButton}
            style={{ marginRight: "10px", padding: "8px 16px", fontSize: "0.75rem", background: "rgba(255,255,255,0.03)" }}
          >
            System Specs
          </button>
          <a
            href={v2Config?.heroPrimaryCtaHref || "#quests"}
            onClick={() => trackEvent("Hero Header", "Button Click", v2Config?.heroPrimaryCtaLabel || "Enter Quest Log")}
            className={styles.primaryButton}
          >
            {v2Config?.heroPrimaryCtaLabel || "Explore Projects"}
          </a>
        </div>
      </div>

      <div className={styles.heroLayout}>
        <div className={styles.heroCopy}>
          <span className={styles.systemBadge}>CREATIVE PROFILE</span>
          <h1>{profile?.name}</h1>
          <p className={styles.heroLead}>{profile?.headline}</p>
          <p className={styles.heroText}>{profile?.bio}</p>
          <div className={styles.heroActions}>
            <a
              href={v2Config?.heroPrimaryCtaHref || "#constellation"}
              onClick={() => trackEvent("Hero Content", "Button Click", v2Config?.heroPrimaryCtaLabel || "View Ability Map")}
              className={styles.primaryButton}
            >
              {v2Config?.heroPrimaryCtaLabel || "View Ability Map"}
            </a>
            <a
              href={v2Config?.heroSecondaryCtaHref || "#final-form"}
              onClick={() => trackEvent("Hero Content", "Button Click", v2Config?.heroSecondaryCtaLabel || "Contact Portal")}
              className={styles.ghostButton}
            >
              {v2Config?.heroSecondaryCtaLabel || "Contact Portal"}
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

          <div className={styles.floatCardWrapper} onClick={onOpenInfo} style={{ cursor: "pointer" }} title="Click to view Portfolio System details">
            <div className={`${styles.floatCard} ${styles.floatCardTop}`}>
              <span>{v2Config?.levelLabel || "ARCHITECT TIER"}</span>
              <strong>{progression.currentRank}</strong>
            </div>
            <div className={`${styles.floatCard} ${styles.floatCardRight}`}>
              <span>ARCHITECT LVL</span>
              <strong>{progression.currentLevel}</strong>
            </div>
            <div className={`${styles.floatCard} ${styles.floatCardBottom}`}>
              <span>TOTAL EXP</span>
              <strong>{progression.totalExp}</strong>
            </div>
            
            {/* Dedicated Interactive Monarchs Sigil Floating Card */}
            <div
              className={`${styles.floatCard}`}
              onMouseEnter={() => setMonarchHovered(true)}
              onMouseLeave={() => setMonarchHovered(false)}
              style={{
                bottom: "12%",
                right: "-2%",
                width: "14.5rem",
                transform: monarchHovered 
                  ? "translate(calc((var(--hero-x) - 50%) * -0.22px), calc((var(--hero-y) - 50%) * -0.22px)) scale(1.08)"
                  : "translate(calc((var(--hero-x) - 50%) * -0.22px), calc((var(--hero-y) - 50%) * -0.22px)) scale(1)",
                transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "pointer",
                border: monarchHovered ? "1.5px solid rgba(251, 191, 36, 0.7)" : "1px solid var(--line)",
                boxShadow: monarchHovered 
                  ? "0 30px 70px rgba(168, 85, 247, 0.16), 0 0 25px rgba(251, 191, 36, 0.35)" 
                  : "0 24px 60px rgba(168, 85, 247, 0.06)",
                background: monarchHovered ? "rgba(15, 12, 46, 0.94)" : "var(--panel)",
                color: monarchHovered ? "#ffffff" : "inherit",
                zIndex: 30,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "4px"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: "12px" }}>
                <div>
                  <span style={{ 
                    color: monarchHovered ? "#fbbf24" : "var(--muted)", 
                    transition: "color 300ms ease",
                    marginBottom: "4px" 
                  }}>
                    {monarchHovered ? "⚜️ ORIGIN SIGIL ACTIVE" : "TEAM ORIGIN"}
                  </span>
                  <strong style={{ 
                    fontSize: "1.25rem", 
                    fontWeight: "700", 
                    color: monarchHovered ? "#ffffff" : "var(--text)",
                    transition: "color 300ms ease"
                  }}>
                    Monarchs
                  </strong>
                </div>
                
                {/* Compact Thumbnail (only visible in default state) */}
                {!monarchHovered && (
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    border: "1.5px solid rgba(251, 191, 36, 0.7)",
                    boxShadow: "0 4px 12px rgba(168, 85, 247, 0.16), 0 0 8px rgba(251, 191, 36, 0.22)",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                    overflow: "hidden",
                    padding: "2px"
                  }}>
                    <Image
                      src="/Monarchs.png"
                      alt="Monarchs Logo"
                      width={30}
                      height={30}
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                )}
              </div>

              {/* Dynamic Hover Details & Large HD Logo view */}
              <div style={{
                maxHeight: monarchHovered ? "280px" : "0px",
                opacity: monarchHovered ? 1 : 0,
                overflow: "hidden",
                transition: "all 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                marginTop: monarchHovered ? "10px" : "0px",
                fontSize: "0.74rem",
                color: "#d8b4fe",
                fontFamily: "monospace",
                lineHeight: "1.4",
                width: "100%"
              }}>
                <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "8px" }}>
                  
                  {/* Large High-Contrast Logo Panel for 100% Readability */}
                  <div style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "14px",
                    marginTop: "6px"
                  }}>
                    <div style={{
                      background: "#ffffff", // Pure high-contrast white background so the red crest and black text are perfectly readable!
                      border: "1px solid rgba(251, 191, 36, 0.5)",
                      padding: "10px 20px",
                      borderRadius: "16px",
                      boxShadow: "0 10px 28px rgba(0, 0, 0, 0.35), 0 0 20px rgba(251, 191, 36, 0.25)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}>
                      <Image
                        src="/Monarchs.png"
                        alt="Monarchs Logo"
                        width={90}
                        height={90}
                        style={{
                          objectFit: "contain",
                          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.08))"
                        }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ textAlign: "left", fontSize: "0.72rem", color: "#e9d5ff", lineHeight: "1.45" }}>
                    ⚔️ Harish&apos;s strategic design orbit and core developer crew. Architecting the future of high-performance decentralized systems.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.metricRibbon}>
        <article onClick={() => trackEvent("Metrics", "Card Click", "Projects")}>
          <span>Projects</span>
          <strong>{projectCount}</strong>
        </article>
        <article onClick={() => trackEvent("Metrics", "Card Click", "Skills")}>
          <span>Skills</span>
          <strong>{skillCount}</strong>
        </article>
        <article onClick={() => trackEvent("Metrics", "Card Click", "Certificates")}>
          <span>Certificates</span>
          <strong>{certificationCount}</strong>
        </article>
        <article onClick={() => trackEvent("Metrics", "Card Click", "Achievements")}>
          <span>Achievements</span>
          <strong>{achievementCount}</strong>
        </article>
      </div>
    </section>
  );
}
