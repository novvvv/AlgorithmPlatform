import type { SubmissionStatus, ProgrammingLanguage } from "./problem";
export type JudgeStatus = 'AC' | 'WA' | 'TLE' | 'MLE' | 'RE' | 'CE';


export interface ISubmissionRequest {
  problemId: number;
  language: ProgrammingLanguage;
  code: string;
  status: SubmissionStatus;
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
  status: JudgeStatus;
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
  status: SubmissionStatus;
  submittedAt?: string;
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
