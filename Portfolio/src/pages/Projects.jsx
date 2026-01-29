import React from "react";
import { getImageUrl } from "../lib/imageURL";
import { Github, Eye } from "lucide-react";

const Projects = () => {
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
      title: "Logan Smith Tattoos",
      description:
        "Artistic portfolio for a tattoo artist with dark aesthetic and smooth gallery.",
      image: getImageUrl("Project 3.png"),
      technologies: ["HTML5", "CSS3", "JavaScript", "Google Icons", "Figma"],
      category: "web",
      liveDemo: "https://logan-smith-tattoos.netlify.app/",
      github:
        "https://github.com/MadG0blin359/FullStackForge/tree/main/Logan%20Smith%20Tattoos",
      featured: false,
    },
    {
      id: 4,
      title: "Flowtech Plumbing",
      description:
        "Professional plumbing business site with services, testimonials, and contact forms.",
      image: getImageUrl("Project 4.png"),
      technologies: ["HTML5", "CSS3", "JavaScript", "Google Icons", "Figma"],
      category: "web",
      liveDemo: "https://flowtech-plumbing.netlify.app/",
      github:
        "https://github.com/MadG0blin359/FullStackForge/tree/main/Flowtech%20Plumbing",
      featured: false,
    },
    {
      id: 5,
      title: "Zeh Plumbing Heating and Cooling",
      description:
        "HVAC and plumbing services site with service areas and booking options.",
      image: getImageUrl("Project 5.png"),
      technologies: ["HTML5", "CSS3", "JavaScript", "Google Icons", "Figma"],
      category: "web",
      liveDemo: "https://zeh-plumbing.netlify.app/",
      github:
        "https://github.com/MadG0blin359/FullStackForge/tree/main/Zeh%20Plumbing%20Heating%20and%20Cooling",
      featured: false,
    },
    {
      id: 6,
      title: "Animated Contact Form",
      description:
        "A figma design turned into an asthetic web page, with smooth animations and multi-theme mode support.",
      image: getImageUrl("Project 6.jpg"),
      technologies: ["HTML5", "CSS3", "JavaScript", "Google Icons", "Figma"],
      category: "web",
      liveDemo: "https://animatedcontactform.netlify.app/",
      github:
        "https://github.com/MadG0blin359/FullStackForge/tree/main/Animated%20Contact%20Form",
      featured: false,
    },
  ];


  return (
    <section id="projects" className="py-24 px-4 relative min-h-dvh z-10">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary">Projects</span>
        </h2>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.12)] flex flex-col"
            >
              {/* Project Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    Featured
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-primary/10 text-primary/80 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto pt-2">
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-4 rounded-lg bg-primary text-white text-sm font-medium text-center flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95"
                  >
                    <Eye size={16} />
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-4 rounded-lg bg-gray-800 text-white transition-all duration-300 hover:scale-105 hover:bg-gray-700 hover:shadow-lg active:scale-95"
                    aria-label="GitHub"
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
