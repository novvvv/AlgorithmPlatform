import type { ProgrammingLanguage } from "./problem";

export type JudgeStatus = 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'MEMORY_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILATION_ERROR' | 'SYSTEM_ERROR';
export type SubmissionStatus = JudgeStatus | 'PENDING';

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
  status: JudgeStatus; // 변경된 JudgeStatus 사용
  message: string;
  output: string;
  errorOutput: string;
  executionTime: number; // 밀리초 단위
  memoryUsage: number;   // KB 단위로 가정 (API 가이드에는 단위 없음)
  score: number; // 0 ~ 100 정수 값 (테스트케이스 통과 비율)
}

export interface SubmissionRequest {
  title: string;
  code: string;
  language: ProgrammingLanguage;
  problemId: number;
  description: string; 
}

export interface JudgeResponse {
  result: IJudgeResult;
  submittedBy: string;
  submissionId: number;
  success: boolean;
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
  executionTime: string; // "120ms"와 같은 문자열
  memoryUsage: string;   // "15MB"와 같은 문자열
  score: number; // 제출 목록에도 score 필드 추가
}

export interface GetAllSubmissionsResponse {
  success: boolean;
  submissions: IRecentSubmission[];
  totalCount: number;
  message: string;
}

export interface GetUserSubmissionsResponse {
  success: boolean;
  submissions: IRecentSubmission[];
  totalCount: number;
  message: string;
}

export interface GetUserProblemSubmissionsResponse {
  success: boolean;
  submissions: IRecentSubmission[];
  totalCount: number;
  message: string;
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