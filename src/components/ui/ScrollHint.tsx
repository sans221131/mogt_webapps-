"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Props = {
  href?: string;
};

export default function ScrollHint({ href = "#services" }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <a href={href} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#6B6B6B] text-sm">
        Scroll
      </a>
    );
  }

  return (
    <a href={href} aria-label="Scroll to next section" className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
      <motion.svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#6B6B6B]"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
      >
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </motion.svg>
    </a>
  );
}
