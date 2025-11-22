import type { ProgrammingLanguage } from "./problem";

export interface ISubmissionRequest {
  problemId: number;
  language: ProgrammingLanguage;
  code: string;
}

export interface ITestCaseResult {
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  executionTime?: number;
  memoryUsage?: number;
}

export interface IJudgeResult {
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Memory Limit Exceeded" | "Runtime Error" | "Compile Error";
  totalTestCases: number;
  passedTestCases: number;
  testCaseResults?: ITestCaseResult[];
  errorMessage?: string;
}

export interface IJudgeResponse {
  success: boolean;
  message: string;
  result?: IJudgeResult;
  submittedBy?: string;
  submissionId?: number;
}

export interface ISubmission {
  id: number;
  problemId: number;
  userId: number;
  language: ProgrammingLanguage;
  code: string;
  status: string;
  submittedAt: string;
}

export interface GetSupportedLanguagesResponse {
  success: boolean;
  languages?: ProgrammingLanguage[];
  message?: string;
}

export interface GetAllSubmissionsResponse {
  success: boolean;
  submissions: ISubmission[];
  totalCount: number;
  message?: string;
}
