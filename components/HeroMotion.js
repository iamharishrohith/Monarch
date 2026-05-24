"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroMotion() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-copy",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.12 }
      );

      gsap.to(".cloud-layer-a", {
        xPercent: 6,
        yPercent: -5,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".cloud-layer-b", {
        xPercent: -8,
        yPercent: 6,
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".aura-ring", {
        scale: 1.08,
        opacity: 0.9,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".hero-atmosphere-grid", {
        backgroundPosition: "120% 50%",
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "none"
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return <div ref={rootRef} className="hero-motion-root" />;
}
