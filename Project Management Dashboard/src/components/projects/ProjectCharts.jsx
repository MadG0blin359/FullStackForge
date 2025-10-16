import React from "react";
import ProjectTimelineChart from "../charts/ProjectTimelineChart";
import BudgetUtilizationChart from "../charts/BudgetUtilizationChart";
import ProjectPriorityChart from "../charts/ProjectPriorityChart";
import ProjectComplexityChart from "../charts/ProjectComplexityChart";
import RiskAssessmentChart from "../charts/RiskAssessmentChart";

const ProjectCharts = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div
          className="p-4 lg:p-6 rounded-xl shadow-lg border transition-all duration-500 ease-in-out"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--card-border)",
            boxShadow: "0 8px 32px var(--card-shadow)",
          }}
        >
          <ProjectTimelineChart />
        </div>

        <div
          className="p-4 lg:p-6 rounded-xl shadow-lg border transition-all duration-500 ease-in-out"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--card-border)",
            boxShadow: "0 8px 32px var(--card-shadow)",
          }}
        >
          <BudgetUtilizationChart />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
        <div
          className="p-4 lg:p-6 rounded-xl shadow-lg border transition-all duration-500 ease-in-out"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--card-border)",
            boxShadow: "0 8px 32px var(--card-shadow)",
          }}
        >
          <ProjectPriorityChart />
        </div>

        <div
          className="p-4 lg:p-6 rounded-xl shadow-lg border transition-all duration-500 ease-in-out"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--card-border)",
            boxShadow: "0 8px 32px var(--card-shadow)",
          }}
        >
          <ProjectComplexityChart />
        </div>

        <div
          className="p-4 lg:p-6 rounded-xl shadow-lg border transition-all duration-500 ease-in-out"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--card-border)",
            boxShadow: "0 8px 32px var(--card-shadow)",
          }}
        >
          <RiskAssessmentChart />
        </div>
      </div>
    </>
  );
};

export default ProjectCharts;
