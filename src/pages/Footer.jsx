import React from 'react';
import '../styles/Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section sitemap">
          <h3>사이트맵</h3>
          <ul>
            <li><a href="/">홈</a></li>
            <li><a href="/diet-log">식단일지</a></li>
            <li><a href="/exercise-log">운동일지</a></li>
            <li><a href="/health-calculators">건강 계산기</a></li>
            <li><a href="/today-menu">오늘의 메뉴</a></li>
            <li><a href="/community-board">자유 게시판</a></li>
          </ul>
        </div>
        
        <div className="footer-section support">
          <h3>고객지원</h3>
          <ul>
            <li><a href="/faq">자주 묻는 질문</a></li>
            <li><a href="/contact">문의하기</a></li>
            <li><a href="/terms">이용약관</a></li>
            <li><a href="/privacy">개인정보처리방침</a></li>
          </ul>
        </div>
        
        <div className="footer-section social">
          <h3>소셜 미디어</h3>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <FaFacebookF />
            </a>
            <a href="#" className="social-icon">
              <FaInstagram />
            </a>
            <a href="#" className="social-icon">
              <FaTwitter />
            </a>
            <a href="#" className="social-icon">
              <FaYoutube />
            </a>
          </div>
          <p className="contact-info">
            이메일: support@healthydiet.com<br />
            전화: 02-123-4567
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 오늘 뭐먹지? All Rights Reserved.</p>
        <p className="developer-info">Developed by 헬시코딩</p>
      </div>
    </footer>
  );
};

export default Footer;