import React from "react";
import "../styles/Dashboard.css";
import Sidebar from "../components/sidebar";
import Header from "../components/header";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <div className="welcome-row">
            <div className="welcome-card">Welcome back, Admin</div>
            <div className="datetime-card">
              March 04, 2025 | TUESDAY | 2:00 PM
            </div>
          </div>

          <div className="card-grid">
            <div className="card card-blue">
              <i className="fas fa-chart-bar icon"></i>
              <span>Election Results</span>
            </div>
            <div className="card card-green">
              <i className="fas fa-list icon"></i>
              <span>List of Elections</span>
            </div>
            <div className="card card-red">
              <i className="fas fa-user icon"></i>
              <span>List of Voters</span>
            </div>
          </div>

          <div className="calendar-section">
            <div className="calendar-box">
              <h4>2025 CALENDAR OF ACTIVITIES</h4>
              <div className="calendar-placeholder">[Insert calendar here]</div>
              <div className="calendar-notice">Notice section...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
