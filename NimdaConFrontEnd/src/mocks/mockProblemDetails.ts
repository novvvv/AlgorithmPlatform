import type { ProblemDifficulty, ProgrammingLanguage } from "@/types/problem";

export interface IProblemSample {
  input: string;
  output: string;
}

export interface IProblemDetailMock {
  id: number;
  title: string;
  description: string;
  constraints: string[];
  samples: IProblemSample[];
  stats: {
    accuracy: string;
    solved: number;
    attempts: number;
  };
  language: ProgrammingLanguage;
  difficulty: ProblemDifficulty;
}

export const mockProblemDetails: IProblemDetailMock[] = [
  {
    id: 1,
    title: "두 수의 합",
    description: "배열에서 두 수를 더해 target을 만드는 인덱스를 반환하세요.",
    constraints: ["시간 제한: 2초", "메모리 제한: 256MB"],
    samples: [
      { input: "입력 예시", output: "출력 예시" }
    ],
    stats: {
      accuracy: "75%",
      solved: 5,
      attempts: 2.3,
    },
    language: "PYTHON",
    difficulty: "EASY",
  },
  {
    id: 2,
    title: "정수 뒤집기",
    description: "정수를 뒤집어 반환하세요.",
    constraints: ["시간 제한: 1초", "메모리 제한: 128MB"],
    samples: [{ input: "123", output: "321" }],
    stats: {
      accuracy: "68%",
      solved: 3,
      attempts: 2.1,
    },
    language: "JAVA",
    difficulty: "MEDIUM",
  },
  {
    id: 3,
    title: "문제 이름",
    description: "새로운 문제에 대한 설명입니다.",
    constraints: ["시간 제한: 3초", "메모리 제한: 512MB"],
    samples: [
      { input: "입력 예시", output: "출력 예시" }
    ],
    stats: {
      accuracy: "40%",
      solved: 2,
      attempts: 3.5,
    },
    language: "PYTHON",
    difficulty: "HARD",
  },
];
