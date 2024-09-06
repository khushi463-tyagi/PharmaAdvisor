import React, { useState } from 'react';
import styles from '../styles/Medibot.module.css';
import Message from './Message.js';
import medibot from '../assets/images/medibot.png';

const Medibot = () => {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const [symptoms, setSymptoms] = useState([]);
  const [predictedDisease, setPredictedDisease] = useState('');
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Welcome! Please enter your symptoms.' }
  ]);
  const [step, setStep] = useState(1);  

  const handleUserInput = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    const userInput = document.getElementById('user-input').value.trim();

    if (userInput) {
      addMessageToChat('user', userInput);
      document.getElementById('user-input').value = '';

      if (predictedDisease) {
        if (userInput.toLowerCase() === 'yes') {
          getPrecaution();
        } else if (userInput.toLowerCase() === 'no') {
          addMessageToChat('bot', 'Okay, let me know if you need anything else.');
          resetChat();
        } else {
          addMessageToChat('bot', 'Please respond with "yes" or "no".');
        }
      } else {
        if (userInput.toLowerCase() === 'predict') {
          if (symptoms.length > 0) {
            predictDisease();
          } else {
            addMessageToChat('bot', 'Please enter at least one symptom before prediction.');
          }
        } else {
          setSymptoms([...symptoms, userInput]);
          addMessageToChat('bot', 'Symptom added. You can add more symptoms or type "predict" to proceed.');
        }
      }
    }
  };

  const addMessageToChat = (type, text) => {
    setMessages((prevMessages) => [...prevMessages, { type, text }]);
  };

  const predictDisease = () => {
    const symptomText = symptoms.join(', ');
  
    fetch(`${apiBaseUrl}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptoms: symptomText }),
    })
      .then((response) => response.json())
      .then((data) => {
        setPredictedDisease(data.diseases.join(', ')); 
        addMessageToChat('bot', `Possible Diseases: ${data.diseases.join(', ')}`);
        setTimeout(() => {
          addMessageToChat('bot', 'Would you like to know the precautions for these diseases? (yes/no)');
        }, 2000);
      });
  };
  
  const getPrecaution = () => {
    fetch(`${apiBaseUrl}/precautions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ diseases: predictedDisease.split(', ') }),  
    })
      .then((response) => response.json())
      .then((data) => {
        addMessageToChat('bot', `Precautions: ${data.precautions.join(', ')}`);
        resetChat();
      });
  };
  

  const resetChat = () => {
    setSymptoms([]);
    setPredictedDisease('');
  };

  return (
    <div className={styles.Chatbot}>
      <div className={styles.Container}>
        {step === 1 && (
          <div className={styles.Card}>
            <header className={styles.ChatbotHeader}>
              <h1 className={styles.MedibotH1}>MEDIBOT</h1>
            </header>
            <h2 className={styles.MedibotH2}>Welcome to your own Healthcare Chatbot</h2>
            <p className={styles.MedibotP}>How can I help you today?</p>
            <div className={styles.CardFooter}>
              <button className={styles.MedibotButton} onClick={() => setStep(2)}>START</button>
            </div>
          </div>
        )}
        {step === 2 && (
          <div className={styles.chatbot}>
            <div className={styles.header}>
              <img src={medibot} alt="Medibot Description" />
              <h1>MediBot</h1>
            </div>
            <div className={styles.chatWindow}>
              <div className={styles.chatOutput}>
                {messages.map((message, index) => (
                  <Message key={index} type={message.type} text={message.text} />
                ))}
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  id="user-input"
                  placeholder="Type your symptom..."
                  onKeyUp={handleUserInput}
                  className={styles.userInput}
                />
                <button id="send-btn" onClick={sendMessage} className={styles.sendBtn}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-paper-plane" viewBox="0 0 16 16">
                    <path d="M1 0l15 8-15 8V9l10.418-1L1 7V0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Medibot;
