import React from "react";
import { FolderOpen, DollarSign, Clock, CheckCircle } from "lucide-react";
import { dashboardStats } from "../../data/dashboardData";

const SummaryCards = () => {
  const cards = [
    {
      title: "Total Projects",
      value: dashboardStats.totalProjects,
      icon: FolderOpen,
      color: "var(--accent-primary)",
      bgColor: "var(--bg-secondary)",
    },
    {
      title: "Total Earnings",
      value: `$${dashboardStats.totalEarnings.toLocaleString()}`,
      icon: DollarSign,
      color: "var(--accent-success)",
      bgColor: "var(--bg-secondary)",
    },
    {
      title: "Tasks Due",
      value: dashboardStats.tasksDue,
      icon: Clock,
      color: "var(--accent-warning)",
      bgColor: "var(--bg-secondary)",
    },
    {
      title: "Completed Tasks",
      value: dashboardStats.completedTasks,
      icon: CheckCircle,
      color: "var(--accent-success)",
      bgColor: "var(--bg-secondary)",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-6 rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl hover:scale-105"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--card-border)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-sm font-medium mb-1"
                style={{ color: "var(--text-tertiary)" }}
              >
                {card.title}
              </p>
              <p
                className="text-3xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                {card.value}
              </p>
            </div>
            <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: card.bgColor }}
            >
              <card.icon size={24} style={{ color: card.color }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
