import styled from "styled-components";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mockProblems } from "@/mocks/mockProblems";
import profileIcon from "@/assets/icons/profile.png";

import {
  ProblemList,
  ProblemItem,
  ProblemHeader,
  ProblemTitle,
  DifficultyBadge,
  ProgressText,
  ProgressBar,
  ProgressFill,
  ProgressLabel,
  SolveButton,
  ActionGroup, 
  ProgressGroup, 
  DetailButton,
} from "@/components/common/StudyGroupStyle";

interface UserStats {
  totalSolvedRate: number;
  preferredLanguage: string;
  totalSubmissions: number;
}

interface UserProfile {
  name: string;
  university: string;
  department: string;
  grade: number;
}

// 임시 사용자 정보
const CURRENT_USER_ID = 101;
const userProfile: UserProfile = {
  name: "김코딩",
  university: "공주대학교",
  department: "컴퓨터공학과",
  grade: 3,
};

export default function MyPage() {
   const navigate = useNavigate();

  const handleDetail = (id: number | string) => {
    navigate(`/problem/detail/${id}`);
  };

  const handleSolve = (id: number | string) => {
    navigate(`/problem/${id}`);
  };

  const getDifficultyText = (difficulty: string) => {
  switch (difficulty) {
    case "EASY":
      return "하";
    case "MEDIUM":
      return "중";
    case "HARD":
      return "상";
    default:
      return difficulty;
    }
  };

  // Mock 데이터에서 현재 사용자가 해결한 문제들만 필터링
  const userSolvedProblems = useMemo(() => {
    return mockProblems.filter(p => p.solved_by?.includes(CURRENT_USER_ID));
  }, []);

  // 통계 계산
  const stats: UserStats = useMemo(() => {
    const totalRate = mockProblems.length > 0 
      ? Math.round((userSolvedProblems.length / mockProblems.length) * 100)
      : 0;
    
    // 가장 많이 사용한 언어 계산
    const languages = userSolvedProblems.map(p => p.language);
    const languageCount: Record<string, number> = {};
    languages.forEach(lang => {
      languageCount[lang] = (languageCount[lang] || 0) + 1;
    });

    const rawMostUsedLang = languages.length > 0
      ? Object.entries(languageCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "Python"
      : "Python";
    const mostUsedLangDisplay = (function (langCode: string) {
      switch (langCode) {
        case "PYTHON": return "Python";
        case "JAVA": return "Java";
        case "CPP": return "C++";
        default: return langCode;
      }
    })(rawMostUsedLang);

    return {
      totalSolvedRate: totalRate,
      preferredLanguage: mostUsedLangDisplay,
      totalSubmissions: userSolvedProblems.length,
    };
  }, [userSolvedProblems]);

  return (
    <PageContainer>
      {/* 프로필 카드 */}
      <ProfileSection>
            <ProfileInfoWrapper>
              <ProfileIconWrapper>
                <ProfileIconImage src={profileIcon} alt="프로필 아이콘" />
              </ProfileIconWrapper>
              <ProfileInfo>
                <ProfileName>{userProfile.name}</ProfileName>
                <ProfileDetail>
                  {userProfile.university} {userProfile.department} {userProfile.grade}학년
                </ProfileDetail>
              </ProfileInfo>
            </ProfileInfoWrapper>
            
            <ButtonGroup>
              <EditButton>정보 수정</EditButton>
              <LogoutButton>로그아웃</LogoutButton>
            </ButtonGroup>
          </ProfileSection>

      <ContentWrapper>
        {/* 좌측: 통계 */}
        <LeftSection>
          {/* 통계 섹션 */}
          <StatsSection>
            {/* 전체 정답률 */}
            <StatCard>
              <StatNumber>{stats.totalSolvedRate}%</StatNumber>
              <StatLabel>전체 정답률</StatLabel>
            </StatCard>
            {/* 선호 언어 */}
            <StatCard>
              <StatLanguage>{stats.preferredLanguage}</StatLanguage>
              <StatDescription>가장 많이<br />사용한 언어</StatDescription>
            </StatCard>
            {/* 총 제출 */}
            <StatCard>
              <StatNumber>{stats.totalSubmissions}</StatNumber>
              <StatLabel>총 제출</StatLabel>
            </StatCard>
          </StatsSection>
        </LeftSection>

        {/* 우측: 최근 시도한 문제 */}
        <RightSection>
          <ProblemsSection>
            <SectionTitle>최근 시도한 문제</SectionTitle>
            <ProblemContainer>
              {userSolvedProblems.length > 0 ? (
                <ProblemList>
                  {userSolvedProblems.map((problem) => {
                    const testcaseRate = problem.completionRate ?? 0;
                    return (
                      <ProblemItem key={problem.problem_id}>
                        <ProblemHeader>
                          <ProblemTitle>{problem.title}</ProblemTitle>
                          <ProgressText>{problem.description}</ProgressText> {/* 문제 설명 */}
                        </ProblemHeader>

                        <DifficultyBadge $difficulty={problem.difficulty}>
                          {getDifficultyText(problem.difficulty)}
                        </DifficultyBadge>

                        <ProgressGroup>
                          <ProgressBar>
                            <ProgressFill style={{ width: `${testcaseRate}%` }} />
                          </ProgressBar>  
                          <ProgressLabel>{testcaseRate}% 달성</ProgressLabel>
                        </ProgressGroup>  

                        <ActionGroup>
                          <DetailButton onClick={() => handleDetail(problem.problem_id)}>상세</DetailButton>
                          <SolveButton onClick={() => handleSolve(problem.problem_id)}>풀기</SolveButton>
                        </ActionGroup>
                        
                      </ProblemItem>
                      );
                  })}
              </ProblemList>
              ) : (
                <EmptyMessage>아직 해결한 문제가 없습니다.</EmptyMessage>
              )}
            </ProblemContainer>
          </ProblemsSection>
        </RightSection>
      </ContentWrapper>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  min-height: 100%;
  padding: 1.8rem;
  background-color: #f5f5f5;
  box-sizing: border-box;
`;

//상단 프로필 
const ProfileSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.2rem 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between; 
  align-items: center; 
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ProfileIconWrapper = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  overflow: hidden;
`;

const ProfileIconImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: flex-start;
`;

const ProfileName = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
`;

const ProfileDetail = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const EditButton = styled.button`
  padding: 0.6rem 1.5rem;
  background-color: #d1d5db;
  color: #1a1a1a;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  min-width: 90px;

  &:hover {
    background-color: #b3b3b3;
  }
`;

const LogoutButton = styled.button`
  padding: 0.6rem 1.5rem;
  background-color: #f87171;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  min-width: 90px;

  &:hover {
    background-color: #ef4444;
  }
`;

//하단
const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
`;


const StatsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StatNumber = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.3rem;
`;

const StatLanguage = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.3rem;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.85rem;
  text-align: center;
`;

const StatDescription = styled.div`
  color: #666;
  font-size: 0.8rem;
  text-align: center;
  line-height: 1.3;
`;


const ProblemsSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 1.5rem 0;
  color: #1a1a1a;
`;

const ProblemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #999;
  font-size: 1rem;
`;
