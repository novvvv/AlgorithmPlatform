export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "EXPERT";
export type Language = "JAVA" | "PYTHON" | "CPP17" | "C99";

export interface IProblem {
  id?: number;
  title: string;
  description: string;
  timeLimit: number;
  memoryLimit: number;
  difficulty: Difficulty;
  language: Language;   
  groupId?: number | null;
  createdAt?: string;
  updatedAt?: string;
  solvedBy?: { userId: number; score?: number }[];
  averageScore?: number;
}

export interface ITestCase {
  input: string;
  output: string;
  isPublic?: boolean;
}

export interface CreateProblemRequest {
  title: string;
  description: string;
  timeLimit: number;
  memoryLimit: number;
  difficulty: Difficulty;
  language: Language;
  groupId: number | null;
  testCases: ITestCase[];
}

export interface CreateProblemResponse {
  id: number;
  title: string;
  description: string;
  timeLimit: number;
  memoryLimit: number;
  difficulty: Difficulty;
  language: Language;
  groupId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetAllProblemsResponse {
  success: boolean;
  problems: IProblem[];
}

export interface GetProblemByIdResponse {
  success: boolean;
  problem?: IProblem;
  testCases?: ITestCase[];
}

export interface GetProblemsByGroupIdResponse {
  success: boolean;
  problems: IProblem[]; 
}
