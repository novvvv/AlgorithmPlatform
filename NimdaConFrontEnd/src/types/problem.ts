export type ProblemDifficulty = "EASY" | "MEDIUM" | "HARD" ;
export type ProgrammingLanguage = "JAVA" | "PYTHON" | "CPP" ;

export interface IProblem {
  id?: number;
  title: string;
  description: string;
  timeLimit: number;        // 밀리초 단위
  memoryLimit: number;      // KB 단위
  difficulty: ProblemDifficulty;
  language?: ProgrammingLanguage;   
  groupId?: number; 
  group?: string;        
  createdAt?: string;
  updatedAt?: string;
}

export interface ITestCase {
  input: string;
  output: string;
  isPublic: boolean;  
}
export interface CreateProblemRequest {
  problem: IProblem;
  testCases: ITestCase[];
}

export interface CreateProblemResponse {
  problem: IProblem;
  success: boolean;
  message?: string;
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
