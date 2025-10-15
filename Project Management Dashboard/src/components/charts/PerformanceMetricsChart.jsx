import React from "react";
import { Line } from "react-chartjs-2";
import { performanceMetricsData } from "../../data/profileData";

const PerformanceMetricsChart = () => {
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
        Performance Metrics
      </h3>
      <div className="h-64">
        <Line
          data={performanceMetricsData}
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
              y: {
                beginAtZero: true,
                ticks: { font: { size: 10 } },
              },
              x: { ticks: { font: { size: 10 } } },
            },
          }}
        />
      </div>
    </div>
  );
};

export default PerformanceMetricsChart;
