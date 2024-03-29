import { React, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { clientWithAuth } from '../services/axiosClient'

import '../styles/Landing.css'

import Navbar from './Navbar'
import Footer from './Footer'


const Landing = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token')
  const username = localStorage.getItem('username')
  const [profileCompleted, setProfileCompleted] = useState(false)

  

  const renderLanding = () => {
    if(token && profileCompleted) {
      return (
        <div className='landing-content'>
          <h1>Thank you for choosing us</h1>
          <p>
            Paradox&reg; Artificial Intelligence services work together to give you the knowledge and flexibility to predict your future spends — whether you're travel far or not
            
          </p>
          <button onClick={getStartedClick}>Submit new quote</button>
        </div>
      )
    }
    if(token) {
      return (
        <div className='landing-content'>
          <h1>You're almost there!</h1>
          <p>
            Please complete your profile before submit a quote.
            
          </p>
          <button onClick={getStartedClick}>Complete your profile</button>
        </div>
      )
    }
    return (
      <div className='landing-content'>
        <h1>Meet Paradox&reg; AI</h1>
        <p>
         Experience an unparalleled innovation with Paradox&reg; AI while maximize your mileage and minimize your expenses — customized to your needs.
        </p>
        <button onClick={getStartedClick}>Get Started for free</button>
      </div>
    )
  }


  const getStartedClick = () => {
    if(token && profileCompleted) return navigate('/quote')
    if(token) return navigate('/profile')
    return navigate('/login')
  };



  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
  
      try {
        const response = await clientWithAuth(token).get(`/profile/${username}`);
        if(!response.data.fullname){
          return;
        }
        setProfileCompleted(true)
      } catch (error) {
        console.error('Fetching profile error:', error);
      }
    };
  
    fetchProfile();
  }, [username, navigate]);

  return (
    <div className='landing-page'>
      <div className='nav'>
        <Navbar />
      </div>
      <div className='landing-container'>
        {renderLanding()}
      </div>
      <Footer/>
    </div>
  );
};

export default Landing;
