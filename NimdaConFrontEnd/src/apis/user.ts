import type { 
  IUserDetail,
  GetAllUsersResponse, 
  GetUserByIdResponse,
  GetUserByUserIdResponse,
  GetUserByUserNameResponse,
  // DeleteUserResponse, 
  // UpdateUserRoleResponse,
} from "@/types/user";
import { apiClient, getErrorMessage } from "./utils";

/**
 * 모든 사용자 조회 API
 * GET /api/users
 */
export const getAllUsersAPI = async (): Promise<GetAllUsersResponse> => {
  try {
    const response = await apiClient.get<GetAllUsersResponse>("/users");
    return response.data;
  } catch (error: unknown) {
    console.error("사용자 목록 조회 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * 사용자 ID로 조회 API
 * GET /api/users/{userId}
 */
export const getUserByIdAPI = async (
  userId: number | string
): Promise<GetUserByIdResponse> => {
  try {
    const response = await apiClient.get<GetUserByIdResponse>(`/users/${userId}`);
    return response.data;
  } catch (error: unknown) {
    console.error("사용자 조회 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * 유저 ID로 조회 API
 * GET /api/users/user-id/{userId}
 */
export const getUserByUserIdAPI = async (
  userId: number | string
): Promise<GetUserByUserIdResponse> => {
  try {
    const response = await apiClient.get<GetUserByUserIdResponse>(`/users/${userId}`);
    return response.data;
  } catch (error: unknown) {
    console.error("사용자 조회 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * 사용자명으로 조회 API
 * GET /api/users/userName/{userName}
 */
export const getUserByUserNameAPI = async (
  userName: string
): Promise<GetUserByUserNameResponse> => {
  try {
    const response = await apiClient.get<GetUserByUserNameResponse>(`/users/userName/${encodeURIComponent(userName)}`);
    return response.data;
  } catch (error: unknown) {
    console.error("닉네임으로 사용자 조회 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * 현재 로그인한 사용자 정보 조회 API (마이페이지)
 * GET /api/users/me
 */
export const getCurrentUserAPI = async (): Promise<IUserDetail> => { 
  try {
    const response = await apiClient.get<IUserDetail>("/users/me");
    
    localStorage.setItem("user", JSON.stringify(response.data)); 

    return response.data;
  } catch (error: unknown) {
    console.error("현재 사용자 정보 조회 오류:", error);
    // 401 Unauthorized 에러 발생 시 로그아웃 처리 로직 추가 고려
    throw new Error(getErrorMessage(error));
  }
};

// /**
//  * 사용자 삭제 API
//  * DELETE /api/users/{userId}
//  */
// export const deleteUserAPI = async (
//   userId: number
// ): Promise<DeleteUserResponse> => {
//   try {
//     const response = await apiClient.delete<DeleteUserResponse>(`/users/${userId}`);
//     return response.data;
//   } catch (error: unknown) {
//     console.error("사용자 삭제 API 오류:", error);
//     throw new Error(getErrorMessage(error));
//   }
// };

// /**
//  * 사용자 권한 변경 API
//  * PUT /api/users/{userId}/role
//  */
// export const updateUserRoleAPI = async (
//   userId: number,
//   role: string
// ): Promise<UpdateUserRoleResponse> => {
//   try {
//     const response = await apiClient.put<UpdateUserRoleResponse>(`/users/${userId}/role`, { role });
//     return response.data;
//   } catch (error: unknown) {
//     console.error("사용자 권한 변경 API 오류:", error);
//     throw new Error(getErrorMessage(error));
//   }
// };