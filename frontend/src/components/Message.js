import React from 'react';
import styles from '../styles/Message.module.css';

const Message = ({ type, text }) => {
  const messageClass = type === 'bot' ? styles.botMessage : styles.userMessage;

  return (
    <div className={`${styles.message} ${messageClass}`}>
      {text}
    </div>
  );
};

export default Message;
