# NimdaCon API - Postman 사용 가이드

**Base URL (개발 환경)**: `http://localhost:8080`

---

## 📋 목차
1. [인증 API](#1-인증-api)
2. [사용자 API](#2-사용자-api)
3. [문제 API](#3-문제-api)
4. [채점 API](#4-채점-api)
5. [스터디 그룹 API](#5-스터디-그룹-api)
6. [테스트 API](#6-테스트-api)

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

**필수 필드:**
- `userId`: 로그인 아이디 (3-20자, 고유값)
- `userName`: 사용자명 (3-20자, 고유값)
- `password`: 비밀번호 (4-100자)
- `email`: 이메일 (유효한 이메일 형식, 고유값)

**선택 필드:**
- `universityName`: 대학교명
- `department`: 학과/학부
- `grade`: 학년

**성공 응답** (201 Created):
```json
{
  "id": 1,
  "userId": "testuser",
  "userName": "테스트유저",
  "email": "test@example.com",
  "universityName": "서울대학교",
  "department": "컴퓨터공학부",
  "grade": "3학년"
}
```

**에러 응답** (400 Bad Request):
```json
{
  "message": "User ID already exists"
}
```

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

**성공 응답** (200 OK):
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "userId": "testuser",
    "userName": "테스트유저",
    "email": "test@example.com"
  }
}
```

**에러 응답** (401 Unauthorized):
```json
{
  "message": "Invalid user ID or password"
}
```

**⚠️ 중요**: 로그인 후 받은 `accessToken`을 Postman 환경 변수나 Collection 변수에 저장하세요.

---

## 2. 사용자 API (`/api/users`)

### 2.1 모든 사용자 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/users`
- **Headers**: 없음

**성공 응답** (200 OK):
```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "userId": "testuser",
      "userName": "테스트유저",
      "email": "test@example.com",
      "universityName": "서울대학교",
      "department": "컴퓨터공학부",
      "grade": "3학년"
    }
  ]
}
```

---

### 2.2 사용자 ID로 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/users/{id}`
- **Path Variables**: 
  - `id`: 사용자 고유 ID (예: `1`)

**성공 응답** (200 OK):
```json
{
  "id": 1,
  "userId": "testuser",
  "userName": "테스트유저",
  "email": "test@example.com",
  "universityName": "서울대학교",
  "department": "컴퓨터공학부",
  "grade": "3학년"
}
```

**에러 응답** (404 Not Found):
```json
{
  "message": "User not found"
}
```

---

### 2.3 User ID로 조회 (로그인 아이디)
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/users/user-id/{userId}`
- **Path Variables**: 
  - `userId`: 로그인 아이디 (예: `testuser`)

**성공 응답** (200 OK):
```json
{
  "id": 1,
  "userId": "testuser",
  "userName": "테스트유저",
  "email": "test@example.com"
}
```

---

### 2.4 닉네임으로 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/users/userName/{userName}`
- **Path Variables**: 
  - `userName`: 사용자명 (예: `테스트유저`)

**성공 응답** (200 OK):
```json
{
  "id": 1,
  "userId": "testuser",
  "userName": "테스트유저",
  "email": "test@example.com"
}
```

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

**필수 필드:**
- `title`: 문제 제목 (최대 200자)
- `description`: 문제 설명 (최대 10000자)
- `timeLimit`: 시간 제한 (밀리초, 양수)
- `memoryLimit`: 메모리 제한 (KB, 양수)
- `difficulty`: 난이도 (`EASY`, `MEDIUM`, `HARD`)
- `language`: 프로그래밍 언어 (`Java`, `C++17` 등)

**선택 필드:**
- `groupId`: 스터디 그룹 ID (null이면 전역 문제)
- `testCases`: 테스트 케이스 목록
  - `input`: 테스트케이스 입력 (필수)
  - `output`: 테스트케이스 출력 (필수)
  - `isPublic`: 프론트엔드 공개 여부 (선택, 기본값: `false`)
    - `true`: 프론트엔드에 공개 (사용자가 볼 수 있음)
    - `false`: 백엔드 전용 (채점용, 사용자에게 숨김)

**성공 응답** (201 Created):
```json
{
  "success": true,
  "message": "문제가 성공적으로 생성되었습니다",
  "problem": {
    "id": 1,
    "title": "A + B",
    "description": "두 정수 A와 B를 입력받아 A+B를 출력하는 프로그램을 작성하시오.",
    "timeLimit": 5000,
    "memoryLimit": 262144,
    "difficulty": "EASY",
    "language": "Java"
  }
}
```

---

### 3.2 모든 문제 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/problems`
- **Headers**: 없음

**성공 응답** (200 OK):
```json
{
  "success": true,
  "problems": [
    {
      "id": 1,
      "title": "A + B",
      "description": "...",
      "timeLimit": 5000,
      "memoryLimit": 262144,
      "difficulty": "EASY",
      "language": "Java"
    }
  ]
}
```

---

### 3.3 문제 ID로 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/problems/{id}`
- **Path Variables**: 
  - `id`: 문제 ID (예: `1`)

**성공 응답** (200 OK):
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
  }
}
```

---

### 3.4 문제 삭제
- **Method**: `DELETE`
- **URL**: `http://localhost:8080/api/problems/{id}`
- **Path Variables**: 
  - `id`: 문제 ID (예: `1`)

**성공 응답** (200 OK):
```json
{
  "success": true,
  "message": "문제가 성공적으로 삭제되었습니다"
}
```

---

### 3.5 그룹별 문제 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/problems/group/{groupId}`
- **Path Variables**: 
  - `groupId`: 그룹 ID (예: `1`)

**성공 응답** (200 OK):
```json
{
  "success": true,
  "problems": [...]
}
```

---

### 3.6 전역 문제 조회 (그룹에 속하지 않은 문제)
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/problems/global`
- **Headers**: 없음

**성공 응답** (200 OK):
```json
{
  "success": true,
  "problems": [...]
}
```

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

**필수 필드:**
- `title`: 문제 제목
- `code`: 소스코드
- `language`: 프로그래밍 언어 (`Java`, `C++17`)

**선택 필드:**
- `problemId`: 문제 ID
- `description`: 설명

**성공 응답** (200 OK):
```json
{
  "success": true,
  "message": "채점이 완료되었습니다.",
  "result": {
    "status": "ACCEPTED",
    "message": "제출 ID: 1 - 모든 테스트케이스를 통과했습니다!",
    "output": "",
    "errorOutput": "",
    "executionTime": 0,
    "memoryUsage": 0,
    "score": 100
  },
  "submittedBy": "테스트유저",
  "submissionId": 1
}
```

**채점 상태 (Status):**
- `ACCEPTED`: 정답
- `WRONG_ANSWER`: 오답
- `TIME_LIMIT_EXCEEDED`: 시간 초과
- `MEMORY_LIMIT_EXCEEDED`: 메모리 초과
- `RUNTIME_ERROR`: 런타임 에러
- `COMPILATION_ERROR`: 컴파일 에러
- `SYSTEM_ERROR`: 시스템 에러

---

### 4.2 지원 언어 목록 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/judge/languages`
- **Headers**: 없음

**성공 응답** (200 OK):
```json
{
  "success": true,
  "languages": ["Java", "C++17"],
  "message": "지원하는 언어 목록입니다."
}
```

---

### 4.3 채점 시스템 상태 확인
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/judge/status`
- **Headers**: 없음

**성공 응답** (200 OK):
```json
{
  "success": true,
  "compilers": {
    "java": true,
    "g++": true
  },
  "message": "채점 시스템이 정상 작동 중입니다."
}
```

---

### 4.4 모든 제출 목록 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/judge/submissions`
- **Headers**: 없음

**성공 응답** (200 OK):
```json
{
  "success": true,
  "message": "제출 목록을 성공적으로 조회했습니다.",
  "submissions": [
    {
      "id": 1,
      "code": "...",
      "language": "JAVA",
      "status": "ACCEPTED",
      "submittedAt": "2024-01-01T00:00:00",
      "problemId": 1,
      "problemTitle": "A + B",
      "userName": "테스트유저",
      "executionTime": 100,
      "memoryUsage": 1024,
      "score": 100
    }
  ],
  "totalCount": 1
}
```

---

### 4.5 사용자별 제출 목록 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/judge/submissions/user/{userName}`
- **Path Variables**: 
  - `userName`: 사용자명 (예: `테스트유저`)

**성공 응답** (200 OK):
```json
{
  "success": true,
  "message": "사용자 '테스트유저'의 제출 목록을 성공적으로 조회했습니다.",
  "submissions": [...],
  "totalCount": 5
}
```

---

### 4.6 테스트 채점 (테스트용)
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/judge/test`
- **Headers**: 없음
- **Body**: 없음

**성공 응답** (200 OK):
```json
{
  "success": true,
  "message": "테스트 채점이 완료되었습니다.",
  "result": {...}
}
```

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

**필수 필드:**
- `groupName`: 그룹 이름 (최대 100자)
- `maxMembers`: 최대 인원수 (양수, 최대 1000)
- `creatorUserId`: 생성자 사용자 ID

**선택 필드:**
- `participationCode`: 참여 코드 (최대 20자)
  - **생략 시 자동 생성됨** (8자리 대문자+숫자 조합, 예: `AB12CD34`)
- `isPublic`: 공개 여부 (기본값: false)

**성공 응답** (201 Created):
```json
{
  "groupId": 1,
  "groupName": "알고리즘 스터디",
  "maxMembers": 10,
  "currentMembers": 1,
  "participationCode": "STUDY2024",
  "isPublic": false,
  "createdAt": "2024-01-01T00:00:00"
}
```

---

### 5.2 모든 스터디 그룹 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/groups`
- **Headers**: 없음

**성공 응답** (200 OK):
```json
[
  {
    "groupId": 1,
    "groupName": "알고리즘 스터디",
    "maxMembers": 10,
    "currentMembers": 5,
    "participationCode": "STUDY2024",
    "isPublic": false,
    "createdAt": "2024-01-01T00:00:00"
  }
]
```

---

### 5.3 그룹에 멤버 추가
- **Method**: `POST`
- **URL**: `http://localhost:8080/api/groups/{groupId}/members`
- **Path Variables**: 
  - `groupId`: 그룹 ID (예: `1`)
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

**필수 필드:**
- `userId`: 사용자 ID

**선택 필드:**
- `role`: 역할 (`MEMBER`, `ADMIN`, 기본값: `MEMBER`)
- `participationCode`: 참여 코드

**성공 응답** (201 Created):
```json
{
  "groupId": 1,
  "userId": 2,
  "role": "MEMBER",
  "joinedAt": "2024-01-01T00:00:00"
}
```

---

### 5.4 그룹 멤버 조회
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/groups/{groupId}/members`
- **Path Variables**: 
  - `groupId`: 그룹 ID (예: `1`)

**성공 응답** (200 OK):
```json
[
  {
    "groupId": 1,
    "userId": 1,
    "role": "ADMIN",
    "joinedAt": "2024-01-01T00:00:00"
  },
  {
    "groupId": 1,
    "userId": 2,
    "role": "MEMBER",
    "joinedAt": "2024-01-01T00:00:00"
  }
]
```

---

---

### 5.5 스터디 그룹 탈퇴
- **Method**: `DELETE`
- **URL**: `http://localhost:8080/api/groups/{groupId}/members/{userId}`
- **Path Variables**: 
  - `groupId`: 그룹 ID (예: `1`)
  - `userId`: 탈퇴할 사용자 ID (예: `2`)

**성공 응답** (204 No Content):
- 응답 본문 없음

**동작 설명:**
1. **일반 멤버 탈퇴**:
   - 그룹 멤버십이 비활성화됩니다 (Soft Delete).
   - `leftAt` 필드에 탈퇴 시간이 기록됩니다.
2. **그룹장 탈퇴**:
   - **그룹 전체가 삭제됩니다** (Hard Delete).
   - 연관된 모든 멤버십 데이터도 함께 삭제됩니다.

---

## 6. 테스트 API

### 6.1 테스트 API
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/test`
- **Headers**: 없음

**성공 응답** (200 OK):
```
Test API is working!
```

---

### 6.2 테스트 문제 API
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/test/problems`
- **Headers**: 없음

**성공 응답** (200 OK):
```
Test Problems API is working!
```

---

### 6.3 인증 테스트 API
- **Method**: `GET`
- **URL**: `http://localhost:8080/api/authTest/hello`
- **Headers**: 없음

**성공 응답** (200 OK):
```
hello
```

---

### 6.4 홈 API
- **Method**: `GET`
- **URL**: `http://localhost:8080/`
- **Headers**: 없음

**성공 응답** (200 OK):
```json
{
  "message": "Algorithm Contest Platform API",
  "status": "running"
}
```

---

### 6.5 API 정보
- **Method**: `GET`
- **URL**: `http://localhost:8080/api`
- **Headers**: 없음

**성공 응답** (200 OK):
```json
{
  "message": "Algorithm Contest Platform API",
  "version": "1.0.0"
}
```

---

## 📝 Postman 사용 팁

### 1. 환경 변수 설정
Postman에서 환경(Environment)을 생성하고 다음 변수를 설정하세요:
- `base_url`: `http://localhost:8080`
- `token`: 로그인 후 받은 `accessToken`

### 2. 인증이 필요한 API
Authorization 헤더에 다음을 추가:
```
Authorization: Bearer {{token}}
```

### 3. 테스트 순서 권장사항
1. **회원가입** (`POST /api/auth/register`)
2. **로그인** (`POST /api/auth/login`) → `accessToken` 저장
3. **문제 생성** (`POST /api/problems`)
4. **코드 제출** (`POST /api/judge/submit`)
5. **제출 목록 확인** (`GET /api/judge/submissions`)

### 4. 주의사항
- `userId`와 `userName`은 모두 고유값이므로 중복 불가
- 패스워드는 최소 4자 이상, 최대 100자 이하여야 함
- 로그인 시 `userId`를 사용 (닉네임이 아님)
- 난이도는 `EASY`, `MEDIUM`, `HARD` 중 하나
- 언어는 `Java`, `C++17` 등 지원되는 언어만 사용

### 5. Postman Collection 생성
다음과 같이 Collection을 구성하면 편리합니다:
```
NimdaCon API
├── 인증
│   ├── 회원가입
│   └── 로그인
├── 사용자
│   ├── 모든 사용자 조회
│   ├── 사용자 ID로 조회
│   ├── User ID로 조회
│   └── 닉네임으로 조회
├── 문제
│   ├── 문제 생성
│   ├── 모든 문제 조회
│   ├── 문제 ID로 조회
│   ├── 문제 삭제
│   ├── 그룹별 문제 조회
│   └── 전역 문제 조회
├── 채점
│   ├── 코드 제출
│   ├── 지원 언어 조회
│   ├── 시스템 상태 확인
│   ├── 모든 제출 목록
│   ├── 사용자별 제출 목록
│   └── 테스트 채점
└── 스터디 그룹
    ├── 그룹 생성
    ├── 모든 그룹 조회
    ├── 멤버 추가
    ├── 멤버 조회
    └── 그룹 탈퇴
```

---

## 🔧 문제 해결

### 에러 코드
- **400 Bad Request**: 잘못된 요청 데이터
- **401 Unauthorized**: 인증 실패
- **404 Not Found**: 리소스를 찾을 수 없음
- **500 Internal Server Error**: 서버 오류

### 자주 발생하는 문제
1. **토큰 만료**: 로그인을 다시 수행하여 새로운 토큰을 받으세요
2. **중복된 userId/userName**: 다른 값을 사용하세요
3. **유효성 검사 실패**: 필수 필드와 형식을 확인하세요

---

**마지막 업데이트**: 2024-11-18

