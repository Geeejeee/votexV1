// src/pages/Login.jsx
import React, { useState } from "react";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styles/login.css";
import logo from "../assets/votexmlogo.png";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate(); // Initialize navigate hook

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    
    // Example login validation logic:
    if (form.username === "admin" && form.password === "admin123") {
      // Redirect to the dashboard on successful login
      navigate("/dashboard"); // Navigate to the dashboard
    } else {
      // Handle failed login (e.g., show an error message)
      alert("Invalid username or password.");
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
