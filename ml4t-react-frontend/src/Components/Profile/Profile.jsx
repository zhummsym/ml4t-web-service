import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import PasswordChecklist from "react-password-checklist";
import { API_BASE_URL } from "../../config";

export const Profile = () => {
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (!loggedInUser) {
      navigate("/");
      return;
    }
    setUserId(JSON.parse(loggedInUser).id);
    setFirstName(JSON.parse(loggedInUser).firstName);
    setLastName(JSON.parse(loggedInUser).lastName);
    setEmail(JSON.parse(loggedInUser).email);
    setUserRole(JSON.parse(loggedInUser).userRole);
  }, [navigate]);

  const handleSave = async () => {
    setError("");
    setMessage("");
    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required.");
      return;
    }
    if (!validator.isEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (!isPasswordValid) {
      setError("Please enter a valid password.");
      return;
    }
    try {
      const updatedUser = { firstName, lastName, email, password };

      await axios.put(`${API_BASE_URL}/user/update/${userId}`, updatedUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setError("");
      setMessage("Profile updated successfully");
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>

      {editMode ? (
        <ul className="list-group">
          <li className="list-group-item">
            First Name:{" "}
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </li>

          <li className="list-group-item">
            Last Name:{" "}
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </li>

          <li className="list-group-item">
            Email:{" "}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </li>

          <li className="list-group-item">
            Password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password ? (
              <PasswordChecklist
                rules={["minLength", "specialChar", "number"]}
                minLength={6}
                value={password}
                onChange={(isValid) => {
                  setIsPasswordValid(isValid);
                }}
              />
            ) : (
              <div></div>
            )}
          </li>
        </ul>
      ) : (
        <ul className="list-group">
          <li className="list-group-item">First Name: {firstName}</li>

          <li className="list-group-item">Last Name: {lastName}</li>

          <li className="list-group-item">Email: {email}</li>

          <li className="list-group-item">Password: {"********"}</li>

          <li className="list-group-item">User Role: {userRole}</li>
        </ul>
      )}
      {editMode && (
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setEditMode(false);
            setError("");
            setMessage("");
          }}
        >
          Back
        </button>
      )}
      {editMode && (
        <button
          type="button"
          className="btn btn-success"
          onClick={() => handleSave()}
        >
          Save
        </button>
      )}
      {!editMode && (
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setEditMode(true)}
        >
          Edit Profile
        </button>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
    </div>
  );
};
