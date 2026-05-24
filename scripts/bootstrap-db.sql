PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS "User" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT,
  "email" TEXT NOT NULL,
  "emailVerified" DATETIME,
  "image" TEXT,
  "passwordHash" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");

CREATE TABLE IF NOT EXISTS "Account" (
  "userId" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "provider" TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  "refresh_token" TEXT,
  "access_token" TEXT,
  "expires_at" INTEGER,
  "token_type" TEXT,
  "scope" TEXT,
  "id_token" TEXT,
  "session_state" TEXT,
  PRIMARY KEY ("provider", "providerAccountId"),
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS "Session" (
  "sessionToken" TEXT NOT NULL PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "expires" DATETIME NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE UNIQUE INDEX IF NOT EXISTS "Session_sessionToken_key" ON "Session"("sessionToken");

CREATE TABLE IF NOT EXISTS "VerificationToken" (
  "identifier" TEXT NOT NULL,
  "token" TEXT NOT NULL,
  "expires" DATETIME NOT NULL,
  PRIMARY KEY ("identifier", "token")
);

CREATE UNIQUE INDEX IF NOT EXISTS "VerificationToken_token_key" ON "VerificationToken"("token");

CREATE TABLE IF NOT EXISTS "Profile" (
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

CREATE TABLE IF NOT EXISTS "Project" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "stack" TEXT NOT NULL,
  "coverImage" TEXT,
  "repoUrl" TEXT,
  "liveUrl" TEXT,
  "caseStudyUrl" TEXT,
  "impact" TEXT,
  "featured" BOOLEAN NOT NULL DEFAULT 0,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "expValue" INTEGER NOT NULL DEFAULT 250,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS "Project_slug_key" ON "Project"("slug");

CREATE TABLE IF NOT EXISTS "Skill" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "level" INTEGER NOT NULL DEFAULT 1,
  "featured" BOOLEAN NOT NULL DEFAULT 0,
  "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
  "expValue" INTEGER NOT NULL DEFAULT 80,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Experience" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "company" TEXT NOT NULL,
  "role" TEXT NOT NULL,
  "location" TEXT,
  "startDate" DATETIME NOT NULL,
  "endDate" DATETIME,
  "summary" TEXT NOT NULL,
  "highlights" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
  "expValue" INTEGER NOT NULL DEFAULT 180,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Certification" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "issuer" TEXT NOT NULL,
  "issueDate" DATETIME NOT NULL,
  "credentialId" TEXT,
  "credentialUrl" TEXT,
  "imageUrl" TEXT,
  "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
  "expValue" INTEGER NOT NULL DEFAULT 120,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Achievement" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "awardedBy" TEXT,
  "awardedAt" DATETIME NOT NULL,
  "imageUrl" TEXT,
  "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
  "expValue" INTEGER NOT NULL DEFAULT 140,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "Post" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "coverImage" TEXT,
  "tags" TEXT NOT NULL,
  "publishedAt" DATETIME,
  "status" TEXT NOT NULL DEFAULT 'DRAFT',
  "expValue" INTEGER NOT NULL DEFAULT 100,
  "readTime" INTEGER NOT NULL DEFAULT 5,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX IF NOT EXISTS "Post_slug_key" ON "Post"("slug");

CREATE TABLE IF NOT EXISTS "RankTier" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "minLevel" INTEGER NOT NULL,
  "badge" TEXT,
  "description" TEXT,
  "sortOrder" INTEGER NOT NULL DEFAULT 0
);

CREATE UNIQUE INDEX IF NOT EXISTS "RankTier_title_key" ON "RankTier"("title");
CREATE UNIQUE INDEX IF NOT EXISTS "RankTier_minLevel_key" ON "RankTier"("minLevel");

CREATE TABLE IF NOT EXISTS "ExpRule" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "entityType" TEXT NOT NULL,
  "baseExp" INTEGER NOT NULL,
  "publishedOnly" BOOLEAN NOT NULL DEFAULT 1,
  "multiplier" REAL NOT NULL DEFAULT 1,
  "bonusThreshold" INTEGER,
  "bonusExp" INTEGER NOT NULL DEFAULT 0
);

CREATE UNIQUE INDEX IF NOT EXISTS "ExpRule_entityType_key" ON "ExpRule"("entityType");

CREATE TABLE IF NOT EXISTS "ProgressSnapshot" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "totalExp" INTEGER NOT NULL,
  "currentLevel" INTEGER NOT NULL,
  "currentRank" TEXT NOT NULL,
  "nextLevelExp" INTEGER NOT NULL,
  "levelProgressExp" INTEGER NOT NULL,
  "levelStartExp" INTEGER NOT NULL,
  "levelEndExp" INTEGER NOT NULL,
  "statsJson" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "NotificationEvent" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "kind" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "metadata" TEXT,
  "acknowledged" BOOLEAN NOT NULL DEFAULT 0,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "SiteSettings" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "siteTitle" TEXT NOT NULL,
  "siteDescription" TEXT NOT NULL,
  "heroPrimaryCtaLabel" TEXT NOT NULL,
  "heroPrimaryCtaHref" TEXT NOT NULL,
  "heroSecondaryCtaLabel" TEXT NOT NULL,
  "heroSecondaryCtaHref" TEXT NOT NULL,
  "levelLabel" TEXT NOT NULL DEFAULT 'S-Rank - Monarch',
  "lastPublishedAt" DATETIME,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
