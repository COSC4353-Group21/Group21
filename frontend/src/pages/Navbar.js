import React from "react";
import Logo from "../img/logo-light.png";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <div className="nav-container">
      <nav className="nav">
        <a href="/home" className="site-title">
          <img className="navbar-logo" src={Logo} alt="" />PRDX
        </a>
        <ul className="navbar-list">
          <li>
            <a href="/quote">Data</a>
          </li>
          <li>
            <a href="/history">History</a>
          </li>
          <li>
            <a href="/profile">Profile</a>
          </li>
          <li>
            <a href="/login">Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
