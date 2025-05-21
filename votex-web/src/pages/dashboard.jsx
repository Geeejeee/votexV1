import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Added useNavigate for redirect
import DashboardLayout from "../layouts/DashboardLayout";
import Calendar from "react-calendar";
import { BarChart3, Users, User } from "lucide-react";
import 'react-calendar/dist/Calendar.css';
import AnnouncementCarousel from "../components/AnnouncementCarousel.tsx";

const Dashboard = () => {
  // State to store current date/time string
  const [dateTimeStr, setDateTimeStr] = useState("");

  // Update date/time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      // Format date like: April 12, 2025 | 09:44 PM
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      const formatted = now.toLocaleString("en-US", options).replace(",", " |");
      setDateTimeStr(formatted);
    };

    updateDateTime(); // Initial call
    const timerId = setInterval(updateDateTime, 1000);

    return () => clearInterval(timerId); // Cleanup on unmount
  }, []);




  return (
    <DashboardLayout>
      <nav className="breadcrumb">
        <a href="/dashboard" className="home-icon">
          <i className="fa fa-home"></i>
        </a>
        <span> › Home</span>
      </nav>
      <div className="welcome-row">
        <div className="welcome-card">Welcome back, Admin</div>
        <div className="datetime-card">{dateTimeStr}</div>
      </div>

      <div className="main-content">
        <div className="left-panel">
          <div className="card-grid">
            <Link to="/resultsdb" className="card card-blue">
              <BarChart3 className="card-icon" />
              Election Results
            </Link>
            <Link to="/elections" className="card card-green">
              <Users className="card-icon" />
              List of Elections
            </Link>
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
            <div className="calendar-placeholder">
              <AnnouncementCarousel />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;