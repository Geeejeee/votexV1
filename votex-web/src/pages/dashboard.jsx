import React from "react";
import { Link } from "react-router-dom"; // Import Link component
import DashboardLayout from "../layouts/DashboardLayout";
import Calendar from "react-calendar";
import { BarChart3, Users, User } from "lucide-react";
import 'react-calendar/dist/Calendar.css';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="welcome-row">
        <div className="welcome-card">Welcome back, Admin</div>
        <div className="datetime-card">April 12, 2025 | 09:44 PM</div>
      </div>

      <div className="main-content">
        <div className="left-panel">
          <div className="card-grid">
            <button className="card card-blue">
              <BarChart3 className="card-icon" />
              Election Results
            </button>
            <button className="card card-green">
              <Users className="card-icon" />
              List of Elections
            </button>
            <Link to="/voters" className="card card-red">
              <User className="card-icon" />
              List of Voters
            </Link>
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
    </DashboardLayout>
  );
};

export default Dashboard;