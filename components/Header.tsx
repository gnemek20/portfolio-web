import { useState, useEffect } from "react";
import clsx from "clsx";
import styles from "./Header.module.css";

const sections = [
  { id: "profile", label: "Profile" },
  { id: "timeline", label: "Timeline" },
  { id: "awards", label: "Awards" },
  { id: "projects", label: "Projects" },

];

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y > window.innerHeight * 0.6);
      setScrolled(y > 10);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={clsx(
        styles["header"],
        { [styles["visible"]]: visible },
        { [styles["scrolled"]]: scrolled },
      )}
    >
      <span className={styles["logo"]}>
        권민석<span className={styles["logo-accent"]}>.</span>
      </span>
      <nav className={styles["nav"]}>
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={clsx(styles["nav-link"], { [styles["active"]]: activeId === id })}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
};

export default Header;
