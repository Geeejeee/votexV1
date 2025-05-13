import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import USGLogo from '../assets/USG.png';
import CITCLogo from '../assets/CITC.png';
import SITELogo from '../assets/SITE.png';
import '../styles/candidates.css';
// Import Lucide React icons
import { Home, X, Plus } from 'lucide-react';
import VotersList from './voters';

const ElectionCandidatesView = () => {
    const { orgId } = useParams();

    // Mock data for organizations
    const organizations = {
        1: {
            id: 1,
            name: 'UNIVERSITY STUDENT GOVERNMENT',
            year: '2025 ELECTIONS',
            logo: USGLogo
        },
        2: {
            id: 2,
            name: 'COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING',
            year: '2025 ELECTIONS',
            logo: CITCLogo
        },
        3: {
            id: 3,
            name: 'SOCIETY OF INFORMATION TECHNOLOGY ENTHUSIASTS',
            year: '2025 ELECTIONS',
            logo: SITELogo
        }
    };

    const currentOrg = organizations[orgId] || organizations[1]; // Default to first org if not found

    // Mock data for positions and candidates
    const [positionsList, setPositionsList] = useState([
        {
            id: 1,
            title: 'PRESIDENT',
            candidates: [
                { id: 1, name: 'CANDIDATE NAME', party: 'PARTYLIST', position: 'PRESIDENT', course: 'BSCS', yearLevel: '3rd', motto: 'Excellence', affiliations: 'Student Council', advocacies: 'Better Education' },
                { id: 2, name: 'CANDIDATE NAME', party: 'PARTYLIST', position: 'PRESIDENT', course: 'BSIT', yearLevel: '4th', motto: 'Leadership', affiliations: 'Tech Club', advocacies: 'Digital Access' },
                { id: 3, name: 'CANDIDATE NAME', party: 'PARTYLIST', position: 'PRESIDENT', course: 'BSCS', yearLevel: '2nd', motto: 'Progress', affiliations: 'Math Club', advocacies: 'Campus Improvement' },
            ]
        },
        {
            id: 2,
            title: 'VICE PRESIDENT',
            candidates: [
                { id: 4, name: 'CANDIDATE NAME', party: 'PARTYLIST', position: 'VICE PRESIDENT', course: 'BSIT', yearLevel: '3rd', motto: 'Service', affiliations: 'Chess Club', advocacies: 'Student Rights' },
                { id: 5, name: 'CANDIDATE NAME', party: 'PARTYLIST', position: 'VICE PRESIDENT', course: 'BSCS', yearLevel: '4th', motto: 'Integrity', affiliations: 'Coding Club', advocacies: 'Tech Literacy' },
                { id: 6, name: 'CANDIDATE NAME', party: 'PARTYLIST', position: 'VICE PRESIDENT', course: 'BSIT', yearLevel: '2nd', motto: 'Unity', affiliations: 'Debate Club', advocacies: 'Mental Health' },
            ]
        },
        {
            id: 3,
            title: 'SECRETARY',
            candidates: [
                { id: 7, name: 'CANDIDATE NAME', party: 'PARTYLIST', position: 'SECRETARY', course: 'BSCS', yearLevel: '3rd', motto: 'Dedication', affiliations: 'IT Society', advocacies: 'Sustainability' },
                { id: 8, name: 'CANDIDATE NAME', party: 'PARTYLIST', position: 'SECRETARY', course: 'BSIT', yearLevel: '4th', motto: 'Transparency', affiliations: 'Science Club', advocacies: 'Innovation' },
                { id: 9, name: 'CANDIDATE NAME', party: 'PARTYLIST', position: 'SECRETARY', course: 'BSCS', yearLevel: '2nd', motto: 'Commitment', affiliations: 'Arts Club', advocacies: 'Inclusivity' },
            ]
        }
    ]);

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
    const handleRemoveCandidate = (positionId, candidateId) => {
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
    };

    const navigate = useNavigate();
    const handleViewElection = (id) => {
        navigate(`/elections/${id}/viewvoterslist`);
    };

    return (
        <DashboardLayout>
            <div className="ec-container">
                {/* Breadcrumb */}
                <nav className="ec-breadcrumb">
                    <Link to="/dashboard" className="ec-home-icon">
                        <Home size={16} />
                    </Link>
                    <span> › <Link to="/elections">Elections</Link> › {currentOrg.name}</span>
                </nav>

                {/* Header */}
                <div className="ec-header">
                    <div className="ec-org-info">
                        <div className="ec-org-logo">
                            <img src={currentOrg.logo} alt={`${currentOrg.name} Logo`} className="ec-usg-logo" />
                        </div>
                        <div className="ec-org-title">
                            <h1>{currentOrg.name}</h1>
                            <p>{currentOrg.year}</p>
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
                {positionsList.map((position) => (
                    <div key={position.id} className="ec-position-section">
                        <div className="ec-position-header">
                            <h2>FOR {position.title} :</h2>
                            <button className="ec-btn-view-voters" onClick={() => handleViewElection(123)}>View Voters</button>
                        </div>
                        <div className="ec-candidates-row">
                            {position.candidates.map((candidate) => (
                                <div
                                    className="ec-candidate-card"
                                    key={candidate.id}
                                    onClick={() => {
                                        setEditingCandidate({
                                            positionId: position.id,
                                            candidateId: candidate.id,
                                            name: candidate.name,
                                            party: candidate.party,
                                            position: candidate.position || position.title,
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
                                    setCandidatePosition(position.title);
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

                {showCreateModal && (
                    <div className="ec-modal-overlay">
                        <div className="ec-modal">
                            <h2>Create New Position</h2>
                            <input
                                type="text"
                                placeholder="Position Title"
                                value={newPositionTitle}
                                onChange={(e) => setNewPositionTitle(e.target.value)}
                            />
                            <div className="ec-modal-actions">
                                <button
                                    className="ec-btn-primary"
                                    onClick={() => {
                                        if (newPositionTitle.trim()) {
                                            setPositionsList([
                                                ...positionsList,
                                                {
                                                    id: Date.now(),
                                                    title: newPositionTitle.toUpperCase(),
                                                    candidates: []
                                                }
                                            ]);
                                            setNewPositionTitle('');
                                            setShowCreateModal(false);
                                        }
                                    }}
                                >
                                    Create
                                </button>
                                <button onClick={() => setShowCreateModal(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {showDeleteModal && (
                    <div className="ec-modal-overlay">
                        <div className="ec-modal">
                            <h2>Select Position to Delete</h2>
                            <select
                                onChange={(e) => setPositionToDelete(Number(e.target.value))}
                                defaultValue=""
                            >
                                <option value="" disabled>Select a position</option>
                                {positionsList.map(pos => (
                                    <option key={pos.id} value={pos.id}>{pos.title}</option>
                                ))}
                            </select>
                            <div className="ec-modal-actions">
                                <button
                                    className="ec-btn-danger"
                                    disabled={!positionToDelete}
                                    onClick={() => {
                                        setPositionsList(positionsList.filter(p => p.id !== positionToDelete));
                                        setShowDeleteModal(false);
                                        setPositionToDelete(null);
                                    }}
                                >
                                    Confirm Delete
                                </button>
                                <button onClick={() => {
                                    setShowDeleteModal(false);
                                    setPositionToDelete(null);
                                }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {showAddCandidateModal && (
                    <div className="ec-modal-overlay">
                        <div className="ec-add-candidate-modal ec-modal-fade-in">
                            <div className="ec-add-candidate-header">
                                <h2>ADD CANDIDATE</h2>
                                <button className="ec-add-candidate-close" onClick={() => setShowAddCandidateModal(false)}>
                                    <X size={24} />
                                </button>
                            </div>
                            
                            {errorMessage && <p style={{ color: 'red', fontSize: '0.875rem', textAlign: 'center', marginBottom: '1rem' }}>{errorMessage}</p>}
                            
                            <div className="ec-form-row">
                                <div className="ec-form-group">
                                    <label className="ec-form-label">CANDIDATE NAME:</label>
                                    <input
                                        type="text"
                                        className="ec-form-control"
                                        value={candidateName}
                                        onChange={(e) => setCandidateName(e.target.value)}
                                    />
                                </div>
                                <div className="ec-form-group">
                                    <label className="ec-form-label">PARTYLIST:</label>
                                    <input
                                        type="text"
                                        className="ec-form-control"
                                        value={candidateParty}
                                        onChange={(e) => setCandidateParty(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="ec-form-row">
                                <div className="ec-form-group">
                                    <label className="ec-form-label">RUNNING POSITION:</label>
                                    <input
                                        type="text"
                                        className="ec-form-control"
                                        value={candidatePosition}
                                        onChange={(e) => setCandidatePosition(e.target.value)}
                                        readOnly
                                    />
                                </div>
                                <div className="ec-form-group">
                                    <label className="ec-form-label">COURSE/PROGRAM:</label>
                                    <input
                                        type="text"
                                        className="ec-form-control"
                                        value={candidateCourse}
                                        onChange={(e) => setCandidateCourse(e.target.value)}
                                    />
                                </div>
                                <div className="ec-form-group">
                                    <label className="ec-form-label">YEAR LEVEL:</label>
                                    <input
                                        type="text"
                                        className="ec-form-control"
                                        value={candidateYearLevel}
                                        onChange={(e) => setCandidateYearLevel(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="ec-form-row">
                                <div className="ec-form-group">
                                    <label className="ec-form-label">CANDIDATE PHOTO:</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="ec-file-input"
                                        onChange={(e) => setCandidatePhoto(e.target.files[0])}
                                    />
                                </div>
                                <div className="ec-form-group">
                                    <label className="ec-form-label">MOTTO:</label>
                                    <input
                                        type="text"
                                        className="ec-form-control"
                                        value={candidateMotto}
                                        onChange={(e) => setCandidateMotto(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="ec-form-group" style={{ marginBottom: '1rem' }}>
                                <label className="ec-form-label">AFFILIATIONS:</label>
                                <textarea
                                    className="ec-form-control ec-form-textarea"
                                    value={candidateAffiliations}
                                    onChange={(e) => setCandidateAffiliations(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="ec-form-group" style={{ marginBottom: '1rem' }}>
                                <label className="ec-form-label">ADVOCACIES:</label>
                                <textarea
                                    className="ec-form-control ec-form-textarea"
                                    value={candidateAdvocacies}
                                    onChange={(e) => setCandidateAdvocacies(e.target.value)}
                                ></textarea>
                            </div>

                            <div className="ec-form-submit">
                                <button
                                    className="ec-btn-submit"
                                    onClick={() => {
                                        const trimmedName = candidateName.trim();
                                        const trimmedParty = candidateParty.trim();

                                        if (!trimmedName || !trimmedParty || !candidatePhoto) {
                                            setErrorMessage('Please fill all required fields and upload a photo.');
                                            return;
                                        }

                                        // Check for duplicate candidate names in the same position
                                        const duplicate = positionsList
                                            .find(pos => pos.id === selectedPositionId)
                                            ?.candidates.some(c => c.name.toLowerCase() === trimmedName.toLowerCase());

                                        if (duplicate) {
                                            setErrorMessage('A candidate with this name already exists.');
                                            return;
                                        }

                                        // Create new candidate object with all fields
                                        const newCandidate = {
                                            id: Date.now(),
                                            name: trimmedName,
                                            party: trimmedParty,
                                            position: candidatePosition,
                                            course: candidateCourse,
                                            yearLevel: candidateYearLevel,
                                            motto: candidateMotto,
                                            affiliations: candidateAffiliations,
                                            advocacies: candidateAdvocacies,
                                            photo: URL.createObjectURL(candidatePhoto),
                                        };

                                        // Add candidate to the position
                                        setPositionsList(prev =>
                                            prev.map(pos =>
                                                pos.id === selectedPositionId
                                                    ? { ...pos, candidates: [...pos.candidates, newCandidate] }
                                                    : pos
                                            )
                                        );

                                        // Close modal and reset form
                                        setShowAddCandidateModal(false);
                                        resetFormFields();
                                    }}
                                >
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showEditModal && editingCandidate && (
                    <div className="ec-modal-overlay">
                        <div className="ec-add-candidate-modal ec-modal-fade-in">
                            <div className="ec-add-candidate-header">
                                <h2>EDIT CANDIDATE</h2>
                                <button 
                                    className="ec-add-candidate-close" 
                                    onClick={() => {
                                        setShowEditModal(false);
                                        setEditingCandidate(null);
                                        setErrorMessage('');
                                    }}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            
                            {errorMessage && <p style={{ color: 'red', fontSize: '0.875rem', textAlign: 'center', marginBottom: '1rem' }}>{errorMessage}</p>}
                            
                            <div className="ec-form-row">
                                <div className="ec-form-group">
                                    <label className="ec-form-label">CANDIDATE NAME:</label>
                                    <input
                                        type="text"
                                        className="ec-form-control"
                                        value={editingCandidate.name}
                                        onChange={(e) => setEditingCandidate({...editingCandidate, name: e.target.value})}
                                    />
                                </div>
                                <div className="ec-form-group">
                                    <label className="ec-form-label">PARTYLIST:</label>
                                    <input
                                        type="text"
                                        className="ec-form-control"
                                        value={editingCandidate.party}
                                        onChange={(e) => setEditingCandidate({...editingCandidate, party: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="ec-form-row">
                                <div className="ec-form-group">
                                    <label className="ec-form-label">RUNNING POSITION:</label>
                                    <input
                                        type="text"
                                        className="ec-form-control"
                                        value={editingCandidate.position}
                                        readOnly
                                    />
                                </div>
                                <div className="ec-form-group">
                                    <label className="ec-form-label">COURSE/PROGRAM:</label>
                                    <input
                                        type="text"
                                        className="ec-form-control"
                                        value={editingCandidate.course}
                                        onChange={(e) => setEditingCandidate({...editingCandidate, course: e.target.value})}
                                    />
                                </div>
                                <div className="ec-form-group">
                                    <label className="ec-form-label">YEAR LEVEL:</label>
                                    <input
                                        type="text"
                                        className="ec-form-control"
                                        value={editingCandidate.yearLevel}
                                        onChange={(e) => setEditingCandidate({...editingCandidate, yearLevel: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="ec-form-row">
                                <div className="ec-form-group">
                                    <label className="ec-form-label">CANDIDATE PHOTO:</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="ec-file-input"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setEditingCandidate({
                                                    ...editingCandidate,
                                                    photo: URL.createObjectURL(file),
                                                    newPhotoFile: file,
                                                });
                                            }
                                        }}
                                    />
                                </div>
                                <div className="ec-form-group">
                                    <label className="ec-form-label">MOTTO:</label>
                                    <input
                                        type="text"
                                        className="ec-form-control"
                                        value={editingCandidate.motto}
                                        onChange={(e) => setEditingCandidate({...editingCandidate, motto: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="ec-form-group" style={{ marginBottom: '1rem' }}>
                                <label className="ec-form-label">AFFILIATIONS:</label>
                                <textarea
                                    className="ec-form-control ec-form-textarea"
                                    value={editingCandidate.affiliations}
                                    onChange={(e) => setEditingCandidate({...editingCandidate, affiliations: e.target.value})}
                                ></textarea>
                            </div>

                            <div className="ec-form-group" style={{ marginBottom: '1rem' }}>
                                <label className="ec-form-label">ADVOCACIES:</label>
                                <textarea
                                    className="ec-form-control ec-form-textarea"
                                    value={editingCandidate.advocacies}
                                    onChange={(e) => setEditingCandidate({...editingCandidate, advocacies: e.target.value})}
                                ></textarea>
                            </div>

                            <div className="ec-form-submit">
                                <button
                                    className="ec-btn-submit"
                                    onClick={() => {
                                        const { name, party, position, course, yearLevel, motto, affiliations, advocacies, photo, positionId, candidateId } = editingCandidate;
                                        const trimmedName = name.trim();
                                        const trimmedParty = party.trim();

                                        if (!trimmedName || !trimmedParty) {
                                            setErrorMessage('Please fill all required fields.');
                                            return;
                                        }

                                        // Check for duplicate candidate names (excluding the current candidate being edited)
                                        const isDuplicate = positionsList
                                            .find(pos => pos.id === positionId)
                                            ?.candidates.some(c =>
                                                c.name.toLowerCase() === trimmedName.toLowerCase() &&
                                                c.id !== candidateId
                                            );

                                        if (isDuplicate) {
                                            setErrorMessage('A candidate with this name already exists.');
                                            return;
                                        }

                                        // Update the candidate in the position list
                                        setPositionsList(prev =>
                                            prev.map(pos => {
                                                if (pos.id !== positionId) return pos;

                                                return {
                                                    ...pos,
                                                    candidates: pos.candidates.map(c =>
                                                        c.id === candidateId
                                                            ? { 
                                                                ...c, 
                                                                name: trimmedName, 
                                                                party: trimmedParty,
                                                                position,
                                                                course,
                                                                yearLevel,
                                                                motto,
                                                                affiliations,
                                                                advocacies,
                                                                photo 
                                                            }
                                                            : c
                                                    ),
                                                };
                                            })
                                        );

                                        // Close modal and reset
                                        setShowEditModal(false);
                                        setEditingCandidate(null);
                                        setErrorMessage('');
                                    }}
                                >
                                    SAVE
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default ElectionCandidatesView;  