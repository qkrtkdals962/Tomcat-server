import { useState, useEffect } from 'react';
import TimeSelector from '../components/MealRecommendationApp/TimeSelector';
import MealList from '../components/MealRecommendationApp/MealList';
import mealsData from '../data/meals';
import logo from '../assets/images/logo1.png'
import '../styles/MealRecommendationApp.css';

const getCurrentMealTime = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 16) return 'lunch';
  return 'dinner';
};

function MealRecommendationApp() {
  const [mealTime, setMealTime] = useState(getCurrentMealTime);
  const [randomMeals, setRandomMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const getRandomMeals = (mealType, count = 6) => {
    setIsLoading(true);
    const meals = [...mealsData[mealType]];
    for (let i = meals.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [meals[i], meals[j]] = [meals[j], meals[i]];
    }
    const result = meals.slice(0, count);
    setTimeout(() => {
      setRandomMeals(result);
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    getRandomMeals(mealTime);
  }, [mealTime]);

  const refreshMeals = () => {
    getRandomMeals(mealTime);
  };

  const timeLabels = {
    breakfast: '아침',
    lunch: '점심',
    dinner: '저녁',
  };

  return (
    <div className={`app-container ${mealTime}-theme`}>
      <div className="content-wrapper">
        <div className="main-content">
          <header className="app-header">
            <img src={logo} alt="오늘 뭐먹지?" />
            <p className="app-subtitle">하루 세 끼, 뭘 먹을지 고민하는 분에게! 메뉴를 추천해 드립니다</p>
          </header>
          
          <div className="menu-card">
            <TimeSelector currentMealTime={mealTime} onSelect={setMealTime} labels={timeLabels} />
            <div className="menu-header">
              <h2 className="jua-regular">
                오늘의 <span className={`${mealTime}-color`}>{timeLabels[mealTime]}</span> 메뉴 추천
              </h2>
              <button onClick={refreshMeals} className="refresh-button">
                새로운 메뉴 추천
              </button>
            </div>
            <MealList meals={randomMeals} isLoading={isLoading} mealCount={6} />
          </div>
          
          <div className="info-banner">
            <p>'새로운 메뉴 추천' 버튼을 클릭하거나 다른 시간대를 선택하면 새로운 메뉴를 추천해 드립니다!</p>
          </div>
        </div>
        
        <footer className="app-footer">
          <p>© 2025 메뉴 추천 서비스</p>
        </footer>
      </div>
    </div>
  );
}

export default MealRecommendationApp;