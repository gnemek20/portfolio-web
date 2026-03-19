import clsx from "clsx";
import { projects, Project } from "@/data/projects";
import useInView from "@/hooks/useInView";
import styles from "./Projects.module.css";

interface Props {
  onSelect: (project: Project) => void;
}

const categories: { key: Project["category"]; label: string }[] = [
  { key: "개인", label: "개인 프로젝트" },
  { key: "외주", label: "외주 프로젝트" },
  { key: "팀", label: "팀 프로젝트" },
];

const Projects = ({ onSelect }: Props) => {
  const { ref, inView } = useInView();

  return (
    <section ref={ref} className={clsx(styles["section"], { [styles["visible"]]: inView })} id="projects">
      <p className={styles["section-label"]}>Projects</p>
      <h2 className={styles["section-title"]}>프로젝트</h2>

      {categories.map(({ key, label }) => {
        const items = projects.filter((p) => p.category === key);
        if (items.length === 0) return null;
        return (
          <div key={key} className={styles["category-group"]}>
            <h3 className={styles["category-label"]}>{label}</h3>
            <div className={styles["grid"]}>
              {items.map((project) => (
                <article
                  key={project.id}
                  className={styles["card"]}
                  onClick={() => onSelect(project)}
                >
                  <div className={styles["card-top"]}>
                    <span className={styles["card-type"]}>{project.category}</span>
                    <span className={styles["card-arrow"]}>→</span>
                  </div>
                  <h3 className={styles["card-title"]}>{project.title}</h3>
                  <p className={styles["card-subtitle"]}>{project.subtitle}</p>
                  <div className={styles["tags"]}>
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className={styles["tag"]}>{tag}</span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className={styles["tag"]}>+{project.tags.length - 4}</span>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Projects;
