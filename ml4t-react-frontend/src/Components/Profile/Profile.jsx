
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dashboard } from '../Dashboard/Dashboard';

export const Profile = () => {
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userRole, setUserRole] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate('/');
      return;
    };
    setUserId(JSON.parse(loggedInUser).id);
    setFirstName(JSON.parse(loggedInUser).firstName);
    setLastName(JSON.parse(loggedInUser).lastName);
    setEmail(JSON.parse(loggedInUser).email);
    setUserRole(JSON.parse(loggedInUser).userRole);
  }, [navigate]);
    
    
    const handleSave = async () => {
      try {
        const updatedUser = { firstName, lastName, email, password };

        await axios.put(`http://localhost:8080/ml4t/user/update/${userId}`, updatedUser, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        setError('');
        setEditMode(false);
        alert('Profile updated successfully');
        
      } catch (error) {
        console.error('Error updating profile:', error);
        if (error.response && error.response.status === 409) {
          setError('Email is already taken. Please try another one.');
          
        } else {
          setError('Failed to update profile. Please try again.');
          
        }
        

      }
    };

  return (
    <div>

      <h1>User Profile</h1>
      <div>
        
        
        {editMode ? (<div>
          <label>First Name: </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>Last Name: </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          </div>
        ) : (
          <div>
          <label>First Name: </label>
          <span>{firstName}</span>
          <label>Last Name: </label>
          <span>{lastName}</span>
          <label>Email: </label>
          <span>{email}</span>
          <label>Password: </label>
          <span>{'********'}</span>
          <label>User Role: </label>
          <span>{userRole}</span>
          </div>
        )}
        {editMode && (
          <button onClick={() => setEditMode(false)}>Back</button>
        )}
        {editMode && (
          <button onClick={() => handleSave()}>Save</button>
        )}
        {!editMode && (
        <button onClick={() => setEditMode(true)}>Edit Profile</button>
      )}
      
      </div>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
