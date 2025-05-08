import { useState } from 'react';
import '../styles/HealthCalculators.css';

function HealthCalculators() {
  const [activeTab, setActiveTab] = useState('bmr');
  
  // BMR 계산기 상태
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [bmrResult, setBmrResult] = useState(null);
  
  // BMI 계산기 상태
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  
  // BMR 계산 (Mifflin-St Jeor 방정식 사용)
  const calculateBMR = () => {
    if (!height || !weight || !age) return;
    
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age);
    
    let bmr;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }
    
    setBmrResult(Math.round(bmr));
  };
  
  // BMI 계산
  const calculateBMI = () => {
    if (!bmiHeight || !bmiWeight) return;
    
    const h = parseFloat(bmiHeight) / 100; // cm를 m로 변환
    const w = parseFloat(bmiWeight);
    
    const bmi = w / (h * h);
    setBmiResult(bmi.toFixed(1));
    
    // BMI 카테고리 결정
    if (bmi < 18.5) {
      setBmiCategory('저체중');
    } else if (bmi < 23) {
      setBmiCategory('정상');
    } else if (bmi < 25) {
      setBmiCategory('과체중');
    } else if (bmi < 30) {
      setBmiCategory('비만 1단계');
    } else if (bmi < 35) {
      setBmiCategory('비만 2단계');
    } else {
      setBmiCategory('고도비만');
    }
  };
  
  return (
    <div className="calculator-container">
      {/* 탭 네비게이션 */}
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'bmr' ? 'active' : ''}`}
          onClick={() => setActiveTab('bmr')}
        >
          기초대사량 계산기
        </button>
        <button 
          className={`tab-button ${activeTab === 'bmi' ? 'active' : ''}`}
          onClick={() => setActiveTab('bmi')}
        >
          체질량지수(BMI) 계산기
        </button>
      </div>
      
      {/* 설명 박스 */}
      <div className="info-box">
        <p>
          {activeTab === 'bmr' ? 
            '기초대사량(BMR)은 생명을 유지하는데 필요한 최소한의 에너지량으로, 아무것도 하지 않고 하루종일 누워있는 상태에서 소모되는 칼로리입니다.' :
            '체질량지수(BMI)는 체중과 키를 이용하여 지방의 양을 추정하는 방법으로, 비만도를 나타내는 지표로 사용됩니다.'
          }
        </p>
      </div>
      
      {/* BMR 계산기 */}
      {activeTab === 'bmr' && (
        <div className="calculator-panel">
          <div className="input-section">
            <div className="gender-selector">
              <button 
                className={`gender-button male ${gender === 'male' ? 'active' : ''}`}
                onClick={() => setGender('male')}
              >
                남성
              </button>
              <button 
                className={`gender-button female ${gender === 'female' ? 'active' : ''}`}
                onClick={() => setGender('female')}
              >
                여성
              </button>
            </div>
            
            <div className="input-grid">
              <div className="input-group">
                <label>신장 (cm)</label>
                <input 
                  type="number" 
                  placeholder="예: 170"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              
              <div className="input-group">
                <label>체중 (kg)</label>
                <input 
                  type="number" 
                  placeholder="예: 65"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
              
              <div className="input-group">
                <label>나이 (세)</label>
                <input 
                  type="number" 
                  placeholder="예: 30"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="button-container">
            <button 
              className="calculate-button"
              onClick={calculateBMR}
            >
              기초대사량 계산하기
            </button>
          </div>
          
          {bmrResult && (
            <div className="result-container">
              <p className="result-text">
                귀하의 기초대사량(BMR)은 <span className="result-value">{bmrResult}</span> kcal/일 입니다.
              </p>
              <p className="result-description">
                이는 활동 없이 생명 유지에 필요한 최소 에너지량입니다.
              </p>
            </div>
          )}
        </div>
      )}
      
      {/* BMI 계산기 */}
      {activeTab === 'bmi' && (
        <div className="calculator-panel">
          <div className="input-section">
            <div className="input-grid two-columns">
              <div className="input-group">
                <label>신장 (cm)</label>
                <input 
                  type="number" 
                  placeholder="예: 170"
                  value={bmiHeight}
                  onChange={(e) => setBmiHeight(e.target.value)}
                />
              </div>
              
              <div className="input-group">
                <label>체중 (kg)</label>
                <input 
                  type="number" 
                  placeholder="예: 65"
                  value={bmiWeight}
                  onChange={(e) => setBmiWeight(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="button-container">
            <button 
              className="calculate-button"
              onClick={calculateBMI}
            >
              BMI 계산하기
            </button>
          </div>
          
          {bmiResult && (
            <div className="result-container">
              <p className="result-text">
                귀하의 체질량지수(BMI)는 <span className="result-value">{bmiResult}</span> 입니다.
              </p>
              <p className="result-category">
                분류: <span className={`category-value ${
                  bmiCategory === '저체중' ? 'underweight' : 
                  bmiCategory === '정상' ? 'normal' : 
                  bmiCategory === '과체중' ? 'overweight' : 
                  'obese'
                }`}>{bmiCategory}</span>
              </p>
              <p className="result-description">
                * 한국 비만학회 기준을 적용하였습니다.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default HealthCalculators;