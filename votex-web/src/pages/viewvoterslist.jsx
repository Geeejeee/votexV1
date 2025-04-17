import React, { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import "../styles/viewvoterslist.css";

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
    const [voters] = useState([
        {
            id: 1,
            idNumber: "2022300132",
            firstName: "Ashley",
            lastName: "Tucaling",
            email: "tucaling.ashley@gmail.com",
            time: "2025-09-04 10:00:00",
            department: "BSIT",
            college: "CITC"
        },
        {
            id: 2,
            idNumber: "2022303032",
            firstName: "Louise",
            lastName: "Lawan",
            email: "lawan.louise@gmail.com",
            time: "2025-09-04 10:01:40",
            department: "BSIT",
            college: "CITC"
        }
    ]);

    return (
        <DashboardLayout>
            <div className="voters-container">
                <nav className="breadcrumbs">
                    <a href="/dashboard" className="home-icon">
                        <i className="fa fa-home"></i>
                    </a>
                    <span> › Home</span>
                </nav>

                <div className="voters-header">
                    <div className="org-logo-title">
                        <div className="org-logo">
                            <img src={organizationImages.USG} alt="USG Logo" className="org-logo" />
                        </div>
                        <div className="org-title">
                            <h1>UNIVERSITY STUDENT GOVERNMENT</h1>
                            <p>VOTERS LIST</p>
                        </div>
                    </div>
                    <div className="voter-count">
                        <div className="count-box">
                            <p>TOTAL VOTER COUNT:</p>
                            <h2>{voters.length}</h2>
                        </div>
                    </div>
                </div>

                <div className="filters">
                    <div className="filter-dropdown">
                        <select name="college">
                            <option value="">College</option>
                        </select>
                    </div>
                    <div className="filter-dropdown">
                        <select name="department">
                            <option value="">Department</option>
                        </select>
                    </div>
                </div>

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
                            {voters.map((voter) => (
                                <tr key={voter.id}>
                                    <td>{voter.id}</td>
                                    <td>{voter.idNumber}</td>
                                    <td>{voter.firstName}</td>
                                    <td>{voter.lastName}</td>
                                    <td>{voter.email}</td>
                                    <td>{voter.time}</td>
                                    <td>{voter.college}</td>
                                    <td>{voter.department}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default VotersPage;