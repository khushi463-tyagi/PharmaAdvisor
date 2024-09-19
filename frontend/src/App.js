import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import WelcomePage from './components/WelcomePage';
import LoginSignupPage from './components/LoginSignupPage';
import Dashboard from './components/Dashboard';
import AlternativesFinder from './components/AlternativesFinder';
import Medibot from './components/Medibot';
import DoctorConsultation from './components/DoctorConsultation';
import SideEffectsPredictor from './components/SideEffectsPredictor';
import DrugInteraction from './components/DrugInteraction';
// import Logout from './components/Logout';
import AboutPage from './components/AboutPage';
import FeedbackPage from './components/FeedbackPage';
import ContactPage from './components/ContactPage';
import Footer from './components/Footer';  
import './styles/App.css';

function App() {
  return (
      <Router basename='/PharmaAdvisor'>    
          <Routes>
              <Route path="/" exact element={<WelcomePage />} />
              <Route path="/login" element={<LoginSignupPage />} />
              <Route element={<WithNavbarFooter />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              <Route path="/alternatives" element={<AlternativesFinder />} /> 
              <Route path="/medibot" element={<Medibot />} />
              <Route path="/consultation" element={<DoctorConsultation />} />
              <Route path="/side-effects" element={<SideEffectsPredictor />} /> 
              <Route path="/interactions" element={<DrugInteraction />} />
              </Route>
            </Routes> 
        </Router> 
    );
}

function WithNavbarFooter() {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  }

export default App;
