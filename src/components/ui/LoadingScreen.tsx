"use client";

import React, { useEffect, useState } from "react";
import { MogtLogo } from "@/components/ui/MogtLogo";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [render, setRender] = useState(true);

  useEffect(() => {
    let hideTimeout: number | undefined;
    let removeTimeout: number | undefined;

    const finish = () => {
      // start fade-out
      setVisible(false);
      // remove from DOM after transition (400ms + small buffer)
      removeTimeout = window.setTimeout(() => setRender(false), 520);
    };

    if (document.readyState === "complete") {
      // Page already loaded — short delay to show animation entry
      hideTimeout = window.setTimeout(finish, 600);
    } else {
      // Wait for window load event or fallback
      const onLoad = () => {
        hideTimeout = window.setTimeout(finish, 300);
      };
      window.addEventListener("load", onLoad);
      // safety fallback
      hideTimeout = window.setTimeout(() => {
        finish();
        window.removeEventListener("load", onLoad);
      }, 3000);
    }

    return () => {
      if (hideTimeout) window.clearTimeout(hideTimeout);
      if (removeTimeout) window.clearTimeout(removeTimeout);
    };
  }, []);

  if (!render) return null;

  return (
    <div
      aria-hidden={!visible}
      role="presentation"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#F9F8F6] transition-opacity duration-400`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 400ms cubic-bezier(0.16, 1, 0.3, 1), transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="flex items-center justify-center">
        <MogtLogo className="h-16 w-auto md:h-20" alt="MOGT loading logo" />
      </div>
    </div>
  );
}
