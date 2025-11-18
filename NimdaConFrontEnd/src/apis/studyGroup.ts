import axios, { isAxiosError } from 'axios';
import type { IGroupJoinRequest, IGroupJoinResponse } from "@/types/studyGroup"; 
// IStudyGroupDetailResponse 등 필요한 다른 타입도 Import 필요

const API_BASE_URL = "http://localhost:8080/api";

/**
 * 스터디 그룹 가입 요청을 처리하는 API 함수입니다.
 * @param groupId - 가입할 그룹의 ID
 * @param data - 요청 본문 (userId, role, participationCode)
 * @returns IGroupJoinResponse
 */
export const joinGroupAPI = async (
  groupId: number,
  data: IGroupJoinRequest
): Promise<IGroupJoinResponse> => {
  try {
    const response = await axios.post<IGroupJoinResponse>(
      `${API_BASE_URL}/groups/${groupId}/members`,
      data,
      {
        headers: {
          // ⚠️ 인증 토큰 (JWT)이 필요하다면 여기에 추가해야 합니다.
          // Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("그룹 가입 실패:", error.response.data);
      throw new Error(error.response.data.message || "그룹 가입에 실패했습니다.");
    }
    if (error instanceof Error) {
        throw new Error(error.message);
    }
    throw new Error("알 수 없는 네트워크 오류가 발생했습니다.");
  }
};