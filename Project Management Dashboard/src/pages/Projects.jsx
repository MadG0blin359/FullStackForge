import React from "react";
import Layout from "../components/layout/Layout";
import ProjectHeader from "../components/projects/ProjectHeader";
import ProjectStats from "../components/projects/ProjectStats";
import ProjectCharts from "../components/projects/ProjectCharts";
import ProjectTable from "../components/projects/ProjectTable";

const Projects = ({ activeItem, setActiveItem }) => {
  return (
    <Layout
      pageTitle="Projects"
      activeItem={activeItem}
      setActiveItem={setActiveItem}
    >
      <div className="space-y-8">
        <ProjectHeader />
        <ProjectStats />
        <ProjectCharts />
        <ProjectTable />
      </div>
    </Layout>
  );
};

export default Projects;
