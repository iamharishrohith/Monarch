"use client";

import { motion } from "framer-motion";

export function SectionReveal({ children, className, delay = 0, ...props }) {
  return (
    <motion.section
      {...props}
      className={className}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.02 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
}
