import React from "react";
import { harishProfile } from "@/lib/resume-data";

export function JsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": harishProfile.name,
    "gender": "https://schema.org/Male",
    "jobTitle": "Systems & AI Product Engineer",
    "url": "https://harishrohith.vercel.app",
    "image": "https://harishrohith.vercel.app/Monarchs.png",
    "email": harishProfile.email,
    "telephone": harishProfile.phone,
    "description": harishProfile.bio,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Coimbatore",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "India"
    },
    "sameAs": [
      harishProfile.githubUrl,
      harishProfile.linkedinUrl,
      harishProfile.leetcodeUrl
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Rathinam College of Arts & Science",
      "url": "https://rathinamcollege.edu.in"
    },
    "founder": {
      "@type": "Organization",
      "name": "CoLearn",
      "description": "A peer-learning community for Full Stack and AI."
    },
    "knowsAbout": [
      "Next.js 15",
      "TypeScript",
      "React Native",
      "Bun.js",
      "ElysiaJS",
      "Redis",
      "WebSockets",
      "ESP32",
      "TinyML",
      "Physics-Informed Neural Networks (PINNs)",
      "Custom LLM Training",
      "AI Agent Orchestration",
      "PostgreSQL",
      "Search Engine Optimization (SEO)",
      "Answer Engine Optimization (AEO)",
      "Generative Engine Optimization (GEO)"
    ]
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": harishProfile.name,
      "description": harishProfile.bio
    },
    "hasPart": [
      {
        "@type": "WebPage",
        "name": "Ascension Realm Portfolio",
        "url": "https://harishrohith.vercel.app/"
      },
      {
        "@type": "WebPage",
        "name": "Developer Core Profile",
        "url": "https://harishrohith.vercel.app/v2"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
    </>
  );
}
