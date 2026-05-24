PRAGMA foreign_keys = OFF;

CREATE TABLE "Profile_new" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "headline" TEXT NOT NULL,
  "subheadline" TEXT NOT NULL,
  "bio" TEXT NOT NULL,
  "avatarUrl" TEXT,
  "location" TEXT,
  "phone" TEXT,
  "email" TEXT,
  "githubUrl" TEXT,
  "linkedinUrl" TEXT,
  "leetcodeUrl" TEXT,
  "xUrl" TEXT,
  "websiteUrl" TEXT,
  "resumeUrl" TEXT,
  "yearsOfExp" INTEGER NOT NULL DEFAULT 0,
  "statsSummary" TEXT,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO "Profile_new" (
  id,
  headline,
  subheadline,
  bio,
  avatarUrl,
  location,
  email,
  githubUrl,
  linkedinUrl,
  xUrl,
  websiteUrl,
  resumeUrl,
  yearsOfExp,
  statsSummary,
  createdAt,
  updatedAt
)
SELECT
  id,
  headline,
  subheadline,
  bio,
  avatarUrl,
  location,
  email,
  githubUrl,
  linkedinUrl,
  xUrl,
  websiteUrl,
  resumeUrl,
  yearsOfExp,
  statsSummary,
  createdAt,
  updatedAt
FROM "Profile";

DROP TABLE "Profile";
ALTER TABLE "Profile_new" RENAME TO "Profile";

PRAGMA foreign_keys = ON;
