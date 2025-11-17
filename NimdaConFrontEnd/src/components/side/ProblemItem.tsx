import React from "react";
import styled from "styled-components";
import type { ProblemDifficulty, ProgrammingLanguage } from "@/types/problem";

interface ProblemItemProps {
  title: string;
  language: ProgrammingLanguage;
  correctRate: number; // IProblem에 없으므로, API 응답 시 추가될 것으로 가정하고 유지
  difficulty: ProblemDifficulty;
}

const ProblemItem: React.FC<ProblemItemProps> = ({
  title,
  language,
  correctRate,
  difficulty,
}) => {
  return (
    <ItemContainer>
      <InfoSection>
        <ProblemTitle>{title}</ProblemTitle>
        <SubInfo>
          {/* language는 PYTHON, JAVA 등으로 출력됩니다. */}
          {language} / 정답률 {correctRate}%
        </SubInfo>
      </InfoSection>
      <ButtonSection>
        <DifficultyTag $difficulty={difficulty}>
          {displayDifficulty(difficulty)}
        </DifficultyTag>
        <ActionButton>상세</ActionButton>
        <ActionButton $primary>풀기</ActionButton>
      </ButtonSection>
    </ItemContainer>
  );
};

export default ProblemItem;

const displayDifficulty = (diff: ProblemDifficulty): string => {
  switch (diff) {
    case "EASY":
      return "하";
    case "MEDIUM":
      return "중";
    case "HARD":
      return "상";
    default:
      return "";
  }
};

const getDifficultyColor = (diff: ProblemDifficulty): string => {
  switch (diff) {
    case "EASY":
      return "#10b981"; // Green
    case "MEDIUM":
      return "#f59e0b"; // Yellow
    case "HARD":
      return "#ef4444"; // Red
    default:
      return "#6b7280";
  }
};

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
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

const ButtonSection = styled.div`
  display: flex;
  align-items: center;
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
  background-color: ${(props) => (props.$primary ? "#3b82f6" : "#e5e7eb")}; /* Blue-500 or Gray-200 */
  color: ${(props) => (props.$primary ? "white" : "#1f2937")};
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.$primary ? "#2563eb" : "#d1d5db")};
  }
`;