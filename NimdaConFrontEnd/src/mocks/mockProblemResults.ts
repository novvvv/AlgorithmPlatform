import type { IProblemResult } from "@/types/problemResult";

export const mockProblemResults: IProblemResult[] = [
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
    problemId: 2,
    submissionId: 2001,
    userName: "김코딩",
    status: "오답",
    runTime: "190ms",
    memory: "12.6MB",
    language: "Python",
    testCases: [
      { name: "테스트 케이스 1", result: "AC", time: "80ms", memory: "5.1MB" },
      { name: "테스트 케이스 2", result: "WA", time: "70ms", memory: "5.0MB" },
    ],
    submittedCode: `def solution():
    # TODO
    pass`,
    submissionInfo: {
      time: "2025.11.13 08:21",
      attempts: "1회",
    },
    stats: {
      accuracy: "68%",
      solved: "3명",
      attempts: "2.1회",
    },
  },
  {
    problemId: 3,
    submissionId: 3001,
    userName: "박버그",
    status: "오답",
    runTime: "95ms",
    memory: "10.5MB",
    language: "Python",
    testCases: [
      { name: "테스트 케이스 1", result: "WA", time: "30ms", memory: "4.2MB" },
    ],
    submittedCode: `def solution():
    # 코드 수정 필요`,
    submissionInfo: {
      time: "2025.11.13 09:05",
      attempts: "1회",
    },
    stats: {
      accuracy: "40%",
      solved: "2명",
      attempts: "3.5회",
    },
  },
];
