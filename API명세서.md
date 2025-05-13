# 📘 게시판 API 명세서

본 문서는 게시판 기능을 제공하는 백엔드 서버의 API 명세서입니다.  
서버 기본 주소: `http://localhost:8080`

---

## ✅ 게시글 API

### 1. 📥 게시글 전체 조회

- **Method:** `GET`
- **URL:** `/board`
- **설명:** 등록된 모든 게시글을 리스트로 조회합니다.
- **요청 파라미터:** 없음
- **응답 예시:**
```json
[
  {
    "id": 1,
    "title": "오늘 식단 공유",
    "content": "현미밥과 닭가슴살을 먹었어요",
    "authorName": "user123",
    "date": "2025-05-13 16:30:45",
    "upvotes": 12,
    "downvotes": 1,
    "views": 85
  }
]
```
- **응답 코드: `200 OK`
---
## 2. 📝 게시글 작성
- **Method:** `POST`
- **URL:** `/board`
- **설명:** 새로운 게시글을 생성합니다.
- **요청 바디 예시:**
```json
[
  {
    "title": "제목입니다",
    "content": "내용입니다",
    "authorName": "작성자이름",
    "upvotes": 0,
    "downvotes": 0,
    "views": 0
  }
]
```
- **응답 예시:**
```json
[
  {
    "id": 3,
    "title": "제목입니다",
    "content": "내용입니다",
    "authorName": "작성자이름",
    "date": "2025-05-13 17:04:22",
    "upvotes": 0,
    "downvotes": 0,
    "views": 0
  }
]
```
- **응답 코드:** `201 Created` (또는 `200 OK`)
---
## 📌 엔티티 구조 (Post)
|필드명|타입|설명|
|---|---|---|
|`id`|Integer|게시글 고유 ID (자동 생성)|
|`title`|String|게시글 제목|
|`content`|String|게시글 본문 내용|
|`authorName`|String|작성자 이름|
|`date`|LocalDateTime|생성일시 `yyyy-MM-dd hh:mm:ss` (자동 생성)|
|`upvotes`|Integer|추천 수|
|`downvotes`|Integer|비추천 수|
|`views`|Integer|조회 수|
---
## 🧾 응답 코드 설명
|코드|의미|
|---|---|
|`200 OK`|요청 성공, 데이터 반환|
|`201 Created`|새 리소스 생성 완료|
|`400 Bad Request`|잘못된 요청 (파라미터 누략 등)|
|`500 Internal Server Error`|서버 내부 오류|
---
## ✍️ 작성자
- 작성자: 김현진
- 프로젝트: Spring Boot 의 Tomcat-server 기반 게시판 서비스
