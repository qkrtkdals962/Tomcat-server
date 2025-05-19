# 🤖 Gemini API 명세서

## 📌 개요
클라이언트에서 Gemini API(OpenAI의 ChatGPT와 유사한 Google의 LLM)를 호출하기 위한 중계용 API입니다. 
프론트엔드는 이 API를 통해 질문을 보내고, Gemini로부터의 응답을 전달받습니다.

---

## ✅ 1. Gemini 질문 요청

| 항목 | 내용 |
|------|------|
| **URL** | `POST /ask-gemini` |
| **설명** | 사용자의 질문을 Gemini API로 전달하고 응답 텍스트를 반환합니다. |
| **CORS 허용** | `http://localhost:3000` |
| **요청 헤더** | `Content-Type: application/json` |
| **요청 바디 타입** | `String` (질문 내용만 포함된 단순 텍스트) |

### 📤 요청 예시
```
Spring Boot란 무엇인가요?
```

---

## ✅ 응답

| 항목 | 설명 |
|------|------|
| **응답 형식** | `String` (Gemini의 첫 번째 응답 텍스트) |
| **HTTP 코드** | `200 OK` (정상 응답) <br> `500` (에러 발생 시 에러 메시지 반환) |

### 📥 응답 예시
```
Spring Boot는 자바 기반의 프레임워크로, 스프링 애플리케이션을 빠르고 쉽게 만들 수 있게 도와줍니다...
```

---

## ❗ 오류 응답 예시

```
Gemini 요청 중 오류 발생: 401 Unauthorized
```

---

## 🔒 보안 관련 사항

| 항목 | 설명 |
|------|------|
| **API Key** | `.yml` 설정 파일에서 `gemini.api.key`로 관리 |
| **실제 요청 주소** | `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=...` |
| **주의사항** | API Key 노출 금지, 환경 변수 또는 비공개 설정 권장 |

---

## 🛠 내부 작동 방식 요약

- 질문(`question`)을 JSON으로 Gemini API 형식에 맞춰 변환
- `RestTemplate`을 사용하여 Google Gemini API에 POST 요청
- 응답 중 첫 번째 후보(candidates[0])의 텍스트만 추출하여 반환
