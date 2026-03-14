import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white/70 flex flex-col">
      <Navbar />
      <main className="flex-1 animate-fade-in">
        <Outlet />
      </main>
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; 2026 DCU Archive & Database
          </p>
          <p className="text-xs text-white/15">
            Built with React & Django REST
          </p>
        </div>
      </footer>
    </div>
  );
}
