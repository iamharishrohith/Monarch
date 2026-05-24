"use client";

import { Crown, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import styles from "@/app/v2/page.module.css";

export function V2RealmChrome({ progression, latestArtifact, children }) {
  return (
    <div className={styles.realmChrome}>
      <aside className={styles.loreHud}>
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
      </aside>

      {children}
    </div>
  );
}
