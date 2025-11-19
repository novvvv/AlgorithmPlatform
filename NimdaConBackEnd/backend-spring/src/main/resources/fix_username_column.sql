-- username 컬럼 문제 해결 스크립트
-- 이 스크립트는 users 테이블에서 username 컬럼을 NULL 허용으로 변경하거나 삭제합니다

-- 방법 1: username 컬럼을 NULL 허용으로 변경 (기존 데이터 보존)
ALTER TABLE users MODIFY COLUMN username VARCHAR(20) NULL;

-- 방법 2: username 컬럼 완전 삭제 (권장)
-- 주의: 이 작업은 되돌릴 수 없으므로 백업 후 실행하세요
-- ALTER TABLE users DROP COLUMN username;
