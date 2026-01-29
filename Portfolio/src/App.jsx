import React from "react";
import StarBackground from "./components/StarBackground";
import MeteorBackground from "./components/MeteorBackground";
import ThemeToggle from "./components/ThemeToggle";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <>
      {/* Background */}
      <StarBackground />
      <MeteorBackground />
      <ThemeToggle />
      <Navbar />

      {/* Pages */}
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default App;
