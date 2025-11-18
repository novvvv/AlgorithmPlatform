# NimdaCon API 문서

**Base URL**: `http://localhost:80` (또는 서버 주소)

---

## 1. 인증 API (`/api/auth`)

### 1.1 회원가입
- **Method**: `POST`
- **URL**: `/api/auth/register`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "userId": "testuser",
  "nickname": "테스트유저",
  "password": "password1234",
  "email": "test@example.com",
  "universityName": "서울대학교",
  "department": "컴퓨터공학부",
  "grade": "3학년"
}
```

**필드 설명:**
- `userId`: 로그인 아이디 (필수, 3-20자, 고유값, 변경 불가)
- `nickname`: 닉네임 (필수, 3-20자, 고유값, 변경 가능)
- `password`: 비밀번호 (필수, 4-100자)
- `email`: 이메일 (필수, 유효한 이메일 형식, 고유값)
- `universityName`: 대학교명 (선택, 최대 100자)
- `department`: 학과/학부 (선택, 최대 100자)
- `grade`: 학년 (선택, 최대 20자)

- **Response**: `201 Created`
```json
{
  "id": 1,
  "userId": "testuser",
  "nickname": "테스트유저",
  "email": "test@example.com",
  "universityName": "서울대학교",
  "department": "컴퓨터공학부",
  "grade": "3학년"
}
```

**에러 응답:**
- `400 Bad Request`: User ID, Nickname, Email 중복 또는 유효성 검사 실패
```json
{
  "message": "User ID already exists"
}
```

### 1.2 로그인
- **Method**: `POST`
- **URL**: `/api/auth/login`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "userId": "testuser",
  "password": "password1234"
}
```

**필드 설명:**
- `userId`: 로그인 아이디 (필수, 3-20자)
- `password`: 비밀번호 (필수, 4-100자)

- **Response**: `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "userId": "testuser",
    "nickname": "테스트유저",
    "email": "test@example.com"
  }
}
```

**에러 응답:**
- `401 Unauthorized`: 잘못된 아이디 또는 비밀번호
```json
{
  "message": "Invalid user ID or password"
}
```

---

## 2. 사용자 API (`/api/users`)

### 2.1 모든 사용자 조회
- **Method**: `GET`
- **URL**: `/api/users`
- **Response**: `200 OK`
```json
{
  "success": true,
  "users": [
    {
      "id": 1,
      "userId": "testuser",
      "nickname": "테스트유저",
      "email": "test@example.com",
      "universityName": "서울대학교",
      "department": "컴퓨터공학부",
      "grade": "3학년"
    }
  ]
}
```

### 2.2 사용자 ID로 조회
- **Method**: `GET`
- **URL**: `/api/users/{id}`
- **Path Variables**: `id` (Long) - 사용자 고유 ID
- **Response**: `200 OK`
```json
{
  "id": 1,
  "userId": "testuser",
  "nickname": "테스트유저",
  "email": "test@example.com",
  "universityName": "서울대학교",
  "department": "컴퓨터공학부",
  "grade": "3학년"
}
```

### 2.3 User ID로 조회 (로그인 아이디)
- **Method**: `GET`
- **URL**: `/api/users/user-id/{userId}`
- **Path Variables**: `userId` (String) - 로그인 아이디
- **Response**: `200 OK`
```json
{
  "id": 1,
  "userId": "testuser",
  "nickname": "테스트유저",
  "email": "test@example.com"
}
```

### 2.4 닉네임으로 조회
- **Method**: `GET`
- **URL**: `/api/users/nickname/{nickname}`
- **Path Variables**: `nickname` (String) - 닉네임
- **Response**: `200 OK`
```json
{
  "id": 1,
  "userId": "testuser",
  "nickname": "테스트유저",
  "email": "test@example.com"
}
```

---

## 3. 문제 API (`/api/problems`)

### 3.1 문제 생성
- **Method**: `POST`
- **URL**: `/api/problems`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
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
      "output": "3"
    },
    {
      "input": "5 7",
      "output": "12"
    }
  ]
}
```

**필드 설명:**
- `title`: 문제 제목 (필수, 최대 200자)
- `description`: 문제 설명 (필수, 최대 10000자)
- `timeLimit`: 시간 제한 (필수, 밀리초, 양수)
- `memoryLimit`: 메모리 제한 (필수, KB, 양수)
- `difficulty`: 난이도 (필수, EASY/MEDIUM/HARD)
- `language`: 프로그래밍 언어 (필수)
- `groupId`: 스터디 그룹 ID (선택, null이면 전역 문제)
- `testCases`: 테스트 케이스 목록 (선택)

- **Response**: `201 Created`
```json
{
  "success": true,
  "message": "문제가 성공적으로 생성되었습니다",
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

### 3.2 모든 문제 조회
- **Method**: `GET`
- **URL**: `/api/problems`
- **Response**: `200 OK`
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

### 3.3 문제 ID로 조회
- **Method**: `GET`
- **URL**: `/api/problems/{id}`
- **Path Variables**: `id` (Long)
- **Response**: `200 OK`
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

### 3.4 문제 삭제
- **Method**: `DELETE`
- **URL**: `/api/problems/{id}`
- **Path Variables**: `id` (Long)
- **Response**: `200 OK`
```json
{
  "success": true,
  "message": "문제가 성공적으로 삭제되었습니다"
}
```

### 3.5 그룹별 문제 조회
- **Method**: `GET`
- **URL**: `/api/problems/group/{groupId}`
- **Path Variables**: `groupId` (Long)
- **Response**: `200 OK`
```json
{
  "success": true,
  "problems": [...]
}
```

### 3.6 전역 문제 조회 (그룹에 속하지 않은 문제)
- **Method**: `GET`
- **URL**: `/api/problems/global`
- **Response**: `200 OK`
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
- **URL**: `/api/judge/submit`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer {token}` (선택사항)
- **Request Body**:
```json
{
  "title": "A + B",
  "code": "import java.util.Scanner;\npublic class Solution {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int a = sc.nextInt();\n        int b = sc.nextInt();\n        System.out.println(a + b);\n    }\n}",
  "language": "Java",
  "problemId": 1,
  "description": "문제를 해결하는 프로그램을 작성하시오."
}
```

**필드 설명:**
- `title`: 문제 제목 (필수)
- `code`: 소스코드 (필수)
- `language`: 프로그래밍 언어 (필수, "Java" 또는 "C++17"/"cpp")
- `problemId`: 문제 ID (선택)
- `description`: 설명 (선택)

- **Response**: `200 OK`
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

**채점 상태 (Status)**:
- `ACCEPTED`: 정답
- `WRONG_ANSWER`: 오답
- `TIME_LIMIT_EXCEEDED`: 시간 초과
- `MEMORY_LIMIT_EXCEEDED`: 메모리 초과
- `RUNTIME_ERROR`: 런타임 에러
- `COMPILATION_ERROR`: 컴파일 에러
- `SYSTEM_ERROR`: 시스템 에러

### 4.2 지원 언어 목록 조회
- **Method**: `GET`
- **URL**: `/api/judge/languages`
- **Response**: `200 OK`
```json
{
  "success": true,
  "languages": ["Java", "C++17"],
  "message": "지원하는 언어 목록입니다."
}
```

### 4.3 채점 시스템 상태 확인
- **Method**: `GET`
- **URL**: `/api/judge/status`
- **Response**: `200 OK`
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

### 4.4 모든 제출 목록 조회
- **Method**: `GET`
- **URL**: `/api/judge/submissions`
- **Response**: `200 OK`
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
      "username": "테스트유저",
      "executionTime": 100,
      "memoryUsage": 1024,
      "score": 100
    }
  ],
  "totalCount": 1
}
```

### 4.5 사용자별 제출 목록 조회
- **Method**: `GET`
- **URL**: `/api/judge/submissions/user/{nickname}`
- **Path Variables**: `nickname` (String) - 사용자 닉네임
- **Response**: `200 OK`
```json
{
  "success": true,
  "message": "사용자 '테스트유저'의 제출 목록을 성공적으로 조회했습니다.",
  "submissions": [...],
  "totalCount": 5
}
```

### 4.6 테스트 채점 (테스트용)
- **Method**: `POST`
- **URL**: `/api/judge/test`
- **Response**: `200 OK`
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
- **URL**: `/api/groups`
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "groupName": "알고리즘 스터디",
  "maxMembers": 10,
  "participationCode": "STUDY2024",
  "isPublic": false,
  "creatorUserId": 1
}
```

**필드 설명:**
- `groupName`: 그룹 이름 (필수, 최대 100자)
- `maxMembers`: 최대 인원수 (필수, 양수, 최대 1000)
- `participationCode`: 참여 코드 (선택, 최대 20자)
- `isPublic`: 공개 여부 (선택, 기본값: false)
- `creatorUserId`: 생성자 사용자 ID (필수)

- **Response**: `201 Created`
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

### 5.2 모든 스터디 그룹 조회
- **Method**: `GET`
- **URL**: `/api/groups`
- **Response**: `200 OK`
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

### 5.3 그룹에 멤버 추가
- **Method**: `POST`
- **URL**: `/api/groups/{groupId}/members`
- **Path Variables**: `groupId` (Long)
- **Headers**: `Content-Type: application/json`
- **Request Body**:
```json
{
  "userId": 2,
  "role": "MEMBER",
  "participationCode": "STUDY2024"
}
```

**필드 설명:**
- `userId`: 사용자 ID (필수)
- `role`: 역할 (선택, MEMBER/ADMIN, 기본값: MEMBER)
- `participationCode`: 참여 코드 (선택)

- **Response**: `201 Created`
```json
{
  "groupId": 1,
  "userId": 2,
  "role": "MEMBER",
  "joinedAt": "2024-01-01T00:00:00"
}
```

### 5.4 그룹 멤버 조회
- **Method**: `GET`
- **URL**: `/api/groups/{groupId}/members`
- **Path Variables**: `groupId` (Long)
- **Response**: `200 OK`
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

## 공통 정보

### Difficulty (난이도)
- `EASY`: 쉬움
- `MEDIUM`: 보통
- `HARD`: 어려움

### Language (언어)
- `Java`
- `C++17` 또는 `cpp`

### GroupRole (그룹 역할)
- `ADMIN`: 관리자
- `MEMBER`: 일반 멤버

### 인증
- JWT 토큰이 필요한 API는 `Authorization: Bearer {token}` 헤더를 포함해야 합니다.
- 로그인 API에서 받은 `accessToken`을 사용합니다.

### 사용자 필드 설명
- `userId`: 로그인 아이디 (변경 불가, 고유값)
- `nickname`: 닉네임 (변경 가능, 고유값, 표시용)
- `password`: 비밀번호 (4-100자)
- `email`: 이메일 (고유값)
- `universityName`: 대학교명 (선택)
- `department`: 학과/학부 (선택)
- `grade`: 학년 (선택)

---

## Postman 테스트 팁

1. **환경 변수 설정**:
   - `base_url`: `http://localhost:80`
   - `token`: 로그인 후 받은 `accessToken`

2. **인증이 필요한 API**:
   - Headers에 `Authorization: Bearer {{token}}` 추가

3. **테스트 순서**:
   1. 회원가입 (`/api/auth/register`)
      ```json
      {
        "userId": "testuser",
        "nickname": "테스트유저",
        "password": "password1234",
        "email": "test@example.com"
      }
      ```
   2. 로그인 (`/api/auth/login`) → `accessToken` 저장
      ```json
      {
        "userId": "testuser",
        "password": "password1234"
      }
      ```
   3. 문제 생성 (`/api/problems`)
   4. 코드 제출 (`/api/judge/submit`)
   5. 제출 목록 확인 (`/api/judge/submissions`)

4. **주의사항**:
   - `userId`와 `nickname`은 모두 고유값이므로 중복 불가
   - 패스워드는 최소 4자 이상, 최대 100자 이하여야 함
   - 로그인 시 `userId`를 사용 (닉네임이 아님)
