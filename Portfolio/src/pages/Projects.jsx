import React, { useState } from "react";
import { getImageUrl } from "../lib/imageURL";
import { ExternalLink, Github, Eye } from "lucide-react";

const Projects = () => {
  const [filter, setFilter] = useState("all");

  const projectsData = [
    {
      id: 1,
      title: "Streamer SaaS App",
      description:
        "A modern, responsive SaaS website built with React and Tailwind CSS, featuring smooth animations.",
      image: getImageUrl("Project 1.jpg"),
      technologies: [
        "Tailwind CSS",
        "JavaScript",
        "React",
        "Framer Motion",
        "React Icons",
        "React Scroll",
        "Figma",
      ],
      category: "web",
      liveDemo: "https://streamer-saas.vercel.app/",
      github:
        "https://github.com/MadG0blin359/FullStackForge/tree/main/Streamer%20-%20SaaS%20App",
      featured: false,
    },
    {
      id: 2,
      title: "Project Management Dashboard",
      description:
        "Front-End design of project management dashboard, featuring visuals and all details of project metrics.",
      image: getImageUrl("Project 2.jpg"),
      technologies: [
        "Tailwind CSS",
        "JavaScript",
        "React",
        "React Router",
        "Lucide Icons",
        "Chart.js",
      ],
      category: "web",
      liveDemo: "https://panelflow.vercel.app/",
      github:
        "https://github.com/MadG0blin359/FullStackForge/tree/main/Project%20Management%20Dashboard",
      featured: true,
    },
    {
      id: 3,
      title: "Animated Contact Form	",
      description:
        "A figma design turned into an asthetic web page, with smooth animations and multi-theme mode support.",
      image: getImageUrl("Project 3.jpg"),
      technologies: ["HTML5", "CSS3", "JavaScript", "Google Icons", "Figma"],
      category: "web",
      liveDemo: "https://animatedcontactform.netlify.app/",
      github:
        "https://github.com/MadG0blin359/FullStackForge/tree/main/Animated%20Contact%20Form",
      featured: false,
    },
  ];

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "web", name: "Web Apps" },
    { id: "mobile", name: "Mobile Apps" },
    { id: "design", name: "Design" },
  ];

  const filteredProjects =
    filter === "all"
      ? projectsData
      : projectsData.filter((project) => project.category === filter);

  return (
    <section id="projects" className="py-24 px-4 relative min-h-dvh z-10">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          My <span className="text-primary">Projects</span>
        </h2>
        {/* <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          A showcase of my recent work and creative projects that demonstrate my
          skills and passion for development.
        </p> */}

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-6 py-2 rounded-full hover:cursor-pointer transition-all duration-300 ${
                filter === category.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="gradient-border p-6 card-hover cursor-pointer group"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {project.featured && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </div>
                )}
              </div>

              {/* Project Info */}
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 cosmic-button text-center flex items-center justify-center gap-2"
                >
                  <Eye size={16} />
                  Live Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-muted hover:bg-muted/80 transition-colors duration-300"
                  aria-label="View on GitHub"
                >
                  <Github size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
