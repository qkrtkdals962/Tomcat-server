import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/Header.jsx';
import Footer from "./pages/Footer.jsx"; 
import MainPage from './pages/MainPage.jsx';
import MealRecommendationApp from './pages/MealRecommendationApp.jsx';
import HealthCalculators from './pages/HealthCalculators.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import DietLogApp from './pages/DietLogApp.jsx';
import ExerciseLogApp from './pages/ExerciseLogApp.jsx';
import CommunityBoard from './pages/CommunityBoard.jsx';


function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/diet-log" element={<DietLogApp />} />
            <Route path="/exercise-log" element={<ExerciseLogApp />} />
            <Route path="/today-menu" element={<MealRecommendationApp />} />
            <Route path="/health-calculators" element={<HealthCalculators />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/community-board" element={<CommunityBoard />} />
          </Routes>
        </main>
       <Footer />
      </div>
    </Router>
  );
}

export default App;
