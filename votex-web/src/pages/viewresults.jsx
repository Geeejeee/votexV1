import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import '../styles/viewresultsdb.css';
import socket from '../socket';

const ElectionResultsView = () => {
  const { electionId } = useParams();
  const [positions, setPositions] = useState([]);
  const [selectedPositionId, setSelectedPositionId] = useState(null);
  const [selectedPositionName, setSelectedPositionName] = useState('');
  const [electionTitle, setElectionTitle] = useState('');
  const [electionLogo, setElectionLogo] = useState('');

  const API_BASE = import.meta.env.PROD
  ? "https://votexv1-backend.onrender.com/api"
  : "/api";


  useEffect(() => {
  const fetchResults = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${API_BASE}/api/admin/elections/${electionId}/results`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { election, positions: fetchedPositions } = res.data;

      setElectionTitle(election?.title || '');
      setElectionLogo(election?.logo || '');
      setPositions(fetchedPositions || []);

      if (fetchedPositions && fetchedPositions.length > 0 && !selectedPositionId) {
        setSelectedPositionId(fetchedPositions[0].positionId);
        setSelectedPositionName(fetchedPositions[0].positionName);
      }

      socket.emit('joinElectionRoom', `election_${electionId}`);
    } catch (err) {
      console.error('Failed to fetch election results:', err);
    }
  };

  fetchResults();

  return () => {
    socket.emit('leaveElectionRoom', `election_${electionId}`);
  };
}, [electionId]);

useEffect(() => {
  const onVoteUpdate = (data) => {
    console.log('Received vote update:', data);

    if (data.positions) {
      setPositions(data.positions);

      if (data.election) {
        setElectionTitle(data.election.title || '');
        setElectionLogo(data.election.logo || '');
      }

      // Only reset selected position if the current one was removed
      const stillHasSelected = data.positions.some(
        (pos) => pos.positionId === selectedPositionId
      );

      if (!stillHasSelected && data.positions.length > 0) {
        setSelectedPositionId(data.positions[0].positionId);
        setSelectedPositionName(data.positions[0].positionName);
      }
    }
  };

  socket.on('voteUpdate', onVoteUpdate);

  return () => {
    socket.off('voteUpdate', onVoteUpdate);
  };
}, [electionId, selectedPositionId]);


  const handlePositionChange = (e) => {
    const selectedId = e.target.value;
    const pos = positions.find(p => p.positionId === selectedId);
    setSelectedPositionId(selectedId);
    setSelectedPositionName(pos?.positionName || '');
  };

  const selectedCandidates =
    positions.find(p => p.positionId === selectedPositionId)?.candidates || [];

  const topVoted = selectedCandidates.reduce(
    (top, curr) => (curr.votes > (top?.votes || 0) ? curr : top),
    null
  );

  const totalVotesForPosition = selectedCandidates.reduce(
    (sum, candidate) => sum + (candidate.votes || 0),
    0
  );

  return (
    <DashboardLayout>
      <nav className="breadcrumb">
        <a href="/dashboard" className="home-icon">
          <i className="fa fa-home"></i>
        </a>
        <a href="/resultsdb" className="home-icon">
          <span> › Results › {electionTitle.toUpperCase()} </span>
        </a>
      </nav>

      <div className="org-header">
        <div className="org-logo-title">
          <div className="org-logo">
            {electionLogo ? (
              <img src={electionLogo} alt={`${electionTitle} Logo`} className="org-logo" />
            ) : (
              <div className="org-logo-placeholder">No Logo</div>
            )}
          </div>
          <div className="org-title">
            <h1>{electionTitle.toUpperCase()}</h1>
            <p>RESULTS</p>
          </div>
        </div>

        <div className="position-selector">
          <select
            value={selectedPositionId || ''}
            onChange={handlePositionChange}
            className="position-dropdown"
          >
            {positions.map(pos => (
              <option key={pos.positionId} value={pos.positionId}>
                {pos.positionName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="election-stats">
        <div className="stat-box total-voters">
          <p className="stat-label">TOTAL VOTES:</p>
          <p className="stat-value">{totalVotesForPosition}</p>
        </div>
        <div className="stat-box top-voted">
          <p className="stat-label">TOP VOTED:</p>
          <p className="stat-value">
            {topVoted ? `${topVoted.firstName} ${topVoted.lastName}` : 'N/A'}
          </p>
        </div>
      </div>

      <div className="candidates-grid">
        {selectedCandidates.map(candidate => (
          <CandidateCard
            key={candidate._id}
            candidate={{
              ...candidate,
              name: `${candidate.firstName} ${candidate.lastName}`,
              position: selectedPositionName,
              image: candidate.photo,
              percentage:
                totalVotesForPosition > 0
                  ? ((candidate.votes || 0) / totalVotesForPosition) * 100
                  : 0,
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

      return () => clearInterval(counter);
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
          <div className="vote-progress" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="vote-percentage">{count.toFixed(2)}%</p>
      </div>
    </div>
  );
};

export default ElectionResultsView;
