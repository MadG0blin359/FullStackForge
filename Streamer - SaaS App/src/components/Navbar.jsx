import { useState } from "react";
import { RiCloseFill, RiMenu3Line } from "react-icons/ri";
import logo from "../assets/logo.png";
import { motion } from "framer-motion";
import { Link } from "react-scroll";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Home", href: "home", onDesktop: false },
    { name: "How it works", href: "works", onDesktop: true },
    { name: "Key Features", href: "features", onDesktop: false },
    { name: "Pricing", href: "pricing", onDesktop: true },
    { name: "Testimonials", href: "testimonials", onDesktop: true },
    { name: "Contact", href: "contact", onDesktop: true },
  ];

  return (
    <motion.nav
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      className="fixed top-4 left-0 right-0 z-50 m-2"
    >
      <div className="text-neutral-500 bg-black/60 backdrop-blur-md max-w-7xl mx-auto px-4 py-3 flex items-center rounded-xl border border-neutral-800">
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="mr-auto cursor-pointer"
        >
          <img src={logo} alt="logo" width={120} height={24}></img>
        </Link>

        {/* Center: Links (hidden on mobile) */}
        <ul className="hidden md:flex md:space-x-6 ml-auto">
          {navLinks.map((link) =>
            link.onDesktop ? (
              <Link key={link.name} to={link.href} smooth={true} duration={500}>
                <li className="cursor-pointer hover:text-neutral-200 transition-all ease-in-out duration-300">
                  {link.name}
                </li>
              </Link>
            ) : null
          )}
        </ul>

        {/* Right: Buttons (hidden on mobile) */}
        <div className="hidden md:flex space-x-4 items-center ml-auto">
          <a
            href="#"
            className="hover:text-neutral-200 text-center transition-all ease-in-out duration-300"
          >
            Login
          </a>
          <a
            href="#"
            className="border border-neutral-700 text-white py-2 px-4 rounded-lg hover:bg-neutral-700 text-center transition-all ease-in-out duration-300"
          >
            Get a demo
          </a>
          <a
            href="#"
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 text-center transition-all ease-in-out duration-300"
          >
            Start Free Trial
          </a>
        </div>
        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            <RiMenu3Line
              className={`w-6 h-6 transition-all duration-300 ${
                isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
              }`}
            />
            <RiCloseFill
              className={`w-6 h-6 absolute bottom-3.5 transition-all duration-300 ${
                isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          variants={fadeIn}
          className={`md:hidden max-w-lg mx-auto text-sm
        bg-neutral-900/60 backdrop-blur-md border border-neutral-800 p-4 rounded-xl mt-2 
        transition-all ease-in duration-200 
        ${
          isOpen
            ? "max-h-screen opacity-100" // When OPEN: Full height, fully visible
            : "max-h-0 opacity-0 overflow-hidden pointer-events-none" // When CLOSED: Zero height, invisible, clip contents
        }
    `}
        >
          <ul className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.href} smooth={true} duration={500}>
                <li className="cursor-pointer hover:text-neutral-200">
                  {link.name}
                </li>
              </Link>
            ))}

            <a
              href="#"
              className="border border-neutral-700 text-white py-2 px-4 rounded-lg hover:bg-neutral-700 text-center"
            >
              Get a demo
            </a>
            <a
              href="#"
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500 text-center"
            >
              Start Free Trial
            </a>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
