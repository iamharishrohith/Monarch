export function trackEvent(category, action, label = "") {
  if (typeof window === "undefined") return;

  const logEntry = {
    timestamp: new Date().toISOString(),
    category,
    action,
    label
  };

  console.log(`[TELEMETRY EVENT]`, logEntry);

  try {
    const history = JSON.parse(localStorage.getItem("monarch_telemetry_history") || "[]");
    history.push(logEntry);
    if (history.length > 100) {
      history.shift();
    }
    localStorage.setItem("monarch_telemetry_history", JSON.stringify(history));
  } catch (e) {
    // Ignore storage quota or sandbox restrictions
  }
}
