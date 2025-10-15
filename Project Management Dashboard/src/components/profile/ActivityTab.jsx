import React from "react";
import { activityLog } from "../../data/profileData";
import { Award, TrendingUp, Edit, User } from "lucide-react";

const ActivityTab = () => (
  <div className="space-y-6">
    {/* Activity Log */}
    <div
      className="rounded-xl shadow-lg border"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div
        className="p-6 border-b"
        style={{ borderColor: "var(--card-border)" }}
      >
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          Recent Activity
        </h3>
      </div>
      <div
        className="divide-y"
        style={{ borderColor: "var(--border-primary)" }}
      >
        {activityLog.map((activity) => (
          <div
            key={activity.id}
            className="p-6 hover:bg-gray-500/20 cursor-pointer transition-colors"
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-2 rounded-full ${
                  activity.type === "completion"
                    ? "bg-green-100"
                    : activity.type === "creation"
                    ? "bg-blue-100"
                    : activity.type === "update"
                    ? "bg-yellow-100"
                    : "bg-purple-100"
                }`}
              >
                {activity.type === "completion" && (
                  <Award size={16} className="text-green-600" />
                )}
                {activity.type === "creation" && (
                  <TrendingUp size={16} className="text-blue-600" />
                )}
                {activity.type === "update" && (
                  <Edit size={16} className="text-yellow-600" />
                )}
                {activity.type === "addition" && (
                  <User size={16} className="text-purple-600" />
                )}
              </div>
              <div className="flex-1">
                <p style={{ color: "var(--text-primary)" }}>
                  <span className="font-medium">{activity.action}</span>
                  {activity.project && (
                    <span style={{ color: "var(--accent-primary)" }}>
                      {" "}
                      in {activity.project}
                    </span>
                  )}
                </p>
                <p
                  className="text-sm mt-1"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {activity.timestamp}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ActivityTab;
