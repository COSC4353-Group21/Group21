import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import Navbar from "./Navbar";
import Footer from './Footer';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication logic goes here
    navigate("/home");
  };

  return (
    <div className="login-page">
      <Navbar/>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email" // Set the placeholder here
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password" // And here
            required
          />
          <p className="register-link">
            Don't have an account? <Link to="/register">Create an account</Link>
          </p>
          <button type="submit">Login</button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default Login;
