import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { ProblemDifficulty, ProgrammingLanguage } from "@/types/problem";

interface ProblemItemProps {
  id: number;
  title: string;
  language: ProgrammingLanguage;
  correctRate: number;
  difficulty: ProblemDifficulty;
}

const displayDifficulty = (diff: ProblemDifficulty): string => {
  switch (diff) {
    case "EASY": return "하";
    case "MEDIUM": return "중";
    case "HARD": return "상";
    default: return "";
  }
};

const getDifficultyColor = (diff: ProblemDifficulty): string => {
  switch (diff) {
    case "EASY": return "#10b981"; // Green
    case "MEDIUM": return "#f59e0b"; // Yellow
    case "HARD": return "#ef4444"; // Red
    default: return "#6b7280";
  }
};

const ProblemItem: React.FC<ProblemItemProps> = ({
  id,
  title,
  language,
  correctRate,
  difficulty,
}) => {
  const navigate = useNavigate();

  const handleDetail = () => {
    navigate(`/problem/${id}/detail`);
  };

  const handleSolve = () => {
    navigate(`/problem/${id}`);
  };

  return (
    <ItemContainer>
      <InfoSection>
        <ProblemTitle>{title}</ProblemTitle>
        <SubInfo>
          {language} / 정답률 {correctRate}%
        </SubInfo>
      </InfoSection>
      <ActionGroup> 
        <DifficultyTag $difficulty={difficulty}>
          {displayDifficulty(difficulty)}
        </DifficultyTag>
        <ButtonWrapper>
          <ActionButton onClick={handleDetail}>상세</ActionButton>
          <ActionButton $primary onClick={handleSolve}>풀기</ActionButton>
        </ButtonWrapper>
      </ActionGroup>
    </ItemContainer>
  );
};

export default ProblemItem;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; 
  margin: 0.75rem 0.25rem;
  padding: 0.75rem 1rem;
  border: 1px solid #BBBBBB;
  border-radius: 0.5rem;
  background-color: #ffffff;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; 
`;

const ProblemTitle = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 1rem;
`;

const SubInfo = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const ActionGroup = styled.div`
  display: flex;
  flex-direction: column;  
  align-items: flex-end; 
  gap: 0.5rem; 
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const DifficultyTag = styled.span<{ $difficulty: ProblemDifficulty }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px; 
  color: white;
  background-color: ${(props) => getDifficultyColor(props.$difficulty)};
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  background-color: ${(props) => (props.$primary ? "#3b82f6" : "#e5e7eb")};
  color: ${(props) => (props.$primary ? "white" : "#1f2937")};
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap; 
  &:hover {
    background-color: ${(props) => (props.$primary ? "#2563eb" : "#d1d5db")};
  }
`;