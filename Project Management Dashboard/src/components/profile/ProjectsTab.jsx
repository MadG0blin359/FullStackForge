import React from "react";
import ProjectContributionsChart from "../charts/ProjectContributionsChart";
import { recentProjects } from "../../data/profileData";

const ProjectsTab = () => (
  <div className="space-y-6">
    {/* Recent Projects */}
    <div
      className="rounded-xl shadow-lg border"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div
        className="p-6 border-b"
        style={{ borderColor: "var(--card-border)" }}
      >
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Recent Projects
        </h3>
      </div>
      <div className="p-6 space-y-4">
        {recentProjects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between p-4 rounded-lg border transition-all hover:scale-102"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-primary)",
            }}
          >
            <div className="flex-1">
              <h4
                className="font-semibold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {project.name}
              </h4>
              <p
                className="text-sm mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.role}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : project.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {project.status}
                </span>
                <span style={{ color: "var(--text-tertiary)" }}>
                  Due: {project.deadline}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold mb-1">{project.progress}%</div>
              <div
                className="w-20 h-2 rounded-full"
                style={{ backgroundColor: "var(--bg-tertiary)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${project.progress}%`,
                    backgroundColor: "var(--accent-primary)",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <ProjectContributionsChart />
  </div>
);

export default ProjectsTab;
