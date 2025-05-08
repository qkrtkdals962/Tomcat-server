import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Register.css';

const Register = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요';
    }
    
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '유효한 이메일 형식이 아닙니다';
    }
    
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '이용약관에 동의해주세요';
    }
    
    return newErrors;
  };

  const moveToNextStep = () => {
    const newErrors = validateStep1();
    
    if (Object.keys(newErrors).length === 0) {
      setStep(2);
    } else {
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateStep2();
    
    if (Object.keys(newErrors).length === 0) {
      onRegister(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>회원가입</h1>
          <p>새로운 계정을 만들어 시작하세요</p>
        </div>
        
        <div className="register-steps">
          <div className={`step ${step === 1 ? 'active' : 'completed'}`}>
            <div className="step-number">1</div>
            <div className="step-title">기본 정보</div>
          </div>
          <div className={`step-line ${step === 2 ? 'active' : ''}`}></div>
          <div className={`step ${step === 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-title">계정 설정</div>
          </div>
        </div>
        
        <form className="register-form">
          {step === 1 ? (
            <div className="step-content">
              <div className="form-group">
                <label htmlFor="name">이름</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <div className="error-message">{errors.name}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
              </div>
              
              <button 
                type="button" 
                className="next-button"
                onClick={moveToNextStep}
              >
                다음
              </button>
            </div>
          ) : (
            <div className="step-content">
              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="비밀번호를 입력하세요 (8자 이상)"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
              </div>
              
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className={errors.agreeTerms ? 'error' : ''}
                />
                <label htmlFor="agreeTerms">
                  <a href="#" className="terms-link">이용약관</a> 및 <a href="#" className="terms-link">개인정보 처리방침</a>에 동의합니다
                </label>
                {errors.agreeTerms && <div className="error-message">{errors.agreeTerms}</div>}
              </div>
              
              <div className="step-buttons">
                <button 
                  type="button" 
                  className="back-button"
                  onClick={() => setStep(1)}
                >
                  이전
                </button>
                <button 
                  type="button" 
                  className="register-button"
                  onClick={handleSubmit}
                >
                  가입하기
                </button>
              </div>
            </div>
          )}
        </form>
        
        <div className="login-link">
          <p>이미 계정이 있으신가요? <Link to="/login">로그인</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;