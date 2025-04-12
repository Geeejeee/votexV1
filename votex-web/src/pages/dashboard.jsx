import React, { useState } from "react";
import "../styles/Dashboard.css";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Calendar from "react-calendar";
import 'react-calendar/dist/calendar.css';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <div className="welcome-row">
          <div className="welcome-card">Welcome back, Admin</div>
          <div className="datetime-card">April 12, 2025 | 09:44 PM</div>
        </div>

        <div className="main-content">
          <div className="left-panel">
            <div className="card-grid">
              <div className="card card-blue">Election Results</div>
              <div className="card card-green">List of Elections</div>
              <div className="card card-red">List of Voters</div>
            </div>
          </div>

          <div className="right-panel">
            <div className="calendar-box">
              <Calendar className="votex-calendar" />
              <div className="calendar-notice">2025 CALENDAR OF ACTIVITIES</div>
              <div className="calendar-placeholder">Notice area</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
