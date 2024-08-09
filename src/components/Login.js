// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://syoft.dev/Api/userlogin', // Ensure this URL is correct
        formData
      );

      if (response.status === 200) {
        // Save token and user data to local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        
        // Navigate to the dashboard
        navigate('/dashboard', { replace: true });
      } else {
        console.error('Login failed:', response.data);
        alert('Login failed. Please check your credentials and try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo">
          <img src="https://media.licdn.com/dms/image/C560BAQEbAYjuSygMKg/company-logo_200_200/0/1660810911486/syoft_logo?e=2147483647&v=beta&t=PaHYD0byAA-_qxJWdDYgIUu9esIwlKKTzt7zlAQRXNc" alt="Logo" />
        </div>
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Sign in to your account to continue.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="user_email" className="form-label">Email Address</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="johndoe@example.com"
              autoComplete="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="user_password" className="form-label">Password</label>
            <input
              type="password"
              id="user_password"
              name="user_password"
              value={formData.user_password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="●●●●●●●●●●"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-btn">Sign In</button>
          <p className="login-link">
            Don't have an account? <a href="/sign-up">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
