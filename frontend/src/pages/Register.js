import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; // Make sure to create and import a corresponding CSS file

const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        address1: '',
        address2: '',
        city: '',
        state: '', 
        zipcode: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would handle the registration logic
        console.log(formData);
        navigate('/login'); // Redirect the user to a different route after registration
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="section" id="clientInfo">
                        <h3>Client Information</h3>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Full Name*"
                            required
                        />
                    </div>

                    <div className="section" id="loginInfo">
                        <h3>Login Information</h3>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Email*"
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Password*"
                            required
                        />
                    </div>

                    <div className="section" id="address">
                        <h3>Address</h3>
                        <input
                            type="text"
                            name="address1"
                            value={formData.address1}
                            onChange={handleInputChange}
                            placeholder="Address 1*"
                            required
                        />
                        <input
                            type="text"
                            name="address2"
                            value={formData.address2}
                            onChange={handleInputChange}
                            placeholder="Address 2"
                        />
                        <div className="inline-fields">
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                placeholder="City*"
                                required
                            />
                            <select 
                                name="state" 
                                value={formData.state} 
                                onChange={handleInputChange} 
                                required>
                                <option value="">State</option>
                                {states.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                name="zipcode"
                                value={formData.zipcode}
                                onChange={handleInputChange}
                                placeholder="Zipcode*"
                                required
                            />
                        </div>
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
