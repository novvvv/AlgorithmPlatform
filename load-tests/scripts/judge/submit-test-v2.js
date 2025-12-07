import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// 커스텀 메트릭
const errorRate = new Rate('errors');
const judgeSuccessRate = new Rate('judge_success');

// 테스트 설정 - CPU 30% 기준으로 API 호출 2배 증가
// 현재 테스트: 평균 0.98 RPS → CPU 30%
// 목표: 약 2 RPS → CPU 60-70% 도달 예상
// 실제 대회 환경 시뮬레이션: 채점 + 문제 조회 + 랭킹 조회 등
export const options = {
  stages: [
    // 단계 1: 기준선 (현재 테스트 수준)
    { duration: '1m', target: 1 },     // 1분: 1명 유지
    
    // 단계 2: 부하 증가 (2배)
    { duration: '1m', target: 1 },    // 1분: 1명 유지 (sleep 시간 단축)
    { duration: '2m', target: 1 },    // 2분: 1명 유지
    
    // 단계 3: 더 높은 부하
    { duration: '1m', target: 1 },    // 1분: 1명 유지
    { duration: '2m', target: 1 },    // 2분: 1명 유지
    
    // 단계 4: 최대 부하 (CPU 70% 도달 예상)
    { duration: '1m', target: 1 },    // 1분: 1명 유지
    { duration: '3m', target: 1 },    // 3분: 1명 유지 (CPU 70% 도달 확인)
    
    // 단계 5: 부하 감소
    { duration: '30s', target: 0 },   // 30초: 0명으로 감소
  ],
  thresholds: {
    http_req_duration: ['p(95)<10000'],
    http_req_failed: ['rate<0.1'],
    judge_success: ['rate>0.5'],  // 정답 코드만 사용하므로 50% 이상
  },
};

// 테스트 데이터
const BASE_URL = 'http://52.78.249.69:80';
const TEST_USER = {
  userId: 'TEAM1',
  password: '1111'
};

// 정답 코드만 사용 (CPU 부하 측정을 위해)
const CORRECT_CODES = [
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
  },
  {
    problemId: 2,
    language: 'C++17',
    code: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello World" << endl;
    return 0;
}`,
  },
];

// 단계별 RPS와 sleep 시간 매핑 (2배 증가)
const RPS_STAGES = [
  { rps: 0.98, sleep: 1.02, name: '기준선 (현재 테스트 수준)' },      // 0-1분
  { rps: 1.5, sleep: 0.67, name: '부하 증가 (1.5배)' },              // 1-4분
  { rps: 2.0, sleep: 0.5, name: '더 높은 부하 (2배)' },              // 4-7분
  { rps: 2.5, sleep: 0.4, name: '최대 부하 (2.5배, CPU 70% 예상)' }, // 7-11분
];

// 전역 변수로 테스트 시작 시간 저장
let testStartTime = null;

export function setup() {
  testStartTime = Date.now();
  return { startTime: testStartTime };
}

// 현재 단계 계산
function getCurrentStage(data) {
  const elapsedSeconds = data && data.startTime ? 
    (Date.now() - data.startTime) / 1000 : 0;
  
  if (elapsedSeconds < 60) return RPS_STAGES[0];      // 0-1분
  if (elapsedSeconds < 240) return RPS_STAGES[1];     // 1-4분
  if (elapsedSeconds < 420) return RPS_STAGES[2];     // 4-7분
  if (elapsedSeconds < 660) return RPS_STAGES[3];     // 7-11분
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
  if (loginResponse.status === 200) {
    try {
      const loginBody = JSON.parse(loginResponse.body);
      token = loginBody.accessToken || loginBody.access_token || loginBody.token || loginBody.data?.accessToken;
    } catch (e) {
      console.error('Failed to parse login response');
    }
  }
  
  if (!token) {
    console.error('Login failed, skipping');
    return;
  }
  
  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };
  
  // 2. 문제 목록 조회 (실제 대회 환경 시뮬레이션)
  const problemsResponse = http.get(`${BASE_URL}/api/problems`, { headers: authHeaders });
  check(problemsResponse, {
    'problems list retrieved': (r) => r.status === 200,
  });
  
  sleep(0.1); // 짧은 대기
  
  // 3. 랜덤 문제 선택 및 상세 조회
  const testCase = CORRECT_CODES[Math.floor(Math.random() * CORRECT_CODES.length)];
  const problemDetailResponse = http.get(
    `${BASE_URL}/api/problems/${testCase.problemId}`,
    { headers: authHeaders }
  );
  check(problemDetailResponse, {
    'problem detail retrieved': (r) => r.status === 200,
  });
  
  sleep(0.1); // 짧은 대기
  
  // 4. 코드 제출 (정답 코드만 사용)
  const submitPayload = JSON.stringify({
    title: `Problem ${testCase.problemId}`,
    code: testCase.code,
    language: testCase.language,
    problemId: testCase.problemId,
    description: "CPU 70% 도달 부하 테스트 (2배 증가)",
    points: 100
  });
  
  const submitResponse = http.post(
    `${BASE_URL}/api/judge/submit`,
    submitPayload,
    { headers: authHeaders }
  );
  
  // 제출 응답 검증
  const submitSuccess = check(submitResponse, {
    'submit status is 200': (r) => r.status === 200,
    'submit response time < 10s': (r) => r.timings.duration < 10000,
  });
  
  let judgeResult = null;
  if (submitResponse.status === 200) {
    try {
      judgeResult = JSON.parse(submitResponse.body);
      const resultObj = judgeResult.result || judgeResult;
      const actualStatus = resultObj.status;
      
      const judgeSuccess = check(resultObj, {
        'judge completed': (result) => result.status !== 'SYSTEM_ERROR',
        'judge accepted': (result) => result.status === 'ACCEPTED',
      });
      
      judgeSuccessRate.add(judgeSuccess);
    } catch (e) {
      console.error('Failed to parse submit response');
      judgeSuccessRate.add(false);
    }
  }
  
  errorRate.add(!submitSuccess);
  
  sleep(0.1); // 짧은 대기
  
  // 5. 제출 목록 조회
  const submissionsResponse = http.get(
    `${BASE_URL}/api/judge/submissions`,
    { headers: authHeaders }
  );
  
  check(submissionsResponse, {
    'submissions list retrieved': (r) => r.status === 200,
  });
  
  // 현재 단계에 맞는 sleep 시간 적용 (2배 증가된 RPS)
  const baseSleep = currentStage.sleep;
  const randomVariation = baseSleep * 0.1 * (Math.random() * 2 - 1);
  const sleepTime = Math.max(0.1, baseSleep + randomVariation);
  
  sleep(sleepTime);
}

export function handleSummary(data) {
  const totalDuration = data.state.testRunDurationMs / 1000;
  const actualRps = (data.metrics.http_reqs.values.count / totalDuration).toFixed(2);
  
  return {
    'results/judge-test-v2-summary.json': JSON.stringify(data, null, 2),
    stdout: `
⚖️ 채점 시스템 부하 테스트 v2 (API 호출 2배 증가)

📊 주요 지표:
- 평균 응답 시간: ${data.metrics.http_req_duration.values.avg.toFixed(2)}ms
- 95% 응답 시간: ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)}ms
- 최대 응답 시간: ${data.metrics.http_req_duration.values.max.toFixed(2)}ms
- 총 요청 수: ${data.metrics.http_reqs.values.count}
- 실제 평균 RPS: ${actualRps} requests/sec
- 실패율: ${(data.metrics.http_req_failed.values.rate * 100).toFixed(2)}%
- 채점 성공률: ${(data.metrics.judge_success.values.rate * 100).toFixed(2)}%
- 총 테스트 시간: ${(totalDuration / 60).toFixed(2)}분

📈 CPU 부하 분석:
- 기준: 평균 0.98 RPS → CPU 30%
- 목표: 평균 2 RPS → CPU 60-70% 도달 예상
- 실제 대회 환경 시뮬레이션: 채점 + 문제 조회 + 제출 목록 조회
- CloudWatch에서 CPU 70% 도달 시점의 실제 RPS 기록 필요

💡 참고사항:
- 정답 코드만 사용하여 실제 채점 작업 실행
- 각 iteration마다: 로그인 + 문제 목록 + 문제 상세 + 채점 제출 + 제출 목록 조회
- 단계별 RPS: 0.98 → 1.5 → 2.0 → 2.5 RPS
    `,
  };
}

