import React from "react";
import "../styles/dashboard.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-icons">
        <i className="fas fa-bell"></i>
        <i className="fas fa-user-circle"></i>
        <span>Admin</span>
      </div>
    </div>
  );
};

export default Header;
