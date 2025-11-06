export interface SubmissionRequest {
  title: string;
  code: string;
  language: string;
  description?: string;
  flag?: string;
  hints?: string;
  points?: number;
}

export interface JudgeResponse {
  success: boolean;
  message: string;
  result?: {
    status: string;
    message?: string;
    output?: string;
    errorOutput?: string;
    executionTime?: number;
    memoryUsage?: number;
    score?: number;
  };
  submittedBy?: string;
  submissionId?: number;
}