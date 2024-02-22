import React from "react";
import "./styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="nav-container">
      <nav className="nav">
        <a href="/home" className="site-title">
          Group21
        </a>
        <ul>
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/data-table">Data Table</a>
          </li>
          <li>
            <a href="/history">History</a>
          </li>
          <li>
            <a href="profile">Profile</a>
          </li>
          <li>
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
