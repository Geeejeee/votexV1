import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/elections.css';

// Import logo images
import USGLogo from '../assets/USG.png';
import CITLogo from '../assets/CITC.png';
import SITELogo from '../assets/SITE.png';

const ElectionsDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [elections, setElections] = useState([
        {
            id: 1,
            title: 'UNIVERSITY STUDENT GOVERNMENT',
            year: '2025 ELECTIONS',
            logo: USGLogo
        },
        {
            id: 2,
            title: 'COLLEGE OF INFORMATION TECHNOLOGY AND COMPUTING',
            year: '2025 ELECTIONS',
            logo: CITLogo
        },
        {
            id: 3,
            title: 'SOCIETY OF INFORMATION TECHNOLOGY ENTHUSIASTS',
            year: '2025 ELECTIONS',
            logo: SITELogo
        }
    ]);

    const [newElection, setNewElection] = useState({
        title: '',
        description: '',
        logo: null
    });

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        logo: '',
        general: ''
    });

    // Add confirmation modal state
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [electionToDelete, setElectionToDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editElection, setEditElection] = useState(null);
    const [editFileName, setEditFileName] = useState('No file chosen');

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            title: '',
            description: '',
            logo: '',
            general: ''
        };

        // Check if title is empty
        if (!newElection.title.trim()) {
            newErrors.title = 'Election title is required';
            isValid = false;
        }

        // Check if description is empty
        if (!newElection.description.trim()) {
            newErrors.description = 'Election description is required';
            isValid = false;
        }

        // Check if logo is selected
        if (!newElection.logo) {
            newErrors.logo = 'Election thumbnail is required';
            isValid = false;
        }

        // Check if election with same title already exists
        const electionExists = elections.some(
            election => election.title.toLowerCase() === newElection.title.toLowerCase()
        );

        if (electionExists) {
            newErrors.general = 'An election with this title already exists';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewElection({
            ...newElection,
            [name]: value
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const [fileName, setFileName] = useState('No file chosen');

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setNewElection({
                ...newElection,
                logo: e.target.files[0]
            });
            setFileName(e.target.files[0].name);

            // Clear logo error
            if (errors.logo) {
                setErrors({
                    ...errors,
                    logo: ''
                });
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form before submission
        if (!validateForm()) {
            return;
        }

        // Create a new election object
        const newElectionObj = {
            id: elections.length + 1,
            title: newElection.title,
            year: '2025 ELECTIONS',
            logo: newElection.logo ? URL.createObjectURL(newElection.logo) : '../assets/thumbnark.png'
        };

        // Add to elections array
        setElections([...elections, newElectionObj]);

        // Reset form and close modal
        setNewElection({
            title: '',
            description: '',
            logo: null
        });
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
        // Reset form and errors when closing modal
        setNewElection({
            title: '',
            description: '',
            logo: null
        });
        setErrors({
            title: '',
            description: '',
            logo: '',
            general: ''
        });
    };

    // Function to initiate deletion process
    const handleDeleteClick = (electionId) => {
        setElectionToDelete(electionId);
        setShowConfirmModal(true);
    };

    // Function to confirm and execute deletion
    const confirmDelete = () => {
        const updatedElections = elections.filter(election => election.id !== electionToDelete);
        setElections(updatedElections);
        setShowConfirmModal(false);
        setElectionToDelete(null);
    };

    // Function to cancel deletion
    const cancelDelete = () => {
        setShowConfirmModal(false);
        setElectionToDelete(null);
    };

    const navigate = useNavigate();
    const handleViewElection = (id) => {
        navigate(`/elections/${id}`);
    };

    return (
        <div className={`dashboard-container ${!isSidebarOpen ? "sidebar-collapsed" : ""}`}>
            <Sidebar onToggle={setIsSidebarOpen} />
            <div className="dashboard-main">
                <Header />
                <div className="dashboard-content">
                    <div className="elections-container">
                        <nav className="breadcrumb">
                            <a href="/dashboard" className="home-icon">
                                <i className="fa fa-home"></i>
                            </a>
                            <span> › Elections</span>
                        </nav>

                        <div className="elections-header">
                            <h1>ONGOING ELECTIONS</h1>
                            <button className="create-election-btn" onClick={() => setShowModal(true)}>
                                Create New Election
                            </button>
                        </div>

                        <div className="elections-grid">
                            {elections.map((election) => (
                                <div className="election-card" key={election.id}>
                                    <div className="card-content">
                                        <div className="election-logo">
                                            <img src={election.logo} alt={`${election.title} Logo`} />
                                        </div>
                                        <div className="election-info">
                                            <h2>{election.title}</h2>
                                            <h3>{election.year}</h3>
                                            <div className="action-buttons">
                                                <button className="view-btn" onClick={() => handleViewElection(election.id)}>VIEW</button>
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => {
                                                        setEditElection(election);
                                                        setEditFileName(typeof election.logo === 'string' ? election.logo.split('/').pop() : 'No file chosen');
                                                        setShowEditModal(true);
                                                    }}
                                                >
                                                    EDIT
                                                </button>
                                                <button className="delete-btn" onClick={() => handleDeleteClick(election.id)}> DELETE </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <Footer />
                </div>
            </div>

            {/* Modal for Creating a New Election */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>CREATE NEW ELECTION</h2>
                            <button className="close-modal" onClick={closeModal}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            {errors.general && <div className="error-message general-error">{errors.general}</div>}

                            <div className="form-group">
                                <label>ELECTION TITLE:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newElection.title}
                                    onChange={handleInputChange}
                                    className={errors.title ? 'input-error' : ''}
                                />
                                {errors.title && <div className="error-message">{errors.title}</div>}
                            </div>

                            <div className="form-group">
                                <label>ELECTION DESCRIPTION:</label>
                                <textarea
                                    name="description"
                                    value={newElection.description}
                                    onChange={handleInputChange}
                                    className={errors.description ? 'input-error' : ''}
                                ></textarea>
                                {errors.description && <div className="error-message">{errors.description}</div>}
                            </div>

                            <div className="form-group">
                                <label>ELECTION THUMBNAIL:</label>
                                <div className={`file-input-container ${errors.logo ? 'input-error' : ''}`}>
                                    <input
                                        type="file"
                                        id="election-logo"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                    <span className="file-name">{fileName}</span>
                                </div>
                                {errors.logo && <div className="error-message">{errors.logo}</div>}
                            </div>

                            <div className="form-submit">
                                <button type="submit" className="submit-btn">SUBMIT</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirmation Modal for Deletion */}
            {showConfirmModal && (
                <div className="modal-overlay">
                    <div className="modal-content confirm-modal">
                        <div className="modal-header">
                            <h2>CONFIRM DELETION</h2>
                            <button className="close-modal" onClick={cancelDelete}>×</button>
                        </div>
                        <div className="confirm-content">
                            <p>Are you sure you want to delete this election? This action cannot be undone.</p>
                            <div className="confirm-buttons">
                                <button className="cancel-btn" onClick={cancelDelete}>CANCEL</button>
                                <button className="confirm-delete-btn" onClick={confirmDelete}>DELETE</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && editElection && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>EDIT ELECTION</h2>
                            <button className="close-modal" onClick={() => setShowEditModal(false)}>×</button>
                        </div>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();

                                // Validation (optional)
                                if (!editElection.title.trim() || !editElection.description.trim()) {
                                    alert("Please fill out all fields.");
                                    return;
                                }

                                // Update elections list
                                const updatedElections = elections.map((el) =>
                                    el.id === editElection.id
                                        ? {
                                            ...el,
                                            title: editElection.title,
                                            description: editElection.description,
                                            logo:
                                                editElection.logo instanceof File
                                                    ? URL.createObjectURL(editElection.logo)
                                                    : el.logo,
                                        }
                                        : el
                                );

                                setElections(updatedElections);
                                setShowEditModal(false);
                            }}
                        >
                            <div className="form-group">
                                <label>ELECTION TITLE:</label>
                                <input
                                    type="text"
                                    value={editElection.title}
                                    onChange={(e) =>
                                        setEditElection({ ...editElection, title: e.target.value })
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>ELECTION DESCRIPTION:</label>
                                <textarea
                                    value={editElection.description}
                                    onChange={(e) =>
                                        setEditElection({ ...editElection, description: e.target.value })
                                    }
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>ELECTION THUMBNAIL:</label>
                                <div className="file-input-container">
                                    <input
                                        type="file"
                                        id="edit-election-logo"
                                        onChange={(e) => {
                                            if (e.target.files[0]) {
                                                setEditElection({
                                                    ...editElection,
                                                    logo: e.target.files[0],
                                                });
                                                setEditFileName(e.target.files[0].name);
                                            }
                                        }}
                                        accept="image/*"
                                    />
                                    <span className="file-name">{editFileName}</span>
                                </div>
                            </div>

                            <div className="form-submit">
                                <button type="submit" className="submit-btn">SAVE CHANGES</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ElectionsDashboard;