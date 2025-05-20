import React, { useState, useEffect } from "react";
import { Calendar, Plus, Trash2, Droplet, Sunrise, Sun, Sunset, Utensils, ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/MealTrackerApp.css";

// 식단 기록을 위한 커스텀 훅
const useMealStore = () => {
  const [meals, setMeals] = useState(() => {
    const savedMeals = localStorage.getItem("meals");
    return savedMeals ? JSON.parse(savedMeals) : [];
  });
  
  const today = new Date().toISOString().split('T')[0];
  
  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(meals));
  }, [meals]);
  
  const addMeal = (meal) => {
    setMeals((prev) => [...prev, meal]);
  };
  
  const deleteMeal = (id) => {
    setMeals((prev) => prev.filter(meal => meal.id !== id));
  };
  
  return { meals, addMeal, deleteMeal, today };
};

// 물 섭취량 기록을 위한 커스텀 훅
const useWaterStore = () => {
  const [waterRecords, setWaterRecords] = useState(() => {
    const savedRecords = localStorage.getItem("waterRecords");
    return savedRecords ? JSON.parse(savedRecords) : [];
  });
  
  const today = new Date().toISOString().split('T')[0];
  
  useEffect(() => {
    localStorage.setItem("waterRecords", JSON.stringify(waterRecords));
  }, [waterRecords]);
  
  const getWaterForDate = (date) => {
    const record = waterRecords.find((r) => r.date === date);
    return record ? record.glasses : 0;
  };
  
  const addWater = (amount, date) => {
    setWaterRecords((prev) => {
      const existingRecord = prev.find((r) => r.date === date);
      
      if (existingRecord) {
        const newAmount = Math.max(0, existingRecord.glasses + amount);
        return prev.map((r) =>
          r.date === date ? { ...r, glasses: newAmount } : r
        );
      } else {
        return [...prev, { date, glasses: Math.max(0, amount) }];
      }
    });
  };
  
  return {
    waterRecords,
    getWaterForDate,
    addWater,
    today,
  };
};

// 날짜 포맷팅 유틸리티
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('default', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

// 요일 이름 가져오기
const getDayName = (dateString) => {
  const date = new Date(dateString);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return days[date.getDay()];
};

// 표시를 위한 날짜 형식으로 변환
const formatDateForDisplay = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  
  return `${year}년 ${month}월 ${day}일 (${getDayName(dateString)})`;
};

// 일정 기간의 날짜 범위를 반환하는 유틸리티
const getDaysInRange = (days) => {
  const result = [];
  const today = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    result.push(date.toISOString().split('T')[0]);
  }
  
  return result;
};

// 특정 월의 모든 날짜를 가져오는 함수
const getCalendarDays = (year, month) => {
  // month는 0-indexed (0: 1월, 11: 12월)
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // 첫 주 시작 요일 (일요일부터 채우기)
  const firstWeekStart = new Date(firstDay);
  firstWeekStart.setDate(firstDay.getDate() - firstDay.getDay());
  
  // 마지막 주 종료 요일 (토요일까지 채우기)
  const lastWeekEnd = new Date(lastDay);
  lastWeekEnd.setDate(lastDay.getDate() + (6 - lastDay.getDay()));
  
  const days = [];
  let currentDay = new Date(firstWeekStart);
  
  while (currentDay <= lastWeekEnd) {
    days.push({
      date: currentDay.toISOString().split('T')[0],
      isCurrentMonth: currentDay.getMonth() === month,
      isToday: currentDay.toISOString().split('T')[0] === new Date().toISOString().split('T')[0]
    });
    currentDay.setDate(currentDay.getDate() + 1);
  }
  
  return days;
};

// 식단 기록 컴포넌트
const MealTracker = () => {
  const { addMeal, meals, deleteMeal, today } = useMealStore();
  const [mealType, setMealType] = useState("breakfast");
  const [description, setDescription] = useState("");
  
  const handleAddMeal = () => {
    if (!description.trim()) return;
    
    addMeal({
      id: Date.now().toString(),
      type: mealType,
      description,
      date: today
    });
    
    setDescription("");
  };
  
  const todaysMeals = meals.filter(meal => meal.date === today);

  const getMealIcon = (type) => {
    switch(type) {
      case "breakfast": return <Sunrise size={18} />;
      case "lunch": return <Sun size={18} />;
      case "dinner": return <Sunset size={18} />;
      default: return <Utensils size={18} />;
    }
  };
  
  const getMealTitle = (type) => {
    switch(type) {
      case "breakfast": return "아침";
      case "lunch": return "점심";
      case "dinner": return "저녁";
      default: return type;
    }
  };
  
  return (
    <div className="meal-tracker">
      <div className="tracker-header">
        <h2>식단 기록</h2>
        <p className="date-info">
          <Calendar size={14} />
          {formatDateForDisplay(today)}
        </p>
      </div>
      <div className="tracker-content">
        <div className="meal-type-buttons">
          <button 
            className={`meal-type-button ${mealType === "breakfast" ? "active" : ""}`}
            onClick={() => setMealType("breakfast")}
          >
            <Sunrise size={16} />
            아침
          </button>
          <button 
            className={`meal-type-button ${mealType === "lunch" ? "active" : ""}`}
            onClick={() => setMealType("lunch")}
          >
            <Sun size={16} />
            점심
          </button>
          <button 
            className={`meal-type-button ${mealType === "dinner" ? "active" : ""}`}
            onClick={() => setMealType("dinner")}
          >
            <Sunset size={16} />
            저녁
          </button>
        </div>
        
        <div className="meal-input">
          <textarea
            placeholder="무엇을 드셨나요?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
        
        <button 
          className="add-meal-button"
          onClick={handleAddMeal}
          disabled={!description.trim()}
        >
          <Plus size={16} />
          식단 추가
        </button>
        
        <div className="todays-meals">
          <h3>오늘의 식단</h3>
          {todaysMeals.length === 0 ? (
            <div className="no-meals">
              <Utensils size={24} />
              <p>오늘 기록된 식단이 없습니다</p>
            </div>
          ) : (
            <div className="meal-items">
              {todaysMeals.map(meal => (
                <div key={meal.id} className="meal-item">
                  <div className="meal-icon">
                    {getMealIcon(meal.type)}
                  </div>
                  <div className="meal-details">
                    <div className="meal-title">{getMealTitle(meal.type)}</div>
                    <p className="meal-description">{meal.description}</p>
                  </div>
                  <button 
                    onClick={() => deleteMeal(meal.id)}
                    className="delete-meal-button"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 물 섭취량 기록 컴포넌트
const WaterTracker = () => {
  const { addWater, getWaterForDate, today } = useWaterStore();
  const dailyGoal = 8;
  const todaysWater = getWaterForDate(today);
  const progress = Math.min((todaysWater / dailyGoal) * 100, 100);

  return (
    <div className="water-tracker">
      <div className="tracker-header">
        <h2>물 섭취량</h2>
        <p className="date-info">
          <Calendar size={14} />
          {formatDateForDisplay(today)}
        </p>
      </div>
      <div className="tracker-content">
        <div className="water-progress">
          <div className="water-container">
            <div 
              className="water-fill"
              style={{ height: `${progress}%` }}
            />
            <div className="water-gauge">
              <Droplet className="water-icon" size={48} />
              <div className="water-amount">
                <div className="water-count">{todaysWater}</div>
                <div className="water-goal">/ {dailyGoal}잔</div>
              </div>
            </div>
          </div>
        </div>

        <div className="water-buttons">
          <button 
            className="add-water-button"
            onClick={() => addWater(1, today)}
          >
            1잔 추가
          </button>
          <button 
            className="add-water-button"
            onClick={() => addWater(2, today)}
          >
            2잔 추가
          </button>
          {todaysWater > 0 && (
            <button 
              className="remove-water-button"
              onClick={() => addWater(-1, today)}
            >
              1잔 제거
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// 캘린더 뷰 컴포넌트
const CalendarView = () => {
  const { meals } = useMealStore();
  const { getWaterForDate } = useWaterStore();
  const today = new Date();
  
  const [viewDate, setViewDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth()
  });
  
  const calendarDays = getCalendarDays(viewDate.year, viewDate.month);
  
  const getPreviousMonth = () => {
    if (viewDate.month === 0) {
      setViewDate({ year: viewDate.year - 1, month: 11 });
    } else {
      setViewDate({ ...viewDate, month: viewDate.month - 1 });
    }
  };
  
  const getNextMonth = () => {
    if (viewDate.month === 11) {
      setViewDate({ year: viewDate.year + 1, month: 0 });
    } else {
      setViewDate({ ...viewDate, month: viewDate.month + 1 });
    }
  };
  
  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ];
  
  // 특정 날짜에 식사 데이터가 있는지 확인
  const hasMeals = (date) => {
    return meals.some(meal => meal.date === date);
  };
  
  // 특정 날짜에 물 기록이 있는지 확인
  const hasWater = (date) => {
    return getWaterForDate(date) > 0;
  };
  
  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <h2>캘린더</h2>
        <div className="calendar-nav">
          <button onClick={getPreviousMonth} className="month-nav-button">
            <ChevronLeft size={16} />
          </button>
          <div className="current-month">
            {viewDate.year}년 {monthNames[viewDate.month]}
          </div>
          <button onClick={getNextMonth} className="month-nav-button">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <div className="calendar-content">
        <div className="calendar-grid">
          <div className="weekday-header">일</div>
          <div className="weekday-header">월</div>
          <div className="weekday-header">화</div>
          <div className="weekday-header">수</div>
          <div className="weekday-header">목</div>
          <div className="weekday-header">금</div>
          <div className="weekday-header">토</div>
          
          {calendarDays.map((day, index) => (
            <div 
              key={index} 
              className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${day.isToday ? 'today' : ''}`}
            >
              <div className="day-number">{new Date(day.date).getDate()}</div>
              <div className="day-indicators">
                {hasMeals(day.date) && <div className="meal-indicator"></div>}
                {hasWater(day.date) && <div className="water-indicator"></div>}
              </div>
            </div>
          ))}
        </div>
        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-color meal-indicator"></div>
            <span>식단 기록</span>
          </div>
          <div className="legend-item">
            <div className="legend-color water-indicator"></div>
            <span>물 섭취</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 기록 히스토리 컴포넌트
const DailyHistory = () => {
  const { meals } = useMealStore();
  const { getWaterForDate } = useWaterStore();
  
  const dates = getDaysInRange(7);
  
  const getMealsForDate = (date, type) => {
    return meals.filter(meal => meal.date === date && meal.type === type);
  };
  
  const renderMealSummary = (date, type) => {
    const dateMeals = getMealsForDate(date, type);
    
    if (dateMeals.length === 0) {
      return <span className="no-record">기록 없음</span>;
    }
    
    return (
      <div>
        {dateMeals.map((meal, index) => (
          <div key={meal.id} className="meal-summary">
            {meal.description}
            {index < dateMeals.length - 1 && ", "}
          </div>
        ))}
      </div>
    );
  };
  
  const renderWaterStatus = (date) => {
    const waterCount = getWaterForDate(date);
    const dailyGoal = 8;
    
    if (waterCount === 0) {
      return <span className="no-record">기록 없음</span>;
    }
    
    const percentage = Math.round((waterCount / dailyGoal) * 100);
    let statusClass = "water-status-primary";

    if (percentage >= 100) statusClass = "water-status-success";
    else if (percentage >= 50) statusClass = "water-status-primary";
    else if (percentage >= 25) statusClass = "water-status-warning";
    else statusClass = "water-status-danger";
    
    return (
      <span className={`water-status ${statusClass}`}>
        {waterCount} / {dailyGoal}잔 ({percentage}%)
      </span>
    );
  };
  
  return (
    <div className="daily-history">
      <div className="history-header">
        <h2>기록 내역</h2>
      </div>
      <div className="history-content">
        <div className="history-table-container">
          <table className="history-table">
            <thead>
              <tr>
                <th>날짜</th>
                <th>아침</th>
                <th>점심</th>
                <th>저녁</th>
                <th>물</th>
              </tr>
            </thead>
            <tbody>
              {dates.map(date => (
                <tr key={date}>
                  <td className="date-cell">
                    <div className="date-display">{formatDateForDisplay(date)}</div>
                    {date === new Date().toISOString().split('T')[0] && (
                      <span className="today-badge">오늘</span>
                    )}
                  </td>
                  <td>{renderMealSummary(date, "breakfast")}</td>
                  <td>{renderMealSummary(date, "lunch")}</td>
                  <td>{renderMealSummary(date, "dinner")}</td>
                  <td>{renderWaterStatus(date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// 메인 애플리케이션 컴포넌트
export default function MealTrackerApp() {
  const [selected, setSelected] = useState("track");
  
  // 컴포넌트가 마운트될 때 콘솔에 로그 추가
  useEffect(() => {
    console.log("MealTrackerApp 컴포넌트가 마운트되었습니다.");
  }, []);
  
  return (
    <div className="meal-tracker-app">
      <div className="meal-tracker-container">
        <header className="app-header">
          <h1>식단 및 물 섭취량 기록</h1>
          <p>건강한 생활을 위한 일일 식단과 물 섭취량을 기록해보세요</p>
        </header>

        <div className="app-tabs">
          <button
            onClick={() => setSelected("track")}
            className={`tab-button ${selected === "track" ? "active" : ""}`}
          >
            <Utensils size={18} />
            <span>오늘의 기록</span>
          </button>
          <button
            onClick={() => setSelected("calendar")}
            className={`tab-button ${selected === "calendar" ? "active" : ""}`}
          >
            <Calendar size={18} />
            <span>캘린더</span>
          </button>
          <button
            onClick={() => setSelected("history")}
            className={`tab-button ${selected === "history" ? "active" : ""}`}
          >
            <Calendar size={18} />
            <span>기록 내역</span>
          </button>
        </div>

        {selected === "track" && (
          <div className="trackers-grid">
            <MealTracker />
            <WaterTracker />
          </div>
        )}
        
        {selected === "calendar" && (
          <CalendarView />
        )}
        
        {selected === "history" && (
          <DailyHistory />
        )}
      </div>
    </div>
  );
}