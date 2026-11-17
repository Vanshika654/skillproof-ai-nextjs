
"use client";

import { useState } from "react";

export default function Home() {
  const [role, setRole] = useState("Student");

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <nav className="flex items-center justify-between border-b border-slate-200 px-6 py-5 md:px-12">
        <a href="#" className="text-2xl font-bold tracking-tight">
          SkillProof<span className="text-blue-600"> AI</span>
        </a>

        <div className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#how-it-works" className="hover:text-blue-600">How it works</a>
          <a href="#for-everyone" className="hover:text-blue-600">Who it's for</a>
        </div>

        <button
          onClick={() => document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth" })}
          className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Get started →
        </button>
      </nav>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:px-12 md:py-28">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            Your skills deserve to be seen
          </div>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-6xl">
            Prove your skills.
            <span className="block text-blue-600">Build your future.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Turn your projects, assessments, and achievements into a clear
            picture of what you can do. Give your skills a stronger voice
            than a resume alone.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById("get-started")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-100 hover:bg-blue-700"
            >
              Build your profile →
            </button>
            <button
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="rounded-xl border border-slate-300 px-6 py-4 font-semibold hover:bg-slate-50"
            >
              Explore how it works
            </button>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            For students · Recruiters · Colleges
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-2xl shadow-slate-200/60 md:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">STUDENT SNAPSHOT</p>
              <h2 className="mt-1 text-xl font-bold">Your skills, in one place</h2>
            </div>
            <div className="rounded-2xl bg-blue-100 p-3 text-2xl">✦</div>
          </div>

          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-xl font-bold text-blue-700">
                S
              </div>
              <div>
                <h3 className="font-bold">Student Portfolio</h3>
                <p className="text-sm text-slate-500">Your learning journey, organized</p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">Python</span>
                  <span className="text-slate-500">Learning progress</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-3/4 rounded-full bg-blue-600" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">Web Development</span>
                  <span className="text-slate-500">Learning progress</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-1/2 rounded-full bg-indigo-500" />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">Problem Solving</span>
                  <span className="text-slate-500">Learning progress</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 w-2/3 rounded-full bg-violet-500" />
                </div>
              </div>
            </div>
            <p className="mt-5 text-xs text-slate-400">
              Illustrative preview — sample progress, not verified results.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-blue-600 p-4 text-white">
              <p className="text-sm text-blue-100">Your work</p>
              <p className="mt-2 text-xl font-bold">Projects</p>
              <p className="mt-1 text-sm text-blue-100">Show what you build</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm text-slate-500">Your next step</p>
              <p className="mt-2 text-xl font-bold">Keep growing</p>
              <p className="mt-1 text-sm text-slate-500">Track skills you develop</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-y border-slate-100 bg-slate-50 px-6 py-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-semibold text-blue-600">ONE SKILL PROFILE</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              More than a list of skills
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Bring your learning, practical work, and goals together in one place.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { icon: "◈", title: "Skill assessments", text: "Practice questions and reflect on your current skill level." },
              { icon: "⌘", title: "Project evidence", text: "Organize projects, certificates, links, and descriptions of your work." },
              { icon: "↗", title: "Growth roadmap", text: "Identify learning goals and plan useful next steps." },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl text-blue-700">
                  {item.icon}
                </div>
                <h3 className="mt-5 text-xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <h2 className="text-3xl font-bold">A clearer path from learning to opportunity</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            ["01", "Create your profile", "Add the skills you're learning and the goals you want to reach."],
            ["02", "Show your evidence", "Bring together your projects, assessment results, and achievements."],
            ["03", "Share your progress", "Build a portfolio you can use when exploring opportunities."],
          ].map(([number, title, text]) => (
            <div key={number} className="border-l-2 border-blue-600 pl-5">
              <p className="font-bold text-blue-600">{number}</p>
              <h3 className="mt-3 text-xl font-bold">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="for-everyone" className="bg-slate-900 px-6 py-16 text-white md:px-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold">Built for the people shaping careers</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              ["Students", "Showcase practical work and plan your next learning steps."],
              ["Recruiters", "Explore candidate profiles and the evidence they choose to share."],
              ["Colleges", "Help students organize their development and career preparation."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="get-started" className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="font-semibold text-blue-600">YOUR NEXT CHAPTER STARTS HERE</p>
        <h2 className="mt-4 text-3xl font-bold md:text-4xl">What brings you to SkillProof AI?</h2>
        <p className="mt-4 text-slate-600">Choose a role to preview your next step.</p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {["Student", "Recruiter", "College"].map((item) => (
            <button
              key={item}
              onClick={() => setRole(item)}
              className={`rounded-xl border px-5 py-3 font-medium ${
                role === item
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-slate-300 bg-white hover:bg-slate-50"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-lg font-semibold">{role} experience</p>
          <p className="mt-2 text-slate-600">
            {role === "Student" && "Build your skills profile, collect project evidence, and plan your learning."}
            {role === "Recruiter" && "Review shared candidate profiles and explore their submitted evidence."}
            {role === "College" && "Support student skill development and career-readiness activities."}
          </p>
          <p className="mt-4 text-sm text-slate-500">
            Account creation and these role-specific workspaces will be added in upcoming development steps.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200 px-6 py-7 text-center text-sm text-slate-500">
        © 2026 SkillProof AI · Skills supported by evidence.
      </footer>
    </main>
  );
}
