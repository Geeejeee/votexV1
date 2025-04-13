import React, { useState } from "react";
import { BarChart3, Users, User } from "lucide-react";
import "../styles/Dashboard.css";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import Calendar from "react-calendar";
import Footer from "../components/footer";
import 'react-calendar/dist/calendar.css';

const Dashboard = () => {
  const [date, setDate] = useState(new Date());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={`dashboard-container ${!isSidebarOpen ? "sidebar-collapsed" : ""}`}>
      <Sidebar onToggle={setIsSidebarOpen} />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
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
                <button className="card card-red">
                  <User className="card-icon" />
                  List of Voters
                </button>
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

        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
