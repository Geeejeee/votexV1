import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/dashboard.css";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`dashboard-container ${!isSidebarOpen ? "sidebar-collapsed" : ""}`}>
      <Sidebar onToggle={setIsSidebarOpen} />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          {children}
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;