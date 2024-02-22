import React, { useState } from 'react';
import '../styles/Account.css'; // Ensure you have the styles for the form
import Profile from './Profile';
import Navbar from "../Navbar";

const Account = () => {
  const [loginInfo, setLoginInfo] = useState({
    username: 'renukhator@uh.edu',
    password: '',
  })

  const [editLogin, setEditLogin] = useState(false);
  const editLoginClick = () => {
    setEditLogin(true);
  }
  const saveLoginClick = () => {
    setEditLogin(false);
  }

  const [createProfile, setCreateProfile] = useState(false);
  const createProfileClick = () => {
    setCreateProfile(true); // When the button is clicked, showProfile will be true
  };

  const [profiles, setProfiles] = useState([
    { name: 'Renu Khator', address1: '4800 Calhoun Rd', address2: 'SW101', city: 'Houston', state:'TX', zipcode: '77004'},
    { name: 'John Doe', address1: '123 Main St', address2: '', city: 'Houston', state:'TX', zipcode: '77004'},
    // ... other profile objects
  ]);

  const [editProfileIndex, setEditProfileIndex] = useState(null); // Index of the profile being edited

  const editProfileClick = (index) => {
    setEditProfileIndex(index); // Set the index of the profile to be edited
  };

  const saveProfile = (updatedProfile, index) => {
    // Logic to save the updated profile
    const updatedProfiles = profiles.map((profile, i) => 
      i === index ? updatedProfile : profile
    );
    setProfiles(updatedProfiles);
    setEditProfileIndex(null); // Reset the index to stop editing
  };
  return (
    <div className="page">
      <div className="nav">
            <Navbar />
        </div>
      <div className="container">
        <h2 id="title">Account Settings</h2>
          <div className="login-info">
            <div className="account-header">
              <h3>Login Information</h3>
              <button onClick={editLogin ? saveLoginClick : editLoginClick}>
              {editLogin ? 'Save' : 'Edit'}</button>
            </div>
            <div className="login-field">
              <table>
                <tr>
                  <td><p>Email:</p></td>
                  <td><p>{!editLogin ? (loginInfo.username) : (
                    <input
                    type="email"
                    name="username"
                    defaultValue={loginInfo.username}
                    placeholder="Username"
                    required
                  />
                  )}</p></td>
                </tr>
                <tr>
                  <td><p>Password:</p></td>
                  <td><p>{!editLogin ? ('*'.repeat(8)) : (
                    <input
                    type="password"
                    name="password"
                    defaultValue={loginInfo.password}
                    placeholder="Password"
                    required
                  />
                  )}</p></td>
                </tr>
              </table>
            </div>
          </div>
          <div className="account-header">
        <h3>Profiles</h3>
        <button onClick={createProfileClick}>Create New Profile</button>
        </div>
        {createProfile && 
          <Profile 
          profile={null}
          saveProfile={(updatedProfile) => saveProfile(updatedProfile, editProfileIndex)}
          />
        }
      
      <div className="profile-list">
        {profiles.map((profile, index) => (
          <div key={index}>
            {editProfileIndex === index ? (
              // Render the ProfileEditForm if the profile is being edited
              <Profile 
                profile={profile} 
                saveProfile={(updatedProfile) => saveProfile(updatedProfile, index)} 
              />
            ) : (
              // Display the profile information
              <div className="profile-block">
                <div className="profile-name">
                  <p>{profile.name}</p>
                  <button onClick={() => editProfileClick(index)}>Edit</button>
                </div>
                <div className="profile-address">
                  <p>{profile.address1}</p>
                  <p>{profile.address2}</p>
                  <p>{profile.city}, {profile.state} {profile.zipcode}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Account;
