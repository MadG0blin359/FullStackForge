import React from "react";
import LearningProgressChart from "../charts/LearningProgressChart";
import { userProfile, skillProgressData } from "../../data/profileData";

const SkillsTab = () => (
  <div className="space-y-6">
    {/* Skills Overview */}
    <div
      className="rounded-xl shadow-lg border p-4 md:p-6"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--card-border)",
      }}
    >
      <h3
        className="text-lg font-semibold mb-4 md:mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        Skills & Expertise
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

    <LearningProgressChart />
  </div>
);

export default SkillsTab;
