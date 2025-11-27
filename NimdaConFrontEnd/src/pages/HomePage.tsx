import React from 'react';
import styled from "styled-components";
import ProblemItem from "@/components/side/ProblemItem";
import StudyGroupItem from "@/components/side/StudyGroupItem";

import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useStudyGroups } from "@/hooks/useStudyGroups";
import { useProblems } from "@/hooks/useProblems";

const HomePage: React.FC = () => {
  const { userId, isLoading: isUserLoading } = useCurrentUser();
  const { myGroups, isLoading: isGroupLoading } = useStudyGroups(userId);
  const { myAttemptedProblems, isLoading: isProblemLoading } = useProblems(userId);

  const isLoading = isUserLoading || isGroupLoading || isProblemLoading;

  if (isLoading || userId === null) {
    return (
      <PageContainer>
        <Title>대학생 알고리즘 스터디 플랫폼</Title>
        <div style={{ textAlign: 'center', marginTop: '5rem' }}>데이터를 불러오는 중입니다...</div>
      </PageContainer>
    );
  }

  const recentProblems = myAttemptedProblems.slice(0, 4);
  const recentGroups = myGroups;

  return (
    <PageContainer>
      <Title>대학생 알고리즘 스터디 플랫폼</Title>
      
      <ContentsWrapper>
        {/* 좌측: 내 스터디그룹 */}
        <Section>
          <CardContainer>
            <SectionTitle>내 스터디그룹</SectionTitle>
            <ItemsWrapper>
              {recentGroups.length === 0 ? (
                <div style={{ padding: '1rem', color: '#666' }}>가입된 스터디 그룹이 없습니다.</div>
              ) : (
                recentGroups.map((group) => (
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
                  const solvedBy = (problem as any).solvedBy as { userId: number }[] | undefined;
                  const hasSubmissionHistory = solvedBy ? solvedBy.some(s => s.userId === userId) : false;
                  
                  return (
                    <ProblemItem
                      key={problem.id}
                      id={problem.id!}
                      title={problem.title}
                      language={problem.language ?? "PYTHON"}
                      difficulty={problem.difficulty}
                      averageScore={problem.averageScore}
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
