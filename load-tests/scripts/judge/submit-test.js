import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// 커스텀 메트릭
const errorRate = new Rate('errors');
const judgeSuccessRate = new Rate('judge_success');

// 테스트 설정 - CPU 70% 도달 목표 (동시 사용자 수 + sleep으로 정확한 RPS 제어)
// 실제 대회 집중 구간: 19:45~19:54 (9분)에 30건 집중 제출 → CPU 4.42%
// 실제 대회 RPS: 30건 / 540초 ≈ 0.056 RPS (약 18초에 1번)
// CPU 70% 도달 목표: 0.056 × (70/4.42) ≈ 0.88 RPS (약 1.14초에 1번)
// 총 실행 시간: 약 10분 (실제 대회 집중 구간과 유사)
// CloudWatch에서 CPU 사용률을 모니터링하며 70% 도달 시 Ctrl+C로 중단
export const options = {
  stages: [
    // 단계 1: 기준선 측정 (실제 대회 집중 구간 수준)
    // 0.056 RPS = 18초에 1번 → 1명이 18초 간격으로 요청
    { duration: '1m', target: 1 },     // 1분: 1명 유지 (0.056 RPS, CPU 4.42% 예상)
    
    // 단계 2: 부하 증가 시작
    // 0.1 RPS = 10초에 1번 → 1명이 10초 간격
    { duration: '30s', target: 1 },    // 30초: 1명 유지 (sleep으로 간격 조절)
    { duration: '30s', target: 1 },    // 30초: 1명 유지
    
    // 단계 3: 중간 부하
    // 0.3 RPS = 3.3초에 1번 → 1명이 3.3초 간격
    { duration: '30s', target: 1 },    // 30초: 1명 유지 (sleep으로 간격 조절)
    { duration: '30s', target: 1 },    // 30초: 1명 유지
    
    // 단계 4: 높은 부하
    // 0.6 RPS = 1.67초에 1번 → 1명이 1.67초 간격
    { duration: '30s', target: 1 },    // 30초: 1명 유지 (sleep으로 간격 조절)
    { duration: '30s', target: 1 },    // 30초: 1명 유지
    
    // 단계 5: CPU 70% 도달 예상 구간
    // 0.88 RPS = 1.14초에 1번 → 1명이 1.14초 간격
    { duration: '30s', target: 1 },    // 30초: 1명 유지 (sleep으로 간격 조절)
    { duration: '2m', target: 1 },     // 2분: 1명 유지 (CPU 70% 도달 확인)
    
    // 단계 6: 임계점 초과 테스트
    // 1.2 RPS = 0.83초에 1번 → 1명이 0.83초 간격
    { duration: '30s', target: 1 },    // 30초: 1명 유지 (sleep으로 간격 조절)
    { duration: '1m', target: 1 },     // 1분: 1명 유지 (성능 저하 확인)
    
    // 단계 7: 부하 감소
    { duration: '30s', target: 0 },    // 30초: 0명으로 감소
  ],
  // 총 실행 시간: 약 10분
  // 각 단계에서 sleep 시간을 조절하여 정확한 RPS 달성
  thresholds: {
    // CPU 70% 도달 시 성능 저하를 확인하기 위한 임계값 (느슨하게 설정)
    http_req_duration: ['p(95)<10000'],  // 95% 요청이 10초 이내
    http_req_failed: ['rate<0.1'],       // 실패율 10% 이하 (부하 상황 고려)
    judge_success: ['rate>0.7'],         // 채점 성공률 70% 이상
  },
};

// 테스트 데이터
const BASE_URL = 'http://52.78.249.69:80';
const TEST_USER = {
  userId: 'TEAM1',  // API는 userId를 사용 (username 아님)
  password: '1111'
};

// 다양한 테스트 코드들
const TEST_CODES = [
  // Hello World (문제 ID: 2)
  {
    problemId: 2,
    language: 'C++17',
    code: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello World" << endl;
    return 0;
}`,
    expected: 'ACCEPTED'
  },
  // A + B (문제 ID: 1)
  {
    problemId: 1,
    language: 'C++17',
    code: `#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << endl;
    return 0;
}`,
    expected: 'ACCEPTED'
  },
  // 잘못된 코드 (컴파일 에러)
  {
    problemId: 1,
    language: 'C++17',
    code: `#include <iostream>
using namespace std;
int main() {
    int a, b
    cin >> a >> b;  // 세미콜론 누락
    cout << a + b << endl;
    return 0;
}`,
    expected: 'COMPILATION_ERROR'
  },
  // 틀린 답
  {
    problemId: 1,
    language: 'C++17',
    code: `#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a * b << endl;  // 곱셈으로 잘못 계산
    return 0;
}`,
    expected: 'WRONG_ANSWER'
  }
];

// 단계별 RPS와 sleep 시간 매핑
// 실제 대회: 0.056 RPS (18초에 1번) → CPU 4.42%
// CPU 70% 목표: 0.88 RPS (1.14초에 1번)
// 각 단계는 stages의 duration에 맞춰 sleep 시간 적용
const RPS_STAGES = [
  { rps: 0.056, sleep: 18.0, name: '기준선 (실제 대회 수준)' },      // 0-1분
  { rps: 0.1, sleep: 10.0, name: '부하 증가 시작' },                 // 1-2분
  { rps: 0.3, sleep: 3.3, name: '중간 부하' },                       // 2-3분
  { rps: 0.6, sleep: 1.67, name: '높은 부하' },                      // 3-4분
  { rps: 0.88, sleep: 1.14, name: 'CPU 70% 도달 예상' },            // 4-7분
  { rps: 1.2, sleep: 0.83, name: '임계점 초과' },                    // 7-8.5분
];

// 전역 변수로 테스트 시작 시간 저장 (setup 함수에서 초기화)
let testStartTime = null;

export function setup() {
  testStartTime = Date.now();
  return { startTime: testStartTime };
}

// 현재 단계 계산 (테스트 시작 후 경과 시간 기준)
function getCurrentStage(data) {
  const elapsedSeconds = data && data.startTime ? 
    (Date.now() - data.startTime) / 1000 : 0;
  
  if (elapsedSeconds < 60) return RPS_STAGES[0];      // 0-1분
  if (elapsedSeconds < 120) return RPS_STAGES[1];     // 1-2분
  if (elapsedSeconds < 180) return RPS_STAGES[2];     // 2-3분
  if (elapsedSeconds < 240) return RPS_STAGES[3];     // 3-4분
  if (elapsedSeconds < 420) return RPS_STAGES[4];     // 4-7분
  if (elapsedSeconds < 510) return RPS_STAGES[5];     // 7-8.5분
  return RPS_STAGES[0]; // 기본값
}

export default function (data) {
  // 현재 단계 정보 가져오기
  const currentStage = getCurrentStage(data);
  
  // 1. 로그인하여 JWT 토큰 획득
  const loginPayload = JSON.stringify(TEST_USER);
  const loginResponse = http.post(
    `${BASE_URL}/api/auth/login`,
    loginPayload,
    { headers: { 'Content-Type': 'application/json' } }
  );
  
  let token = null;
  console.log(`Login response status: ${loginResponse.status}`);
  
  if (loginResponse.status === 200) {
    try {
      const loginBody = JSON.parse(loginResponse.body);
      // API 응답 형식: { "accessToken": "...", "user": {...} }
      token = loginBody.accessToken || loginBody.access_token || loginBody.token || loginBody.data?.accessToken;
      console.log(`Token received: ${token ? 'Yes' : 'No'}`);
    } catch (e) {
      console.error('Failed to parse login response:', e);
      console.error('Response body:', loginResponse.body);
    }
  } else {
    console.error(`Login failed with status ${loginResponse.status}`);
    console.error('Response body:', loginResponse.body);
  }
  
  // 토큰이 없으면 채점 요청 불가
  if (!token) {
    console.error('Login failed, skipping submission');
    return;
  }
  
  // 랜덤하게 테스트 코드 선택
  const testCase = TEST_CODES[Math.floor(Math.random() * TEST_CODES.length)];
  
  // 코드 제출 (JWT 토큰 포함)
  const submitPayload = JSON.stringify({
    title: `Problem ${testCase.problemId}`,
    code: testCase.code,
    language: testCase.language,
    problemId: testCase.problemId,
    description: "CPU 70% 도달 부하 테스트",
    points: 100
  });

  const submitParams = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };
  
  const submitResponse = http.post(
    `${BASE_URL}/api/judge/submit`,
    submitPayload,
    submitParams
  );

  // 제출 응답 검증
  const submitSuccess = check(submitResponse, {
    'submit status is 200': (r) => r.status === 200,
    'submit response time < 10s': (r) => r.timings.duration < 10000,
    'response contains result': (r) => {
      try {
        const body = JSON.parse(r.body);
        return body.status !== undefined;
      } catch (e) {
        return false;
      }
    },
  });

  let judgeResult = null;
  console.log(`Response status: ${submitResponse.status} for problem ${testCase.problemId}`);
  
  if (submitResponse.status === 200) {
    try {
      judgeResult = JSON.parse(submitResponse.body);
      // 응답 형식: {"result": {"status": "...", ...}}
      const actualStatus = judgeResult.result?.status || judgeResult.status;
      console.log(`Judge result: ${actualStatus || 'undefined'} for problem ${testCase.problemId}`);
      
      // 채점 결과 검증 (result 객체 사용)
      const resultObj = judgeResult.result || judgeResult;
      const judgeSuccess = check(resultObj, {
        'judge completed': (result) => result.status !== 'SYSTEM_ERROR',
        'expected result': (result) => {
          // 예상 결과와 일치하는지 확인 (완전히 정확하지 않을 수 있음)
          return result.status === testCase.expected || 
                 (testCase.expected === 'ACCEPTED' && result.status === 'ACCEPTED') ||
                 (testCase.expected === 'COMPILATION_ERROR' && result.status === 'COMPILATION_ERROR') ||
                 (testCase.expected === 'WRONG_ANSWER' && result.status === 'WRONG_ANSWER');
        }
      });
      
      judgeSuccessRate.add(judgeSuccess);
    } catch (e) {
      console.error('Failed to parse submit response:', e);
      console.error('Response body:', submitResponse.body);
      judgeSuccessRate.add(false);
    }
  } else {
    console.error(`Request failed with status ${submitResponse.status}`);
    console.error('Response body:', submitResponse.body);
    judgeSuccessRate.add(false);
  }

  errorRate.add(!submitSuccess);

  // 제출 목록 조회 테스트 (JWT 토큰 포함)
  const submissionsResponse = http.get(
    `${BASE_URL}/api/judge/submissions`,
    { headers: { 'Authorization': `Bearer ${token}` } }
  );
  
  check(submissionsResponse, {
    'submissions list retrieved': (r) => r.status === 200,
    'submissions response time < 1s': (r) => r.timings.duration < 1000,
  });

  // 현재 단계에 맞는 sleep 시간 적용 (정확한 RPS 제어)
  // 약간의 랜덤 변동 추가 (±10%)로 실제 환경 시뮬레이션
  const baseSleep = currentStage.sleep;
  const randomVariation = baseSleep * 0.1 * (Math.random() * 2 - 1); // ±10%
  const sleepTime = Math.max(0.1, baseSleep + randomVariation); // 최소 0.1초
  
  sleep(sleepTime);
}

export function handleSummary(data) {
  // 실제 RPS 계산 (초당 요청 수)
  const totalDuration = data.state.testRunDurationMs / 1000; // 초 단위
  const actualRps = (data.metrics.http_reqs.values.count / totalDuration).toFixed(2);
  
  // 목표 RPS와 비교
  const targetRps70 = 0.88; // CPU 70% 도달 예상 RPS (0.056 × 15.8)
  
  return {
    'results/judge-test-summary.json': JSON.stringify(data, null, 2),
    stdout: `
⚖️ 채점 시스템 CPU 70% 도달 부하 테스트 결과 (RPS 기반)

📊 주요 지표:
- 평균 응답 시간: ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms
- 95% 응답 시간: ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms
- 최대 응답 시간: ${data.metrics.http_req_duration.values.max.toFixed(2)}ms
- 총 요청 수: ${data.metrics.http_reqs.values.count}
- 실제 평균 RPS: ${actualRps} requests/sec
- 실패율: ${(data.metrics.http_req_failed.values.rate * 100).toFixed(2)}%
- 채점 성공률: ${(data.metrics.judge_success.values.rate * 100).toFixed(2)}%
- 총 테스트 시간: ${(totalDuration / 60).toFixed(2)}분

📈 CPU 70% 도달 분석:
- 실제 대회 집중 구간: 약 0.056 RPS (9분에 30건) → CPU 4.42%
- 목표: 약 ${targetRps70} RPS → CPU 70% 도달 예상 (K6 정수 제한으로 실제 값과 다를 수 있음)
- CloudWatch에서 CPU 70% 도달 시점의 실제 RPS 기록 필요
- CPU 70% 초과 시 성능 저하(응답 시간 증가, 에러율 증가) 확인

💡 참고사항:
- 이 테스트는 실제 대회 집중 구간(9분)과 유사하게 10분 동안 실행
- sleep 시간을 조절하여 정확한 RPS 달성 (0.056 → 1.2 RPS)
- 각 단계별 RPS와 CPU 사용률을 매핑하여 정확한 임계점 측정
- CPU 70% 도달 시점에서 Ctrl+C로 중단하여 해당 RPS 값 기록
- 단계별 RPS: 0.056 → 0.1 → 0.3 → 0.6 → 0.88 → 1.2 RPS
    `,
  };
}
