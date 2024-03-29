import React from 'react'
import { useNavigate } from 'react-router-dom'
import { clientWithAuth } from '../services/axiosClient'

import Logo from "../img/logo-light.png";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogout = async () => {
    const username = localStorage.getItem('username')
    if (!token) {
      localStorage.clear()
      navigate('/login')
    }
    await clientWithAuth(token)
      .post('/logout', { username })
      .then((response) => {})
      .catch((error) => {
        console.log(error)
      })
    localStorage.clear()
    navigate('/')
  }
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
          {token ? (
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>
            <a href="/login">Login</a>
          </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
