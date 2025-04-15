import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/voters.css';

const VotersList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [voters, setVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newVoter, setNewVoter] = useState({ idNumber: '', firstName: '', lastName: '', email: '', college: '', department: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const data = [
      { idNumber: '202510001', firstName: 'Ashley', lastName: 'Tucaling', email: 'tucaling.ashley@gmail.com', date: '2025-09-04 10:00:00', college: 'CITC', department: 'BSIT' },
      { idNumber: '202510002', firstName: 'Louise', lastName: 'Lawan', email: 'lawan.louise@gmail.com', date: '2025-09-04 10:01:40', college: 'CITC', department: 'BSIT' }
    ];

    setVoters(data);
    setFilteredVoters(data);
  }, []);

  useEffect(() => {
    let result = voters;
  
    if (searchTerm) {
      result = result.filter(voter =>
        `${voter.firstName} ${voter.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    if (collegeFilter) {
      result = result.filter(voter => voter.college === collegeFilter);
    }
  
    if (deptFilter) {
      result = result.filter(voter => voter.department === deptFilter);
    }
  
    setFilteredVoters(result);
  }, [searchTerm, collegeFilter, deptFilter, voters]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVoter(prev => ({ ...prev, [name]: value }));
  };

  const handleAddVoter = () => {
    const validationErrors = {};
    if (!newVoter.idNumber) validationErrors.idNumber = 'ID Number is required';
    if (!newVoter.firstName) validationErrors.firstName = 'First name is required';
    if (!newVoter.lastName) validationErrors.lastName = 'Last name is required';
    if (!newVoter.email) validationErrors.email = 'Email is required';
    if (!newVoter.college) validationErrors.college = 'College is required';
    if (!newVoter.department) validationErrors.department = 'Department is required';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newEntry = { ...newVoter, date: new Date().toISOString().replace('T', ' ').substring(0, 19) };
    setVoters(prev => [...prev, newEntry]);
    setShowModal(false);
    setNewVoter({ name: '', email: '', college: '', department: '' });
    setErrors({});
  };

  return (
    <div className={`dashboard-container ${!isSidebarOpen ? "sidebar-collapsed" : ""}`}>
      <Sidebar onToggle={setIsSidebarOpen} />
      <div className="dashboard-main">
        <Header />
        <div className="dashboard-content">
          <div className="voters-list-container">
            <div className="voters-header">
              <h2>Voters List</h2>
              <button className="add-btn" onClick={() => setShowModal(true)}>Add New Voter</button>
            </div>
            <div className="filters">
              <select onChange={e => setCollegeFilter(e.target.value)} value={collegeFilter}>
                <option value="">College</option>
                <option value="CITC">CITC</option>
                <option value="CEA">CEA</option>
              </select>
              <select onChange={e => setDeptFilter(e.target.value)} value={deptFilter}>
                <option value="">Department</option>
                <option value="BSIT">BSIT</option>
                <option value="BSTCM">BSTCM</option>
                <option value="BSCS">BSCS</option>
                <option value="BSDS">BSDS</option>
              </select>
              <input type="text" placeholder="Search Voter..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <div className="voters-table">
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>ID Number</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email Address</th>
                    <th>Date/Time Created</th>
                    <th>College</th>
                    <th>Department</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVoters.map((voter, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{voter.idNumber}</td>
                      <td>{voter.firstName}</td>
                      <td>{voter.lastName}</td>
                      <td>{voter.email}</td>
                      <td>{voter.date}</td>
                      <td>{voter.college}</td>
                      <td>{voter.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New Voter</h3>
              <form>
                <input name="idNumber" placeholder="ID Number" value={newVoter.idNumber} onChange={handleInputChange} />
                {errors.idNumber && <div className="error">{errors.idNumber}</div>}

                <input name="firstName" placeholder="First Name" value={newVoter.firstName} onChange={handleInputChange} />
                {errors.firstName && <div className="error">{errors.firstName}</div>}

                <input name="lastName" placeholder="Last Name" value={newVoter.lastName} onChange={handleInputChange} />
                {errors.lastName && <div className="error">{errors.lastName}</div>}

                <input name="email" placeholder="Email Address" value={newVoter.email} onChange={handleInputChange} />
                {errors.email && <div className="error">{errors.email}</div>}

                <input name="college" placeholder="College" value={newVoter.college} onChange={handleInputChange} />
                {errors.college && <div className="error">{errors.college}</div>}

                <input name="department" placeholder="Department" value={newVoter.department} onChange={handleInputChange} />
                {errors.department && <div className="error">{errors.department}</div>}
              </form>
              <div className="modal-actions">
                <button onClick={handleAddVoter}>Add</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VotersList;
