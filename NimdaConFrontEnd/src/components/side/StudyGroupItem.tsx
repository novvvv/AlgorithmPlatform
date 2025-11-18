import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import type { IGroupMembership } from "@/types/studyGroup";

interface StudyGroupItemProps {
  id: number;
  group_name: string;
  is_public: boolean;
  current_members?: IGroupMembership[]; 
  max_members: number;
}

const StudyGroupItem: React.FC<StudyGroupItemProps> = ({
  id,
  group_name,
  current_members,
  max_members,
  is_public,
}) => {
  const navigate = useNavigate();

  const membersCount = current_members ? current_members.length : 0;

  const handleJoin = () => {
    navigate(`/studygroup/${id}/join`);
  };
  
  return (
    <ItemContainer>
      <InfoSection>
        <GroupName>{group_name}</GroupName>
        <MemberCount>{membersCount} / {max_members}명</MemberCount>
      </InfoSection>
      <ActionGroup> 
        <Tag $isPublic={is_public}>{is_public ? "공개" : "비공개"}</Tag>
        <JoinButton onClick={handleJoin}>가입하기</JoinButton>
      </ActionGroup>
    </ItemContainer>
  );
};

export default StudyGroupItem;

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

const GroupName = styled.div`
  font-weight: 600;
  color: #1f2937;
  font-size: 1rem;
`;

const MemberCount = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.5rem;
`;

const ActionGroup = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-end;
  gap: 0.5rem;
`;

const Tag = styled.span<{ $isPublic: boolean }>`
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px; 
  color: white;
  background-color: ${(props) => (props.$isPublic ? "#31a43aff" : "#696969")}; /* Blue-500 or Gray-500 */
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
  white-space: nowrap; 
  &:hover {
    background-color: #2563eb;
  }
`;