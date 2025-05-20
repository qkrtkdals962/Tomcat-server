import React from 'react';
import '../styles/MainContent.css';
import { FaUtensils, FaRunning, FaHistory, FaFireAlt } from 'react-icons/fa';

const MainContent = () => {
  // 실제 앱에서는 이 데이터들이 API 등에서 가져온 데이터일 것입니다.
  const calorieData = {
    goal: 2000,
    current: 1250,
  };

  const recommendedMenus = [
    { id: 1, name: '닭가슴살 샐러드', calories: 320, protein: 35 },
    { id: 2, name: '고구마 오트밀', calories: 280, protein: 12 },
    { id: 3, name: '연어 스테이크', calories: 420, protein: 40 }
  ];

  const recentDiets = [
    { id: 1, date: '2025-05-09', meal: '아침', food: '오트밀 & 바나나', calories: 310 },
    { id: 2, date: '2025-05-09', meal: '점심', food: '현미밥 & 닭가슴살', calories: 450 },
  ];

  const recommendedWorkouts = [
    { id: 1, name: '전신 HIIT 운동', duration: '30분', calories: 300 },
    { id: 2, name: '상체 근력 운동', duration: '45분', calories: 200 },
    { id: 3, name: '러닝', duration: '20분', calories: 180 }
  ];

  // 목표 칼로리 퍼센트 계산
  const caloriePercent = Math.min(Math.round((calorieData.current / calorieData.goal) * 100), 100);

  return (
    <main className="main-content">
      <h1>대시보드</h1>

      <section className="dashboard-section calorie-section">
        <h2><FaFireAlt /> 오늘의 칼로리</h2>
        <div className="calorie-overview">
          <div className="calorie-progress-container">
            <div className="calorie-progress">
              <div 
                className="calorie-progress-bar" 
                style={{ width: `${caloriePercent}%` }}
              ></div>
            </div>
            <div className="calorie-text">
              <span className="calorie-current">{calorieData.current}</span>
              <span className="calorie-separator">/</span>
              <span className="calorie-goal">{calorieData.goal} kcal</span>
            </div>
          </div>
          <div className="calorie-info">
            <div className="calorie-remaining">
              <span className="label">남은 칼로리</span>
              <span className="value">{calorieData.goal - calorieData.current} kcal</span>
            </div>
            <div className="calorie-percent">
              <span className="label">목표 대비</span>
              <span className="value">{caloriePercent}%</span>
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-section recommended-menu">
        <h2><FaUtensils /> 추천 메뉴</h2>
        <div className="menu-cards">
          {recommendedMenus.map(menu => (
            <div className="menu-card" key={menu.id}>
              <h3>{menu.name}</h3>
              <div className="menu-info">
                <span className="menu-calories">{menu.calories} kcal</span>
                <span className="menu-protein">단백질 {menu.protein}g</span>
              </div>
              <button className="menu-button">식단 추가</button>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-section recent-history">
        <h2><FaHistory /> 최근 기록</h2>
        <div className="recent-logs">
          <div className="log-header">
            <span className="log-date">날짜</span>
            <span className="log-meal">식사</span>
            <span className="log-food">음식</span>
            <span className="log-calories">칼로리</span>
          </div>
          {recentDiets.map(diet => (
            <div className="log-item" key={diet.id}>
              <span className="log-date">{diet.date}</span>
              <span className="log-meal">{diet.meal}</span>
              <span className="log-food">{diet.food}</span>
              <span className="log-calories">{diet.calories} kcal</span>
            </div>
          ))}
          <button className="view-all-button">전체 보기</button>
        </div>
      </section>

      <section className="dashboard-section workout-section">
        <h2><FaRunning /> 추천 운동 루틴</h2>
        <div className="workout-cards">
          {recommendedWorkouts.map(workout => (
            <div className="workout-card" key={workout.id}>
              <h3>{workout.name}</h3>
              <div className="workout-info">
                <span className="workout-duration">시간: {workout.duration}</span>
                <span className="workout-calories">소모 칼로리: {workout.calories} kcal</span>
              </div>
              <button className="workout-button">운동 기록</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default MainContent;