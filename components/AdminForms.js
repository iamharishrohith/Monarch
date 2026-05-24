"use client";

import { useActionState, useMemo, useRef, useState } from "react";
import {
  createExperienceAction,
  createAchievementAction,
  createCertificationAction,
  createProjectAction,
  createSkillAction,
  deleteAchievementAction,
  deleteCertificationAction,
  deleteExperienceAction,
  deleteProjectAction,
  deleteSkillAction,
  updateAchievementAction,
  updateCertificationAction,
  updateExperienceAction,
  updateProfileAction,
  updateProjectAction,
  updateSiteSettingsAction,
  updateSkillAction
} from "@/app/admin/actions";

const initialState = { success: false, message: "" };
const defaultServiceRows = [
  { title: "AI Product Systems", summary: "Decision-driven interfaces, workflow design, and productized intelligence for practical use." },
  { title: "High-Performance Full Stack", summary: "Low-latency backend architecture, scalable frontend systems, and polished delivery across the stack." },
  { title: "IoT & Telemetry Platforms", summary: "Connected sensing, operational dashboards, and real-world telemetry flows built for action." }
];
const defaultQuoteRows = [
  "Pressure is privilege. I'm the artist, and pressure is the paint on my canvas.",
  "As long as I'm alive, there are infinite chances ahead.",
  "Awakening begins when chaos becomes direction."
];
const defaultMapLayout = [
  { top: "15%", left: "18%" },
  { top: "24%", left: "31%" },
  { top: "13%", left: "50%" },
  { top: "18%", left: "67%" },
  { top: "25%", left: "79%" },
  { top: "36%", left: "84%" },
  { top: "49%", left: "81%" },
  { top: "61%", left: "77%" },
  { top: "74%", left: "70%" },
  { top: "84%", left: "57%" },
  { top: "86%", left: "41%" },
  { top: "80%", left: "27%" }
];

function SubmitButton({ label }) {
  return <button className="admin-submit">{label}</button>;
}

function parseJsonArray(value, fallback) {
  if (!value) return fallback;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) && parsed.length ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function parseLineList(value, fallback) {
  if (!value) return fallback;
  const items = String(value)
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
  return items.length ? items : fallback;
}

function parseSlugList(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function reorderList(list, fromIndex, toIndex) {
  if (fromIndex === toIndex || fromIndex < 0 || toIndex < 0 || fromIndex >= list.length || toIndex >= list.length) {
    return list;
  }
  const copy = [...list];
  const [moved] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, moved);
  return copy;
}

function clampPercent(value, min = 6, max = 94) {
  return Math.min(max, Math.max(min, value));
}

function MapLayoutEditor({ layout, setLayout }) {
  const canvasRef = useRef(null);
  const [draggingIndex, setDraggingIndex] = useState(null);

  function updateSlotFromPointer(clientX, clientY, index) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const left = clampPercent(((clientX - rect.left) / rect.width) * 100);
    const top = clampPercent(((clientY - rect.top) / rect.height) * 100);

    setLayout((current) =>
      current.map((item, itemIndex) =>
        itemIndex === index
          ? { ...item, left: `${left.toFixed(1)}%`, top: `${top.toFixed(1)}%` }
          : item
      )
    );
  }

  return (
    <div className="admin-map-editor">
      <div
        ref={canvasRef}
        className="admin-map-canvas"
        onPointerMove={(event) => {
          if (draggingIndex === null) return;
          updateSlotFromPointer(event.clientX, event.clientY, draggingIndex);
        }}
        onPointerUp={() => setDraggingIndex(null)}
        onPointerLeave={() => setDraggingIndex(null)}
      >
        <div className="admin-map-core">Core</div>
        {layout.map((item, index) => (
          <button
            key={`map-dot-${index}`}
            type="button"
            className={`admin-map-slot ${draggingIndex === index ? "admin-map-slot-active" : ""}`}
            style={{ left: item.left, top: item.top }}
            onPointerDown={(event) => {
              setDraggingIndex(index);
              event.currentTarget.setPointerCapture(event.pointerId);
              updateSlotFromPointer(event.clientX, event.clientY, index);
            }}
            onPointerUp={(event) => {
              event.currentTarget.releasePointerCapture(event.pointerId);
              setDraggingIndex(null);
            }}
            aria-label={`Move slot ${index + 1}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <p className="admin-map-hint">Drag the numbered nodes to reposition skill slots in the live constellation.</p>
    </div>
  );
}

export function ProjectForm() {
  const [state, formAction] = useActionState(createProjectAction, initialState);

  return (
    <form action={formAction} className="admin-form-card">
      <div className="admin-form-header">
        <h3>Deploy New Project</h3>
        <p>Create published work that adds EXP and updates the public gallery.</p>
      </div>
      <input name="title" placeholder="Project title" required />
      <input name="slug" placeholder="project-slug" required />
      <input name="stack" placeholder="Tech stack" required />
      <input name="coverImage" placeholder="Cloudinary image URL" />
      <input name="liveUrl" placeholder="Live URL" />
      <input name="repoUrl" placeholder="Source URL" />
      <input name="caseStudyUrl" placeholder="Case study URL" />
      <textarea name="summary" placeholder="Short summary" rows={3} required />
      <textarea name="description" placeholder="Detailed description" rows={5} required />
      <input name="impact" placeholder="Impact statement" />
      <input name="expValue" placeholder="EXP reward" type="number" min="10" defaultValue="250" />
      <div className="admin-checkbox-row">
        <label><input type="checkbox" name="featured" /> Featured</label>
        <label><input type="checkbox" name="published" defaultChecked /> Published</label>
      </div>
      <SubmitButton label="Create Project" />
      {state.message ? <p className="admin-feedback">{state.message}</p> : null}
    </form>
  );
}

function ProjectManagerCard({ project }) {
  const [updateState, updateAction] = useActionState(updateProjectAction, initialState);
  const [deleteState, deleteAction] = useActionState(deleteProjectAction, initialState);

  return (
    <article className="admin-manager-card">
      <form action={updateAction} className="admin-manager-form">
        <input type="hidden" name="id" value={project.id} />
        <div className="admin-manager-head">
          <h4>{project.title}</h4>
          <span>{project.status}</span>
        </div>
        <input name="title" defaultValue={project.title} placeholder="Project title" required />
        <input name="slug" defaultValue={project.slug} placeholder="Slug" required />
        <input name="stack" defaultValue={project.stack} placeholder="Stack" required />
        <input name="coverImage" defaultValue={project.coverImage || ""} placeholder="Cover image URL" />
        <input name="liveUrl" defaultValue={project.liveUrl || ""} placeholder="Live URL" />
        <input name="repoUrl" defaultValue={project.repoUrl || ""} placeholder="Source URL" />
        <input name="caseStudyUrl" defaultValue={project.caseStudyUrl || ""} placeholder="Case study URL" />
        <textarea name="summary" rows={3} defaultValue={project.summary} placeholder="Summary" required />
        <textarea name="description" rows={4} defaultValue={project.description} placeholder="Description" required />
        <input name="impact" defaultValue={project.impact || ""} placeholder="Impact statement" />
        <input name="expValue" type="number" min="10" defaultValue={project.expValue} placeholder="EXP value" />
        <div className="admin-checkbox-row">
          <label><input type="checkbox" name="featured" defaultChecked={project.featured} /> Featured</label>
          <label><input type="checkbox" name="published" defaultChecked={project.status === "PUBLISHED"} /> Published</label>
        </div>
        <div className="admin-manager-actions">
          <SubmitButton label="Save Project" />
        </div>
        {updateState.message ? <p className="admin-feedback">{updateState.message}</p> : null}
      </form>
      <form action={deleteAction} className="admin-inline-danger-form">
        <input type="hidden" name="id" value={project.id} />
        <button type="submit" className="ghost-button admin-danger-button">Delete Project</button>
      </form>
      {deleteState.message ? <p className="admin-feedback">{deleteState.message}</p> : null}
    </article>
  );
}

export function SkillForm() {
  const [state, formAction] = useActionState(createSkillAction, initialState);

  return (
    <form action={formAction} className="admin-form-card">
      <div className="admin-form-header">
        <h3>Forge Skill Node</h3>
        <p>Add a new specialization and fold it into the progression engine.</p>
      </div>
      <input name="name" placeholder="Skill name" required />
      <input name="category" placeholder="Category" required />
      <textarea name="description" placeholder="Description" rows={4} required />
      <input name="level" placeholder="Level" type="number" min="1" max="99" defaultValue="10" />
      <input name="expValue" placeholder="EXP reward" type="number" min="10" defaultValue="80" />
      <div className="admin-checkbox-row">
        <label><input type="checkbox" name="featured" /> Featured</label>
        <label><input type="checkbox" name="published" defaultChecked /> Published</label>
      </div>
      <SubmitButton label="Add Skill" />
      {state.message ? <p className="admin-feedback">{state.message}</p> : null}
    </form>
  );
}

export function ExperienceForm() {
  const [state, formAction] = useActionState(createExperienceAction, initialState);

  return (
    <form action={formAction} className="admin-form-card">
      <div className="admin-form-header">
        <h3>Log Experience Arc</h3>
        <p>Add a new experience entry that feeds the live portfolio timeline.</p>
      </div>
      <input name="company" placeholder="Company" required />
      <input name="role" placeholder="Role" required />
      <input name="location" placeholder="Location" />
      <input name="startDate" type="date" required />
      <input name="endDate" type="date" />
      <textarea name="summary" placeholder="Summary" rows={3} required />
      <textarea name="highlights" placeholder="Highlights" rows={4} required />
      <input name="expValue" placeholder="EXP reward" type="number" min="10" defaultValue="180" />
      <div className="admin-checkbox-row">
        <label><input type="checkbox" name="published" defaultChecked /> Published</label>
      </div>
      <SubmitButton label="Add Experience" />
      {state.message ? <p className="admin-feedback">{state.message}</p> : null}
    </form>
  );
}

function SkillManagerCard({ skill }) {
  const [updateState, updateAction] = useActionState(updateSkillAction, initialState);
  const [deleteState, deleteAction] = useActionState(deleteSkillAction, initialState);

  return (
    <article className="admin-manager-card">
      <form action={updateAction} className="admin-manager-form">
        <input type="hidden" name="id" value={skill.id} />
        <div className="admin-manager-head">
          <h4>{skill.name}</h4>
          <span>{skill.status}</span>
        </div>
        <input name="name" defaultValue={skill.name} placeholder="Skill name" required />
        <input name="category" defaultValue={skill.category} placeholder="Category" required />
        <textarea name="description" rows={3} defaultValue={skill.description} placeholder="Description" required />
        <input name="level" type="number" min="1" max="99" defaultValue={skill.level} placeholder="Level" />
        <input name="expValue" type="number" min="10" defaultValue={skill.expValue} placeholder="EXP value" />
        <div className="admin-checkbox-row">
          <label><input type="checkbox" name="featured" defaultChecked={skill.featured} /> Featured</label>
          <label><input type="checkbox" name="published" defaultChecked={skill.status === "PUBLISHED"} /> Published</label>
        </div>
        <div className="admin-manager-actions">
          <SubmitButton label="Save Skill" />
        </div>
        {updateState.message ? <p className="admin-feedback">{updateState.message}</p> : null}
      </form>
      <form action={deleteAction} className="admin-inline-danger-form">
        <input type="hidden" name="id" value={skill.id} />
        <button type="submit" className="ghost-button admin-danger-button">Delete Skill</button>
      </form>
      {deleteState.message ? <p className="admin-feedback">{deleteState.message}</p> : null}
    </article>
  );
}

function ExperienceManagerCard({ experience }) {
  const [updateState, updateAction] = useActionState(updateExperienceAction, initialState);
  const [deleteState, deleteAction] = useActionState(deleteExperienceAction, initialState);

  return (
    <article className="admin-manager-card">
      <form action={updateAction} className="admin-manager-form">
        <input type="hidden" name="id" value={experience.id} />
        <div className="admin-manager-head">
          <h4>{experience.company}</h4>
          <span>{experience.status}</span>
        </div>
        <input name="company" defaultValue={experience.company} placeholder="Company" required />
        <input name="role" defaultValue={experience.role} placeholder="Role" required />
        <input name="location" defaultValue={experience.location || ""} placeholder="Location" />
        <input name="startDate" type="date" defaultValue={toDateInputValue(experience.startDate)} required />
        <input name="endDate" type="date" defaultValue={toDateInputValue(experience.endDate)} />
        <textarea name="summary" rows={3} defaultValue={experience.summary} placeholder="Summary" required />
        <textarea name="highlights" rows={4} defaultValue={experience.highlights} placeholder="Highlights" required />
        <input name="expValue" type="number" min="10" defaultValue={experience.expValue} placeholder="EXP value" />
        <div className="admin-checkbox-row">
          <label><input type="checkbox" name="published" defaultChecked={experience.status === "PUBLISHED"} /> Published</label>
        </div>
        <div className="admin-manager-actions">
          <SubmitButton label="Save Experience" />
        </div>
        {updateState.message ? <p className="admin-feedback">{updateState.message}</p> : null}
      </form>
      <form action={deleteAction} className="admin-inline-danger-form">
        <input type="hidden" name="id" value={experience.id} />
        <button type="submit" className="ghost-button admin-danger-button">Delete Experience</button>
      </form>
      {deleteState.message ? <p className="admin-feedback">{deleteState.message}</p> : null}
    </article>
  );
}

export function CertificationForm() {
  const [state, formAction] = useActionState(createCertificationAction, initialState);

  return (
    <form action={formAction} className="admin-form-card">
      <div className="admin-form-header">
        <h3>Register Certification</h3>
        <p>Add a certification with its own EXP value for the leveling engine.</p>
      </div>
      <input name="title" placeholder="Certification title" required />
      <input name="issuer" placeholder="Issuer" required />
      <input name="issueDate" type="date" required />
      <input name="credentialUrl" placeholder="Credential URL" />
      <input name="expValue" placeholder="EXP reward" type="number" min="10" defaultValue="130" />
      <SubmitButton label="Add Certification" />
      {state.message ? <p className="admin-feedback">{state.message}</p> : null}
    </form>
  );
}

function CertificationManagerCard({ certification }) {
  const [updateState, updateAction] = useActionState(updateCertificationAction, initialState);
  const [deleteState, deleteAction] = useActionState(deleteCertificationAction, initialState);

  return (
    <article className="admin-manager-card">
      <form action={updateAction} className="admin-manager-form">
        <input type="hidden" name="id" value={certification.id} />
        <div className="admin-manager-head">
          <h4>{certification.title}</h4>
          <span>{certification.issuer}</span>
        </div>
        <input name="title" defaultValue={certification.title} placeholder="Certification title" required />
        <input name="issuer" defaultValue={certification.issuer} placeholder="Issuer" required />
        <input name="issueDate" type="date" defaultValue={toDateInputValue(certification.issueDate)} required />
        <input name="credentialUrl" defaultValue={certification.credentialUrl || ""} placeholder="Credential URL" />
        <input name="expValue" type="number" min="10" defaultValue={certification.expValue} placeholder="EXP value" />
        <div className="admin-manager-actions">
          <SubmitButton label="Save Certification" />
        </div>
        {updateState.message ? <p className="admin-feedback">{updateState.message}</p> : null}
      </form>
      <form action={deleteAction} className="admin-inline-danger-form">
        <input type="hidden" name="id" value={certification.id} />
        <button type="submit" className="ghost-button admin-danger-button">Delete Certification</button>
      </form>
      {deleteState.message ? <p className="admin-feedback">{deleteState.message}</p> : null}
    </article>
  );
}

export function AchievementForm() {
  const [state, formAction] = useActionState(createAchievementAction, initialState);

  return (
    <form action={formAction} className="admin-form-card">
      <div className="admin-form-header">
        <h3>Register Achievement</h3>
        <p>Add awards and milestones with explicit EXP values.</p>
      </div>
      <input name="title" placeholder="Achievement title" required />
      <textarea name="summary" placeholder="Achievement summary" rows={4} required />
      <input name="awardedBy" placeholder="Awarded by" />
      <input name="awardedAt" type="date" required />
      <input name="expValue" placeholder="EXP reward" type="number" min="10" defaultValue="180" />
      <SubmitButton label="Add Achievement" />
      {state.message ? <p className="admin-feedback">{state.message}</p> : null}
    </form>
  );
}

function AchievementManagerCard({ achievement }) {
  const [updateState, updateAction] = useActionState(updateAchievementAction, initialState);
  const [deleteState, deleteAction] = useActionState(deleteAchievementAction, initialState);

  return (
    <article className="admin-manager-card">
      <form action={updateAction} className="admin-manager-form">
        <input type="hidden" name="id" value={achievement.id} />
        <div className="admin-manager-head">
          <h4>{achievement.title}</h4>
          <span>{achievement.awardedBy || "Award"}</span>
        </div>
        <input name="title" defaultValue={achievement.title} placeholder="Achievement title" required />
        <input name="awardedBy" defaultValue={achievement.awardedBy || ""} placeholder="Awarded by" />
        <input name="awardedAt" type="date" defaultValue={toDateInputValue(achievement.awardedAt)} required />
        <textarea name="summary" rows={4} defaultValue={achievement.summary} placeholder="Achievement summary" required />
        <input name="expValue" type="number" min="10" defaultValue={achievement.expValue} placeholder="EXP value" />
        <div className="admin-manager-actions">
          <SubmitButton label="Save Achievement" />
        </div>
        {updateState.message ? <p className="admin-feedback">{updateState.message}</p> : null}
      </form>
      <form action={deleteAction} className="admin-inline-danger-form">
        <input type="hidden" name="id" value={achievement.id} />
        <button type="submit" className="ghost-button admin-danger-button">Delete Achievement</button>
      </form>
      {deleteState.message ? <p className="admin-feedback">{deleteState.message}</p> : null}
    </article>
  );
}

function toDateInputValue(value) {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
}

export function ProfileForm({ profile }) {
  const [state, formAction] = useActionState(updateProfileAction, initialState);

  return (
    <form action={formAction} className="admin-form-card admin-form-wide">
      <div className="admin-form-header">
        <h3>Profile Core</h3>
        <p>Update the public-facing identity system for the portfolio.</p>
      </div>
      <input name="headline" placeholder="Headline" defaultValue={profile?.headline || ""} required />
      <input name="subheadline" placeholder="Subheadline" defaultValue={profile?.subheadline || ""} required />
      <input name="location" placeholder="Location" defaultValue={profile?.location || ""} />
      <input name="phone" placeholder="Phone" defaultValue={profile?.phone || ""} />
      <input name="email" placeholder="Public email" defaultValue={profile?.email || ""} />
      <input name="githubUrl" placeholder="GitHub URL" defaultValue={profile?.githubUrl || ""} />
      <input name="linkedinUrl" placeholder="LinkedIn URL" defaultValue={profile?.linkedinUrl || ""} />
      <input name="leetcodeUrl" placeholder="LeetCode URL" defaultValue={profile?.leetcodeUrl || ""} />
      <input name="avatarUrl" placeholder="Cloudinary avatar URL" defaultValue={profile?.avatarUrl || ""} />
      <textarea name="bio" placeholder="Bio" rows={6} defaultValue={profile?.bio || ""} required />
      <input name="statsSummary" placeholder="Stats summary" defaultValue={profile?.statsSummary || ""} />
      <SubmitButton label="Update Profile" />
      {state.message ? <p className="admin-feedback">{state.message}</p> : null}
    </form>
  );
}

export function SiteSettingsForm({ settings, projects = [] }) {
  const [state, formAction] = useActionState(updateSiteSettingsAction, initialState);
  const [services, setServices] = useState(() => parseJsonArray(settings?.servicesJson, defaultServiceRows));
  const [quotes, setQuotes] = useState(() => parseLineList(settings?.constellationQuotes, defaultQuoteRows));
  const [layout, setLayout] = useState(() => parseJsonArray(settings?.skillMapLayoutJson, defaultMapLayout));
  const [pinnedSlugs, setPinnedSlugs] = useState(() => parseSlugList(settings?.pinnedProjectSlugs));
  const [draggingProject, setDraggingProject] = useState(null);
  const [draggingService, setDraggingService] = useState(null);

  const availableProjects = useMemo(
    () => projects.filter((project) => !pinnedSlugs.includes(project.slug)),
    [projects, pinnedSlugs]
  );

  function updateService(index, field, value) {
    setServices((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)));
  }

  function updateQuote(index, value) {
    setQuotes((current) => current.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  function updateLayout(index, field, value) {
    setLayout((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)));
  }

  function moveItem(setter, index, direction) {
    setter((current) => {
      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) return current;
      const copy = [...current];
      [copy[index], copy[nextIndex]] = [copy[nextIndex], copy[index]];
      return copy;
    });
  }

  return (
    <form action={formAction} className="admin-form-card admin-form-wide">
      <div className="admin-form-header">
        <h3>V2 CMS Control</h3>
        <p>Control services, quotes, skill-map layout, and pinned project order for the public portfolio.</p>
      </div>
      <input name="siteTitle" placeholder="Site title" defaultValue={settings?.siteTitle || "Monarch Portfolio System"} required />
      <input name="siteDescription" placeholder="Site description" defaultValue={settings?.siteDescription || "Ultra-creative portfolio experience"} required />
      <input name="heroPrimaryCtaLabel" placeholder="Primary CTA label" defaultValue={settings?.heroPrimaryCtaLabel || "Open Quests"} required />
      <input name="heroPrimaryCtaHref" placeholder="Primary CTA href" defaultValue={settings?.heroPrimaryCtaHref || "#quests"} required />
      <input name="heroSecondaryCtaLabel" placeholder="Secondary CTA label" defaultValue={settings?.heroSecondaryCtaLabel || "Summon Contact"} required />
      <input name="heroSecondaryCtaHref" placeholder="Secondary CTA href" defaultValue={settings?.heroSecondaryCtaHref || "#contact"} required />
      <input name="levelLabel" placeholder="Level label" defaultValue={settings?.levelLabel || "S-Rank - Monarch"} required />
      <div className="admin-builder-block">
        <div className="admin-builder-header">
          <h4>Pinned Projects</h4>
          <p>Choose the quest order shown first on the portfolio.</p>
        </div>
        <div className="admin-chip-picker">
          {availableProjects.map((project) => (
            <button
              key={project.slug}
              type="button"
              className="admin-chip-button"
              onClick={() => setPinnedSlugs((current) => [...current, project.slug])}
            >
              Add {project.title}
            </button>
          ))}
        </div>
        <div className="admin-sort-list">
          {pinnedSlugs.map((slug, index) => {
            const project = projects.find((item) => item.slug === slug);
            return (
              <article
                key={slug}
                className={`admin-sort-item ${draggingProject === slug ? "admin-dragging" : ""}`}
                draggable
                onDragStart={() => setDraggingProject(slug)}
                onDragEnd={() => setDraggingProject(null)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => {
                  if (!draggingProject || draggingProject === slug) return;
                  const fromIndex = pinnedSlugs.indexOf(draggingProject);
                  const toIndex = pinnedSlugs.indexOf(slug);
                  setPinnedSlugs((current) => reorderList(current, fromIndex, toIndex));
                  setDraggingProject(null);
                }}
              >
                <div>
                  <strong>{project?.title || slug}</strong>
                  <span>{slug}</span>
                </div>
                <div className="admin-sort-actions">
                  <button type="button" className="admin-drag-handle">Drag</button>
                  <button type="button" onClick={() => moveItem(setPinnedSlugs, index, -1)}>Up</button>
                  <button type="button" onClick={() => moveItem(setPinnedSlugs, index, 1)}>Down</button>
                  <button type="button" onClick={() => setPinnedSlugs((current) => current.filter((item) => item !== slug))}>Remove</button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="admin-builder-block">
        <div className="admin-builder-header">
          <h4>Constellation Quotes</h4>
          <p>These rotate in the map before a domain is selected.</p>
        </div>
        <div className="admin-stack-list">
          {quotes.map((quote, index) => (
            <article key={`quote-${index}`} className="admin-stack-card">
              <textarea rows={3} value={quote} onChange={(event) => updateQuote(index, event.target.value)} />
              <div className="admin-sort-actions">
                <button type="button" onClick={() => moveItem(setQuotes, index, -1)}>Up</button>
                <button type="button" onClick={() => moveItem(setQuotes, index, 1)}>Down</button>
                <button type="button" onClick={() => setQuotes((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Delete</button>
              </div>
            </article>
          ))}
        </div>
        <button type="button" className="admin-chip-button" onClick={() => setQuotes((current) => [...current, "New quote"])}>
          Add Quote
        </button>
      </div>

      <div className="admin-builder-block">
        <div className="admin-builder-header">
          <h4>Services</h4>
          <p>Editable cards for the service section.</p>
        </div>
        <div className="admin-stack-list">
          {services.map((service, index) => (
            <article
              key={`service-${index}`}
              className={`admin-stack-card ${draggingService === index ? "admin-dragging" : ""}`}
              draggable
              onDragStart={() => setDraggingService(index)}
              onDragEnd={() => setDraggingService(null)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => {
                if (draggingService === null || draggingService === index) return;
                setServices((current) => reorderList(current, draggingService, index));
                setDraggingService(null);
              }}
            >
              <input value={service.title} onChange={(event) => updateService(index, "title", event.target.value)} placeholder="Service title" />
              <textarea rows={3} value={service.summary} onChange={(event) => updateService(index, "summary", event.target.value)} placeholder="Service summary" />
              <div className="admin-sort-actions">
                <button type="button" className="admin-drag-handle">Drag</button>
                <button type="button" onClick={() => moveItem(setServices, index, -1)}>Up</button>
                <button type="button" onClick={() => moveItem(setServices, index, 1)}>Down</button>
                <button type="button" onClick={() => setServices((current) => current.filter((_, itemIndex) => itemIndex !== index))}>Delete</button>
              </div>
            </article>
          ))}
        </div>
        <button
          type="button"
          className="admin-chip-button"
          onClick={() => setServices((current) => [...current, { title: "New Service", summary: "Describe this service." }])}
        >
          Add Service
        </button>
      </div>

      <div className="admin-builder-block">
        <div className="admin-builder-header">
          <h4>Skill Map Positions</h4>
          <p>Adjust the visible slot positions for active domain skills.</p>
        </div>
        <MapLayoutEditor layout={layout} setLayout={setLayout} />
        <div className="admin-layout-grid-builder">
          {layout.map((item, index) => (
            <article key={`slot-${index}`} className="admin-layout-slot">
              <strong>Slot {index + 1}</strong>
              <input value={item.top} onChange={(event) => updateLayout(index, "top", event.target.value)} placeholder="top %" />
              <input value={item.left} onChange={(event) => updateLayout(index, "left", event.target.value)} placeholder="left %" />
            </article>
          ))}
        </div>
      </div>

      <input type="hidden" name="pinnedProjectSlugs" value={pinnedSlugs.join(", ")} />
      <input type="hidden" name="constellationQuotes" value={quotes.map((item) => item.trim()).filter(Boolean).join("\n")} />
      <input type="hidden" name="servicesJson" value={JSON.stringify(services)} />
      <input type="hidden" name="skillMapLayoutJson" value={JSON.stringify(layout)} />
      <SubmitButton label="Update V2 Settings" />
      {state.message ? <p className="admin-feedback">{state.message}</p> : null}
    </form>
  );
}

export function ProjectManager({ projects = [] }) {
  return (
    <section className="admin-form-card admin-form-wide">
      <div className="admin-form-header">
        <h3>Manage Projects</h3>
        <p>Edit or delete existing projects directly from the CMS.</p>
      </div>
      <div className="admin-manager-list">
        {projects.map((project) => (
          <ProjectManagerCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export function SkillManager({ skills = [] }) {
  return (
    <section className="admin-form-card admin-form-wide">
      <div className="admin-form-header">
        <h3>Manage Skills</h3>
        <p>Edit or delete existing skill nodes directly from the CMS.</p>
      </div>
      <div className="admin-manager-list">
        {skills.map((skill) => (
          <SkillManagerCard key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
}

export function ExperienceManager({ experiences = [] }) {
  return (
    <section className="admin-form-card admin-form-wide">
      <div className="admin-form-header">
        <h3>Manage Experience</h3>
        <p>Edit or delete timeline entries directly from the CMS.</p>
      </div>
      <div className="admin-manager-list">
        {experiences.map((experience) => (
          <ExperienceManagerCard key={experience.id} experience={experience} />
        ))}
      </div>
    </section>
  );
}

export function CertificationManager({ certifications = [] }) {
  return (
    <section className="admin-form-card admin-form-wide">
      <div className="admin-form-header">
        <h3>Manage Certifications</h3>
        <p>Edit or delete certification records directly from the CMS.</p>
      </div>
      <div className="admin-manager-list">
        {certifications.map((certification) => (
          <CertificationManagerCard key={certification.id} certification={certification} />
        ))}
      </div>
    </section>
  );
}

export function AchievementManager({ achievements = [] }) {
  return (
    <section className="admin-form-card admin-form-wide">
      <div className="admin-form-header">
        <h3>Manage Achievements</h3>
        <p>Edit or delete achievements directly from the CMS.</p>
      </div>
      <div className="admin-manager-list">
        {achievements.map((achievement) => (
          <AchievementManagerCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </section>
  );
}
