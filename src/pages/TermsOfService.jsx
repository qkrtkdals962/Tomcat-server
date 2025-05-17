import { useState } from 'react';
import '../styles/TermsOfService.css';

export default function TermsOfService() {
  const [activeTab, setActiveTab] = useState('terms');
  
  return (
    <div className="terms-container">
      {/* 탭 네비게이션 */}
      <div className="tabs-header">
        <button
          className={`tab-button ${activeTab === 'terms' ? 'active' : ''}`}
          onClick={() => setActiveTab('terms')}
        >
          이용약관
        </button>
        <button
          className={`tab-button ${activeTab === 'privacy' ? 'active' : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          개인정보처리방침
        </button>
      </div>
      
      {/* 컨텐츠 영역 */}
      <div className="content-area">
        {activeTab === 'terms' ? (
          <TermsContent />
        ) : (
          <PrivacyContent />
        )}
      </div>
    </div>
  );
}

// 이용약관 내용 컴포넌트
function TermsContent() {
  const sections = [
    {
      title: "제 1 조 (목적)",
      content: "이 약관은 회사가 제공하는 서비스의 이용조건 및 절차, 회사와 회원 간의 권리, 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로 합니다."
    },
    {
      title: "제 2 조 (용어의 정의)",
      content: "이 약관에서 사용하는 용어의 정의는 다음과 같습니다.\n1. '서비스'란 회사가 제공하는 모든 서비스를 의미합니다.\n2. '회원'이란 이 약관에 동의하고 서비스 이용 신청을 하여 회사와 이용계약을 체결한 자를 말합니다.\n3. '아이디(ID)'란 회원 식별과 회원의 서비스 이용을 위하여 회원이 선정하고 회사가 승인하는 문자와 숫자의 조합을 말합니다."
    },
    {
      title: "제 3 조 (약관의 효력 및 변경)",
      content: "1. 회사는 이 약관의 내용을 회원이 알 수 있도록 서비스 초기 화면에 게시합니다.\n2. 회사는 약관의 규제에 관한 법률, 전자거래기본법, 전자서명법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 전자상거래 등에서의 소비자보호에 관한 법률 등 관련법을 위반하지 않는 범위에서 이 약관을 개정할 수 있습니다.\n3. 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 서비스 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다."
    },
    {
      title: "제 4 조 (이용계약의 체결)",
      content: "1. 이용계약은 회원이 되고자 하는 자(이하 '가입신청자')가 약관의 내용에 대하여 동의를 한 다음 회원가입신청을 하고 회사가 이러한 신청에 대하여 승낙함으로써 체결됩니다.\n2. 회사는 가입신청자의 신청에 대하여 서비스 이용을 승낙함을 원칙으로 합니다. 다만, 회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않거나 사후에 이용계약을 해지할 수 있습니다."
    },
    {
      title: "제 5 조 (서비스 이용)",
      content: "1. 회사는 회원에게 아이디를 부여하고 서비스를 제공합니다.\n2. 회원은 회사가 정한 서비스 이용시간 내에서 언제든지 서비스를 이용할 수 있습니다. 다만, 회사는 서비스 개선, 정기점검 등을 이유로 서비스 제공을 일시적으로 중단할 수 있습니다."
    }
  ];
  
  return (
    <div className="terms-content">
      <h1 className="page-title">이용약관</h1>
      <p className="intro-text">
        본 이용약관은 회사가 제공하는 모든 서비스의 이용조건 및 절차에 관한 사항과 기타 필요한 사항을 규정함을 목적으로 합니다.
        서비스를 이용하시기 전에 반드시 본 약관을 숙지하여 주시기 바랍니다.
      </p>
      
      <div className="sections">
        {sections.map((section, index) => (
          <div key={index} className="section">
            <h2 className="section-title">{section.title}</h2>
            <p className="section-content">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// 개인정보처리방침 내용 컴포넌트
function PrivacyContent() {
  const sections = [
    {
      title: "1. 개인정보 수집 항목",
      content: "회사는 회원가입, 상담, 서비스 신청 등을 위해 아래와 같은 개인정보를 수집하고 있습니다.\n- 수집항목: 이름, 생년월일, 성별, 로그인ID, 비밀번호, 자택 전화번호, 휴대전화번호, 이메일, 서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보 등"
    },
    {
      title: "2. 개인정보 수집 및 이용목적",
      content: "회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다.\n- 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산\n- 회원 관리: 회원제 서비스 이용에 따른 본인확인, 개인식별, 불량회원의 부정 이용 방지와 비인가 사용 방지, 가입 의사 확인, 불만처리 등 민원처리, 고지사항 전달\n- 마케팅 및 광고에 활용: 이벤트 등 광고성 정보 전달"
    },
    {
      title: "3. 개인정보의 보유 및 이용기간",
      content: "회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계법령의 규정에 의하여 보존할 필요가 있는 경우 회사는 아래와 같이 관계법령에서 정한 일정한 기간 동안 회원정보를 보관합니다.\n- 보존 항목: 로그인 기록\n- 보존 근거: 통신비밀보호법\n- 보존 기간: 3개월"
    },
    {
      title: "4. 개인정보의 파기절차 및 방법",
      content: "회사는 원칙적으로 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 파기절차 및 방법은 다음과 같습니다.\n- 파기절차: 회원이 회원가입 등을 위해 입력한 정보는 목적이 달성된 후 별도의 DB로 옮겨져 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라 일정 기간 저장된 후 파기됩니다.\n- 파기방법: 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다."
    },
    {
      title: "5. 개인정보 제공",
      content: "회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다.\n- 이용자들이 사전에 동의한 경우\n- 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우"
    }
  ];
  
  return (
    <div className="terms-content">
      <h1 className="page-title">개인정보처리방침</h1>
      <p className="intro-text">
        회사는 이용자의 개인정보보호를 매우 중요시하며, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 
        개인정보보호법 등 개인정보보호 관련 법률 및 규정을 준수하고 있습니다.
      </p>
      
      <div className="sections">
        {sections.map((section, index) => (
          <div key={index} className="section">
            <h2 className="section-title">{section.title}</h2>
            <p className="section-content">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}