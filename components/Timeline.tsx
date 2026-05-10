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
    period: "2023. 09 — 2024. 05",
    title: "Dictector 1차 (스텔스 창업)",
    desc: "YouTube 영어 받아쓰기 학습 플랫폼 초기 개발 — 하드웨어 인바운드 처리 및 디스크에 영상을 저장한 뒤 오디오를 추출하던 파이프라인 이슈로 해결책을 찾지 못해 일시 중단",
    tag: "창업",
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
  {
    period: "2025. 08 — 현재",
    title: "Haire 런칭 준비 (창업)",
    desc: "AI 에이전트 마켓플레이스 — 대회 출전용 프로토타입에서 시작해, 디자인 전면 리뉴얼·동적 UI·매니페스트 자동 생성 흐름을 도입하며 실제 런칭 및 창업을 준비 중",
    tag: "창업",
  },
  {
    period: "2026. 02 — 현재",
    title: "Dictector 재개",
    desc: "Soniox API 도입 + 캐시 기반 전사 파이프라인으로 기존 하드웨어/디스크 이슈를 우회, 4가지 학습 모드를 갖춘 받아쓰기 플랫폼으로 개발 재개",
    tag: "창업",
  },
];

const tagColor: Record<string, string> = {
  "계약직": "tag-work",
  "외주": "tag-outsource",
  "개인": "tag-personal",
  "창업": "tag-startup",
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
