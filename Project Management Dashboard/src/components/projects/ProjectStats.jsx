import React from "react";
import { Target, Clock, CheckCircle, DollarSign } from "lucide-react";
import { projects, projectStatusCounts } from "../../data/projectsData";

const ProjectStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        className="p-6 rounded-xl shadow-lg border transition-all duration-500 ease-in-out hover:scale-105"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
          boxShadow: "0 8px 32px var(--card-shadow)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text-tertiary)" }}
            >
              Total Projects
            </p>
            <p
              className="text-3xl font-bold mt-1"
              style={{ color: "var(--text-primary)" }}
            >
              {projects.length}
            </p>
          </div>
          <div
            className="p-3 rounded-full"
            style={{ backgroundColor: "var(--bg-tertiary)" }}
          >
            <Target size={24} style={{ color: "var(--accent-primary)" }} />
          </div>
        </div>
      </div>

      <div
        className="p-6 rounded-xl shadow-lg border transition-all duration-500 ease-in-out hover:scale-105"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
          boxShadow: "0 8px 32px var(--card-shadow)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text-tertiary)" }}
            >
              In Progress
            </p>
            <p
              className="text-3xl font-bold mt-1"
              style={{ color: "var(--text-primary)" }}
            >
              {projectStatusCounts.inProgress}
            </p>
          </div>
          <div
            className="p-3 rounded-full"
            style={{ backgroundColor: "var(--bg-tertiary)" }}
          >
            <Clock size={24} style={{ color: "var(--accent-warning)" }} />
          </div>
        </div>
      </div>

      <div
        className="p-6 rounded-xl shadow-lg border transition-all duration-500 ease-in-out hover:scale-105"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
          boxShadow: "0 8px 32px var(--card-shadow)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text-tertiary)" }}
            >
              Completed
            </p>
            <p
              className="text-3xl font-bold mt-1"
              style={{ color: "var(--text-primary)" }}
            >
              {projectStatusCounts.completed}
            </p>
          </div>
          <div
            className="p-3 rounded-full"
            style={{ backgroundColor: "var(--bg-tertiary)" }}
          >
            <CheckCircle size={24} style={{ color: "var(--accent-success)" }} />
          </div>
        </div>
      </div>

      <div
        className="p-6 rounded-xl shadow-lg border transition-all duration-500 ease-in-out hover:scale-105"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
          boxShadow: "0 8px 32px var(--card-shadow)",
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--text-tertiary)" }}
            >
              Total Budget
            </p>
            <p
              className="text-3xl font-bold mt-1"
              style={{ color: "var(--text-primary)" }}
            >
              ${projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
            </p>
          </div>
          <div
            className="p-3 rounded-full"
            style={{ backgroundColor: "var(--bg-tertiary)" }}
          >
            <DollarSign size={24} style={{ color: "var(--accent-primary)" }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;
