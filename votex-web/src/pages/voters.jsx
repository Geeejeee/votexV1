import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import Header from '../components/header';
import Footer from '../components/footer';
import '../styles/voters.css';
import axios from 'axios';


const VotersList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [voters, setVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newVoter, setNewVoter] = useState({
    idNumber: '',
    firstname: '',
    lastname: '',
    email: '',
    college: '',
    department: '',
    password: '',
    yearLevel: '',
    section: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true); // ⬅️ NEW loading state
  const [colleges, setColleges] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const token = localStorage.getItem('token'); // or whatever key you used to store the JWT

  
  const API_BASE = import.meta.env.PROD
      ? "https://votexv1-backend.onrender.com/api"
      : "/api";


  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/admin/get-college`,  {
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
    setLoadingDepartments(true);
    try {
      const res = await axios.get(`${API_BASE}/api/admin/get-department/${collegeId}`,  {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Departments fetched:", res.data); 
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
  
  


  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/get-all-students-with-vote-status`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();

        if (res.ok) {
          const formattedData = data.students.map(student => ({
            idNumber: student.idNumber,
            firstname: student.firstname,
            lastname: student.lastname,
            email: student.email,
            date: new Date(student.registeredAt).toLocaleString(),
            college: student.college,
            department: student.department
          }));
          
          setVoters(formattedData);
          setFilteredVoters(formattedData);
        }
         else {
          console.error('Error fetching students:', data.message);
        }
      } catch (err) {
        console.error('Error fetching students:', err);
      } finally {
        setLoading(false); // ✅ Hide loader once finished
      }
    };

    fetchVoters();
  }, []);

  useEffect(() => {
    let result = voters;

    if (searchTerm) {
      result = result.filter(voter =>
        `${voter.idNumber}`.toLowerCase().includes(searchTerm.toLowerCase())
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

const handleAddVoter = async () => {
  const validationErrors = {};
if (!newVoter.idNumber) validationErrors.idNumber = 'ID Number is required';
if (!newVoter.firstname) validationErrors.firstname = 'First name is required';
if (!newVoter.lastname) validationErrors.lastname = 'Last name is required';
if (!newVoter.email) validationErrors.email = 'Email is required';
if (!newVoter.password) validationErrors.password = 'Password is required';
if (!newVoter.yearLevel) validationErrors.yearLevel = 'Year level is required';
if (!newVoter.section) validationErrors.section = 'Section is required';
if (!newVoter.college) validationErrors.college = 'College is required';  // Use 'college'
if (!newVoter.department) validationErrors.department = 'Department is required';  // Use 'department'


  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  // Log the new voter object before making the API request
  console.log("New voter data being sent:", newVoter);

  try {
    // Send the college and department ID to the backend
    
const res = await axios.post(
  `${API_BASE}/api/admin/add-voter`,
  {
    idNumber: newVoter.idNumber,
    firstname: newVoter.firstname,
    lastname: newVoter.lastname,
    email: newVoter.email,
    password: newVoter.password,
    yearLevel: newVoter.yearLevel,
    section: newVoter.section,
    college: newVoter.college,
    department: newVoter.department
  },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

    

if (res.data && res.data.message === 'Voter added successfully') {
  const newEntry = { ...res.data.voter, date: new Date().toLocaleString() };
  setVoters(prev => [...prev, newEntry]);
  setShowModal(false);
  setNewVoter({
    idNumber: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    yearLevel: '',
    section: '',
    college: '',
    department: ''
  });
  setErrors({});
} else {
  console.error('Unexpected response:', res.data);
  alert('Failed to register voter.');
}

    
  } catch (err) {
    console.error("Error adding voter:", err.response?.data || err.message, err);
    alert("Error adding voter. Please try again.");
  }
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
              <input
                type="text"
                placeholder="Search Voter with ID"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="loading-indicator">Loading voters...</div> // 👈 Add your own spinner CSS here
            ) : (
              <div className="voters-table">
                <table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>ID Number</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email Address</th>
                      <th>College</th>
                      <th>Department</th>
                      <th>Date/Time Created</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVoters.map((voter, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{voter.idNumber}</td>
                        <td>{voter.firstname}</td>
                        <td>{voter.lastname}</td>
                        <td>{voter.email}</td>
                        <td>{voter.college}</td>
                        <td>{voter.department}</td>
                        <td>{voter.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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

  <input name="firstname" placeholder="First Name" value={newVoter.firstname} onChange={handleInputChange} />
  {errors.firstname && <div className="error">{errors.firstname}</div>}

  <input name="lastname" placeholder="Last Name" value={newVoter.lastname} onChange={handleInputChange} />
  {errors.lastname && <div className="error">{errors.lastname}</div>}

  <input name="email" placeholder="Email Address" value={newVoter.email} onChange={handleInputChange} />
  {errors.email && <div className="error">{errors.email}</div>}

  <input type="password" name="password" placeholder="Password" value={newVoter.password} onChange={handleInputChange} />
  {errors.password && <div className="error">{errors.password}</div>}

  <select name="yearLevel" value={newVoter.yearLevel} onChange={handleInputChange}>
    <option value="">Select Year Level</option>
    <option value="1st Year">1st Year</option>
    <option value="2nd Year">2nd Year</option>
    <option value="3rd Year">3rd Year</option>
    <option value="4th Year">4th Year</option>
  </select>
  {errors.yearLevel && <div className="error">{errors.yearLevel}</div>}

  <input name="section" placeholder="Section" value={newVoter.section} onChange={handleInputChange} />
  {errors.section && <div className="error">{errors.section}</div>}

  <select
  name="college"
  value={newVoter.college}
  onChange={(e) => {
    const selectedCollegeId = e.target.value;
    setNewVoter(prev => ({ ...prev, college: selectedCollegeId, department: "" }));
    fetchDepartments(selectedCollegeId);
  }}
>
  <option value="">Select College</option>
  {colleges.map(college => (
    <option key={college.id} value={college.id}>
      {college.name}
    </option>
  ))}
</select>
{errors.college && <div className="error">{errors.college}</div>}


<select
  name="department"
  value={newVoter.department}
  onChange={handleInputChange}
  disabled={!departments.length}
>
  <option value="">Select Department</option>
  {departments.map(dept => (
    <option key={dept.id} value={dept.id}>
      {dept.name}
    </option>
  ))}
</select>
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
