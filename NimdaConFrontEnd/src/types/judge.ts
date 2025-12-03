import type { Language } from "./problem";

export type JudgeStatus = 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'MEMORY_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILATION_ERROR' | 'SYSTEM_ERROR';
export type SubmissionStatus = JudgeStatus | 'PENDING';

export interface ISubmission {
  id: number;
  userId: string;
  problemId: number;
  code: string;
  language: Language;
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
  output: string;
  errorOutput: string;
  executionTime: number;
  memoryUsage: number;
  score: number;
}

export interface SubmissionRequest {
  userId: string;
  code: string;
  language: Language;
  problemId: number;
}

export interface JudgeResponse {
  result: IJudgeResult;
  submittedBy: string;
  submissionId: number;
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

export interface GetAllSubmissionsResponse {
  success: boolean;
  submissions: IRecentSubmission[];
  totalCount: number;
}

export interface GetUserSubmissionsResponse {
  success: boolean;
  submissions: IRecentSubmission[];
  totalCount: number;
}

export interface GetUserProblemSubmissionsResponse {
  success: boolean;
  submissions: IRecentSubmission[];
  totalCount: number;
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

export type GetGroupRecentSubmissionsResponse = GetUserRecentSubmissionsResponse;