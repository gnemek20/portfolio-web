import styles from "./Contact.module.css";

const Contact = () => {
  return (
    <footer className={styles["footer"]}>
      <span className={styles["text"]}>
        © 2026 권민석 · 코드로 증명하는 프론트엔드 엔지니어
      </span>
      <a href="mailto:gnemek20@gmail.com" className={styles["email"]}>
        gnemek20@gmail.com
      </a>
    </footer>
  );
};

export default Contact;
