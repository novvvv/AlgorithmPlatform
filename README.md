# DBAlgorithmPlatform (Nimda Contest Platform)

알고리즘 문제 풀이 및 스터디 그룹 관리 플랫폼입니다. Spring Boot 백엔드와 React 프론트엔드로 구성되어 있습니다.

## 📋 목차

- [환경 요구사항](#환경-요구사항)
- [프로젝트 구조](#프로젝트-구조)
- [데이터베이스 설정](#데이터베이스-설정)
- [프로젝트 실행](#프로젝트-실행)
- [기본 계정](#기본-계정)
- [API 문서](#api-문서)

## 🔧 환경 요구사항

### 필수 소프트웨어

- **Java**: 17 이상
- **Maven**: 3.6 이상
- **Node.js**: 18.x 이상 (권장: 20.x LTS)
- **npm**: 9.x 이상
- **MySQL**: 8.0 이상

### 운영체제

- Windows, macOS, Linux 모두 지원

## 📁 프로젝트 구조

```
DBAlgorithmPlatform/
├── NimdaConBackEnd/
│   └── backend-spring/          # Spring Boot 백엔드
│       ├── src/
│       │   └── main/
│       │       ├── java/         # Java 소스 코드
│       │       └── resources/    # 설정 파일 및 SQL
│       │           ├── application.yml
│       │           ├── application-dev.yml
│       │           └── data.sql  # 초기 데이터
│       └── pom.xml
├── NimdaConFrontEnd/             # React 프론트엔드
│   ├── src/
│   │   ├── apis/                 # API 클라이언트
│   │   ├── components/           # React 컴포넌트
│   │   ├── pages/                # 페이지 컴포넌트
│   │   └── hooks/                # Custom Hooks
│   └── package.json
├── load-tests/                   # K6 부하 테스트
├── dev.sh                        # 개발 서버 실행 스크립트
└── README.md
```

## 🗄️ 데이터베이스 설정

### 1. MySQL 설치 및 실행

MySQL 서버가 설치되어 있고 실행 중이어야 합니다.

**macOS (Homebrew)**:
```bash
brew install mysql
brew services start mysql
```

**Ubuntu/Debian**:
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

**Windows**:
[MySQL 공식 사이트](https://dev.mysql.com/downloads/mysql/)에서 설치

### 2. 데이터베이스 및 사용자 생성

MySQL 서버에 접속하여 다음 명령어를 실행하세요:

```bash
# MySQL 접속 (root로)
mysql -u root -p
```

MySQL 내에서 다음 SQL 명령어 실행:

```sql
-- 1. 데이터베이스 생성
CREATE DATABASE IF NOT EXISTS nimda_con CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. 개발용 사용자 생성
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

### 3. 데이터베이스 설정 확인

백엔드 설정 파일 위치: `NimdaConBackEnd/backend-spring/src/main/resources/application-dev.yml`

**현재 설정값**:
- 데이터베이스: `nimda_con`
- 사용자: `nimda`
- 비밀번호: `nimda123`
- 호스트: `localhost:3306`

> 💡 **참고**: 프로덕션 환경에서는 `application.yml`을 사용하며, AWS RDS를 사용합니다.

## 🚀 프로젝트 실행

### 방법 1: dev.sh 스크립트 사용 (권장)

루트 디렉토리에서 실행:

```bash
# 백엔드만 실행
./dev.sh backend
# 또는
./dev.sh be

# 프론트엔드만 실행
./dev.sh frontend
# 또는
./dev.sh fe

# 백엔드 + 프론트엔드 동시 실행
./dev.sh all
```

> ⚠️ **주의**: `all` 옵션은 간단한 병렬 실행이므로, 실제 개발 시에는 **터미널 2개를 사용하는 것을 권장**합니다.

### 방법 2: 개별 실행

#### 백엔드 실행

```bash
cd NimdaConBackEnd/backend-spring
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

또는 Maven이 설치되어 있다면:

```bash
cd NimdaConBackEnd/backend-spring
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

**백엔드 서버**: http://localhost:8080

#### 프론트엔드 실행

```bash
cd NimdaConFrontEnd
npm install
npm run dev
```

**프론트엔드 서버**: http://localhost:5173 (Vite 기본 포트)

### 방법 3: 터미널 2개 사용 (권장)

**터미널 1 - 백엔드**:
```bash
./dev.sh backend
```

**터미널 2 - 프론트엔드**:
```bash
./dev.sh frontend
```

## 👤 기본 계정

애플리케이션 실행 시 `data.sql`에 의해 자동으로 생성되는 기본 계정:

- **사용자명**: `admin`
- **비밀번호**: `password`
- **이메일**: `admin@example.com`

> 💡 **참고**: `NimdaConBackEnd/backend-spring/src/main/resources/data.sql` 파일에서 기본 계정 정보를 확인할 수 있습니다.

## 📚 API 문서

API 사용 가이드는 다음 Postman 문서를 참조하세요:

**Postman API 문서**: https://documenter.getpostman.com/view/32066564/2sB3WtseZc

## 🛠️ 개발 환경

### 백엔드 기술 스택

- **Framework**: Spring Boot 3.2.0
- **Language**: Java 17
- **Build Tool**: Maven
- **Database**: MySQL 8.0
- **ORM**: JPA/Hibernate
- **Security**: Spring Security + JWT

### 프론트엔드 기술 스택

- **Framework**: React 19.1.1
- **Language**: TypeScript
- **Build Tool**: Vite 7.1.4
- **Styling**: Styled Components, Tailwind CSS
- **HTTP Client**: Axios
- **Routing**: React Router DOM

## 🐳 Docker 배포 정보

### 백엔드 서버 Docker 배포

백엔드 서버는 Docker를 사용하여 가상화되어 EC2 인스턴스에 배포되어 있습니다.

**Docker Hub 주소**:
- Docker Hub 사용자: `novvvv`
- 이미지 주소: `docker.io/novvvv/nimda-con-backend` (또는 해당 Docker Hub 저장소 URL)

### 배포 구조

```
┌─────────────────────────────────────────┐
│         EC2 인스턴스                     │
│  ┌───────────────────────────────────┐  │
│  │   Docker Container                │  │
│  │   (Spring Boot Backend)           │  │
│  │   Port: 8080                      │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
           ▲
           │ API 호출
           │
┌─────────────────────────────────────────┐
│      로컬 개발 환경                      │
│  ┌───────────────────────────────────┐  │
│  │   React Frontend (Vite)            │  │
│  │   Port: 5173                       │  │
│  │   → 로컬 백엔드에 맞게 코드 수정됨 │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### 로컬 개발 환경 설정

> ⚠️ **중요**: 현재 코드는 **로컬 백엔드 서버**에서 동작하도록 수정되어 있습니다.  
> EC2의 Docker 백엔드 서버와의 연결은 끊어져 있으며, 로컬 개발 환경(`http://localhost:8080`)에 연결하도록 설정되어 있습니다.

**프론트엔드 API 설정 위치**: `NimdaConFrontEnd/src/apis/utils.ts`

현재 설정:
- **API_BASE_URL**: `"/api"` (상대 경로, Vite 프록시를 통해 로컬 백엔드로 연결)
- **백엔드**: `http://localhost:8080` (로컬 Spring Boot 서버)
- **프론트엔드**: `http://localhost:3000` (로컬 Vite 개발 서버, 포트 3000)

**Vite 프록시 설정** (`NimdaConFrontEnd/vite.config.ts`):
```typescript
server: {
  port: 3000,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
    },
  },
}
```

> 💡 **참고**: Vite 개발 서버는 `/api`로 시작하는 요청을 자동으로 `http://localhost:8080/api`로 프록시합니다.  
> 따라서 프론트엔드 코드에서는 절대 URL을 사용하지 않고 상대 경로(`/api`)를 사용합니다.

프로덕션 환경 (EC2 배포):
- 백엔드: EC2 인스턴스의 Docker 컨테이너 (포트 8080)
- 프론트엔드: 별도 호스팅 또는 정적 파일 서빙
- 프로덕션 배포 시에는 `API_BASE_URL`을 EC2 백엔드 주소로 변경해야 합니다.

### Docker 이미지 사용 방법

EC2에서 백엔드 서버를 실행하려면:

```bash
# Docker 이미지 pull
docker pull novvvv/nimda-con-backend:latest

# 컨테이너 실행
docker run -d \
  -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=prod \
  -e SPRING_DATASOURCE_URL=jdbc:mysql://[DB_HOST]:3306/nimda_con \
  -e SPRING_DATASOURCE_USERNAME=[DB_USER] \
  -e SPRING_DATASOURCE_PASSWORD=[DB_PASSWORD] \
  --name nimda-backend \
  novvvv/nimda-con-backend:latest
```

> 💡 **참고**: 실제 Docker Hub 저장소 URL은 프로젝트 배포 시 설정된 주소를 사용하세요.


