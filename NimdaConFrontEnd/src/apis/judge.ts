import type {
  SubmissionRequest,
  JudgeResponse,
  GetAllSubmissionsResponse,
  GetUserSubmissionsResponse,
  GetUserProblemSubmissionsResponse,
  GetUserRecentSubmissionsResponse,
  GetGroupRecentSubmissionsResponse,
} from "@/types/judge";
import { apiClient, getErrorMessage } from "./utils";

/**
 * 코드 제출 및 채점 API 호출
 * POST /api/judge/submit
 */
export const submitCodeAPI = async (
  submissionData: SubmissionRequest
): Promise<JudgeResponse> => {
  try {
    const response = await apiClient.post<JudgeResponse>("/judge/submit", submissionData);
    return response.data;
  } catch (error: unknown) {
    console.error("채점 API 오류:", error);
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

/**
 * 사용자 닉네임 제출 목록 조회 API
 * GET /api/judge/submissions/user/{userName}
 */
export const getUserSubmissionsAPI = async (
  userName: string
): Promise<GetUserSubmissionsResponse> => {
  try {
    const response = await apiClient.get<GetUserSubmissionsResponse>(
      `/judge/submissions/user/${encodeURIComponent(userName)}`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("사용자 제출 목록 조회 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * 사용자가 특정 문제에 대한 제출 조회 API
 * GET /api/judge/submissions/user/{userId}/problem/{problemId}
 */
export const getUserProblemSubmissionsAPI = async (
  userId: number,
  problemId: number
): Promise<GetUserProblemSubmissionsResponse> => {
  try {
    const response = await apiClient.get<GetUserProblemSubmissionsResponse>(
      `/judge/submissions/user/${userId}/problem/${problemId}`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("사용자 문제별 제출 목록 조회 오류:", error);
    throw new Error(getErrorMessage(error));
  } 
};

/**
 * 유저별 최근 문제 제출 조회
 * GET /api/users/{userId}/submissions/recent?page={page}&size={size}
 */
export async function getUserRecentSubmissions(
  userId: number,
  page: number,
  size: number
): Promise<GetUserRecentSubmissionsResponse> {
  try {
    const response = await apiClient.get<GetUserRecentSubmissionsResponse>(
      `/users/${userId}/submissions/recent?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("유저별 최근 제출 목록 조회 오류:", error);
    throw new Error(getErrorMessage(error));
  }
}

/**
 * 그룹별 최근 문제 제출 조회
 * GET /api/groups/{groupId}/submissions/recent?page={page}&size={size}
 */
export async function getGroupRecentSubmissions(
  groupId: number,
  page: number,
  size: number
): Promise<GetGroupRecentSubmissionsResponse> {
  try {
    const response = await apiClient.get<GetGroupRecentSubmissionsResponse>(
      `/groups/${groupId}/submissions/recent?page=${page}&size=${size}`
    );
    return response.data;
  } catch (error: unknown) {
    console.error("그룹별 최근 제출 목록 조회 오류:", error);
    throw new Error(getErrorMessage(error));
  }
}