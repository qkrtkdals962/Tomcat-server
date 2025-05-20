import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: '',
    subject: '',
    message: '',
    file: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 여기에 폼 제출 로직 구현
    // 실제로는 서버로 데이터를 전송하는 코드가 필요합니다
    alert('문의가 접수되었습니다. 감사합니다!');
    
    // 폼 초기화
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiry: '',
      subject: '',
      message: '',
      file: null
    });
  };

  // 스타일을 컴포넌트 내부에 정의하여 스코프 제한
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '50px auto',
      padding: '30px',
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
      fontFamily: "'Noto Sans KR', sans-serif",
      color: '#333',
      lineHeight: '1.6'
    },
    header: {
      textAlign: 'center',
      marginBottom: '30px'
    },
    title: {
      fontSize: '32px',
      color: '#333',
      marginBottom: '10px'
    },
    description: {
      color: '#666',
      marginBottom: '20px'
    },
    form: {
      display: 'grid',
      gap: '20px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    label: {
      fontWeight: '600',
      marginBottom: '8px',
      color: '#444'
    },
    required: {
      '::after': {
        content: '" *"',
        color: '#e74c3c'
      }
    },
    input: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '16px',
      transition: 'border-color 0.3s'
    },
    textarea: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '16px',
      minHeight: '150px',
      resize: 'vertical',
      transition: 'border-color 0.3s'
    },
    select: {
      padding: '12px',
      border: '1px solid #ddd',
      borderRadius: '6px',
      fontSize: '16px',
      transition: 'border-color 0.3s'
    },
    button: {
      padding: '14px 20px',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '10px'
    },
    contactInfo: {
      marginTop: '40px',
      paddingTop: '30px',
      borderTop: '1px solid #eee'
    },
    contactInfoTitle: {
      fontSize: '24px',
      marginBottom: '15px'
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px'
    },
    icon: {
      marginRight: '10px',
      width: '20px',
      textAlign: 'center',
      color: '#4caf50'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>문의하기</h1>
        <p style={styles.description}>궁금한 점이나 요청사항이 있으시면 아래 양식을 작성해 주세요. 빠른 시일 내에 답변 드리겠습니다.</p>
      </header>
      
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={{...styles.label, ...styles.required}}>이름</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="email" style={{...styles.label, ...styles.required}}>이메일</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="phone" style={styles.label}>전화번호</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="inquiry" style={{...styles.label, ...styles.required}}>문의 유형</label>
          <select
            id="inquiry"
            name="inquiry"
            value={formData.inquiry}
            onChange={handleChange}
            style={styles.select}
            required
          >
            <option value="" disabled>문의 유형을 선택해주세요</option>
            <option value="general">일반 문의</option>
            <option value="product">제품 관련</option>
            <option value="service">서비스 관련</option>
            <option value="partnership">제휴 문의</option>
            <option value="other">기타</option>
          </select>
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="subject" style={{...styles.label, ...styles.required}}>제목</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="message" style={{...styles.label, ...styles.required}}>문의 내용</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            style={styles.textarea}
            required
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="file" style={styles.label}>첨부 파일</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        
        <button type="submit" style={styles.button}>문의하기</button>
      </form>
      
      <div style={styles.contactInfo}>
        <h2 style={styles.contactInfoTitle}>추가 연락처</h2>
        <div style={styles.contactItem}>
          <div style={styles.icon}>📞</div>
          <div>010-5235-0038 (평일 9:00 - 18:00)</div>
        </div>
        <div style={styles.contactItem}>
          <div style={styles.icon}>✉️</div>
          <div>chlgk12345@naver.com</div>
        </div>
        <div style={styles.contactItem}>
          <div style={styles.icon}>🏢</div>
          <div>부산광역시 해운대구 반여로 67</div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;