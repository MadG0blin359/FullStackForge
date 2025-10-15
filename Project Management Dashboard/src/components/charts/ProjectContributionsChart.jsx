import React from "react";
import { Bar } from "react-chartjs-2";
import { projectContributionData } from "../../data/profileData";

const ProjectContributionsChart = () => {
  return (
    <div
      className="rounded-xl shadow-lg border p-6"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <h3
        className="text-lg font-semibold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Project Contributions
      </h3>
      <div className="h-64">
        <Bar
          data={projectContributionData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top",
                labels: { font: { size: 10 }, padding: 10 },
              },
            },
            scales: {
              y: { beginAtZero: true, ticks: { font: { size: 10 } } },
              x: { ticks: { font: { size: 10 } } },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProjectContributionsChart;
