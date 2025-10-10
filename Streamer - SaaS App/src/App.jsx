import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import KeyFeatures from "./components/KeyFeatures";
import PricingPlans from "./components/PricingPlans";

const App = () => {
  return (
    <main className="text-sm text-neutral-300 antialiased">
      <Navbar />
      <Hero />
      <HowItWorks />
      <KeyFeatures />
      <PricingPlans />
    </main>
  );
};

export default App;
