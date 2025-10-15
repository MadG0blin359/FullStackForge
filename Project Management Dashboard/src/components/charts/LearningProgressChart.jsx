import React from "react";
import { Line } from "react-chartjs-2";
import { learningProgressData } from "../../data/profileData";

const LearningProgressChart = () => {
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
        Learning Progress
      </h3>
      <div className="h-64">
        <Line
          data={learningProgressData}
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
            interaction: {
              mode: "index",
              intersect: false,
            },
            elements: {
              point: {
                radius: 2,
                hoverRadius: 4,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LearningProgressChart;
