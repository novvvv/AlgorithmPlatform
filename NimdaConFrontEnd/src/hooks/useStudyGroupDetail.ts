import { useState, useEffect, useCallback } from "react";
import { getGroupMembersAPI, getAllGroupsAPI } from "@/apis/group";
import { getProblemsByGroupIdAPI } from "@/apis/problem";
import { getErrorMessage } from "@/apis/utils";
import mockStudyGroups from "@/mocks/mockStudyGroups";
import { mockProblems } from "@/mocks/mockProblems";
import type { IStudyGroup, IGroupMembership } from "@/types/group";

export const useStudyGroupDetail = (groupId: number) => {
  // 초기값은 마운트 시에만 사용되지만, 안전을 위해 설정
  const initialGroup = mockStudyGroups.find(g => g.groupId === groupId);
  
  const [groupData, setGroupData] = useState<IStudyGroup | undefined>(initialGroup);
  const [members, setMembers] = useState<IGroupMembership[]>([]);
  const [problems, setProblems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    // [중요] groupId가 변경되었을 때, API 호출 전에 우선 목업/기본 데이터로 화면을 갱신합니다.
    // 이 부분이 없으면 이전 그룹의 데이터가 계속 남아있게 됩니다.
    const currentMockGroup = mockStudyGroups.find(g => g.groupId === groupId);
    const currentMockProblems = mockProblems.filter(p => p.groupId === groupId);

    if (currentMockGroup) {
        setGroupData(currentMockGroup);
        setMembers(currentMockGroup.currentMembers || []);
    } else {
        setGroupData(undefined);
        setMembers([]);
    }
    setProblems(currentMockProblems);

    
    // API 호출 및 최신 데이터 덮어쓰기 로직
    try {
      // 1. 그룹 정보 업데이트
      try {
          const allGroups = await getAllGroupsAPI();
          const groupList = Array.isArray(allGroups) ? allGroups : (allGroups as any).groups || [];
          const found = groupList.find((g: IStudyGroup) => g.groupId === groupId);
          
          if (found) {
            setGroupData(found);
            if (found.currentMembers) {
                setMembers(found.currentMembers);
            }
          }
      } catch (e) {
          console.warn("그룹 API 호출 실패, 목업 유지");
      }

      // 2. 멤버 목록 별도 호출
      try {
        const membersRes = await getGroupMembersAPI(groupId);
        if (membersRes && membersRes.length > 0) {
            setMembers(membersRes);
        }
      } catch (e) {
        console.warn("멤버 API 호출 실패, 목업 유지");
      }

      // 3. 문제 목록 업데이트
      try {
        const problemsRes = await getProblemsByGroupIdAPI(groupId);
        if (problemsRes.success && problemsRes.problems.length > 0) {
          const mergedProblems = problemsRes.problems.map((apiProblem) => {
            const mockMatch = mockProblems.find(m => m.id === apiProblem.id);
            return {
              ...apiProblem,
              solvedBy: (apiProblem as any).solvedBy || mockMatch?.solvedBy,
              averageScore: (apiProblem as any).averageScore ?? mockMatch?.averageScore ?? 0,
            };
          });
          setProblems(mergedProblems);
        }
      } catch (e) {
        console.warn("문제 API 호출 실패, 목업 유지");
      }

    } catch (error) {
      console.error("데이터 로딩 중 오류:", getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [groupId]); // groupId가 바뀌면 이 함수가 새로 생성됨

  // groupId나 fetchData가 바뀌면 실행 (즉, 페이지 이동 시 실행)
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { groupData, members, problems, isLoading, refetch: fetchData };
};