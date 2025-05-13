# 🍽️ Food & User API 명세서 (Spring Boot)

## ✅ 공통 정보

- **Base URL**: `http://localhost:8080`
- **데이터 형식**: 요청 및 응답 모두 `application/json`

----

## 👤 사용자 API

### 📌 1. 회원가입 API

- **URL**: `http://localhost:8080/users/register`
- **설명**: 새로운 사용자를 회원가입 처리합니다.

#### 🔸 요청 예시

```json
{
  "username": "testuser",
  "password": "1234"
}
```

#### 🔸 응답 예시

  "회원가입 성공"

======================================================================================================

### 📌 2. 로그인 API

- **URL**: `http://localhost:8080/users/login`
- **설명**: 사용자 계정 정보(username, password)를 기반으로 로그인 요청을 처리합니다.

#### 🔸 요청 예시

```json
{
  "username": "testuser",
  "password": "1234"
}
```
#### 🔸 응답 예시(성공시)

{
  "message": "로그인 성공"
}

#### 🔸 응답 예시(실패시)

{
  "message": "로그인 실패"
}
