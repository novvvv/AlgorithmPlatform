import type { 
  LoginRequest, 
  LoginResponse, 
  RegisterRequest, 
  RegisterResponse 
} from "@/types/auth";
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
    const result = response.data;
    // accessToken 및 user 정보 저장
    if (result.accessToken) {
      localStorage.setItem("authToken", result.accessToken);
      if (result.user) {
        localStorage.setItem("user", JSON.stringify(result.user));
      }
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
