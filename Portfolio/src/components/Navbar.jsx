import { cn } from "@/lib/utils";
import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import { MenuIcon, XIcon } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Intro", href: "intro" },
    { name: "Projects", href: "projects" },
    { name: "Experience", href: "experience" },
    { name: "Stack", href: "stack" },
    { name: "Contact", href: "contact" },
  ];

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Wrapper for floating effect */}
      <div
        className={cn(
          "fixed z-50 left-0 right-0 mx-auto",
          "transition-all duration-500 ease-in-out",
          isScrolled ? "top-4 max-w-5xl px-4" : "top-0 max-w-none px-0",
        )}
      >
        <nav
          className={cn(
            "flex items-center justify-between",
            "transition-all duration-500 ease-in-out",
            isScrolled
              ? "px-8 py-3 rounded-full backdrop-blur-xl bg-gray-900/90 border border-white/10 shadow-lg"
              : "px-5 py-2 sm:py-5 md:px-10 xl:px-20 max-sm:backdrop-blur-md",
          )}
        >
          {/* Logo or Portfolio Name */}
          <div>
            <span className="text-xl font-bold cursor-pointer">
              <Link to="home" smooth={true} duration={500}>
                <span className="text-glow">Shawaiz</span>{" "}
                <span className="text-primary">Shahid</span>
              </Link>
            </span>
          </div>

          {/* Desktop Navigation */}
          <ul
            className={cn(
              "flex items-center gap-3 max-sm:hidden",
              isScrolled && "ml-8",
            )}
          >
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} smooth={true} duration={500}>
                <li
                  className={cn(
                    "active:scale-95 cursor-pointer transition-all duration-300",
                    isScrolled
                      ? "px-4 py-1.5 text-sm text-white/80 hover:text-primary hover:bg-primary/10 rounded-full"
                      : "nav-desktop-li-items",
                  )}
                >
                  {link.name}
                </li>
              </Link>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenu}
            className="sm:hidden rounded-full z-20 p-2 drop-shadow-[0_0_8px_#ffffff] text-white transition-all duration-300"
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "fixed sm:hidden z-40 left-4 right-4 top-24",
          "rounded-2xl",
          "backdrop-blur-xl bg-gray-900/80 border border-white/10",
          "shadow-lg",
          "transition-all duration-300 ease-out",
          "overflow-hidden",
          isMobileMenuOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none",
        )}
      >
        <ul className="flex flex-col py-4">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} smooth={true} duration={500}>
              <li
                className="px-6 py-3 text-white/80 hover:text-primary hover:bg-white/5 cursor-pointer transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
