import { useState } from "react";
import Head from "next/head";
import { Project } from "@/data/projects";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Timeline from "@/components/Timeline";
import Awards from "@/components/Awards";
import Projects from "@/components/Projects";
import Optimizations from "@/components/Optimizations";
import ProjectDialog from "@/components/ProjectDialog";

import Contact from "@/components/Contact";
import styles from "@/styles/index.module.css";

const Home = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <Head>
        <title>권민석 | Frontend Engineer</title>
        <meta name="description" content="React, Next.js, TypeScript 기반 프론트엔드 엔지니어 권민석의 포트폴리오입니다. 최적화와 디테일을 코드로 증명합니다." />
        <meta property="og:title" content="권민석 | Frontend Engineer" />
        <meta property="og:description" content="React, Next.js, TypeScript 기반 프론트엔드 엔지니어 권민석의 포트폴리오" />
        <meta property="og:type" content="website" />
        {/* <meta property="og:url" content="https://your-domain.com" /> */}
        {/* <meta property="og:image" content="https://your-domain.com/og-image.png" /> */}
      </Head>
      <main className={styles["main"]}>
      <Header />
      <Hero />
      <Profile />
      <div className={styles["warm-bg"]}>
        <Timeline />
      </div>
      <Awards />
      <div className={styles["warm-bg"]}>
        <Projects onSelect={setSelectedProject} />
      </div>

      <Optimizations />
      <Contact />
      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
    </>
  );
};

export default Home;