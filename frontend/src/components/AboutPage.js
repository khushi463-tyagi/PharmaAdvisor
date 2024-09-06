import React, { useState, useEffect, useCallback } from 'react';
import styles from '../styles/AboutPage.module.css';
import Finder from '../assets/images/Finder.jpg'; 
import Consult from '../assets/images/Consult2.jpeg'; 
import Chatbot from '../assets/images/chatbot1.png';
import SideEffect from '../assets/images/SideEffect.jpeg';
import DrugInteraction from '../assets/images/ddi.jpeg';

const AboutPage = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      img: Finder,
      alt: "Medicine Alternative Finder",
      link: "/medicine-alternatives",
      title: "Medicine Alternative Finder",
      text: "Our alternative medicine finder analyzes the medications you're currently taking and the side effects you're experiencing. It provides personalized recommendations for alternative treatments that minimize adverse effects while addressing your health needs. This tool helps you make informed choices for better and safer medical solutions."
    },
    {
      img: Consult,
      alt: "Doctor Consultation",
      link: "/doctor-consultation",
      title: "Doctor Consultation",
      text: "Our Doctor Consultation feature enables users to connect with healthcare professionals for personalized medical advice. Premium users enjoy the added benefit of discounts on consultations. It ensures timely and expert guidance based on individual health concerns. This option aims to enhance user care by integrating professional consultations seamlessly into the health management process."
    },
    {
      img: Chatbot,
      alt: "Medical Chatbot",
      link: "/another-feature",
      title: "Medical Chatbot",
      text: "Our chatbot intelligently analyzes user-reported symptoms to diagnose potential diseases. It offers detailed information on each disease, including its description, common precautions, and preventive measures. This interactive tool aims to provide users with quick and accurate health insights to better manage their well-being. Use me to vanish your queries :)"
    },
    {
      img: SideEffect,
      alt: "Side Effect Analyzer",
      link: "/another-feature",
      title: "Side Effect",
      text: "Our Side Effect Analyzer feature helps users understand and manage potential side effects of medications. It provides insights into possible adverse effects and suggests ways to mitigate them. This tool is designed to improve patient safety and enhance the effectiveness of medical treatments."
    },
    {
      img: DrugInteraction,
      alt: "Drug Interaction Checker",
      link: "/another-feature",
      title: "Drug Interaction Checker",
      text: "Our Drug Interaction Checker helps users understand potential interactions between different medications. By analyzing the medicines you're taking, it provides information on possible adverse interactions and their effects. This tool aims to ensure safer medication use and prevent harmful drug interactions."
    }
  ];

  const showSlides = useCallback((n) => {
    if (n >= slides.length) { setSlideIndex(0); return; }
    if (n < 0) { setSlideIndex(slides.length - 1); return; }
    setSlideIndex(n);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      showSlides(slideIndex + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [slideIndex, showSlides]);

  return (
    <div className={styles.aboutPage}>
      <div className={styles.about}>
        <h1>About PharmaAdvisor</h1>
        <p>PharmaAdvisor is your go-to platform for all pharmaceutical needs.</p>
      </div>

      <div className={styles.slideshowContainer}>
        {slides.map((slide, index) => (
          <div className={`${styles.slide} ${index === slideIndex ? styles.slideActive : ''}`} key={index}>
            <div className={styles.slideContent}>
              <img src={slide.img} alt={slide.alt} className={styles.slideImage} />
              <div className={styles.slideText}>
                <a href={slide.link} className={styles.featureLink}>{slide.title}</a>
                <p>{slide.text}</p>
              </div>
            </div>
            <a className={styles.prev} onClick={() => showSlides(slideIndex - 1)}>&#10094;</a>
            <a className={styles.next} onClick={() => showSlides(slideIndex + 1)}>&#10095;</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutPage;