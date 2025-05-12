import React from 'react';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import MainContent from './MainContent';
import Footer from './Footer';
import '../styles/MainPage.css';

const MainPage = () => {
  return (
    <div className="main-page">
      <div className="content-container">
        <LeftSidebar />
        <MainContent />
        <RightSidebar />
      </div>
      <Footer />
    </div>
  );
};

export default MainPage;