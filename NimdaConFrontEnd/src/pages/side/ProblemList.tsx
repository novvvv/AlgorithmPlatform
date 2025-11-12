import React from "react";
import styled from "styled-components";

/**
 * ProblemList 컴포넌트
 * 
 * 문제 목록을 표시하는 컴포넌트입니다.
 * SidePanel에서 Problem 관련 페이지일 때 표시됩니다.
 */
const ProblemList: React.FC = () => {
  return (
    <ProblemListContainer>
      <ProblemListTitle>
        문제 목록
        </ProblemListTitle>
      <ProblemListText>
        문제 목록이 여기에 표시됩니다.
      </ProblemListText>
    </ProblemListContainer>
  );
};

export default ProblemList;


const ProblemListContainer = styled.div`
  height: 100%;
  padding: 1rem;
`;

const ProblemListTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const ProblemListText = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
`;
