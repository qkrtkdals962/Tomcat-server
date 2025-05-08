import React from 'react';
import '../styles/Header.css';
import logo from '../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import RefreshLink  from '../components/RefreshLink/RefreshLink';

const Header = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    console.log('로그인 페이지로 이동');
    navigate('/login');
  };
  
  const goToSignup = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    console.log('회원가입 페이지로 이동');
    navigate('/signup');
  };

  const refreshPage = () => {
    window.location.href = '/'; // 새로고침
  };
  
  return (
    <header className="header">
      <div className="logo" onClick={refreshPage} style={{ cursor: 'pointer' }}>
          <img src={logo} alt="오늘 뭐먹지?" />
      </div>
      <nav className="nav-menu">
        <RefreshLink to="/diet-log">식단 일지</RefreshLink>
        <RefreshLink to="/exercise-log">운동 일지</RefreshLink>
        <RefreshLink to="/health-calculators">건강 계산기</RefreshLink>
        <RefreshLink to="/today-menu">오늘의 메뉴!</RefreshLink>
        <RefreshLink to="/community-board">자유 게시판</RefreshLink>
      </nav>
      <div className="icons">
        <div className="login-menu">
          <span className="login-text" onClick={goToLogin}>로그인</span>
          <span className="divider">|</span>
          <span className="signup-text" onClick={goToSignup}>회원가입</span>
        </div>
      </div>
    </header>
  );
};

export default Header;