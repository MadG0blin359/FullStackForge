import React from "react";
import StarBackground from "@/components/StarBackground";
import MeteorBackground from "../components/MeteorBackground";
import ThemeToggle from "../components/ThemeToggle";
import Navbar from "../components/Navbar";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contact from "./Contact";

const Home = () => {
  return (
    <div
      id="home"
      className="min-h-dvh bg-background text-foreground overflow-x-hidden"
    >
      <StarBackground />
      <MeteorBackground />
      <ThemeToggle />
      <Navbar />
      <h1 className="min-h-dvh flex items-center justify-center">Home</h1>
      <About />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

export default Home;
