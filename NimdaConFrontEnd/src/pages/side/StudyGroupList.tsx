import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    const navigate = useNavigate();

    const { userId, isLoading: isUserLoading } = useCurrentUser();
    const { groups, isLoading: isGroupsLoading } = useStudyGroups(userId);

    const [searchTerm, setSearchTerm] = useState("");

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

    const filteredGroups = groups.filter((group) =>
    group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("필터링된 그룹 데이터:", filteredGroups);

  return (
    <ListContainer>
      <SearchBarContainer>
       <SearchInput 
          type="text" 
          placeholder="검색..." 
          value={searchTerm} // value 바인딩
          onChange={(e) => setSearchTerm(e.target.value)} // 입력 시 상태 업데이트
        />
        <SearchIcon src={search_icon} alt="검색 아이콘" /> 
      </SearchBarContainer>

      <ListWrapper>
        {filteredGroups.length === 0 ? (
          <div style={{ padding: '1rem', textAlign: 'center' }} key="empty-state">
            {searchTerm ? "검색 결과가 없습니다." : "가입 가능한 그룹이 없습니다."}
          </div>
        ) : (
          filteredGroups.map((group) => (
            <StudyGroupItem 
              key={group.groupId} 
              group={group}
              currentUserId={validUserId}
            />
          ))
        )}
      </ListWrapper>

      <FixedButton onClick={() => navigate('/studygroup/create')}>
        추가하기
      </FixedButton>
    </ListContainer>
  );
};

export default StudyGroupList;