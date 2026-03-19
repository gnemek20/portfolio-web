import { useState } from "react";
import { Project } from "@/data/projects";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Projects from "@/components/Projects";
import ProjectDialog from "@/components/ProjectDialog";
import Optimizations from "@/components/Optimizations";
import Contact from "@/components/Contact";
import styles from "@/styles/index.module.css";

const Home = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <main className={styles["main"]}>
      <Header />
      <Hero />
      <Profile />
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
  );
};

export default Home;