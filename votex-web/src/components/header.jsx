import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(true); // Show the confirmation modal
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false); // Close the modal
    // Clear auth token or any other auth info stored
    localStorage.removeItem("token");  // or your auth key
    navigate("/login"); // Redirect to login page
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false); // Close the modal without logging out
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

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
        <div className="user-avatar" onClick={toggleDropdown}>
          A
        </div>

        {isDropdownOpen && (
          <div className="dropdown">
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to log out?</h3>
            <div className="modal-buttons">
              <button className="modal-button" onClick={handleConfirmLogout}>
                Confirm
              </button>
              <button className="modal-button" onClick={handleCancelLogout}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
