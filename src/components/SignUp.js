// SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [formData, setFormData] = useState({
    user_firstname: '',
    user_email: '',
    user_password: '',
    user_phone: '',
    user_lastname: 'ni',
    user_city: 'Hyderabad',
    user_zipcode: '500072',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://syoft.dev/Api/user_registeration/',
        formData
      );

      if (response.status === 200) {
        console.log('Account created successfully!');
        // Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(response.data.user));
        navigate('/login', { replace: true });
      } else {
        console.error('Error creating account:', response.data);
      }
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="logo">
          <img src="https://media.licdn.com/dms/image/C560BAQEbAYjuSygMKg/company-logo_200_200/0/1660810911486/syoft_logo?e=2147483647&v=beta&t=PaHYD0byAA-_qxJWdDYgIUu9esIwlKKTzt7zlAQRXNc" alt="Logo" />
        </div>
        <h1 className="signup-title">Welcome to Our Community</h1>
        <p className="signup-subtitle">Fuse helps developers build organized and well-coded dashboards full of beautiful and rich modules. Join us and start building your application today.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="user_firstname" className="form-label">Full Name</label>
            <input
              type="text"
              id="user_firstname"
              name="user_firstname"
              value={formData.user_firstname}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="John Doe"
              autoComplete="name"
            />
          </div>
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
            <label htmlFor="user_phone" className="form-label">Phone Number</label>
            <input
              type="tel"
              id="user_phone"
              name="user_phone"
              value={formData.user_phone}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="+1 123 456 7890"
              autoComplete="tel"
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
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="signup-btn">Create Account</button>
          <p className="signup-link">Already have an account? <a href="/login">Sign In</a></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
