import React from "react";
import styled from "styled-components";
import type { IGroupMembership } from "@/types/studyGroup";

interface StudyGroupItemProps {
  group_name: string;
  is_public: boolean;
  current_members?: IGroupMembership[]; 
  max_members: number;
}

const StudyGroupItem: React.FC<StudyGroupItemProps> = ({
  group_name,
  current_members,
  max_members,
  is_public,
}) => {
  // 실제 멤버 수를 계산
  const membersCount = current_members ? current_members.length : 0;
  
  return (
    <ItemContainer>
      <InfoSection>
        {/* group_name 사용 */}
        <GroupName>{group_name}</GroupName>
        <MemberCount>
          {/* 멤버 수 계산 */}
          {membersCount} / {max_members}명
        </MemberCount>
      </InfoSection>
      <ButtonSection>
        {/* is_public 사용 */}
        <Tag $isPublic={is_public}>{is_public ? "공개" : "비공개"}</Tag>
        <JoinButton>가입하기</JoinButton>
      </ButtonSection>
    </ItemContainer>
  );
};

export default StudyGroupItem;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6; /* Gray-100 */
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupName = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 1rem;
`;

const MemberCount = styled.div`
  font-size: 0.75rem;
  color: #6b7280; /* Gray-500 */
  margin-top: 0.25rem;
`;

const ButtonSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Tag = styled.span<{ $isPublic: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px; /* rounded-full */
  color: white;
  background-color: ${(props) => (props.$isPublic ? "#3b82f6" : "#6b7280")}; /* Blue-500 or Gray-500 */
`;

const JoinButton = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background-color: #2563eb;
  }
`;

