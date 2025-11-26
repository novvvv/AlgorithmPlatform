import type { SubmissionStatus } from "@/types/judge";

export type JudgeDisplayStatus = "정답" | "오답";

export interface IProblemTestCaseResult {
  name: string;
  result: SubmissionStatus | string;
  time: string;
  memory: string;
}

export interface IProblemResult {
  problemId: number;
  submissionId: number;
  userName: string;
  status: JudgeDisplayStatus;
  runTime: string;
  memory: string;
  language: string;
  testCases: IProblemTestCaseResult[];
  submittedCode: string;
  submissionInfo: {
    time: string;
    attempts: string;
  };
  stats: {
    accuracy: string;
    solved: string;
    attempts: string;
  };
}

export interface IGroupProblemResult extends IProblemResult {}

export interface ProblemResultResponse {
  success: boolean;
  result?: IProblemResult;
  message?: string;
}

export interface GroupProblemResultsResponse {
  success: boolean;
  results: IGroupProblemResult[];
  message?: string;
}
