import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css"; // Make sure to create and import a corresponding CSS file
import Navbar from "./Navbar";
import Footer from './Footer';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the registration logic
    console.log(formData);
    navigate("/login"); // Redirect the user to a different route after registration
  };

  return (
    <div className="register-page">
      <Navbar/>
      <div className="register-container">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="register-section">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email*"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password*"
              required
            />
            <p className="register-link">
              By signing up, you agree to our
              <br />
              <Link to="https://youtu.be/dQw4w9WgXcQ?si=TZ0DELUisIeT8mZc">
                Terms of Service & Privacy Policy
              </Link>
            </p>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default Register;
