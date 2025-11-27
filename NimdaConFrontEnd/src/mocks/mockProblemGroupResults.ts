import type { IRecentSubmission, SubmissionStatus } from "@/types/judge";

export type IGroupProblemResult = IRecentSubmission & {
  rowId: number; 
  testCases: Array<{ name: string; result: SubmissionStatus; time: string; memory: string; }>;
  submittedCode: string; 
  submissionInfo: { time: string; attempts: string; };
  stats: { accuracy: string; solved: string; attempts: string; };
};

export const mockProblemGroupResults: IGroupProblemResult[] = [
  // --- 문제 1 (Group 1) - 101, 103, 104 결과 ---
  {
    rowId: 1,
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
    submittedAt: "2025-11-10T16:02:00Z",
    submittedCode: "def solution():\n    return 'Clean Code'",
    code: "def solution():\n    return 'Clean Code'", // 💡 code 추가
    testCases: [{ name: "TC1", result: "ACCEPTED", time: "42ms", memory: "5.1MB" }],
    submissionInfo: { time: "2025.11.10 16:02", attempts: "1회" },
    stats: { accuracy: "75%", solved: "3명", attempts: "4회" },
  },
  {
    rowId: 2,
    id: 1003,
    problemId: 1,
    problemTitle: "두 수의 합",
    userId: 103,
    userName: "박알고",
    status: "WRONG_ANSWER", // 오답 사례
    score: 90,
    executionTime: "140ms",
    memoryUsage: "16.5MB",
    language: "PYTHON",
    submittedAt: "2025-11-12T09:00:00Z",
    submittedCode: "def solution():\n    # Mistake here...",
    code: "def solution():\n    # Mistake here...", // 💡 code 추가
    testCases: [
        { name: "TC1", result: "ACCEPTED", time: "45ms", memory: "5.3MB" },
        { name: "TC2", result: "WRONG_ANSWER", time: "10ms", memory: "2.0MB" }
    ],
    submissionInfo: { time: "2025.11.12 09:00", attempts: "1회" },
    stats: { accuracy: "75%", solved: "3명", attempts: "4회" },
  },
  {
    rowId: 3,
    id: 1004,
    problemId: 1,
    problemTitle: "두 수의 합",
    userId: 104,
    userName: "최백준",
    status: "ACCEPTED",
    score: 80,
    executionTime: "130ms",
    memoryUsage: "16.0MB",
    language: "PYTHON",
    submittedAt: "2025-11-11T10:00:00Z",
    submittedCode: "print('Solved via Brute Force')",
    code: "print('Solved via Brute Force')", // 💡 code 추가
    testCases: [{ name: "TC1", result: "ACCEPTED", time: "44ms", memory: "5.2MB" }],
    submissionInfo: { time: "2025.11.11 10:00", attempts: "2회" },
    stats: { accuracy: "75%", solved: "3명", attempts: "4회" },
  },
  
  // --- 문제 4 (Group 2) - 다양한 언어 사례 ---
  {
    rowId: 4,
    id: 4001,
    problemId: 4,
    problemTitle: "트리 순회",
    userId: 106,
    userName: "정트리",
    status: "ACCEPTED",
    score: 100,
    executionTime: "80ms",
    memoryUsage: "12MB",
    language: "JAVA",
    submittedAt: "2025-02-05T10:00:00Z",
    submittedCode: "public class Main {\n    public void traverse() {}\n}",
    code: "public class Main {\n    public void traverse() {}\n}", // 💡 code 추가
    testCases: [{ name: "TC1", result: "ACCEPTED", time: "80ms", memory: "12MB" }],
    submissionInfo: { time: "2025.02.05 10:00", attempts: "1회" },
    stats: { accuracy: "100%", solved: "2명", attempts: "2회" },
  },
  {
    rowId: 5,
    id: 4002,
    problemId: 4,
    problemTitle: "트리 순회",
    userId: 101,
    userName: "김그룹",
    status: "COMPILATION_ERROR", // 컴파일 에러 사례
    score: 0,
    executionTime: "0ms",
    memoryUsage: "0MB",
    language: "CPP",
    submittedAt: "2025-02-05T11:00:00Z",
    submittedCode: "#inlcude <iostream> // Typo",
    code: "#inlcude <iostream> // Typo", // 💡 code 추가
    testCases: [],
    submissionInfo: { time: "2025.02.05 11:00", attempts: "1회" },
    stats: { accuracy: "100%", solved: "2명", attempts: "2회" },
  }
];