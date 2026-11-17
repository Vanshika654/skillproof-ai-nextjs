
export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-8">
      <div className="max-w-xl rounded-2xl border bg-white p-10 text-center shadow-sm">
        <h1 className="text-4xl font-bold text-blue-700">
          SkillProof AI
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Prove your skills. Showcase your projects. Build your future.
        </p>
        <a
          href="/dashboard"
          className="mt-8 inline-block rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Open Dashboard
        </a>
      </div>
    </main>
  );
}
