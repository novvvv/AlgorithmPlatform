# 데이터베이스 구조 및 SQL 쿼리 분석 보고서

## 1. 데이터베이스 개요

### 1.1 기술 스택
- **DBMS**: MySQL 8.0
- **ORM**: JPA/Hibernate
- **프레임워크**: Spring Boot 3.2.0
- **연결 방식**: JPA Entity를 통한 객체-관계 매핑

### 1.2 데이터베이스 명명 규칙
- 테이블명: 소문자 + 언더스코어 (snake_case)
- 컬럼명: 소문자 + 언더스코어 (snake_case)
- 외래키: `{참조테이블명}_id` 형식

---

## 2. 테이블 구조 (ERD)

### 2.1 핵심 엔티티 관계도

```
users (사용자)
  ├── 1:N → submissions (제출)
  ├── 1:N → group_memberships (그룹 멤버십)
  ├── 1:N → study_groups (생성한 그룹)
  └── M:N → authority (권한) [중간테이블: user_authorities]

problems (문제)
  ├── 1:N → test_cases (테스트케이스)
  ├── 1:N → submissions (제출)
  └── N:1 → study_groups (소속 그룹)

submissions (제출)
  ├── N:1 → users (사용자)
  ├── N:1 → problems (문제)
  └── 1:1 → judge_results (채점 결과)

study_groups (스터디 그룹)
  ├── 1:N → problems (문제)
  ├── 1:N → group_memberships (멤버십)
  └── N:1 → users (생성자)

group_memberships (그룹 멤버십)
  ├── N:1 → users (사용자)
  └── N:1 → study_groups (그룹)
```

---

## 3. 테이블 상세 구조

### 3.1 users (사용자 테이블)

```sql
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL UNIQUE,        -- 로그인 아이디
    nickname VARCHAR(20) NOT NULL UNIQUE,       -- 사용자명 (표시용)
    password VARCHAR(255) NOT NULL,             -- BCrypt 암호화된 비밀번호
    email VARCHAR(255) NOT NULL UNIQUE,
    university_name VARCHAR(100),               -- 대학교명
    department VARCHAR(100),                   -- 학과/학부
    grade VARCHAR(20),                          -- 학년
    created_at DATETIME,
    updated_at DATETIME,
    username VARCHAR(20) NULL                  -- 하위 호환성 (deprecated)
);
```

**제약조건:**
- `user_id`: UNIQUE, NOT NULL
- `nickname`: UNIQUE, NOT NULL
- `email`: UNIQUE, NOT NULL

**관계:**
- `submissions.user_id` → `users.id` (N:1)
- `group_memberships.user_id` → `users.id` (N:1)
- `study_groups.created_by` → `users.id` (N:1)

---

### 3.2 problems (문제 테이블)

```sql
CREATE TABLE problems (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    time_limit INT,                             -- 시간 제한 (밀리초)
    memory_limit INT,                           -- 메모리 제한 (KB)
    difficulty ENUM('EASY', 'MEDIUM', 'HARD'),
    language VARCHAR(50),                       -- 프로그래밍 언어
    group_id BIGINT,                            -- 소속 그룹 (NULL = 전역 문제)
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (group_id) REFERENCES study_groups(group_id) ON DELETE SET NULL
);
```

**관계:**
- `test_cases.problem_id` → `problems.id` (N:1)
- `submissions.problem_id` → `problems.id` (N:1)
- `problems.group_id` → `study_groups.group_id` (N:1, nullable)

---

### 3.3 test_cases (테스트케이스 테이블)

```sql
CREATE TABLE test_cases (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    problem_id BIGINT NOT NULL,
    input TEXT NOT NULL,                        -- 입력 데이터
    output TEXT NOT NULL,                       -- 예상 출력
    is_public BOOLEAN NOT NULL DEFAULT FALSE,   -- 공개 여부
    created_at DATETIME,
    updated_at DATETIME,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);
```

**관계:**
- `test_cases.problem_id` → `problems.id` (N:1)

**특징:**
- `is_public = true`: 프론트엔드에 공개 (사용자가 볼 수 있음)
- `is_public = false`: 백엔드 전용 (채점용, 사용자에게 숨김)

---

### 3.4 submissions (제출 테이블)

```sql
CREATE TABLE submissions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    problem_id BIGINT NOT NULL,
    code TEXT NOT NULL,                         -- 제출한 소스코드
    language VARCHAR(50) NOT NULL,              -- 사용 언어 (JAVA, CPP 등)
    status VARCHAR(50) NOT NULL,                -- 채점 상태
    submitted_at DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);
```

**관계:**
- `submissions.user_id` → `users.id` (N:1)
- `submissions.problem_id` → `problems.id` (N:1)
- `judge_results.submission_id` → `submissions.id` (1:1)

**채점 상태 (JudgeStatus):**
- `PENDING`: 대기 중
- `JUDGING`: 채점 중
- `ACCEPTED`: 정답
- `WRONG_ANSWER`: 오답
- `TIME_LIMIT_EXCEEDED`: 시간 초과
- `MEMORY_LIMIT_EXCEEDED`: 메모리 초과
- `RUNTIME_ERROR`: 런타임 에러
- `COMPILATION_ERROR`: 컴파일 에러
- `SYSTEM_ERROR`: 시스템 에러

---

### 3.5 judge_results (채점 결과 테이블)

```sql
CREATE TABLE judge_results (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    submission_id BIGINT NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL,
    message VARCHAR(500),
    output TEXT,                                -- 프로그램 출력
    error_output TEXT,                          -- 에러 출력
    execution_time BIGINT,                      -- 실행 시간 (밀리초)
    memory_usage BIGINT,                        -- 메모리 사용량 (바이트)
    score INT DEFAULT 0,                        -- 점수 (0~100, 테스트케이스 통과 비율)
    judged_at DATETIME NOT NULL,
    FOREIGN KEY (submission_id) REFERENCES submissions(id) ON DELETE CASCADE
);
```

**관계:**
- `judge_results.submission_id` → `submissions.id` (1:1)

**점수 계산 방식:**
- `score = (통과한 테스트케이스 개수 / 전체 테스트케이스 개수) * 100`
- 0~100 정수 값으로 반환

---

### 3.6 study_groups (스터디 그룹 테이블)

```sql
CREATE TABLE study_groups (
    group_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    group_name VARCHAR(100) NOT NULL,
    max_members INT NOT NULL,
    participation_code VARCHAR(20) UNIQUE,      -- 참여 코드
    is_public BOOLEAN NOT NULL DEFAULT FALSE,   -- 공개 여부
    created_by BIGINT NOT NULL,                 -- 생성자 ID
    created_at DATETIME NOT NULL,
    updated_at DATETIME,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE RESTRICT
);
```

**관계:**
- `study_groups.created_by` → `users.id` (N:1)
- `problems.group_id` → `study_groups.group_id` (N:1, nullable)
- `group_memberships.group_id` → `study_groups.group_id` (N:1)

---

### 3.7 group_memberships (그룹 멤버십 테이블)

```sql
CREATE TABLE group_memberships (
    membership_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    group_id BIGINT NOT NULL,
    role VARCHAR(20) NOT NULL,                  -- LEADER, MEMBER
    joined_at DATETIME NOT NULL,
    left_at DATETIME,                           -- 탈퇴일 (NULL = 활성 멤버)
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES study_groups(group_id) ON DELETE CASCADE,
    UNIQUE KEY (user_id, group_id)              -- 한 사용자는 한 그룹에 한 번만 가입 가능
);
```

**관계:**
- `group_memberships.user_id` → `users.id` (N:1)
- `group_memberships.group_id` → `study_groups.group_id` (N:1)

**역할 (GroupRole):**
- `LEADER`: 그룹 리더 (그룹 생성자가 자동으로 LEADER)
- `MEMBER`: 일반 멤버

**Soft Delete:**
- `left_at IS NULL`: 활성 멤버
- `left_at IS NOT NULL`: 탈퇴한 멤버 (Soft Delete)

---

### 3.8 authority (권한 테이블)

```sql
CREATE TABLE authority (
    authority_name VARCHAR(50) PRIMARY KEY
);
```

**기본 권한:**
- `ROLE_USER`: 일반 사용자
- `ROLE_ADMIN`: 관리자

---

### 3.9 user_authorities (사용자-권한 중간 테이블)

```sql
CREATE TABLE user_authorities (
    user_id BIGINT NOT NULL,
    authority_name VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id, authority_name),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (authority_name) REFERENCES authority(authority_name) ON DELETE CASCADE
);
```

**관계:**
- M:N 관계 (users ↔ authority)
- 복합 기본키: `(user_id, authority_name)`

---

## 4. JPA 엔티티 매핑 전략

### 4.1 관계 매핑 종류

#### 4.1.1 One-to-Many (1:N)
```java
// User → Submissions
@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
private Set<Submission> submissions;

// StudyGroup → GroupMemberships
@OneToMany(mappedBy = "group", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
private Set<GroupMembership> members;
```

#### 4.1.2 Many-to-One (N:1)
```java
// Submission → User
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "user_id", nullable = false)
private User user;

// Submission → Problem
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "problem_id", nullable = false)
private Problem problem;
```

#### 4.1.3 One-to-One (1:1)
```java
// Submission → JudgeResult
@OneToOne(mappedBy = "submission", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
private JudgeResult judgeResult;

// JudgeResult → Submission
@OneToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "submission_id", nullable = false)
private Submission submission;
```

#### 4.1.4 Many-to-Many (M:N)
```java
// User ↔ Authority
@ManyToMany(fetch = FetchType.LAZY)
@JoinTable(
    name = "user_authorities",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "authority_name")
)
private Set<Authority> authorities;
```

### 4.2 Fetch 전략

**LAZY Loading (지연 로딩):**
- 모든 관계는 `FetchType.LAZY` 사용
- 필요할 때만 관련 데이터 조회
- N+1 문제 방지를 위해 `@Query` 사용

**EAGER Loading (즉시 로딩):**
- 사용하지 않음 (성능 이슈 방지)

---

## 5. 주요 SQL 쿼리 및 JOIN 처리

### 5.1 JPA Repository 메서드 쿼리

#### 5.1.1 기본 쿼리 메서드 (Spring Data JPA)
```java
// 사용자별 제출 기록 조회
List<Submission> findByUserOrderBySubmittedAtDesc(User user);

// 생성되는 SQL:
SELECT * FROM submissions 
WHERE user_id = ? 
ORDER BY submitted_at DESC;
```

#### 5.1.2 @Query 어노테이션을 사용한 JPQL 쿼리

**문제별 테스트케이스 조회:**
```java
@Query("SELECT tc FROM TestCase tc WHERE tc.problem.id = :problemId ORDER BY tc.id")
List<TestCase> findByProblemId(@Param("problemId") Long problemId);

// 생성되는 SQL:
SELECT * FROM test_cases 
WHERE problem_id = ? 
ORDER BY id;
```

**공개된 테스트케이스만 조회:**
```java
@Query("SELECT tc FROM TestCase tc WHERE tc.problem.id = :problemId AND tc.isPublic = true ORDER BY tc.id")
List<TestCase> findByProblemIdAndIsPublicTrue(@Param("problemId") Long problemId);

// 생성되는 SQL:
SELECT * FROM test_cases 
WHERE problem_id = ? AND is_public = true 
ORDER BY id;
```

**그룹별 제출 기록 조회 (JOIN 사용):**
```java
@Query("SELECT s FROM Submission s JOIN GroupMembership gm ON s.user.id = gm.user.id WHERE gm.group.id = :groupId ORDER BY s.submittedAt DESC")
Page<Submission> findByGroupIdOrderBySubmittedAtDesc(@Param("groupId") Long groupId, Pageable pageable);

// 생성되는 SQL:
SELECT s.* FROM submissions s
INNER JOIN group_memberships gm ON s.user_id = gm.user_id
WHERE gm.group_id = ? AND gm.left_at IS NULL
ORDER BY s.submitted_at DESC
LIMIT ? OFFSET ?;
```

**정답률 계산 (집계 함수 사용):**
```java
@Query("SELECT COUNT(jr) * 100.0 / (SELECT COUNT(s) FROM Submission s) FROM JudgeResult jr WHERE jr.status = 'ACCEPTED'")
Double getAcceptanceRate();

// 생성되는 SQL:
SELECT COUNT(jr.id) * 100.0 / (SELECT COUNT(s.id) FROM submissions s)
FROM judge_results jr
WHERE jr.status = 'ACCEPTED';
```

**특정 문제의 정답률 계산 (RIGHT JOIN 사용):**
```java
@Query("SELECT COUNT(jr) * 100.0 / COUNT(s) FROM JudgeResult jr " +
       "RIGHT JOIN jr.submission s WHERE s.problem.id = :problemId AND jr.status = 'ACCEPTED'")
Double getAcceptanceRateByProblem(@Param("problemId") Long problemId);

// 생성되는 SQL:
SELECT COUNT(jr.id) * 100.0 / COUNT(s.id)
FROM judge_results jr
RIGHT JOIN submissions s ON jr.submission_id = s.id
WHERE s.problem_id = ? AND (jr.status = 'ACCEPTED' OR jr.status IS NULL);
```

**평균 실행 시간 계산:**
```java
@Query("SELECT AVG(jr.executionTime) FROM JudgeResult jr WHERE jr.status = 'ACCEPTED'")
Double getAverageExecutionTime();

// 생성되는 SQL:
SELECT AVG(execution_time) 
FROM judge_results 
WHERE status = 'ACCEPTED';
```

### 5.2 JOIN 처리 전략

#### 5.2.1 INNER JOIN
- **사용 위치**: 그룹별 제출 기록 조회
- **예시**: `Submission`과 `GroupMembership` 조인
```sql
SELECT s.* FROM submissions s
INNER JOIN group_memberships gm ON s.user_id = gm.user_id
WHERE gm.group_id = ?;
```

#### 5.2.2 RIGHT JOIN
- **사용 위치**: 정답률 계산 (제출은 있지만 채점 결과가 없는 경우 포함)
- **예시**: `JudgeResult`와 `Submission` 조인
```sql
SELECT COUNT(jr.id) * 100.0 / COUNT(s.id)
FROM judge_results jr
RIGHT JOIN submissions s ON jr.submission_id = s.id
WHERE s.problem_id = ?;
```

#### 5.2.3 LEFT JOIN (JPA 자동 생성)
- **사용 위치**: 엔티티 관계 조회 시 JPA가 자동으로 생성
- **예시**: `Submission` 조회 시 `User`, `Problem` 정보 포함
```sql
SELECT s.*, u.*, p.* 
FROM submissions s
LEFT JOIN users u ON s.user_id = u.id
LEFT JOIN problems p ON s.problem_id = p.id
WHERE s.id = ?;
```

### 5.3 페이징 처리

**Spring Data JPA Pageable 사용:**
```java
Page<Submission> findByUserOrderBySubmittedAtDesc(User user, Pageable pageable);

// 생성되는 SQL:
SELECT * FROM submissions 
WHERE user_id = ? 
ORDER BY submitted_at DESC 
LIMIT ? OFFSET ?;
```

---

## 6. 인덱스 및 성능 최적화

### 6.1 자동 생성 인덱스
- **PRIMARY KEY**: 모든 테이블의 `id` 컬럼
- **UNIQUE KEY**: 
  - `users.user_id`
  - `users.nickname`
  - `users.email`
  - `study_groups.participation_code`
  - `group_memberships(user_id, group_id)` (복합 UNIQUE)

### 6.2 외래키 인덱스
- 모든 외래키 컬럼에 자동으로 인덱스 생성
- 예: `submissions.user_id`, `submissions.problem_id`

### 6.3 쿼리 최적화 전략
1. **LAZY Loading**: 불필요한 데이터 로딩 방지
2. **@Query 사용**: 필요한 컬럼만 선택적으로 조회
3. **페이징 처리**: 대량 데이터 조회 시 LIMIT/OFFSET 사용
4. **인덱스 활용**: WHERE, ORDER BY 절에 인덱스 컬럼 사용

---

## 7. 데이터 무결성 제약조건

### 7.1 참조 무결성 (Referential Integrity)
- **ON DELETE CASCADE**: 
  - `submissions` → `users`, `problems`
  - `judge_results` → `submissions`
  - `test_cases` → `problems`
  - `group_memberships` → `users`, `study_groups`

- **ON DELETE SET NULL**:
  - `problems.group_id` → `study_groups.group_id`

- **ON DELETE RESTRICT**:
  - `study_groups.created_by` → `users.id` (생성자가 삭제되면 그룹 삭제 불가)

### 7.2 도메인 무결성
- **NOT NULL 제약**: 필수 필드에 적용
- **UNIQUE 제약**: 중복 방지 (user_id, nickname, email 등)
- **ENUM 타입**: Difficulty, JudgeStatus, Language 등

### 7.3 비즈니스 로직 제약
- **Soft Delete**: `group_memberships.left_at` (탈퇴 처리)
- **역할 제한**: GroupRole은 LEADER, MEMBER만 허용

---

## 8. 트랜잭션 처리

### 8.1 JPA 트랜잭션
- **@Transactional**: Service 레이어에서 사용
- **자동 커밋**: Repository 메서드는 자동으로 트랜잭션 처리

### 8.2 트랜잭션 범위
- **채점 프로세스**: Submission 생성 → JudgeResult 생성 → 상태 업데이트 (단일 트랜잭션)
- **그룹 생성**: StudyGroup 생성 → GroupMembership 생성 (단일 트랜잭션)

---

## 9. 데이터베이스 마이그레이션

### 9.1 스키마 변경 이력
- `init-schema.sql`: 초기 스키마 생성
- `migration.sql`: 스키마 변경 사항
- `fix_username_column.sql`: username 컬럼 NULL 허용

### 9.2 Hibernate DDL 자동 생성
- **개발 환경**: `spring.jpa.hibernate.ddl-auto=update`
- **프로덕션**: `spring.jpa.hibernate.ddl-auto=validate` (권장)

---

## 10. 샘플 데이터

### 10.1 기본 사용자
- `admin`: 관리자 계정
- `anonymous`: 익명 사용자
- `seoyun`: 테스트 사용자

### 10.2 기본 문제
- 문제 ID 1: "A + B" (4개 테스트케이스)
- 문제 ID 2: "Hello World" (1개 테스트케이스)

### 10.3 기본 그룹
- 그룹 1: "알고리즘 기초 스터디" (참여 코드: ALGO2024)
- 그룹 2: "자료구조 심화 스터디" (참여 코드: DS2024)
- 그룹 3: "코딩 테스트 준비반" (참여 코드: CT2024, 공개)

---

## 11. 주요 쿼리 패턴 요약

### 11.1 조회 패턴
1. **단순 조회**: `findBy{필드명}`
2. **정렬 조회**: `findBy{필드명}OrderBy{정렬필드}Desc`
3. **조건 조회**: `findBy{필드1}And{필드2}`
4. **페이징 조회**: `Page<T> findBy... (Pageable pageable)`

### 11.2 집계 패턴
1. **카운트**: `COUNT()`
2. **평균**: `AVG()`
3. **비율 계산**: `COUNT() * 100.0 / COUNT()`

### 11.3 JOIN 패턴
1. **INNER JOIN**: 필수 관계 조회
2. **LEFT/RIGHT JOIN**: 선택적 관계 조회
3. **자동 JOIN**: JPA 엔티티 관계를 통한 자동 조인

---

## 12. 결론

### 12.1 데이터베이스 설계 특징
1. **정규화**: 3NF 준수, 중복 최소화
2. **관계 설계**: 명확한 1:N, N:1, 1:1, M:N 관계 정의
3. **성능 최적화**: 인덱스, LAZY Loading, 페이징 활용
4. **데이터 무결성**: 외래키, UNIQUE, NOT NULL 제약 활용

### 12.2 쿼리 처리 특징
1. **JPA 기반**: 객체-관계 매핑을 통한 타입 안전성
2. **JPQL 활용**: 복잡한 쿼리는 @Query로 처리
3. **JOIN 최적화**: 필요한 경우에만 JOIN 사용
4. **페이징 지원**: 대량 데이터 처리 시 성능 고려

---

**작성일**: 2024-12-01  
**프로젝트**: DBAlgorithmPlatform (NimdaCon)  
**버전**: 1.0.0

