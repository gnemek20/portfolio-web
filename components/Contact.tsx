import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <footer className={styles["footer"]}>
      <span className={styles["text"]}>
        © 2026 권민석 · 본 사이트는 AI Agent만으로 제작되었습니다
      </span>
      <a href="mailto:gnemek20@gmail.com" className={styles["email"]}>
        gnemek20@gmail.com
      </a>
    </footer>
  );
};

export default Contact;
