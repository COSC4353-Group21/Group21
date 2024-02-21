import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        // Authentication logic goes here
        navigate('/profile');
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email" // Set the placeholder here
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Password" // And here
                        required
                    />
                    <p className="register-link">Don't have an account? <Link to="/register">Create an account</Link>
                    </p>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
