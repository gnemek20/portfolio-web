import { useState, useEffect, useCallback, useRef } from "react";
import clsx from "clsx";
import { Project, AccordionTab, ContentBlock } from "@/data/projects";
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
  "OpenCV", "NumPy", "HSV", "bilateralFilter", "findContours",
  "matchTemplate", "TM_CCOEFF_NORMED", "YOLOv8n",
  "Fly.io", "CloudType", "NP-hard",
  "grayscale", "cold start",
  "Nodemailer", "Base64", "observeElement",
  "animationCounter", "playAnimation",
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

const highlightStats = (text: string) => {
  const escaped = KEYWORDS.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")}|\\d+%\\s*\\S+)`, "g");
  const parts = text.split(pattern);

  return parts.map((part, i) => {
    if (!part) return null;
    if (/^\d+%/.test(part))
      return <span key={i} className={styles["stat-accent"]}>{part}</span>;
    if (pattern.test(part)) {
      pattern.lastIndex = 0;
      return <strong key={i}>{part}</strong>;
    }
    return part;
  });
};

interface Props {
  project: Project | null;
  onClose: () => void;
}

const PEEK_HEIGHT = 60;

const FADE_MS = 500;
const HOLD_MS = 1000;
const GAP_MS = 1000;

const GifPlayer = ({
  block,
  expanded,
}: {
  block: ContentBlock;
  expanded: boolean;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!expanded || !v) {
      if (v) {
        v.pause();
        v.currentTime = 0;
      }
      setVisible(false);
      if (progressRef.current) progressRef.current.style.width = "0%";
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let raf = 0;

    const later = (fn: () => void, ms: number) => {
      timers.push(setTimeout(() => { if (!cancelled) fn(); }, ms));
    };

    const tick = () => {
      if (cancelled) return;
      if (v.duration && progressRef.current) {
        progressRef.current.style.width = `${(v.currentTime / v.duration) * 100}%`;
      }
      raf = requestAnimationFrame(tick);
    };

    const startCycle = () => {
      v.currentTime = 0;
      if (progressRef.current) progressRef.current.style.width = "0%";
      setVisible(true);
      v.play().catch(() => {});
      raf = requestAnimationFrame(tick);
    };

    const onEnded = () => {
      if (cancelled) return;
      cancelAnimationFrame(raf);
      if (progressRef.current) progressRef.current.style.width = "100%";
      later(() => {
        setVisible(false);
        later(() => {
          later(startCycle, GAP_MS);
        }, FADE_MS);
      }, HOLD_MS);
    };

    v.addEventListener("ended", onEnded);
    startCycle();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      cancelAnimationFrame(raf);
      v.removeEventListener("ended", onEnded);
      v.pause();
      v.currentTime = 0;
      setVisible(false);
      if (progressRef.current) progressRef.current.style.width = "0%";
    };
  }, [expanded]);

  return (
    <figure className={styles["accordion-figure"]}>
      <div
        className={clsx(styles["gif-wrapper"], {
          [styles["gif-show"]]: visible,
        })}
      >
        <video
          ref={videoRef}
          src={block.value}
          muted
          playsInline
          preload="auto"
          className={styles["accordion-img"]}
        />
        <div className={styles["gif-timeline"]}>
          <div ref={progressRef} className={styles["gif-timeline-fill"]} />
        </div>
      </div>
      {block.caption && (
        <figcaption className={styles["accordion-caption"]}>
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
};

const AccordionPanel = ({ tab }: { tab: AccordionTab }) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!expanded || !contentRef.current) {
      setHeight(0);
      return;
    }
    setHeight(contentRef.current.scrollHeight);

    const ro = new ResizeObserver(() => {
      if (contentRef.current) setHeight(contentRef.current.scrollHeight);
    });
    ro.observe(contentRef.current);
    return () => ro.disconnect();
  }, [expanded]);

  return (
    <div className={clsx(styles["accordion"], { [styles["accordion-expanded"]]: expanded })}>
      <button
        className={clsx(styles["accordion-trigger"], { [styles["accordion-open"]]: expanded })}
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
      >
        <span className={styles["accordion-title"]}>{tab.title}</span>
        <span className={styles["accordion-chevron"]}>›</span>
      </button>
      <div
        className={styles["accordion-body"]}
        style={{ height: expanded ? height : PEEK_HEIGHT }}
      >
        {!expanded && <div className={styles["accordion-fade"]} />}
        <div ref={contentRef} className={styles["accordion-content"]}>
          {tab.blocks.map((block, i) => {
            if (block.type === "image") {
              return (
                <figure key={i} className={styles["accordion-figure"]}>
                  <img
                    src={block.value}
                    alt={block.alt ?? ""}
                    loading="lazy"
                    decoding="async"
                    className={styles["accordion-img"]}
                  />
                  {block.caption && (
                    <figcaption className={styles["accordion-caption"]}>
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }
            if (block.type === "gif") {
              return <GifPlayer key={i} block={block} expanded={expanded} />;
            }
            if (block.type === "stats") {
              return (
                <div key={i} className={styles["accordion-stats"]}>
                  <p className={styles["accordion-stats-title"]}>{block.value}</p>
                  {block.caption?.split("\n").map((line, j) => (
                    <p
                      key={j}
                      className={line.startsWith("→") ? styles["accordion-stat-sub"] : styles["accordion-stat-line"]}
                    >
                      {highlightStats(line)}
                    </p>
                  ))}
                </div>
              );
            }
            return (
              <p key={i} className={styles["accordion-text"]}>
                {highlightKeywords(block.value)}
              </p>
            );
          })}
        </div>
      </div>
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
    const header = document.querySelector("header");
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    if (header) header.style.paddingRight = `calc(2rem + ${scrollbarWidth}px)`;

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      if (header) header.style.paddingRight = "";
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

          {displayed.period && (
            <div className={styles["dialog-period"]}>
              <span className={styles["dialog-period-icon"]}>📅</span>
              <span className={styles["dialog-period-text"]}>{displayed.period}</span>
            </div>
          )}

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

          {displayed.accordions && displayed.accordions.length > 0 && (
            <div className={styles["accordion-list"]}>
              {displayed.accordions.map((tab, i) => (
                <AccordionPanel key={i} tab={tab} />
              ))}
            </div>
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
