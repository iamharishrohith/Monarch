import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getProgressionSnapshot } from "@/lib/queries";
import AdminDashboardClient from "@/components/AdminDashboardClient";

export const dynamic = "force-dynamic";



async function logoutAction() {
  "use server";
  await signOut({ redirectTo: "/admin/login" });
}

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  const [progression, profile, settings, projects, skills, experiences, certifications, achievements, notifications] = await Promise.all([
    getProgressionSnapshot(),
    prisma.profile.findFirst(),
    prisma.siteSettings.findFirst(),
    prisma.project.findMany({ orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }] }),
    prisma.skill.findMany({ orderBy: [{ featured: "desc" }, { level: "desc" }, { createdAt: "desc" }] }),
    prisma.experience.findMany({ orderBy: [{ startDate: "desc" }, { createdAt: "desc" }] }),
    prisma.certification.findMany({ orderBy: [{ issueDate: "desc" }, { createdAt: "desc" }] }),
    prisma.achievement.findMany({ orderBy: [{ awardedAt: "desc" }, { createdAt: "desc" }] }),
    prisma.notificationEvent.findMany({ orderBy: { createdAt: "desc" }, take: 5 })
  ]);

  return (
    <main className="admin-page-shell">
      <header className="admin-topbar">
        <div>
          <span className="system-pill">[ SYSTEM_ACTIVE: CMS_CONTROL ]</span>
          <h1>Data Ingestion Hub</h1>
          <p>Manage portfolio content, visibility, and progression outcomes from one system-native workspace.</p>
        </div>
        <form action={logoutAction}>
          <button className="ghost-button" type="submit">Sign Out</button>
        </form>
      </header>

      <section className="admin-overview-grid">
        <article className="metric-card">
          <span>Current Level</span>
          <strong>{progression.currentLevel}</strong>
          <p>{progression.currentRank}</p>
        </article>
        <article className="metric-card">
          <span>Total EXP</span>
          <strong>{progression.totalExp}</strong>
          <p>{progression.nextLevelExp} EXP to next level</p>
        </article>
        <article className="metric-card">
          <span>Published Projects</span>
          <strong>{projects.filter((project) => project.status === "PUBLISHED").length}</strong>
          <p>Featured work drives strong EXP gains.</p>
        </article>
        <article className="metric-card">
          <span>Skill Nodes</span>
          <strong>{skills.length}</strong>
          <p>Progression snapshot recalculates on write.</p>
        </article>
      </section>

      <section className="admin-insight-grid">
        <div className="admin-side-card admin-projection-card">
          <h3>Projection</h3>
          <p>Content writes update the live system snapshot without pushing the public homepage behind runtime-heavy reads.</p>
          <div className="admin-projection-metrics">
            <article>
              <strong>{progression.totalExp}</strong>
              <span>Current EXP</span>
            </article>
            <article>
              <strong>{progression.currentLevel}</strong>
              <span>Current Level</span>
            </article>
            <article>
              <strong>{progression.currentRank}</strong>
              <span>Rank Title</span>
            </article>
          </div>
        </div>
        <div className="admin-side-card">
          <h3>Recent Notifications</h3>
          <div className="admin-side-list">
            {notifications.map((event) => (
              <article key={event.id} className="admin-side-item">
                <span className="system-pill small">{event.kind.replace("_", " ")}</span>
                <strong>{event.title}</strong>
                <p>{event.message}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="admin-side-card">
          <h3>Latest Projects</h3>
          <div className="admin-side-list">
            {projects.slice(0, 4).map((project) => (
              <article key={project.id} className="admin-side-item">
                <strong>{project.title}</strong>
                <p>{project.summary}</p>
                <span>{project.status}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <AdminDashboardClient
        data={{
          profile,
          settings,
          projects,
          skills,
          experiences,
          certifications,
          achievements
        }}
      />
    </main>
  );
}
