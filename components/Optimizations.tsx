import { useState, useRef, useLayoutEffect } from "react";
import clsx from "clsx";
import useInView from "@/hooks/useInView";
import styles from "./Optimizations.module.css";

const techniques = [
  { name: "Static Site Generation", desc: "모든 페이지를 빌드 타임에 프리렌더링 → TTFB 120ms 이하" },
  { name: "CSS Modules Tree Shaking", desc: "사용하지 않는 스타일 자동 제거 → CSS 3.4KB" },
  { name: "Minimal JS Bundle", desc: "First Load JS 89.3KB 달성 (gzip)" },
  { name: "Font Preload", desc: "Pretendard Variable CDN preconnect → FCP 0.3s" },
  { name: "Zero Layout Shift", desc: "scrollbar-gutter: stable + 고정 레이아웃 → CLS 0" },
  { name: "Code Splitting", desc: "Next.js 페이지 단위 자동 코드 스플리팅 → 11.3KB/page" },
];

const Optimizations = () => {
  const [optimized, setOptimized] = useState(true);
  const { ref, inView } = useInView();
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    const el = contentRef.current;
    if (el) {
      el.style.maxHeight = el.scrollHeight + "px";
    }
    setOptimized((v) => !v);
  };

  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    void el.offsetHeight;
    el.style.maxHeight = el.scrollHeight + "px";
  }, [optimized]);

  return (
    <section
      ref={ref}
      className={clsx(styles["section"], { [styles["visible"]]: inView })}
      id="optimizations"
    >
      <p className={styles["section-label"]}>Optimization</p>
      <h2 className={styles["section-title"]}>
        {optimized
          ? "이 포트폴리오는 극한까지 최적화되었습니다"
          : "최적화가 비활성화되었습니다"}
      </h2>
      <p className={styles["section-desc"]}>
        {optimized
          ? "SSG, 코드 스플리팅, 번들 최소화를 적용하여 최상의 Lighthouse 점수를 달성했습니다"
          : "아래 수치는 최적화 미적용 시 예상되는 성능 저하입니다"}
      </p>

      <button
        className={clsx(styles["toggle"], { [styles["toggle-off"]]: !optimized })}
        onClick={handleToggle}
      >
        <span className={styles["toggle-knob"]} />
        <span className={styles["toggle-label"]}>
          {optimized ? "최적화 ON" : "최적화 OFF"}
        </span>
      </button>

      <div
        ref={contentRef}
        className={styles["content-area"]}
      >
          {optimized ? (
          <div className={styles["techniques"]}>
            <p className={styles["techniques-label"]}>적용된 최적화 기법</p>
            {techniques.map((t) => (
              <div key={t.name} className={styles["technique"]}>
                <span className={styles["technique-check"]}>✓</span>
                <span className={styles["technique-name"]}>{t.name}</span>
                <span className={styles["technique-desc"]}>{t.desc}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles["warning-area"]}>
            <p className={styles["warning-title"]}>최적화 미적용 시 예상 지표</p>
            <div className={styles["warning-grid"]}>
              <div className={styles["warning-item"]}>
                <span className={styles["warning-value"]}>3.2s</span>
                <span className={styles["warning-label"]}>LCP</span>
              </div>
              <div className={styles["warning-item"]}>
                <span className={styles["warning-value"]}>450ms</span>
                <span className={styles["warning-label"]}>TBT</span>
              </div>
              <div className={styles["warning-item"]}>
                <span className={styles["warning-value"]}>0.12</span>
                <span className={styles["warning-label"]}>CLS</span>
              </div>
              <div className={styles["warning-item"]}>
                <span className={styles["warning-value"]}>4.1s</span>
                <span className={styles["warning-label"]}>Speed Index</span>
              </div>
            </div>
            <p className={styles["warning-note"]}>
              무거운 프론트 번들, 런타임 렌더링, 최적화되지 않은 폰트 로딩 등이 원인입니다.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Optimizations;
