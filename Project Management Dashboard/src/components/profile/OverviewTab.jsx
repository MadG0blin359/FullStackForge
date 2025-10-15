import React from "react";
import TimeTrackingChart from "../charts/TimeTrackingChart";
import PerformanceMetricsChart from "../charts/PerformanceMetricsChart";
import { userProfile, userStats } from "../../data/profileData";
import {
  Mail,
  Phone,
  MapPin,
  TrendingUp,
  Award,
  Clock,
  User,
  Edit,
  Camera,
} from "lucide-react";

const OverviewTab = () => (
  <div className="space-y-6">
    {/* Profile Header */}
    <div
      className="rounded-xl shadow-lg border p-4 md:p-6"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 md:gap-6">
        <div className="relative mx-auto lg:mx-0">
          <div
            className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg"
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
        <div className="flex-1 text-center lg:text-left">
          <h2
            className="text-xl md:text-2xl font-bold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {userProfile.name}
          </h2>
          <p
            className="text-base md:text-lg mb-1"
            style={{ color: "var(--text-secondary)" }}
          >
            {userProfile.role}
          </p>
          <p className="text-sm mb-4" style={{ color: "var(--text-tertiary)" }}>
            {userProfile.bio}
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm">
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
          className="px-4 py-2 rounded-lg font-medium cursor-pointer transition-all hover:scale-105 flex items-center gap-2 mx-auto lg:mx-0 mt-4 lg:mt-0"
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
      <TimeTrackingChart />
      <PerformanceMetricsChart />
    </div>
  </div>
);

export default OverviewTab;
