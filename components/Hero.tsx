import { useState, useEffect, memo } from "react";
import clsx from "clsx";
import styles from "./Hero.module.css";

const TypingText = memo(({ text, play }: { text: string; play: boolean }) => {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    if (!play) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 80);
    return () => clearInterval(id);
  }, [play, text]);

  return (
    <span className={styles["typing"]}>
      {display}
      <span className={clsx(styles["cursor"], { [styles["cursor-blink"]]: display.length === text.length })} />
    </span>
  );
});

TypingText.displayName = "TypingText";

const Hero = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const delays = [400, 700, 500, 350, 500, 600, 400, 500];
    let timer: ReturnType<typeof setTimeout>;
    let current = 0;

    const next = () => {
      if (current >= delays.length) return;
      timer = setTimeout(() => {
        current++;
        setStep(current);
        next();
      }, delays[current]);
    };

    next();
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles["hero"]}>
      <div className={styles["stage"]}>
        <p className={clsx(styles["label"], { [styles["play"]]: step >= 0 })}>
          Frontend Engineer
        </p>

        <div className={clsx(styles["line-reveal"], { [styles["play"]]: step >= 1 })}>
          <span className={styles["line-mask"]} />
        </div>

        <h1 className={clsx(styles["title"], { [styles["play"]]: step >= 2 })}>
          안녕하세요,{" "}
          <span className={styles["name"]}>권민석</span>입니다
        </h1>

        <div className={clsx(styles["accent-bar"], { [styles["play"]]: step >= 3 })} />

        <p className={clsx(styles["tagline"], { [styles["play"]]: step >= 4 })}>
          <TypingText text="최적화와 디테일을 코드로 증명합니다" play={step >= 5} />
        </p>

        <div className={clsx(styles["badge-row"], { [styles["play"]]: step >= 6 })}>
          <span className={styles["badge"]}>React</span>
          <span className={styles["badge"]}>Next.js</span>
          <span className={styles["badge"]}>TypeScript</span>
        </div>

        <div className={clsx(styles["scroll-hint"], { [styles["play"]]: step >= 7 })}>
          <span className={styles["scroll-arrow"]} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
