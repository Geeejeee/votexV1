// components/Footer.js
import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="dashboard-footer">
      <div className="footer-left">2025 © Votex Solutions ver. 1.0</div>
      <div className="footer-right">
        Choose Language:{" "}
        <select>
          <option value="en">English</option>
        </select>
      </div>
    </footer>
  );
};

export default Footer;
