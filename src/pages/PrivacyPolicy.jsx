import { useState } from 'react';
import '../styles/PrivacyPolicy.css';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('collection');
  
  const sections = [
    {
      id: 'collection',
      title: '개인정보 수집',
      icon: '📋'
    },
    {
      id: 'usage',
      title: '개인정보 이용',
      icon: '🔍'
    },
    {
      id: 'protection',
      title: '개인정보 보호',
      icon: '🔒'
    },
    {
      id: 'rights',
      title: '정보주체의 권리',
      icon: '⚖️'
    },
    {
      id: 'cookies',
      title: '쿠키 정책',
      icon: '🍪'
    }
  ];

  return (
    <div className="privacy-container">
      {/* 헤더 섹션 */}
      <div className="privacy-header">
        <h1>개인정보처리방침</h1>
        <p className="last-updated">최종 업데이트: 2025년 5월 17일</p>
      </div>

      {/* 네비게이션 탭 */}
      <div className="privacy-tabs">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`privacy-tab ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => setActiveSection(section.id)}
          >
            <span className="tab-icon">{section.icon}</span>
            <span className="tab-text">{section.title}</span>
          </button>
        ))}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="privacy-content">
        <div className="intro-text">
          회사는 이용자의 개인정보를 중요시하며, 「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 등 
          관련 법령을 준수하고 있습니다. 본 개인정보처리방침을 통해 회사가 수집하는 개인정보의 항목, 수집 및 이용목적, 
          보유 및 이용기간 등을 안내해 드립니다.
        </div>

        {activeSection === 'collection' && <CollectionContent />}
        {activeSection === 'usage' && <UsageContent />}
        {activeSection === 'protection' && <ProtectionContent />}
        {activeSection === 'rights' && <RightsContent />}
        {activeSection === 'cookies' && <CookiesContent />}
      </div>

      {/* 푸터 섹션 */}
      <div className="privacy-footer">
        <p>본 개인정보처리방침에 대한 문의사항이 있으신 경우 언제든지 아래의 연락처로 문의해 주시기 바랍니다.</p>
        <div className="contact-info">
          <p>이메일: chlgk12345@naver.com</p>
          <p>전화번호: 010-5235-0038</p>
        </div>
      </div>
    </div>
  );
}

// 개인정보 수집 내용
function CollectionContent() {
  const items = [
    {
      title: "수집하는 개인정보 항목",
      content: "회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집하고 있습니다:\n\n• 필수항목: 이름, 이메일 주소, 휴대전화번호, 로그인ID, 비밀번호\n• 선택항목: 프로필 이미지, 생년월일, 성별, 직업\n• 서비스 이용 과정에서 수집되는 정보: IP 주소, 쿠키, 방문 일시, 서비스 이용 기록, 불량 이용 기록"
    },
    {
      title: "개인정보 수집 방법",
      content: "회사는 다음과 같은 방법으로 개인정보를 수집합니다:\n\n• 홈페이지 회원가입, 서비스 이용, 이벤트 응모, 고객센터 문의\n• 생성정보 수집 툴을 통한 자동 수집\n• 협력회사로부터의 제공"
    },
    {
      title: "민감정보 수집",
      content: "회사는 원칙적으로 「개인정보 보호법」에서 정하는 민감정보를 수집하지 않습니다. 다만, 서비스 제공을 위해 불가피하게 필요한 경우 별도의 동의를 받아 수집할 수 있습니다."
    },
    {
      title: "법정대리인 동의",
      content: "회사는 만 14세 미만 아동의 개인정보를 수집할 때에는 법정대리인의 동의를 받습니다. 이 경우 회사는 아동에게 법정대리인의 동의를 받기 위한 방법을 제공합니다."
    }
  ];

  return (
    <div className="section-content">
      {items.map((item, index) => (
        <div key={index} className="content-item">
          <h3 className="item-title">{item.title}</h3>
          <p className="item-text">{item.content}</p>
        </div>
      ))}
    </div>
  );
}

// 개인정보 이용 내용
function UsageContent() {
  const items = [
    {
      title: "개인정보의 이용 목적",
      content: "회사는 수집한 개인정보를 다음의 목적을 위해 이용합니다:\n\n• 서비스 제공: 콘텐츠 제공, 맞춤 서비스 제공, 서비스 이용 기록 관리\n• 회원 관리: 회원제 서비스 이용, 본인 확인, 부정 이용 방지, 비인가 사용 방지\n• 마케팅 및 광고: 이벤트 정보 및 참여 기회 제공, 광고성 정보 제공, 서비스 안내"
    },
    {
      title: "개인정보의 제3자 제공",
      content: "회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다. 다만, 다음의 경우에는 예외적으로 제공할 수 있습니다:\n\n• 이용자가 명시적으로 동의한 경우\n• 법령에 의하여 제공이 요구되는 경우\n• 서비스 제공에 따른 요금 정산을 위해 필요한 경우\n• 이용자의 생명이나 안전에 급박한 위험이 있어 이를 해소하기 위한 경우"
    },
    {
      title: "개인정보 처리 위탁",
      content: "회사는 서비스 향상을 위해 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다:\n\n• 결제 처리: (주)페이먼트\n• 서버 관리: (주)클라우드서비스\n• 고객 상담: (주)고객센터\n\n위탁계약 체결 시 「개인정보 보호법」에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적/관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리/감독, 손해배상 등 책임에 관한 사항을 계약서에 명시하고 수탁자의 개인정보 처리 현황을 정기적으로 점검하고 있습니다."
    }
  ];

  return (
    <div className="section-content">
      {items.map((item, index) => (
        <div key={index} className="content-item">
          <h3 className="item-title">{item.title}</h3>
          <p className="item-text">{item.content}</p>
        </div>
      ))}
    </div>
  );
}

// 개인정보 보호 내용
function ProtectionContent() {
  const items = [
    {
      title: "개인정보의 보유 및 이용기간",
      content: "회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 다만, 다음의 정보에 대해서는 관련 법령에 따라 일정 기간 동안 보관합니다:\n\n• 계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의 소비자 보호에 관한 법률)\n• 대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래 등에서의 소비자 보호에 관한 법률)\n• 소비자 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서의 소비자 보호에 관한 법률)\n• 웹사이트 방문기록: 3개월 (통신비밀보호법)"
    },
    {
      title: "개인정보의 파기 절차 및 방법",
      content: "회사는 개인정보 수집 및 이용목적이 달성된 후에는 다음과 같은 절차와 방법에 따라 해당 정보를 파기합니다:\n\n• 파기 절차: 이용자가 제공한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 관련 법령에 따라 일정 기간 저장된 후 파기됩니다.\n• 파기 방법: 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제하며, 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각합니다."
    },
    {
      title: "개인정보의 안전성 확보 조치",
      content: "회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:\n\n• 관리적 조치: 개인정보 취급자 지정 및 교육\n• 기술적 조치: 개인정보처리시스템 접근 제한, 암호화 기술 적용, 보안 프로그램 설치\n• 물리적 조치: 전산실, 자료보관실 등의 접근 통제"
    }
  ];

  return (
    <div className="section-content">
      {items.map((item, index) => (
        <div key={index} className="content-item">
          <h3 className="item-title">{item.title}</h3>
          <p className="item-text">{item.content}</p>
        </div>
      ))}
    </div>
  );
}

// 정보주체의 권리 내용
function RightsContent() {
  const items = [
    {
      title: "정보주체의 권리, 의무 및 행사 방법",
      content: "이용자는 언제든지 자신의 개인정보를 조회하거나 수정할 수 있으며, 개인정보 삭제 및 처리 정지를 요청할 수 있습니다. 이용자의 권리 행사는 다음과 같은 방법으로 가능합니다:\n\n• 개인정보 조회, 수정: '마이페이지 > 개인정보 관리' 메뉴\n• 개인정보 삭제, 처리정지 요청: 고객센터 문의\n\n단, 법령에 따라 보관이 필요한 정보는 요청에 제한이 있을 수 있습니다."
    },
    {
      title: "개인정보 열람 요구",
      content: "이용자는 회사가 처리하는 자신의 개인정보에 대한 열람을 요구할 수 있습니다. 회사는 열람 요구를 받은 날로부터 10일 이내에 이용자에게 해당 개인정보를 열람할 수 있도록 합니다. 단, 다음과 같은 경우에는 법령에 따라 열람이 제한될 수 있습니다:\n\n• 법률에 따라 열람이 금지되거나 제한되는 경우\n• 다른 사람의 생명, 신체, 재산 또는 권익을 해할 우려가 있는 경우"
    },
    {
      title: "정정·삭제 요구",
      content: "이용자는 회사가 처리하는 자신의 개인정보에 대한 정정 또는 삭제를 요구할 수 있습니다. 회사는 정정·삭제 요구를 받은 날로부터 10일 이내에 조치 결과를 이용자에게 통지합니다."
    },
    {
      title: "처리정지 요구",
      content: "이용자는 회사가 처리하는 자신의 개인정보에 대한 처리정지를 요구할 수 있습니다. 회사는 처리정지 요구를 받은 날로부터 10일 이내에 조치 결과를 이용자에게 통지합니다. 단, 다음과 같은 경우에는 법령에 따라 처리정지가 거절될 수 있습니다:\n\n• 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위해 불가피한 경우\n• 다른 사람의 생명, 신체를 해할 우려가 있거나 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우"
    }
  ];

  return (
    <div className="section-content">
      {items.map((item, index) => (
        <div key={index} className="content-item">
          <h3 className="item-title">{item.title}</h3>
          <p className="item-text">{item.content}</p>
        </div>
      ))}
    </div>
  );
}

// 쿠키 정책 내용
function CookiesContent() {
  const items = [
    {
      title: "쿠키의 사용 목적",
      content: "회사는 이용자의 편의를 위해 쿠키를 사용할 수 있습니다. 쿠키는 이용자의 컴퓨터에 저장되는 작은 정보 파일로, 다음과 같은 목적으로 사용됩니다:\n\n• 이용자의 접속 빈도나 방문 시간 분석\n• 이용자의 취향과 관심분야 파악 및 맞춤형 서비스 제공\n• 자동 로그인 기능 제공\n• 서비스 이용 통계 확인"
    },
    {
      title: "쿠키 설정 거부 방법",
      content: "이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 웹 브라우저의 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 모든 쿠키의 저장을 거부할 수 있습니다.\n\n주요 웹 브라우저의 쿠키 설정 방법:\n• Chrome: 설정 > 개인정보 및 보안 > 쿠키 및 기타 사이트 데이터\n• Edge: 설정 > 쿠키 및 사이트 권한 > 쿠키 및 사이트 데이터 관리 및 삭제\n• Safari: 환경설정 > 개인정보 보호 > 쿠키 및 웹사이트 데이터\n\n단, 쿠키 설치를 거부할 경우 일부 서비스 이용에 어려움이 있을 수 있습니다."
    },
    {
      title: "제3자 쿠키",
      content: "회사의 서비스는 제3자(광고 제공업체, 분석 서비스 등)가 제공하는 쿠키를 포함할 수 있습니다. 이러한 쿠키는 이용자의 온라인 활동에 관한 정보를 수집하여 맞춤형 광고를 제공하거나 서비스 사용 분석 등의 목적으로 사용될 수 있습니다.\n\n이용자는 브라우저 설정을 통해 제3자 쿠키의 수신을 거부할 수 있습니다."
    }
  ];

  return (
    <div className="section-content">
      {items.map((item, index) => (
        <div key={index} className="content-item">
          <h3 className="item-title">{item.title}</h3>
          <p className="item-text">{item.content}</p>
        </div>
      ))}
    </div>
  );
}