import { useState, useEffect } from 'react';
import TimeSelector from '../components/MealRecommendationApp/TimeSelector';
import MealList from '../components/MealRecommendationApp/MealList';
import logo from '../assets/images/logo1.png';
import '../styles/MealRecommendationApp.css';

const getCurrentMealTime = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return 'breakfast';
  if (hour >= 11 && hour < 16) return 'lunch';
  return 'dinner';
};

// 식사 시간대별 영양소 기준 정의
const mealTypeNutritionCriteria = {
  breakfast: {
    // 아침: 균형 잡힌 영양소, 탄수화물 위주
    carMin: 10, // 최소 탄수화물 (g)
    proteinMax: 20, // 최대 단백질 (g)
    kcalMax: 400 // 최대 칼로리
  },
  lunch: {
    // 점심: 단백질과 탄수화물 균형
    proteinMin: 15, // 최소 단백질 (g)
    kcalMin: 300, // 최소 칼로리
    kcalMax: 600 // 최대 칼로리
  },
  dinner: {
    // 저녁: 단백질 위주, 탄수화물 적게
    proteinMin: 20, // 최소 단백질 (g)
    carMax: 30, // 최대 탄수화물 (g)
    kcalMax: 500 // 최대 칼로리
  }
};

function MealRecommendationApp() {
  const [mealTime, setMealTime] = useState(getCurrentMealTime);
  const [randomMeals, setRandomMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [allMeals, setAllMeals] = useState([]);

  // Fetch meals data from API
  useEffect(() => {
  const fetchMeals = async () => {
    try {
      const response = await fetch('http://localhost:8080/foods');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();

      console.log("API에서 받아온 데이터:", data);
      
      // 여기에 코드를 넣어야 합니다!
      // API로부터 받은 데이터를 MealList가 기대하는 형식으로 변환
      const formattedMeals = data.map(meal => ({
        ...meal,                // 기존 API 데이터 유지
        name: meal.foodname,    // MealList에서 사용하는 name 속성
        calories: meal.kcal,    // MealList에서 사용하는 calories 속성
        description: `탄수화물: ${meal.car}g, 단백질: ${meal.protein}g, 지방: ${meal.fat}g` // 설명 추가
      }));
      
      console.log("변환된 데이터:", formattedMeals);

      setAllMeals(formattedMeals); // 여기서 data 대신 formattedMeals를 사용
      // Initial meals setup after data is loaded
      getRandomMeals(mealTime, 6, formattedMeals); // 여기도 data 대신 formattedMeals를 사용
    } catch (error) {
      console.error('Error fetching meals:', error);
      setIsLoading(false);
    }
  };

  fetchMeals();
}, []);

  // 시간대별 적합한 음식 필터링 
  const filterMealsByType = (meals, type) => {
    const criteria = mealTypeNutritionCriteria[type];
    
    return meals.filter(meal => {
      if (type === 'breakfast') {
        return meal.car >= criteria.carMin && 
               meal.protein <= criteria.proteinMax && 
               meal.kcal <= criteria.kcalMax;
      } else if (type === 'lunch') {
        return meal.protein >= criteria.proteinMin && 
               meal.kcal >= criteria.kcalMin && 
               meal.kcal <= criteria.kcalMax;
      } else if (type === 'dinner') {
        return meal.protein >= criteria.proteinMin && 
               meal.car <= criteria.carMax && 
               meal.kcal <= criteria.kcalMax;
      }
      return true; // 기본값
    });
  };

  const getRandomMeals = (mealType, count = 6, mealsSource = allMeals) => {
    setIsLoading(true);
    
    // 시간대에 맞는 음식 필터링
    const filteredMeals = filterMealsByType(mealsSource, mealType);
    
    // 필터링된 음식이 없으면 전체 목록에서 랜덤하게 선택
    const sourceMeals = filteredMeals.length > 0 ? filteredMeals : mealsSource;
    
    if (sourceMeals.length === 0) {
      setRandomMeals([]);
      setIsLoading(false);
      return;
    }
    
    const meals = [...sourceMeals];
    // Shuffle array
    for (let i = meals.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [meals[i], meals[j]] = [meals[j], meals[i]];
    }
    
    // Get subset of meals
    const result = meals.slice(0, Math.min(count, meals.length));
    
    setTimeout(() => {
      setRandomMeals(result);
      setIsLoading(false);
    }, 500);
  };

  // Update meals when meal time changes
  useEffect(() => {
    if (allMeals.length > 0) {
      getRandomMeals(mealTime);
    }
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
      </div>
    </div>
  );
}

export default MealRecommendationApp;