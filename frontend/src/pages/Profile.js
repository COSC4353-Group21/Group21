import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css'; // Ensure you have the styles for the form

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    address1: '',
    address2: '',
    city: '',
    state: '', // You can manage this with a dropdown in actual implementation
    zipcode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log('Profile data submitted:', profile);
    // navigate('/dashboard'); // Redirect to dashboard or profile view page if needed
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
          />
          <input
            type="text"
            name="address1"
            value={profile.address1}
            onChange={handleInputChange}
            placeholder="Address 1"
            required
          />
          <input
            type="text"
            name="address2"
            value={profile.address2}
            onChange={handleInputChange}
            placeholder="Address 2"
          />
          <input
            type="text"
            name="city"
            value={profile.city}
            onChange={handleInputChange}
            placeholder="City"
            required
          />
          <select
            name="state"
            value={profile.state}
            onChange={handleInputChange}
            required
          >
            <option value="">State</option>
            {/* List of states or options here */}
          </select>
          <input
            type="text"
            name="zipcode"
            value={profile.zipcode}
            onChange={handleInputChange}
            placeholder="Zipcode"
            required
          />
          <button type="submit">Save Profile</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
