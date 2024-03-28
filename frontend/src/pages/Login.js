import { React, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { client } from '../services/axiosClient'

import "../styles/Login.css";

import Navbar from "./Navbar";
import Footer from './Footer';

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    //e.reportValidity();
    await client
      .post('/login', { username, password })
      .then((response) => {
        localStorage.clear()
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('username', username)
        localStorage.setItem('password', password)
        navigate('/profile')
      })
      .catch((error) => {
        console.log('login failed')
        console.log(error)
        if (error.response && error?.response?.status === 400) {
          alert(error.response.data.msg)
          navigate('/login')
        }
      })
  }

  if (token) {
    navigate('/profile')
  }

  return (
    <div className="login-page">
      <Navbar/>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username*"
            onChange={handleUsernameChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password*"
            onChange={handlePasswordChange}
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
