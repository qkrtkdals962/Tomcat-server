import React from 'react';

function MealItem({ name, description, calories, meal }) {
  // API에서 받은 데이터 구조 사용
  return (
    <div className="meal-item">
      <h3 className="meal-title">{name}</h3>
      {description && <p className="meal-description">{description}</p>}
      <p className="meal-calories">{calories} kcal</p>
      
      {/* 영양소 정보를 별도로 표시하고 싶다면 아래 코드 주석 해제 */}
      {/* {meal && (
        <div className="nutrients-grid">
          <p>탄수화물: {meal.car}g</p>
          <p>단백질: {meal.protein}g</p>
          <p>지방: {meal.fat}g</p>
        </div>
      )} */}
    </div>
  );
}

export default MealItem;