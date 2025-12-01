import { useState, useEffect, useCallback } from "react";
import { getAllProblemsAPI } from "@/apis/problem";
import { getErrorMessage } from "@/apis/utils";
import { mockProblems } from "@/mocks/mockProblems"; 

export const useProblems = (currentUserId?: number | null) => {
  // 초기값 목업 설정
  const [problems, setProblems] = useState<any[]>(mockProblems);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProblems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllProblemsAPI();
      
      // response.success 체크 및 problems 배열 길이 체크
      if (response.success && response.problems && response.problems.length > 0) {
        const mergedProblems = response.problems.map((apiProblem) => {
          const mockMatch = mockProblems.find((m) => m.id === apiProblem.id);
          return {
            ...apiProblem,
            solvedBy: (apiProblem as any).solvedBy || mockMatch?.solvedBy,
            averageScore:
              (apiProblem as any).averageScore ?? mockMatch?.averageScore ?? 0,
          };
        });
        setProblems(mergedProblems);
      } else {
        // 성공은 했으나 데이터가 없거나 success가 false인 경우
        console.warn("문제 목록이 비어있거나 실패하여 목업 데이터를 사용합니다.");
        setProblems(mockProblems);
      }
    } catch (error) {
      console.error("문제 목록 API 호출 실패. Mock 데이터 사용:", getErrorMessage(error));
      setProblems(mockProblems);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  const myAttemptedProblems = currentUserId
    ? problems.filter((problem) => {
        const solvedBy = problem.solvedBy as { userId: number }[] | undefined;
        return solvedBy?.some((s) => s.userId === currentUserId);
      })
    : [];

  return { problems, myAttemptedProblems, isLoading, refetch: fetchProblems };
};