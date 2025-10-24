import { ArrowDown } from "lucide-react";
import React from "react";
import { Link } from "react-scroll";

const HomeSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-dvh flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> Hi, I'm </span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              Shawaiz{" "}
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              {" "}
              Shahid{" "}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            I create stellar web experiences with modern technologies.
            Specializing in front-end development, I build interfaces that are
            both beautiful and functional.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4 active:scale-95">
            <Link to="projects" smooth={true} duration={500}>
              <span className="cosmic-button">View My Work</span>
            </Link>
          </div>
        </div>
      </div>

      <Link to="about" smooth={true} duration={500}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce cursor-pointer">
          <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
          <ArrowDown className="h-5 w-5 text-primary" />
        </div>
      </Link>
    </section>
  );
};

export default HomeSection;
