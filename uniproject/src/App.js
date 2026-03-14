import { Link } from "react-router-dom";
import { AuroraBackground } from "./components/ui/aurora-background";

const sections = [
  {
    title: "Browse",
    items: [
      { to: "/degrees", label: "View Degrees", desc: "Browse all degree programmes" },
      { to: "/cohorts", label: "View Cohorts", desc: "Explore student cohorts" },
      { to: "/modules", label: "View Modules", desc: "See all available modules" },
    ],
  },
  {
    title: "Create",
    items: [
      { to: "/create-degree", label: "New Degree", desc: "Add a new degree programme" },
      { to: "/create-cohort", label: "New Cohort", desc: "Register a new cohort" },
      { to: "/create-module", label: "New Module", desc: "Add a new course module" },
      { to: "/create-student", label: "New Student", desc: "Enroll a new student" },
    ],
  },
  {
    title: "Grades",
    items: [
      { to: "/set-module-grades", label: "Set Grades", desc: "Enter module grade results" },
    ],
  },
];

export default function App() {
  return (
    <div>
      {/* Aurora Hero */}
      <AuroraBackground className="min-h-[70vh] flex items-center justify-center">
        <div className="relative flex flex-col items-center justify-center text-center px-6">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/[0.1] text-xs font-medium text-white/40 mb-8">
            Practice-led education
          </div>
          <h1 className="font-display text-5xl sm:text-7xl text-white leading-[1.1] mb-6">
            DCU Archive<br />
            <span className="text-white/60">&amp; Database</span>
          </h1>
          <p className="text-base text-white/35 max-w-md mx-auto leading-relaxed mb-10">
            A university management system built on clarity,
            intention, and structured data.
          </p>
          <Link to="/degrees" className="btn-outline">
            Explore Programmes
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </Link>
        </div>
      </AuroraBackground>

      {/* Sections */}
      <div className="page-container">
        {sections.map((section) => (
          <div key={section.title} className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xs font-medium text-white/25 uppercase tracking-[0.15em]">
                {section.title}
              </h2>
              <div className="flex-1 h-px bg-white/[0.05]"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group card p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-[15px] font-medium text-white/80 mb-1.5 group-hover:text-white transition-colors">
                      {item.label}
                    </h3>
                    <p className="text-sm text-white/30 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="flex justify-end mt-6">
                    <svg
                      className="w-4 h-4 text-white/15 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all duration-200"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
