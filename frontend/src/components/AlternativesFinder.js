import React, { useState, useEffect } from 'react';
import styles from '../styles/AlternativesFinder.module.css';
import logo from '../assets/images/alternativesLogo.jpeg'; 
const AlternativesFinder = () => {
    const [medicineName, setMedicineName] = useState('');
    const [sideEffect, setSideEffect] = useState('');
    const [alternatives, setAlternatives] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCheckAnother, setShowCheckAnother] = useState(false);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

    // Reset form if either input field changes after alternatives are generated
    useEffect(() => {
        if (alternatives.length > 0) {
            return;
        }
        setAlternatives([]);
        setShowCheckAnother(false);
    }, [medicineName, sideEffect]);

    const handleGenerateAlternatives = async () => {
        if (!medicineName) {
            setMessage('Please enter a medicine name.');
            return;
        }
        if (!sideEffect) {
            setMessage('Please enter a side effect.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`${apiBaseUrl}/get-alternatives`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ medicine_name: medicineName, side_effect: sideEffect })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.alternatives && Array.isArray(data.alternatives)) {
                setAlternatives(data.alternatives);
                setMessage('');
                setShowCheckAnother(true);
            } else {
                setAlternatives([]);
                setMessage('No alternatives found.');
                setShowCheckAnother(false);
            }
        } catch (error) {
            console.error('Error fetching alternatives:', error);
            setAlternatives([]);
            setMessage('An error occurred while fetching alternatives.');
        }
        setLoading(false);
    };

    const handleCheckAnotherMedicine = () => {
        setMedicineName('');
        setSideEffect('');
        setAlternatives([]);
        setMessage('');
        setShowCheckAnother(false);
    };

    return (
        <div className={styles.container}>
        <div className={styles.alternativesFinder}>
            <div className={styles.header}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <h2 className={styles.title}>Alternative Finder</h2>
            </div>
            <div className={styles.medicineInput}>
                <input
                    type="text"
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    placeholder="Enter medicine name"
                    className={styles.inputField}
                />
                <input
                    type="text"
                    value={sideEffect}
                    onChange={(e) => setSideEffect(e.target.value)}
                    placeholder="Enter side effect"
                    className={styles.inputField}
                />
                <button onClick={handleGenerateAlternatives} className={styles.generateButton}>Find Alternatives</button>
            </div>
            {message && <div className={message.includes('No alternatives') ? styles.message : styles.emptyInputMessage}>{message}</div>}
            {loading && <div>Loading...</div>}
            {alternatives.length > 0 && (
                <div className={styles.alternativesList}>
                    <h2 className={styles.subtitle}>Alternatives for {medicineName}</h2>
                    <ul>
                        {alternatives.map((alt, index) => (
                            <li key={index} className={styles.medicineAlternative}>
                                <h4>{alt}</h4>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {showCheckAnother && (
                <button onClick={handleCheckAnotherMedicine} className={styles.generateButton}>Check Another Medicine</button>
            )}
        </div>
        </div>
    );
};

export default AlternativesFinder;