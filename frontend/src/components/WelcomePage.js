import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/WelcomePage.module.css'; // Import the CSS module
import logo from '../assets/images/logo.png';
import pattern1 from '../assets/images/pattern1.png';
import pattern2 from '../assets/images/pattern2.png';

function WelcomePage() {
  const navigate = useNavigate();

  const navigateToLogin = () => {
      navigate('/login');
  };

  return (
      <div className={styles.WPWelcomeContainer}>
          <div className={styles.WPBg}></div>
          <div className={styles.WPBox}>
              <div className={styles.WPLogo}>
                  <img src={logo} alt="logo" />
              </div>
              <div className={styles.WPContent}>
                  <div className={styles.WPHead}>
                      <h2 className={styles.WPWelcome}>Welcome To</h2>
                      <h2 className={styles.WPName}>PharmaAdvisor</h2>
                  </div>
                  <p>Make smarter medication choices with Comprehensive Analysis from Pharma Advisor</p>
              </div>
              <button onClick={navigateToLogin}>Signup / Login</button>
              <div className={styles.WPATPattern}>
                  <div className={styles.WPFirst}>
                      <img src={pattern1} alt="pattern" />
                  </div>
                  <div className={styles.WPSecond}>
                      <img src={pattern2} alt="pattern" />
                  </div>
              </div>
          </div>
      </div>
  );
}

export default WelcomePage;