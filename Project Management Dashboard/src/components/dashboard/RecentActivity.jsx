import React from "react";
import { recentActivity } from "../../data/dashboardData";

const RecentActivity = () => {
  const getActivityColor = (color) => {
    switch (color) {
      case "blue":
        return "var(--accent-primary)";
      case "green":
        return "var(--accent-success)";
      case "yellow":
        return "var(--accent-warning)";
      case "purple":
        return "var(--accent-secondary)";
      default:
        return "var(--text-tertiary)";
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg border p-6 transition-all duration-500 ease-in-out"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3
          className="text-xl font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Recent Activity
        </h3>
        <button
          className="text-sm px-3 py-1 rounded-lg transition-colors"
          style={{
            color: "var(--accent-primary)",
            backgroundColor: "var(--bg-secondary)",
          }}
        >
          View All
        </button>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-4">
        {recentActivity.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <div
              className="w-3 h-3 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: getActivityColor(activity.color) }}
            ></div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {activity.message}
              </p>
              <p
                className="text-xs mt-1"
                style={{ color: "var(--text-tertiary)" }}
              >
                {activity.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
