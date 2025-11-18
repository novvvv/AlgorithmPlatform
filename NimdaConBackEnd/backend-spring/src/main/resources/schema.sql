-- 스키마 초기화 스크립트
-- 이 파일은 spring.jpa.hibernate.ddl-auto=create 또는 create-drop일 때 실행됩니다

-- users 테이블 생성 (올바른 구조)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(20) NOT NULL UNIQUE,
    nickname VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    university_name VARCHAR(100),
    department VARCHAR(100),
    grade VARCHAR(20),
    created_at DATETIME,
    updated_at DATETIME
);

-- username 컬럼 마이그레이션 (기존 테이블이 있는 경우)
-- username 컬럼이 존재하면 NULL 허용으로 변경
-- 주의: 컬럼이 없으면 에러가 발생할 수 있지만, ddl-auto=update 모드에서는 무시됩니다
ALTER TABLE users MODIFY COLUMN username VARCHAR(20) NULL;

