import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// import Logout from './components/Logout';
import '../styles/Navbar.css';
import logo from '../assets/images/logo.png'


const Navbar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isWelcomePage = location.pathname === '/welcome';

  if (isLoginPage || isWelcomePage) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Pharma Advisor Logo" />
        <p>PharmaAdvisor</p>
      </div>
      <ul className="nav-links">
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/feedback">Feedback</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/" className="logout-button">Logout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;