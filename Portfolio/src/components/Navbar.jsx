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
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Skills", href: "skills" },
    { name: "Projects", href: "projects" },
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
          isScrolled
            ? "top-4 max-w-5xl px-4"
            : "top-0 max-w-none px-0"
        )}
      >
        <nav
          className={cn(
            "flex items-center justify-between",
            "transition-all duration-500 ease-in-out",
            isScrolled
              ? "px-8 py-3 rounded-full backdrop-blur-xl bg-gray-900/90 border border-white/10 shadow-lg"
              : "px-5 py-2 sm:py-5 md:px-10 xl:px-20 max-sm:backdrop-blur-md"
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
          <ul className={cn(
            "flex items-center gap-3 max-sm:hidden",
            isScrolled && "ml-8"
          )}>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} smooth={true} duration={500}>
                <li
                  className={cn(
                    "active:scale-95 cursor-pointer transition-all duration-300",
                    isScrolled
                      ? "px-4 py-1.5 text-sm text-white/80 hover:text-primary hover:bg-primary/10 rounded-full"
                      : "nav-desktop-li-items"
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

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed sm:hidden z-40 list-none",
          "flex flex-col items-center",
          "bg-black bg-opacity-70 backdrop-blur-md",
          "transition-all duration-300 active:scale-95",
          "space-y-4 py-8 w-full",
          isMobileMenuOpen
            ? "-translate-y-0 opacity-100 top-13.5 left-0 right-0"
            : "-translate-y-full opacity-0"
        )}
      >
        {navLinks.map((link) => (
          <Link key={link.name} to={link.href} smooth={true} duration={500}>
            <li
              className="nav-li-items"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </li>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Navbar;
