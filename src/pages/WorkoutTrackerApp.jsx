import React, { useState, useEffect } from "react";
import { Calendar, Plus, Trash2, Scale, Sunrise, Sun, Sunset, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import "../styles/WorkoutTrackerApp.css";

// 운동 기록을 위한 커스텀 훅
const useWorkoutStore = () => {
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem("workouts");
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });
  
  const today = new Date().toISOString().split('T')[0];
  
  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);
  
  const addWorkout = (workout) => {
    setWorkouts((prev) => [...prev, workout]);
  };
  
  const deleteWorkout = (id) => {
    setWorkouts((prev) => prev.filter(workout => workout.id !== id));
  };
  
  return { workouts, addWorkout, deleteWorkout, today };
};

// 체중 기록을 위한 커스텀 훅
const useWeightStore = () => {
  const [weightRecords, setWeightRecords] = useState(() => {
    const savedRecords = localStorage.getItem("weightRecords");
    return savedRecords ? JSON.parse(savedRecords) : [];
  });
  
  const today = new Date().toISOString().split('T')[0];
  
  useEffect(() => {
    localStorage.setItem("weightRecords", JSON.stringify(weightRecords));
  }, [weightRecords]);
  
  const getWeightForDate = (date) => {
    const record = weightRecords.find((r) => r.date === date);
    return record ? record.weight : null;
  };
  
  const setWeight = (weight, date) => {
    setWeightRecords((prev) => {
      const existingRecord = prev.find((r) => r.date === date);
      
      if (existingRecord) {
        return prev.map((r) =>
          r.date === date ? { ...r, weight } : r
        );
      } else {
        return [...prev, { date, weight }];
      }
    });
  };
  
  return {
    weightRecords,
    getWeightForDate,
    setWeight,
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

// 운동 기록 컴포넌트
const WorkoutTracker = () => {
  const { addWorkout, workouts, deleteWorkout, today } = useWorkoutStore();
  const [workoutType, setWorkoutType] = useState("cardio");
  const [description, setDescription] = useState("");
  
  const handleAddWorkout = () => {
    if (!description.trim()) return;
    
    addWorkout({
      id: Date.now().toString(),
      type: workoutType,
      description,
      date: today
    });
    
    setDescription("");
  };
  
  const todaysWorkouts = workouts.filter(workout => workout.date === today);

  const getWorkoutIcon = (type) => {
    switch(type) {
      case "cardio": return <Sunrise size={18} />;
      case "strength": return <Sun size={18} />;
      case "flexibility": return <Sunset size={18} />;
      default: return <Activity size={18} />;
    }
  };
  
  const getWorkoutTitle = (type) => {
    switch(type) {
      case "cardio": return "유산소";
      case "strength": return "근력";
      case "flexibility": return "유연성";
      default: return type;
    }
  };
  
  return (
    <div className="workout-tracker">
      <div className="tracker-header">
        <h2>운동 기록</h2>
        <p className="date-info">
          <Calendar size={14} />
          {formatDateForDisplay(today)}
        </p>
      </div>
      <div className="tracker-content">
        <div className="workout-type-buttons">
          <button 
            className={`workout-type-button ${workoutType === "cardio" ? "active" : ""}`}
            onClick={() => setWorkoutType("cardio")}
          >
            <Sunrise size={16} />
            유산소
          </button>
          <button 
            className={`workout-type-button ${workoutType === "strength" ? "active" : ""}`}
            onClick={() => setWorkoutType("strength")}
          >
            <Sun size={16} />
            근력
          </button>
          <button 
            className={`workout-type-button ${workoutType === "flexibility" ? "active" : ""}`}
            onClick={() => setWorkoutType("flexibility")}
          >
            <Sunset size={16} />
            유연성
          </button>
        </div>
        
        <div className="workout-input">
          <textarea
            placeholder="어떤 운동을 하셨나요?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
        </div>
        
        <button 
          className="add-workout-button"
          onClick={handleAddWorkout}
          disabled={!description.trim()}
        >
          <Plus size={16} />
          운동 추가
        </button>
        
        <div className="todays-workouts">
          <h3>오늘의 운동</h3>
          {todaysWorkouts.length === 0 ? (
            <div className="no-workouts">
              <Activity size={24} />
              <p>오늘 기록된 운동이 없습니다</p>
            </div>
          ) : (
            <div className="workout-items">
              {todaysWorkouts.map(workout => (
                <div key={workout.id} className="workout-item">
                  <div className="workout-icon">
                    {getWorkoutIcon(workout.type)}
                  </div>
                  <div className="workout-details">
                    <div className="workout-title">{getWorkoutTitle(workout.type)}</div>
                    <p className="workout-description">{workout.description}</p>
                  </div>
                  <button 
                    onClick={() => deleteWorkout(workout.id)}
                    className="delete-workout-button"
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

// 체중 기록 컴포넌트
const WeightTracker = () => {
  const { setWeight, getWeightForDate, today } = useWeightStore();
  const [currentWeight, setCurrentWeight] = useState(() => {
    const savedWeight = getWeightForDate(today);
    return savedWeight || "";
  });
  
  const handleSetWeight = () => {
    if (currentWeight) {
      setWeight(parseFloat(currentWeight), today);
    }
  };

  return (
    <div className="weight-tracker">
      <div className="tracker-header">
        <h2>체중 기록</h2>
        <p className="date-info">
          <Calendar size={14} />
          {formatDateForDisplay(today)}
        </p>
      </div>
      <div className="tracker-content">
        <div className="weight-display">
          <div className="weight-container">
            <Scale className="weight-icon" size={48} />
            <div className="weight-value">
              {getWeightForDate(today) ? (
                <span className="weight-number">{getWeightForDate(today)} kg</span>
              ) : (
                <span className="no-weight-recorded">기록 없음</span>
              )}
            </div>
          </div>
        </div>

        <div className="weight-input-container">
          <input
            type="number"
            className="weight-input"
            placeholder="오늘의 체중 (kg)"
            value={currentWeight}
            onChange={(e) => setCurrentWeight(e.target.value)}
            step="0.1"
            min="20"
            max="200"
          />
          <button 
            className="save-weight-button"
            onClick={handleSetWeight}
            disabled={!currentWeight}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

// 캘린더 뷰 컴포넌트
const CalendarView = () => {
  const { workouts } = useWorkoutStore();
  const { getWeightForDate } = useWeightStore();
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
  
  // 특정 날짜에 운동 데이터가 있는지 확인
  const hasWorkouts = (date) => {
    return workouts.some(workout => workout.date === date);
  };
  
  // 특정 날짜에 체중 기록이 있는지 확인
  const hasWeight = (date) => {
    return getWeightForDate(date) !== null;
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
                {hasWorkouts(day.date) && <div className="workout-indicator"></div>}
                {hasWeight(day.date) && <div className="weight-indicator"></div>}
              </div>
            </div>
          ))}
        </div>
        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-color workout-indicator"></div>
            <span>운동 기록</span>
          </div>
          <div className="legend-item">
            <div className="legend-color weight-indicator"></div>
            <span>체중 기록</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 기록 히스토리 컴포넌트
const DailyHistory = () => {
  const { workouts } = useWorkoutStore();
  const { getWeightForDate } = useWeightStore();
  
  const dates = getDaysInRange(7);
  
  const getWorkoutsForDate = (date, type) => {
    return workouts.filter(workout => workout.date === date && workout.type === type);
  };
  
  const renderWorkoutSummary = (date, type) => {
    const dateWorkouts = getWorkoutsForDate(date, type);
    
    if (dateWorkouts.length === 0) {
      return <span className="no-record">기록 없음</span>;
    }
    
    return (
      <div>
        {dateWorkouts.map((workout, index) => (
          <div key={workout.id} className="workout-summary">
            {workout.description}
            {index < dateWorkouts.length - 1 && ", "}
          </div>
        ))}
      </div>
    );
  };
  
  const renderWeightStatus = (date) => {
    const weight = getWeightForDate(date);
    
    if (weight === null) {
      return <span className="no-record">기록 없음</span>;
    }
    
    // 이전 날짜의 체중 가져오기
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    const prevDateStr = prevDate.toISOString().split('T')[0];
    const prevWeight = getWeightForDate(prevDateStr);
    
    let statusClass = "weight-status-neutral";
    let changeDisplay = "";
    
    if (prevWeight !== null) {
      const change = weight - prevWeight;
      if (change > 0) {
        statusClass = "weight-status-increase";
        changeDisplay = ` (+${change.toFixed(1)}kg)`;
      } else if (change < 0) {
        statusClass = "weight-status-decrease";
        changeDisplay = ` (${change.toFixed(1)}kg)`;
      }
    }
    
    return (
      <span className={`weight-status ${statusClass}`}>
        {weight} kg{changeDisplay}
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
                <th>유산소</th>
                <th>근력</th>
                <th>유연성</th>
                <th>체중</th>
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
                  <td>{renderWorkoutSummary(date, "cardio")}</td>
                  <td>{renderWorkoutSummary(date, "strength")}</td>
                  <td>{renderWorkoutSummary(date, "flexibility")}</td>
                  <td>{renderWeightStatus(date)}</td>
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
export default function WorkoutTrackerApp() {
  const [selected, setSelected] = useState("track");
  
  // 컴포넌트가 마운트될 때 콘솔에 로그 추가
  useEffect(() => {
    console.log("WorkoutTrackerApp 컴포넌트가 마운트되었습니다.");
  }, []);
  
  return (
    <div className="workout-tracker-app">
      <div className="workout-tracker-container">
        <header className="app-header">
          <h1>운동 및 체중 기록</h1>
          <p>건강한 생활을 위한 일일 운동과 체중 변화를 기록해보세요</p>
        </header>

        <div className="app-tabs">
          <button
            onClick={() => setSelected("track")}
            className={`tab-button ${selected === "track" ? "active" : ""}`}
          >
            <Activity size={18} />
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
            <WorkoutTracker />
            <WeightTracker />
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