#!/bin/bash

set -e

# 백엔드 실행: NimdaConBackEnd/backend-spring
if [[ $1 == "backend" || $1 == "be" ]]; then
  echo "[INFO] 🚀 백엔드 서버 (SpringBoot, dev 프로필) 실행 중..."
  cd "$(dirname "$0")/NimdaConBackEnd/backend-spring"
  ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev
  exit $?
fi

# 프론트엔드 실행: NimdaConFrontEnd
if [[ $1 == "frontend" || $1 == "fe" ]]; then
  echo "[INFO] 🚀 프론트엔드 서버(Vite) 실행 중..."
  cd "$(dirname "$0")/NimdaConFrontEnd"
  npm install
  npm run dev
  exit $?
fi

# 백엔드 + 프론트 동시 실행 (간단 병렬, 실제 개발에선 터미널 2개 권장)
if [[ $1 == "all" ]]; then
  echo "[INFO] 백엔드 + 프론트 개발 서버를 실행합니다. 백엔드 먼저 실행→ 프론트 기동. 둘 다 꺼질 때까지 대기."
  (cd "$(dirname "$0")/NimdaConBackEnd/backend-spring" && ./mvnw spring-boot:run -Dspring-boot.run.profiles=dev) &
  sleep 5
  (cd "$(dirname "$0")/NimdaConFrontEnd" && npm install && npm run dev)
  wait
  exit $?
fi

echo "사용법: $0 [backend|be|frontend|fe|all]"
exit 1