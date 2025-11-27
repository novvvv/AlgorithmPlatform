import { useState, useEffect, useCallback } from "react";
import { getAllGroupsAPI } from "@/apis/group";
import { getErrorMessage } from "@/apis/utils";
import mockStudyGroups from "@/mocks/mockStudyGroups"; // 목업 import 확인
import type { IStudyGroup } from "@/types/group";

export const useStudyGroups = (currentUserId?: number | null) => {
  // 1. 초기값을 목업 데이터로 설정하여 로딩 중에도 데이터 표시 시도
  const [groups, setGroups] = useState<IStudyGroup[]>(mockStudyGroups);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGroups = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllGroupsAPI();
      const groupList = Array.isArray(response) ? response : (response as any).groups || [];
      
      // 2. API가 성공했지만 데이터가 비어있다면, 개발 중에는 목업 데이터를 유지 (선택 사항)
      // 백엔드가 비어있을 때도 목업을 보고 싶다면 이 조건문 사용
      if (groupList.length > 0) {
        setGroups(groupList);
      } else {
        console.warn("API 응답이 비어있어 목업 데이터를 사용합니다.");
        setGroups(mockStudyGroups);
      }
    } catch (error) {
      console.error("그룹 목록 API 호출 실패. Mock 데이터 사용:", getErrorMessage(error));
      // 에러 발생 시 확실하게 목업 데이터로 복구
      setGroups(mockStudyGroups);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const myGroups = currentUserId 
    ? groups.filter(group => group.currentMembers?.some(member => member.userId === currentUserId))
    : [];

  return { groups, myGroups, isLoading, refetch: fetchGroups };
};