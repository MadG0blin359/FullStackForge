import React from "react";
import { Code, Palette, Database, Wrench, Globe } from "lucide-react";

const Skills = () => {
  const skillsData = [
    {
      category: "Frontend Development",
      icon: Code,
      skills: [
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "React", level: 80 },
        { name: "TypeScript", level: 70 },
        { name: "Tailwind CSS", level: 85 },
      ],
    },
    {
      category: "UI/UX Design",
      icon: Palette,
      skills: [
        { name: "Figma", level: 75 },
        { name: "Adobe XD", level: 70 },
        { name: "Prototyping", level: 80 },
        { name: "User Research", level: 65 },
      ],
    },
    {
      category: "Backend & Databases",
      icon: Database,
      skills: [
        { name: "Node.js", level: 70 },
        { name: "Express.js", level: 65 },
        { name: "MongoDB", level: 60 },
        { name: "SQL", level: 55 },
      ],
    },
    {
      category: "Tools & Technologies",
      icon: Wrench,
      skills: [
        { name: "Git", level: 85 },
        { name: "VS Code", level: 90 },
        { name: "Webpack", level: 60 },
        { name: "Docker", level: 50 },
      ],
    },
    {
      category: "Web Performance",
      icon: Globe,
      skills: [
        { name: "SEO", level: 75 },
        { name: "Accessibility", level: 80 },
        { name: "Optimization", level: 70 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 relative min-h-dvh z-10">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, index) => (
            <div
              key={index}
              className="gradient-border p-6 card-hover cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-primary/10">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{category.category}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
