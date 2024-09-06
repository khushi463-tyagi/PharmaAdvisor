import React, { useState } from "react";
import styles from "../styles/LoginSignupPage.module.css"; 
import hello from "../assets/images/hello.png";

const LoginSignupPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? "login.php" : "signup.php";

        const response = await fetch(`http://localhost/pharma_advisor/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        alert(result.message);

        if (result.message === "Login successful") {
            window.location.href = `/dashboard?username=${result.username}&confettiShown=false`;
        }
    };

    return (
        <div className={styles.LSPLoginSignupContainer}>
            <img src={hello} alt="Hello" className={styles.LSPHelloImage} />
            <div className={`${styles.LSPFormContainer} ${isLogin ? styles.LSPLogin : styles.LSPSignup}`}>
                <h1 className={styles.LSPFormTitle}>{isLogin ? "Login" : "Sign Up"}</h1>
                <form onSubmit={handleFormSubmit}>
                    <div className={styles.LSPInputGroup}>
                        <i className="fas fa-user"></i>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                            className={styles.LSPInput}
                        />
                        <label htmlFor="username" className={styles.LSPLabel}>Username</label>  
                    </div>
                    {!isLogin && (
                    <div className={styles.LSPInputGroup}>
                        <i className="fas fa-envelope"></i>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className={styles.LSPInput} 
                        />
                        <label htmlFor="email" className={styles.LSPLabel}>Email</label> 
                    </div>
                    )}
                    <div className={styles.LSPInputGroup}>
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className={styles.LSPInput} 
                        />
                        <label htmlFor="password" className={styles.LSPLabel}>Password</label> 
                    </div>
                    <button type="submit" className={styles.LSPBtn}>{isLogin ? "Login" : "Sign Up"}</button>
                </form>
                <div className={styles.LSPLinks}>
                    <p>{isLogin ? "Don't have an account?" : "Already Have Account?"}</p>
                    <button onClick={() => setIsLogin(!isLogin)} className={styles.LSPButton}>{isLogin ? "Sign Up" : "Login"}</button>
                </div>
            </div>
        </div>
    );
};

export default LoginSignupPage;