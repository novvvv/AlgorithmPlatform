export type ProblemDifficulty = "EASY" | "MEDIUM" | "HARD" ;
export type ProgrammingLanguage = "JAVA" | "PYTHON" | "CPP" ;
export type SubmissionStatus = 'PENDING' | 'AC' | 'WA' | 'TLE' | 'MLE' | 'RE' | 'CE';

export interface ISubmission {
  submissionId: number;
  userId: number; // FK
  problemId: number; // FK
  code: string;
  language: ProgrammingLanguage;
  status: SubmissionStatus;
  submittedAt: string;
}

export interface ITestCase {
  input: string;
  output: string;
}

export interface IProblem {
  id: number;
  title: string;
  description: string;
  timeLimit: number;        // 밀리초 단위
  memoryLimit: number;      // KB 단위
  difficulty: ProblemDifficulty;
  language: ProgrammingLanguage | null;   
  group: number | null;         
  createdAt: string;
  updatedAt: string;
}

export interface CreateProblemRequest {
  title: string;
  description: string;
  timeLimit: number;
  memoryLimit: number;
  difficulty: ProblemDifficulty;
  language: ProgrammingLanguage;
  isPublic: string;        // "true" 또는 "false" 문자열
  groupId: number | null;    
  testCases: ITestCase[];
}

export interface CreateProblemResponse {
  success: boolean;
  message: string;
  problem?: {
    id: number;
    title: string;
    description: string;
    timeLimit: number;
    memoryLimit: number;
    difficulty: ProblemDifficulty;
    language: ProgrammingLanguage;
    createdAt: string;
    updatedAt: string;
  };
}

export interface GetAllProblemsResponse {
  success: boolean;
  problems: IProblem[];
  message?: string;
}

export interface GetProblemByIdResponse {
  success: boolean;
  problem?: IProblem;
  testCases?: ITestCase[];   
  message?: string;
}

export interface GetProblemsByGroupIdResponse {
  success: boolean;
  problems: IProblem[]; 
  message?: string;
}
