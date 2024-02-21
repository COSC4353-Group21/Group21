import React from 'react';
import Navbar from '../Navbar';
import '../styles/Landing.css';

const Landing = () => {
    return (
        <div className="landing-container">
            <Navbar />
            <h1>Welcome to Your Website</h1>
            <p>Discover amazing things here!</p>
        </div>
    );
};

export default Landing;
