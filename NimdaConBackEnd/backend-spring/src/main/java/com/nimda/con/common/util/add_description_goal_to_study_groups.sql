============================================
-- 스터디 그룹에 description, goal 컬럼 추가
-- ============================================
-- 이 스크립트는 study_groups 테이블에 description과 goal 컬럼을 추가합니다.
-- Hibernate의 ddl-auto: update를 사용하는 경우 자동으로 적용되지만,
-- 수동으로 마이그레이션하려면 이 스크립트를 실행하세요.

-- description 컬럼 추가 (이미 존재하는 경우 에러 방지)
SET @dbname = DATABASE();
SET @tablename = "study_groups";
SET @columnname = "description";
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 'Column description already exists.'",
  CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN ", @columnname, " TEXT")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- goal 컬럼 추가 (이미 존재하는 경우 에러 방지)
SET @columnname = "goal";
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 'Column goal already exists.'",
  CONCAT("ALTER TABLE ", @tablename, " ADD COLUMN ", @columnname, " TEXT")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;