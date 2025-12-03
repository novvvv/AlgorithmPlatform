import { useState, useEffect, useCallback } from "react";
import { getAllGroupsAPI, getGroupMembersAPI } from "@/apis/group";
import { getErrorMessage } from "@/apis/utils";
import mockStudyGroups from "@/mocks/mockStudyGroups"; // 목업 import 확인
import type { IStudyGroup, IGroupMembership } from "@/types/group";

type GroupWithMembers = IStudyGroup & { currentMembers?: IGroupMembership[] };

export const useStudyGroups = (currentUserId?: number | null) => {
  // 1. 초기값을 목업 데이터로 설정하여 로딩 중에도 데이터 표시 시도
  const [groups, setGroups] = useState<GroupWithMembers[]>(mockStudyGroups as GroupWithMembers[]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGroups = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllGroupsAPI();

      const groupList = Array.isArray(response) 
        ? response 
        : ((response as unknown) as { groups: IStudyGroup[] }).groups || [];
        
      // 각 그룹의 멤버 정보 함께 로드
      const groupsWithMembers = await Promise.all(
        groupList.map(async (group) => {
          try {
            const members = await getGroupMembersAPI(group.groupId);
            return {
              ...group,
              currentMembers: members,
            } as GroupWithMembers;
          } catch (err) {
            console.warn(`그룹 ${group.groupId}의 멤버 로드 실패:`, err);
            return group as GroupWithMembers;
          }
        })
      );
      
      // 2. API가 성공했지만 데이터가 비어있다면, 개발 중에는 목업 데이터를 유지 (선택 사항)
      if (groupsWithMembers.length > 0) {
        setGroups(groupsWithMembers);
      } else {
        console.warn("API 응답이 비어있어 목업 데이터를 사용합니다.");
        setGroups(mockStudyGroups as GroupWithMembers[]);
      }
    } catch (error) {
      console.error("그룹 목록 API 호출 실패. Mock 데이터 사용:", getErrorMessage(error));
      // 에러 발생 시 확실하게 목업 데이터로 복구
      setGroups(mockStudyGroups as GroupWithMembers[]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const myGroups = currentUserId 
    ? groups.filter(group => group.createdBy === currentUserId)
    : [];

  return { groups, myGroups, isLoading, refetch: fetchGroups };
};