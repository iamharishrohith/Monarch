# Monarch Portfolio System

Next.js full-stack developer portfolio with:

- built-in admin CMS
- Prisma + SQLite
- Auth.js admin login
- Cloudinary-ready media fields
- GSAP + Framer Motion + anime.js
- progression snapshot engine with EXP, levels, and ranks

## Local setup

```bash
npm install
npm run prisma:push
npm run prisma:seed
npm run dev
```

Default local admin credentials come from `.env`:

- `admin@monarch.dev`
- `ChangeThisNow123!`

## Key routes

- `/` public portfolio
- `/admin/login` admin sign-in
- `/admin` control center
- `/api/progression` cached progression snapshot
