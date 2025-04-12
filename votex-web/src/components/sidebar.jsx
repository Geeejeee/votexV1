import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/votexmlogo.png";
import "../styles/dashboard.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <img src={logo} alt="Votex Logo" className="sidebar-logo" />
      <nav className="sidebar-nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/elections">Elections</NavLink>
        <NavLink to="/voters">Voters</NavLink>
        <NavLink to="/results">Results</NavLink>
        <NavLink to="/help">Help</NavLink>
      </nav>
      <div className="sidebar-footer">2025 © Votex Solutions ver. 1.0</div>
    </div>
  );
};

export default Sidebar;
