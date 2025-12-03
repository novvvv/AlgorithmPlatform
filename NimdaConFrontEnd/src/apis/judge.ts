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
    console.log("📤 채점 API 요청 시작:", submissionData);
    const response = await apiClient.post<JudgeResponse>("/judge/submit", submissionData, {
      timeout: 60000, // 60초 (채점은 여러 테스트케이스를 실행하므로 시간이 걸릴 수 있음)
    });
    console.log("✅ 채점 API 응답 성공:", response.data);
    return response.data;
  } catch (error: any) {
    
    // Axios 에러인지 확인 (response 속성이 있으면 axios 에러)
    if (error?.response || error?.request) {
      console.error("❌ 채점 API Axios 에러 발생:");
      console.error("  - 상태 코드:", error.response?.status);
      console.error("  - 상태 텍스트:", error.response?.statusText);
      console.error("  - 요청 URL:", error.config?.url);
      console.error("  - 요청 메서드:", error.config?.method);
      console.error("  - 요청 데이터:", error.config?.data);
      
      if (error.response) {
        console.error("  - 응답 헤더:", error.response.headers);
        console.error("  - 응답 데이터:", JSON.stringify(error.response.data, null, 2));
        
        // 서버에서 보낸 에러 메시지 추출
        const errorData = error.response.data;
        if (errorData?.message) {
          console.error("  - 서버 에러 메시지:", errorData.message);
        }
        if (errorData?.result?.message) {
          console.error("  - 채점 결과 메시지:", errorData.result.message);
        }
        if (errorData?.result?.status) {
          console.error("  - 채점 상태:", errorData.result.status);
        }
      } else if (error.request) {
        console.error("  - 요청은 보냈지만 응답을 받지 못함");
        console.error("  - 요청 정보:", error.request);
      }
      
      console.error("  - 에러 메시지:", error.message);
      console.error("  - 에러 코드:", error.code);
      console.error("  - 전체 에러 객체:", error);
    } else {
      console.error("❌ 채점 API 알 수 없는 에러:", error);
      console.error("  - 에러 타입:", typeof error);
      console.error("  - 에러 내용:", error);
    }

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