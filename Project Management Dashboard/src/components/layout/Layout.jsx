import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children, pageTitle, activeItem, setActiveItem }) => {
  return (
    <div className="min-h-screen flex">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="flex-1 flex flex-col">
        <Header pageTitle={pageTitle} />
        <main
          className="flex-1 p-6 overflow-auto"
          style={{ backgroundColor: "var(--bg-primary)" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
