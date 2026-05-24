# ⚜️ Monarch Portfolio System ⚜️

An ultra-premium, progression-driven developer portfolio system wrapped in an interactive RPG-style gaming layer, architected to be completely **DB-Free**, serverless, and optimized for sub-millisecond local reads and writes.

Built specifically for **Harish Rohith**, Technical Architect & AI/IoT Specialist.

---

## 🚀 The Architecture: High-Performance & DB-Free

By migrating from standard databases (Prisma, SQLite, PostgreSQL) to a **thread-safe JSON File Data Access Layer**, this portfolio resolves:
1. **$0 Hosting Costs**: Absolutely zero database hosting fees.
2. **Instant Warmup**: No cold starts, serverless sleep delays, or latency lag.
3. **Sub-Millisecond Speed**: Under-the-hood local reads achieve speeds under `1ms`, enabling direct static prerendering at build time.
4. **Security Isolation**: Since the database file (`data/portfolio.json`) resides strictly on the server file system and is outside the `/public` directory, it cannot be requested, read, or scanned by external users. Only secure, authenticated Server Actions can execute edits.

---

## ⚡ Key Highlights & Core Features

- **🎮 RPG progression system**: Calculates real-time EXP, Level boundaries, and Rank tiers dynamically on-read based on published projects, skill nodes, certifications, achievements, and posts.
- **🛡️ Secure Admin Control Center**: Accessible via `/gear5` with Credentials-based Auth.js v5 authentication. Add, update, or delete portfolio nodes safely.
- **✨ Premium Visual Aesthetics**: Built using a hybrid system of **Framer Motion**, **GSAP**, and **anime.js** for smooth, low-latency layout reveals, particle-field effects, aura glows, and micro-interactions.
- **🔍 SEO & Schema.org Optimization**: Fully pre-integrated with deep JSON-LD schemas representing the person, their credentials, and their portfolio works to secure maximum visibility on search and answer engines (SEO, AEO, GEO, SXO).
- **⚜️ The Hidden Sigil (Monarchs Logo)**: Features a beautiful, interactive Easter Egg on the main header orb. Hovering over the initials transitions into the custom **Monarchs Logo** with a golden glowing aura—pointing recruiters to Harish's future company and elite developer team.

---

## 📂 Codebase Directory Blueprint

```text
├── data/
│   └── portfolio.json       <-- Secure, offline database storage (JSON-format)
├── lib/
│   ├── data.js              <-- Ultra-fast JSON CRUD & Progression Engine
│   ├── auth.js              <-- Next-Auth v5 credentials provider
│   ├── queries.js           <-- Next.js Server Components query layer
│   └── coding-status.js     <-- Real-time GitHub and LeetCode status sync
├── app/
│   ├── v2/                  <-- Main Ascension Realm layout & visual layers
│   ├── gear5/               <-- Secure CMS Control Center & action handlers
│   ├── api/                 <-- Serverless progression API endpoints
│   ├── page.js              <-- Home page routing entry
│   └── globals.css          <-- Premium global CSS tokens & visual system
├── components/              <-- Premium visual components (Framer, GSAP, etc.)
└── public/
    ├── Monarchs.png         <-- The custom Monarchs Team Logo
    └── luffy-gear5-transparent.png <-- Warrior of Liberation mascot
```

---

## 🛠️ Local Development & Setup

Getting started with the Monarch Portfolio System is incredibly simple. No database migrations, seeds, or connection strings are required:

### 1. Clone & Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create or edit your `.env` file in the root directory:

```env
NEXTAUTH_SECRET="your-high-entropy-secure-secret-key"
AUTH_TRUST_HOST=true
ADMIN_EMAIL="admin@monarch.dev"
ADMIN_PASSWORD="ChangeThisPasswordNow123!"
```

### 3. Launch Development Server

```bash
npm run dev
```

### 4. Build for Production

To test the ultra-optimized static prerendering and ensure the compilation matches production state:

```bash
npm run build
```

---

## 🔒 Security Guidelines

Because we are storing data in `data/portfolio.json`:
- **File System Permissions**: Ensure the server process running Next.js has read & write permissions for the `/data` folder.
- **No Public Access**: The `data` folder is kept in the root folder, and **not** inside `public`. Next.js guarantees that any file outside of `public` cannot be served directly.
- **Strict Server Actions**: All admin actions inside `app/gear5/actions.js` run `checkAuth()` before executing any modifications.
- **Version Control Security**: Never commit `.env` or temporary secret keys to public repositories.

---

## 💎 Easter Egg: Unleash the Monarchs

Hover over the glowing Central Orb (`VisualOrb`) on the home page's hero layout to unlock the secret **Monarchs** sigil, representing Harish's future company, product vision, and elite engineering crew!
