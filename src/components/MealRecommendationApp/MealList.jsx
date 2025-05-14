import MealItem from './MealItem';

export default function MealList({ meals, isLoading, mealCount = 6 }) {

  if (!isLoading && meals.length === 0) {
    return <div className="no-meals">추천할 메뉴가 없습니다.</div>;
  }
  
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
              name={meal.name || meal.foodname}
              description={meal.description}
              calories={meal.calories || meal.kcal}
              meal={meal}  // 전체 meal 객체도 props로 전달
            />
          ))}
    </div>
  );
}