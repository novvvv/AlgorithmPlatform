-- ============================================
-- 데이터베이스 스키마 초기화 스크립트
-- 이 스크립트는 프로젝트를 처음 시작할 때 한 번만 실행하세요
-- 또는 데이터베이스를 초기화할 때 실행하세요
-- ============================================

-- users 테이블 스키마 수정
-- user_id 컬럼 추가 (이미 있으면 에러 발생 - 무시해도 됨)
ALTER TABLE users ADD COLUMN user_id VARCHAR(20) AFTER id;

-- username 데이터를 user_id로 복사
UPDATE users SET user_id = username WHERE user_id IS NULL AND username IS NOT NULL;

-- user_id에 UNIQUE 제약조건 추가 (이미 있으면 에러 발생 - 무시해도 됨)
ALTER TABLE users ADD UNIQUE KEY uk_user_id (user_id);

-- user_id를 NOT NULL로 변경
ALTER TABLE users MODIFY COLUMN user_id VARCHAR(20) NOT NULL;

-- nickname 컬럼 추가 (이미 있으면 에러 발생 - 무시해도 됨)
ALTER TABLE users ADD COLUMN nickname VARCHAR(20) AFTER user_id;

-- nickname이 NULL인 경우 user_id 값으로 설정
UPDATE users SET nickname = COALESCE(nickname, user_id) WHERE nickname IS NULL;

-- nickname에 UNIQUE 제약조건 추가 (이미 있으면 에러 발생 - 무시해도 됨)
ALTER TABLE users ADD UNIQUE KEY uk_nickname (nickname);

-- nickname을 NOT NULL로 변경
ALTER TABLE users MODIFY COLUMN nickname VARCHAR(20) NOT NULL;

-- password 컬럼 길이 확장
ALTER TABLE users MODIFY COLUMN password VARCHAR(255) NOT NULL;

-- university_name, department, grade 컬럼 추가 (이미 있으면 에러 발생 - 무시해도 됨)
ALTER TABLE users ADD COLUMN university_name VARCHAR(100) AFTER email;
ALTER TABLE users ADD COLUMN department VARCHAR(100) AFTER university_name;
ALTER TABLE users ADD COLUMN grade VARCHAR(20) AFTER department;

-- username 컬럼을 NULL 허용으로 변경 (기존 데이터 호환성 유지)
ALTER TABLE users MODIFY COLUMN username VARCHAR(20) NULL;



