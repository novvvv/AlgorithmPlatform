import React from "react";
import StudyGroupItem from "@/components/side/StudyGroupItem";
import mockStudyGroups from "@/mocks/mockStudyGroups";
import search_icon from "@/assets/icons/search_icon.svg";
import {
  ListContainer,
  SearchBarContainer,
  SearchInput,
  SearchIcon,
  ListWrapper,
  FixedButton,
} from "@/components/common/SidePanelCommon";

const StudyGroupList: React.FC = () => {
  return (
    <ListContainer>
      {/* 검색 바 */}
      <SearchBarContainer>
        <SearchInput type="text" placeholder="검색..." />
        <SearchIcon src={search_icon} alt="검색 아이콘" />   {/*클릭 시 검색 로직 추가*/}
      </SearchBarContainer>

      {/* 목록 */}
      <ListWrapper>
        {mockStudyGroups.map((group) => (
          <StudyGroupItem 
            key={group.group_id} 
            group_name={group.group_name}
            current_members={group.current_members}
            max_members={group.max_members}
            is_public={group.is_public}
          />
        ))}
      </ListWrapper>

      {/* 하단 버튼 */}
      <FixedButton>추가하기</FixedButton>
    </ListContainer>
  );
};

export default StudyGroupList;