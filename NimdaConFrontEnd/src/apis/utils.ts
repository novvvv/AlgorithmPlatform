/**
 * API 공통 유틸리티 함수들
 */
import axios, { AxiosError, isAxiosError } from 'axios';

export const API_BASE_URL = "/api";

/**
 * Axios 인스턴스 생성
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 요청 인터셉터 - 자동으로 토큰 추가
 */
apiClient.interceptors.request.use(
  (config) => {
    // 로그인/회원가입 엔드포인트는 토큰 없이 전송
    if (config.url?.includes('/auth/login') || config.url?.includes('/auth/register')) {
      return config;
    }
    const token = getAuthToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => {
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터 - 에러 처리
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    return Promise.reject(error);
  }
);

/**
 * 토큰 가져오기
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem("authToken");
};

/**
 * 인증 헤더 가져오기 (필요한 경우를 위해 남겨둠)
 */
export const getAuthHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const token = getAuthToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

/**
 * API 에러 메시지 추출
 */
export const getErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) { 
    const axiosError = error as AxiosError; 
    const errorMessage = (axiosError.response?.data as { message?: string })?.message;

    if (errorMessage) {
      return errorMessage;
    }
    
    return axiosError.message || "서버 오류가 발생했습니다."; 
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  return "알 수 없는 오류가 발생했습니다.";
};