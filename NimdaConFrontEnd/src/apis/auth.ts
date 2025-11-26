import type { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse 
} from "@/types/auth";
import type { IUserDetail } from "@/types/user";
import { apiClient, getErrorMessage } from "./utils";

/**
 * 로그인 API 호출
 * POST /api/auth/login
 */
export const loginAPI = async (
  loginData: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>("/auth/login", loginData);
    console.log("로그인 API 전체 응답:", response);
    console.log("로그인 API 응답 데이터:", response.data);
    const result = response.data;
    // accessToken 및 user 정보 저장
    if (result.accessToken) {
      localStorage.setItem("authToken", result.accessToken);
      console.log("토큰 저장 완료:", result.accessToken.substring(0, 20) + "...");
      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
        console.log("사용자 정보 저장 완료:", result.user);
      }
    } else {
      console.error("응답에 accessToken이 없습니다. 전체 응답:", result);
    }
    return result;
  } catch (error: unknown) {
    console.error("로그인 API 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * 회원가입 API 호출
 * POST /api/auth/register
 */
export const registerAPI = async (
  registerData: RegisterRequest
): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post<RegisterResponse>("/auth/register", registerData);
    return response.data;
  } catch (error: unknown) {
    console.error("회원가입 API 오류:", error);
    throw new Error(getErrorMessage(error));
  }
};

/**
 * 로그아웃
 */
export const logoutAPI = (): void => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
};

/**
 * 현재 로그인된 사용자 정보 가져오기
 */
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

/**
 * 로그인 상태 확인
 */
export const isLoggedIn = (): boolean => {
  const token = localStorage.getItem("authToken");
  return !!token;
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