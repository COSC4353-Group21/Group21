import React from "react";
import Navbar from "./Navbar";
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const getStartedClick = () => {
    navigate("/login");
  };
  return (
    <div className="landing-page">
      <div className="nav">
        <Navbar />
      </div>
      <div className="landing-container">
        <div className="landing-content">
          <h1>Maximize your mileage, minimize your expenses.</h1>
          <p>
            Unlock substantial savings and embrace sustainable energy with our
            AI-driven solutions, customized for your unique needs.
          </p>
          <button onClick={getStartedClick}>Get Started for free</button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Landing;
