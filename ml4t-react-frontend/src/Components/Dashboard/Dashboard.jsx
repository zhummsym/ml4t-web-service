

import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Dashboard.css'
import NavDropdown from 'react-bootstrap/NavDropdown';

export const Dashboard = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (!loggedInUser) {
          navigate('/');
        }
      }, [navigate]);


      const handleLogout = () => {
        localStorage.removeItem("user");
        navigate('/');
      };

  return (
    <div className="d-flex">
      <Navbar expand="lg" className="flex-column bg-body-tertiary sidebar">
        <Container>
        
          <Nav className="flex-column">
          <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
            <Nav.Link as={Link} to="/portfolio">Portfolio</Nav.Link>
            <Nav.Link as={Link} to="/trade">Trade</Nav.Link>
            <Nav.Link as={Link} to="/forecast">Forecast</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            
          </Nav>
          
        </Container>
      </Navbar>
    
      <Container className="mt-3 main-content">
        <Outlet />
      </Container>

      
    </div>
  )
}
