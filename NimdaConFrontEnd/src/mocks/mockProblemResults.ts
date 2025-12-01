import type { IRecentSubmission, SubmissionStatus } from "@/types/judge";

export type IProblemResult = IRecentSubmission & {
  testCases: Array<{ name: string; result: SubmissionStatus; time: string; memory: string; }>;
  submittedCode: string; 
  submissionInfo: { time: string; attempts: string; };
  stats: { accuracy: string; solved: string; attempts: string; };
};

export const mockProblemResults: IProblemResult[] = [
  // --- 문제 1: 두 수의 합 (ID: 1) ---
  // 1. 김그룹 (101) - 완벽한 정답
  {
    id: 1001,
    problemId: 1,
    problemTitle: "두 수의 합",
    userId: 101,
    userName: "김그룹",
    status: "ACCEPTED",
    score: 100,
    executionTime: "124ms",
    memoryUsage: "15.2MB",
    language: "PYTHON",
    submittedAt: "2025-10-10T16:02:00Z",
    submittedCode: "def solution(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []",
    code: "def solution(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in seen:\n            return [seen[complement], i]\n        seen[num] = i\n    return []",
    testCases: [
        { name: "기본 예제", result: "ACCEPTED", time: "42ms", memory: "5.1MB" },
        { name: "음수 포함", result: "ACCEPTED", time: "40ms", memory: "5.1MB" },
        { name: "대규모 데이터", result: "ACCEPTED", time: "124ms", memory: "15.2MB" }
    ],
    submissionInfo: { time: "2025.10.10 16:02", attempts: "1회" },
    stats: { accuracy: "75%", solved: "3명", attempts: "4회" },
  },
  // 2. 박알고 (103) - 부분 점수 (엣지 케이스 실패)
  {
    id: 1003,
    problemId: 1,
    problemTitle: "두 수의 합",
    userId: 103,
    userName: "박알고",
    status: "WRONG_ANSWER", 
    score: 90,
    executionTime: "140ms",
    memoryUsage: "16.5MB",
    language: "PYTHON",
    submittedAt: "2025-10-11T09:00:00Z",
    submittedCode: "def solution(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]",
    code: "def solution(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]",
    testCases: [
        { name: "기본 예제", result: "ACCEPTED", time: "45ms", memory: "5.3MB" },
        { name: "중복된 숫자", result: "WRONG_ANSWER", time: "10ms", memory: "2.0MB" }
    ],
    submissionInfo: { time: "2025.10.11 09:00", attempts: "1회" },
    stats: { accuracy: "75%", solved: "3명", attempts: "4회" },
  },
  // 3. 최백준 (104) - 효율성 부족하지만 통과 (Brute Force)
  {
    id: 1004,
    problemId: 1,
    problemTitle: "두 수의 합",
    userId: 104,
    userName: "최백준",
    status: "ACCEPTED",
    score: 80, // 점수는 낮지만 통과 처리
    executionTime: "850ms", // 시간이 오래 걸림
    memoryUsage: "16.0MB",
    language: "PYTHON",
    submittedAt: "2025-10-11T12:00:00Z",
    submittedCode: "# Brute Force solution\ndef solution(nums, target):\n    n = len(nums)\n    for i in range(n):\n        for j in range(n):\n            if i != j and nums[i] + nums[j] == target:\n                return [i, j]",
    code: "# Brute Force solution\ndef solution(nums, target):\n    n = len(nums)\n    for i in range(n):\n        for j in range(n):\n            if i != j and nums[i] + nums[j] == target:\n                return [i, j]",
    testCases: [
        { name: "기본 예제", result: "ACCEPTED", time: "45ms", memory: "5.2MB" },
        { name: "대규모 데이터", result: "ACCEPTED", time: "850ms", memory: "16.0MB" }
    ],
    submissionInfo: { time: "2025.10.11 12:00", attempts: "2회" },
    stats: { accuracy: "75%", solved: "3명", attempts: "4회" },
  },

  // --- 문제 2: 가장 긴 팰린드롬 (ID: 2) ---
  {
    id: 2001,
    problemId: 2,
    problemTitle: "가장 긴 팰린드롬",
    userId: 102,
    userName: "이코딩",
    status: "ACCEPTED",
    score: 85,
    executionTime: "200ms",
    memoryUsage: "20.1MB",
    language: "JAVA",
    submittedAt: "2025-10-12T14:00:00Z",
    submittedCode: "public class Main {\n    public static void main(String[] args) {\n        // Solution implementation\n    }\n}",
    code: "public class Main {\n    public static void main(String[] args) {\n        // Solution implementation\n    }\n}",
    testCases: [{ name: "Case 1", result: "ACCEPTED", time: "100ms", memory: "10MB" }],
    submissionInfo: { time: "2025.10.12 14:00", attempts: "1회" },
    stats: { accuracy: "66%", solved: "2명", attempts: "3회" },
  },

  // --- 문제 5: 최단 경로 찾기 (ID: 5) - 런타임 에러 사례 ---
  {
    id: 5001,
    problemId: 5,
    problemTitle: "최단 경로 찾기",
    userId: 106,
    userName: "정트리",
    status: "RUNTIME_ERROR",
    score: 0,
    executionTime: "0ms",
    memoryUsage: "0MB",
    language: "CPP",
    submittedAt: "2025-02-12T10:00:00Z",
    submittedCode: "#include <vector>\nint main() {\n    std::vector<int> v;\n    return v.at(10); // Out of range\n}",
    code: "#include <vector>\nint main() {\n    std::vector<int> v;\n    return v.at(10); // Out of range\n}",
    testCases: [{ name: "Case 1", result: "RUNTIME_ERROR", time: "0ms", memory: "0MB" }],
    submissionInfo: { time: "2025.02.12 10:00", attempts: "3회" },
    stats: { accuracy: "0%", solved: "0명", attempts: "5회" },
  },

  // --- 문제 7: K번째 수 찾기 (ID: 7) - 시간 초과 사례 ---
  {
    id: 7001,
    problemId: 7,
    problemTitle: "K번째 수 찾기",
    userId: 102,
    userName: "이코딩",
    status: "TIME_LIMIT_EXCEEDED",
    score: 40,
    executionTime: "2000ms", // 제한 시간 초과
    memoryUsage: "5MB",
    language: "JAVA",
    submittedAt: "2025-03-15T10:00:00Z",
    submittedCode: "class Solution {\n    // O(N^2) implementation for sorting\n}",
    code: "class Solution {\n    // O(N^2) implementation for sorting\n}",
    testCases: [
        { name: "작은 데이터", result: "ACCEPTED", time: "30ms", memory: "5MB" },
        { name: "큰 데이터", result: "TIME_LIMIT_EXCEEDED", time: "2000ms+", memory: "128MB" }
    ],
    submissionInfo: { time: "2025.03.15 10:00", attempts: "1회" },
    stats: { accuracy: "0%", solved: "0명", attempts: "1회" },
  },
];