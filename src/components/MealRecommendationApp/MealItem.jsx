export default function MealItem({ name, description, calories }) {
    return (
      <div className="meal-card">
        <h3 className="meal-name">{name}</h3>
        <p className="meal-description">{description}</p>
        <div className="meal-calories">
          <span>{calories} 칼로리</span>
        </div>
      </div>
    );
  }
  