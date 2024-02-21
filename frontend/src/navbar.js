import React, { useState } from 'react';
import './styles/Navbar.css';

const Navbar = () => {
    const [isActive, setActive] = useState("false");
    const ToggleClass = () => {
        setActive(!isActive);
    };
    return (
        <div className="container">
            <nav className="nav">
                <a href="/home" className='site-title'>Group21</a>
                <ul>
                    <li><a href='/home' onClick={isActive ? "active" : null}>Home</a></li>
                    <li><a href='/data-table' onClick={isActive ? "active" : null}>Data Table</a></li>
                    <li><a href='/history' onClick={isActive ? "active" : null}>History</a></li>
                    <li><a href='profile' onClick={isActive ? "active" : null}>Profile</a></li>
                    <li><a href='/logout' onClick={isActive ? "active" : null}>Logout</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
