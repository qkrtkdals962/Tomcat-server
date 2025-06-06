import React from 'react';
import '../styles/Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = ({ marginTop = 0 }) => {
  return (
    <footer className="footer" style={{ marginTop: `${marginTop}px` }}>
      <div className="footer-container">
        <div className="footer-section sitemap">
          <h3>사이트맵</h3>
          <ul>
            <li><a href="/">홈</a></li>
            <li><a href="/MealTrackerApp">식단일지</a></li>
            <li><a href="/WorkoutTrackerApp">운동일지</a></li>
            <li><a href="/health-calculators">건강 계산기</a></li>
            <li><a href="/today-menu">오늘의 메뉴</a></li>
            <li><a href="/community-board">자유 게시판</a></li>
          </ul>
        </div>
        
        <div className="footer-section support">
          <h3>고객지원</h3>
          <ul>
            <li><a href="/FAQ">자주 묻는 질문</a></li>
            <li><a href="/ContactForm">문의하기</a></li>
            <li><a href="/terms">이용약관</a></li>
            <li><a href="/PrivacyPolicy">개인정보처리방침</a></li>
          </ul>
        </div>
        
        <div className="footer-section social">
          <h3>소셜 미디어</h3>
          <div className="social-icons">
            <a href="#" className="social-icon"><FaFacebookF /></a>
            <a href="#" className="social-icon"><FaInstagram /></a>
            <a href="#" className="social-icon"><FaTwitter /></a>
            <a href="#" className="social-icon"><FaYoutube /></a>
          </div>
          <p className="contact-info">
            이메일: chlgk12345@naver.com<br />
            전화: 010-5235-0038
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 오늘 뭐먹지? All Rights Reserved.</p>
        <p className="developer-info">Developed by TcTeam</p>
      </div>
    </footer>
  );
};

export default Footer;
