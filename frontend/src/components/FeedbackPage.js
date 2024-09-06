import React, { useState, useEffect } from 'react';
import styles from '../styles/FeedbackPage.module.css';

const FeedbackPage = () => {
  const [experience, setExperience] = useState('');
  const [navigation, setNavigation] = useState(50);
  const [likeMost, setLikeMost] = useState('');
  const [features, setFeatures] = useState('');
  const [recommendation, setRecommendation] = useState(50);
  const [additional, setAdditional] = useState('');

  useEffect(() => {
    setExperience('');
    setNavigation(50);
    setLikeMost('');
    setFeatures('');
    setRecommendation(50);
    setAdditional('');
  }, []);

  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.formContainer}>
        <h1 className={styles.heading}>Feedback Form</h1>
        <form
          id="feedbackForm"
          action="https://api.web3forms.com/submit"
          method="POST"
          className={styles.form}
        >
          <input
            type="hidden"
            name="access_key"
            value="9a6891ae-1130-482c-a254-222fb26bbe1f"
          />

          <label className={styles.label}>
            How would you rate your overall experience with our app?
          </label>
          <div className={styles.smileyRating}>
            <input
              type="radio"
              id="very_satisfied"
              name="experience"
              value="very_satisfied"
              checked={experience === 'very_satisfied'}
              onChange={(e) => setExperience(e.target.value)}
            />
            <label htmlFor="very_satisfied" title="Very Satisfied">
              😊
            </label>
            <input
              type="radio"
              id="satisfied"
              name="experience"
              value="satisfied"
              checked={experience === 'satisfied'}
              onChange={(e) => setExperience(e.target.value)}
            />
            <label htmlFor="satisfied" title="Satisfied">
              🙂
            </label>
            <input
              type="radio"
              id="neutral"
              name="experience"
              value="neutral"
              checked={experience === 'neutral'}
              onChange={(e) => setExperience(e.target.value)}
            />
            <label htmlFor="neutral" title="Neutral">
              😐
            </label>
            <input
              type="radio"
              id="dissatisfied"
              name="experience"
              value="dissatisfied"
              checked={experience === 'dissatisfied'}
              onChange={(e) => setExperience(e.target.value)}
            />
            <label htmlFor="dissatisfied" title="Dissatisfied">
              🙁
            </label>
            <input
              type="radio"
              id="very_dissatisfied"
              name="experience"
              value="very_dissatisfied"
              checked={experience === 'very_dissatisfied'}
              onChange={(e) => setExperience(e.target.value)}
            />
            <label htmlFor="very_dissatisfied" title="Very Dissatisfied">
              😡
            </label>
          </div>

          <label htmlFor="navigation" className={styles.label}>
            How easy was it to navigate the app?
          </label>
          <input
            type="range"
            id="navigation"
            name="navigation"
            min="1"
            max="100"
            value={navigation}
            step="1"
            onChange={(e) => setNavigation(e.target.value)}
            className={styles.inputRange}
          />

          <label htmlFor="likeMost" className={styles.label}>
            What did you like most about the app?
          </label>
          <textarea
            id="likeMost"
            name="likeMost"
            value={likeMost}
            onChange={(e) => setLikeMost(e.target.value)}
            required
            className={styles.textarea}
          />

          <label htmlFor="features" className={styles.label}>
            What additional features would you like to see in future updates?
          </label>
          <textarea
            id="features"
            name="features"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className={styles.textarea}
          />

          <label htmlFor="recommendation" className={styles.label}>
            How likely are you to recommend our app to others?
          </label>
          <input
            type="range"
            id="recommendation"
            name="recommendation"
            min="1"
            max="100"
            value={recommendation}
            step="1"
            onChange={(e) => setRecommendation(e.target.value)}
            className={styles.inputRange}
          />

          <label htmlFor="additional" className={styles.label}>
            Do you have any additional comments or suggestions for us?
          </label>
          <textarea
            id="additional"
            name="additional"
            value={additional}
            onChange={(e) => setAdditional(e.target.value)}
            className={styles.textarea}
          />

          <button type="submit" className={styles.button}>
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;
