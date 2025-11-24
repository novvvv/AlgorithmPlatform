# NimdaCon API - Postman 테스트 가이드

**Base URL**: `http://localhost:8080`

---

## 📋 목차
1. [인증 API](#1-인증-api)
2. [사용자 API](#2-사용자-api)
3. [문제 API](#3-문제-api)
4. [채점 API](#4-채점-api)
5. [스터디 그룹 API](#5-스터디-그룹-api)
6. [테스트/기타 API](#6-테스트기타-api)

---

## 1. 인증 API (`/api/auth`)

### 1.1 회원가입
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/auth/register`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
```json
{
  "userId": "testuser",
  "userName": "테스트유저",
  "password": "password1234",
  "email": "test@example.com",
  "universityName": "서울대학교",
  "department": "컴퓨터공학부",
  "grade": "3학년"
}
```
- **필수 필드**: `userId`, `userName`, `password`, `email`
- **선택 필드**: `universityName`, `department`, `grade`

---

### 1.2 로그인
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/auth/login`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
```json
{
  "userId": "testuser",
  "password": "password1234"
}
```
- **응답**: `accessToken` 포함 (Postman 변수에 저장 권장)

---

## 2. 사용자 API (`/api/users`)

### 2.1 모든 사용자 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/users`
- **Headers**: 없음

---

### 2.2 사용자 ID로 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/users/{id}`
- **Path Variables**: `id` (Long) - 예: `1`
- **Headers**: 없음

---

### 2.3 User ID로 조회 (로그인 아이디)
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/users/user-id/{userId}`
- **Path Variables**: `userId` (String) - 예: `testuser`
- **Headers**: 없음

---

### 2.4 사용자명으로 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/users/userName/{userName}`
- **Path Variables**: `userName` (String) - 예: `테스트유저`
- **Headers**: 없음

---

## 3. 문제 API (`/api/problems`)

### 3.1 문제 생성
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/problems`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
```json
{
  "title": "A + B",
  "description": "두 정수 A와 B를 입력받아 A+B를 출력하는 프로그램을 작성하시오.",
  "timeLimit": 5000,
  "memoryLimit": 262144,
  "difficulty": "EASY",
  "language": "Java",
  "groupId": null,
  "testCases": [
    {
      "input": "1 2",
      "output": "3",
      "isPublic": false
    },
    {
      "input": "5 7",
      "output": "12",
      "isPublic": true
    }
  ]
}
```
- **필수 필드**: `title`, `description`, `timeLimit`, `memoryLimit`, `difficulty`, `language`
- **선택 필드**: `groupId`, `testCases`
- **난이도**: `EASY`, `MEDIUM`, `HARD`
- **테스트케이스 필드**:
  - `input`: 테스트케이스 입력 (필수)
  - `output`: 테스트케이스 출력 (필수)
  - `isPublic`: 프론트엔드 공개 여부 (선택, 기본값: `false`)
    - `true`: 프론트엔드에 공개 (사용자가 볼 수 있음)
    - `false`: 백엔드 전용 (채점용, 사용자에게 숨김)

---

### 3.2 모든 문제 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/problems`
- **Headers**: 없음

---

### 3.3 문제 ID로 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/problems/{id}`
- **Path Variables**: `id` (Long) - 예: `1`
- **Headers**: 없음
- **응답 예시**:
```json
{
  "success": true,
  "problem": {
    "id": 1,
    "title": "A + B",
    "description": "...",
    "timeLimit": 5000,
    "memoryLimit": 262144,
    "difficulty": "EASY",
    "language": "Java"
  },
  "testCases": [
    {
      "id": 1,
      "input": "1 2",
      "output": "3"
    }
  ]
}
```
- **참고**: 공개된 테스트케이스(`isPublic=true`)만 `testCases` 배열에 포함됨

---

### 3.4 문제 삭제
- **Method**: `DELETE`
- **URL**: `http://localhost:8080/api/problems/{id}`
- **Path Variables**: `id` (Long) - 예: `1`
- **Headers**: 없음

---

### 3.5 그룹별 문제 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/problems/group/{groupId}`
- **Path Variables**: `groupId` (Long) - 예: `1`
- **Headers**: 없음

---

### 3.6 전역 문제 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/problems/global`
- **Headers**: 없음

---

## 4. 채점 API (`/api/judge`)

### 4.1 코드 제출 및 채점
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/judge/submit`
- **Headers**:
  ```
  Content-Type: application/json
  Authorization: Bearer {token}  (선택사항)
  ```
- **Body** (raw JSON):
```json
{
  "title": "A + B",
  "code": "import java.util.Scanner;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}",
  "language": "Java",
  "problemId": 1,
  "description": "문제를 해결하는 프로그램을 작성하시오."
}
```
- **필수 필드**: `title`, `code`, `language`
- **선택 필드**: `problemId`, `description`
- **지원 언어**: `Java`, `C++17`

---

### 4.2 지원 언어 목록 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/judge/languages`
- **Headers**: 없음

---

### 4.3 채점 시스템 상태 확인
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/judge/status`
- **Headers**: 없음

---

### 4.4 모든 제출 목록 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/judge/submissions`
- **Headers**: 없음

---

### 4.5 사용자별 제출 목록 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/judge/submissions/user/{userName}`
- **Path Variables**: `userName` (String) - 예: `테스트유저`
- **Headers**: 없음

---

### 4.6 사용자 ID + 문제 ID별 제출 목록 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/judge/submissions/user/{userId}/problem/{problemId}`
- **Path Variables**: 
  - `userId` (Long) - 예: `2`
  - `problemId` (Long) - 예: `1`
- **Headers**: 없음
- **예시**: `http://localhost:8080/api/judge/submissions/user/2/problem/1`

---

### 4.7 테스트 채점 (테스트용)
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/judge/test`
- **Headers**: 없음
- **Body**: 없음

---

## 5. 스터디 그룹 API (`/api/groups`)

### 5.1 스터디 그룹 생성
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/groups`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
```json
{
  "groupName": "알고리즘 스터디",
  "maxMembers": 10,
  "participationCode": "STUDY2024",
  "isPublic": false,
  "creatorUserId": 1
}
```
- **필수 필드**: `groupName`, `maxMembers`, `creatorUserId`
- **선택 필드**: `participationCode`, `isPublic`

---

### 5.2 모든 스터디 그룹 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/groups`
- **Headers**: 없음

---

### 5.3 그룹에 멤버 추가
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/groups/{groupId}/members`
- **Path Variables**: `groupId` (Long) - 예: `1`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body** (raw JSON):
```json
{
  "userId": 2,
  "role": "MEMBER",
  "participationCode": "STUDY2024"
}
```
- **필수 필드**: `userId`
- **선택 필드**: `role` (기본값: `MEMBER`), `participationCode`
- **역할**: `LEADER`, `MEMBER`
  - `LEADER`: 그룹 리더 (그룹 생성자가 자동으로 LEADER 역할)
  - `MEMBER`: 일반 멤버

---

### 5.4 그룹 멤버 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/groups/{groupId}/members`
- **Path Variables**: `groupId` (Long) - 예: `1`
- **Headers**: 없음

---

## 6. 테스트/기타 API

### 6.1 홈 API
- **Method**: `GET`
- **URL**: `http://localhost:8080/`
- **Headers**: 없음

---

### 6.2 API 정보
- **Method**: `GET`
- **URL**: `http://localhost:8080/api`
- **Headers**: 없음

---

### 6.3 테스트 API
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/test`
- **Headers**: 없음

---

### 6.4 테스트 문제 API
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/test/problems`
- **Headers**: 없음

---

### 6.5 인증 테스트 API
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/authTest/hello`
- **Headers**: 없음

---

## 📝 Postman 사용 팁

### 1. 환경 변수 설정
Postman에서 환경(Environment) 생성:
- `base_url`: `http://localhost:8080`
- `token`: 로그인 후 받은 `accessToken`

### 2. 인증이 필요한 API
Authorization 헤더에 추가:
```
Authorization: Bearer {{token}}
```

### 3. 빠른 테스트 순서
1. **회원가입** → `POST /api/auth/register`
2. **로그인** → `POST /api/auth/login` → `accessToken` 저장
3. **문제 생성** → `POST /api/problems`
4. **코드 제출** → `POST /api/judge/submit`
5. **제출 목록 확인** → `GET /api/judge/submissions`

### 4. 그룹 API 테스트 팁
- **기본 그룹 데이터**: 서버 시작 시 자동으로 3개의 기본 그룹이 생성됩니다:
  - 그룹 1: "알고리즘 기초 스터디" (참여 코드: `ALGO2024`)
  - 그룹 2: "자료구조 심화 스터디" (참여 코드: `DS2024`)
  - 그룹 3: "코딩 테스트 준비반" (참여 코드: `CT2024`, 공개 그룹)
- **그룹 멤버 추가 테스트**: 
  - 기본 사용자 ID: `1` (admin), `2` (anonymous), `3` (seoyun)
  - 예: `POST /api/groups/1/members` - 그룹 1에 사용자 2 추가

### 5. 주의사항
- `userId`와 `userName`은 고유값 (중복 불가)
- 패스워드: 4-100자
- 로그인 시 `userId` 사용 (닉네임 아님)
- 난이도: `EASY`, `MEDIUM`, `HARD` 중 하나
- 언어: `Java`, `C++17` 등 지원 언어만 사용

---

## 🔍 API 요약표

| 카테고리 | Method | URL | 설명 |
|---------|--------|-----|------|
| **인증** | POST | `/api/auth/register` | 회원가입 |
| | POST | `/api/auth/login` | 로그인 |
| **사용자** | GET | `/api/users` | 모든 사용자 조회 |
| | GET | `/api/users/{id}` | 사용자 ID로 조회 |
| | GET | `/api/users/user-id/{userId}` | User ID로 조회 |
| | GET | `/api/users/userName/{userName}` | 사용자명으로 조회 |
| **문제** | POST | `/api/problems` | 문제 생성 |
| | GET | `/api/problems` | 모든 문제 조회 |
| | GET | `/api/problems/{id}` | 문제 ID로 조회 |
| | DELETE | `/api/problems/{id}` | 문제 삭제 |
| | GET | `/api/problems/group/{groupId}` | 그룹별 문제 조회 |
| | GET | `/api/problems/global` | 전역 문제 조회 |
| **채점** | POST | `/api/judge/submit` | 코드 제출 |
| | GET | `/api/judge/languages` | 지원 언어 조회 |
| | GET | `/api/judge/status` | 시스템 상태 확인 |
| | GET | `/api/judge/submissions` | 모든 제출 목록 |
| | GET | `/api/judge/submissions/user/{userName}` | 사용자별 제출 목록 |
| | GET | `/api/judge/submissions/user/{userId}/problem/{problemId}` | 사용자+문제별 제출 목록 |
| | POST | `/api/judge/test` | 테스트 채점 |
| **그룹** | POST | `/api/groups` | 그룹 생성 |
| | GET | `/api/groups` | 모든 그룹 조회 |
| | POST | `/api/groups/{groupId}/members` | 멤버 추가 |
| | GET | `/api/groups/{groupId}/members` | 멤버 조회 |
| **테스트** | GET | `/` | 홈 |
| | GET | `/api` | API 정보 |
| | GET | `/api/test` | 테스트 |
| | GET | `/api/test/problems` | 테스트 문제 |
| | GET | `/api/authTest/hello` | 인증 테스트 |

---

**마지막 업데이트**: 2024-11-20

