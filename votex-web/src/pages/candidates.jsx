import React, { useState,useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import '../styles/candidates.css';
// Import Lucide React icons
import { Home, X, Plus } from 'lucide-react';
import VotersList from './voters';
import CreatePositionModal from '../components/modals/createPositionModal';
import DeletePositionModal from '../components/modals/deletePositionModal';
import AddCandidateModal from '../components/modals/addCandidateModal';
import EditCandidateModal from '../components/modals/editCandidateModal';
import axios from 'axios';

const ElectionCandidatesView = () => {
    const { electionId } = useParams();

    const [positionsList, setPositionsList] = useState([]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newPositionTitle, setNewPositionTitle] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [positionToDelete, setPositionToDelete] = useState(null);
    const [showAddCandidateModal, setShowAddCandidateModal] = useState(false);
    const [selectedPositionId, setSelectedPositionId] = useState(null);
    const [candidateName, setCandidateName] = useState('');
    const [candidateParty, setCandidateParty] = useState('');
    const [candidatePosition, setCandidatePosition] = useState('');
    const [candidateCourse, setCandidateCourse] = useState('');
    const [candidateYearLevel, setCandidateYearLevel] = useState('');
    const [candidateMotto, setCandidateMotto] = useState('');
    const [candidateAffiliations, setCandidateAffiliations] = useState('');
    const [candidateAdvocacies, setCandidateAdvocacies] = useState('');
    const [candidatePhoto, setCandidatePhoto] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCandidate, setEditingCandidate] = useState(null);
    const [election, setElection] = useState(null);

useEffect(() => {
  async function fetchData() {
    try {
      const token = localStorage.getItem('token');

      // 1. Get positions with candidates (or empty candidate arrays)
      const candidatesRes = await axios.get(`/api/admin/elections/${electionId}/candidates`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Fetched positions:', candidatesRes.data.positions); 
      setPositionsList(candidatesRes.data.positions); 

      // 2. Get full election details
      const electionRes = await axios.get(`/api/admin/elections/${electionId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setElection(electionRes.data.election);

    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  fetchData();
}, [electionId]);




    // Function to reset all form fields
    const resetFormFields = () => {
        setCandidateName('');
        setCandidateParty('');
        setCandidatePosition('');
        setCandidateCourse('');
        setCandidateYearLevel('');
        setCandidateMotto('');
        setCandidateAffiliations('');
        setCandidateAdvocacies('');
        setCandidatePhoto(null);
        setErrorMessage('');
    };

    // Function to handle candidate removal
 const handleRemoveCandidate = async (positionId, candidateId) => {
  const confirmed = window.confirm('Do you want to archive this candidate?');
  if (!confirmed) return;

  const API_BASE = import.meta.env.PROD
      ? "https://votexv1-backend.onrender.com/api"
      : "/api";

  try {
    const token = localStorage.getItem('token');
    // Call backend to archive candidate
    await axios.patch(
      `${API_BASE}/api/admin/candidates/${candidateId}/archive`,
      { isArchived: true },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Remove candidate locally after successful archive
    setPositionsList(prevPositions =>
      prevPositions.map(position => {
        if (position.id === positionId) {
          return {
            ...position,
            candidates: position.candidates.filter(candidate => candidate.id !== candidateId)
          };
        }
        return position;
      })
    );
  } catch (error) {
    console.error('Failed to archive candidate:', error);
    alert('Failed to archive candidate, please try again.');
  }
};



    const navigate = useNavigate();
    const handleViewVoters = (electionId, position) => {
        navigate(`/elections/${electionId}/positions/${position.id}/voters`, {state: { election,position}});
        };

    return (
        !election ? (
            <DashboardLayout><div color='red'>Loading Election Data...</div></DashboardLayout>
        ) : (
        <DashboardLayout>
            <div className="ec-container">
                {/* Breadcrumb */}
                <nav className="ec-breadcrumb">
                    <Link to="/dashboard" className="ec-home-icon">
                        <Home size={16} />
                    </Link>
                    <span> › <Link to="/elections">Elections</Link> › {election.title}</span>
                </nav>

                {/* Header */}
                    <div className="ec-header">
                    <div className="ec-org-info">
                        <div className="ec-org-logo">
                        <img src={election.logo} alt={`${election.title} Logo`} className="ec-usg-logo" />
                        </div>
                        <div className="ec-org-title">
                            <h1>{election.title}</h1>
                            <p>{election.description}</p>
                            <p>
                                {new Date(election.startDate).toLocaleDateString()} –{' '}
                                {new Date(election.endDate).toLocaleDateString()}
                            </p>
                            <p>
                                {election.college?.name} {election.department ? `| ${election.department.name}` : ''}
                            </p>
                        </div>
                    </div>
                    <div className="ec-actions">
                        <button className="ec-btn-create" onClick={() => setShowCreateModal(true)}>
                            Create New Position
                        </button>
                        <button className="ec-btn-delete" onClick={() => setShowDeleteModal(true)}>
                            Delete Position
                        </button>
                    </div>
                </div>

        

                {/* Positions and Candidates */}
               {positionsList.filter(position => !position.isArchived).map((position) => (
                    <div key={position.id} className="ec-position-section">
                        <div className="ec-position-header">
                        <h2>FOR {position.name ?position.name.toUpperCase() : 'UNNAMED POSITION'} :</h2>
                        <button className="ec-btn-view-voters" onClick={() => handleViewVoters(electionId, position)}>
                            View Voters
                        </button>
                        </div>
                        <div className="ec-candidates-row">
                        {position.candidates.map((candidate) => (
                            console.log(`Rendering candidate for ${position.name}:`, candidate),
                            <div key={candidate.id} className="ec-candidate-card" 
                                    onClick={() => {
                                        setEditingCandidate({
                                            positionId: position.id,
                                            candidateId: candidate.id,
                                            name: candidate.name,
                                            party: candidate.party,
                                            position: candidate.position || position.name,
                                            course: candidate.course || '',
                                            yearLevel: candidate.yearLevel || '',
                                            motto: candidate.motto || '',
                                            affiliations: candidate.affiliations || '',
                                            advocacies: candidate.advocacies || '',
                                            photo: candidate.photo,
                                        });
                                        setShowEditModal(true);
                                    }}
                                >
                                    <div className="ec-candidate-photo">
                                        <div className="ec-remove-badge" onClick={(e) => {
                                            e.stopPropagation();
                                            handleRemoveCandidate(position.id, candidate.id);
                                        }}>
                                            <X size={12} />
                                        </div>
                                        {candidate.photo ? (
                                            <img src={candidate.photo} alt={candidate.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        ) : (
                                            <span style={{ color: 'white' }}>No Photo</span>
                                        )}
                                    </div>

                                    <div className="ec-candidate-info">
                                        <h3>{candidate.name}</h3>
                                        <p>{candidate.party}</p>
                                    </div>
                                </div>
                            ))}
                            <div
                                className="ec-add-candidate-card"
                                onClick={() => {
                                    setSelectedPositionId(position.id);
                                    setCandidatePosition(position.name);
                                    setShowAddCandidateModal(true);
                                    resetFormFields();
                                }}
                            >
                                <div className="ec-add-icon">
                                    <Plus size={24} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <CreatePositionModal
                    showCreateModal={showCreateModal}
                    setShowCreateModal={setShowCreateModal}
                    newPositionTitle={newPositionTitle}
                    setNewPositionTitle={setNewPositionTitle}
                    positionsList={positionsList}
                    setPositionsList={setPositionsList}
                    electionId={electionId}
                />  


                <DeletePositionModal
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                    positionToDelete={positionToDelete}
                    setPositionToDelete={setPositionToDelete}
                    positionsList={positionsList}
                    setPositionsList={setPositionsList}
                    electionPositions={positionsList.map(pos => pos.id)}
                />

                <AddCandidateModal
                    showAddCandidateModal={showAddCandidateModal}
                    setShowAddCandidateModal={setShowAddCandidateModal}
                    candidateName={candidateName}
                    setCandidateName={setCandidateName}
                    candidateParty={candidateParty}
                    setCandidateParty={setCandidateParty}
                    candidatePosition={candidatePosition}
                    candidateCourse={candidateCourse}
                    setCandidateCourse={setCandidateCourse}
                    candidateYearLevel={candidateYearLevel}
                    setCandidateYearLevel={setCandidateYearLevel}
                    candidatePhoto={candidatePhoto}
                    setCandidatePhoto={setCandidatePhoto}
                    candidateMotto={candidateMotto}
                    setCandidateMotto={setCandidateMotto}
                    candidateAffiliations={candidateAffiliations}
                    setCandidateAffiliations={setCandidateAffiliations}
                    candidateAdvocacies={candidateAdvocacies}
                    setCandidateAdvocacies={setCandidateAdvocacies}
                    positionsList={positionsList}
                    setPositionsList={setPositionsList}
                    selectedPositionId={selectedPositionId}
                    errorMessage={errorMessage}
                    setErrorMessage={setErrorMessage}
                    resetFormFields={resetFormFields}
                    electionId={electionId}
                />

                {showEditModal && editingCandidate && (
                    <EditCandidateModal
                        showEditModal={showEditModal}
                        setShowEditModal={setShowEditModal}
                        editingCandidate={editingCandidate}
                        setEditingCandidate={setEditingCandidate}
                        setPositionsList={setPositionsList}
                        positionsList={positionsList}
                        setErrorMessage={setErrorMessage}
                        errorMessage={errorMessage}
                    />
    )}

            </div>
        </DashboardLayout>
        )
    );
};

export default ElectionCandidatesView;  