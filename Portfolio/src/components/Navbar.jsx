import { cn } from "@/lib/utils";
import { Link } from "react-scroll";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      <nav
        className={cn(
          "fixed w-dvw z-10",
          "px-5 py-2 sm:py-5 md:px-10 xl:px-20",
          "transition-all duration-300",
          "flex items-center justify-between",
          "max-sm:backdrop-blur-md"
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
        <ul className="flex items-center gap-3 max-sm:hidden">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} smooth={true} duration={500}>
              <li className="nav-desktop-li-items active:scale-95">
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
      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed sm:hidden z-5 list-none",
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
