import React, { useEffect, useState } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      try {
        const userDataString = localStorage.getItem('userData');

        if (userDataString && userDataString !== "undefined") {
          const parsedUserData = JSON.parse(userDataString);

          if (parsedUserData && typeof parsedUserData === 'object') {
            setUserData(parsedUserData);
          } else {
            throw new Error('Invalid user data format');
          }
        } else {
          console.log('User data not found in localStorage');
          setError('User data not found');
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setError('Error parsing user data');
      }
    };

    if (typeof localStorage !== 'undefined') {
      fetchData();
    } else {
      setError('localStorage is not available');
    }
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!userData) {
    return <div className="loading-message">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, {userData.user_firstname}!</h1>
        <p className="dashboard-subtitle">Your dashboard</p>
      </div>
      <div className="dashboard-content">
        <div className="user-info">
          <h2 className="user-info-title">User Information</h2>
          <ul>
            <li>
              <span className="user-info-label">First Name:</span>
              <span className="user-info-value">{userData.user_firstname || 'N/A'}</span>
            </li>
            <li>
              <span className="user-info-label">Last Name:</span>
              <span className="user-info-value">{userData.user_lastname || 'N/A'}</span>
            </li>
            <li>
              <span className="user-info-label">Email:</span>
              <span className="user-info-value">{userData.user_email || 'N/A'}</span>
            </li>
            <li>
              <span className="user-info-label">Phone:</span>
              <span className="user-info-value">{userData.user_phone || 'N/A'}</span>
            </li>
            <li>
              <span className="user-info-label">City:</span>
              <span className="user-info-value">{userData.user_city || 'N/A'}</span>
            </li>
            <li>
              <span className="user-info-label">Zipcode:</span>
              <span className="user-info-value">{userData.user_zipcode || 'N/A'}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
