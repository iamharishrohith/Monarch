"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { animate } from "animejs";

export function LevelNotification({ event }) {
  const pulseRef = useRef(null);

  useEffect(() => {
    if (!pulseRef.current || !event) return;
    animate(pulseRef.current, {
      scale: [0.92, 1.05, 1],
      opacity: [0.4, 1, 0.6],
      duration: 1500,
      ease: "outElastic(1, .6)"
    });
  }, [event]);

  return (
    <AnimatePresence>
      {event ? (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="system-toast"
        >
          <div ref={pulseRef} className="system-toast-pulse" />
          <div>
            <p className="system-toast-label">{event.kind.replace("_", " ")}</p>
            <h4>{event.title}</h4>
            <p>{event.message}</p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
