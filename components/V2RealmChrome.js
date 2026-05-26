"use client";

import { useState } from "react";
import { Crown, ShieldCheck, Sparkles, Trophy, ChevronRight, ChevronLeft } from "lucide-react";
import styles from "@/app/v2/page.module.css";

export function V2RealmChrome({ progression, latestArtifact, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.realmChrome}>
      <aside 
        className={`${styles.loreHud} ${isOpen ? styles.loreHudOpen : ""}`}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button 
          type="button"
          className={styles.hudTrigger}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Collapse HUD" : "Expand HUD"}
        >
          {isOpen ? <ChevronLeft size={15} /> : <Crown size={15} className={styles.pulseIcon} />}
          <span className={styles.triggerText}>HUD</span>
        </button>

        <div className={styles.hudContent}>
          <article>
            <Crown size={14} />
            <div>
              <span>Current Rank</span>
              <strong>{progression.currentRank}</strong>
            </div>
          </article>
          <article>
            <Sparkles size={14} />
            <div>
              <span>Active Quest</span>
              <strong>None</strong>
            </div>
          </article>
          <article>
            <Trophy size={14} />
            <div>
              <span>Latest Artifact</span>
              <strong>{latestArtifact?.title || "Oracle Java Foundation"}</strong>
            </div>
          </article>
          <article>
            <ShieldCheck size={14} />
            <div>
              <span>System Status</span>
              <strong>Monarch Sync Online</strong>
            </div>
          </article>
        </div>
      </aside>

      {children}
    </div>
  );
}
