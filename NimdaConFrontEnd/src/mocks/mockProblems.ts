import type { IProblem } from "@/types/problem"; 

const mockProblems: (IProblem & { correctRate: number })[] = [
  {
    problem_id: 1,
    title: "두 수의 합",
    description: "...",
    time_limit: 1000,
    memory_limit: 256,
    created_by: 1,
    group_id: null,
    created_at: "",
    updated_at: "",
    language: "PYTHON" as const, // ProgrammingLanguage
    difficulty: "EASY" as const, // ProblemDifficulty
    correctRate: 75,
  },
  {
    problem_id: 2,
    title: "두 수의 합",
    description: "...",
    time_limit: 1000,
    memory_limit: 256,
    created_by: 1,
    group_id: null,
    created_at: "",
    updated_at: "",
    language: "JAVA" as const,
    difficulty: "MEDIUM" as const,
    correctRate: 75,
  },
  {
    problem_id: 3,
    title: "두 수의 합",
    description: "...",
    time_limit: 1000,
    memory_limit: 256,
    created_by: 1,
    group_id: null,
    created_at: "",
    updated_at: "",
    language: "CPP" as const,
    difficulty: "HARD" as const,
    correctRate: 75,
  },
];

export default mockProblems;