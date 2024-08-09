import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import mockUserData from './mockData'; 

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching data
    const fetchData = () => {
      // Use mock data
      setUserData(mockUserData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>No user data available. Please log in again.</p>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome, {userData.user_firstname} {userData.user_lastname}!</p>
        </div>
        <div className="user-info">
          <h2 className="user-info-title">User Information</h2>
          <p className="user-info-label">Email:</p>
          <p className="user-info-value">{userData.user_email}</p>
          <p className="user-info-label">Phone:</p>
          <p className="user-info-value">{userData.user_phone}</p>
          <p className="user-info-label">City:</p>
          <p className="user-info-value">{userData.user_city}</p>
          <p className="user-info-label">Zipcode:</p>
          <p className="user-info-value">{userData.user_zipcode}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
