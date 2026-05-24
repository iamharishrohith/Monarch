"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Binary,
  Blocks,
  BookOpenText,
  BrainCircuit,
  Braces,
  Cloud,
  Code2,
  Component,
  Cpu,
  Database,
  Figma,
  Orbit,
  Palette,
  PenTool,
  Server,
  Shield,
  Smartphone,
  Sparkles,
  WandSparkles
} from "lucide-react";
import styles from "@/app/v2/page.module.css";

const defaultRealmQuotes = [
  "Pressure is privilege. I'm the artist, and pressure is the paint on my canvas.",
  "As long as I'm alive, there are infinite chances ahead.",
  "Awakening begins when chaos becomes direction."
];

const floatingSkillLayout = [
  { top: "15%", left: "18%" },
  { top: "24%", left: "31%" },
  { top: "13%", left: "50%" },
  { top: "18%", left: "67%" },
  { top: "25%", left: "79%" },
  { top: "36%", left: "84%" },
  { top: "49%", left: "81%" },
  { top: "61%", left: "77%" },
  { top: "74%", left: "70%" },
  { top: "84%", left: "57%" },
  { top: "86%", left: "41%" },
  { top: "80%", left: "27%" },
  { top: "69%", left: "18%" },
  { top: "56%", left: "13%" },
  { top: "39%", left: "16%" },
  { top: "30%", left: "56%" },
  { top: "45%", left: "69%" },
  { top: "67%", left: "63%" },
  { top: "29%", left: "88%" },
  { top: "78%", left: "16%" },
  { top: "85%", left: "78%" },
  { top: "14%", left: "73%" },
  { top: "32%", left: "24%" },
  { top: "57%", left: "88%" },
  { top: "47%", left: "25%" },
  { top: "70%", left: "86%" },
  { top: "20%", left: "82%" },
  { top: "82%", left: "33%" },
  { top: "52%", left: "88%" },
  { top: "76%", left: "86%" }
];

function getSkillGlyph(skill) {
  const exactIconMap = {
    "Arduino/ESP32 Integration": Orbit,
    Antigravity: Sparkles,
    "Bun.js": Server,
    "Capacitor.js": Smartphone,
    "Claude Code": Braces,
    Codex: Code2,
    DOM: Component,
    Docker: Blocks,
    DSA: Binary,
    ElysiaJS: Braces,
    "Express.js": Code2,
    Figma,
    Firebase: Cloud,
    Framer: WandSparkles,
    "Google AI Studio": BrainCircuit,
    "Google Stitch": Sparkles,
    "JavaScript (ES6+)": Braces,
    MongoDB: Database,
    MySQL: Database,
    "Next.js 15": Component,
    "Node.js": Server,
    OOPS: Blocks,
    Pomeilli: PenTool,
    PostgreSQL: Database,
    "React Native": Smartphone,
    "React.js": Component,
    Redis: Database,
    "Distributed Smart Pole Telemetry": Orbit,
    "ESP32": Cpu,
    "Embedded C": Braces,
    "Raspberry Pi": Cpu,
    "LoRa": Orbit,
    "Sensors": Component,
    "State & Hooks Management": Orbit,
    "Tailwind CSS": Palette,
    "PHP": Code2,
    "System Design": Cpu,
    "Git & GitHub": Code2,
    "REST APIs": Braces
  };

  return exactIconMap[skill.name] || Code2;
}

function getDomainIcon(title) {
  const icons = {
    "Frontend & Mobile": WandSparkles,
    "Backend & Performance": Cpu,
    "P-Languages": Braces,
    "IoT & Infrastructure": Orbit,
    "Vibe Coding": Sparkles,
    Fundamentals: BookOpenText
  };

  return icons[title] || Shield;
}

export function V2Constellation({ profileName, floatingSkills, domains, quotes = [], layout = [] }) {
  const [activeDomain, setActiveDomain] = useState(null);
  const [marqueePaused, setMarqueePaused] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [typedQuote, setTypedQuote] = useState("");
  const shellRef = useRef(null);
  const marqueeTrackRef = useRef(null);
  const marqueeGroupRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 800, height: 700 });

  const activeItems = activeDomain
    ? domains.find((domain) => domain.title === activeDomain)?.items || []
    : [];
  const quotePool = quotes.length ? quotes : defaultRealmQuotes;
  const visibleSkills = useMemo(
    () => (activeDomain ? floatingSkills.filter((skill) => activeItems.includes(skill.name)) : []),
    [activeDomain, activeItems, floatingSkills]
  );
  const activeLayout = layout.length ? layout : floatingSkillLayout;

  useEffect(() => {
    if (!shellRef.current) return;
    const updateDims = () => {
      setDimensions({
        width: shellRef.current.offsetWidth,
        height: shellRef.current.offsetHeight
      });
    };
    updateDims();
    window.addEventListener("resize", updateDims);
    
    // Run after component mount to ensure accurate sizes
    const timer = setTimeout(updateDims, 150);
    
    return () => {
      window.removeEventListener("resize", updateDims);
      clearTimeout(timer);
    };
  }, []);

  const handlePointerMove = (e) => {
    const rect = shellRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handlePointerLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  useEffect(() => {
    const track = marqueeTrackRef.current;
    const group = marqueeGroupRef.current;

    if (!track || !group) {
      return undefined;
    }

    let animationFrameId = 0;
    let lastTime = performance.now();
    let offset = 0;
    let groupWidth = group.offsetWidth + 12;

    const resizeObserver = new ResizeObserver(() => {
      groupWidth = group.offsetWidth + 12;
      if (groupWidth > 0) {
        offset %= groupWidth;
      }
    });

    resizeObserver.observe(group);

    const tick = (time) => {
      const delta = time - lastTime;
      lastTime = time;

      if (window.innerWidth > 1100) {
        if (!marqueePaused && groupWidth > 0) {
          offset = (offset + delta * 0.05) % groupWidth;
          track.style.transform = `translate3d(${-offset}px, 0, 0)`;
        }
      } else {
        track.style.transform = "";
      }

      animationFrameId = window.requestAnimationFrame(tick);
    };

    animationFrameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [marqueePaused]);

  useEffect(() => {
    if (activeDomain) {
      setTypedQuote("");
      return undefined;
    }

    const quote = quotePool[quoteIndex % quotePool.length];
    let charIndex = 0;
    let typingTimer = 0;
    let rotateTimer = 0;

    setTypedQuote("");

    const typeNext = () => {
      charIndex += 1;
      setTypedQuote(quote.slice(0, charIndex));

      if (charIndex < quote.length) {
        typingTimer = window.setTimeout(typeNext, 38);
      } else {
        rotateTimer = window.setTimeout(() => {
          setQuoteIndex((current) => (current + 1) % quotePool.length);
        }, 2600);
      }
    };

    typingTimer = window.setTimeout(typeNext, 220);

    return () => {
      window.clearTimeout(typingTimer);
      window.clearTimeout(rotateTimer);
    };
  }, [activeDomain, quoteIndex, quotePool]);

  return (
    <>
      <div className={styles.constellationLayout}>
        <div 
          className={styles.constellationShell}
          ref={shellRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className={styles.constellationBackdropLabel}>AWAKENED</div>
          <div className={styles.constellationCore}>
            <span>CORE</span>
            <strong>{profileName}</strong>
            <p>Technical Architect // Solutions Developer</p>
          </div>

          {!activeDomain ? (
            <div className={styles.constellationQuote}>
              <span className={styles.constellationQuoteLabel}>Realm Signal</span>
              <p className={styles.constellationQuoteText}>{typedQuote}<span className={styles.constellationCaret} /></p>
            </div>
          ) : null}

          <div className={styles.mobileSkillsGrid}>
            {visibleSkills.map((skill, index) => {
              const Glyph = getSkillGlyph(skill);
              const layoutStyle = activeLayout[index] || activeLayout[activeLayout.length - 1];
              
              let customTransform = "translate(-50%, -50%)";
              if (mousePos.x !== 0 && mousePos.y !== 0) {
                const leftPct = parseFloat(layoutStyle.left);
                const topPct = parseFloat(layoutStyle.top);
                const nodeX = (leftPct / 100) * dimensions.width;
                const nodeY = (topPct / 100) * dimensions.height;
                
                const dx = nodeX - mousePos.x;
                const dy = nodeY - mousePos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxRadius = 180;
                
                if (distance < maxRadius) {
                  const force = (maxRadius - distance) / maxRadius; // 0 to 1 strength
                  const maxPush = 45; // max displacement in px
                  const pushX = (dx / distance) * force * maxPush;
                  const pushY = (dy / distance) * force * maxPush;
                  customTransform = `translate(calc(-50% + ${pushX}px), calc(-50% + ${pushY}px))`;
                }
              }

              const combinedStyle = {
                ...layoutStyle,
                transform: customTransform
              };

              return (
                <article
                  key={skill.id}
                  className={`${styles.floatingSkill} ${styles.floatingSkillActive}`}
                  style={combinedStyle}
                >
                  <div className={styles.floatingSkillIconWrap}>
                    <Glyph size={15} className={styles.floatingSkillGlyph} />
                  </div>
                  <div className={styles.floatingSkillCopy}>
                    <strong>{skill.name}</strong>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={styles.domainMarquee}
        onMouseEnter={() => setMarqueePaused(true)}
        onMouseLeave={() => setMarqueePaused(false)}
        onFocus={() => setMarqueePaused(true)}
        onBlur={() => setMarqueePaused(false)}
      >
        <div className={styles.domainMarqueeTrack} ref={marqueeTrackRef}>
          {[0, 1].map((groupIndex) => (
            <div
              className={styles.domainGrid}
              key={groupIndex}
              aria-hidden={groupIndex === 1}
              ref={groupIndex === 0 ? marqueeGroupRef : null}
            >
              {domains.slice(0, 5).map((domain) => {
                const Icon = getDomainIcon(domain.title);
                const active = domain.title === activeDomain;

                return (
                  <button
                    key={`${groupIndex}-${domain.title}`}
                    type="button"
                    className={active ? styles.domainPillActive : styles.domainPill}
                    onMouseEnter={() => setActiveDomain(domain.title)}
                    onMouseLeave={() => setActiveDomain(null)}
                    onFocus={() => setActiveDomain(domain.title)}
                    onBlur={() => setActiveDomain(null)}
                  >
                    <span className={styles.domainGlyph}><Icon size={18} /></span>
                    <div className={styles.domainPillHead}>
                      <h3>{domain.title}</h3>
                      <p>{domain.items.length} skills</p>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
