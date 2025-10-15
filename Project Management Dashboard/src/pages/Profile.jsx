import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import {
  userProfile,
  accountSettings,
  userStats,
  recentProjects,
  activityLog,
  skillProgressData,
  timeTrackingData,
  projectContributionData,
  performanceMetricsData,
  learningProgressData,
} from "../data/profileData";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  BookOpen,
  Settings,
  Edit,
  Camera,
  Bell,
  Shield,
  Globe,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Profile = ({ activeItem, setActiveItem }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "projects", label: "Projects", icon: TrendingUp },
    { id: "skills", label: "Skills", icon: Award },
    { id: "activity", label: "Activity", icon: Clock },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div
        className="rounded-xl shadow-lg border p-6"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="relative">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))",
              }}
            >
              {userProfile.avatar}
            </div>
            <button
              className="absolute bottom-0 right-0 p-2 rounded-full shadow-lg hover:scale-105 transition-transform"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "2px solid var(--card-bg)",
              }}
            >
              <Camera size={16} style={{ color: "var(--text-secondary)" }} />
            </button>
          </div>
          <div className="flex-1">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              {userProfile.name}
            </h2>
            <p
              className="text-lg mb-1"
              style={{ color: "var(--text-secondary)" }}
            >
              {userProfile.role}
            </p>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--text-tertiary)" }}
            >
              {userProfile.bio}
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} style={{ color: "var(--text-tertiary)" }} />
                <span style={{ color: "var(--text-secondary)" }}>
                  {userProfile.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} style={{ color: "var(--text-tertiary)" }} />
                <span style={{ color: "var(--text-secondary)" }}>
                  {userProfile.phone}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} style={{ color: "var(--text-tertiary)" }} />
                <span style={{ color: "var(--text-secondary)" }}>
                  {userProfile.location}
                </span>
              </div>
            </div>
          </div>
          <button
            className="px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "white",
            }}
          >
            <Edit size={16} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: "Total Projects",
            value: userStats.totalProjects,
            icon: TrendingUp,
            color: "var(--accent-primary)",
          },
          {
            label: "Completed",
            value: userStats.completedProjects,
            icon: Award,
            color: "var(--accent-success)",
          },
          {
            label: "Active",
            value: userStats.activeProjects,
            icon: Clock,
            color: "var(--accent-warning)",
          },
          {
            label: "Team Size",
            value: userStats.teamMembersManaged,
            icon: User,
            color: "var(--accent-secondary)",
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="rounded-xl shadow-lg border p-6 transition-all hover:scale-105"
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
                  {stat.label}
                </p>
                <p
                  className="text-3xl font-bold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {stat.value}
                </p>
              </div>
              <stat.icon size={32} style={{ color: stat.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Tracking */}
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
            Weekly Time Tracking
          </h3>
          <div className="h-64">
            <Line
              data={timeTrackingData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `${value}h`,
                      font: { size: 10 },
                    },
                  },
                  x: { ticks: { font: { size: 10 } } },
                },
              }}
            />
          </div>
        </div>

        {/* Performance Metrics */}
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
      </div>
    </div>
  );

  return (
    <Layout activeItem={activeItem} setActiveItem={setActiveItem}>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="mb-8">
            <div
              className="flex space-x-1 p-1 rounded-lg w-fit"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-all ${
                    activeTab === tab.id ? "shadow-sm" : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor:
                      activeTab === tab.id ? "var(--card-bg)" : "transparent",
                    color:
                      activeTab === tab.id
                        ? "var(--accent-primary)"
                        : "var(--text-secondary)",
                  }}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "overview" && renderOverviewTab()}
            {activeTab === "projects" && renderProjectsTab()}
            {activeTab === "skills" && renderSkillsTab()}
            {activeTab === "activity" && renderActivityTab()}
            {activeTab === "settings" && renderSettingsTab()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;

const renderActivityTab = () => (
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
            className="p-6 hover:bg-gray-50 transition-colors"
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

const renderSkillsTab = () => (
  <div className="space-y-6">
    {/* Skills Overview */}
    <div
      className="rounded-xl shadow-lg border p-6"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <h3
        className="text-lg font-semibold mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        Skills & Expertise
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userProfile.skills.map((skill, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span style={{ color: "var(--text-primary)" }}>{skill}</span>
              <span style={{ color: "var(--text-tertiary)" }}>
                {skillProgressData.datasets[0].data[index]}%
              </span>
            </div>
            <div
              className="w-full h-2 rounded-full"
              style={{ backgroundColor: "var(--bg-tertiary)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${skillProgressData.datasets[0].data[index]}%`,
                  backgroundColor: "var(--accent-primary)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Learning Progress */}
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
          }}
        />
      </div>
    </div>
  </div>
);

const renderSettingsTab = () => (
  <div className="space-y-6">
    {/* Account Settings */}
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
          className="text-lg font-semibold flex items-center gap-2"
          style={{ color: "var(--text-primary)" }}
        >
          <Settings size={20} />
          Account Settings
        </h3>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
              defaultValue={userProfile.name}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
              defaultValue={userProfile.email}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Phone
            </label>
            <input
              type="tel"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
              defaultValue={userProfile.phone}
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Location
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
              defaultValue={userProfile.location}
            />
          </div>
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Bio
          </label>
          <textarea
            rows={4}
            className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-all"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-primary)",
              color: "var(--text-primary)",
            }}
            defaultValue={userProfile.bio}
          />
        </div>
        <button
          className="px-6 py-2 rounded-lg font-medium transition-all hover:scale-105"
          style={{
            backgroundColor: "var(--accent-primary)",
            color: "white",
          }}
        >
          Save Changes
        </button>
      </div>
    </div>

    {/* Notification Settings */}
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
          className="text-lg font-semibold flex items-center gap-2"
          style={{ color: "var(--text-primary)" }}
        >
          <Bell size={20} />
          Notification Preferences
        </h3>
      </div>
      <div className="p-6 space-y-4">
        {Object.entries(accountSettings.notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span
              className="text-sm font-medium capitalize"
              style={{ color: "var(--text-primary)" }}
            >
              {key.replace(/([A-Z])/g, " $1").toLowerCase()}
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                defaultChecked={value}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const renderProjectsTab = () => (
  <div className="space-y-6">
    {/* Recent Projects */}
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
          Recent Projects
        </h3>
      </div>
      <div className="p-6 space-y-4">
        {recentProjects.map((project) => (
          <div
            key={project.id}
            className="flex items-center justify-between p-4 rounded-lg border transition-all hover:scale-102"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderColor: "var(--border-primary)",
            }}
          >
            <div className="flex-1">
              <h4
                className="font-semibold mb-1"
                style={{ color: "var(--text-primary)" }}
              >
                {project.name}
              </h4>
              <p
                className="text-sm mb-2"
                style={{ color: "var(--text-secondary)" }}
              >
                {project.role}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : project.status === "In Progress"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {project.status}
                </span>
                <span style={{ color: "var(--text-tertiary)" }}>
                  Due: {project.deadline}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold mb-1">{project.progress}%</div>
              <div
                className="w-20 h-2 rounded-full"
                style={{ backgroundColor: "var(--bg-tertiary)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${project.progress}%`,
                    backgroundColor: "var(--accent-primary)",
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Project Contributions Chart */}
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
        Project Contributions
      </h3>
      <div className="h-64">
        <Bar
          data={projectContributionData}
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
          }}
        />
      </div>
    </div>
  </div>
);
