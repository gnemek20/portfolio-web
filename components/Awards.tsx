import clsx from "clsx";
import useInView from "@/hooks/useInView";
import styles from "./Awards.module.css";

const awards = [
  {
    year: "2023",
    title: "Seoul Web 3.0 Festival",
    badge: "대상",
  },
  {
    year: "2021",
    title: "현대오토에버 화이트 해커 경진대회",
    badge: "대상",
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
            <span className={styles["year"]}>{a.year}</span>
            <span className={styles["title"]}>{a.title}</span>
            <span className={styles["badge"]}>{a.badge}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Awards;
