// 문제 관련 API 함수들
import type { IProblem, ProblemDifficulty, ProgrammingLanguage } from "@/types/problem";

const API_BASE_URL = "/api";

/**
 * 문제 출제 API 호출
 * URL : /api/problems
 * method: POST
 *
 * * Header 정보 *
 * - Content-Type : applicaton
 * - Authorization : Http Header 이름.
 * localStorage.getItem('authToken') : 로컬스토리지에 저장된 JWT 토큰 가져오기
 *
 */
export const parseJsonSafe = async (response: Response): Promise<any> => {
  try {
    const text = await response.text();
    if (!text) return null;
    return JSON.parse(text);
  } catch {
    return null;
  }
};

export const createProblemAPI = async (problemData: Partial<IProblem> & { testCases?: Array<{ input: string; output: string }> }): Promise<{ success: boolean; message?: string; problem?: IProblem; status?: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/problems`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(problemData),
    });

    const result = await parseJsonSafe(response);

    if (response.ok) {
      return {
        success: true,
        message:
          (result && result.message) || "문제가 성공적으로 출제되었습니다.",
        problem: result && result.problem,
      };
    } else {
      return {
        success: false,
        status: response.status,
        message:
          (result && result.message) ||
          (response.status === 403
            ? "권한이 없습니다. 관리자 계정으로 로그인하세요."
            : "문제 출제에 실패했습니다."),
      };
    }
  } catch (error) {
    console.error("문제 출제 API 오류:", error);
    return {
      success: false,
      message: "서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.",
    };
  }
};

/**
 * 모든 문제 조회 API
 */
export const getAllProblemsAPI = async (): Promise<{ success: boolean; problems?: IProblem[]; message?: string; status?: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/problems`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    const result = await parseJsonSafe(response);

    if (response.ok) {
      return result ?? { success: true, problems: [] };
    }

    return {
      success: false,
      status: response.status,
      message:
        (result && result.message) ||
        (response.status === 403
          ? "권한이 없습니다. 관리자 계정으로 로그인하세요."
          : "문제 목록을 불러올 수 없습니다."),
    };
  } catch (error) {
    console.error("문제 목록 조회 API 오류:", error);
    return { success: false, message: "문제 목록을 불러올 수 없습니다." };
  }
};

/**
 * 특정 문제 조회 API
 */
export const getProblemByIdAPI = async (id: number | string): Promise<{ success: boolean; problem?: IProblem; message?: string; status?: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/problems/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    const result = await parseJsonSafe(response);
    if (response.ok) {
      return result ?? { success: true };
    }
    return {
      success: false,
      status: response.status,
      message:
        (result && result.message) ||
        (response.status === 403
          ? "권한이 없습니다. 관리자 계정으로 로그인하세요."
          : "문제를 불러올 수 없습니다."),
    };
  } catch (error) {
    console.error("문제 조회 API 오류:", error);
    return { success: false, message: "문제를 불러올 수 없습니다." };
  }
};

/**
 * 그룹별 문제 조회 API
 * GET /api/problems/group/{groupId}
 */
export const getProblemsByGroupAPI = async (groupId: number | string): Promise<{ success: boolean; problems?: IProblem[]; message?: string; status?: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/problems/group/${groupId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    const result = await parseJsonSafe(response);
    if (response.ok) {
      return result ?? { success: true, problems: [] };
    }

    return {
      success: false,
      status: response.status,
      message: (result && result.message) || "그룹의 문제 목록을 불러올 수 없습니다.",
    };
  } catch (error) {
    console.error("그룹별 문제 조회 API 오류:", error);
    return { success: false, message: "그룹의 문제 목록을 불러올 수 없습니다." };
  }
};

/**
 * 글로벌(전체) 문제 조회 API
 * GET /api/problems/global
 */
export const getGlobalProblemsAPI = async (): Promise<{ success: boolean; problems?: IProblem[]; message?: string; status?: number }> => {
  try {
    const response = await fetch(`${API_BASE_URL}/problems/global`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });

    const result = await parseJsonSafe(response);
    if (response.ok) {
      return result ?? { success: true, problems: [] };
    }

    return {
      success: false,
      status: response.status,
      message: (result && result.message) || "글로벌 문제 목록을 불러올 수 없습니다.",
    };
  } catch (error) {
    console.error("글로벌 문제 조회 API 오류:", error);
    return { success: false, message: "글로벌 문제 목록을 불러올 수 없습니다." };
  }
};

