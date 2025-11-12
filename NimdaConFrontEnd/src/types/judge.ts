// types/submission.ts
export interface ISubmissionRequest {
  // DB 스키마 기반의 'Submission' 인터페이스와 이름 충돌을 피하기 위해 'Request'를 붙입니다.
  // 이 타입의 속성은 DB 모델 Submission과 다를 수 있습니다.
  title: string;
  code: string;
  language: string;
  description?: string;
  flag?: string;
  hints?: string;
  points?: number;
}

export interface IJudgeResponse {
  success: boolean;
  message: string;
  // JudgeResult DB 스키마와 유사하게 구조화하는 것을 고려할 수 있습니다.
  result?: {
    status: string;
    message?: string;
    output?: string;
    errorOutput?: string;
    executionTime?: number;
    memoryUsage?: number;
    score?: number;
  };
  submittedBy?: string; // 제출자 정보 (IUser의 일부 또는 string)
  submissionId?: number; // 채점된 제출 ID
}