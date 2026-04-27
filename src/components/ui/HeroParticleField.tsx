"use client";

import React from "react";

// Lightweight decorative background for the hero section.
// Keeps markup simple and resolves the missing import during build.
export default function HeroParticleField() {
  return (
    <div aria-hidden className="absolute inset-0 -z-0 pointer-events-none">
      <div className="absolute left-[-8%] top-[4%] h-72 w-72 rounded-full bg-gradient-to-br from-[#FFEDD5] to-[#FFE4F0] opacity-30 blur-3xl" />
      <div className="absolute right-[-6%] top-1/4 h-56 w-56 rounded-full bg-gradient-to-tr from-[#DFF6FF] to-[#EAFBF0] opacity-25 blur-2xl" />
    </div>
  );
}
