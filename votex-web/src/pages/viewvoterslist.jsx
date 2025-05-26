import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import "../styles/viewvoterslist.css";
import axios from "axios";

// Static image imports
import USGLogo from '../assets/USG.png';
import CITCLogo from '../assets/CITC.png';
import SITELogo from '../assets/SITE.png';

const organizationImages = {
  USG: USGLogo,
  CITC: CITCLogo,
  SITE: SITELogo,
};

const VotersPage = () => {
  const { electionId, positionId } = useParams();
  const location = useLocation();

  // election is passed via navigation state, fallback null
  const election = location.state?.election || null;
  const position = location.state?.position || null;

  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = import.meta.env.PROD
      ? "https://votexv1-backend.onrender.com/api"
      : "/api";

  useEffect(() => {
    async function fetchVoters() {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");

        // Fetch voters for the specific election and position
        const res = await axios.get(
          `${API_BASE}/admin/elections/${electionId}/positions/${positionId}/voters`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setVoters(res.data.voters || []);
      } catch (err) {
        setError("Failed to load voters. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchVoters();
  }, [electionId, positionId]);

  return (
    <DashboardLayout>
      <div className="voters-container">
        <nav className="breadcrumbs">
        <Link to ="/dashboard" className="home-icon">
          <i className="fa fa-home"></i>
        </Link>
          <span> › Elections › {election?.title || "Election"} › Voters</span>
        </nav>

        {!election ? (
          <div style={{ color: "red", padding: "1rem" }}>
            Election details not available.
          </div>
        ) : (
          <div className="voters-header">
            <div className="org-logo-title">
              <div className="org-logo">
                {/* Use election logo or fallback */}
                <img
                  src={election.logo || organizationImages[election.college?.name]}
                  alt={`${election.title} Logo`}
                  className="ec-usg-logo"
                />
              </div>
              <div className="org-title">
                <h1>{election.title}</h1>
                <p>{election.description}</p>
                <p>
                  {new Date(election.startDate).toLocaleDateString()} –{" "}
                  {new Date(election.endDate).toLocaleDateString()}
                </p>
                <p>
                  {election.college?.name}{" "}
                  {election.department ? `| ${election.department.name}` : ""}
                </p>
                <p>VOTERS LIST FOR {position?.name || "Position" }</p>

              </div>
            </div>
            <div className="voter-count">
              <div className="count-box">
                <p>TOTAL VOTER COUNT:</p>
                <h2>{voters.length}</h2>
              </div>
            </div>
          </div>
        )}

        {/* Filters can be implemented here later */}

        {loading ? (
          <p>Loading voters...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <div className="voters-table-wrapper">
            <table className="voters-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>ID Number</th>
                  <th>FirstName</th>
                  <th>LastName</th>
                  <th>Email Address</th>
                  <th>Time</th>
                  <th>College</th>
                  <th>Department</th>
                </tr>
              </thead>
              <tbody>
                {voters.map((voter, idx) => (
                  <tr key={voter.id}>
                    <td>{idx + 1}</td>
                    <td>{voter.idNumber}</td>
                    <td>{voter.firstName}</td>
                    <td>{voter.lastName}</td>
                    <td>{voter.email}</td>
                    <td>{new Date(voter.time).toLocaleString()}</td>
                    <td>{voter.college}</td>
                    <td>{voter.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default VotersPage;
