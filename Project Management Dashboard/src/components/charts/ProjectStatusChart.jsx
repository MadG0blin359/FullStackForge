import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { projectStatusOverTime } from "../../data/dashboardData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProjectStatusChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      title: {
        display: true,
        text: "Project Status Over Time",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          bottom: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
    elements: {
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
  };

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-lg border transition-all duration-500 ease-in-out"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <Line options={options} data={projectStatusOverTime} />
    </div>
  );
};

export default ProjectStatusChart;
