import React from "react";
import Navbar from "../Navbar";
import "../styles/Landing.css";

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="nav">
        <Navbar />
      </div>
      <div className="landing-container">
        <div className="landing-content">
          <h1>Welcome to Group21</h1>
          <p>Use the navigation bar above to get started...</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
