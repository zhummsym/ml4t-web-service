import React, { useState, useEffect } from "react";
import "./LoginSignup.css";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";
import validator from "validator";
import PasswordChecklist from "react-password-checklist";
import { API_BASE_URL } from "../../config";

export const LoginSignup = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const actionParam = params.get("action");
  const [action, setAction] = useState(
    actionParam === "login" ? "Login" : "Sign Up"
  );
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      navigate("/portfolio");
    }
  }, [navigate]);

  const handleSubmit = async () => {
    setMessage("");
    setError("");
    if (action === "Sign Up") {
      if (!firstName || !lastName || !email || !password) {
        setError("All fields are required for sign up.");

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
      handleRegister();
    } else {
      if (!email || !password) {
        setError("Email and Password are required for login.");

        return;
      }
      handleLogin();
    }
  };
  const handleRegister = async () => {
    const userData = { firstName, lastName, email, password };
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/register`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle success (e.g., clear form, show success message)
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setMessage("Successfully registered!");
    } catch (error) {
      setError(error.response ? error.response.data : error.message);
    }
  };
  const handleLogin = async () => {
    const user = { email, password };
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, user);

      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));

      navigate("/portfolio");
    } catch (error) {
      setError(error.response ? error.response.data : error.message);

      navigate("/login-signup");
      setAction("Login");
    }
  };
  const handleBack = () => {
    navigate("/home");
  };
  const handleSwitch = async () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setMessage("");
    setError("");
    setMessage("");
    if (action === "Login") {
      setAction("Sign Up");
    } else {
      setAction("Login");
    }
  };
  return (
    <div className="container">
      <button className="btn btn-link" onClick={handleBack}>
        Back
      </button>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
        <div>
          <div className="inputs">
            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="input">
                <img src={user_icon} alt="" />
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            )}

            <div className="input">
              <img src={email_icon} alt="" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              {password && action === "Sign Up" ? (
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
            </div>
          </div>
        </div>
        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={() => {
              action === "Login" ? handleSwitch() : handleSubmit();
            }}
          >
            Sign up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={() => {
              action === "Sign Up" ? handleSwitch() : handleSubmit();
            }}
          >
            Login
          </div>
        </div>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};
