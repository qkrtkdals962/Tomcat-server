import React from 'react'; 
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './pages/AuthContext';

import Header from './pages/Header.jsx'; 
import Footer from "./pages/Footer.jsx";

import MainPage from './pages/MainPage.jsx'; 
import MealRecommendationApp from './pages/MealRecommendationApp.jsx'; 
import HealthCalculators from './pages/HealthCalculators.jsx'; 
import Login from './pages/Login.jsx'; 
import Register from './pages/Register.jsx'; 
import CommunityBoard from './pages/CommunityBoard.jsx'; 
import MealTrackerApp from './pages/MealTrackerApp.jsx'; 
import WorkoutTrackerApp from './pages/WorkoutTrackerApp.jsx'; 
import TermsOfService from './pages/TermsOfService.jsx'; 
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'; 
import FAQ from './pages/FAQ.jsx'; 
import ContactForm from './pages/ContactForm.jsx';

function AppContent() {
  const location = useLocation();
  
  // diet-log, exercise-log 경로면 footer marginTop 200px, 아니면 0px
  const footerMarginTop = ['/MealTrackerApp', '/WorkoutTrackerApp','/health-calculators','/login','/register'].includes(location.pathname) ? 250 : 0;
  
  console.log('Current path:', location.pathname);
  
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/MealTrackerApp" element={<MealTrackerApp />} />
          <Route path="/WorkoutTrackerApp" element={<WorkoutTrackerApp />} />
          <Route path="/today-menu" element={<MealRecommendationApp />} />
          <Route path="/health-calculators" element={<HealthCalculators />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/community-board" element={<CommunityBoard />} />
          <Route path="/terms" element={<TermsOfService/>} />
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy/>} />
          <Route path="/FAQ" element={<FAQ/>} />
          <Route path="/ContactForm" element={<ContactForm/>} />
        </Routes>
      </main>
      <Footer marginTop={footerMarginTop} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;