
# 🤖 Gemini API 명세서

본 문서는 Gemini API 연동 기능을 제공하는 백엔드 서버의 API 명세서입니다.  
서버 기본 주소: `http://localhost:8080`

---

## ✅ Gemini 질문 API

### 1. ❓ 질문 요청

- **Method:** `POST`
- **URL:** `/ask-gemini`
- **설명:** 사용자가 입력한 질문을 Google Gemini API에 전달하고 응답을 받아옵니다.
- **요청 헤더:**
  - `Content-Type: application/json`
- **요청 바디 예시:**
```json
"Spring Boot란?"
```
- **응답 예시:**
```json
"Spring Boot는 Java 기반의 프레임워크로, 복잡한 설정 없이 빠르게 웹 애플리케이션을 개발할 수 있게 해줍니다."
```
- **응답 코드:** `200 OK`

---

## 📌 내부 처리 방식
|단계|설명|
|---|---|
|1|사용자가 보낸 질문 문자열을 Google Gemini API에 POST 요청으로 전달|
|2|API 응답에서 후보(candidates) 중 첫 번째 응답의 텍스트 부분 추출|
|3|텍스트만 사용자에게 응답|

---

## ⚠️ 예외 처리
|상황|메시지|
|---|---|
|API 오류 발생|`"Gemini 요청 중 오류 발생: {에러메시지}"`|

---

## 🔐 환경 변수

`application.yml` 또는 `application.properties`에 다음과 같이 설정되어야 합니다:
```yaml
gemini:
  api:
    key: YOUR_API_KEY
```

---

## ✍️ 작성자
- 작성자: 김현진
- 설명: Google Gemini API와 연동하는 Spring Boot REST 컨트롤러
