"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

export function ExpBar({ currentExp, startExp, endExp }) {
  const fillRef = useRef(null);
  const labelRef = useRef(null);
  const range = Math.max(1, endExp - startExp);
  const targetWidth = Math.min(100, Math.max(0, ((currentExp - startExp) / range) * 100));

  useEffect(() => {
    if (!fillRef.current || !labelRef.current) return;

    animate(fillRef.current, {
      width: [`0%`, `${targetWidth}%`],
      duration: 1400,
      ease: "outExpo"
    });

    const tracker = { value: 0 };
    animate(tracker, {
      value: Math.round(targetWidth),
      duration: 1400,
      ease: "outExpo",
      onUpdate: () => {
        labelRef.current.textContent = `${Math.round(tracker.value)}%`;
      }
    });
  }, [targetWidth]);

  return (
    <div className="exp-shell">
      <div className="exp-meta">
        <span>Current EXP</span>
        <span ref={labelRef}>0%</span>
      </div>
      <div className="exp-track">
        <div ref={fillRef} className="exp-fill" />
      </div>
    </div>
  );
}
