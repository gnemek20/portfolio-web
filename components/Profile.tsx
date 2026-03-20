import clsx from "clsx";
import useInView from "@/hooks/useInView";
import styles from "./Profile.module.css";

const frontend = [
  "React", "Next.js", "Vue.js", "TypeScript",
  "Three.js", "WebAssembly", "Web Workers", "CSS Modules",
];

const backend = [
  "FastAPI", "Express", "PostgreSQL", "Supabase",
];

const devops = [
  "Docker", "Vercel", "Fly.io", "GitHub Actions", "Git Flow",
];

const languages = ["Python", "TypeScript", "JavaScript"];

const Profile = () => {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className={clsx(styles["profile"], { [styles["visible"]]: inView })} id="profile">
      <p className={styles["section-label"]}>Profile</p>
      <p className={styles["bio"]}>
        선린인터넷고등학교를 졸업한 프론트엔드 엔지니어입니다.
        화면에 보이게 만드는 것을 넘어, 빠르고 안정적이며 확장 가능한 웹을 만듭니다.
      </p>

      <div className={styles["info-grid"]}>
        <div className={styles["info-item"]}>
          <span className={styles["info-label"]}>포지션</span>
          <span className={styles["info-value"]}>프론트엔드 엔지니어</span>
        </div>
        <div className={styles["info-item"]}>
          <span className={styles["info-label"]}>병역</span>
          <span className={styles["info-value"]}>산업기능요원 현역(신규)</span>
        </div>
        <div className={styles["info-item"]}>
          <span className={styles["info-label"]}>학교</span>
          <span className={styles["info-value"]}>선린인터넷고등학교 (졸업)</span>
        </div>
        <div className={styles["info-item"]}>
          <span className={styles["info-label"]}>자격증</span>
          <span className={styles["info-value"]}>정보처리기능사</span>
        </div>
      </div>

      <div className={styles["awards"]}>
        <p className={styles["section-label"]}>Awards</p>
        <div className={styles["award"]}>
          <span className={styles["award-year"]}>2023</span>
          <span className={styles["award-title"]}>Seoul Web 3.0 Festival</span>
          <span className={styles["award-badge"]}>대상</span>
        </div>
        <div className={styles["award"]}>
          <span className={styles["award-year"]}>2021</span>
          <span className={styles["award-title"]}>현대오토에버 화이트 해커 경진대회</span>
          <span className={styles["award-badge"]}>대상</span>
        </div>
      </div>

      <div className={styles["skills"]}>
        <p className={styles["section-label"]}>Skills</p>

        <div className={styles["skill-group"]}>
          <span className={styles["skill-category"]}>Frontend</span>
          <div className={styles["tech-cloud"]}>
            {frontend.map((t) => (
              <span key={t} className={styles["tech-tag"]}>{t}</span>
            ))}
          </div>
        </div>

        <div className={styles["skill-group"]}>
          <span className={styles["skill-category"]}>Backend</span>
          <div className={styles["tech-cloud"]}>
            {backend.map((t) => (
              <span key={t} className={styles["tech-tag"]}>{t}</span>
            ))}
          </div>
        </div>

        <div className={styles["skill-group"]}>
          <span className={styles["skill-category"]}>DevOps</span>
          <div className={styles["tech-cloud"]}>
            {devops.map((t) => (
              <span key={t} className={styles["tech-tag"]}>{t}</span>
            ))}
          </div>
        </div>

        <div className={styles["skill-group"]}>
          <span className={styles["skill-category"]}>Languages</span>
          <div className={styles["tech-cloud"]}>
            {languages.map((t) => (
              <span key={t} className={styles["tech-tag"]}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
