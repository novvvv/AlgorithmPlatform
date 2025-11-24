import type { SubmissionStatus } from "@/types/problem";

export interface IProblemTestCaseResult {
  name: string;
  result: SubmissionStatus;
  time: string;
  memory: string;
}

export interface IProblemResultMock {
  id: number;
  status: "정답" | "오답";
  runTime: string;
  memory: string;
  language: string;
  testCases: IProblemTestCaseResult[];
  submittedCode: string;
  submissionInfo: {
    time: string;
    attempts: string;
  };
  stats: {
    accuracy: string;
    solved: string;
    attempts: string;
  };
}

export const mockProblemResults: IProblemResultMock[] = [
  {
    id: 1,
    status: "정답",
    runTime: "124ms",
    memory: "15.2MB",
    language: "Python",
    testCases: [
      { name: "테스트 케이스 1", result: "AC", time: "42ms", memory: "5.1MB" },
      { name: "테스트 케이스 2", result: "AC", time: "38ms", memory: "5.0MB" },
      { name: "테스트 케이스 3", result: "WA", time: "44ms", memory: "5.2MB" },
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
    id: 2,
    status: "오답",
    runTime: "215ms",
    memory: "18.4MB",
    language: "Java",
    testCases: [
      { name: "테스트 케이스 1", result: "AC", time: "60ms", memory: "6.2MB" },
      { name: "테스트 케이스 2", result: "WA", time: "75ms", memory: "6.7MB" },
    ],
    submittedCode: `def solution():
    # 코드를 작성하세요`,
    submissionInfo: {
      time: "2025.11.12 10:14",
      attempts: "4회",
    },
    stats: {
      accuracy: "52%",
      solved: "3명",
      attempts: "3.1회",
    },
  },
  {
    id: 3,
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
