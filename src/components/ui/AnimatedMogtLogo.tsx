"use client";

import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

const logo = "/mogt-logo.webp";

const pieces = [
  { name: "left", clip: "inset(22% 62% 18% 4%)", from: { x: -80, y: 10, opacity: 0, filter: "blur(8px)" } },
  { name: "right", clip: "inset(22% 4% 18% 62%)", from: { x: 80, y: 10, opacity: 0, filter: "blur(8px)" } },
  { name: "top-t", clip: "inset(3% 20% 62% 20%)", from: { x: 0, y: -80, opacity: 0, filter: "blur(8px)" } },
  { name: "center-left", clip: "inset(25% 48% 20% 24%)", from: { x: -35, y: 30, rotate: -8, opacity: 0, filter: "blur(8px)" } },
  { name: "center-right", clip: "inset(25% 24% 20% 48%)", from: { x: 35, y: 30, rotate: 8, opacity: 0, filter: "blur(8px)" } },
];

type Props = {
  className?: string;
  alt?: string;
  decorative?: boolean;
  enableIdle?: boolean;
};

export default function AnimatedMogtLogo({ className = "h-16 w-16", alt = "MOGT", decorative = true, enableIdle = true }: Props) {
  const reduce = useReducedMotion();

  // preload the image for the loading screen
  useEffect(() => {
    const img = new Image();
    img.src = logo;
  }, []);

  if (reduce) {
    return <img src={logo} className={className} alt={decorative ? "" : alt} aria-hidden={decorative} />;
  }

  return (
    <motion.div
      className={`relative ${className} flex items-center justify-center`}
      initial={{ scale: 0.96, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : alt}
    >
      {/* Pieces assemble */}
      {pieces.map((piece, index) => (
        <motion.img
          key={piece.name}
          src={logo}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-contain pointer-events-none"
          style={{ clipPath: piece.clip, WebkitClipPath: piece.clip }}
          initial={piece.from}
          animate={{ x: 0, y: 0, rotate: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: index * 0.12, duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* soft glow overlay */}
      <motion.img
        src={logo}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-contain pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.22, 0.08] }}
        transition={{ delay: 1.05, duration: 1.2, ease: "easeOut" }}
        style={{ filter: "drop-shadow(0 0 22px rgba(255,255,255,0.18))" }}
      />

      {/* shine sweep */}
      <motion.div className="pointer-events-none absolute inset-0 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
        <motion.div
          className="absolute -left-24 top-0 h-full w-20 rotate-12 bg-white/25 blur-xl"
          initial={{ x: -120 }}
          animate={{ x: 420 }}
          transition={{ delay: 1.15, duration: 1.05, ease: "easeInOut" }}
        />
      </motion.div>

      {/* subtle idle micro-animation after entry */}
      {enableIdle ? (
        <motion.div
          className="absolute inset-0"
          aria-hidden
          animate={{ y: [0, -6, 0], scale: [1, 1.01, 1] }}
          transition={{ delay: 2.1, duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      ) : null}
    </motion.div>
  );
}
