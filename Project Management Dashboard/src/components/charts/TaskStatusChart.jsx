import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { taskStatusData } from "../../data/dashboardData";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskStatusChart = () => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: "Task Status Distribution",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          bottom: 20,
        },
      },
    },
    cutout: "60%",
  };

  return (
    <div
      className="bg-white p-6 rounded-xl shadow-lg border"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <Doughnut options={options} data={taskStatusData} />
    </div>
  );
};

export default TaskStatusChart;
