
"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Skill = {
  id: number;
  name: string;
  level: string;
};

type Project = {
  id: number;
  name: string;
  description: string;
  technology: string;
};

type Student = {
  name: string;
  college: string;
  degree: string;
  year: string;
  bio: string;
  skills: Skill[];
  projects: Project[];
  is_public: boolean;
};

function PublicPortfolioContent() {
  const params = useParams();
  const id = params.id as string;

  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPortfolio() {
      const { data, error } = await supabase
        .from("student_profiles")
        .select("name, college, degree, year, bio, skills, projects, is_public")
        .eq("id", id)
        .eq("is_public", true)
        .maybeSingle();

      if (error) {
        console.error("Portfolio loading failed:", error.message);
      }

      setStudent(data as Student | null);
      setLoading(false);
    }

    loadPortfolio();
  }, [id]);

  if (loading) {
    return <main className="min-h-screen p-10">Loading portfolio...</main>;
  }

  if (!student) {
    return (
      <main className="min-h-screen p-10 text-center">
        <h1 className="text-3xl font-bold">Portfolio Not Found</h1>
        <p className="mt-3 text-slate-600">
          This portfolio is unavailable or private.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <p className="font-semibold text-cyan-400">SKILLPROOF AI</p>

        <section className="mt-8 rounded-2xl bg-slate-900 p-8">
          <h1 className="text-4xl font-bold">{student.name}</h1>

          <p className="mt-3 text-slate-300">
            {student.degree} | {student.year}
          </p>

          <p className="mt-1 text-slate-400">{student.college}</p>

          <p className="mt-6 leading-7 text-slate-300">
            {student.bio}
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">My Skills</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {student.skills?.map((skill) => (
              <div key={skill.id} className="rounded-xl bg-slate-900 p-5">
                <h3 className="font-bold">{skill.name}</h3>
                <p className="mt-2 text-cyan-400">{skill.level}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold">My Projects</h2>

          <div className="mt-4 grid gap-4">
            {student.projects?.map((project) => (
              <div key={project.id} className="rounded-xl bg-slate-900 p-5">
                <h3 className="text-xl font-bold">{project.name}</h3>
                <p className="mt-3 text-slate-300">
                  {project.description}
                </p>
                <p className="mt-3 text-sm text-cyan-400">
                  {project.technology}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="mt-12 border-t border-slate-700 pt-6 text-center text-sm text-slate-400">
          Skills deserve to be demonstrated, not just described.
          <p className="mt-2">Powered by SkillProof AI</p>
        </footer>
      </div>
    </main>
  );
}
export default function PublicPortfolio() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen p-10">
          Loading portfolio...
        </main>
      }
    >
      <PublicPortfolioContent />
    </Suspense>
  );
}