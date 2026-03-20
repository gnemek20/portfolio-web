import clsx from "clsx";
import useInView from "@/hooks/useInView";
import styles from "./Timeline.module.css";

const events = [
  {
    period: "2022. 01 — 04",
    title: "에이비제트 주식회사",
    desc: "Vue JS 인포크스토어 판매자센터, React JS 인포크링크 회원가입 페이지 제작",
    tag: "계약직",
  },
  {
    period: "2022. 06 — 2023. 08",
    title: "WAAT",
    desc: "한양대학교 컴퓨테이셔널사회과학연구센터 AI 데이터 전처리 도구 외주",
    tag: "외주",
  },
  {
    period: "2024. 06 — 2025. 01",
    title: "DaeyangING",
    desc: "패션 부자재 기업 소개 홈페이지 외주",
    tag: "외주",
  },
  {
    period: "2025. 05 — 12",
    title: "Core Helper 운영",
    desc: "MapleStory 코어 강화 시뮬레이터 실서비스 운영 + Google AdSense 수익화",
    tag: "개인",
  },
];

const tagColor: Record<string, string> = {
  "계약직": "tag-work",
  "외주": "tag-outsource",
  "개인": "tag-personal",
};

const Timeline = () => {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className={clsx(styles["section"], { [styles["visible"]]: inView })}
      id="timeline"
    >
      <p className={styles["section-label"]}>Timeline</p>
      <h2 className={styles["section-title"]}>경력 타임라인</h2>

      <div className={styles["timeline"]}>
        <div className={styles["line"]} />
        {events.map((e, i) => (
          <div key={i} className={styles["event"]}>
            <div className={styles["dot"]} />
            <div className={styles["card"]}>
              <div className={styles["card-head"]}>
                <span className={styles["period"]}>{e.period}</span>
                <span className={clsx(styles["tag"], styles[tagColor[e.tag]])}>{e.tag}</span>
              </div>
              <p className={styles["card-title"]}>{e.title}</p>
              {e.desc && <p className={styles["card-desc"]}>{e.desc}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
