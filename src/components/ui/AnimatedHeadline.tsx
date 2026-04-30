"use client";

import React, { useEffect } from "react";
import { motion, useReducedMotion, useAnimation } from "framer-motion";

type Props = {
  text: string;
  className?: string;
};

export default function AnimatedHeadline({ text, className }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <h1 className={className}>{text}</h1>;
  }

  const words = text.split(" ");

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
  } as const;

  const child = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  } as const;

  const controls = useAnimation();

  useEffect(() => {
    // if loader already finished, start immediately
    if ((window as any).__MOGT_LOADER_FINISHED) {
      controls.start("show");
      return;
    }

    const onReady = () => controls.start("show");
    window.addEventListener("mogt:loaderFinished", onReady, { once: true });
    return () => window.removeEventListener("mogt:loaderFinished", onReady);
  }, [controls]);

  return (
    <motion.h1 className={className} variants={container} initial="hidden" animate={controls}>
      {words.map((w, i) => (
        <motion.span key={i} variants={child} className="inline-block mr-2 whitespace-pre">
          {w}
        </motion.span>
      ))}
    </motion.h1>
  );
}
