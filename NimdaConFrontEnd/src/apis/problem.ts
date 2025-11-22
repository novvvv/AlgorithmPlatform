import type {
  CreateProblemRequest,
  CreateProblemResponse,
  GetAllProblemsResponse,
  GetProblemByIdResponse,
  GetProblemsByGroupIdResponse,
} from "@/types/problem";
import { apiClient, getErrorMessage } from "./utils";

/**
 * 문제 출제 API 호출
 * POST /api/problems
 */
export const createProblemAPI = async (
  problemData: CreateProblemRequest
): Promise<CreateProblemResponse> => {
  try {
    const response = await apiClient.post<CreateProblemResponse>("/problems", problemData);
    return response.data;
  } catch (error: unknown) {
    console.error("문제 출제 API 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * 모든 문제 조회 API
 * GET /api/problems
 */
export const getAllProblemsAPI = async (): Promise<GetAllProblemsResponse> => {
  try {
    const response = await apiClient.get<GetAllProblemsResponse>("/problems");
    return response.data;
  } catch (error: unknown) {
    console.error("문제 목록 조회 API 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * 문제 ID로 조회 API
 * GET /api/problems/{id}
 */
export const getProblemByIdAPI = async (
  id: number | string
): Promise<GetProblemByIdResponse> => {
  try {
    const response = await apiClient.get<GetProblemByIdResponse>(`/problems/${id}`);
    return response.data;
  } catch (error: unknown) {
    console.error("문제 조회 API 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};
/**
 * 그룹별 문제 조회 API
 * GET /api/problems/group/{groupId}
 */
export const getProblemsByGroupIdAPI = async (
  groupId: number | string
): Promise<GetProblemsByGroupIdResponse> => {
  try {
    const response = await apiClient.get<GetProblemsByGroupIdResponse>(`/problems/group/${groupId}`);
    return response.data;
  } catch (error: unknown) {
    console.error("그룹별 문제 조회 API 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};
