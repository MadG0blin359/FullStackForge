import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// Function to get the initial theme synchronously
const getInitialTheme = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedTheme = localStorage.getItem("isDarkMode");
    if (storedTheme !== null) {
      return JSON.parse(storedTheme);
    }
  }
  // Default to dark mode if no preference is found
  return true;
};

const ThemeToggle = () => {
  const [isDarkMode, setDarkMode] = useState(getInitialTheme);

  // Synchronously apply the theme class before the first render
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }

  // Use useEffect to handle the side effect of saving to localStorage
  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    // Simply toggle the state. The useEffect will handle the rest.
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "group",
        "cursor-pointer",
        "max-xl:hidden",
        "active:scale-95",
        "z-15 p-2",
        "fixed top-4 right-2.5",
        "rounded-full bg-gray-900 hover:bg-gray-700",
        "transition-colors duration-300",
        "focus:outline-none focus:ring-2 focus:ring-blue-500"
      )}
    >
      {isDarkMode ? (
        <SunIcon
          className={cn(
            "h-6 w-6",
            "text-white drop-shadow-[0_0_8px_#ffffff]",
            "group-hover:text-primary group-hover:drop-shadow-[0_0_8px_#primary]"
          )}
        />
      ) : (
        <MoonIcon
          className={cn(
            "h-6 w-6",
            "text-white drop-shadow-[0_0_8px_#ffffff]",
            "group-hover:text-primary group-hover:drop-shadow-[0_0_8px_#primary]"
          )}
        />
      )}
    </button>
  );
};

export default ThemeToggle;
