import React from "react";
import { TrendingUp, Users, Target, AlertTriangle } from "lucide-react";

const StatsOverview = () => {
  const stats = [
    {
      title: "Project Completion Rate",
      value: "78%",
      change: "+12%",
      changeType: "positive",
      icon: Target,
      description: "vs last month",
    },
    {
      title: "Team Productivity",
      value: "92%",
      change: "+5%",
      changeType: "positive",
      icon: Users,
      description: "vs last month",
    },
    {
      title: "On-Time Delivery",
      value: "85%",
      change: "-3%",
      changeType: "negative",
      icon: TrendingUp,
      description: "vs last month",
    },
    {
      title: "Risk Alerts",
      value: "3",
      change: "+1",
      changeType: "neutral",
      icon: AlertTriangle,
      description: "active alerts",
    },
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case "positive":
        return "var(--accent-success)";
      case "negative":
        return "var(--accent-error)";
      default:
        return "var(--text-tertiary)";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-500 ease-in-out">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="p-6 rounded-xl shadow-lg border transition-all duration-300 hover:shadow-xl"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--card-border)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <stat.icon size={20} style={{ color: "var(--accent-primary)" }} />
            </div>
            <div className="text-right">
              <span
                className="text-sm font-medium"
                style={{ color: getChangeColor(stat.changeType) }}
              >
                {stat.change}
              </span>
            </div>
          </div>

          <div>
            <p
              className="text-2xl font-bold mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              {stat.value}
            </p>
            <p
              className="text-sm font-medium mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              {stat.title}
            </p>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              {stat.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;
