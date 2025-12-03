import { useState, useEffect, useCallback } from "react";
import { getGroupMembersAPI, getAllGroupsAPI } from "@/apis/group";
import { getProblemsByGroupIdAPI } from "@/apis/problem";
import { getErrorMessage } from "@/apis/utils";
import mockStudyGroups from "@/mocks/mockStudyGroups";
import { mockProblems } from "@/mocks/mockProblems";
import type { IStudyGroup, IGroupMembership } from "@/types/group";

type ApiProblem = {
  id?: number;
  title?: string;
  groupId?: number | null;
  solvedBy?: { userId: number; score: number }[];
  averageScore?: number;
  [k: string]: unknown;
};

export const useStudyGroupDetail = (groupId: number) => {
  const isValidGroupId = typeof groupId === 'number' && !isNaN(groupId) && groupId > 0;
  const initialGroup = mockStudyGroups.find(g => g.groupId === groupId);
  
  const [groupData, setGroupData] = useState<IStudyGroup | undefined>(initialGroup);
  const [members, setMembers] = useState<IGroupMembership[]>([]);
  const [problems, setProblems] = useState<ApiProblem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!isValidGroupId) {
      console.error("유효하지 않은 그룹 ID가 전달되었습니다:", groupId);
      setGroupData(undefined); // 그룹 데이터를 확실히 비움
      setMembers([]);
      setProblems([]);
      setIsLoading(false);
      return; // API 호출 로직을 건너뜁니다.
    }

    setIsLoading(true);

    // groupId가 변경되었을 때, API 호출 전에 우선 목업/기본 데이터로 화면을 갱신합니다.
    // 이 부분이 없으면 이전 그룹의 데이터가 계속 남아있게 됩니다.
    const currentMockGroup = mockStudyGroups.find(g => g.groupId === groupId);
    const currentMockProblems = mockProblems.filter(p => p.groupId === groupId);

    if (currentMockGroup) {
        setGroupData(currentMockGroup);
        setMembers([]);
    } else {
        setGroupData(undefined);
        setMembers([]);
    }
    setProblems(currentMockProblems.map(p => ({ ...p } as unknown as ApiProblem)));

    try {
      // 1. 그룹 정보 업데이트
      try {
        const allGroups = await getAllGroupsAPI();
        const groupList = Array.isArray(allGroups)
          ? allGroups
          : ((allGroups as unknown) as { groups?: IStudyGroup[] }).groups || [];
        const found = groupList.find((g: IStudyGroup) => g.groupId === groupId);

        if (found) {
          setGroupData(found);
        }
      } catch (err) {
        console.warn("그룹 API 호출 실패, 목업 유지:", getErrorMessage(err));
      }

      // 2. 멤버 목록 별도 호출
      try {
        const membersRes = await getGroupMembersAPI(groupId);
        if (membersRes && membersRes.length > 0) {
          setMembers(membersRes);
        }
      } catch (err) {
        console.warn("멤버 API 호출 실패, 목업 유지:", getErrorMessage(err));
      }

      // 3. 문제 목록 업데이트
      try {
        const problemsRes = await getProblemsByGroupIdAPI(groupId);
        if (problemsRes && problemsRes.success && problemsRes.problems.length > 0) {
          const mergedProblems = problemsRes.problems.map((apiProblem) => {
            const mockMatch = mockProblems.find(m => m.id === apiProblem.id);
            const typedProblem = apiProblem as unknown as ApiProblem;

            return {
              ...typedProblem,
              solvedBy: typedProblem.solvedBy || mockMatch?.solvedBy,
              averageScore: typedProblem.averageScore ?? mockMatch?.averageScore ?? 0,
            };
          });
          setProblems(mergedProblems as ApiProblem[]);
        }
      } catch (err) {
        console.warn("문제 API 호출 실패, 목업 유지:", getErrorMessage(err));
      }
    } catch (error) {
      console.error("데이터 로딩 중 오류:", getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [groupId, isValidGroupId]);

  // groupId나 fetchData가 바뀌면 실행 (즉, 페이지 이동 시 실행)
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { groupData, members, problems, isLoading, refetch: fetchData };
};