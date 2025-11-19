-- users 테이블 스키마 수정
-- username 컬럼을 user_id로 변경하고 nickname 컬럼 추가

-- 1. user_id 컬럼 추가 (없는 경우)
-- 이미 존재하면 에러가 발생할 수 있으므로 먼저 확인 후 실행하세요
ALTER TABLE users 
ADD COLUMN user_id VARCHAR(20) AFTER id;

-- 2. username 컬럼의 데이터를 user_id로 복사
UPDATE users 
SET user_id = username 
WHERE user_id IS NULL AND username IS NOT NULL;

-- 3. user_id 컬럼에 UNIQUE 제약조건 추가
ALTER TABLE users 
ADD UNIQUE KEY uk_user_id (user_id);

-- 4. user_id 컬럼을 NOT NULL로 변경
ALTER TABLE users 
MODIFY COLUMN user_id VARCHAR(20) NOT NULL;

-- 5. nickname 컬럼 추가 (없는 경우)
ALTER TABLE users 
ADD COLUMN nickname VARCHAR(20) AFTER user_id;

-- 6. nickname이 NULL인 경우 user_id 값으로 설정
UPDATE users 
SET nickname = user_id 
WHERE nickname IS NULL;

-- 7. nickname 컬럼에 UNIQUE 제약조건 추가
ALTER TABLE users 
ADD UNIQUE KEY uk_nickname (nickname);

-- 8. nickname 컬럼을 NOT NULL로 변경
ALTER TABLE users 
MODIFY COLUMN nickname VARCHAR(20) NOT NULL;

-- 9. password 컬럼 길이 확장 (BCrypt 암호화된 값 저장용)
ALTER TABLE users 
MODIFY COLUMN password VARCHAR(255) NOT NULL;

-- 10. university_name, department, grade 컬럼 추가 (없는 경우)
ALTER TABLE users 
ADD COLUMN university_name VARCHAR(100) AFTER email,
ADD COLUMN department VARCHAR(100) AFTER university_name,
ADD COLUMN grade VARCHAR(20) AFTER department;

-- 11. username 컬럼 삭제 (데이터 마이그레이션 완료 후)
-- 주의: 이 작업은 되돌릴 수 없으므로 백업 후 실행하세요
-- ALTER TABLE users DROP COLUMN username;
