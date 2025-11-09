// Problem.ts (Enum/Type)
export type ProblemDifficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type ProgrammingLanguage = 'PYTHON' | 'JAVA' | 'CPP';

export interface IProblem {
  problem_id: number;
  title: string;
  description: string;
  difficulty: ProblemDifficulty;
  language: ProgrammingLanguage;
  time_limit: number; // UNSIGNED INT
  memory_limit: number; // UNSIGNED INT
  created_by: number; // FK
  group_id: number | null; // FK
  created_at: string;
  updated_at: string;
}

// Submission.ts (Enum/Type)
export type SubmissionStatus = 'PENDING' | 'AC' | 'WA' | 'TLE' | 'MLE' | 'RE' | 'CE';

export interface ISubmission {
  submission_id: number;
  user_id: number; // FK
  problem_id: number; // FK
  code: string;
  language: ProgrammingLanguage;
  status: SubmissionStatus;
  submitted_at: string;
}