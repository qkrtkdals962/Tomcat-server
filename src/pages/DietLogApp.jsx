import React, { useState } from 'react';
import '../styles/DietLogApp.css';

function DietLogApp() {
  // 상태 관리
  const [breakfast, setBreakfast] = useState('');
  const [lunch, setLunch] = useState('');
  const [dinner, setDinner] = useState('');
  const [waterIntake, setWaterIntake] = useState('');
  const [dietLogs, setDietLogs] = useState([]);

  // 식단 기록 저장
  const handleSave = () => {
    const newLog = {
      breakfast,
      lunch,
      dinner,
      waterIntake,
      date: new Date().toLocaleDateString(),
    };
    setDietLogs([...dietLogs, newLog]);

    // 입력 필드 초기화
    setBreakfast('');
    setLunch('');
    setDinner('');
    setWaterIntake('');
  };

  return (
    <div className="diet-log-container">
      <h1 className="diet-log-header">하루 식단 및 물 섭취 기록</h1>

      <div className="diet-log-input">
        <label>아침:</label>
        <input
          type="text"
          value={breakfast}
          onChange={(e) => setBreakfast(e.target.value)}
        />
      </div>

      <div className="diet-log-input">
        <label>점심:</label>
        <input
          type="text"
          value={lunch}
          onChange={(e) => setLunch(e.target.value)}
        />
      </div>

      <div className="diet-log-input">
        <label>저녁:</label>
        <input
          type="text"
          value={dinner}
          onChange={(e) => setDinner(e.target.value)}
        />
      </div>

      <div className="diet-log-input">
        <label>물 섭취량 (리터):</label>
        <input
          type="number"
          value={waterIntake}
          onChange={(e) => setWaterIntake(e.target.value)}
        />
      </div>

      <button className="save-button" onClick={handleSave}>기록 저장</button>

      <h2>기록된 식단</h2>
      {dietLogs.length === 0 ? (
        <p>기록된 데이터가 없습니다.</p>
      ) : (
        <ul>
          {dietLogs.map((entry, index) => (
            <li key={index}>
              <strong>{entry.date}</strong>
              <p>아침: {entry.breakfast}</p>
              <p>점심: {entry.lunch}</p>
              <p>저녁: {entry.dinner}</p>
              <p>물 섭취량: {entry.waterIntake}L</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DietLogApp;
