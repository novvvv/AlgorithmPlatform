import React from "react";
import ProblemItem from "@/components/side/ProblemItem";
import { mockProblems } from "@/mocks/mockProblems";
import {
  ListContainer,
  FilterBar,
  Dropdown,
  ListWrapper,
  FixedButton,
} from "@/components/common/SidePanelCommon";

const ProblemList: React.FC = () => {
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
        {mockProblems.map((problem) => (
          <ProblemItem
            key={problem.id}
            id={problem.id}
            title={problem.title}
            language={problem.language ?? "PYTHON"}
            correctRate={problem.correctRate ?? 0}
            difficulty={problem.difficulty}
          />
        ))}
      </ListWrapper>

      {/* 하단 버튼 */}
      <FixedButton onClick={() => window.location.href = '/problem/create'}>추가하기</FixedButton>
    </ListContainer>
  );
};

export default ProblemList;
