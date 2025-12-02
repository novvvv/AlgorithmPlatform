-- ============================================
-- 데이터베이스 스키마 초기화 스크립트
-- 이 스크립트는 프로젝트를 처음 시작할 때 한 번만 실행하세요
-- 또는 데이터베이스를 초기화할 때 실행하세요
-- 
-- 주의: 컬럼이 이미 존재하면 에러가 발생할 수 있습니다.
-- Hibernate가 이미 테이블을 생성했다면 이 스크립트는 실행하지 마세요.
-- ============================================

-- users 테이블 스키마 수정
-- user_id 컬럼 추가 (컬럼이 없을 때만 실행)
SET @col_exists = (
    SELECT COUNT(*) 
    FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'users' 
      AND COLUMN_NAME = 'user_id'
);

SET @sql = IF(@col_exists = 0,
    'ALTER TABLE users ADD COLUMN user_id VARCHAR(20) AFTER id',
    'SELECT "Column user_id already exists" AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- username 데이터를 user_id로 복사
UPDATE users SET user_id = username WHERE user_id IS NULL AND username IS NOT NULL;

-- user_id에 UNIQUE 제약조건 추가 (제약조건이 없을 때만 실행)
SET @constraint_exists = (
    SELECT COUNT(*) 
    FROM information_schema.TABLE_CONSTRAINTS 
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'users' 
      AND CONSTRAINT_NAME = 'uk_user_id'
);

SET @sql = IF(@constraint_exists = 0,
    'ALTER TABLE users ADD UNIQUE KEY uk_user_id (user_id)',
    'SELECT "Constraint uk_user_id already exists" AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- user_id를 NOT NULL로 변경 (이미 NOT NULL이어도 에러 없음)
ALTER TABLE users MODIFY COLUMN user_id VARCHAR(20) NOT NULL;

-- nickname 컬럼 추가 (컬럼이 없을 때만 실행)
SET @col_exists = (
    SELECT COUNT(*) 
    FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'users' 
      AND COLUMN_NAME = 'nickname'
);

SET @sql = IF(@col_exists = 0,
    'ALTER TABLE users ADD COLUMN nickname VARCHAR(20) AFTER user_id',
    'SELECT "Column nickname already exists" AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- nickname이 NULL인 경우 user_id 값으로 설정
UPDATE users SET nickname = COALESCE(nickname, user_id) WHERE nickname IS NULL;

-- nickname에 UNIQUE 제약조건 추가 (제약조건이 없을 때만 실행)
SET @constraint_exists = (
    SELECT COUNT(*) 
    FROM information_schema.TABLE_CONSTRAINTS 
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'users' 
      AND CONSTRAINT_NAME = 'uk_nickname'
);

SET @sql = IF(@constraint_exists = 0,
    'ALTER TABLE users ADD UNIQUE KEY uk_nickname (nickname)',
    'SELECT "Constraint uk_nickname already exists" AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- nickname을 NOT NULL로 변경 (이미 NOT NULL이어도 에러 없음)
ALTER TABLE users MODIFY COLUMN nickname VARCHAR(20) NOT NULL;

-- password 컬럼 길이 확장 (이미 255면 에러 없음)
ALTER TABLE users MODIFY COLUMN password VARCHAR(255) NOT NULL;

-- university_name, department, grade 컬럼 추가 (컬럼이 없을 때만 실행)
SET @col_exists = (
    SELECT COUNT(*) 
    FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'users' 
      AND COLUMN_NAME = 'university_name'
);

SET @sql = IF(@col_exists = 0,
    'ALTER TABLE users ADD COLUMN university_name VARCHAR(100) AFTER email',
    'SELECT "Column university_name already exists" AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = (
    SELECT COUNT(*) 
    FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'users' 
      AND COLUMN_NAME = 'department'
);

SET @sql = IF(@col_exists = 0,
    'ALTER TABLE users ADD COLUMN department VARCHAR(100) AFTER university_name',
    'SELECT "Column department already exists" AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

SET @col_exists = (
    SELECT COUNT(*) 
    FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'users' 
      AND COLUMN_NAME = 'grade'
);

SET @sql = IF(@col_exists = 0,
    'ALTER TABLE users ADD COLUMN grade VARCHAR(20) AFTER department',
    'SELECT "Column grade already exists" AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- username 컬럼을 NULL 허용으로 변경 (컬럼이 존재할 때만 실행)
SET @col_exists = (
    SELECT COUNT(*) 
    FROM information_schema.COLUMNS 
    WHERE TABLE_SCHEMA = DATABASE() 
      AND TABLE_NAME = 'users' 
      AND COLUMN_NAME = 'username'
);

SET @sql = IF(@col_exists > 0,
    'ALTER TABLE users MODIFY COLUMN username VARCHAR(20) NULL',
    'SELECT "Column username does not exist" AS message');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;






