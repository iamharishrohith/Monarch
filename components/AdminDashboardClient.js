"use client";

import { useEffect, useState } from "react";
import {
  User,
  Sliders,
  FolderCode,
  Cpu,
  Briefcase,
  Award,
  Trophy,
  X
} from "lucide-react";
import {
  AchievementForm,
  AchievementManager,
  CertificationForm,
  CertificationManager,
  ExperienceForm,
  ExperienceManager,
  ProfileForm,
  ProjectForm,
  ProjectManager,
  SiteSettingsForm,
  SkillForm,
  SkillManager
} from "./AdminForms";

export default function AdminDashboardClient({ data }) {
  const {
    profile,
    settings,
    projects,
    skills,
    experiences,
    certifications,
    achievements
  } = data;

  const [activeModal, setActiveModal] = useState(null);

  // Close modal on Escape key press
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setActiveModal(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeModal]);

  const sections = [
    {
      id: "profile",
      title: "Profile & Identity",
      description: "Edit bio, location, contact channels, and years of experience.",
      icon: User,
      color: "violet",
      metric: `${profile?.yearsOfExp || 0} Years Exp`,
      content: <ProfileForm profile={profile} />
    },
    {
      id: "settings",
      title: "Homepage Settings",
      description: "Configure SEO meta titles, main CTAs, and progression level titles.",
      icon: Sliders,
      color: "blue",
      metric: "System Settings",
      content: <SiteSettingsForm settings={settings} projects={projects} />
    },
    {
      id: "projects",
      title: "Projects Gallery",
      description: "Manage high-fidelity quest cards, stack specs, and links.",
      icon: FolderCode,
      color: "rose",
      metric: `${projects?.length || 0} Projects`,
      content: (
        <div className="admin-section-split">
          <div className="admin-section-split-main">
            <ProjectManager projects={projects} />
          </div>
          <div className="admin-section-split-side">
            <ProjectForm />
          </div>
        </div>
      )
    },
    {
      id: "skills",
      title: "Skill Tree Nodes",
      description: "Modify expertise levels, core categories, and placement configurations.",
      icon: Cpu,
      color: "emerald",
      metric: `${skills?.length || 0} Active Nodes`,
      content: (
        <div className="admin-section-split">
          <div className="admin-section-split-main">
            <SkillManager skills={skills} />
          </div>
          <div className="admin-section-split-side">
            <SkillForm />
          </div>
        </div>
      )
    },
    {
      id: "experiences",
      title: "Battle Chronicle",
      description: "Add or update job timeline records and achievement summaries.",
      icon: Briefcase,
      color: "purple",
      metric: `${experiences?.length || 0} Positions`,
      content: (
        <div className="admin-section-split">
          <div className="admin-section-split-main">
            <ExperienceManager experiences={experiences} />
          </div>
          <div className="admin-section-split-side">
            <ExperienceForm />
          </div>
        </div>
      )
    },
    {
      id: "certifications",
      title: "Certifications",
      description: "Upload verified credentials and issues to boost progression EXP.",
      icon: Award,
      color: "cyan",
      metric: `${certifications?.length || 0} Badges`,
      content: (
        <div className="admin-section-split">
          <div className="admin-section-split-main">
            <CertificationManager certifications={certifications} />
          </div>
          <div className="admin-section-split-side">
            <CertificationForm />
          </div>
        </div>
      )
    },
    {
      id: "achievements",
      title: "Milestone Trophies",
      description: "Publish awards, hackathon wins, and professional highlights.",
      icon: Trophy,
      color: "gold",
      metric: `${achievements?.length || 0} Victories`,
      content: (
        <div className="admin-section-split">
          <div className="admin-section-split-main">
            <AchievementManager achievements={achievements} />
          </div>
          <div className="admin-section-split-side">
            <AchievementForm />
          </div>
        </div>
      )
    }
  ];

  const currentSection = sections.find((s) => s.id === activeModal);

  return (
    <>
      {/* Bento Grid Launcher */}
      <section className="admin-bento-grid">
        {sections.map((sect) => {
          const IconComponent = sect.icon;
          return (
            <button
              key={sect.id}
              className={`admin-launcher-tile tile-${sect.id} tile-${sect.color}`}
              onClick={() => setActiveModal(sect.id)}
              aria-label={`Open ${sect.title}`}
            >
              <div className="tile-icon-wrapper">
                <IconComponent className="tile-icon" />
              </div>
              <div className="tile-content">
                <span className="tile-metric">{sect.metric}</span>
                <h3 className="tile-title">{sect.title}</h3>
                <p className="tile-description">{sect.description}</p>
              </div>
            </button>
          );
        })}
      </section>

      {/* Modal Dialog Overlay */}
      {activeModal && currentSection && (
        <div
          className="admin-modal-overlay"
          onClick={() => setActiveModal(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="admin-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="admin-modal-header">
              <div>
                <span className="system-pill">[ CMS_MODULE: {currentSection.title.toUpperCase()} ]</span>
                <h2>{currentSection.title}</h2>
                <p>{currentSection.description}</p>
              </div>
              <button
                className="admin-modal-close"
                onClick={() => setActiveModal(null)}
                aria-label="Close panel"
              >
                <X className="close-icon" />
              </button>
            </header>
            <div className="admin-modal-body">
              {currentSection.content}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
