import type {
  ISubmissionRequest,
  IJudgeResponse,
  GetSupportedLanguagesResponse,
  GetAllSubmissionsResponse,
} from "@/types/judge";
import { apiClient, getErrorMessage } from "./utils";

/**
 * 코드 제출 및 채점 API 호출
 * POST /api/judge/submit
 */
export const submitCodeAPI = async (
  submissionData: ISubmissionRequest
): Promise<IJudgeResponse> => {
  try {
    const response = await apiClient.post<IJudgeResponse>("/judge/submit", submissionData);
    return response.data;
  } catch (error: unknown) {
    console.error("채점 API 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * 지원하는 언어 목록 조회
 * GET /api/judge/languages
 */
export const getSupportedLanguagesAPI = async (): Promise<GetSupportedLanguagesResponse> => {
  try {
    const response = await apiClient.get<GetSupportedLanguagesResponse>("/judge/languages");
    return response.data;
  } catch (error: unknown) {
    console.error("언어 목록 조회 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * 모든 제출 목록 조회 API
 * GET /api/judge/submissions
 */
export const getAllSubmissionsAPI = async (): Promise<GetAllSubmissionsResponse> => {
  try {
    const response = await apiClient.get<GetAllSubmissionsResponse>("/judge/submissions");
    return response.data;
  } catch (error: unknown) {
    console.error("제출 목록 조회 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};