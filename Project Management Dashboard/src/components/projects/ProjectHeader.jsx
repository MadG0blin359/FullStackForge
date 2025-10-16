import React from "react";
import { Plus } from "lucide-react";

const ProjectHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2
          className="text-2xl sm:text-3xl font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          Projects Overview
        </h2>
        <p className="text-sm mt-1" style={{ color: "var(--text-tertiary)" }}>
          Manage and track all your projects in one place
        </p>
      </div>
      <button
        className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl font-semibold text-white cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg text-sm sm:text-base"
        style={{
          background:
            "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
          boxShadow: "0 4px 20px var(--card-shadow)",
        }}
      >
        <Plus size={20} />
        <span className="hidden sm:inline">Add New Project</span>
        <span className="sm:hidden">Add Project</span>
      </button>
    </div>
  );
};

export default ProjectHeader;
