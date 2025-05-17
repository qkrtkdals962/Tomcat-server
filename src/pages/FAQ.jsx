import { useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/FAQ.css';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedQuestions, setExpandedQuestions] = useState({});

  // FAQ 카테고리 정의
  const categories = [
    { id: 'all', name: '전체', icon: '📋' },
    { id: 'account', name: '계정 관리', icon: '👤' },
    { id: 'record', name: '식단 일지 작성', icon: '📝' },
    { id: 'service', name: '서비스 이용', icon: '🔍' },
    { id: 'technical', name: '기술 지원', icon: '🔧' },
    { id: 'privacy', name: '개인정보', icon: '🔒' }
  ];

  // FAQ 질문 및 답변 정의
  const faqData = [
    {
      id: 1,
      category: 'account',
      question: '회원가입은 어떻게 하나요?',
      answer: '홈페이지 우측 상단의 "회원가입" 버튼을 클릭하신 후, 필요한 정보를 입력하시면 가입이 완료됩니다. 이메일 인증을 통해 계정을 활성화하셔야 모든 서비스를 이용하실 수 있습니다.'
    },
    {
      id: 2,
      category: 'account',
      question: '아이디와 비밀번호를 잊어버렸어요.',
      answer: '로그인 페이지에서 "아이디/비밀번호 찾기" 링크를 클릭하시면 찾을 수 있습니다. 가입 시 등록한 이메일로 인증 후 아이디 확인 및 비밀번호 재설정이 가능합니다.'
    },
    {
      id: 3,
      category: 'account',
      question: '회원 탈퇴는 어떻게 하나요?',
      answer: '마이페이지 > 계정 설정 > 회원 탈퇴 메뉴에서 진행하실 수 있습니다. 탈퇴 시 모든 개인정보는 즉시 삭제되며, 서비스 이용 기록은 관련 법령에 따라 일정 기간 보관됩니다. 탈퇴 처리 후에는 복구가 불가능하니 신중하게 결정해 주세요.'
    },
    {
      id: 4,
      category: 'record',
      question: '식단 일지를 작성하는 방법은 무엇인가요?',
      answer: '식단 일지는 식단 일지 페이지에서 작성할 수 있습니다. 날짜를 선택하고 아침, 점심, 저녁 식단을 입력한 후 저장 버튼을 클릭하면 해당 날짜의 식단이 기록됩니다. 또한, 음식명과 칼로리, 섭취량을 입력할 수 있으며, 저장된 식단은 언제든지 수정하거나 삭제할 수 있습니다.'
    },
    {
      id: 5,
      category: 'record',
      question: '하루에 여러 개의 식단 일지를 작성할 수 있나요?',
      answer: ' 네, 가능합니다. 같은 날짜에 여러 개의 식단을 추가할 수 있으며, 식단은 시간대(아침, 점심, 저녁, 간식) 별로 구분됩니다. 각 시간대별로 추가된 식단은 리스트 형식으로 관리되며, 개별적으로 확인하거나 수정할 수 있습니다.'
    },
    {
      id: 6, 
      category: 'record',
      question: '작성한 식단을 수정하거나 삭제할 수 있나요?',
      answer: '네, 작성한 식단은 식단 일지 페이지에서 수정 및 삭제할 수 있습니다.'
    },
    {
      id: 7,
      category: 'record',
      question: '지난 일자에 작성한 식단을 다시 확인할 수 있나요?',
      answer: '네, 가능합니다. 식단 일지 페이지에서 날짜를 선택하면 해당 날짜에 작성된 모든 식단이 표시됩니다. 또한, 캘린더 또는 날짜 검색 기능을 통해 특정 날짜의 식단 기록을 빠르게 확인할 수 있습니다.'
    },
    {
      id: 8,
      category: 'service',
      question: '서비스 이용 시간에 제한이 있나요?',
      answer: '기본적으로 365일 24시간 서비스 이용이 가능합니다. 다만, 정기 점검이나 시스템 업데이트로 인해 일시적으로 서비스가 중단될 수 있으며, 이 경우 사전에 공지사항을 통해 안내해 드립니다.'
    },
    {
      id: 9,
      category: 'service',
      question: '동시에 여러 기기에서 로그인할 수 있나요?',
      answer: '하나의 계정으로 최대 3개의 기기에서 동시 접속이 가능합니다. 3개 이상의 기기에서 로그인 시도 시 가장 먼저 로그인한 기기에서 자동으로 로그아웃됩니다.'
    },
    {
      id: 10,
      category: 'technical',
      question: '앱이 자꾸 종료되는 문제가 있어요.',
      answer: '앱이 갑자기 종료되는 문제는 다음과 같은 방법으로 해결할 수 있습니다:\n\n1. 앱을 최신 버전으로 업데이트해 주세요.\n2. 기기를 재부팅해 보세요.\n3. 앱 캐시를 삭제해 보세요.(설정 > 앱 > 해당 앱 > 저장공간 > 캐시 삭제)\n\n위 방법으로도 해결되지 않는 경우, 고객센터로 문의 주시면 보다 상세한 안내를 도와드리겠습니다.'
    },
    {
      id: 11,
      category: 'technical',
      question: '지원하는 브라우저는 무엇인가요?',
      answer: '아직은 제작 단계라 로컬서버로 밖에 지원하지 않습니다.'
    },
    {
      id: 12,
      category: 'privacy',
      question: '개인정보는 어떻게 보호되나요?',
      answer: '회사는 이용자의 개인정보를 안전하게 보호하기 위해 SSL 암호화 통신, 개인정보 접근 제한, 정기적인 보안 점검 등 다양한 보안 조치를 취하고 있습니다. 자세한 내용은 개인정보처리방침을 참고해 주세요.'
    },
    {
      id: 13,
      category: 'privacy',
      question: '개인정보 열람 및 수정은 어떻게 하나요?',
      answer: '마이페이지 > 개인정보 관리 메뉴에서 언제든지 본인의 개인정보를 열람하고 수정하실 수 있습니다. 비밀번호 변경도 같은 메뉴에서 가능합니다.'
    }
  ];

  // 질문 확장 토글 함수
  const toggleQuestion = (id) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // 검색어와 카테고리로 필터링된 FAQ 목록
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>자주 묻는 질문</h1>
        <p className="faq-description">서비스 이용 중 궁금한 점을 빠르게 확인하세요.</p>
        
        {/* 검색 기능 */}
        <div className="search-container">
          <input
            type="text"
            placeholder="질문 검색하기"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 카테고리 탭 */}
      <div className="faq-categories">
        {categories.map(category => (
          <button
            key={category.id}
            className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(category.id)}
          >
            <span className="category-icon">{category.icon}</span>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      {/* FAQ 목록 */}
      <div className="faq-list">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map(faq => (
            <div 
              key={faq.id} 
              className={`faq-item ${expandedQuestions[faq.id] ? 'expanded' : ''}`}
            >
              <div 
                className="faq-question"
                onClick={() => toggleQuestion(faq.id)}
              >
                <span className="question-text">Q. {faq.question}</span>
                <span className="expand-icon">{expandedQuestions[faq.id] ? '−' : '+'}</span>
              </div>
              {expandedQuestions[faq.id] && (
                <div className="faq-answer">
                  <p>A. {faq.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>검색 결과가 없습니다.</p>
            <button 
              className="reset-search"
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
            >
              모든 FAQ 보기
            </button>
          </div>
        )}
      </div>

      {/* 추가 지원 섹션 */}
      <div className="additional-support">
        <h2>원하는 답변을 찾지 못하셨나요?</h2>
        <p>고객센터에 문의하시면 더 자세한 답변을 받으실 수 있습니다.</p>
        <div className="support-options">
          <Link to="/ContactForm" className="support-button email">
            <span className="support-icon">✉️</span>
            <span>이메일 문의</span>
         </Link>
          <Link to="/ContactForm" className="support-button phone">
            <span className="support-icon">📞</span>
            <span>전화 문의</span>
         </Link>
        </div>
      </div>
    </div>
  );
}

