import React from 'react';
import '../styles/Header.css';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import RefreshLink from '../components/RefreshLink/RefreshLink';
import { useAuth } from '../pages/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, username, logout } = useAuth();

  const goToLogin = () => {
    console.log('로그인 페이지로 이동');
    navigate('/login');
  };

  const goToRegister = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    console.log('회원가입 페이지로 이동');
    navigate('/register');
  };

  const refreshPage = () => {
    window.location.href = '/'; // 새로고침
  };

  const handleLogout = () => {
    // 전역 상태 관리를 통한 로그아웃
    logout();
    navigate('/'); // 메인 페이지로 이동
  };

  return (
    <div className="header-container">
      {/* 메인 헤더 */}
      <div className="main-header">
        <div className="main-header-container">
          {/* 로고 */}
          <div className="logo" onClick={refreshPage}>
            <img src={logo} alt="오늘 뭐먹지?" />
          </div>

          {/* 검색 */}
          <div className="search-container">
            <input
              type="text"
              placeholder="건강한 식단을 검색해보세요"
            />
            <button type="submit">검색</button>
          </div>

          {/* 아이콘 */}
          <div className="icons">
            <div className="login-menu">
              {isLoggedIn ? (
                <>
                  <span className="welcome-text">{username}님 환영합니다!</span>
                  <span className="divider">|</span>
                  <span className="logout-text" onClick={handleLogout}>로그아웃</span>
                </>
              ) : (
                <>
                  <span className="login-text" onClick={goToLogin}>로그인</span>
                  <span className="divider">|</span>
                  <span className="register-text" onClick={goToRegister}>회원가입</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 하단 카테고리 메뉴 */}
      <div className="category-menu">
        <div>
          <div className="first-category-button">
            카테고리
          </div>
          <nav className="nav-menu">
            <RefreshLink to="/MealTrackerApp">식단 일지</RefreshLink>
            <RefreshLink to="/WorkoutTrackerApp">운동 일지</RefreshLink>
            <RefreshLink to="/health-calculators">건강 계산기</RefreshLink>
            <RefreshLink to="/today-menu">오늘의 메뉴!</RefreshLink>
            <RefreshLink to="/community-board">자유 게시판</RefreshLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;