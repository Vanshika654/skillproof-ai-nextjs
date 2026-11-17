
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
type Profile = {
  name?: string;
  college?: string;
  degree?: string;
  year?: string;
  bio?: string;
  photo?: string;
};

type Project = {
title?: string;
name?: string;
description?: string;
technologies?: string;
techStack?: string;
link?: string;
};
type AssessmentResult = {
skill: string;
score: number;
total: number;
date: string;
status?: string;
};

export default function PortfolioPage() {
const [profile, setProfile] = useState<Profile>({});
const [skills, setSkills] = useState<string[]>([]);
const [projects, setProjects] = useState<Project[]>([]);
const [assessment, setAssessment] =
useState<AssessmentResult | null>(null);
const [assessmentHistory, setAssessmentHistory] =
useState<AssessmentResult[]>([]);
const [loaded, setLoaded] = useState(false);
const completionFields = [
  profile.name,
  profile.college,
  profile.degree,
  profile.year,
  profile.bio,
  profile.photo,
];

const completedFields = completionFields.filter(
  (field) => field && field.trim() !== ""
).length;

const profileCompletion = Math.round(
  (completedFields / completionFields.length) * 100
);

useEffect(() => {
    try {
    const savedProfile = localStorage.getItem("skillproof-profile");
    const savedSkills = localStorage.getItem("skillproof-skills");
    const savedProjects = localStorage.getItem("skillproof-projects");
    const savedAssessment = localStorage.getItem("skillproof-assessment");
    const savedAssessmentHistory = localStorage.getItem(
    "skillproof-assessment-history"
);

    if (savedProfile) setProfile(JSON.parse(savedProfile));
    if (savedAssessment) {
setAssessment(JSON.parse(savedAssessment));
}
if (savedAssessmentHistory) {
const parsedHistory = JSON.parse(savedAssessmentHistory);

if (Array.isArray(parsedHistory)) {
    setAssessmentHistory(parsedHistory);
}
}

    if (savedSkills) {
        const parsed = JSON.parse(savedSkills);
        setSkills(
        Array.isArray(parsed)
            ? parsed.map((item) =>
                typeof item === "string"
                ? item
                : item.name ?? item.title ?? item.skill ?? ""
            ).filter(Boolean)
            : []
        );
    }

    if (savedProjects) {
        const parsed = JSON.parse(savedProjects);
        setProjects(Array.isArray(parsed) ? parsed : []);
    }
    } catch (error) {
    console.error("Could not load portfolio data:", error);
    } finally {
    setLoaded(true);
    }
}, []);
const totalAssessments = assessmentHistory.length;

const latestAssessment =
assessmentHistory.length > 0
    ? assessmentHistory[assessmentHistory.length - 1]
    : assessment;

const bestAssessment =
assessmentHistory.length > 0
    ? assessmentHistory.reduce((best, current) =>
        current.score > best.score ? current : best
    )
    : assessment;
if (!loaded) {
    return <main className="min-h-screen p-8">Loading portfolio...</main>;
}

return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white sm:px-10 print:bg-white print:text-black print:p-0">
    <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            SkillProof AI
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Student Portfolio
            </h1>
        </div>
       <div className="flex flex-wrap gap-3 print:hidden">
<Link
    href="/dashboard"
    className="rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold transition hover:bg-slate-800"
>
    ← Back to Dashboard
</Link>

<button
    onClick={() => window.print()}
    className="rounded-xl border border-slate-600 px-5 py-3 text-sm font-semibold transition hover:bg-slate-800 print:hidden"
>
    Print / Save PDF
</button>
<button
  onClick={async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Portfolio link copied!");
  }}
  className="rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
>
  Share Portfolio
</button>
<div className="flex flex-wrap gap-3 print:hidden">

</div>
</div>
        </header>

        <section className="rounded-3xl border border-slate-700 bg-slate-900 p-7 sm:p-10">
        {profile.photo ? (
  <img
    src={profile.photo}
    alt="Student Profile"
    className="h-20 w-20 rounded-2xl object-cover"
  />
) : (
  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-cyan-400 text-2xl font-bold text-slate-950">
    {(profile.name || "S").trim().charAt(0).toUpperCase()}
  </div>
)}
<div className="mt-6">
  <div className="mb-2 flex justify-between">
    <span className="font-semibold text-slate-300">
      Profile Completion
    </span>
    <span className="font-bold text-cyan-400">
      {profileCompletion}%
    </span>
  </div>

  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-700">
    <div
      className="h-full rounded-full bg-cyan-400 transition-all duration-500"
      style={{ width: `${profileCompletion}%` }}
    />
  </div>
</div>

        <h2 className="mt-5 text-3xl font-bold">
            {profile.name || "Your Name"}
        </h2>

        <p className="mt-2 text-slate-300">
            {[profile.degree, profile.year, profile.college]
            .filter(Boolean)
            .join(" • ") || "Add your education details in the dashboard"}
        </p>

        <p className="mt-5 max-w-2xl leading-7 text-slate-300">
            {profile.bio || "Your introduction will appear here. Add a short bio in your dashboard."}
        </p>
        </section>
<section className="mt-10">
<h2 className="text-2xl font-bold">Skill Evidence Summary</h2>

<p className="mt-1 text-sm text-slate-400">
    A quick overview of your assessment performance
</p>

<div className="mt-4 grid gap-4 sm:grid-cols-3">
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
    <p className="text-sm text-slate-400">Total Assessments</p>
    <p className="mt-2 text-3xl font-bold text-cyan-400">
        {totalAssessments}
    </p>
    </div>

    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
    <p className="text-sm text-slate-400">Latest Score</p>
    <p className="mt-2 text-3xl font-bold text-cyan-400">
        {latestAssessment
        ? `${latestAssessment.score} / ${latestAssessment.total}`
        : "No assessment"}
    </p>
    </div>

    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
    <p className="text-sm text-slate-400">Best Score</p>
    <p className="mt-2 text-3xl font-bold text-cyan-400">
        {bestAssessment
        ? `${bestAssessment.score} / ${bestAssessment.total}`
        : "No assessment"}
    </p>
    </div>
</div>
</section>
        <section className="mt-8">
        <h2 className="text-2xl font-bold">Skills</h2>
        <p className="mt-1 text-sm text-slate-400">
            Skills added to your SkillProof profile
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
            {skills.length > 0 ? (
            skills.map((skill, index) => (
                <span
                key={`${skill}-${index}`}
                className="rounded-full border border-cyan-800 bg-cyan-950 px-4 py-2 text-sm text-cyan-200"
                >
                {skill}
                </span>
            ))
            ) : (
            <p className="text-slate-400">No skills added yet.</p>
            )}
        </div>
        </section>
        <section className="mt-10">
<h2 className="text-2xl font-bold">Assessment Evidence</h2>

<p className="mt-1 text-sm text-slate-400">
    A record of completed SkillProof assessments
</p>

{assessmentHistory.length > 0 ? (
    <div className="mt-4 space-y-4">
    {assessmentHistory.map((item, index) => (
        <div
        key={index}
        className="rounded-2xl border border-cyan-800 bg-slate-900 p-6"
        >
        <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
            <h3 className="text-lg font-semibold">
                {item.skill}
            </h3>
            <span
  className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-bold ${
    item.status === "Verified"
      ? "bg-green-100 text-green-800"
      : item.status === "Developing"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800"
  }`}
>
  {item.status || "Not Rated"}
</span>

            <p className="mt-1 text-sm text-slate-400">
                Completed: {item.date}
            </p>
            </div>

            <div className="rounded-xl bg-cyan-400 px-5 py-3 text-center text-slate-950">
            <p className="text-xs font-semibold uppercase">
                Score
            </p>

            <p className="text-xl font-bold">
                {item.score} / {item.total}
            </p>
            </div>
        </div>
        </div>
    ))}
    </div>
) : assessment ? (
    <div className="mt-4 rounded-2xl border border-cyan-800 bg-slate-900 p-6">
    <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
        <h3 className="text-lg font-semibold">
            {assessment.skill}
        </h3>

        <p className="mt-1 text-sm text-slate-400">
            Skill assessment completed
        </p>
        </div>

        <div className="rounded-xl bg-cyan-400 px-5 py-3 text-center text-slate-950">
        <p className="text-xs font-semibold uppercase">
            Score
        </p>

        <p className="text-xl font-bold">
            {assessment.score} / {assessment.total}
        </p>
        </div>
    </div>
    </div>
) : (
    <p className="mt-4 text-slate-400">
    No assessment evidence available yet.
    </p>
)}
</section>

        <section className="mt-10">
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="mt-1 text-sm text-slate-400">
            Practical work showcased in one place
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {projects.length > 0 ? (
            projects.map((project, index) => (
                <article
                key={index}
                className="rounded-2xl border border-slate-700 bg-slate-900 p-6"
                >
                <h3 className="text-lg font-semibold">
                    {project.title || project.name || `Project ${index + 1}`}
                </h3>

                <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-300">
                    {project.description || "No project description added yet."}
                </p>

                {(project.technologies || project.techStack) && (
                    <p className="mt-4 text-sm text-cyan-300">
                    {project.technologies || project.techStack}
                    </p>
                )}

                {project.link && (
                    <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-sm font-semibold text-cyan-400 underline"
                    >
                    View project
                    </a>
                )}
                </article>
            ))
            ) : (
            <p className="text-slate-400">No projects added yet.</p>
            )}
        </div>
        </section>

        <footer className="mt-12 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
        Built with SkillProof AI · Skills deserve to be demonstrated, not just described.
        </footer>
    </div>
    </main>
);
}
