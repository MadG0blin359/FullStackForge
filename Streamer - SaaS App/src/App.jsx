import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";

const App = () => {
  return (
    <main className="text-sm text-neutral-300 antialiased">
      <Navbar />
      <Hero />
      <HowItWorks />
    </main>
  );
};

export default App;
