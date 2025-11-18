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
  currentUserId: number; 
}

const StudyGroupItem: React.FC<StudyGroupItemProps> = ({
  id,
  group_name,
  current_members,
  max_members,
  is_public,
  currentUserId,
}) => {
  const navigate = useNavigate();

  const membersCount = current_members ? current_members.length : 0;
  const isJoined = current_members?.some(member => member && member.user_id === currentUserId);

  const handleJoin = () => {
    navigate(`/studygroup/${id}/join`);
  };

  const handleGoToDetail = () => {
    navigate(`/studygroup/${id}`);
  };
  
  const ActionButton = () => {
    if (isJoined) {
      // 이미 가입된 경우
      return <JoinedButton onClick={handleGoToDetail}>그룹보기</JoinedButton>;
    } else {
      // 가입하지 않은 경우
      return <JoinButton onClick={handleJoin}>가입하기</JoinButton>;
    }
  };

  return (
    <ItemContainer>
      <InfoSection>
        <GroupName>{group_name}</GroupName>
        <MemberCount>{membersCount} / {max_members}명</MemberCount>
      </InfoSection>
      <ActionGroup> 
        <Tag $isPublic={is_public}>{is_public ? "공개" : "비공개"}</Tag>
        <ActionButton />
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

const JoinedButton = styled.button`
  background-color: #f3f4f6; /* 회색 배경 */
  color: #3b82f6; /* 파란색 텍스트 */
  padding: 0.25rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap; 
  &:hover {
    background-color: #e5e7eb;
  }
`;