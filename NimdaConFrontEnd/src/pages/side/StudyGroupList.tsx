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
      <SearchBarContainer>
        <SearchInput type="text" placeholder="검색..." />
        <SearchIcon src={search_icon} alt="검색 아이콘" />   {/*클릭 시 검색 로직 추가*/}
      </SearchBarContainer>

      <ListWrapper>
        {mockStudyGroups.map((group) => (
          <StudyGroupItem 
            id={group.group_id}
            group_name={group.group_name}
            current_members={group.current_members}
            max_members={group.max_members}
            is_public={group.is_public}
          />
        ))}
      </ListWrapper>

      <FixedButton onClick={() => window.location.href = '/studygroup-create'}>추가하기</FixedButton>
    </ListContainer>
  );
};

export default StudyGroupList;