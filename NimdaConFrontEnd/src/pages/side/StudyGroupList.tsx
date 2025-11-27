import React from "react";
import StudyGroupItem from "@/components/side/StudyGroupItem";
import search_icon from "@/assets/icons/search_icon.svg";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useStudyGroups } from "@/hooks/useStudyGroups";

import {
  ListContainer,
  SearchBarContainer,
  SearchInput,
  SearchIcon,
  ListWrapper,
  FixedButton,
} from "@/components/common/SidePanelStyle";

  const StudyGroupList: React.FC = () => {
    const { userId, isLoading: isUserLoading } = useCurrentUser();
    const { groups, isLoading: isGroupsLoading } = useStudyGroups(userId);

    const finalLoading = isGroupsLoading || isUserLoading;

    if (finalLoading) {
        return (
            <ListContainer>
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                    목록을 불러오는 중...
                </div>
            </ListContainer>
        );
    }

    const validUserId = userId ?? 101;

  return (
    <ListContainer>
      <SearchBarContainer>
        <SearchInput type="text" placeholder="검색..." />
        <SearchIcon src={search_icon} alt="검색 아이콘" />   {/*클릭 시 검색 로직 추가*/}
      </SearchBarContainer>

      <ListWrapper>
        {groups.length === 0 ? (
            <div style={{ padding: '1rem', textAlign: 'center' }}>가입 가능한 그룹이 없습니다.</div>
        ) : (
            groups.map((group) => (
                <StudyGroupItem 
                    key={group.groupId}
                    id={group.groupId}
                    groupName={group.groupName}
                    currentMembers={group.currentMembers} 
                    maxMembers={group.maxMembers}
                    isPublic={group.isPublic}
                    currentUserId={validUserId}
                />
            ))
        )}
      </ListWrapper>

      <FixedButton onClick={() => window.location.href = '/studygroup/create'}>추가하기</FixedButton>
    </ListContainer>
  );
};

export default StudyGroupList;