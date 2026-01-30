import React from "react";
import { ArrowDown } from "lucide-react";
import { Link } from "react-scroll";

const Home = () => {
  return (
    <section
      id="home"
      className="relative min-h-dvh flex items-center justify-center px-4 overflow-hidden pt-20 pb-24 md:pb-0"
    >
      <div className="container max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20 z-10 w-full">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            <span className="opacity-0 animate-fade-in block">Hi, I'm</span>
            <div className="block mt-2 whitespace-nowrap opacity-0 animate-fade-in-delay-1">
               <span className="text-primary">Shawaiz</span>
               <span className="text-gradient ml-2">Shahid</span>
            </div>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0 opacity-0 animate-fade-in-delay-3 leading-relaxed">
            I create stellar web experiences with modern technologies.
            Specializing in front-end development, I build interfaces that are
            both beautiful and functional.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4 flex flex-wrap gap-4 justify-center md:justify-start items-center">
            <Link to="projects" smooth={true} duration={500}>
              <span className="cosmic-button active:scale-95 text-lg px-8 py-3">View My Work</span>
            </Link>
            <a
              href="/Front-End CV.pdf"
              download
              className="px-8 py-3 rounded-full border-2 border-primary text-primary font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 text-lg"
            >
              <ArrowDown size={20} />
              Download CV
            </a>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 relative flex justify-center md:justify-end opacity-0 animate-fade-in">
           {/* Blob Background */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[80px] rounded-full -z-10 animate-pulse" />
           
           <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl animate-float">
            <img 
              src="/Headshot.png" 
              alt="Shawaiz Shahid" 
              className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700"
            />
             {/* Gradient Overlay */}
             <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
           </div>
        </div>

      </div>

      <Link to="about" smooth={true} duration={500}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce cursor-pointer hover:text-primary transition-colors">
          <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
          <ArrowDown className="h-5 w-5" />
        </div>
      </Link>
    </section>
  );
};

export default Home;
