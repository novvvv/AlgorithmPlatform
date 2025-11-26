import type { IGroupProblemResult } from "@/types/problemResult";

export const mockProblemGroupResults: IGroupProblemResult[] = [
  {
    problemId: 1,
    submissionId: 1001,
    userName: "김그룹",
    status: "정답",
    runTime: "124ms",
    memory: "15.2MB",
    language: "Python",
    testCases: [
      { name: "테스트 케이스 1", result: "AC", time: "42ms", memory: "5.1MB" },
      { name: "테스트 케이스 2", result: "AC", time: "38ms", memory: "5.0MB" },
      { name: "테스트 케이스 3", result: "AC", time: "44ms", memory: "5.2MB" },
    ],
    submittedCode: `def solution():
    # 코드를 작성하세요`,
    submissionInfo: {
      time: "2025.11.10 16:02",
      attempts: "3회",
    },
    stats: {
      accuracy: "75%",
      solved: "5명",
      attempts: "2.3회",
    },
  },
  {
    problemId: 1,
    submissionId: 1002,
    userName: "이코딩",
    status: "오답",
    runTime: "215ms",
    memory: "18.4MB",
    language: "Python",
    testCases: [
      { name: "테스트 케이스 1", result: "AC", time: "60ms", memory: "6.2MB" },
      { name: "테스트 케이스 2", result: "AC", time: "75ms", memory: "6.7MB" },
      { name: "테스트 케이스 3", result: "WA", time: "0ms", memory: "0MB" },
    ],
    submittedCode: `def solution():
    # 코드를 작성하세요`,
    submissionInfo: {
      time: "2025.11.11 10:14",
      attempts: "4회",
    },
    stats: {
      accuracy: "52%",
      solved: "3명",
      attempts: "3.1회",
    },
  },
  {
    problemId: 1,
    submissionId: 1003,
    userName: "박알고",
    status: "오답",
    runTime: "240ms",
    memory: "24.1MB",
    language: "Python",
    testCases: [
      { name: "테스트 케이스 1", result: "WA", time: "50ms", memory: "4.8MB" },
    ],
    submittedCode: `def solution():
    # 코드를 작성하세요`,
    submissionInfo: {
      time: "2025.11.12 09:45",
      attempts: "2회",
    },
    stats: {
      accuracy: "60%",
      solved: "4명",
      attempts: "2.7회",
    },
  },
];
