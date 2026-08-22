import React from "react";
import { Code, Palette, Database, Wrench, Globe } from "lucide-react";

const Skills = () => {
  const skillsData = [
    {
      category: "Frontend Development",
      icon: Code,
      skills: [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "TypeScript",
        "Tailwind CSS",
      ],
    },
    {
      category: "UI/UX Design",
      icon: Palette,
      skills: ["Figma", "Framer", "Prototyping", "User Research"],
    },
    {
      category: "Backend & Databases",
      icon: Database,
      skills: ["Node.js", "Express.js", "MongoDB", "SQL"],
    },
    {
      category: "Tools & Technologies",
      icon: Wrench,
      skills: ["Git", "VS Code", "Webpack", "Docker"],
    },
    {
      category: "Web Performance",
      icon: Globe,
      skills: ["SEO", "Accessibility", "Optimization"],
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 relative min-h-dvh z-10">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary">Stack</span>
        </h2>
        <p className="text-muted-foreground text-center mb-16 max-w-2xl mx-auto">
          Technologies and tools I use to bring ideas to life
        </p>

        <div className="space-y-12">
          {skillsData.map((category, index) => (
            <div key={index} className="group">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold">
                  {category.category}
                </h3>
                <div className="flex-1 h-px bg-gradient-to-r from-border to-transparent"></div>
              </div>

              {/* Skill Chips */}
              <div className="flex flex-wrap gap-3 pl-2 md:pl-16">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-5 py-2.5 rounded-full bg-card border border-border text-sm font-medium
                               hover:border-primary hover:bg-primary/10 hover:text-primary hover:scale-105
                               hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]
                               transition-all duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-6">
            Always learning and exploring new technologies
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
