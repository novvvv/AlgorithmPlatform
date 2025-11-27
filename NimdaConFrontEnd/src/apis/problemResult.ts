import type {
  GroupProblemResultsResponse,
  ProblemResultResponse,
} from "@/types/problemResult";
import { apiClient, getErrorMessage } from "./utils";

export const getProblemResultAPI = async (
  problemId: number
): Promise<ProblemResultResponse> => {
  try {
    const response = await apiClient.get<ProblemResultResponse>(`/problems/${problemId}/result`);
    return response.data;
  } catch (error: unknown) {
    console.error("문제 채점 결과 조회 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};

export const getGroupProblemResultsAPI = async (
  groupId: number,
  problemId: number
): Promise<GroupProblemResultsResponse> => {
  try {
    const response = await apiClient.get<GroupProblemResultsResponse>(
      `/studygroup/${groupId}/problem/${problemId}/results`,
    );
    return response.data;
  } catch (error: unknown) {
    console.error("그룹 채점 결과 조회 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};
