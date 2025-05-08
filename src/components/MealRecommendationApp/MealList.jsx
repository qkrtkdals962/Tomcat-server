import MealItem from './MealItem';

export default function MealList({ meals, isLoading, mealCount = 6 }) {
  return (
    <div className="meals-grid">
      {isLoading
        ? [...Array(mealCount)].map((_, index) => (
            <div key={index} className="meal-skeleton">
              <div className="skeleton-title"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-text"></div>
              <div className="skeleton-calories"></div>
            </div>
          ))
        : meals.map((meal, index) => (
            <MealItem
              key={index}
              name={meal.name}
              description={meal.description}
              calories={meal.calories}
            />
          ))}
    </div>
  );
}
