import React, { useState, useEffect, useCallback } from "react";
import ProblemItem from "@/components/side/ProblemItem";
import { mockProblems } from "@/mocks/mockProblems";
import { getAllProblemsAPI } from "@/apis/problem"; 
import { getErrorMessage } from "@/apis/utils"; 
import type { IProblem, GetAllProblemsResponse } from "@/types/problem";
import { getCurrentUserAPI } from "@/apis/user";
import type { getCurrentUserResponse } from "@/types/user";

import {
  ListContainer,
  FilterBar,
  Dropdown,
  ListWrapper,
  FixedButton,
} from "@/components/common/SidePanelCommon";

const ProblemList: React.FC = () => {
  const [problems, setProblems] = useState<IProblem[]>(mockProblems as IProblem[]); 
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
        try {
            const response: getCurrentUserResponse = await getCurrentUserAPI();
            setCurrentUserId(response.user?.id ?? 0); 
        } catch (error) {
            console.error("사용자 정보 로딩 실패. Mock ID (101) 사용:", getErrorMessage(error));
            setCurrentUserId(101); 
        }
    }, []);

  const fetchProblems = useCallback(async () => {
    setIsLoading(true);
    try {
        const response: GetAllProblemsResponse = await getAllProblemsAPI(); 
        if (response.success) {
            setProblems(response.problems);
        } else {
            throw new Error(response.message || "문제 목록 조회 API 응답 실패");
        }
    } catch (error: unknown) {
        const errorMessage = getErrorMessage(error);
        console.error("문제 목록 API 호출 실패. Mock 데이터 사용:", errorMessage);
        setProblems(mockProblems as IProblem[]);
    } finally {
        setIsLoading(false);
    }
  }, []);

  useEffect(() => {
        setIsLoading(true);
        Promise.all([fetchCurrentUser(), fetchProblems()])
            .finally(() => setIsLoading(false));
    }, [fetchCurrentUser, fetchProblems]);

    if (isLoading || currentUserId === null) {
        return (
            <ListContainer>
                <div style={{ padding: '1rem', textAlign: 'center' }}>로딩 중...</div>
            </ListContainer>
        );
    }

  const mapProblemToProps = (problem: IProblem) => {
      const solvedBy = (problem as any).solvedBy as number[] | undefined;
      const hasSubmissionHistory = solvedBy ? solvedBy.includes(currentUserId!) : false;
      
      return {
          key: problem.id,
          id: problem.id!,
          title: problem.title,
          language: problem.language ?? "PYTHON",
          score: (problem as any).score ?? (problem as any).correctRate ?? 0, 
          difficulty: problem.difficulty,
          hasSubmissionHistory: hasSubmissionHistory,
      };
    };

  return (
    <ListContainer>
      {/* 필터 바 */}
      <FilterBar>
        <Dropdown defaultValue="전체 난이도">
          <option>전체 난이도</option>
          {/* Enum 값 사용 */}
          <option value="EASY">하</option>
          <option value="MEDIUM">중</option>
          <option value="HARD">상</option>
        </Dropdown>
        <Dropdown defaultValue="전체 언어">
          <option>전체 언어</option>
          {/* Enum 값 사용 */}
          <option value="PYTHON">Python</option>
          <option value="JAVA">Java</option>
          <option value="CPP">C++</option>
        </Dropdown>
      </FilterBar>

      {/* 목록 */}
      <ListWrapper>
        {problems.length === 0 ? (
          <div style={{ padding: '1rem', textAlign: 'center' }}>등록된 문제가 없습니다.</div>
        ) : (
            problems
                .filter(p => p.id !== undefined)
                .map(mapProblemToProps)
                .map((props) => (
                    <ProblemItem {...props} />
                ))
        )}
      </ListWrapper>

      {/* 하단 버튼 */}
      <FixedButton onClick={() => window.location.href = '/problem/create'}>추가하기</FixedButton>
    </ListContainer>
  );
};

export default ProblemList;
