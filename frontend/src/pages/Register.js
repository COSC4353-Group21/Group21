import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css'; // Make sure to create and import a corresponding CSS file

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
                    <div className="register-section">
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
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
