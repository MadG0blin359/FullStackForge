import { Sun, Moon, Bell, Search } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Header = ({ pageTitle }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="sticky top-0 z-20 shadow-sm"
      style={{
        backgroundColor: "var(--header-bg)",
        borderBottom: "1px solid var(--header-border)",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Page Title */}
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {pageTitle}
          </h2>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <Search size={18} style={{ color: "var(--text-tertiary)" }} />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-48"
              style={{ color: "var(--text-primary)" }}
            />
          </div>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <Bell size={20} style={{ color: "var(--text-secondary)" }} />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: "var(--accent-danger)" }}
            />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:opacity-80 transition-opacity"
            style={{ backgroundColor: "var(--bg-secondary)" }}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon size={20} style={{ color: "var(--text-secondary)" }} />
            ) : (
              <Sun size={20} style={{ color: "var(--text-secondary)" }} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
