import React from 'react';
import styles from '../styles/ContactPage.module.css'; 

const ContactPage = () => {
    return (
        <section id="section-wrapper" className={styles.CPSectionWrapper}>
            <div className={styles.CPBoxWrapper}>
                <div className={styles.CPInfoWrap}>
                    <h2 className={styles.CPInfoTitle}>Contact Information</h2>
                    <h3 className={styles.CPInfoSubTitle}>Fill up the form and our Team will get back to you within 24 hours</h3>
                    <ul className={styles.CPInfoDetails}>
                        <li>
                            <i className="fas fa-phone-alt"></i>
                            <span>Phone:</span> 
                            <a href="tel:+91XXXXXXXX">+91XXXXXXXX</a>
                        </li>
                        <li>
                            <i className="fas fa-paper-plane"></i>
                            <span>Email:</span> 
                            <a 
                                href="mailto:pharmaadvisor77@gmail.com?subject=Query%20from%20PharmaAdvisor&body=Please%20provide%20details%20about%20your%20query."
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                Pharmaadvisor Mail
                            </a>
                        </li>
                        <li>
                            <i className="fas fa-globe"></i>
                            <span>Website:</span> 
                            <a 
                                href="https://pharmaadvisor.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                            >
                                pharmaadvisor.com
                            </a>
                        </li>
                    </ul>
                    <ul className={styles.CPSocialIcons}>
                        <li>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={styles.CPFormWrap}>
                    <form action="https://api.web3forms.com/submit" method="POST">
                        <h2 className={styles.CPFormTitle}>You can send any Query</h2>
                        <div className={styles.CPFormFields}>
                            <input type="hidden" name="access_key" value="9a6891ae-1130-482c-a254-222fb26bbe1f" />
                            <div className={styles.CPFormGroup}>
                                <input type="text" name="first_name" className={styles.CPFName} placeholder="First Name" />
                            </div>
                            <div className={styles.CPFormGroup}>
                                <input type="text" name="last_name" className={styles.CPLName} placeholder="Last Name" />
                            </div>
                            <div className={styles.CPFormGroup}>
                                <input type="email" name="email" className={styles.CPEmail} placeholder="Mail" />
                            </div>
                            <div className={styles.CPFormGroup}>
                                <input type="number" name="phone" className={styles.CPPhone} placeholder="Phone" />
                            </div>
                            <div className={styles.CPFormGroup}>
                                <textarea name="message" placeholder="Write your message"></textarea>
                            </div>
                        </div>
                        <input type="submit" value="Send Message" className={styles.CPSubmitButton} />
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ContactPage;