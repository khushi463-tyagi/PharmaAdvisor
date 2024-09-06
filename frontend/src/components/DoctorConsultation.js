import React, { useState, useEffect } from 'react';
import styles from '../styles/DoctorConsultation.module.css';
import confetti from 'canvas-confetti';

const DoctorConsultation = () => {
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isSubscriber, setIsSubscriber] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [allSpecializations, setAllSpecializations] = useState([]);

    useEffect(() => {
        const subscriberStatus = localStorage.getItem('isSubscriber') === 'true';
        setIsSubscriber(subscriberStatus);

        // Load initial doctors data
        fetchDoctors('General Physician');
        fetchUniqueSpecializations();
    }, []);

    const fetchDoctors = async (specialization = '') => {
        try {
            const response = await fetch(`${apiBaseUrl}/consultation`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ specialization }),
            });
            const data = await response.json();
            if (response.ok) {
                setDoctors(data.doctors || []);
                setFilteredDoctors(data.doctors || []);
            } else {
                console.error(data.error);
                setFilteredDoctors([]);
            }
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const fetchUniqueSpecializations = async () => {
        try {
            const response = await fetch(`${apiBaseUrl}/unique-specializations`);
            const data = await response.json();
            if (response.ok) {
                setAllSpecializations(data.specializations);
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error fetching specializations:', error);
        }
    };

    const handleSearch = () => {
        fetchDoctors(searchQuery);
    };

    const handleDiscountCode = (doctor) => {
        if (isSubscriber) {
            // Generate discount coupon code
            const doctorName = doctor.Name.replace('Dr. ', '').toUpperCase();
            const couponCode = doctorName.slice(0, 4).concat('2024'); // First 4 letters of doctor name
            setSelectedDoctor(doctor);
            // Show confetti effect
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });

            // Set the doctor with the generated coupon code
            setSelectedDoctor({ ...doctor, coupon_code: couponCode });
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedDoctor(null);
    };

    const handleCopyDiscountCode = () => {
        if (selectedDoctor && selectedDoctor.coupon_code) {
            navigator.clipboard.writeText(selectedDoctor.coupon_code).then(() => {
                setToastMessage('Discount code copied to clipboard!');
                setTimeout(() => setToastMessage(''), 1500);
            });
        }
    };

    const handleSearchInputChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    
        if (query === '') {
            setFilteredDoctors(doctors);  // Reset to show all doctors if query is empty
            setSuggestions([]);
        } else {
            const filteredSpecializations = allSpecializations.filter(spec =>
                spec.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSpecializations);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchQuery(suggestion);
        fetchDoctors(suggestion);
        setSuggestions([]);  // Reset suggestions after selection
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Doctor Consultation</h1>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search by specialization..."
                    className={styles.searchInput}
                />
                <button onClick={handleSearch} className={styles.searchButton}>
                    Search
                </button>
                {suggestions.length > 0 && (
                    <div className={styles.suggestions}>
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className={styles.suggestionItem}
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={styles.cardsContainer}>
                {filteredDoctors.length === 0 ? (
                    <p>No results found</p>
                ) : (
                    filteredDoctors.map(doctor => (
                        <div key={doctor.Name} className={styles.card}>
                            <h2>{doctor.Name}</h2>
                            <p>{doctor.Specialization}</p>
                            <button onClick={() => window.location.href = doctor.URL}>
                                Visit Website
                            </button>
                            {isSubscriber && (
                                <button onClick={() => handleDiscountCode(doctor)}>
                                    Get Consult Discount
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>
            {showModal && selectedDoctor && (
                <>
                    <div className={`${styles.overlay} ${showModal ? styles.show : ''}`}></div>
                    <div className={`${styles.modal} ${showModal ? styles.show : ''}`}>
                        <div className={styles.modalContent}>
                            <span onClick={handleCloseModal} className={styles.close}>&times;</span>
                            <div className={styles.discountContent}>
                                <button
                                    onClick={handleCopyDiscountCode}
                                    className={styles.discountCode}
                                >
                                    {selectedDoctor.coupon_code || 'No code available'}
                                </button>
                                <p>
                                    Use this code while making payment to get a discount on your consultation with <strong>{selectedDoctor.Name}</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {toastMessage && (
                <div className={`${styles.toast} ${toastMessage ? styles.show : ''}`}>
                    {toastMessage}
                </div>
            )}
        </div>
    );
};

export default DoctorConsultation;
