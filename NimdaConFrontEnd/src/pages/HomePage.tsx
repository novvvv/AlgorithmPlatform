import React, { useState, useEffect, useCallback } from 'react';
import styled from "styled-components";
import ProblemItem from "@/components/side/ProblemItem";
import StudyGroupItem from "@/components/side/StudyGroupItem";

import { getAllGroupsAPI } from "@/apis/group";
import { getAllProblemsAPI } from "@/apis/problem";
import { getCurrentUserAPI } from "@/apis/user";
import { getErrorMessage } from "@/apis/utils";
import type { IStudyGroup } from "@/types/group";
import type { IProblem, GetAllProblemsResponse } from "@/types/problem";
import type { getCurrentUserResponse } from "@/types/user";

import { mockProblems } from "@/mocks/mockProblems";
import mockStudyGroups from "@/mocks/mockStudyGroups";

const HomePage: React.FC = () => {
  const [recentStudyGroups, setRecentStudyGroups] = useState<IStudyGroup[]>(mockStudyGroups.slice(0, 3));
  const [recentProblems, setRecentProblems] = useState<any[]>(mockProblems.slice(0, 3));
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    try {
      const response: getCurrentUserResponse = await getCurrentUserAPI();
      setCurrentUserId(response.user?.id ?? 101); 
    } catch (error) {
      console.error("사용자 정보 API 호출 실패. Mock ID (101) 사용:", getErrorMessage(error));
      setCurrentUserId(101); 
    }
  }, []);

  const fetchGroups = useCallback(async (userId: number) => {
    try {
      const allGroups: IStudyGroup[] = await getAllGroupsAPI(); 
      const myGroups = allGroups.filter(group => 
        group.currentMembers?.some(member => member.userId === userId)
      );
      setRecentStudyGroups(myGroups);
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      console.error("그룹 목록 API 호출 실패. Mock 데이터 사용:", errorMessage);
      const mockMyGroups = mockStudyGroups.filter(group => 
        group.currentMembers?.some(member => member.userId === userId)
      );
      setRecentStudyGroups(mockMyGroups.slice(0, 5));
    }
  }, []);

  const fetchProblems = useCallback(async (userId: number) => { 
    try {
      const response: GetAllProblemsResponse = await getAllProblemsAPI(); 
      if (response.success) {
        const allProblems = response.problems as IProblem[];

        const myAttemptedProblems = allProblems.filter((problem: any) => {
            const solvedBy = problem.solvedBy as { userId: number }[] | undefined;
            return solvedBy?.some(s => s.userId === userId);
        });
        setRecentProblems(myAttemptedProblems.slice(0, 3)); 
      } else {
        throw new Error(response.message || "문제 목록 조회 실패");
      }
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      console.error("문제 목록 API 호출 실패. Mock 데이터 사용:", errorMessage);
      
      const mockAttemptedProblems = (mockProblems as IProblem[]).filter(problem => {
          const solvedBy = (problem as any).solvedBy as number[] | undefined;
          return solvedBy?.includes(userId);
      });
      
      setRecentProblems(mockAttemptedProblems.slice(0, 3));
    }
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      await fetchCurrentUser();
      setIsLoading(false);
    };
    loadUser();
  }, [fetchCurrentUser]);
  
  useEffect(() => {
    if (currentUserId !== null) {
      fetchGroups(currentUserId);
      fetchProblems(currentUserId); 
    }
  }, [currentUserId, fetchGroups, fetchProblems]);


  if (isLoading || currentUserId === null) {
    return (
      <PageContainer>
        <Title>대학생 알고리즘 스터디 플랫폼</Title>
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>데이터를 불러오는 중입니다...</div>
      </PageContainer>
    );
  }

  const userId = currentUserId as number;

  return (
    <PageContainer>
      <Title>대학생 알고리즘 스터디 플랫폼</Title>
      
      <ContentsWrapper>
        {/* 좌측: 내 스터디그룹 */}
        <Section>
          <CardContainer>
            <SectionTitle>내 스터디그룹</SectionTitle>
            <ItemsWrapper>
              {recentStudyGroups.length === 0 ? (
                <div style={{ padding: '1rem', color: '#666' }}>가입된 스터디 그룹이 없습니다.</div>
              ) : (
                recentStudyGroups.map((group) => (
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
            </ItemsWrapper>
            <AddButton onClick={() => window.location.href = '/studygroup/create'}>
              그룹 추가
            </AddButton>
          </CardContainer>
        </Section>

        {/* 우측: 최근 문제 */}
        <Section>
          <CardContainer>
          <SectionTitle>최근 문제</SectionTitle>
            <ItemsWrapper>
              {recentProblems.length === 0 ? (
                <div style={{ padding: '1rem', color: '#666' }}>등록된 문제가 없습니다.</div>
              ) : (
                recentProblems.map((problem) => {
                  const solvedBy = (problem as any).solvedBy as number[] | undefined;
                  const hasSubmissionHistory = solvedBy ? solvedBy.includes(userId) : false;
                  const averageScore = problem.averageScore ?? 0;
                  
                  return (
                    <ProblemItem
                      key={problem.id}
                      id={problem.id!}
                      title={problem.title}
                      language={problem.language ?? "PYTHON"}
                      difficulty={problem.difficulty}
                      averageScore={averageScore}
                      hasSubmissionHistory={hasSubmissionHistory} 
                    />
                  );
                })
              )}
            </ItemsWrapper>
            <AddButton onClick={() => window.location.href = '/problem/create'}>
              문제 추가
            </AddButton>
          </CardContainer>
        </Section>
      </ContentsWrapper>
    </PageContainer>
  )
}

export default HomePage

const PageContainer = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 2rem;
  background-color: #f5f5f5;
  box-sizing: border-box;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.9rem;
  font-weight: 800;
  margin-bottom: 3rem;
  color: #000000ff;
`;

const ContentsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #000000ff;
`;

const CardContainer = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ItemsWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 1.5rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
    
    &:hover {
      background: #999;
    }
  }
`;

const AddButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }

  &:active {
    background-color: #1d4ed8;
  }
`;
