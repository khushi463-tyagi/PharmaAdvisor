import React, { useState } from 'react';
import styles from '../styles/SideEffectsPredictor.module.css'; 
import logo from '../assets/images/sideEffects.png';

const SideEffectsPredictor = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [medicine, setMedicine] = useState('');
    const [sideEffects, setSideEffects] = useState([]);
    const [error, setError] = useState('');

    const handlePredict = () => {
        fetch(`${apiBaseUrl}/predict-side-effects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ medicine }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
                setSideEffects([]);
            } else {
                setSideEffects(data.top_side_effects);
                setError('');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            setError('An error occurred while predicting side effects.');
        });
    };

    const handleReset = () => {
        setMedicine('');
        setSideEffects([]);
        setError('');
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <img src={logo} alt="Logo" className={styles.headerImage} />
                    <h1 className={styles.headerTitle}>Medicine Side Effects Predictor</h1>
                </div>
                <input 
                    type="text" 
                    id="medicine-input" 
                    placeholder="Enter Medicine Name" 
                    value={medicine} 
                    onChange={(e) => setMedicine(e.target.value)} 
                    className={styles.inputField}
                />
                <div className={styles.buttonGroup}>
                    <button onClick={handlePredict} className={styles.button}>Predict Side Effects</button>
                    <button onClick={handleReset} className={styles.button}>Reset</button>
                </div>
                <div className={styles.sideEffectsBox} style={{ display: sideEffects.length ? 'block' : 'none' }}>
                    <h2 className={styles.sideEffectsHeading}>Common Side Effects</h2>
                    <ul className={styles.sideEffectsList}>
                        {sideEffects.map((effect, index) => (
                            <li key={index} className={styles.sideEffectsItem}>{effect}</li>
                        ))}
                    </ul>
                </div>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </div>
    );
};

export default SideEffectsPredictor;
