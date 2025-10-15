import { Sun, Moon, Bell, Search, User, Settings, LogOut } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useState } from "react";

const Header = ({ pageTitle }) => {
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, message: "New project assigned", time: "2 min ago", unread: true },
    {
      id: 2,
      message: "Task deadline approaching",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      message: "Team meeting scheduled",
      time: "3 hours ago",
      unread: false,
    },
  ];

  return (
    <header
      className="sticky top-0 z-20 shadow-lg backdrop-blur-sm transition-all duration-500 ease-in-out"
      style={{
        backgroundColor: "var(--header-bg)",
        borderBottom: "1px solid var(--header-border)",
      }}
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Page Title */}
        <div className="flex items-center gap-4">
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {pageTitle}
          </h2>
          <div
            className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "white",
            }}
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse cursor-pointer"></div>
            Live Dashboard
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 focus-within:ring-2"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <Search size={18} style={{ color: "var(--text-tertiary)" }} />
            <input
              type="text"
              placeholder="Search projects, tasks..."
              className="bg-transparent outline-none text-sm w-48"
              style={{ color: "var(--text-primary)" }}
            />
          </div>

          {/* Mobile Search Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-[var(--header-button-hover)] active:scale-95 transition-all duration-300"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
            }}
          >
            <Search size={20} style={{ color: "var(--text-secondary)" }} />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl cursor-pointer hover:bg-[var(--header-button-hover)] active:scale-95 transition-all duration-300"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <Bell size={20} style={{ color: "var(--text-secondary)" }} />
              {notifications.filter((n) => n.unread).length > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center text-xs font-bold animate-pulse"
                  style={{
                    backgroundColor: "var(--accent-danger)",
                    color: "white",
                  }}
                >
                  {notifications.filter((n) => n.unread).length}
                </span>
              )}
            </button>

            {/* Notifications Panel */}
            {showNotifications && (
              <div
                className="absolute right-0 mt-2 w-80 rounded-xl shadow-xl border z-50 max-h-96 overflow-y-auto"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                }}
              >
                <div
                  className="p-4 border-b"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  <h3
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Notifications
                  </h3>
                </div>
                <div
                  className="divide-y"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 hover:opacity-80 transition-opacity cursor-pointer"
                      style={{
                        backgroundColor: notification.unread
                          ? "var(--bg-secondary)"
                          : "transparent",
                      }}
                    >
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {notification.message}
                      </p>
                      <p
                        className="text-xs mt-1"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        {notification.time}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  className="p-3 border-t"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  <button
                    className="w-full text-sm font-medium py-2 rounded-lg transition-colors"
                    style={{
                      color: "var(--accent-primary)",
                      backgroundColor: "var(--bg-secondary)",
                    }}
                  >
                    View All Notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 cursor-pointer rounded-xl hover:bg-[var(--header-button-hover)] active:scale-95 transition-all duration-300"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-primary)",
            }}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon size={20} style={{ color: "var(--text-secondary)" }} />
            ) : (
              <Sun size={20} style={{ color: "var(--text-secondary)" }} />
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 rounded-xl hover:bg-[var(--header-button-hover)] active:scale-95 transition-all duration-300"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border-primary)",
              }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                }}
              >
                JD
              </div>
            </button>

            {/* User Menu Panel */}
            {showUserMenu && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl border z-50"
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                }}
              >
                <div
                  className="p-4 border-b"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                      }}
                    >
                      JD
                    </div>
                    <div>
                      <p
                        className="font-semibold text-sm"
                        style={{ color: "var(--text-primary)" }}
                      >
                        John Doe
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        Administrator
                      </p>
                    </div>
                  </div>
                </div>
                <div className="py-2">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:opacity-80 transition-opacity">
                    <User
                      size={16}
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <span style={{ color: "var(--text-primary)" }}>
                      Profile
                    </span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:opacity-80 transition-opacity">
                    <Settings
                      size={16}
                      style={{ color: "var(--text-secondary)" }}
                    />
                    <span style={{ color: "var(--text-primary)" }}>
                      Settings
                    </span>
                  </button>
                  <div
                    className="border-t my-2"
                    style={{ borderColor: "var(--card-border)" }}
                  ></div>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:opacity-80 transition-opacity text-red-500">
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
