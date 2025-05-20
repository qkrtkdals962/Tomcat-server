import React, { useState } from 'react';
import '../styles/LeftSidebar.css';
import { FaFilter, FaBook, FaPencilAlt, FaBullhorn, FaCarrot, FaDumbbell } from 'react-icons/fa';

const LeftSidebar = () => {
  const [dietCategoryOpen, setDietCategoryOpen] = useState(false);
  const [exerciseCategoryOpen, setExerciseCategoryOpen] = useState(false);
  
  const toggleDietCategory = () => {
    setDietCategoryOpen(!dietCategoryOpen);
  };
  
  const toggleExerciseCategory = () => {
    setExerciseCategoryOpen(!exerciseCategoryOpen);
  };

  return (
    <aside className="left-sidebar">
      <section className="sidebar-section categories">
        <h2><FaFilter /> 카테고리 필터</h2>
        
        <div className="category-group">
          <div className="category-header" onClick={toggleDietCategory}>
            <FaCarrot />
            <span>식단 카테고리</span>
            <span className={`arrow ${dietCategoryOpen ? 'open' : ''}`}>▼</span>
          </div>
          
          {dietCategoryOpen && (
            <ul className="category-list">
              <li><a href="#">저칼로리 식단</a></li>
              <li><a href="#">고단백 식단</a></li>
              <li><a href="#">채식 식단</a></li>
              <li><a href="#">간편 식단</a></li>
              <li><a href="#">다이어트 식단</a></li>
            </ul>
          )}
        </div>
        
        <div className="category-group">
          <div className="category-header" onClick={toggleExerciseCategory}>
            <FaDumbbell />
            <span>운동 카테고리</span>
            <span className={`arrow ${exerciseCategoryOpen ? 'open' : ''}`}>▼</span>
          </div>
          
          {exerciseCategoryOpen && (
            <ul className="category-list">
              <li><a href="#">유산소 운동</a></li>
              <li><a href="#">근력 운동</a></li>
              <li><a href="#">스트레칭</a></li>
              <li><a href="#">홈트레이닝</a></li>
              <li><a href="#">헬스장 운동</a></li>
            </ul>
          )}
        </div>
      </section>

      <section className="sidebar-section my-activities">
        <h2><FaBook /> 내 활동 관리</h2>
        <ul className="activity-list">
          <li><a href="#">내 식단 기록</a></li>
          <li><a href="#">내 운동 기록</a></li>
          <li><a href="#">나의 게시글</a></li>
          <li><a href="#">나의 댓글</a></li>
        </ul>
      </section>

      <section className="sidebar-section notice-board">
        <h2><FaBullhorn /> 공지사항</h2>
        <div className="notice-list">
          <a href="#" className="notice-item">
            <span className="notice-title">5월 건강 챌린지 안내</span>
            <span className="notice-date">2025-05-01</span>
          </a>
          <a href="#" className="notice-item">
            <span className="notice-title">새로운 식단 추천 기능 오픈!</span>
            <span className="notice-date">2025-04-28</span>
          </a>
          <a href="#" className="notice-item">
            <span className="notice-title">휴무 안내</span>
            <span className="notice-date">2025-04-20</span>
          </a>
        </div>
      </section>
    </aside>
  );
};

export default LeftSidebar;