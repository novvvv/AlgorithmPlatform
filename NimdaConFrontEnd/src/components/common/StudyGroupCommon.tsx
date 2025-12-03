import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ParticipationCodeModal } from "@/pages/modal/ParticipationCodeModal";
import type { AddGroupMemberRequest, IGroupMembership } from "@/types/group";
import type { IProblem } from "@/types/problem";
import { joinGroupAPI } from "@/apis/group"; 
import { useStudyGroupDetail } from "@/hooks/useStudyGroupDetail";
import { useCurrentUser } from "@/hooks/useCurrentUser";

import {
  PageContainer,
  Header,
  Title,
  Subtitle,
  ContentWrapper,
  LeftSection,
  RightSection,
  Card,
  CardHeader,
  CardTitle,
  JoinButton, // JoinPage
  LeaveButton, // DetailPage
  AddButton,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  MembersList,
  MemberItem,
  MemberName,
  MemberGoal,
  InviteSection, // DetailPage 
  InviteLabel, // DetailPage 
  InviteCode, // DetailPage 
  TabBar,
  Tab,
  ProblemList,
  ProblemItem,
  ProblemHeader,
  ProblemTitle,
  DifficultyBadge,
  ProgressGroup, 
  ProgressText,
  ProgressBar,
  ProgressFill,
  ProgressLabel,
  ActionGroup, 
  SolveButton,
  DetailButton,
  ResultButton,
} from "@/components/common/StudyGroupStyle";

// Problems coming from API may include runtime-only fields like `solvedBy` and `averageScore`.
type ProblemWithSolved = IProblem & {
  solvedBy?: { userId: number; score?: number }[];
  averageScore?: number;
};

interface StudyGroupContentProps {
  groupId: number;
  isDetailPage: boolean; // DetailPage인지 JoinPage인지 구분하는 플래그
  onHeaderButtonClick: () => void; // 헤더 버튼 클릭 시 실행할 함수
}

const getDifficultyText = (difficulty: string) => {
    switch(difficulty) {
      case 'EASY': return '하';
      case 'MEDIUM': return '중';
      case 'HARD': return '상';
      default: return difficulty;
    }
};

const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

const getActivityPeriod = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays}일`;
};

export default function StudyGroupCommon({
  groupId,
  isDetailPage,
  onHeaderButtonClick,
}: StudyGroupContentProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const { userId } = useCurrentUser();

  const { groupData, members, problems, isLoading } = useStudyGroupDetail(groupId);

  if (isLoading) {
    return (
      <PageContainer>
        <Header><Title>데이터를 불러오는 중...</Title></Header>
      </PageContainer>
    );
  }

  if (!groupData) {
    return (
      <PageContainer>
        <Header><Title>스터디 그룹을 찾을 수 없습니다.</Title></Header>
      </PageContainer>
    );
  }

  const handleAddProblem = () => {
    navigate('/problem/create');
  };

  const handleDetail = (id: number | string) => {
    navigate(`/problem/detail/${id}`);
  };

  const handleSolve = (id: number | string) => {
    navigate(`/problem/${id}`);
  };

  const handleResult = (id: number | string) => {
    navigate(`/problem/results/${id}/studygroup/${groupId}`);
  };

  const handleCodeSubmit = async (code: string) => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }

    const data: AddGroupMemberRequest = {
      userId: userId, 
      participationCode: code,
    };

    // API 호출 (실패 시 여기서 에러 발생 -> Modal의 catch로 이동)
    await joinGroupAPI(groupData.groupId, data); 
    
    // 성공 시에만 아래 코드가 실행됨
    alert(`${groupData.groupName} 그룹에 성공적으로 가입했습니다!`);
    setIsModalOpen(false);
    navigate(`/studygroup/${groupData.groupId}`);
  };

  const HeaderButton = () => {
    if (isDetailPage) {
      return <LeaveButton onClick={onHeaderButtonClick}>그룹 나가기</LeaveButton>;
    } else {
      const handleJoinClick = async () => {
        if (!userId) {
          alert("로그인이 필요합니다.");
          return;
        }

        if (!groupData!.isPublic) {
          setIsModalOpen(true);
        } else {
          try {
              const data: AddGroupMemberRequest = {
                userId: userId, 
              }; 
              await joinGroupAPI(groupData!.groupId, data); 
              alert("공개 그룹: 가입 완료");
              navigate(`/studygroup/${groupData!.groupId}`);
          } catch (error: unknown) {
              console.error("그룹 가입 실패:", error);
              alert(`가입 실패: ${error instanceof Error ? error.message : '서버 오류'}`);
          }
        }
      };
      return (
        <JoinButton onClick={handleJoinClick}>
          가입하기
        </JoinButton>
      );
    }
  };

  return (
    <PageContainer>
      <Header>
        <Title>{groupData.groupName}</Title>
        <HeaderButton /> 
      </Header>
      <Subtitle>{groupData.description || '설명 없음'}</Subtitle>
      <Subtitle>{groupData.goal ? `목표: ${groupData.goal}` : '목표 없음'}</Subtitle>

      <ContentWrapper>
        <LeftSection>
          {/* 그룹 정보 카드 */}
          <Card>
            <CardTitle>그룹 정보</CardTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>그룹장</InfoLabel>
                <InfoValue>
                  {members?.find((m) => m.role === 'LEADER')
                    ?.userName || '알 수 없음'}
                </InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>멤버 수</InfoLabel>
                <InfoValue>{members?.length || 0}/{groupData.maxMembers} 명</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>공개 설정</InfoLabel>
                <InfoValue>{groupData.isPublic ? '공개' : '비공개'}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>생성일</InfoLabel>
                <InfoValue>{formatDate(groupData.createdAt)}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>활동 기간</InfoLabel>
                <InfoValue>{getActivityPeriod(groupData.createdAt)}</InfoValue>
              </InfoItem>
            </InfoGrid>
          </Card>

          {/* 멤버 목록 카드 */}
          <Card>
            <CardTitle>멤버 목록</CardTitle>
            <MembersList>
              {members?.map((member: IGroupMembership, idx: number) => {
                  const key = member.membershipId ?? idx;
                      const solvedCount = problems.filter((p) => {
                        const prob = p as unknown as ProblemWithSolved;
                        return prob.groupId === groupData.groupId &&
                        prob.solvedBy?.some((s) => s.userId === member.userId);
                      }).length;

                  return (
                    <MemberItem key={key}>
                      <MemberName>
                        {member.userName || '알 수 없음'}
                        {member.role === 'LEADER' && ' (리더)'}
                      </MemberName>
                      <MemberGoal>{solvedCount}문제 해결</MemberGoal>
                    </MemberItem>
                  );
                })}
            </MembersList>
          </Card>
          
          {/* 초대하기 카드 (DetailPage 전용) */}
          {isDetailPage && groupData.participationCode && (
            <Card>
              <CardTitle>초대하기</CardTitle>
              <InviteSection>
                <InviteLabel>초대코드</InviteLabel>
                <InviteCode>{groupData.participationCode}</InviteCode>
              </InviteSection>
            </Card>
          )}
        </LeftSection>

        <RightSection>
          {/* 그룹 문제 카드 */}
          <Card>
            <CardHeader>
              <CardTitle>그룹 문제</CardTitle>
              <AddButton onClick={handleAddProblem}>+ 문제 추가</AddButton>
            </CardHeader>
            <TabBar>
              <Tab $active>전체</Tab>
              <Tab>미해결</Tab>
              <Tab>진행 중</Tab>
              <Tab>해결</Tab>
            </TabBar>
            <ProblemList>
            {problems
              .filter(p => p.id !== undefined) 
              .map((rawProblem) => {
                const problem = rawProblem as unknown as ProblemWithSolved;

                const problemId = problem.id as number;
                const memberIds = members.map(m => m.userId);

                const solvedBy = problem.solvedBy || [];
                
                const completionCount = solvedBy 
                    ? solvedBy.filter(s => memberIds.includes(s.userId)).length 
                    : 0;
                const totalMembers = memberIds.length;
                const completionRate = totalMembers > 0 ? Math.round((completionCount / totalMembers) * 100) : 0;
                
                const description = problem.description || '';
                const difficulty = problem.difficulty || 'EASY';

                return (
                  <ProblemItem key={problemId}>
                    <ProblemHeader>
                      <ProblemTitle>{problem.title}</ProblemTitle>
                      <ProgressText>{description}</ProgressText>
                    </ProblemHeader>
                    <DifficultyBadge $difficulty={problem.difficulty}>
                      {getDifficultyText(difficulty)}
                    </DifficultyBadge>
                    <ProgressGroup>
                      <ProgressBar>
                        <ProgressFill style={{ width: `${completionRate}%` }} />
                      </ProgressBar>
                      <ProgressLabel>
                        {completionCount}/{totalMembers} 명 해결
                      </ProgressLabel>
                    </ProgressGroup>

                    {isDetailPage && (
                      <ActionGroup>
                        <DetailButton onClick={() => handleDetail(problemId)}>상세</DetailButton>
                        <SolveButton onClick={() => handleSolve(problemId)}>풀기</SolveButton>
                        <ResultButton onClick={() => handleResult(problemId)}>채점결과</ResultButton>
                      </ActionGroup>
                      )}
                  </ProblemItem>
                );
              })}
            </ProblemList>
          </Card>
        </RightSection>
      </ContentWrapper>
      {!isDetailPage && (
        <ParticipationCodeModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCodeSubmit}
          groupName={groupData.groupName}
        />
      )}
    </PageContainer>
  );
}