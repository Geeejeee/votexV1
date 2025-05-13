import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "../layouts/DashboardLayout";
import '../styles/resultsdb.css';

import USGLogo from '../assets/USG.png';
import CITCLogo from '../assets/CITC.png'; 
import SITELogo from '../assets/SITE.png'; 

const ElectionsDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleViewClick = (organization) => {
    console.log(`View clicked for ${organization}`);
    // Navigate to the result page for the clicked organization
    navigate(`/resultsdb/${organization}`);
  };

  return (
    <DashboardLayout>
    <nav className="breadcrumb">
        <a href="/dashboard" className="home-icon">
          <i className="fa fa-home"></i>
        </a>
        <span> › Results</span>
      </nav>

          <div className="election-results-container">
            <div className="results-header">
              <h1>Overall Results</h1>
            </div>

            <div className="results-grid">
              {/* USG Card */}
              <div className="result-card">
                <div className="card-content">
                  <img src={USGLogo} alt="USG Logo" className="org-logo" />
                  <div className="card-info">
                    <h2>UNIVERSITY STUDENT GOVERNMENT</h2>
                    <p>2025 ELECTIONS</p>
                  </div>
                </div>
                <button onClick={() => handleViewClick('USG')} className="view-button">
                  VIEW
                </button>
              </div>

              {/* CITC Card */}
              <div className="result-card">
                <div className="card-content">
                  <img src={CITCLogo} alt="CITC Logo" className="org-logo" />
                  <div className="card-info">
                    <h2>COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING</h2>
                    <p>2025 ELECTIONS</p>
                  </div>
                </div>
                <button onClick={() => handleViewClick('CITC')} className="view-button">
                  VIEW
                </button>
              </div>

              {/* SITE Card */}
              <div className="result-card">
                <div className="card-content">
                  <img src={SITELogo} alt="SITE Logo" className="org-logo" />
                  <div className="card-info">
                    <h2>SOCIETY OF INFORMATION TECHNOLOGY ENTHUSIASTS</h2>
                    <p>2025 ELECTIONS</p>
                  </div>
                </div>
                <button onClick={() => handleViewClick('SITE')} className="view-button">
                  VIEW
                </button>
              </div>
            </div>
          </div>
          
    </DashboardLayout>
  );
};

export default ElectionsDashboard;
