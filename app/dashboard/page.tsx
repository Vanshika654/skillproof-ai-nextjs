
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
type StudentProfile = {
  name: string;
  college: string;
  degree: string;
  year: string;
  bio: string;
  photo?: string;
};
type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};
type AssessmentResult = {
  skill: string;
  score: number;
  total: number;
  date: string;
  status: string;
};


export default function Dashboard() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [isCloudProfileLoaded, setIsCloudProfileLoaded] = useState(false);
  useEffect(() => {
  async function checkUser() {
    const { data, error } = await supabase.auth.getUser();

    if (error || !data.user) {
  router.replace("/login");
  return;
}

setUserId(data.user.id);
  }

  checkUser();
}, [router]);
  useEffect(() => {
  async function testSupabaseConnection() {
    const { data, error } = await supabase
      .from("connection_test")
      .select("*");

    if (error) {
      console.error("Supabase connection failed:", error.message);
    } else {
      console.log("Supabase connected successfully:", data);
    }
  }

  testSupabaseConnection();
}, []);
  
  const assessmentQuestions: Record<string, Question[]> = {
  "Python Basics": [
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["func", "define", "def", "function"],
      correctAnswer: "def",
    },
    {
      question: "Which data type stores multiple values in an ordered sequence?",
      options: ["List", "Integer", "Boolean", "Float"],
      correctAnswer: "List",
    },
    {
      question: "What is the output type of len('Hello')?",
      options: ["String", "Integer", "Float", "Boolean"],
      correctAnswer: "Integer",
    },
  ],

  "C++ Basics": [
    {
      question: "Which symbol is commonly used to end a statement in C++?",
      options: [".", ";", ":", ","],
      correctAnswer: ";",
    },
    {
      question: "Which keyword is used to declare an integer variable in C++?",
      options: ["integer", "int", "number", "var"],
      correctAnswer: "int",
    },
    {
      question: "Which operator is used to output text in C++?",
      options: ["<<", ">>", "==", "&&"],
      correctAnswer: "<<",
    },
  ],

  "HTML & CSS Basics": [
    {
      question: "Which HTML tag is used for the largest heading?",
      options: ["<heading>", "<h6>", "<h1>", "<head>"],
      correctAnswer: "<h1>",
    },
    {
      question: "Which CSS property changes the text color?",
      options: ["font-color", "text-color", "color", "background"],
      correctAnswer: "color",
    },
    {
      question: "Which HTML tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correctAnswer: "<a>",
    },
  ],
};

  
  const [activeTab, setActiveTab] = useState("Overview");

  const [skills, setSkills] = useState<Skill[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState("Python Basics");
  const questions =
  assessmentQuestions[selectedSkill] || [];
const [assessmentSubmitted, setAssessmentSubmitted] = useState(false);
const [assessmentResult, setAssessmentResult] =
  useState<AssessmentResult | null>(null);
  const [assessmentHistory, setAssessmentHistory] =
  useState<AssessmentResult[]>([]);
const score = assessmentSubmitted
  ? answers.reduce((total, answer, index) => {
      return total + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0)
  : 0;
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [profile, setProfile] = useState<StudentProfile>({
  name: "",
  college: "",
  degree: "",
  year: "",
  bio: "",
});
const skillProgress = ["Python Basics", "C++ Basics", "HTML & CSS Basics"].map(
  (skill) => {
    const records = assessmentHistory
      .filter((item) => item.skill === skill)
      .sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

    const latest = records[0];
    const previous = records[1];

    return {
      skill,
      latestScore: latest
        ? Math.round((latest.score / latest.total) * 100)
        : 0,
      previousScore: previous
        ? Math.round((previous.score / previous.total) * 100)
        : 0,
      improvement:
        latest && previous
          ? Math.round(
              (latest.score / latest.total) * 100 -
              (previous.score / previous.total) * 100
            )
          : null,
    };
  }
);
const achievements = [
  {
    title: "First Assessment",
    description: "Completed your first skill assessment.",
    earned: assessmentHistory.length >= 1,
    icon: "🏆",
  },
  {
    title: "Python Performer",
    description: "Scored 80% or above in Python Basics.",
    earned: assessmentHistory.some(
      (item) =>
        item.skill === "Python Basics" &&
        item.total > 0 &&
        (item.score / item.total) * 100 >= 80
    ),
    icon: "🐍",
  },
  {
    title: "C++ Explorer",
    description: "Scored 80% or above in C++ Basics.",
    earned: assessmentHistory.some(
      (item) =>
        item.skill === "C++ Basics" &&
        item.total > 0 &&
        (item.score / item.total) * 100 >= 80
    ),
    icon: "💻",
  },
  {
    title: "Web Developer",
    description: "Scored 80% or above in HTML & CSS Basics.",
    earned: assessmentHistory.some(
      (item) =>
        item.skill === "HTML & CSS Basics" &&
        item.total > 0 &&
        (item.score / item.total) * 100 >= 80
    ),
    icon: "🌐",
  },
  {
    title: "Consistent Learner",
    description: "Completed five or more assessments.",
    earned: assessmentHistory.length >= 5,
    icon: "🚀",
  },
];
const leaderboardData = [
  {
    name: "Aarav Sharma",
    score: 95,
  },
  {
    name: "Priya Verma",
    score: 90,
  },
  {
    name: "Rahul Singh",
    score: 85,
  },
  {
    name: "Ananya Gupta",
    score: 80,
  },
  {
    name: "Your Score",
    score:
      assessmentHistory.length > 0
        ? Math.round(
            (assessmentHistory.reduce(
              (total, item) => total + item.score / item.total,
              0
            ) /
              assessmentHistory.length) *
              100
          )
        : 0,
  },
];

const rankedStudents = [...leaderboardData].sort(
  (a, b) => b.score - a.score
);
  useEffect(() => {
  try {
    const savedSkills = localStorage.getItem("skillproof-skills");
    const savedProjects = localStorage.getItem("skillproof-projects");
    const savedProfile = localStorage.getItem("skillproof-profile");
    const savedAssessment = localStorage.getItem("skillproof-assessment");
    const savedAssessmentHistory = localStorage.getItem(
  "skillproof-assessment-history"
);
if (savedAssessmentHistory) {
  setAssessmentHistory(JSON.parse(savedAssessmentHistory));
}
if (savedProfile) {
  setProfile(JSON.parse(savedProfile));
}
if (savedAssessment) {
  const parsedAssessment = JSON.parse(savedAssessment);

  const assessmentWithDate: AssessmentResult = {
  skill: parsedAssessment.skill,
  score: parsedAssessment.score,
  total: parsedAssessment.total,
  date: parsedAssessment.date || new Date().toLocaleDateString(),
  status: parsedAssessment.status || getPerformanceStatus(
    parsedAssessment.score,
    parsedAssessment.total
  ),
};

  setAssessmentResult(assessmentWithDate);
  setAssessmentHistory([assessmentWithDate]);
  setAssessmentSubmitted(true);
}
if (savedAssessmentHistory) {
  const parsedHistory = JSON.parse(savedAssessmentHistory);

  if (Array.isArray(parsedHistory)) {
    setAssessmentHistory(parsedHistory);
  }
}
    if (savedSkills) {
      setSkills(JSON.parse(savedSkills));
    }

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    }
  } catch (error) {
    console.error("Error loading saved data:", error);
  } finally {
    setIsLoaded(true);
  }
}, []);
useEffect(() => {
  if (!userId) return;

  async function loadCloudProfile() {
    const { data, error } = await supabase
      .from("student_profiles")
      .select("name, college, degree, year, bio")
      .eq("user_id", userId)
      .maybeSingle();

    if (error) {
      console.error("Profile loading failed:", error.message);
      return;
    }

    if (data) {
      setProfile((previous) => ({
        ...previous,
        name: data.name || "",
        college: data.college || "",
        degree: data.degree || "",
        year: data.year || "",
        bio: data.bio || "",
      }));
    }

    setIsCloudProfileLoaded(true);
  }

  loadCloudProfile();
}, [userId]);
useEffect(() => {
  if (!isLoaded) return;

  localStorage.setItem(
    "skillproof-skills",
    JSON.stringify(skills)
  );
}, [skills, isLoaded]);
useEffect(() => {
  if (!isLoaded) return;

  localStorage.setItem(
    "skillproof-projects",
    JSON.stringify(projects)
  );
}, [projects, isLoaded]);

useEffect(() => {
  if (!isLoaded) return;

  localStorage.setItem(
    "skillproof-profile",
    JSON.stringify(profile)
  );
}, [profile, isLoaded]);
useEffect(() => {
  if (!isLoaded || !userId || !isCloudProfileLoaded) return;

  async function saveProfile() {
    const { error } = await supabase
      .from("student_profiles")
      .upsert(
        {
          user_id: userId,
          name: profile.name,
          college: profile.college,
          degree: profile.degree,
          year: profile.year,
          bio: profile.bio,
          skills: skills,
projects: projects,
        },
        { onConflict: "user_id" }
      );

    if (error) {
      console.error("Profile save failed:", error.message);
    } else {
      console.log("Profile saved to Supabase!");
    }
  }

  saveProfile();
},  [profile, skills, projects, userId, isLoaded, isCloudProfileLoaded]);
useEffect(() => {
  if (!isLoaded) return;

  if (assessmentResult) {
    localStorage.setItem(
      "skillproof-assessment",
      JSON.stringify(assessmentResult)
    );
  }
}, [assessmentResult, isLoaded]);
useEffect(() => {
  if (!isLoaded) return;

  localStorage.setItem(
    "skillproof-assessment-history",
    JSON.stringify(assessmentHistory)
  );
}, [assessmentHistory, isLoaded]);
const [projectName, setProjectName] = useState("");
const [projectDescription, setProjectDescription] = useState("");
const [projectTechnology, setProjectTechnology] = useState("");
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [message, setMessage] = useState("");

  function addSkill() {
    const name = skillName.trim();

    if (!name) {
      setMessage("Please enter a skill name.");
      return;
    }

    if (
      skills.some(
        (skill) => skill.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      setMessage("This skill is already added.");
      return;
    }

    setSkills([
      ...skills,
      {
        id: Date.now(),
        name,
        level: skillLevel,
      },
    ]);

    setSkillName("");
    setSkillLevel("Beginner");
    setMessage("Skill added successfully!");
  }
  function getPerformanceStatus(score: number, total: number) {
  const percentage = (score / total) * 100;

  if (percentage >= 80) {
    return "Verified";
  }

  if (percentage >= 50) {
    return "Developing";
  }

  return "Needs Improvement";
}


  function removeSkill(id: number) {
    setSkills(skills.filter((skill) => skill.id !== id));
    setMessage("Skill removed.");
  }

  const tabs = [
  "Overview",
  "My Skills",
  "Projects",
  "Learning",
  "Profile",
  "Assessment",
];
  
function addProject() {
  if (
    !projectName.trim() ||
    !projectDescription.trim() ||
    !projectTechnology.trim()
  ) {
    return;
  }

  const newProject: Project = {
    id: Date.now(),
    name: projectName.trim(),
    description: projectDescription.trim(),
    technology: projectTechnology.trim(),
  };

  setProjects((previous) => [...previous, newProject]);
  setProjectName("");
  setProjectDescription("");
  setProjectTechnology("");
}


  return (
    <main className="min-h-screen bg-slate-50 p-6 text-slate-800 sm:p-10">
      <div className="mx-auto max-w-5xl">
        
<div className="flex flex-wrap items-center justify-between gap-4">
  <div>
    <p className="text-sm font-semibold text-blue-700">
      SKILLPROOF AI
    </p>

    <h1 className="mt-2 text-3xl font-bold">
      Student Dashboard
    </h1>
  </div>

  <button
    onClick={async () => {
      const { error } = await supabase.auth.signOut();

      if (error) {
        alert(error.message);
      } else {
        router.replace("/login");
      }
    }}
    className="rounded-xl bg-red-500 px-5 py-3 font-semibold text-white hover:bg-red-600"
  >
    Logout
  </button>
</div>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
  <h2 className="text-xl font-bold text-slate-800">
    Skill Progress Tracking
  </h2>

  <p className="mt-1 text-sm text-slate-500">
    Track your assessment performance over time.
  </p>

  <div className="mt-6 space-y-6">
    {skillProgress.map((item) => (
      <div key={item.skill}>
        <div className="flex flex-wrap justify-between gap-2">
          <h3 className="font-semibold">{item.skill}</h3>
          <span className="font-bold text-blue-700">
            {item.latestScore}%
          </span>
        </div>

        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-blue-600"
            style={{ width: `${item.latestScore}%` }}
          />
        </div>

        <p className="mt-2 text-sm text-slate-500">
          {item.improvement === null
            ? "Complete another assessment to track improvement."
            : item.improvement > 0
            ? `Improved by ${item.improvement} percentage points.`
            : item.improvement < 0
            ? `Decreased by ${Math.abs(item.improvement)} percentage points.`
            : "Your score is unchanged."}
        </p>
      </div>
    ))}
  </div>
</section>
<section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
  <h2 className="text-xl font-bold text-slate-800">
    Student Achievements
  </h2>

  <p className="mt-1 text-sm text-slate-500">
    Earn badges as you improve your skills.
  </p>

  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {achievements.map((badge) => (
      <div
        key={badge.title}
        className={`rounded-xl border p-4 ${
          badge.earned
            ? "border-yellow-300 bg-yellow-50"
            : "border-slate-200 bg-slate-50 opacity-60"
        }`}
      >
        <div className="text-3xl">{badge.icon}</div>

        <h3 className="mt-3 font-bold text-slate-800">
          {badge.title}
        </h3>

        <p className="mt-1 text-sm text-slate-600">
          {badge.description}
        </p>

        <p className={`mt-3 text-xs font-bold ${
          badge.earned ? "text-green-700" : "text-slate-500"
        }`}>
          {badge.earned ? "✓ EARNED" : "🔒 LOCKED"}
        </p>
      </div>
    ))}
  </div>
</section>
<section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
  <h2 className="text-xl font-bold text-slate-800">
    🏆 Student Leaderboard
  </h2>

  <p className="mt-1 text-sm text-slate-500">
    See how students rank based on their assessment scores.
  </p>

  <div className="mt-6 space-y-3">
    {rankedStudents.map((student, index) => (
      <div
        key={student.name}
        className={`flex items-center justify-between rounded-xl p-4 ${
          student.name === "Your Score"
            ? "border border-blue-200 bg-blue-50"
            : "bg-slate-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-slate-500">
            #{index + 1}
          </span>

          <div>
            <p className="font-semibold text-slate-800">
              {student.name}
            </p>
            {student.name === "Your Score" && (
              <p className="text-xs text-blue-700">Your performance</p>
            )}
          </div>
        </div>

        <span className="font-bold text-blue-700">
          {student.score}%
        </span>
      </div>
    ))}
  </div>
</section>
        <p className="mt-3 text-slate-600">
          Welcome back, Student! Build your skills and prove what you can do.
        </p>
        <Link
  href="/portfolio"
  className="mt-5 inline-block rounded-xl bg-blue-700 px-5 py-3 font-medium text-white transition hover:bg-blue-800"
>
  View My Portfolio →
</Link>

        <nav className="mt-8 flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setMessage("");
              }}
              className={`rounded-xl px-5 py-3 font-medium transition ${
                activeTab === tab
                  ? "bg-blue-700 text-white"
                  : "border border-slate-200 bg-white hover:bg-blue-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          {activeTab === "Overview" && (
            <>
              <h2 className="text-2xl font-bold">Your Overview</h2>
              <div className="mt-5 flex flex-wrap gap-3">
  {Object.keys(assessmentQuestions).map((skill) => (
    <button
      key={skill}
      onClick={() => {
        setSelectedSkill(skill);
        setAnswers([]);
        setAssessmentSubmitted(false);
        setAssessmentResult(null);
      }}
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
        selectedSkill === skill
          ? "bg-blue-700 text-white"
          : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50"
      }`}
    >
      {skill}
    </button>
  ))}
</div>
<p className="mt-4 text-sm text-slate-600">
  Selected assessment:{" "}
  <span className="font-semibold text-blue-700">
    {selectedSkill}
  </span>
</p>
              <p className="mt-2 text-slate-600">
                Start building your verified skill profile.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl bg-blue-50 p-5">
                  <p className="text-sm text-slate-600">Skills added</p>
                  <p className="mt-2 text-3xl font-bold text-blue-700">
                    {skills.length}
                  </p>
                </div>

                <div className="rounded-xl bg-indigo-50 p-5">
                  <p className="text-sm text-slate-600">
                    Next milestone
                  </p>
                  <p className="mt-2 text-xl font-bold">
                    Add your skills
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab("My Skills")}
                className="mt-6 rounded-xl bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
              >
                Add My First Skill
              </button>
            </>
          )}

          {activeTab === "My Skills" && (
            <>
              <h2 className="text-2xl font-bold">My Skills</h2>
              <p className="mt-2 text-slate-600">
                Add the skills you are learning or already know.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="skillName"
                    className="mb-2 block text-sm font-medium"
                  >
                    Skill name
                  </label>
                  <input
                    id="skillName"
                    value={skillName}
                    onChange={(event) => setSkillName(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") addSkill();
                    }}
                    placeholder="e.g. Python, C++, HTML"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="skillLevel"
                    className="mb-2 block text-sm font-medium"
                  >
                    Current level
                  </label>
                  <select
                    id="skillLevel"
                    value={skillLevel}
                    onChange={(event) => setSkillLevel(event.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-600"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>

              <button
                onClick={addSkill}
                className="mt-5 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
              >
                + Add Skill
              </button>

              {message && (
                <p role="status" className="mt-4 text-sm text-blue-700">
                  {message}
                </p>
              )}

              <div className="mt-8">
                <h3 className="text-lg font-semibold">
                  Your Skill List ({skills.length})
                </h3>

                {skills.length === 0 ? (
                  <p className="mt-3 rounded-xl bg-slate-50 p-5 text-slate-600">
                    No skills added yet. Add your first skill above!
                  </p>
                ) : (
                  <ul className="mt-4 space-y-3">
                    {skills.map((skill) => (
                      <li
                        key={skill.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 p-4"
                      >
                        <div>
                          <p className="font-semibold">{skill.name}</p>
                          <p className="mt-1 text-sm text-slate-500">
                            Level: {skill.level}
                          </p>
                        </div>

                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </>
          )}

          
{activeTab === "Projects" && (
  <>
    <h2 className="text-2xl font-bold">My Projects</h2>
    <p className="mt-2 text-slate-600">
      Showcase what you have built and the technologies you used.
    </p>

    <div className="mt-6 space-y-4">
      <div>
        <label htmlFor="projectName" className="mb-2 block text-sm font-medium">
          Project name
        </label>
        <input
          id="projectName"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
          placeholder="e.g. Personal Portfolio Website"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="projectDescription" className="mb-2 block text-sm font-medium">
          Project description
        </label>
        <textarea
          id="projectDescription"
          value={projectDescription}
          onChange={(event) => setProjectDescription(event.target.value)}
          placeholder="What does your project do?"
          rows={3}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      <div>
        <label htmlFor="projectTechnology" className="mb-2 block text-sm font-medium">
          Technologies used
        </label>
        <input
          id="projectTechnology"
          value={projectTechnology}
          onChange={(event) => setProjectTechnology(event.target.value)}
          placeholder="e.g. HTML, CSS, JavaScript"
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        />
      </div>

      <button
        onClick={addProject}
        className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800"
      >
        + Add Project
      </button>
    </div>

    <div className="mt-8">
      <h3 className="text-lg font-semibold">
        Your Projects ({projects.length})
      </h3>

      {projects.length === 0 ? (
        <p className="mt-3 rounded-xl bg-slate-50 p-5 text-slate-600">
          No projects added yet. Add your first project above!
        </p>
      ) : (
        <ul className="mt-4 space-y-4">
          {projects.map((project) => (
            <li key={project.id} className="rounded-xl border border-slate-200 p-5">
              <h4 className="text-lg font-semibold">{project.name}</h4>
              <p className="mt-2 text-slate-600">{project.description}</p>
              <p className="mt-3 text-sm text-blue-700">
                Technologies: {project.technology}
              </p>
              <button
                onClick={() =>
                  setProjects((previous) =>
                    previous.filter((item) => item.id !== project.id)
                  )
                }
                className="mt-4 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Remove Project
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  </>
)}


          {activeTab === "Learning" && (
            <>
              <h2 className="text-2xl font-bold">My Learning</h2>
              <p className="mt-3 text-slate-600">
                Your learning roadmap and progress tracking will be built
                here next.
              </p>
            </>
          )}
        </section>
        {activeTab === "Profile" && (
  <div className="rounded-2xl border bg-white p-6 shadow-sm">
    <h2 className="text-2xl font-bold text-slate-800">
      Student Profile
    </h2>

    <div className="mt-5 space-y-4">
      <div>
  <label className="mb-2 block font-semibold text-slate-700">
    Profile Photo
  </label>

  {profile.photo && (
    <img
      src={profile.photo}
      alt="Profile Preview"
      className="mb-3 h-24 w-24 rounded-2xl object-cover"
    />
  )}

  <input
    type="file"
    accept="image/*"
    className="w-full rounded-lg border p-3"
    onChange={(e) => {
      const file = e.target.files?.[0];

      if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
          setProfile({
            ...profile,
            photo: reader.result as string,
          });
        };

        reader.readAsDataURL(file);
      }
    }}
  />
</div>
      <input
        className="w-full rounded-lg border p-3"
        placeholder="Full Name"
        value={profile.name}
        onChange={(e) =>
          setProfile({ ...profile, name: e.target.value })
        }
      />

      <input
        className="w-full rounded-lg border p-3"
        placeholder="College Name"
        value={profile.college}
        onChange={(e) =>
          setProfile({ ...profile, college: e.target.value })
        }
      />

      <input
        className="w-full rounded-lg border p-3"
        placeholder="Degree (e.g. B.Tech AI & Data Science)"
        value={profile.degree}
        onChange={(e) =>
          setProfile({ ...profile, degree: e.target.value })
        }
      />

      <input
        className="w-full rounded-lg border p-3"
        placeholder="Year (e.g. 2nd Year)"
        value={profile.year}
        onChange={(e) =>
          setProfile({ ...profile, year: e.target.value })
        }
      />

      <textarea
        className="w-full rounded-lg border p-3"
        placeholder="Write a short bio about yourself"
        rows={4}
        value={profile.bio}
        onChange={(e) =>
          setProfile({ ...profile, bio: e.target.value })
        }
      />
    </div>
  </div>
)}
{activeTab === "Assessment" && (
  <section className="rounded-2xl border bg-white p-6 shadow-sm">
    <h2 className="text-2xl font-bold text-slate-800">
      {selectedSkill} Assessment
    </h2>

    <p className="mt-2 text-slate-600">
      Answer all questions and submit your assessment to see your score.
    </p>

    <div className="mt-6 space-y-6">
      {questions.map((question, questionIndex) => (
        <div
          key={questionIndex}
          className="rounded-xl border border-slate-200 p-5"
        >
          <h3 className="font-semibold text-slate-800">
            {questionIndex + 1}. {question.question}
          </h3>

          <div className="mt-4 space-y-3">
            {question.options.map((option) => (
              <label
                key={option}
                className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-blue-50"
              >
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={option}
                  checked={answers[questionIndex] === option}
                  onChange={() => {
                    const updatedAnswers = [...answers];
                    updatedAnswers[questionIndex] = option;
                    setAnswers(updatedAnswers);
                  }}
                />

                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>

    <button
      onClick={() => {
  const finalScore = answers.reduce((total, answer, index) => {
    return total + (
      answer === questions[index].correctAnswer ? 1 : 0
    );
  }, 0);

const newAssessment: AssessmentResult = {
  skill: selectedSkill,
  score: finalScore,
  total: questions.length,
  date: new Date().toLocaleDateString(),
  status: getPerformanceStatus(finalScore, questions.length),
};

setAssessmentResult(newAssessment);

setAssessmentHistory((previousHistory) => [
  ...previousHistory,
  newAssessment,
]);

setAssessmentSubmitted(true);
}}

  
      className="mt-6 rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
    >
      Submit Assessment
    </button>
    {assessmentSubmitted && (
  <div className="mt-6 rounded-xl border border-green-200 bg-green-50 p-5">
    <h3 className="text-lg font-bold text-green-800">
      Assessment Complete!
    </h3>

    <p className="mt-2 text-green-700">
      Your score: {score} out of {questions.length}
    </p>
    <p className="mt-3">
  Performance Status:{" "}
  <span
    className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${
      assessmentResult?.status === "Verified"
        ? "bg-green-100 text-green-800"
        : assessmentResult?.status === "Developing"
        ? "bg-yellow-100 text-yellow-800"
        : "bg-red-100 text-red-800"
    }`}
  >
    {assessmentResult?.status}
  </span>
</p>

    <button
      onClick={() => {
        setAnswers([]);
        setAssessmentSubmitted(false);
      }}
      className="mt-4 rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800"
    >
      Retake Assessment
    </button>
  </div>
)}
  </section>
)}
{assessmentHistory.length > 0 && (
  <div className="mt-6">
    <h3 className="text-lg font-bold text-slate-800">
      Assessment History
    </h3>

    <div className="mt-3 space-y-3">
      {assessmentHistory.map((item, index) => (
        <div
          key={index}
          className="flex flex-wrap items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"
        >
          <div>
            <p className="font-semibold text-slate-800">
              {item.skill}
            </p>
            <p className="text-sm text-slate-500">
              Completed: {item.date}
            </p>
          </div>

          <p className="font-bold text-blue-700">
            {item.score} / {item.total}
          </p>
        </div>
      ))}
    </div>
  </div>
)}
        <p className="mt-6 text-center text-sm text-slate-500">
          SkillProof AI · Show your skills through evidence.
        </p>
      </div>
    </main>
  );
}
