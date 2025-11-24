import type { ProgrammingLanguage } from "./problem";
export type SubmissionStatus = 'PENDING' | 'AC' | 'WA' | 'TLE' | 'MLE' | 'RE' | 'CE';
export type JudgeStatus = 'AC' | 'WA' | 'TLE' | 'MLE' | 'RE' | 'CE';

export interface ISubmission {
  submissionId: number;
  userId: number; // FK
  problemId: number; // FK
  code: string;
  language: ProgrammingLanguage;
  status: SubmissionStatus;
  submittedAt?: string;
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
  message: string;
  output?: string;
  errorOutput: string;
  executionTime: number;
  memoryUsage: number;
  score: number;
}

export interface SubmissionRequest {
  title: string;
  code: string;
  language: ProgrammingLanguage;
  problemId: number;
}

export interface JudgeResponse {
  result: IJudgeResult;
  submittedBy: string;
  submissionId: number;
  success: boolean;
  message: string;
}

export interface GetAllSubmissionsResponse {
  success: boolean;
  submissions: ISubmission[];
  totalCount: number;
  message: string;
}

export interface GetUserSubmissionsResponse {
  success: boolean;
  submissions: ISubmission[];
  totalCount: number;
  message: string;
}

export interface GetUserProblemSubmissionsResponse {
  success: boolean;
  submissions: ISubmission[];
  totalCount: number;
  message: string;
}

export interface IRecentSubmission {
  id: number;
  userId: number;
  userName: string;
  problemId: number;
  problemTitle: string;
  code: string;
  language: string;
  status: string;
  submittedAt: string;
  executionTime: string;
  memoryUsage: string;
}

export interface ISortInfo {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface IPageableInfo {
  pageNumber: number;
  pageSize: number;
  sort: ISortInfo;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface GetUserRecentSubmissionsResponse {
  content: IRecentSubmission[];
  pageable: IPageableInfo;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: ISortInfo;
  empty: boolean;
}

export interface GetGroupRecentSubmissionsResponse {
  content: IRecentSubmission[];
  pageable: IPageableInfo;
  totalPages: number;
  totalElements: number;
  last: boolean;
  numberOfElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: ISortInfo;
  empty: boolean;
}
