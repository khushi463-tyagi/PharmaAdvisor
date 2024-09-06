import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>© 2024 Pharma Advisor. All Rights Reserved.</p>
                <p className={styles.disclaimer}>
                    Disclaimer: The information provided by Pharma Advisor is for educational purposes only and should not be considered as medical advice. Please consult your doctor for any health concerns.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
