import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import OverviewTab from "../components/profile/OverviewTab";
import ProjectsTab from "../components/profile/ProjectsTab";
import SkillsTab from "../components/profile/SkillsTab";
import ActivityTab from "../components/profile/ActivityTab";
import SettingsTab from "../components/profile/SettingsTab";
import { User, TrendingUp, Award, Clock, Settings } from "lucide-react";

const Profile = ({ activeItem, setActiveItem }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: User },
    { id: "projects", label: "Projects", icon: TrendingUp },
    { id: "skills", label: "Skills", icon: Award },
    { id: "activity", label: "Activity", icon: Clock },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <Layout
      pageTitle="Profile Settings"
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    >
      <div className="p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="mb-6 md:mb-8">
            <div
              className="flex flex-wrap gap-1 p-1 rounded-lg w-full md:w-fit overflow-x-auto"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-all whitespace-nowrap flex-shrink-0 ${
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
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === "overview" && <OverviewTab />}
            {activeTab === "projects" && <ProjectsTab />}
            {activeTab === "skills" && <SkillsTab />}
            {activeTab === "activity" && <ActivityTab />}
            {activeTab === "settings" && <SettingsTab />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
