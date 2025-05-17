import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',   // username -> email로 변경
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    }
    
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:8080/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: formData.email,   // username이 아닌 email로 전송
            password: formData.password
          }),
        });
        
        const data = await response.json();
        
        if (data.message === '로그인 성공') {
          setLoginMessage('로그인 성공! 로그인 중...');
          
          if (formData.rememberMe) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('email', formData.email);
          } else {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('email', formData.email);
          }

          setTimeout(() => {
            navigate('/');
          }, 1500);
        } else {
          setLoginMessage('로그인 실패. 이메일과 비밀번호를 확인해주세요.');
        }
      } catch (error) {
        console.error('로그인 오류:', error);
        setLoginMessage('서버 연결 오류. 잠시 후 다시 시도해주세요.');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>로그인</h1>

        {loginMessage && (
          <div className={`message ${loginMessage.includes('성공') ? 'success' : 'error'}`}>
            {loginMessage}
          </div>
        )}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="이메일을 입력하세요"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="rememberMe"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              <label htmlFor="rememberMe">로그인 상태 유지</label>
            </div>
            <a href="#" className="forgot-password">비밀번호 찾기</a>
          </div>
          
          <button type="submit" className="login-button">로그인</button>
        </form>

        <div className="register-link">
          <p>계정이 없으신가요? <Link to="/register">회원가입</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
