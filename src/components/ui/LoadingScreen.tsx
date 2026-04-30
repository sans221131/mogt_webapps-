"use client";

import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import AnimatedMogtLogo from "@/components/ui/AnimatedMogtLogo";

const MIN_VISIBLE_MS = 2200;
const EXIT_MS = 420;
const REMOVE_BUFFER_MS = 120;
const MAX_WAIT_MS = 7000;

export default function LoadingScreen() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [render, setRender] = useState(true);

  useEffect(() => {
    const startedAt = performance.now();

    let hideTimeout: number | undefined;
    let forceTimeout: number | undefined;
    let removeTimeout: number | undefined;
    let isFinished = false;

    const finish = () => {
      if (isFinished) return;
      isFinished = true;

      // If reduced motion requested, unmount immediately but still signal ready.
      if (reduceMotion) {
        try {
          (window as any).__MOGT_LOADER_FINISHED = true;
          window.dispatchEvent(new Event("mogt:loaderFinished"));
        } catch (e) {
          /* ignore */
        }
        setRender(false);
        return;
      }

      // Start simple exit fade, then unmount right after it completes.
      setVisible(false);
      removeTimeout = window.setTimeout(
        () => {
          // signal other components (hero) that loader finished so they can start their animations
          try {
            (window as any).__MOGT_LOADER_FINISHED = true;
            window.dispatchEvent(new Event("mogt:loaderFinished"));
          } catch (e) {
            /* ignore */
          }
          setRender(false);
        },
        EXIT_MS + REMOVE_BUFFER_MS,
      );
    };

    const finishAfterMinDuration = () => {
      const elapsed = performance.now() - startedAt;
      const remaining = Math.max(MIN_VISIBLE_MS - elapsed, 0);

      if (hideTimeout) window.clearTimeout(hideTimeout);
      hideTimeout = window.setTimeout(finish, remaining);
    };

    const onLoad = () => {
      finishAfterMinDuration();
    };

    if (document.readyState === "complete") {
      // If page is already loaded, still respect a minimum display duration.
      finishAfterMinDuration();
    } else {
      // Wait for window load, then finish after the minimum duration.
      window.addEventListener("load", onLoad, { once: true });
    }

    // Safety fallback in case load event is delayed or blocked.
    forceTimeout = window.setTimeout(finish, MAX_WAIT_MS);

    return () => {
      if (hideTimeout) window.clearTimeout(hideTimeout);
      if (forceTimeout) window.clearTimeout(forceTimeout);
      if (removeTimeout) window.clearTimeout(removeTimeout);
      window.removeEventListener("load", onLoad);
    };
  }, [reduceMotion]);

  if (!render) return null;

  return (
    <div
      aria-hidden
      role="presentation"
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#F9F8F6]"
      style={{
        opacity: visible ? 1 : 0,
        transition: reduceMotion ? "none" : `opacity ${EXIT_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
    >
      <div className="flex items-center justify-center">
        <AnimatedMogtLogo
          className="h-40 w-40 md:h-56 md:w-56"
          decorative={false}
          alt="MOGT loading logo"
          enableIdle={false}
        />
      </div>
    </div>
  );
}
