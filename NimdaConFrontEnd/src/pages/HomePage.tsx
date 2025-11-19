import React from 'react';
import styled from "styled-components";
import ProblemItem from "@/components/side/ProblemItem";
import StudyGroupItem from "@/components/side/StudyGroupItem";
import { mockProblems } from "@/mocks/mockProblems";
import mockStudyGroups from "@/mocks/mockStudyGroups";

const CURRENT_USER_ID = 101;

const HomePage: React.FC = () => {
  // 최근 3개의 내가 가입된 스터디그룹만 표시
  const recentStudyGroups = mockStudyGroups.slice(0, 3);
  
  // 최근 3개의 문제만 표시
  const recentProblems = mockProblems.slice(0, 3);

  return (
    <PageContainer>
      <Title>대학생 알고리즘 스터디 플랫폼</Title>
      
      <ContentsWrapper>
        {/* 좌측: 내 스터디그룹 */}
        <Section>
          <CardContainer>
            <SectionTitle>내 스터디그룹</SectionTitle>
            <ItemsWrapper>
              {recentStudyGroups.map((group) => (
                <StudyGroupItem
                  key={group.group_id}
                  id={group.group_id}
                  group_name={group.group_name}
                  current_members={group.current_members}
                  max_members={group.max_members}
                  is_public={group.is_public}
                  currentUserId={CURRENT_USER_ID}
                />
              ))}
            </ItemsWrapper>
            <AddButton onClick={() => window.location.href = '/studygroup-create'}>
              그룹 추가
            </AddButton>
          </CardContainer>
        </Section>

        {/* 우측: 최근 문제 */}
        <Section>
          <CardContainer>
          <SectionTitle>최근 문제</SectionTitle>
            <ItemsWrapper>
              {recentProblems.map((problem) => (
                <ProblemItem
                  key={problem.problem_id}
                  id={problem.problem_id}
                  title={problem.title}
                  language={problem.language}
                  correctRate={problem.correctRate ?? 0}
                  difficulty={problem.difficulty}
                />
              ))}
            </ItemsWrapper>
            <AddButton onClick={() => window.location.href = '/problem-create'}>
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