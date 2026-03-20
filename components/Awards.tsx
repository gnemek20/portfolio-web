import clsx from "clsx";
import useInView from "@/hooks/useInView";
import styles from "./Awards.module.css";

const awards = [
  {
    year: "2023",
    title: "Seoul Web 3.0 Festival",
    badge: "대상",
    desc: "3인 1팀으로 참가, 웹 개발자로서 인공지능과 Express를 크로스오버한 서버를 구축하고 크론 확장 프로그램으로 개발해 클라이언트에서 쉽게 이용함. 산업혁신 부문 대상 수상.",
  },
  {
    year: "2021",
    title: "현대오토에버 화이트 해커 경진대회",
    badge: "대상",
    desc: "3인 1팀으로 참가, 팀 내 유일한 포너블 분야 답답자로 전체 푸린 등 팀 논에1위 활약으로 대상 수상.",
  },
];

const Awards = () => {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      className={clsx(styles["section"], { [styles["visible"]]: inView })}
      id="awards"
    >
      <p className={styles["section-label"]}>Awards</p>
      <h2 className={styles["section-title"]}>수상 경력</h2>

      <div className={styles["list"]}>
        {awards.map((a) => (
          <div key={a.year} className={styles["item"]}>
            <div className={styles["item-top"]}>
              <span className={styles["year"]}>{a.year}</span>
              <span className={styles["title"]}>{a.title}</span>
              <span className={styles["badge"]}>{a.badge}</span>
            </div>
            {a.desc && <p className={styles["desc"]}>{a.desc}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awards;
