import type { IGroupProblemResult } from "@/types/problemResult";

export const mockProblemGroupResults: IGroupProblemResult[] = [
  // --- 문제 1 (Group 1) - 101, 103, 104 결과 ---
  {
    problemId: 1,
    submissionId: 1001,
    userName: "김그룹",
    status: "정답",
    runTime: "124ms",
    memory: "15.2MB",
    language: "PYTHON",
    submittedCode: "def solution():\n    return 'Clean Code'",
    testCases: [{ name: "TC1", result: "ACCEPTED", time: "42ms", memory: "5.1MB" }],
    submissionInfo: { time: "2025.11.10 16:02", attempts: "1회" },
    stats: { accuracy: "75%", solved: "3명", attempts: "4회" },
  },
  {
    problemId: 1,
    submissionId: 1003,
    userName: "박알고",
    status: "오답",
    runTime: "140ms",
    memory: "16.5MB",
    language: "PYTHON",
    submittedCode: "def solution():\n    # Mistake here...",
    testCases: [
        { name: "TC1", result: "ACCEPTED", time: "45ms", memory: "5.3MB" },
        { name: "TC2", result: "WRONG_ANSWER", time: "10ms", memory: "2.0MB" }
    ],
    submissionInfo: { time: "2025.11.12 09:00", attempts: "1회" },
    stats: { accuracy: "75%", solved: "3명", attempts: "4회" },
  },
  {
    problemId: 1,
    submissionId: 1004,
    userName: "최백준",
    status: "정답",
    runTime: "130ms",
    memory: "16.0MB",
    language: "PYTHON",
    submittedCode: "print('Solved via Brute Force')",
    testCases: [{ name: "TC1", result: "ACCEPTED", time: "44ms", memory: "5.2MB" }],
    submissionInfo: { time: "2025.11.11 10:00", attempts: "2회" },
    stats: { accuracy: "75%", solved: "3명", attempts: "4회" },
  },
  
  // --- 문제 4 (Group 2) - 다양한 언어 사례 ---
  {
    problemId: 4,
    submissionId: 4001,
    userName: "정트리",
    status: "정답",
    runTime: "80ms",
    memory: "12MB",
    language: "JAVA",
    submittedCode: "public class Main {\n    public void traverse() {}\n}",
    testCases: [{ name: "TC1", result: "ACCEPTED", time: "80ms", memory: "12MB" }],
    submissionInfo: { time: "2025.02.05 10:00", attempts: "1회" },
    stats: { accuracy: "100%", solved: "2명", attempts: "2회" },
  },
  {
    problemId: 4,
    submissionId: 4002,
    userName: "김그룹",
    status: "오답",
    runTime: "0ms",
    memory: "0MB",
    language: "CPP17",
    submittedCode: "#inlcude <iostream> // Typo",
    testCases: [],
    submissionInfo: { time: "2025.02.05 11:00", attempts: "1회" },
    stats: { accuracy: "100%", solved: "2명", attempts: "2회" },
  }
];