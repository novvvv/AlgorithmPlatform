import React from "react";
import ProblemItem from "@/components/side/ProblemItem";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useProblems } from "@/hooks/useProblems";

import {
  ListContainer,
  FilterBar,
  Dropdown,
  ListWrapper,
  FixedButton,
} from "@/components/common/SidePanelStyle";

const ProblemList: React.FC = () => {
  const { userId, isLoading: isUserLoading } = useCurrentUser();
  const { problems, isLoading: isProblemsLoading } = useProblems(userId);

  if (isUserLoading || isProblemsLoading || userId === null) {
      return (
          <ListContainer>
              <div style={{ padding: '1rem', textAlign: 'center' }}>로딩 중...</div>
          </ListContainer>
      );
  }

  const mapProblemToProps = (problem: any) => {
      const solvedBy = problem.solvedBy as { userId: number, score: number }[] | undefined;
      const hasSubmissionHistory = solvedBy ? solvedBy.some(s => s.userId === userId) : false;

      return {
          key: problem.id,
          id: problem.id,
          title: problem.title,
          language: problem.language ?? "PYTHON",
          difficulty: problem.difficulty,
          averageScore: problem.averageScore, 
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
