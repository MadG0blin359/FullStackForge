import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { clientRevenueData } from "../../data/dashboardData";

ChartJS.register(ArcElement, Tooltip, Legend);

const ClientRevenueChart = () => {
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
        text: "Revenue by Client",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: {
          bottom: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div
      className="bg-white p-2 rounded-xl shadow-lg border h-110 flex flex-col transition-all duration-500 ease-in-out"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="flex-1 flex items-center justify-center">
        <Pie options={options} data={clientRevenueData} />
      </div>
    </div>
  );
};

export default ClientRevenueChart;
