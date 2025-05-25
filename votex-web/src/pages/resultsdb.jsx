import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from "../layouts/DashboardLayout";
import axios from 'axios';
import '../styles/resultsdb.css';

const ElectionsDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [elections, setElections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const token = localStorage.getItem('token'); // Assuming you need token for auth

  const API_BASE = import.meta.env.PROD
      ? "https://votexv1-backend.onrender.com/api"
      : "/api";


  useEffect(() => {
    const fetchElections = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE}/api/admin/get-elections`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setElections(res.data.elections);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch elections:', err);
        setError('Failed to load elections.');
        setLoading(false);
      }
    };

    fetchElections();
  }, [token]);

  const handleViewClick = (electionId) => {
    navigate(`/resultsdb/${electionId}`);
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

        {loading && <p>Loading elections...</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="results-grid">
          {!loading && !error && elections.length === 0 && (
            <p>No elections found.</p>
          )}

          {!loading && !error && elections.map(election => (
            <div key={election._id} className="result-card">
              <div className="card-content">
                <img
                  src={election.logo}
                  alt={`${election.title} Logo`}
                  className="org-logo"
                />
                <div className="card-info">
                  <h2>{election.title}</h2>
                  <p>
                    {election.college?.name} - {election.department?.name}
                  </p>
                  <p>{new Date(election.startDate).getFullYear()} ELECTIONS</p>
                </div>
              </div>
              <button
                onClick={() => handleViewClick(election._id)}
                className="view-button"
              >
                VIEW
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ElectionsDashboard;
