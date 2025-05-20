export default function TimeSelector({ currentMealTime, onSelect, labels }) {
    return (
      <div className="time-selector">
        {['breakfast', 'lunch', 'dinner'].map((time) => (
          <button
            key={time}
            onClick={() => onSelect(time)}
            className={`time-button ${currentMealTime === time ? 'active' : ''}`}
          >
            {labels[time]}
          </button>
        ))}
      </div>
    );
  }
  