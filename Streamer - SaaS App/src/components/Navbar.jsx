import { useState } from "react";
import { RiCloseFill, RiMenu3Line } from "react-icons/ri";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 m-2">
      <div className="text-neutral-500 bg-black/60 backdrop-blur-md max-w-7xl mx-auto px-4 py-3 flex justify-between items-center rounded-xl border border-neutral-800">
        <img src={logo} alt="logo" width={120} height={24}></img>

        {/* Center: Links (hidden on mobile) */}
        <div className="hidden md:flex space-x-6">
          <a
            href="#works"
            className="hover:text-neutral-200 transition-all ease-in-out duration-300"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="hover:text-neutral-200 transition-all ease-in-out duration-300"
          >
            Pricing
          </a>
          <a
            href="#testimonials"
            className="hover:text-neutral-200 transition-all ease-in-out duration-300"
          >
            Testimonials
          </a>
        </div>

        {/* Right: Buttons (hidden on mobile) */}
        <div className="hidden md:flex space-x-4 items-center">
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
            {isOpen ? <RiCloseFill /> : <RiMenu3Line />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          className={`md:hidden 
        bg-neutral-900/60 backdrop-blur-md border border-neutral-800 p-4 rounded-xl mt-2 
        transition-all ease-in-out duration-500 
        ${
          isOpen
            ? "max-h-screen opacity-100" // When OPEN: Full height, fully visible
            : "max-h-0 opacity-0 overflow-hidden" // When CLOSED: Zero height, invisible, clip contents
        }
    `}
        >
          <div className="flex flex-col space-y-4">
            <a href="#" className="hover:text-neutral-200">
              Product
            </a>
            <a href="#" className="hover:text-neutral-200">
              Pricing
            </a>
            <a href="#" className="hover:text-neutral-200">
              Resources
            </a>
            <a href="#" className="hover:text-white">
              Login
            </a>

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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
