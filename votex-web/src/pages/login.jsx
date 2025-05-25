import React, { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "../styles/login.css";
import logo from "../assets/votexmlogo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState(""); // Error state to display error message
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log("Input changed:", e.target.name, e.target.value);  // Log each input change
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Button pressed"); // Confirm that submit is triggered
    setError(""); // Clear previous errors

    // Log form data before sending the request
    console.log("Form data before submit:", form);

    const API_BASE = import.meta.env.PROD
      ? "https://votexv1-backend.onrender.com/api"
      : "/api";

    try {
      // Send login data to backend
      const response = await axios.post(`${API_BASE}/auth/web-login`, form);
      
      console.log("Response data:", response.data); // Log response from backend

      // If login is successful
      if (response.status === 200) {
        const { token, user } = response.data;

        // Save the JWT token in localStorage
        localStorage.setItem('token', token);
        console.log("Token saved:", token);

        // Optionally, save user data in localStorage as well
        localStorage.setItem('user', JSON.stringify(user));

        alert("Login successful!");
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        // If the response status is not 200, it's a failed login attempt
        setError("Invalid username or password. Please try again.");
      }
    } catch (err) {
      console.error("Error during login:", err);  // Log error details
      // Handle error response
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); // Display error message from backend
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <img src={logo} alt="Votex Logo" className="logo" />
      </div>
      <div className="login-right">
        <h2>LOGIN</h2>
        <p>Welcome back! Please login to your account.</p>

        {error && <div className="error-message">{error}</div>} {/* Display error message if exists */}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-wrapper">
            <User className="input-icon" size={18} />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-wrapper">
            <Lock className="input-icon" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
          <button type="submit" className="login-button">
            Login Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
