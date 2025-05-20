import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/elections.css';
import axios from 'axios';



const ElectionsDashboard = () => {
    const [colleges, setColleges] = useState([]);
const [departments, setDepartments] = useState([]);
const [selectedCollege, setSelectedCollege] = useState('');
const [selectedDepartment, setSelectedDepartment] = useState('');
const [loadingDepartments, setLoadingDepartments] = useState(false);
const token = localStorage.getItem('token'); 

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [elections, setElections] = useState([]);

    const [newElection, setNewElection] = useState({
        title: '',
        description: '',
        logo: null,
        startDate: '',
        endDate: ''
    });
    

    const [errors, setErrors] = useState({
        title: '',
        description: '',
        logo: '',
        startDate: '',
        endDate: '',
        general: ''
    });
    

    // Add confirmation modal state
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [electionToDelete, setElectionToDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editElection, setEditElection] = useState(null);
    const [editFileName, setEditFileName] = useState('No file chosen');
    
    useEffect(() => {
        const fetchElections = async () => {
            try {
                const res = await axios.get('/api/admin/get-elections', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (Array.isArray(res.data.elections)) {
                    setElections(res.data.elections);
                    console.log("Fetched elections:", res.data.elections);
                } else {
                    console.error("Unexpected elections response:", res.data);
                    setElections([]);
                }
            } catch (err) {
                console.error("Error fetching elections:", err);
                alert("Failed to load elections.");
            }
        };
    
        fetchElections();
    }, []);

    
    useEffect(() => {
        const fetchColleges = async () => {
          try {
            const res = await axios.get("/api/admin/get-college",  {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            
            if (Array.isArray(res.data.colleges)) {
              setColleges(res.data.colleges);
              console.log("Fetched colleges:", res.data.colleges);
            } else {
              console.error("Unexpected response from colleges:", res.data);
              setColleges([]);
            }
          } catch (err) {
            console.error("Error fetching colleges:", err);
            alert("Failed to load colleges. Please try again.");
            setColleges([]);
          }
        };
      
        fetchColleges();
      }, []);

      const fetchDepartments = async (collegeId) => {
        console.log("Fetching departments for college:", collegeId);
        if (!collegeId) {
            setDepartments([]); // Clear departments if no college is selected
            return;
        }
        setLoadingDepartments(true);
        try {
            const res = await axios.get(`/api/admin/get-department/${collegeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Departments fetched:", res.data); // Log to inspect the structure of the response
    
            if (Array.isArray(res.data.departments)) {
                setDepartments(res.data.departments);
            } else {
                console.error("Unexpected response from departments:", res.data);
                setDepartments([]);
            }
        } catch (err) {
            console.error("Error fetching departments:", err);
            setDepartments([]);
        }
        setLoadingDepartments(false);
    };
    
    
    
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
        if (!newElection.startDate) {
            newErrors.startDate = 'Start date is required';
            isValid = false;
        }
        
        if (!newElection.endDate) {
            newErrors.endDate = 'End date is required';
            isValid = false;
        } else if (newElection.startDate && newElection.endDate < newElection.startDate) {
            newErrors.endDate = 'End date must be after start date';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
      
        const formData = new FormData();
        formData.append('title', newElection.title);
        formData.append('description', newElection.description);
        formData.append('collegeId', selectedCollege);
        formData.append('departmentId', selectedDepartment);
        formData.append('startDate', newElection.startDate);
        formData.append('endDate', newElection.endDate);
        formData.append('logo', newElection.logo);  // Append the file here
      
        try {
          const response = await axios.post('/api/admin/elections', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });
          
          // Handle the success response
          setElections([...elections, response.data.election]);
          alert('Election created successfully!');
          closeModal();
        } catch (error) {
          setErrors({ ...errors, general: error.message });
        }
      };
      
      const handleEditClick = (election) => {
        // Set election data
        setEditElection({
            ...election,
            _id: election._id,
            collegeId: election.collegeId,
            departmentId: election.departmentId,
            logo: `${election.logo}?t=${new Date().getTime()}`
        });
    
        // Set selected college
        setSelectedCollege(election.collegeId);
    
        // Fetch departments for the selected college
        fetchDepartments(election.collegeId);
    
        // Set selected department only after fetching the departments
        setTimeout(() => {
            setSelectedDepartment(election.departmentId);
        }, 0);
    
        // Set file name for logo
        setEditFileName(typeof election.logo === 'string' ? election.logo.split('/').pop() : 'No file chosen');
    
        // Open the modal
        setShowEditModal(true);
    };
    
    
    
    const handleEditSubmit = async (e) => {
        e.preventDefault();
    
        if (!editElection.title.trim() || !editElection.description.trim()) {
            alert("Please fill out all fields.");
            return;
        }
    
        const formData = new FormData();
        formData.append('title', editElection.title);
        formData.append('description', editElection.description);
        formData.append('collegeId', selectedCollege);
        formData.append('departmentId', selectedDepartment);
        formData.append('startDate', editElection.startDate);
        formData.append('endDate', editElection.endDate);
    
        if (editElection.logo instanceof File) {
            formData.append('logo', editElection.logo);
        }
    
        try {
            const response = await axios.put(`/api/admin/update-election/${editElection._id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            // Update the elections list with the new logo and data
            const updatedElection = {
                ...response.data.election,
                logo: `${response.data.election.logo}?t=${new Date().getTime()}`, // Force reloading the logo
            };
    
            // Update the elections state with the new logo
            const updatedElections = elections.map((el) =>
                el._id === updatedElection._id ? updatedElection : el
            );
    
            setElections(updatedElections);  // This updates the UI with the new logo instantly
            alert('Election updated successfully!');
            setShowEditModal(false); // Close the modal after success
        } catch (error) {
            console.error('Error updating election:', error);
            alert('Failed to update election.');
        }
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
    const confirmDelete = async () => {
        try {
            await axios.delete(`/api/admin/delete-elections/${electionToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const updatedElections = elections.filter(
                (election) => election._id !== electionToDelete
            );
    
            setElections(updatedElections);
            setShowConfirmModal(false);
            setElectionToDelete(null);
            alert("Election deleted successfully!");
        } catch (error) {
            console.error("Error deleting election:", error);
            alert("Failed to delete election.");
        }
    };
    

    // Function to cancel deletion
    const cancelDelete = () => {
        setShowConfirmModal(false);
        setElectionToDelete(null);
    };

    const navigate = useNavigate();
    const handleViewElection = (electionId) => {
        navigate(`/elections/${electionId}/candidates`);
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
        <div className="election-card" key={election._id || election.id}>
            <div className="card-content">
                <div className="election-logo">
                    {/* This will now dynamically update the logo */}
                    <img src={election.logo} alt={`${election.title} Logo`} />
                </div>
                <div className="election-info">
                    <h2>{election.title}</h2>
                    <p className="election-description">{election.description}</p>
                    <p className="election-dates">
                        {new Date(election.startDate).toLocaleDateString()} -{' '}
                        {new Date(election.endDate).toLocaleDateString()}
                    </p>
                    <div className="action-buttons">
                        <button className="view-btn" onClick={() => handleViewElection(election._id)}>VIEW</button>
                        <button className="edit-btn" onClick={() => handleEditClick(election)}>EDIT</button>
                        <button className="delete-btn" onClick={() => handleDeleteClick(election._id)}>DELETE</button>
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
    <label>COLLEGE:</label>
    <select
        name="college"
        value={selectedCollege}
        onChange={(e) => {
            const selectedCollegeId = e.target.value;
            setSelectedCollege(selectedCollegeId);
            setSelectedDepartment('');
            fetchDepartments(selectedCollegeId);
        }}
    >
        <option value="">Select College</option>
        {colleges.map((college) => (
            <option key={college.id} value={college.id}>
                {college.name}
            </option>
        ))}
    </select>
    {errors.college && <div className="error-message">{errors.college}</div>}
</div>

<div className="form-group">
    <label>DEPARTMENT:</label>
    <select
        name="department"
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
        disabled={!departments.length}
    >
        <option value="">Select Department</option>
        {departments.map(dept => (
            <option key={dept.id || dept.id} value={dept._id || dept.id}>
                {dept.name}
            </option>
        ))}
    </select>
    {errors.department && <div className="error-message">{errors.department}</div>}
</div>

<div className="form-group">
    <label>START DATE:</label>
    <input
        type="date"
        name="startDate"
        value={newElection.startDate}
        onChange={handleInputChange}
        className={errors.startDate ? 'input-error' : ''}
    />
    {errors.startDate && <div className="error-message">{errors.startDate}</div>}
</div>

<div className="form-group">
    <label>END DATE:</label>
    <input
        type="date"
        name="endDate"
        value={newElection.endDate}
        onChange={handleInputChange}
        className={errors.endDate ? 'input-error' : ''}
    />
    {errors.endDate && <div className="error-message">{errors.endDate}</div>}
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
            <form onSubmit={handleEditSubmit}>
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
    <label>COLLEGE:</label>
    <select
        value={selectedCollege}
        onChange={(e) => {
            const selectedCollegeId = e.target.value;
            setSelectedCollege(selectedCollegeId);
            setSelectedDepartment(''); // Reset department when college changes
            fetchDepartments(selectedCollegeId); // Fetch new departments
        }}
    >
        <option value="">Select College</option>
        {colleges.map((college) => (
            <option key={college.id} value={college.id}>
                {college.name}
            </option>
        ))}
    </select>
</div>

<div className="form-group">
    <label>DEPARTMENT:</label>
    <select
        value={selectedDepartment}
        onChange={(e) => setSelectedDepartment(e.target.value)}
        disabled={!departments.length}
    >
        <option value="">Select Department</option>
        {departments.map(dept => (
            <option key={dept.id} value={dept.id}>
                {dept.name}
            </option>
        ))}
    </select>
</div>


                <div className="form-group">
                    <label>START DATE:</label>
                    <input
                        type="date"
                        value={editElection.startDate?.slice(0, 10)}
                        onChange={(e) =>
                            setEditElection({ ...editElection, startDate: e.target.value })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>END DATE:</label>
                    <input
                        type="date"
                        value={editElection.endDate?.slice(0, 10)}
                        onChange={(e) =>
                            setEditElection({ ...editElection, endDate: e.target.value })
                        }
                    />
                </div>

                <div className="form-group">
                    <label>ELECTION THUMBNAIL:</label>
                    <div className="file-input-container">
                        <input
                            type="file"
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
                    <button type="submit" className="submit-btn">UPDATE</button>
                </div>
            </form>
        </div>
    </div>
)}

        </div>
    );
};

export default ElectionsDashboard;
