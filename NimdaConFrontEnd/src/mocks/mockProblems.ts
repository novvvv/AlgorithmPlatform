import type { IProblem } from "@/types/problem"; 

export interface IProblemWithProgress extends IProblem {
  correctRate?: number;
  completionRate?: number; // 완료율 (0-100)
  completionCount?: number; // 완료한 멤버 수
  totalMembers?: number; // 전체 멤버 수
  solvedBy?: number[]; // userId list who solved this problem
}

export const mockProblems: IProblemWithProgress[] = [
  {
    id: 1,
    title: "두 수의 합",
    description: "배열에서  두 수 를 더해 target을 만드는 인덱스를 반환하세요.",
    timeLimit: 1000,
    memoryLimit: 256,
    group: 1,
    createdAt: "",
    updatedAt: "",
    language: "PYTHON" as const, // ProgrammingLanguage
    difficulty: "EASY" as const, // ProblemDifficulty
    correctRate: 75,
    completionRate: 75,
    completionCount: 3,
    totalMembers: 4,
    solvedBy: [101, 103],
  },
  {
    id: 2,
    title: "두 수의 합",
    description: "...",
    timeLimit: 1000,
    memoryLimit: 256,
    group: 1,
    createdAt: "",
    updatedAt: "",
    language: "JAVA" as const,
    difficulty: "MEDIUM" as const,
    correctRate: 75,
    completionRate: 50,
    completionCount: 2,
    totalMembers: 4,
    solvedBy: [101, 102],
  },
  {
    id: 3,
    title: "두 수의 합",
    description: "배열에서  두 수 를 더해 target을 만드는 인덱스를 반환하세요.",
    timeLimit: 1000,
    memoryLimit: 256,
    group: 2,
    createdAt: "",
    updatedAt: "",
    language: "CPP" as const,
    difficulty: "HARD" as const,
    correctRate: 75,
    completionRate: 25,
    completionCount: 1,
    totalMembers: 4,
    solvedBy: [101],
  },
];
