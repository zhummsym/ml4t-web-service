import React, { useState, useEffect } from 'react'
import './LoginSignup.css'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import user_icon from '../Assets/person.png'
import email_icon from '../Assets/email.png'
import password_icon from '../Assets/password.png'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const LoginSignup = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const actionParam = params.get('action');
    const [action, setAction] = useState(actionParam === 'login' ? 'Login' : 'Sign Up');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState();
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
      const loggedInUser = localStorage.getItem("user");
      if (loggedInUser) {
        navigate('/dashboard');
      }
    }, [navigate]);

    const handleSubmit = async () => {
      
      setError('');
        if (action === 'Sign Up') {
          if (!firstName || !lastName || !email || !password) {
            setError('All fields are required for Sign Up.');
            return;
          }
            handleRegister();
        } else {

    if (!email || !password) {
      setError('Email and Password are required for Login.');
      return;
    }
            handleLogin();
      }};
const handleRegister = async() => {
    const userData = { firstName, lastName, email, password };
    console.log(userData);
    try {
      const response = await axios.post(`http://localhost:8080/ml4t/user/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('User created successfully:', response.data);
      // Handle success (e.g., clear form, show success message)
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      navigate('/login-signup');
      setAction('Login');
    } catch (error) {
      console.error('Error creating user:', error.response ? error.response.data : error.message);
      // Handle error (e.g., show error message)
      
    }
}
const handleLogin = async() => {
  const user = { email, password };
    try {
      
      const response = await axios.post(`http://localhost:8080/ml4t/user/login`, user);

      console.log('User logged in successfully:', response.data);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      // Handle success (e.g., navigate to another page, show success message)
      navigate('/portfolio');
    } catch (error) {
      
      console.error('Error logging in:', error.response ? error.response.data : error.message);
      // Handle error (e.g., show error message)
      navigate('/login-signup');
      setAction('Login');
    }
}
  return (
    
   
      
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{action}</Card.Title>
        <Card.Text>
        <div className='inputs'>
            {action === "Login" ? ( 
            <div></div> 
            ): (
            <div className='input'>
                <img src={user_icon} alt="" />
                <input type="text" placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <input type="text" placeholder='Last Name'value={lastName} onChange={(e) => setLastName(e.target.value)}/>
            </div> 
        ) }
            
            <div className='input'>
                <img src={email_icon} alt="" />
                <input type="email" placeholder='Email Id' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className='input'>
                <img src={password_icon} alt="" />
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
        </div>
        </Card.Text>
        <Button variant={action === "Sign Up" ? "primary" : "secondary"} onClick={()=>{setAction("Sign Up"); handleSubmit();}}>Sign up</Button>
        <Button variant={action === "Login" ? "primary" : "secondary"} onClick={()=>{setAction("Login"); handleSubmit();}}>Login</Button>
      </Card.Body>
    </Card>

    
  );
};
