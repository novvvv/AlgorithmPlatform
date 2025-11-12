import React from "react";
import styled from "styled-components";

/**
 * StudyGroupList 컴포넌트
 * 
 * 스터디그룹 목록을 표시하는 컴포넌트입니다.
 * SidePanel에서 Problem 관련 페이지가 아닐 때 표시됩니다.
 */
const StudyGroupList: React.FC = () => {
  return (
    <StudyGroupListContainer>
      <StudyGroupListTitle>
        스터디그룹 목록
      </StudyGroupListTitle>
      <StudyGroupListText>
        스터디그룹 목록이 여기에 표시됩니다.
      </StudyGroupListText>
    </StudyGroupListContainer>
  );
};

export default StudyGroupList;


const StudyGroupListContainer = styled.div`
  height: 100%;
  padding: 1rem;
`;

const StudyGroupListTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 1rem;
`;

const StudyGroupListText = styled.p`
  color: #4b5563;
  font-size: 0.875rem;
`;
