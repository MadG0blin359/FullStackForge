import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Profile from "../pages/Profile";

const DashboardRoutes = ({ activeItem, setActiveItem }) => {
  const location = useLocation();

  // Update active item based on current route
  React.useEffect(() => {
    const pathToItem = {
      "/": "overview",
      "/projects": "projects",
      "/profile": "profile",
    };
    setActiveItem(pathToItem[location.pathname] || "overview");
  }, [location.pathname, setActiveItem]);

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default DashboardRoutes;
