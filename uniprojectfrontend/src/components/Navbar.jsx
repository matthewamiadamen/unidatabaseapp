import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const leftLinks = [
  { to: "/degrees", label: "Degrees" },
  { to: "/cohorts", label: "Cohorts" },
  { to: "/modules", label: "Modules" },
];

const rightLinks = [
  { to: "/create-degree", label: "Create" },
  { to: "/set-module-grades", label: "Grades" },
];

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      className={`text-sm transition-colors duration-200 ${
        isActive(to)
          ? "text-white"
          : "text-white/40 hover:text-white/70"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Links */}
          <div className="hidden md:flex items-center gap-8">
            {leftLinks.map((link) => (
              <NavLink key={link.to} {...link} />
            ))}
          </div>

          {/* Center Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
              <span className="text-white text-[10px] font-semibold tracking-tight">DCU</span>
            </div>
            <span className="text-sm font-medium text-white/80 hidden sm:block">
              ARCHIVE
            </span>
          </Link>

          {/* Right Links */}
          <div className="hidden md:flex items-center gap-8">
            {rightLinks.map((link) => (
              <NavLink key={link.to} {...link} />
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/40 hover:text-white/70 transition-colors"
          >
            {mobileOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] animate-slide-down">
          <div className="px-6 py-5 space-y-4">
            {[...leftLinks, ...rightLinks].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block text-sm transition-colors ${
                  isActive(link.to) ? "text-white" : "text-white/40 hover:text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
