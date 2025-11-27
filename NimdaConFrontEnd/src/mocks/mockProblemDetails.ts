import type { IProblem, ITestCase } from "@/types/problem";

export type IProblemDetailMock = IProblem & {
  constraints: string[];
  samples: ITestCase[];
  stats: {
    accuracy: string;
    solved: number;
    attempts: number;
  };
};

export const mockProblemDetails: IProblemDetailMock[] = [
  {
    id: 1,
    title: "두 수의 합",
    description: "배열에서 두 수를 더해 target을 만드는 인덱스를 반환하세요.",
    timeLimit: 1000,
    memoryLimit: 256,
    difficulty: "EASY",
    language: "PYTHON",
    constraints: ["시간 제한: 1초", "메모리 제한: 256MB"],
    samples: [{ input: "[2, 7, 11, 15], 9", output: "[0, 1]", isPublic: true }],
    stats: { accuracy: "75%", solved: 3, attempts: 4 }, 
  },
  {
    id: 2,
    title: "가장 긴 팰린드롬",
    description: "주어진 문자열에서 가장 긴 팰린드롬을 찾으세요.",
    timeLimit: 2000,
    memoryLimit: 512,
    difficulty: "MEDIUM",
    language: "JAVA",
    constraints: ["시간 제한: 2초", "메모리 제한: 512MB"],
    samples: [{ input: "babad", output: "bab", isPublic: true }],
    stats: { accuracy: "66%", solved: 2, attempts: 3 },
  },
  {
    id: 3,
    title: "괄호 유효성 검사",
    description: "문자열이 유효한 괄호인지 확인하세요.",
    timeLimit: 1500,
    memoryLimit: 256,
    difficulty: "EASY",
    language: "CPP",
    constraints: ["시간 제한: 1.5초", "메모리 제한: 256MB"],
    samples: [{ input: "()[]{}", output: "true", isPublic: true }],
    stats: { accuracy: "0%", solved: 0, attempts: 0 },
  },
  {
    id: 4,
    title: "트리 순회",
    description: "전위, 중위, 후위 순회 결과를 출력하세요.",
    timeLimit: 1000,
    memoryLimit: 512,
    difficulty: "MEDIUM",
    language: "JAVA",
    constraints: ["시간 제한: 1초", "메모리 제한: 512MB"],
    samples: [{ input: "A B C", output: "A B C", isPublic: true }],
    stats: { accuracy: "100%", solved: 2, attempts: 2 },
  },
  {
    id: 5,
    title: "최단 경로 찾기",
    description: "다익스트라 알고리즘을 사용하여 최단 경로를 찾으세요.",
    timeLimit: 3000,
    memoryLimit: 1024,
    difficulty: "HARD",
    language: "CPP",
    constraints: ["시간 제한: 3초", "메모리 제한: 1024MB"],
    samples: [{ input: "Graph Data", output: "Shortest Path", isPublic: true }],
    stats: { accuracy: "0%", solved: 0, attempts: 0 },
  },
  {
    id: 6,
    title: "그리디 알고리즘 기초",
    description: "거스름돈 문제 풀이",
    timeLimit: 1000,
    memoryLimit: 256,
    difficulty: "EASY",
    language: "PYTHON",
    constraints: ["시간 제한: 1초", "메모리 제한: 256MB"],
    samples: [{ input: "1260", output: "6", isPublic: true }],
    stats: { accuracy: "100%", solved: 1, attempts: 1 },
  },
  {
    id: 7,
    title: "K번째 수 찾기",
    description: "정렬 후 K번째 원소를 찾는 문제.",
    timeLimit: 500,
    memoryLimit: 128,
    difficulty: "MEDIUM",
    language: "JAVA",
    constraints: ["시간 제한: 0.5초", "메모리 제한: 128MB"],
    samples: [{ input: "[1, 5, 2, 6, 3, 7, 4], 2, 5, 3", output: "[5]", isPublic: true }],
    stats: { accuracy: "0%", solved: 0, attempts: 1 },
  },
];