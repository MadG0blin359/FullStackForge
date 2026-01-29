import React from "react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Link } from "react-scroll";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Skills", href: "skills" },
    { name: "Projects", href: "projects" },
    { name: "Contact", href: "contact" },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/MadG0blin359/",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shawaiz-shahid-2695181b5/",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:shawaizshahid312@gmail.com",
    },
  ];

  return (
    <footer className="relative z-10 border-t border-border bg-background/50 backdrop-blur-md">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="home" smooth={true} duration={500} className="cursor-pointer">
              <h3 className="text-2xl font-bold">
                <span className="text-glow">Shawaiz</span>{" "}
                <span className="text-primary">Shahid</span>
              </h3>
            </Link>
            <p className="text-muted-foreground text-sm">
              Front-End Developer crafting beautiful and functional web experiences
              with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    smooth={true}
                    duration={500}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4 text-center">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-muted hover:bg-primary/20 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Hyderabad, Pakistan
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © {currentYear} Shawaiz Shahid. All rights reserved.
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using React & Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
