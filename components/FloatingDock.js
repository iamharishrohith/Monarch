"use client";

import { useEffect, useState } from "react";
import { BriefcaseBusiness, CodeXml, Github, GraduationCap, Mail, Rocket, Sparkles, Trophy, UserRound } from "lucide-react";
import clsx from "clsx";

const items = [
  { id: "dashboard", label: "Home", icon: Sparkles },
  { id: "services", label: "Services", icon: BriefcaseBusiness },
  { id: "skills", label: "Skills", icon: CodeXml },
  { id: "projects", label: "Projects", icon: Rocket },
  { id: "experience", label: "Experience", icon: UserRound },
  { id: "achievements", label: "Awards", icon: Trophy },
  { id: "status", label: "Coding", icon: Github },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "contact", label: "Contact", icon: Mail }
];

export function FloatingDock({ initials = "HR" }) {
  const [activeId, setActiveId] = useState("dashboard");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.2, 0.45, 0.7]
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="side-dock" aria-label="Section navigation">
      <div className="side-avatar side-avatar-initials">
        <span>{initials}</span>
      </div>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={clsx("dock-button", activeId === item.id && "dock-button-active")}
            aria-label={item.label}
            title={item.label}
          >
            <Icon size={18} />
          </a>
        );
      })}
    </aside>
  );
}
