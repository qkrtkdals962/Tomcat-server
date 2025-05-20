import React, { useState } from 'react';
import '../styles/ExerciseLogApp.css';

function ExerciseLogApp() {
  // 상태 관리
  const [exercise, setExercise] = useState('');
  const [duration, setDuration] = useState('');
  const [intensity, setIntensity] = useState('');
  const [exerciseLogs, setExerciseLogs] = useState([]);

  // 운동 기록 저장
  const handleSave = () => {
    const newLog = {
      exercise,
      duration,
      intensity,
      date: new Date().toLocaleDateString(),
    };
    setExerciseLogs([...exerciseLogs, newLog]);

    // 입력 필드 초기화
    setExercise('');
    setDuration('');
    setIntensity('');
  };

  return (
    <div className="exercise-log-container">
      <h1 className="exercise-log-header">하루 운동 일지</h1>

      <div className="exercise-log-input">
        <label>운동 종류:</label>
        <input
          type="text"
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
        />
      </div>

      <div className="exercise-log-input">
        <label>운동 시간 (분):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>

      <div className="exercise-log-input">
        <label>운동 강도:</label>
        <select
          value={intensity}
          onChange={(e) => setIntensity(e.target.value)}
        >
          <option value="">선택</option>
          <option value="낮음">낮음</option>
          <option value="보통">보통</option>
          <option value="높음">높음</option>
        </select>
      </div>

      <button className="save-button" onClick={handleSave}>기록 저장</button>

      <h2>기록된 운동</h2>
      {exerciseLogs.length === 0 ? (
        <p>기록된 운동 데이터가 없습니다.</p>
      ) : (
        <ul>
          {exerciseLogs.map((entry, index) => (
            <li key={index}>
              <strong>{entry.date}</strong>
              <p>운동 종류: {entry.exercise}</p>
              <p>운동 시간: {entry.duration} 분</p>
              <p>운동 강도: {entry.intensity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExerciseLogApp;
