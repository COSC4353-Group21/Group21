import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { client } from "../services/axiosClient";

import "../styles/Register.css"; // Make sure to create and import a corresponding CSS file
import Navbar from "./Navbar";
import Footer from "./Footer";

const Register = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    minLength: false,
    oneUpperCase: false,
    oneLowerCase: false,
  });

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Password validation
  const allRequirementsMet =
    passwordValidations.minLength &&
    passwordValidations.oneUpperCase &&
    passwordValidations.oneLowerCase;
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
    setPasswordValidations({
      minLength: value.length >= 8, //min char length
      oneUpperCase: /[A-Z]/.test(value), //at least one uppercase
      oneLowerCase: /[a-z]/.test(value), //at least one lowercase
      oneNumber: /[\d]/.test(value), //at least one number
    });
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  //ensure the password meets all requirements and register the user
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!allRequirementsMet) {
      alert("Password does not meet all requirements!");
      return;
    }

    await client
      .post("/register", { username, password, confirmpassword })
      .then(async (response) => {
        await client
          .post("/login", { username, password })
          .then((response) => {
            localStorage.clear();
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("username", username);
          })
          .catch((error) => {
            if (error?.response?.status === 400) {
              alert(error.response.data.msg);
              navigate("/login");
            }
            return;
          });
        navigate("/home");
      })
      .catch((error) => {
        if (error?.response?.status === 400) {
          alert(error.response.data.msg);
        }
        return;
      });
  };

  if (token) {
    navigate("/profile");
  }

  return (
    <div className="register-page">
      <Navbar />
      <div className="register-container">
        <h2>Create Account</h2>
        <form onSubmit={handleRegisterSubmit}>
          <div className="register-section">
            <input
              type="text"
              id="user"
              name="user"
              onChange={handleUsernameChange}
              placeholder="Username*"
              required
            />
            <div className="input-container">
              <input
                type="password"
                id="password"
                name="password"
                onChange={handlePasswordChange}
                placeholder="Password*"
                required
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              {passwordFocused && !allRequirementsMet && (
                <div
                  className={`password-requirements ${
                    passwordFocused
                      ? allRequirementsMet
                        ? "fadeOut"
                        : "fadeIn"
                      : "fadeOut"
                  }`}
                >
                  <ul>
                    <li
                      className={
                        passwordValidations.minLength ? "valid" : "invalid"
                      }
                    >
                      {passwordValidations.minLength ? "✔" : "✘"} At least 8
                      characters
                    </li>
                    <li
                      className={
                        passwordValidations.oneUpperCase ? "valid" : "invalid"
                      }
                    >
                      {passwordValidations.oneUpperCase ? "✔" : "✘"} One
                      uppercase letter
                    </li>
                    <li
                      className={
                        passwordValidations.oneLowerCase ? "valid" : "invalid"
                      }
                    >
                      {passwordValidations.oneLowerCase ? "✔" : "✘"} One
                      lowercase letter
                    </li>
                    <li
                      className={
                        passwordValidations.oneNumber ? "valid" : "invalid"
                      }
                    >
                      {passwordValidations.oneNumber ? "✔" : "✘"} One number
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password*"
              required
            />

            <p className="register-link">
              By signing up, you agree to our
              <br />
              <Link to="https://youtu.be/dQw4w9WgXcQ?si=TZ0DELUisIeT8mZc">
                Terms of Service & Privacy Policy
              </Link>
            </p>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
