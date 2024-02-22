import React, { useState } from 'react';
import '../styles/Account.css'; // Ensure you have the styles for the form
import data from '../data/site.json';

const Profile = ({ profile, saveProfile }) => {
  const [editedProfile, setEditedProfile] = useState(profile);
  
  const saveProfileClick = (e) => {
    console.log(e)
    // e.preventDefault();
    console.log('Profile data submitted:', editedProfile);
    saveProfile(editedProfile)
  };

  return (
    <form className="profile-form" onSubmit={saveProfileClick}>
    <div className="section" id="clientInfo">
        <div className="profile-name">
            <h3>Client Information</h3>
            <button type="submit">Save Profile</button>
        </div>
        <input
            type="text"
            name="name"
            id="name"
            defaultValue={!profile ? '': profile.name}
            placeholder="Full Name*"
            maxLength={50}
            required
        />
    </div>
    <div className="section" id="address">
        <h3>Address</h3>
        <input
            type="text"
            name="address1"
            defaultValue={!profile ? '': profile.address1}
            placeholder="Address 1*"
            maxLength={100}
            required
        />
        <input
            type="text"
            name="address2"
            defaultValue={!profile ? '': profile.address2}
            placeholder="Address 2"
            maxLength={100}
        />
        <div className="inline-fields">
            <input
                type="text"
                name="city"
                defaultValue={!profile ? '': profile.city}
                placeholder="City*"
                maxLength={100}
                required
            />
            <select 
                name="state"
                defaultValue={!profile ? '': profile.state}
                required
                >
                <option defaultValue="">State</option>
                {data.states.map(state => (
                    <option key={state} value={state}>{state}</option>
                ))}
            </select>
            <input
                type="number"
                name="zipcode"
                defaultValue={!profile ? '': profile.zipcode}
                pattern="\d*"
                placeholder="Zipcode*"
                maxLength={9}
                minLength={5}
                required
            />
        </div>
    </div>
    </form>
  );
};

export default Profile;
