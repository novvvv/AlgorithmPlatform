import React, { useState, useEffect, useCallback } from "react";
import StudyGroupItem from "@/components/side/StudyGroupItem";
import mockStudyGroups from "@/mocks/mockStudyGroups";
import search_icon from "@/assets/icons/search_icon.svg";
import { getAllGroupsAPI } from "@/apis/group"; 
import { getErrorMessage } from "@/apis/utils"; 
import type { IStudyGroup } from "@/types/group"; 
import { getCurrentUserAPI } from "@/apis/user";
import type { getCurrentUserResponse } from "@/types/user";

import {
  ListContainer,
  SearchBarContainer,
  SearchInput,
  SearchIcon,
  ListWrapper,
  FixedButton,
} from "@/components/common/SidePanelCommon";

  const StudyGroupList: React.FC = () => {
    const [groups, setGroups] = useState<IStudyGroup[]>(mockStudyGroups); // Mock 데이터로 초기화
    const [currentUserId, setCurrentUserId] = useState<number | null>(null); 
    const [isGroupsLoading, setIsGroupsLoading] = useState(true);
    const [isUserLoading, setIsUserLoading] = useState(true);

    const fetchCurrentUser = useCallback(async () => {
        setIsUserLoading(true);
        try {
            const response: getCurrentUserResponse = await getCurrentUserAPI();
            if (response.user && response.user.id) {
                setCurrentUserId(response.user.id);
            } else {
                setCurrentUserId(101); 
            }
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            console.error("사용자 정보 API 호출 실패. Mock ID (101) 사용:", errorMessage);
            setCurrentUserId(101); 
        } finally {
            setIsUserLoading(false);
        }
    }, []);

    const fetchGroups = useCallback(async () => {
        setIsGroupsLoading(true);
        try {
            const response: IStudyGroup[] = await getAllGroupsAPI();
            setGroups(response);
        } catch (error: unknown) {
            const errorMessage = getErrorMessage(error);
            console.error("그룹 목록 API 호출 실패. Mock 데이터 사용:", errorMessage);
            setGroups(mockStudyGroups);
        } finally {
            setIsGroupsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCurrentUser();
        fetchGroups();
    }, [fetchCurrentUser, fetchGroups]);
    
    const finalLoading = isGroupsLoading || isUserLoading;

    if (finalLoading) {
        return (
            <ListContainer>
                <div style={{ padding: '1rem', textAlign: 'center' }}>
                    {isUserLoading ? '사용자 정보를 불러오는 중...' : '스터디 그룹 목록을 불러오는 중...'}
                </div>
            </ListContainer>
        );
    }
    
    const userId = currentUserId as number;

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
                    currentUserId={userId}
                />
            ))
        )}
      </ListWrapper>

      <FixedButton onClick={() => window.location.href = '/studygroup/create'}>추가하기</FixedButton>
    </ListContainer>
  );
};

export default StudyGroupList;