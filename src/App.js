import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/Header.jsx';
import MealRecommendationApp from './pages/MealRecommendationApp.jsx';
import HealthCalculators from './pages/HealthCalculators.jsx';
import LoginPage from './pages/Login.jsx';
import SignupPage from './pages/Register.jsx';
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
            <Route path="/diet-log" element={<DietLogApp />} />
            <Route path="/exercise-log" element={<ExerciseLogApp />} />
            <Route path="/today-menu" element={<MealRecommendationApp />} />
            <Route path="/health-calculators" element={<HealthCalculators />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/community-board" element={<CommunityBoard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
