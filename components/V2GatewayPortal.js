"use client";

import { useState, useEffect } from "react";
import { Terminal, Code, Sparkles, Folder, FileCode, CheckCircle2, Cpu, FileJson, Settings } from "lucide-react";
import styles from "./V2GatewayPortal.module.css";

export function V2GatewayPortal({ onSelectMode }) {
  const [activeFile, setActiveFile] = useState("profile.ts");
  const [typedText, setTypedText] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [scanActive, setScanActive] = useState(false);
  const [selected, setSelected] = useState(null);

  const filesContent = {
    "profile.ts": `const engineer = {
  name: "Harish Rohith",
  role: "Technical Architect & Systems Engineer",
  skills: ["Bun.js", "ElysiaJS", "Next.js", "ESP32", "TinyML"],
  focus: "Low-Latency High-Performance Systems",
  status: "Available for Collaboration"
};`,
    "systems.env": `# Systems Environment Configuration
PORTFOLIO_MODE=developer
BUILD_OPTIMIZATION=max_speed
RUNTIME=Bun
ACCENT_THEME=Monochrome_Silver
LATENCY_LIMIT=sub_10ms
DB_POOL_SIZE=50
EDGE_ROUTER=ESP32_Gateway
STATUS=active_monitored`,
    "creative.log": `{
  "event": "AWAKEN_GEAR_5",
  "status": "liberated",
  "haki": "conqueror_active",
  "physics": "elastic_nika",
  "theme": "cosmic_purple_gold",
  "experience": 208642,
  "currentLevel": 42,
  "activeBuff": "sun_god_drum_beat"
}`
  };

  useEffect(() => {
    let index = 0;
    const snippet = filesContent["profile.ts"];
    const interval = setInterval(() => {
      if (index < snippet.length) {
        setTypedText((prev) => prev + snippet[index]);
        index++;
      }
      if (index >= snippet.length) {
        clearInterval(interval);
        setIsTypingDone(true);
        setTimeout(() => setShowButtons(true), 400);
      }
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const handleFileClick = (filename) => {
    if (!isTypingDone) return; // Wait until initial type finishes
    setActiveFile(filename);
  };

  const handleSelect = (mode) => {
    setSelected(mode);
    setScanActive(true);
    setTimeout(() => {
      onSelectMode(mode);
    }, 1200); // Wait for laser scanline animation to finish
  };

  // Syntax highlighter for the typed code text
  const colorizeCode = (text, filename) => {
    if (!text) return "";
    let html = text;
    if (filename === "profile.ts") {
      // 1. Strings first (wrapped in single quotes)
      html = html.replace(/(\"[^\"]*\")/g, "<span style='color:#e4e4e7; font-weight:500;'>$1</span>");
      // 2. const
      html = html.replace(/\bconst\b/g, "<span style='color:#ffffff; font-weight:800;'>const</span>");
      // 3. Keys
      html = html.replace(/\b(name|role|skills|focus|status)\b(?=\s*:)/g, "<span style='color:#a1a1aa;'>$1</span>");
      // 4. Brackets & Braces
      html = html.replace(/([\{\}\[\]])/g, "<span style='color:#71717a;'>$1</span>");
    } else if (filename === "systems.env") {
      // 1. Comments
      html = html.replace(/(#.*)/g, "<span style='color:#52525b; font-style:italic;'>$1</span>");
      // 2. Key-Value split line by line
      html = html.split('\n').map(line => {
        if (line.trim().startsWith('#') || !line.includes('=')) return line;
        const parts = line.split('=');
        const key = parts[0];
        const val = parts.slice(1).join('=');
        return `<span style='color:#ffffff; font-weight:600;'>${key}</span>=<span style='color:#a1a1aa;'>${val}</span>`;
      }).join('\n');
    } else { // creative.log (json)
      // 1. Strings first (wrapped in single quotes)
      html = html.replace(/(\"[^\"]*\")/g, "<span style='color:#e4e4e7;'>$1</span>");
      // 2. Digits
      html = html.replace(/\b(\d+)\b/g, "<span style='color:#ffffff; font-weight:600;'>$1</span>");
      // 3. Brackets & Braces
      html = html.replace(/([\{\}\[\]])/g, "<span style='color:#71717a;'>$1</span>");
      // 4. Keys (strings followed by colon)
      html = html.replace(/(<span style='color:#e4e4e7;'>\"[^\"]*\"<\/span>)(?=\s*:)/g, "<span style='color:#a1a1aa;'>$1</span>");
    }
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  };

  const displayContent = activeFile === "profile.ts" && !isTypingDone ? typedText : filesContent[activeFile];

  return (
    <div className={`${styles.portalWrapper} ${scanActive ? styles.portalActive : ""}`}>
      {/* Background grids and glowing lights */}
      <div className={styles.gridOverlay} />
      <div className={styles.cosmicGlow} />

      {/* Laser scanline */}
      <div className={`${styles.scanLine} ${scanActive ? styles.scanLineRun : ""}`} />

      <header className={styles.portalHeader}>
        <div className={styles.logoBlock}>
          <span className={styles.brandTitle}>HARISH ROHITH</span>
          <div className={styles.systemStatusBlock}>
            <span className={styles.statusDot} />
            <span className={styles.systemStatus}>PORTAL_STATUS: ACTIVE</span>
          </div>
        </div>
      </header>

      <main className={styles.portalMain}>
        {/* IDE Terminal Component */}
        <section className={styles.terminalContainer}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalWindowControls}>
              <span className={styles.controlDot} />
              <span className={styles.controlDot} />
              <span className={styles.controlDot} />
            </div>
            <div className={styles.tabBar}>
              <div 
                className={`${styles.tab} ${activeFile === "profile.ts" ? styles.tabActive : ""}`}
                onClick={() => handleFileClick("profile.ts")}
              >
                <FileCode size={12} className={styles.tabIcon} />
                <span>profile.ts</span>
              </div>
              <div 
                className={`${styles.tab} ${activeFile === "systems.env" ? styles.tabActive : ""}`}
                onClick={() => handleFileClick("systems.env")}
              >
                <Settings size={12} className={styles.tabIcon} />
                <span>systems.env</span>
              </div>
              <div 
                className={`${styles.tab} ${activeFile === "creative.log" ? styles.tabActive : ""}`}
                onClick={() => handleFileClick("creative.log")}
              >
                <FileJson size={12} className={styles.tabIcon} />
                <span>creative.log</span>
              </div>
            </div>
            <div className={styles.editorMeta}>
              <span>{activeFile.split(".").pop().toUpperCase()}</span>
            </div>
          </div>

          <div className={styles.editorGrid}>
            {/* Sidebar (File Explorer Mockup) */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarHeading}>
                <Folder size={12} />
                <span>WORKSPACE</span>
              </div>
              <div className={styles.fileTree}>
                <div 
                  className={`${styles.fileItem} ${activeFile === "profile.ts" ? styles.fileItemActive : ""}`}
                  onClick={() => handleFileClick("profile.ts")}
                >
                  <FileCode size={12} className={styles.fileIcon} />
                  <span>profile.ts</span>
                </div>
                <div 
                  className={`${styles.fileItem} ${activeFile === "systems.env" ? styles.fileItemActive : ""}`}
                  onClick={() => handleFileClick("systems.env")}
                >
                  <Settings size={12} className={styles.fileIcon} />
                  <span>systems.env</span>
                </div>
                <div 
                  className={`${styles.fileItem} ${activeFile === "creative.log" ? styles.fileItemActive : ""}`}
                  onClick={() => handleFileClick("creative.log")}
                >
                  <FileJson size={12} className={styles.fileIcon} />
                  <span>creative.log</span>
                </div>
              </div>
            </aside>

            {/* Code Editor Window */}
            <div className={styles.editorArea}>
              <div className={styles.lineNumbers}>
                {Array.from({ length: displayContent.split("\n").length }).map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <pre className={styles.terminalBody}>
                <code>{colorizeCode(displayContent, activeFile)}</code>
                {!isTypingDone && activeFile === "profile.ts" && <span className={styles.cursor}>_</span>}
              </pre>
            </div>
          </div>
        </section>

        {/* Simplified "Who you need?" Cards Section */}
        <section className={`${styles.choicesGrid} ${showButtons ? styles.choicesVisible : ""}`}>
          <h2 className={styles.choiceHeading}>Who you need?</h2>
          <p className={styles.choiceSubtitle}>Select an engineering interface to explore my workspace.</p>

          <div className={styles.cardsStack}>
            {/* Technical Engineer Card */}
            <div 
              className={`${styles.choiceCard} ${styles.cardDev} ${selected === "developer" ? styles.cardSelected : ""}`}
              onClick={() => handleSelect("developer")}
            >
              <div className={styles.cardLeft}>
                <Cpu size={20} className={styles.cardIconDev} />
                <h3 className={styles.cardTitle}>Technical Engineer</h3>
              </div>
              <button className={styles.btnDev}>Hire Me</button>
            </div>

            {/* Creative Architect Card */}
            <div 
              className={`${styles.choiceCard} ${styles.cardCreative} ${selected === "creative" ? styles.cardSelected : ""}`}
              onClick={() => handleSelect("creative")}
            >
              <div className={styles.cardLeft}>
                <Sparkles size={20} className={styles.cardIconCreative} />
                <h3 className={styles.cardTitle}>Creative Architect</h3>
              </div>
              <button className={styles.btnCreative}>Hire Me</button>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.portalFooter}>
        <div className={styles.footerBrand}>
          <Cpu size={12} />
          <span>Defying Latency, Orchestrating Impact</span>
        </div>
        <span>© 2026 Harish Rohith | v2.2.0</span>
      </footer>
    </div>
  );
}
