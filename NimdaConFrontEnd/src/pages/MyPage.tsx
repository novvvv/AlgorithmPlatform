import styled from "styled-components";
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockProblems } from "@/mocks/mockProblems";
import profileIcon from "@/assets/icons/profile.png";
import { logoutAPI } from "@/apis/auth";
import { getCurrentUserAPI } from "@/apis/user";
import type { IUser } from "@/types/user"; 
import type { getCurrentUserResponse } from "@/types/user"; 
import { getErrorMessage } from "@/apis/utils"; 

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

export default function MyPage() {
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 마이페이지 로드 시 현재 사용자 정보 가져오기
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userData = await getCurrentUserAPI();
        setCurrentUser(userData);
      } catch (err) {
        console.error("사용자 정보 조회 실패:", err);
        setError(err instanceof Error ? err.message : "사용자 정보를 불러올 수 없습니다.");
        // 401 에러 시 로그인 페이지로 리다이렉트
        if (err instanceof Error && err.message.includes("401")) {
          navigate("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, [navigate]);
  
  const handleDetail = (id: number | string | undefined) => {
    if (id !== undefined) {
      navigate(`/problem/detail/${id}`);
    }
  };

  const handleSolve = (id: number | string | undefined) => {
    if (id !== undefined) {
      navigate(`/problem/${id}`);
    }
  };

  const handleLogout = () => {
    if (window.confirm("정말 로그아웃하시겠습니까?")) {
      logoutAPI();
      navigate("/login");
    }
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

  const userSolvedProblems = useMemo(() => {
    return mockProblems.filter(p => p.solvedBy?.includes(0));
  }, []);

  const stats: UserStats = useMemo(() => {
    const totalRate = mockProblems.length > 0 
      ? Math.round((userSolvedProblems.length / mockProblems.length) * 100)
      : 0;
    
    const languages = userSolvedProblems.map(p => p.language || "UNKNOWN");
    const languageCount: Record<string, number> = {};
    languages.forEach(lang => {
      languageCount[lang] = (languageCount[lang] || 0) + 1;
    }, [userSolvedProblems]);

    const rawMostUsedLang = languages.length > 0
      ? Object.entries(languageCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "PYTHON"
      : "PYTHON";
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

  // 로딩 중일 때
  if (isLoading) {
    return (
      <PageContainer>
        <LoadingMessage>사용자 정보를 불러오는 중...</LoadingMessage>
      </PageContainer>
    );
  }

  // 에러 발생 시
  if (error) {
    return (
      <PageContainer>
        <ErrorMessage>{error}</ErrorMessage>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* 프로필 카드 */}
      <ProfileSection>
            <ProfileInfoWrapper>
              <ProfileIconWrapper>
                <ProfileIconImage src={profileIcon} alt="프로필 아이콘" />
              </ProfileIconWrapper>
              <ProfileInfo>
                <ProfileName>{currentUser?.userName || "사용자"}</ProfileName>
                <ProfileDetail>
                  {currentUser?.email || "미입력"}
                </ProfileDetail>
              </ProfileInfo>
            </ProfileInfoWrapper>
            
            <ButtonGroup>
              <EditButton>정보 수정</EditButton>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
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
                  {userSolvedProblems
                    .filter((problem) => problem.id !== undefined) 
                    .map((problem) => {
                      const testcaseRate = 0; 
                      const problemId = problem.id as number;
                    return (
                      <ProblemItem key={problem.id}>
                        <ProblemHeader>
                          <ProblemTitle>{problem.title}</ProblemTitle>
                          <ProgressText>{problem.description}</ProgressText> 
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
                          <DetailButton onClick={() => handleDetail(problemId)}>상세</DetailButton>
                          <SolveButton onClick={() => handleSolve(problemId)}>풀기</SolveButton>
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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #d32f2f;
  font-size: 1.2rem;
`;

const ProfileEmail = styled.p`
  margin: 0.5rem 0 0 0;
  color: #888;
  font-size: 0.85rem;
`;

const ProfileErrorText = styled.p`
  margin: 0.5rem 0 0 0;
  color: #d32f2f;
  font-size: 0.85rem;
`;
