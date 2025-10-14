import React from "react";
import Layout from "../components/layout/Layout";
import { dashboardStats, recentActivity } from "../data/dashboardData";

const Dashboard = ({ activeItem, setActiveItem }) => {
  const getActivityColor = (color) => {
    switch (color) {
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-yellow-500";
      case "purple":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Layout
      pageTitle="Dashboard Overview"
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Summary Cards */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">
              Total Projects
            </h3>
            <p className="text-3xl font-bold text-gray-900">
              {dashboardStats.totalProjects}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Earnings</h3>
            <p className="text-3xl font-bold text-gray-900">
              ${dashboardStats.totalEarnings.toLocaleString()}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Tasks Due</h3>
            <p className="text-3xl font-bold text-gray-900">
              {dashboardStats.tasksDue}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500">Completed</h3>
            <p className="text-3xl font-bold text-gray-900">
              {dashboardStats.completedTasks}
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-3">
                  <div
                    className={`w-2 h-2 rounded-full ${getActivityColor(
                      activity.color
                    )}`}
                  ></div>
                  <p className="text-sm text-gray-600">{activity.message}</p>
                  <span className="text-xs text-gray-400">
                    {activity.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
