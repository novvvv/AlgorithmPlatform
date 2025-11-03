# 데이터베이스 설계 기말 팀프로젝트 

### 1. MySQL 데이터베이스 및 사용자 생성

MySQL 서버가 실행된 후, 다음 SQL 명령어를 실행하세요:

```bash
# MySQL 접속 (root로)
mysql -u root -p
```

MySQL 내에서 다음 명령어 실행:

```sql
-- 1. 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS nimda_con CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. 개발용 사용자 생성 (application-dev.yml에 설정된 값)
CREATE USER IF NOT EXISTS 'nimda'@'localhost' IDENTIFIED BY 'nimda123';

-- 3. 데이터베이스 권한 부여
GRANT ALL PRIVILEGES ON nimda_con.* TO 'nimda'@'localhost';

-- 4. 권한 변경사항 적용
FLUSH PRIVILEGES;

-- 5. 확인
SHOW GRANTS FOR 'nimda'@'localhost';

-- MySQL 나가기
EXIT;
```

### 2. 애플리케이션 설정 확인

개발 환경(`dev` 프로필) 실행 시 `application-dev.yml` 파일이 자동으로 사용됩니다.

**설정 위치**: `src/main/resources/application-dev.yml`
**현재 설정값**:
- 데이터베이스: `nimda_con`
- 사용자: `nimda`
- 비밀번호: `nimda123`
- 호스트: `localhost:3306`

## 애플리케이션 실행

루트 디렉토리에서:
```bash
./dev.sh frontend
./dev.sh backend
```

## 기본 계정
- **사용자명**: admin
- **비밀번호**: password
- **이메일**: admin@example.com


## 개발 환경
- Java 17
- Maven 3.6+
- MySQL 8.0+
