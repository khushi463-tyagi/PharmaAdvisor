import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/DrugInteraction.module.css';
import dd from '../assets/images/dd.png';

const DrugInteraction = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const [medicine1, setMedicine1] = useState('');
  const [medicine2, setMedicine2] = useState('');
  const [interaction, setInteraction] = useState(null);
  const [explanation, setExplanation] = useState('');
  const [hasChecked, setHasChecked] = useState(false); // To track if the check interaction button has been clicked

  const handleCheck = async () => {
    try {
      const response = await axios.post(`${apiBaseUrl}/drug-interaction`, {
        medicine1,
        medicine2
      });
      const { interaction, explanation } = response.data;

      setInteraction(interaction);
      setExplanation(explanation);
      setHasChecked(true); 
    } catch (error) {
      console.error('Error fetching interaction data:', error);
      setInteraction('Error checking interaction.');
      setExplanation('');
      setHasChecked(true); 
    }
  };

  const handleReset = () => {
    setMedicine1('');
    setMedicine2('');
    setInteraction(null); // Clear interaction result
    setExplanation(''); 
    setHasChecked(false); 
  };

  const handleMedicine1Change = (e) => {
    setMedicine1(e.target.value);
    setInteraction(null);
    setExplanation('');
    setHasChecked(false);
  };

  const handleMedicine2Change = (e) => {
    setMedicine2(e.target.value);
    setInteraction(null);
    setExplanation('');
    setHasChecked(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.Checker}>
        <div className={styles.header}>
          <img src={dd} alt="Medicine Image" className={styles.image} />
          <h1 className={styles.title}>Medicine Interaction Checker</h1>
        </div>
        <input
          type="text"
          value={medicine1}
          onChange={handleMedicine1Change}
          placeholder="Enter first medicine name"
          className={styles.input}
        />
        <input
          type="text"
          value={medicine2}
          onChange={handleMedicine2Change}
          placeholder="Enter second medicine name"
          className={styles.input}
        />
        <button className={styles.button} onClick={handleCheck}>Check Interaction</button>
        <button className={styles.button} onClick={handleReset}>Reset</button>

        {hasChecked && interaction && (
          <div className={styles.result}>
            <p><strong>Interaction between {medicine1} and {medicine2}:</strong> {interaction}</p>
            {explanation && <p><strong>Explanation:</strong> {explanation}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default DrugInteraction;
