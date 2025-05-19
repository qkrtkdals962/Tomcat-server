import React, { createContext, useState, useContext, useEffect } from 'react';

// 전역 컨텍스트 생성
const AuthContext = createContext();

// 컨텍스트 제공자 컴포넌트
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  // 컴포넌트가 마운트될 때 로컬/세션 스토리지 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') || sessionStorage.getItem('isLoggedIn');
      if (loggedIn === 'true') {
        setIsLoggedIn(true);
        const storedUsername = localStorage.getItem('username') || sessionStorage.getItem('username');
        setUsername(storedUsername || '사용자');
      }
    };
    
    checkLoginStatus();
  }, []);

  // 로그인 함수
  const login = (userEmail, rememberMe = false) => {
    const userUsername = userEmail.split('@')[0];
    setIsLoggedIn(true);
    setUsername(userUsername);

    // 스토리지에 상태 저장
    if (rememberMe) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('email', userEmail);
      localStorage.setItem('username', userUsername);
    } else {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('email', userEmail);
      sessionStorage.setItem('username', userUsername);
    }
  };

  // 로그아웃 함수
  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    
    // 스토리지에서 상태 제거
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('username');
  };

  // 공유할 값과 함수 정의
  const value = {
    isLoggedIn,
    username,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 사용하기 쉽게 훅으로 만들기
export const useAuth = () => {
  return useContext(AuthContext);
};