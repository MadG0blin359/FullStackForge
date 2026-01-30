import React from "react";
import { Link } from "react-scroll";
import { Briefcase, Code, User } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative min-h-dvh z-10 flex items-center">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
          About <span className="text-gradient">Me</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in-left">
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              Passionate Web Developer & Tech Creator
            </h3>

            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                With over <span className="text-foreground font-semibold">1 year of experience</span> in web development, 
                I specialize in creating responsive, accessible, and performant web applications using modern technologies.
              </p>
              <p>
                I'm passionate about creating elegant solutions to complex problems, and I'm constantly learning 
                new technologies and techniques to stay at the forefront of the ever-evolving web landscape.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Link to="contact" smooth={true} duration={500}>
                <button className="cosmic-button w-full sm:w-auto text-lg px-8 py-3">Get in Touch</button>
              </Link>
              <a
                href="/Front-End CV.pdf"
                download
                className="px-8 py-3 rounded-full border-2 border-primary text-primary font-medium transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 text-lg w-full sm:w-auto"
              >
                <Briefcase size={20} />
                Download CV
              </a>
            </div>
          </div>

          {/* Skill Cards */}
          <div className="grid grid-cols-1 gap-6 animate-fade-in-right">
            {[
              {
                icon: Code,
                title: "Web Development",
                desc: "Creating responsive websites and web applications with modern frameworks like React and Tailwind CSS."
              },
              {
                icon: User,
                title: "UI/UX Design",
                desc: "Designing intuitive user interfaces and seamless user experiences with a focus on accessibility."
              },
              {
                icon: Briefcase,
                title: "Project Management",
                desc: "Leading projects from conception to completion with agile methodologies and effective communication."
              }
            ].map((skill, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.1)] hover:-translate-y-1"
              >
                <div className="flex items-start gap-5">
                  <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <skill.icon size={28} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-xl group-hover:text-primary transition-colors">{skill.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {skill.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
