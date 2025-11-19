-- insert into "user" (username, password, nickname, activated) values ('admin', '$2a$08$lDnHPz7eUkSi6ao14Twuau08mzhWrL4kyZGGU5xfiGALO/Vxd5DOi', 'admin', 1);
-- insert into "user" (username, password, nickname, activated) values ('user', '$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC', 'user', 1);

-- insert into authority (authority_name) values ('ROLE_USER');
-- insert into authority (authority_name) values ('ROLE_ADMIN');

-- insert into user_authority (user_id, authority_name) values (1, 'ROLE_USER');
-- insert into user_authority (user_id, authority_name) values (1, 'ROLE_ADMIN');
-- insert into user_authority (user_id, authority_name) values (2, 'ROLE_USER');

-- ============================================
-- 스키마 마이그레이션 (username 컬럼 NULL 허용)
-- ============================================
-- username 컬럼이 존재하는 경우 NULL 허용으로 변경
-- 주의: 컬럼이 없으면 에러가 발생할 수 있지만, 
-- ddl-auto=update 모드에서는 Hibernate가 먼저 스키마를 업데이트하므로
-- 일반적으로는 문제가 없습니다.
-- 에러가 발생하면 수동으로 실행하거나 컬럼을 먼저 확인하세요.
ALTER TABLE users MODIFY COLUMN username VARCHAR(20) NULL;

-- ============================================
-- 기본 데이터 삽입
-- ============================================

-- 기본 권한 데이터 삽입
INSERT IGNORE INTO authority (authority_name) VALUES 
('ROLE_USER'),
('ROLE_ADMIN');

-- 기본 관리자 계정 생성 (비밀번호: password)
-- 참고: 아래 해시는 BCrypt로 암호화된 "password" 비밀번호입니다.
-- 모든 개발자가 동일한 비밀번호로 테스트할 수 있도록 공통 해시를 사용합니다.

-- 기존 잘못된 nickname 값 수정 (2자 -> 4자)
UPDATE users SET nickname = '익명사용자' WHERE nickname = '익명' AND user_id = 'anonymous';

INSERT IGNORE INTO users (user_id, nickname, password, email) VALUES 
('admin', 'admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@example.com'),
('anonymous', '익명사용자', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'anonymous@nimda.com'),
('seoyun', 'seoyun', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'seoyun@example.com');

-- 관리자에게 권한 부여
INSERT IGNORE INTO user_authorities (user_id, authority_name) 
SELECT u.id, 'ROLE_USER' FROM users u WHERE u.user_id = 'admin';
INSERT IGNORE INTO user_authorities (user_id, authority_name) 
SELECT u.id, 'ROLE_USER' FROM users u WHERE u.user_id = 'anonymous';
INSERT IGNORE INTO user_authorities (user_id, authority_name) 
SELECT u.id, 'ROLE_ADMIN' FROM users u WHERE u.user_id = 'seoyun';

-- 기본 문제 데이터 삽입
INSERT IGNORE INTO problems (id, title, description, time_limit, memory_limit, difficulty, created_at, updated_at) VALUES 
(1, 'A + B', '두 정수 A와 B를 입력받아 A+B를 출력하는 프로그램을 작성하시오.', 5000, 262144, 'EASY', NOW(), NOW()),
(2, 'Hello World', 'Hello World를 출력하는 프로그램을 작성하시오.', 5000, 262144, 'EASY', NOW(), NOW());

-- 기본 테스트케이스 데이터 삽입
-- A + B 문제용 (ID: 1)
INSERT IGNORE INTO test_cases (problem_id, input, output, is_public, created_at, updated_at) VALUES 
(1, '1 2', '3', false, NOW(), NOW()),           -- A + B 테스트케이스 1
(1, '5 7', '12', false, NOW(), NOW()),          -- A + B 테스트케이스 2
(1, '100 200', '300', false, NOW(), NOW()),     -- A + B 테스트케이스 3
(1, '0 0', '0', false, NOW(), NOW()),           -- A + B 테스트케이스 4

-- Hello World 문제용 (ID: 2)
(2, '', 'Hello World', false, NOW(), NOW());    -- Hello World 테스트케이스 (입력 없음)

-- ============================================
-- 기본 스터디 그룹 데이터 삽입
-- ============================================
-- 스터디 그룹 생성 (생성자는 자동으로 ADMIN 역할로 멤버에 추가됨)
INSERT IGNORE INTO study_groups (group_name, max_members, participation_code, is_public, created_by, created_at, updated_at) VALUES 
('알고리즘 기초 스터디', 20, 'ALGO2024', false, 1, NOW(), NOW()),           -- 그룹 1: admin이 생성
('자료구조 심화 스터디', 15, 'DS2024', false, 2, NOW(), NOW()),              -- 그룹 2: anonymous가 생성
('코딩 테스트 준비반', 30, 'CT2024', true, 3, NOW(), NOW());                 -- 그룹 3: seoyun이 생성 (공개)

-- 기존 잘못된 role 값 수정 (ADMIN -> LEADER)
UPDATE group_memberships SET role = 'LEADER' WHERE role = 'ADMIN' OR role = '' OR role IS NULL;

-- 그룹 멤버십 추가 (각 그룹의 생성자를 LEADER 역할로 추가)
INSERT IGNORE INTO group_memberships (user_id, group_id, role, joined_at) VALUES 
(1, 1, 'LEADER', NOW()),    -- 그룹 1: admin이 LEADER
(2, 2, 'LEADER', NOW()),    -- 그룹 2: anonymous가 LEADER
(3, 3, 'LEADER', NOW());    -- 그룹 3: seoyun이 LEADER
