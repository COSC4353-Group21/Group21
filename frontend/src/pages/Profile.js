import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clientWithAuth } from "../services/axiosClient";

import "../styles/Profile.css"; // Ensure you have the styles for the form
import data from "../data/states.json";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Profile = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [fullname, setFullname] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [profile, setProfile] = useState({
    fullname: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const [editProfile, setEditProfile] = useState(false);
  const handleEditProfileClick = () => {
    setEditProfile(true);
  };

  const handleChangeName = (e) => {
    setFullname(e.target.value);
  };

  const handleChangeAddress1 = (e) => {
    setAddress1(e.target.value);
  };

  const handleChangeAddress2 = (e) => {
    setAddress2(e.target.value);
  };

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleChangeState = (e) => {
    setState(e.target.value);
  };

  const handleChangeZipcode = (e) => {
    setZipcode(e.target.value);
  };
  //call the api on submit to create a new profile
  const handleProfileSubmit = async (e) => {
    console.log("submitting");
    e.preventDefault();
    const token = localStorage.getItem("token");

    await clientWithAuth(token)
      .post("/profile", {
        username,
        fullname,
        address1,
        address2,
        city,
        state,
        zipcode,
      })
      .then((response) => {
        setEditProfile(false); // Turn off edit mode on successful save
        setProfile({
          fullname,
          address1,
          address2,
          city,
          state,
          zipcode,
        });
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.msg);
      });
  };

  //check if any changes were made compared to the original profile
  const isChanged = (type) => {
    switch (type) {
      case "login":
        return false;
      case "profile":
        return (
          fullname !== profile.fullname ||
          address1 !== profile.address1 ||
          address2 !== profile.address2 ||
          city !== profile.city ||
          state !== profile.state ||
          zipcode !== profile.zipcode
        );
      default:
        return false;
    }
  };

  const renderProfileInfo = () => {
    //if we are in edit mode, show the form
    if (editProfile) {
      return (
        <form
          className="profile-section"
          id="profile-info"
          onSubmit={handleProfileSubmit}
        >
          <div className="profile-section-name">
            <h3>Profile Information</h3>
            {isChanged("profile") ? (
              <button type="submit">Save</button>
            ) : (
              <button type="button" onClick={() => setEditProfile(false)}>
                Cancel
              </button>
            )}
          </div>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Full Name*"
            onChange={handleChangeName}
            value={fullname || ""}
            pattern="^[A-Za-z\s]{1,50}$"
            title="Full name must be up to 50 letters long and contain only letters and spaces"
            required
          />
          <div className="profile-subsection" id="address">
            <h3>Address</h3>
            <input
              type="text"
              name="address1"
              placeholder="Address 1*"
              onChange={handleChangeAddress1}
              value={address1 || ""}
              maxLength={100}
              required
            />
            <input
              type="text"
              name="address2"
              placeholder="Address 2"
              onChange={handleChangeAddress2}
              value={address2 || ""}
              maxLength={100}
            />
            <div className="inline-fields">
              <input
                type="text"
                name="city"
                placeholder="City*"
                onChange={handleChangeCity}
                value={city || ""}
                maxLength={100}
                required
              />
              <select
                name="state"
                onChange={handleChangeState}
                value={state || ""}
                required
              >
                <option value="">State</option>
                {data.states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="zipcode"
                pattern="^\d{5}(\d{4})?$"
                title="Zipcode must be 5 or 9 digits."
                placeholder="Zipcode*"
                onChange={handleChangeZipcode}
                value={zipcode || ""}
                required
              />
            </div>
          </div>
        </form>
      );
    } else {
      // Not in edit mode, show "Edit" button
      return (
        <div className="profile-section" id="profile-info">
          <div className="profile-section-name">
            <h3>Profile Information</h3>
            <button type="button" onClick={handleEditProfileClick}>
              Edit
            </button>
          </div>
          <div className="profile-block">
            <div className="profile-name">
              <p>{profile.fullname}</p>
            </div>
            <div className="profile-address">
              <p>{profile.address1}</p>
              <p>{profile.address2}</p>
              <p>
                {profile.city}, {profile.state} {profile.zipcode}
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      //check if the user is logged in
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await clientWithAuth(token).get(
          `/profile/${username}`
        );
        //if theres no fullname, then we need to edit the profile
        if (!response.data.fullname) {
          setEditProfile(true);
          return;
        }
        //set the profoile to the existing data
        setProfile(response.data);
        setFullname(response.data.fullname || "");
        setAddress1(response.data.address1 || "");
        setAddress2(response.data.address2 || "");
        setCity(response.data.city || "");
        setState(response.data.state || "");
        setZipcode(response.data.zipcode || "");
      } catch (error) {
        console.error("Fetching profile error:", error);
      }
    };

    fetchProfile();
  }, [username, navigate]);

  return (
    <div className="profile-page">
      <div className="nav">
        <Navbar />
      </div>
      <div className="container">
        <h2 id="title">Profile Settings</h2>
        <form className="profile-section" id="login-info">
          <div className="profile-section-name">
            <h3>Login Information</h3>
          </div>
          <div className="login-field">
            <table>
              <tr>
                <td>
                  <p>Username:</p>
                </td>
                <td>
                  <p>{username}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p>Password:</p>
                </td>
                <td>
                  <p>{"*".repeat(10)}</p>
                </td>
              </tr>
            </table>
          </div>
        </form>
        {renderProfileInfo()}
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
