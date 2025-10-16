import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Folder,
  User,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { userProfile } from "../../data/profileData";

const Sidebar = ({ activeItem, setActiveItem }) => {
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/" },
    { id: "projects", label: "Projects", icon: Folder, path: "/projects" },
    { id: "profile", label: "Profile Settings", icon: User, path: "/profile" },
  ];

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileSidebar}
        className="md:hidden fixed bottom-4 right-4 z-50 p-3 rounded-xl shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          backgroundColor: "var(--sidebar-bg)",
          color: "var(--text-primary)",
          border: "1px solid var(--border-primary)",
          boxShadow: "0 5px 5px rgba(0,0,0,0.4)",
        }}
      >
        {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Overlay for mobile */}
      <div
        className={`md:hidden fixed inset-0 bg-black z-30 transition-opacity duration-300 ${
          isMobileOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMobileSidebar}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-40 flex flex-col
          transition-all duration-500 ease-in-out
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
        style={{
          backgroundColor: "var(--sidebar-bg)",
          borderRight: "1px solid var(--sidebar-border)",
          width: isCollapsed ? "80px" : "256px",
          boxShadow: "4px 0 24px var(--card-shadow)",
        }}
      >
        {/* Logo/Header */}
        <div
          className={`relative m-2 ${
            isCollapsed ? "p-2" : "p-6"
          } flex items-center ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
          style={{ borderBottom: "1px solid var(--sidebar-border)" }}
        >
          {/* Expanded Logo */}
          <div
            className={`transition-all duration-500 ${
              isCollapsed
                ? "opacity-0 scale-75 -translate-x-4 hidden"
                : "opacity-100 scale-100 translate-x-0"
            }`}
          >
            <h1
              className="text-2xl font-bold whitespace-nowrap tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Panel<span style={{ color: "var(--accent-primary)" }}>Flow</span>
            </h1>
            <p
              className="text-xs mt-1 font-medium"
              style={{ color: "var(--text-tertiary)" }}
            >
              Dashboard v1.0
            </p>
          </div>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={toggleCollapse}
            className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 active:scale-95 hover:rotate-180 cursor-pointer max-sm:hidden`}
            style={{
              backgroundColor: "var(--bg-tertiary)",
              color: "var(--text-secondary)",
              width: "40px",
              height: "40px",
              padding: "8px",
            }}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight size={24} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto overflow-x-hidden">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setActiveItem(item.id);
                      setIsMobileOpen(false);
                    }}
                    className={`
                      group relative w-full flex items-center px-4 py-3.5 rounded-xl cursor-pointer
                      transition-all duration-300 overflow-hidden
                      ${isCollapsed ? "justify-center px-2" : ""}
                      ${
                        isActive
                          ? "shadow-lg"
                          : "hover:scale-105 active:scale-95"
                      }
                    `}
                    style={{
                      backgroundColor: isActive
                        ? "var(--sidebar-item-active-bg)"
                        : "transparent",
                      color: isActive
                        ? "var(--sidebar-item-active)"
                        : "var(--sidebar-item)",
                      transform: isActive ? "translateX(4px)" : "translateX(0)",
                      height: "48px",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor =
                          "var(--sidebar-item-hover)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                    title={isCollapsed ? item.label : ""}
                  >
                    {/* Active Indicator */}
                    {isActive && (
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full transition-all duration-300"
                        style={{ backgroundColor: "var(--accent-primary)" }}
                      />
                    )}

                    {/* Icon with background */}
                    <div
                      className={`
                        flex items-center justify-center rounded-lg transition-all duration-300
                        ${isActive ? "scale-110" : "group-hover:scale-110"}
                      `}
                      style={{
                        width: isCollapsed ? "40px" : "36px",
                        height: isCollapsed ? "40px" : "36px",
                        padding: isCollapsed ? "8px" : "6px",
                        backgroundColor: isActive
                          ? "var(--accent-primary)"
                          : "transparent",
                        flexShrink: 0,
                      }}
                    >
                      <Icon
                        size={isCollapsed ? 24 : 20}
                        style={{
                          color: isActive ? "white" : "var(--text-tertiary)",
                        }}
                      />
                    </div>

                    {/* Label */}
                    <span
                      className={`
                        font-medium whitespace-nowrap transition-all duration-500
                        ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}
                      `}
                    >
                      {item.label}
                    </span>

                    {/* Hover effect for collapsed state */}
                    {isCollapsed && (
                      <div
                        className="absolute left-full ml-4 px-3 py-2 rounded-lg whitespace-nowrap pointer-events-none
                                   opacity-0 group-hover:opacity-100 transition-all duration-300 z-50 shadow-xl"
                        style={{
                          backgroundColor: "var(--card-bg)",
                          border: "1px solid var(--border-primary)",
                          color: "var(--text-primary)",
                        }}
                      >
                        {item.label}
                      </div>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div
          className={`${isCollapsed ? "p-2" : "p-4"}`}
          style={{ borderTop: "1px solid var(--sidebar-border)" }}
        >
          <div
            className={`
              flex items-center p-3 rounded-xl cursor-pointer
              transition-all duration-300 hover:scale-105
              ${isCollapsed ? "justify-center" : "gap-3"}
            `}
            style={{
              backgroundColor: "var(--bg-tertiary)",
              boxShadow: "0 2px 8px var(--card-shadow)",
            }}
            onClick={() => {
              navigate("/profile");
              setActiveItem("profile");
              setIsMobileOpen(false);
            }}
          >
            <div
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
              }}
            >
              {userProfile.avatar}
              <div
                className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                style={{
                  backgroundColor: "var(--accent-success)",
                  borderColor: "var(--bg-tertiary)",
                }}
              />
            </div>
            <div
              className={`
                flex-1 transition-all duration-500 overflow-hidden
                ${isCollapsed ? "opacity-0 w-0" : "opacity-100"}
              `}
            >
              <p
                className="text-sm font-semibold whitespace-nowrap"
                style={{ color: "var(--text-primary)" }}
              >
                {userProfile.name}
              </p>
              <p
                className="text-xs whitespace-nowrap"
                style={{ color: "var(--text-tertiary)" }}
              >
                {userProfile.role}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Spacer for main content on desktop */}
      <div
        className="hidden md:block transition-all duration-500"
        style={{ width: isCollapsed ? "80px" : "256px" }}
      />
    </>
  );
};

export default Sidebar;
