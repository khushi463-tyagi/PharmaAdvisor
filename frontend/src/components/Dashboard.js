import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import styles from '../styles/Dashboard.module.css'; 

// Import images
import alternativesLogo from '../assets/images/alternativesLogo.jpeg'; 
import chatbotLogo from '../assets/images/medibot.png'; 
import consultationLogo from '../assets/images/consultationLogo.jpeg'; 
import interactionsLogo from '../assets/images/dd.png'; 
import sideEffectsLogo from '../assets/images/sideEffects.png'; 

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const user = queryParams.get('username');
        const confettiShown = queryParams.get('confettiShown');
        const storedUsername = localStorage.getItem('username');

        if (user) {
            setUsername(user);
            localStorage.setItem('username', user);
            localStorage.setItem('isSubscriber', true);

            if (confettiShown === 'false') {
                setIsRunning(true);
                localStorage.setItem('confettiShown', 'true');
                const timer = setTimeout(() => {
                    setIsRunning(false);
                }, 4000);

                return () => clearTimeout(timer);
            }
        } else if (storedUsername) {
            setUsername(storedUsername);
        } else {
            setUsername('Guest');
        }
    }, []);

    return (
        <div className={styles.dashboard}>
            {isRunning && <Confetti run={isRunning} />}
            <div className={styles.greeting}>
                <h1>Hello {username}!</h1>
                <p>Welcome back to PharmaAdvisor.</p>
            </div>

            <div className={styles['cards-container']}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <img src={alternativesLogo} alt="Alternatives Finder" className={styles.cardLogo} />
                        <h2>Alternatives Finder</h2>
                    </div>
                    <p>Find alternatives to your medicine with fewer side effects.</p>
                    <Link to="/alternatives" className={styles['card-button']}>Go</Link>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <img src={chatbotLogo} alt="Chatbot" className={styles.cardLogo} />
                        <h2>Medibot</h2>
                    </div>
                    <p>Check your symptoms and get possible disease predictions.</p>
                    <Link to="/medibot" className={styles['card-button']}>Go</Link>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <img src={consultationLogo} alt="Doctor Consultation" className={styles.cardLogo} />
                        <h2>Doctor Consultation</h2>
                    </div>
                    <p>Find the right doctor for your specialization needs.</p>
                    <Link to="/consultation" className={styles['card-button']}>Go</Link>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <img src={interactionsLogo} alt="Drug Interaction Checker" className={styles.cardLogo} />
                        <h2>Medicine Interaction Checker</h2>
                    </div>
                    <p>Check interactions between two different medicines.</p>
                    <Link to="/interactions" className={styles['card-button']}>Go</Link>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <img src={sideEffectsLogo} alt="Side Effects Predictor" className={styles.cardLogo} />
                        <h2>Side Effects Predictor</h2>
                    </div>
                    <p>Predict possible side effects of your prescribed medicine.</p>
                    <Link to="/side-effects" className={styles['card-button']}>Go</Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;