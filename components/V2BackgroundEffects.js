"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X, Terminal, Activity, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import styles from "@/app/v2/page.module.css";

export function V2BackgroundEffects({ gear, isHakiEnabled, onToggleHaki, projects = [], progression = null }) {
  const canvasRef = useRef(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [consoleLogs, setConsoleLogs] = useState(["Realm Signal Activated.", "Type /help for command directory."]);
  const [rebooting, setRebooting] = useState(false);
  const [joyboyMode, setJoyboyMode] = useState(false);



  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cores = navigator.hardwareConcurrency || 4;
      const memory = navigator.deviceMemory || 8;
      if (prefersReduced || cores < 4 || memory < 4) {
        setIsLowEnd(true);
      }
    }
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Canvas physics loop (Sun God Nika black/red Conqueror Haki lightning)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    let animationFrameId = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track pointer
    let pointer = { x: width / 2, y: height / 2, rx: width / 2, ry: height / 2, down: false };

    const handlePointerMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };

    const handlePointerDown = () => {
      pointer.down = true;
    };

    const handlePointerUp = () => {
      pointer.down = false;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("resize", handleResize);

    // Lightning arcs
    let sparks = [];

    const drawSpark = (c, s) => {
      c.save();
      c.beginPath();
      c.moveTo(s.x, s.y);
      s.points.forEach((pt) => {
        c.lineTo(pt.x, pt.y);
      });
      
      // Black core lightning line
      c.strokeStyle = `rgba(0, 0, 0, ${s.opacity})`;
      c.lineWidth = s.width;
      
      // Red lightning glow
      c.shadowColor = `rgba(239, 68, 68, ${s.opacity})`;
      c.shadowBlur = 14;
      c.shadowOffsetX = 0;
      c.shadowOffsetY = 0;
      
      c.stroke();
      c.restore();
    };

    const loop = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // If transitioning or low-end device, bypass heavy drawing calculations to maintain 60 FPS
      if (isLowEnd || isTransitioning) {
        animationFrameId = requestAnimationFrame(loop);
        return;
      }

      // Smooth pointer lag
      pointer.rx += (pointer.x - pointer.rx) * 0.08;
      pointer.ry += (pointer.y - pointer.ry) * 0.08;

      // Generate sparks/lightning occasionally (affected by gear mode + haki switch status)
      if (isHakiEnabled) {
        const sparkThreshold = gear === 2 ? 0.05 : gear === 5 ? 0.03 : 0.008;
        if (Math.random() < sparkThreshold) {
          const startX = Math.random() * width;
          const startY = Math.random() * height;
          const segments = 4 + Math.floor(Math.random() * 5);
          const points = [];
          let curX = startX;
          let curY = startY;

          for (let i = 0; i < segments; i++) {
            const nextX = curX + (Math.random() - 0.5) * 80;
            const nextY = curY + 25 + Math.random() * 50;
            points.push({ x: nextX, y: nextY });
            curX = nextX;
            curY = nextY;
          }

          sparks.push({
            x: startX,
            y: startY,
            points,
            opacity: 0.9,
            width: 2.5 + Math.random() * 3
          });
        }
      }

      // Process sparks
      sparks = sparks.filter((s) => {
        s.opacity -= 0.07;
        if (s.opacity > 0) {
          drawSpark(ctx, s);
          return true;
        }
        return false;
      });

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("resize", handleResize);
    };
  }, [gear, joyboyMode, isHakiEnabled]);

  // Terminal toggle with keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Search filter
  const allProjects = (projects || []).map((p) => ({
    title: p.title,
    slug: p.slug,
    keywords: `${p.title} ${p.stack || ""} ${p.summary || ""}`.toLowerCase()
  }));

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    // Process standard commands
    if (query.startsWith("/")) {
      const commands = [
        { title: "/joyboy", summary: "Unlock elastic cartoon gravity overdrive (canvas shake + rubber bounds)" },
        { title: "/reboot", summary: "Initiate full realm core compile restart sequence" },
        { title: "/gears", summary: "Check active gear matrix & specs" },
        { title: "/stats", summary: "Inspect live EXP and progression systems stats" },
        { title: "/haki", summary: "Toggle Conqueror Haki lightning canvas" },
        { title: "/telemetry", summary: "View recent user click/action telemetry logs" },
        { title: "/clear", summary: "Clear the console log output" },
        { title: "/help", summary: "Reveal system commands" }
      ];
      setSearchResults(
        commands.filter((cmd) => cmd.title.toLowerCase().includes(query.toLowerCase()))
      );
      return;
    }

    // Filter projects
    const filtered = allProjects.filter(
      (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.keywords.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleResultClick = (result) => {
    if (result.title.startsWith("/")) {
      // Execute command
      runCommand(result.title);
      setSearchQuery("");
      setSearchResults([]);
      return;
    }

    trackEvent("Search", "Result Click", result.title);

    // Scroll to project card
    const element = document.getElementById(result.slug) || document.querySelector(`[slug="${result.slug}"]`);
    if (element) {
      setTerminalOpen(false);
      element.scrollIntoView({ behavior: "smooth", block: "center" });
      element.classList.add("console-highlight");
      setConsoleLogs((prev) => [...prev, `Scrolling to ${result.title}...`]);
      
      setTimeout(() => {
        element.classList.remove("console-highlight");
      }, 3500);
    }
  };

  const runCommand = (cmd) => {
    const command = cmd.toLowerCase().trim();
    trackEvent("Console", "Run Command", command);
    if (command === "/joyboy") {
      setJoyboyMode(true);
      setConsoleLogs((prev) => [...prev, ">> /joyboy: AWAKENING ELASTIC CARTOON GRAVITY.", "Nodes stretching to maximum elasticity."]);
      
      // Apply rubber shake to all cards
      const cards = document.querySelectorAll(`.${styles.questCard}, .${styles.questTile}, .${styles.serviceCard}`);
      cards.forEach((card) => {
        card.classList.add("elastic-shake");
        setTimeout(() => card.classList.remove("elastic-shake"), 4000);
      });

      setTimeout(() => {
        setJoyboyMode(false);
        setConsoleLogs((prev) => [...prev, ">> Gravity normalizing."]);
      }, 5000);
    } else if (command === "/reboot") {
      setRebooting(true);
      setConsoleLogs((prev) => [...prev, ">> /reboot: INITIATING REALM COMPILE SYSTEM..."]);
      setTimeout(() => {
        setRebooting(false);
        setConsoleLogs((prev) => [...prev, ">> Realm Core Online. Latency optimized to 0.4ms."]);
      }, 2000);
    } else if (command === "/gears") {
      setConsoleLogs((prev) => [
        ...prev,
        ">> Current Gear Matrix:",
        `  - Gear 2: Active Overdrive Speed: ${gear === 2 ? "[ON]" : "[OFF]"}`,
        `  - Gear 3: Gigantification: ${gear === 3 ? "[ON]" : "[OFF]"}`,
        `  - Gear 4: Bouncy Snakeman: ${gear === 4 ? "[ON]" : "[OFF]"}`,
        `  - Gear 5: Joyboy Sun God Nika: ${gear === 5 ? "[ON]" : "[OFF]"}`
      ]);
    } else if (command === "/stats") {
      if (!progression) {
        setConsoleLogs((prev) => [...prev, ">> /stats: Progression data not available."]);
        return;
      }
      const statsObj = progression.stats || {};
      setConsoleLogs((prev) => [
        ...prev,
        ">> Current System Progression Snapshot:",
        `  - Level: ${progression.currentLevel} (${progression.currentRank})`,
        `  - Total EXP: ${progression.totalExp} EXP`,
        `  - Next level in: ${progression.nextLevelExp} EXP`,
        `  - EXP breakdown:`,
        `    * Projects: ${statsObj.projects || 0} EXP`,
        `    * Skills: ${statsObj.skills || 0} EXP`,
        `    * Experience: ${statsObj.experiences || 0} EXP`,
        `    * Certifications: ${statsObj.certifications || 0} EXP`,
        `    * Achievements: ${statsObj.achievements || 0} EXP`
      ]);
    } else if (command === "/haki") {
      onToggleHaki();
      setConsoleLogs((prev) => [...prev, `>> /haki: Toggled Conqueror Haki lightning.`]);
    } else if (command === "/clear") {
      setConsoleLogs([]);
    } else if (command === "/telemetry") {
      let history = [];
      try {
        history = JSON.parse(localStorage.getItem("monarch_telemetry_history") || "[]");
      } catch {
        history = [];
      }
      setConsoleLogs((prev) => [
        ...prev,
        ">> Recent System Telemetry Logs:",
        ...history.slice(-12).map(
          (item) => `  [${new Date(item.timestamp).toLocaleTimeString()}] ${item.category} - ${item.action} (${item.label})`
        )
      ]);
    } else if (command === "/help") {
      setConsoleLogs((prev) => [
        ...prev,
        ">> Available Commands:",
        "  /joyboy  - Elastic visual gravity warp",
        "  /reboot  - Reload system core details",
        "  /gears   - List and inspect Gear matrix",
        "  /stats   - Renders current EXP system stats breakdown",
        "  /haki    - Toggle Conqueror Haki lightning canvas",
        "  /telemetry - View recent user click/action telemetry logs",
        "  /clear   - Clear the console logs window",
        "  [type keyword] - Search & jump to layout dossiers"
      ]);
    } else {
      setConsoleLogs((prev) => [...prev, `Command "${cmd}" not recognized.`]);
    }
  };

  return (
    <>
      {/* Canvas container for cartoon physics */}
      <canvas ref={canvasRef} className={styles.physicsCanvas} />

      {/* Floating System HUD (Haki toggle + Console trigger) */}
      <div className={styles.systemHudPanel}>
        <button
          type="button"
          className={`${styles.hudIconBtn} ${isHakiEnabled ? styles.hudIconActive : ""}`}
          onClick={() => {
            trackEvent("HUD", "Toggle Haki", isHakiEnabled ? "OFF" : "ON");
            onToggleHaki();
          }}
          title="Toggle Conqueror Haki Lightning"
        >
          <Sparkles size={16} />
          <span className={styles.hudBtnText}>{isHakiEnabled ? "Haki: ON" : "Haki: OFF"}</span>
        </button>

        <button
          type="button"
          className={styles.hudIconBtn}
          onClick={() => {
            trackEvent("HUD", "Open Console");
            setTerminalOpen(true);
          }}
          title="Open Console (Cmd+K)"
        >
          <Terminal size={16} />
          <span className={styles.hudBtnText}>Console</span>
        </button>
      </div>

      {/* Console Modal Overlay */}
      {terminalOpen ? (
        <div className={styles.terminalOverlay} role="dialog" aria-modal="true">
          <div className={styles.terminalBackdrop} onClick={() => setTerminalOpen(false)} />
          <div className={styles.terminalPanel}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalTitle}>
                <Activity size={15} />
                <span>NIKA_CONSOLE_HUD v2.4</span>
              </div>
              <button
                type="button"
                className={styles.terminalClose}
                onClick={() => setTerminalOpen(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div className={styles.terminalSearchRow}>
              <Search size={18} className={styles.terminalSearchIcon} />
              <input
                type="text"
                placeholder="Search projects or run command (e.g. /joyboy, /reboot)..."
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
              />
            </div>

            <div className={styles.terminalBody}>
              {searchResults.length > 0 ? (
                <div className={styles.terminalResults}>
                  <span className={styles.systemBadge}>Search matches</span>
                  {searchResults.map((res) => (
                    <button
                      key={res.slug || res.title}
                      type="button"
                      className={styles.terminalResultItem}
                      onClick={() => handleResultClick(res)}
                    >
                      <Sparkles size={14} />
                      <div>
                        <strong>{res.title}</strong>
                        <span>{res.summary || "Execute Command"}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : null}

              <div className={styles.terminalLogs}>
                <span className={styles.systemBadge}>Telemetry Log</span>
                {rebooting ? (
                  <div className={styles.rebootProgress}>
                    <p className={styles.blinkText}>COMPILING CORE REALM OBJECTS...</p>
                    <p>Loading database schema: SQLite 3.42</p>
                    <p>Mapping grid layouts... OK</p>
                    <p>Mounting Luffy PNG illustration... OK</p>
                    <p>System status: Latency optimized successfully</p>
                  </div>
                ) : (
                  consoleLogs.map((log, idx) => <p key={idx}>{log}</p>)
                )}
              </div>
            </div>

            <div className={styles.terminalFooter}>
              <span>ESC to Close</span>
              <span>Ctrl+K to Toggle</span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
