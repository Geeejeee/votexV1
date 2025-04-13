import React from "react";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <span className="header-title">
          <strong>VOTEX</strong> | WebApp Based Voting System for School Elections
        </span>
      </div>

      <div className="header-right">
        <div className="user-info">
          <div className="user-name">USER1</div>
          <div className="user-role">Admin</div>
        </div>
        <div className="user-avatar">A</div>
      </div>
    </header>
  );
};

export default Header;
