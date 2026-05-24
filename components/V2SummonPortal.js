"use client";

import { ArrowUpRight, Github, Linkedin, Mail, X } from "lucide-react";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";
import styles from "@/app/v2/page.module.css";

export function V2SummonPortal({ profile }) {
  const [open, setOpen] = useState(false);

  function handleOpenPortal() {
    setOpen(true);
    trackEvent("Portal", "Open Portal");
  }

  return (
    <>
      <section id="final-form" className={styles.finalSection}>
        <div className={styles.finalRing} />
        <span className={styles.systemBadge}>FINAL SUMMON</span>
        <h2>Open The Next Legendary Quest</h2>
        <p>
          Bring me in when the product needs more than clean code and more than pretty visuals.
          I build the system, the motion, and the memory people carry away from it.
        </p>
        <div className={styles.finalActions}>
          <button type="button" className={styles.primaryButton} onClick={handleOpenPortal}>
            Open Summon Portal <ArrowUpRight size={16} />
          </button>
          {profile?.githubUrl ? (
            <a
              href={profile.githubUrl}
              onClick={() => trackEvent("Portal", "View Code Realm Click", profile.githubUrl)}
              className={styles.ghostButton}
            >
              View Code Realm <Github size={16} />
            </a>
          ) : null}
        </div>
      </section>

      {open ? (
        <div className={styles.portalOverlay} role="dialog" aria-modal="true">
          <div className={styles.portalBackdrop} onClick={() => setOpen(false)} />
          <div className={styles.portalPanel}>
            <button type="button" className={styles.portalClose} onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
            <div className={styles.portalSigil} />
            <span className={styles.systemBadge}>RITUAL SUMMON</span>
            <h3>Signal The Build</h3>
            <p>Choose the channel and let the next realm open.</p>
            <div className={styles.portalLinks}>
              <a
                href={`mailto:${profile?.email}`}
                onClick={() => trackEvent("Portal", "Contact Redirect", "Mail")}
                className={styles.portalLink}
              >
                <Mail size={16} />
                <span>{profile?.email}</span>
              </a>
              {profile?.linkedinUrl ? (
                <a
                  href={profile.linkedinUrl}
                  onClick={() => trackEvent("Portal", "Contact Redirect", "LinkedIn")}
                  className={styles.portalLink}
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              ) : null}
              {profile?.githubUrl ? (
                <a
                  href={profile.githubUrl}
                  onClick={() => trackEvent("Portal", "Contact Redirect", "GitHub")}
                  className={styles.portalLink}
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
