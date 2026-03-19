import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import { Project, Optimization } from "@/data/projects";
import styles from "./ProjectDialog.module.css";

const KEYWORDS = [
  "WASM", "Web Worker", "WebAssembly", "DFS", "Prefix Sum",
  "Three.js", "Raw Three.js", "React Three Fiber", "BufferGeometry",
  "TreeLayout", "IntersectionObserver", "animation-play-state",
  "@keyframes", "CSS", "GPU", "60fps", "SSE", "KaTeX",
  "Google Drive API", "YOLOv5", "Pascal VOC",
  "WebSocket", "DooD", "Docker", "pgvector", "JWT", "OAuth",
  "Celery", "Redis", "Supabase Realtime", "yt-dlp", "ffmpeg",
  "Screen Capture API", "Next.js", "FastAPI", "Vue",
  "Google AdSense", "Naver Maps API", "Soniox API",
  "CEFR", "rehype-sanitize",
];

const highlightKeywords = (text: string) => {
  const escaped = KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "g");
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <strong key={i}>{part}</strong>
    ) : (
      part
    ),
  );
};

interface Props {
  project: Project | null;
  onClose: () => void;
}

const OptToggle = ({ opt }: { opt: Optimization }) => {
  const [view, setView] = useState<"before" | "after">("after");

  return (
    <div className={styles["opt-card"]}>
      <div className={styles["opt-header"]}>
        <span className={styles["opt-label"]}>{opt.label}</span>
        <span className={styles["opt-technique"]}>{opt.technique}</span>
      </div>
      <div className={styles["opt-toggle-area"]}>
        <div className={styles["opt-toggle-group"]}>
          <button
            className={clsx(styles["opt-toggle-btn"], { [styles["opt-toggle-active"]]: view === "before" })}
            onClick={() => setView("before")}
          >
            Before
          </button>
          <button
            className={clsx(styles["opt-toggle-btn"], { [styles["opt-toggle-active"]]: view === "after" })}
            onClick={() => setView("after")}
          >
            After
          </button>
        </div>
      </div>
      <pre className={styles["opt-code"]}>
        {view === "before" ? opt.before : opt.after}
      </pre>
    </div>
  );
};

const ProjectDialog = ({ project, onClose }: Props) => {
  const [displayed, setDisplayed] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (project) {
      setDisplayed(project);
      requestAnimationFrame(() => setOpen(true));
    } else {
      setOpen(false);
      const timer = setTimeout(() => setDisplayed(null), 250);
      return () => clearTimeout(timer);
    }
  }, [project]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!displayed) return;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, [displayed, handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={clsx(styles["overlay"], { [styles["overlay-open"]]: open })}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      {displayed && (
        <div className={styles["dialog"]}>
          <button className={styles["close-btn"]} onClick={onClose} aria-label="닫기">
            ✕
          </button>

          <span className={styles["dialog-type"]}>{displayed.category}</span>
          <h2 className={styles["dialog-title"]}>{displayed.title}</h2>
          <p className={styles["dialog-subtitle"]}>{displayed.subtitle}</p>

          <div className={styles["dialog-tags"]}>
            {displayed.tags.map((tag) => (
              <span key={tag} className={styles["dialog-tag"]}>{tag}</span>
            ))}
          </div>

          <p className={styles["dialog-desc"]}>{highlightKeywords(displayed.description)}</p>

          <p className={styles["dialog-section-label"]}>Highlights</p>
          <div className={styles["highlights"]}>
            {displayed.highlights.map((h, i) => (
              <p key={i} className={styles["highlight"]}>{h}</p>
            ))}
          </div>

          {displayed.architecture && (
            <>
              <p className={styles["dialog-section-label"]}>Architecture</p>
              <div className={styles["architecture"]}>{displayed.architecture}</div>
            </>
          )}

          {displayed.optimizations && displayed.optimizations.length > 0 && (
            <>
              <p className={styles["dialog-section-label"]}>Optimizations</p>
              <div className={styles["opt-list"]}>
                {displayed.optimizations.map((opt, i) => (
                  <OptToggle key={i} opt={opt} />
                ))}
              </div>
            </>
          )}

          <div className={styles["dialog-links"]}>
            {displayed.links.github && (
              <a
                href={displayed.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["dialog-link"]}
              >
                GitHub →
              </a>
            )}
            {displayed.links.live && (
              <a
                href={displayed.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["dialog-link"]}
              >
                Live →
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDialog;
