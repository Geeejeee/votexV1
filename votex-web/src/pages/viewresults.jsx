import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import DashboardLayout from "../layouts/DashboardLayout";  // Import DashboardLayout
import '../styles/viewresultsdb.css';

// Static image imports
import USGLogo from '../assets/USG.png';
import CITCLogo from '../assets/CITC.png';
import SITELogo from '../assets/SITE.png';

// Candidate images for USG
import aImage from '../assets/candidates/arlene.png';
import nicoleImage from '../assets/candidates/nicole.png';
import lhuisanImage from '../assets/candidates/lhuisan.png';
import desImage from '../assets/candidates/des.png';

// Centralized mapping for organization images
const organizationImages = {
  USG: {
    logo: USGLogo,
    candidates: {
      arlene: aImage,
      nicole: nicoleImage,
      lhuisan: lhuisanImage,
      des: desImage,
    },
  },
  CITC: {
    logo: CITCLogo,
    candidates: {
      arlene: aImage,
      nicole: nicoleImage,
      lhuisan: lhuisanImage,
      des: desImage,
    },
  },
  SITE: {
    logo: SITELogo,
    candidates: {
      arlene: aImage,
      nicole: nicoleImage,
      lhuisan: lhuisanImage,
      des: desImage,
    }, 
  },
};

const ElectionResultsView = () => {
    const { organization } = useParams(); // Get the organization from URL params
    const [selectedPosition, setSelectedPosition] = useState('PRESIDENT');

  // Define candidate data based on organization
  const candidatesData = {
    USG: [
      { id: 1, name: 'Arlene Baldelovar', position: 'PRESIDENT', votes: 180, percentage: 80, image: 'arlene' },
      { id: 2, name: 'Lhuisan Betonio', position: 'PRESIDENT', votes: 70, percentage: 56, image: 'lhuisan' },
      { id: 3, name: 'Nicole Raiv Hernandez', position: 'PRESIDENT', votes: 200, percentage: 90, image: 'nicole' },
      { id: 4, name: 'Dessy Mae Padron', position: 'PRESIDENT', votes: 70, percentage: 56, image: 'des' },
      { id: 5, name: 'John Doe', position: 'VICE_PRESIDENT', votes: 150, percentage: 75, image: 'arlene' },
      { id: 6, name: 'Jane Smith', position: 'VICE_PRESIDENT', votes: 50, percentage: 45, image: 'nicole' },
    ],
    CITC: [
        { id: 1, name: 'Arlene Baldelovar', position: 'PRESIDENT', votes: 180, percentage: 80, image: 'arlene' },
        { id: 2, name: 'Lhuisan Betonio', position: 'PRESIDENT', votes: 70, percentage: 56, image: 'lhuisan' },
        { id: 3, name: 'Nicole Raiv Hernandez', position: 'PRESIDENT', votes: 200, percentage: 90, image: 'nicole' },
        { id: 4, name: 'Dessy Mae Padron', position: 'PRESIDENT', votes: 70, percentage: 56, image: 'des' },
        { id: 5, name: 'John Doe', position: 'VICE_PRESIDENT', votes: 150, percentage: 75, image: 'arlene' },
      { id: 6, name: 'Jane Smith', position: 'VICE_PRESIDENT', votes: 50, percentage: 45, image: 'nicole' },
    ],
    SITE: [
        { id: 1, name: 'Arlene Baldelovar', position: 'PRESIDENT', votes: 180, percentage: 80, image: 'arlene' },
        { id: 2, name: 'Lhuisan Betonio', position: 'PRESIDENT', votes: 70, percentage: 56, image: 'lhuisan' },
        { id: 3, name: 'Nicole Raiv Hernandez', position: 'PRESIDENT', votes: 200, percentage: 90, image: 'nicole' },
        { id: 4, name: 'Dessy Mae Padron', position: 'PRESIDENT', votes: 70, percentage: 56, image: 'des' },
        { id: 5, name: 'John Doe', position: 'VICE_PRESIDENT', votes: 150, percentage: 75, image: 'arlene' },
      { id: 6, name: 'Jane Smith', position: 'VICE_PRESIDENT', votes: 50, percentage: 45, image: 'nicole' },
    ],
  };

   
    // Define candidate data based on organization
    const candidates = candidatesData[organization] || []; // Get candidates based on the organization
  
    // Filter candidates by the selected position
    const filteredCandidates = candidates.filter(candidate => candidate.position === selectedPosition);
  
    // Access the logo and candidates images for the selected organization
    const orgImages = organizationImages[organization] || {};

  return (
    <DashboardLayout>
            <nav className="breadcrumb">
              <a href="/dashboard" className="home-icon">
                <i className="fa fa-home"></i>
              </a>
              <a href="/resultsdb" className="home-icon">
              <span> › Results › {organization.toUpperCase()} </span>
              </a>
            </nav>

            <div className="org-header">
              <div className="org-logo-title">
                <div className="org-logo">
                  <img
                    src={orgImages.logo}
                    alt={`${organization} Logo`}
                    className="org-logo"
                  />
                </div>
                <div className="org-title">
                  <h1>{organization.toUpperCase()}</h1>
                  <p>RESULTS</p>
                </div>
              </div>

              <div className="position-selector">
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="position-dropdown"
                >
                  <option value="PRESIDENT">PRESIDENT</option>
                  <option value="VICE_PRESIDENT">VICE PRESIDENT</option>
                  <option value="SECRETARY">SECRETARY</option>
                  <option value="TREASURER">TREASURER</option>
                </select>
              </div>
            </div>

            <div className="election-stats">
              <div className="stat-box total-voters">
                <p className="stat-label">TOTAL VOTERS:</p>
                <p className="stat-value">1000</p>
              </div>
              <div className="stat-box top-voted">
                <p className="stat-label">TOP VOTED:</p>
                <p className="stat-value">Nicole Raiv Hernandez</p>
              </div>
            </div>

            <div className="candidates-grid">
              {filteredCandidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={{
                    ...candidate,
                    image: orgImages.candidates[candidate.image],
                  }}
                />
              ))}
            </div>
    </DashboardLayout>
  );
};

const CandidateCard = ({ candidate }) => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      setProgress(candidate.percentage);

      let start = 0;
      const duration = 1000;
      const increment = candidate.percentage / (duration / 10);

      const counter = setInterval(() => {
        start += increment;
        if (start >= candidate.percentage) {
          setCount(candidate.percentage);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 10);
    }
  }, [inView, candidate.percentage]);

  return (
    <div className="candidate-card" ref={ref}>
      <div className="candidate-photo">
        <img src={candidate.image} alt={candidate.name} className="candidate-image" />
      </div>
      <div className="candidate-info">
        <h3 className="candidate-name">
          {candidate.name} [ FOR {candidate.position} ]
        </h3>
        <p className="candidate-votes">{candidate.votes} Votes</p>
        <div className="vote-bar">
          <div
            className="vote-progress"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="vote-percentage">{count.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default ElectionResultsView;
