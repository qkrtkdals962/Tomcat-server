import React from 'react';
import '../styles/RightSidebar.css';
import { FaLightbulb, FaHistory, FaAd } from 'react-icons/fa';

const RightSidebar = () => {
  // 실제 앱에서는 이 데이터들이 API 등에서 가져온 데이터일 것입니다.
  const healthTips = [
    {
      id: 1,
      title: '물 자주 마시기',
      content: '하루에 적어도 2리터의 물을 마시면 신진대사가 활발해지고 포만감을 느낄 수 있습니다.'
    },
    {
      id: 2,
      title: '간식 대신 과일',
      content: '단 음식이나 과자가 먹고 싶을 때 과일로 대체하면 칼로리 섭취를 줄일 수 있습니다.'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: '게시글',
      title: '오늘 처음 시작한 HIIT 운동',
      author: '건강한하루',
      time: '10분 전'
    },
    {
      id: 2,
      type: '댓글',
      title: '저도 그 레시피 해봤는데 정말 맛있었어요!',
      author: '식단관리중',
      time: '30분 전'
    },
    {
      id: 3,
      type: '식단',
      title: '오늘의 저녁: 닭가슴살 샐러드',
      author: '단백질왕',
      time: '1시간 전'
    }
  ];

  return (
    <aside className="right-sidebar">
      <section className="sidebar-section tips-section">
        <h2><FaLightbulb /> 오늘의 건강 팁</h2>
        <div className="tips-list">
          {healthTips.map(tip => (
            <div className="tip-card" key={tip.id}>
              <h3>{tip.title}</h3>
              <p>{tip.content}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sidebar-section recent-activities">
        <h2><FaHistory /> 최근 활동</h2>
        <div className="activities-list">
          {recentActivities.map(activity => (
            <div className="activity-item" key={activity.id}>
              <div className="activity-badge">
                {activity.type}
              </div>
              <div className="activity-content">
                <div className="activity-title">{activity.title}</div>
                <div className="activity-meta">
                  <span className="activity-author">{activity.author}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
          <a href="#" className="view-all">모든 활동 보기</a>
        </div>
      </section>

      <section className="sidebar-section ad-section">
        <h2><FaAd /> 추천 제품</h2>
        <div className="ad-banner">
          <div className="ad-content">
            <h3>건강한 단백질 쉐이크</h3>
            <p>100% 천연 원료로 만든 프리미엄 단백질 보충제</p>
            <a href="#" className="ad-button">자세히 보기</a>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;