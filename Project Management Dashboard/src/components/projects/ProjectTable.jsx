import React, { useState } from "react";
import { Search, Calendar } from "lucide-react";
import { projects } from "../../data/projectsData";
import { CheckCircle, Clock, Target, AlertTriangle } from "lucide-react";

const ProjectTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Planning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <CheckCircle size={16} className="text-green-600" />;
      case "In Progress":
        return <Clock size={16} className="text-blue-600" />;
      case "Planning":
        return <Target size={16} className="text-yellow-600" />;
      default:
        return <AlertTriangle size={16} className="text-gray-600" />;
    }
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div
        className="rounded-xl shadow-lg border transition-all duration-500 ease-in-out overflow-hidden"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
          boxShadow: "0 8px 32px var(--card-shadow)",
        }}
      >
        <div
          className="p-6 border-b"
          style={{ borderColor: "var(--card-border)" }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3
              className="text-xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              Project List
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: "var(--text-tertiary)" }}
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border w-full sm:w-64 transition-all duration-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-primary)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border transition-all duration-300 cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border-primary)",
                  color: "var(--text-primary)",
                }}
              >
                <option value="All">All Status</option>
                <option value="Planning">Planning</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead style={{ backgroundColor: "var(--bg-secondary)" }}>
              <tr>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Project Details
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Client
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Status
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Deadline
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Progress
                </th>
                <th
                  className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Budget
                </th>
              </tr>
            </thead>
            <tbody
              className="divide-y"
              style={{ borderColor: "var(--border-primary)" }}
            >
              {filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:opacity-60 transition-opacity cursor-pointer"
                  style={{ backgroundColor: "var(--card-bg)" }}
                  onClick={() =>
                    setSelectedProject(
                      selectedProject?.id === project.id ? null : project
                    )
                  }
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                        }}
                      >
                        {project.name.charAt(0)}
                      </div>
                      <div>
                        <div
                          className="font-semibold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {project.name}
                        </div>
                        <div
                          className="text-sm"
                          style={{ color: "var(--text-tertiary)" }}
                        >
                          {project.team.length} team members
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {project.client}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(project.status)}
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {project.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Calendar
                        size={16}
                        style={{ color: "var(--text-tertiary)" }}
                      />
                      <span style={{ color: "var(--text-primary)" }}>
                        {new Date(project.deadline).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${project.progress}%`,
                            background:
                              "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))",
                          }}
                        ></div>
                      </div>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div
                        className="font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        ${project.spent.toLocaleString()}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: "var(--text-tertiary)" }}
                      >
                        of ${project.budget.toLocaleString()}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="p-4 rounded-xl shadow-lg border transition-all duration-300 cursor-pointer hover:scale-[1.02]"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--card-border)",
                boxShadow: "0 4px 20px var(--card-shadow)",
              }}
              onClick={() =>
                setSelectedProject(
                  selectedProject?.id === project.id ? null : project
                )
              }
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-semibold flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
                  }}
                >
                  {project.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4
                    className="font-semibold text-lg truncate"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.name}
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {project.client}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {getStatusIcon(project.status)}
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Deadline
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {new Date(project.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Progress
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${project.progress}%`,
                          background:
                            "linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))",
                        }}
                      ></div>
                    </div>
                    <span
                      className="text-xs font-medium"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {project.progress}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Budget
                  </p>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    ${project.spent.toLocaleString()} / $
                    {project.budget.toLocaleString()}
                  </p>
                </div>
                <div
                  className="text-xs"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {project.team.length} members
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--card-border)",
              border: "1px solid var(--card-border)",
            }}
          >
            <div
              className="p-6 border-b"
              style={{ borderColor: "var(--card-border)" }}
            >
              <div className="flex items-center justify-between">
                <h3
                  className="text-2xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedProject.name}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  style={{ color: "var(--text-secondary)" }}
                >
                  ✕
                </button>
              </div>
              <p
                className="text-sm mt-2"
                style={{ color: "var(--text-tertiary)" }}
              >
                {selectedProject.description}
              </p>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4
                    className="font-semibold mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Project Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-tertiary)" }}>
                        Client:
                      </span>
                      <span style={{ color: "var(--text-primary)" }}>
                        {selectedProject.client}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-tertiary)" }}>
                        Status:
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          selectedProject.status
                        )}`}
                      >
                        {selectedProject.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-tertiary)" }}>
                        Deadline:
                      </span>
                      <span style={{ color: "var(--text-primary)" }}>
                        {new Date(
                          selectedProject.deadline
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-tertiary)" }}>
                        Progress:
                      </span>
                      <span style={{ color: "var(--text-primary)" }}>
                        {selectedProject.progress}%
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4
                    className="font-semibold mb-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Budget Overview
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-tertiary)" }}>
                        Total Budget:
                      </span>
                      <span style={{ color: "var(--text-primary)" }}>
                        ${selectedProject.budget.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-tertiary)" }}>
                        Spent:
                      </span>
                      <span style={{ color: "var(--text-primary)" }}>
                        ${selectedProject.spent.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span style={{ color: "var(--text-tertiary)" }}>
                        Remaining:
                      </span>
                      <span style={{ color: "var(--text-primary)" }}>
                        $
                        {(
                          selectedProject.budget - selectedProject.spent
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4
                  className="font-semibold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  Team Members
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.team.map((member, index) => (
                    <div
                      key={index}
                      className="px-3 py-1 rounded-full text-sm border"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border-primary)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {member}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4
                  className="font-semibold mb-3"
                  style={{ color: "var(--text-primary)" }}
                >
                  Tasks
                </h4>
                <div className="space-y-2">
                  {selectedProject.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex items-center gap-3 p-3 rounded-lg border"
                      style={{
                        backgroundColor: "var(--bg-secondary)",
                        borderColor: "var(--border-primary)",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={task.completed}
                        readOnly
                        className="rounded"
                      />
                      <span
                        className={`flex-1 ${
                          task.completed ? "line-through" : ""
                        }`}
                        style={{ color: "var(--text-primary)" }}
                      >
                        {task.name}
                      </span>
                      {task.completed && (
                        <CheckCircle
                          size={16}
                          style={{ color: "var(--accent-success)" }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectTable;
