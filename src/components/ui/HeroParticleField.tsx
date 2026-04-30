"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// Lightweight decorative background with a subtle parallax on pointer move.
export default function HeroParticleField() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const aRef = useRef<HTMLDivElement | null>(null);
  const bRef = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) return;

    function onPointerMove(e: PointerEvent) {
      if (!containerRef.current) return;
      // ignore touch pointer moves to avoid noisy updates on mobile
      if ((e as any).pointerType === "touch") return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const offsetX = (x - 0.5) * 24; // px
      const offsetY = (y - 0.5) * 16; // px

      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        if (aRef.current) aRef.current.style.transform = `translate3d(${offsetX * 0.6}px, ${offsetY * 0.6}px, 0)`;
        if (bRef.current) bRef.current.style.transform = `translate3d(${offsetX * -0.6}px, ${offsetY * -0.6}px, 0)`;
      });
    }

    function onLeave() {
      if (raf.current) cancelAnimationFrame(raf.current);
      if (aRef.current) aRef.current.style.transform = "";
      if (bRef.current) bRef.current.style.transform = "";
    }

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduce]);

  return (
    <div ref={containerRef} aria-hidden className="absolute inset-0 -z-0 pointer-events-none">
      <div
        ref={aRef}
        className="absolute left-[-8%] top-[4%] h-72 w-72 rounded-full bg-gradient-to-br from-[#FFEDD5] to-[#FFE4F0] opacity-30 blur-3xl"
        style={{ transform: "translateZ(0)" }}
      />
      <div
        ref={bRef}
        className="absolute right-[-6%] top-1/4 h-56 w-56 rounded-full bg-gradient-to-tr from-[#DFF6FF] to-[#EAFBF0] opacity-25 blur-2xl"
        style={{ transform: "translateZ(0)" }}
      />
    </div>
  );
}
