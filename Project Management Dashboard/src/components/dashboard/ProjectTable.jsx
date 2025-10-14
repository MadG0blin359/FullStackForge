import React from "react";
import { useNavigate } from "react-router-dom";
import { projects } from "../../data/projectsData";

const ProjectTable = () => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "var(--accent-success)";
      case "In Progress":
        return "var(--accent-primary)";
      case "Planning":
        return "var(--accent-warning)";
      default:
        return "var(--text-tertiary)";
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case "Completed":
        return "rgba(34, 197, 94, 0.1)";
      case "In Progress":
        return "rgba(59, 130, 246, 0.1)";
      case "Planning":
        return "rgba(245, 158, 11, 0.1)";
      default:
        return "var(--bg-secondary)";
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg border overflow-hidden"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div
        className="p-6 border-b"
        style={{ borderColor: "var(--card-border)" }}
      >
        <div className="flex items-center justify-between">
          <h3
            className="text-xl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Recent Projects
          </h3>
          <button
            onClick={() => navigate("/projects")}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:opacity-90 cursor-pointer"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "white",
            }}
          >
            View All Projects
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead style={{ backgroundColor: "var(--bg-secondary)" }}>
            <tr>
              <th
                className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Project Name
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Client
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Status
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Progress
              </th>
              <th
                className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--text-tertiary)" }}
              >
                Deadline
              </th>
            </tr>
          </thead>
          <tbody
            className="divide-y"
            style={{ borderColor: "var(--card-border)" }}
          >
            {projects.slice(0, 5).map((project) => (
              <tr
                key={project.id}
                className="hover:bg-gray-50 transition-colors"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div
                    className="text-sm"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {project.client}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                    style={{
                      backgroundColor: getStatusBg(project.status),
                      color: getStatusColor(project.status),
                    }}
                  >
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div
                      className="w-full bg-gray-200 rounded-full h-2 mr-2"
                      style={{ backgroundColor: "var(--bg-tertiary)" }}
                    >
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${project.progress}%`,
                          backgroundColor: getStatusColor(project.status),
                        }}
                      ></div>
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {project.progress}%
                    </span>
                  </div>
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {project.deadline}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectTable;
