import React from "react";
import Layout from "../components/layout/Layout";
import SummaryCards from "../components/dashboard/SummaryCards";
import StatsOverview from "../components/dashboard/StatsOverview";
import RecentActivity from "../components/dashboard/RecentActivity";
import RevenueChart from "../components/charts/RevenueChart";
import TaskStatusChart from "../components/charts/TaskStatusChart";
import TeamPerformanceChart from "../components/charts/TeamPerformanceChart";
import ProjectStatusChart from "../components/charts/ProjectStatusChart";
import ClientRevenueChart from "../components/charts/ClientRevenueChart";
import ProjectTable from "../components/dashboard/ProjectTable";
import Calendar from "../components/dashboard/Calendar";

const Dashboard = ({ activeItem, setActiveItem }) => {
  return (
    <Layout
      pageTitle="Dashboard"
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    >
      <div className="space-y-8">
        {/* Summary Cards */}
        <SummaryCards />

        {/* Stats Overview */}
        <StatsOverview />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <RevenueChart />
          <TeamPerformanceChart />
        </div>

        {/* Additional Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <TaskStatusChart />
          <ClientRevenueChart />
          <Calendar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProjectStatusChart />
          <RecentActivity />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 gap-8">
          <ProjectTable />
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
