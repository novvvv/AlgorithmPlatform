import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ParticipationCodeModal } from "@/pages/modal/ParticipationCodeModal";
import type { 
  IStudyGroup, 
  IGroupMembership, 
  AddGroupMemberRequest,
  GetGroupMembersResponse
} from "@/types/group";
import type { IProblem, GetProblemsByGroupIdResponse } from "@/types/problem";
import { getGroupMembersAPI, joinGroupAPI } from "@/apis/group"; 
import { getProblemsByGroupIdAPI } from "@/apis/problem";

import mockStudyGroups from "@/mocks/mockStudyGroups";
import { mockProblems } from "@/mocks/mockProblems";

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

  // 기본 데이터 Mock에서 가져와서 초기화
  const initialGroupData = mockStudyGroups.find(g => g.groupId === groupId);
  const [groupData, setGroupData] = useState<IStudyGroup | undefined>(initialGroupData);

  const [members, setMembers] = useState<IGroupMembership[]>(initialGroupData?.currentMembers || []);
  const [problems, setProblems] = useState<IProblem[]>(mockProblems.filter(p => p.groupId === groupId) as IProblem[]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGroupData = useCallback(async () => {
    setIsLoading(true);
    
    const targetGroup = mockStudyGroups.find(g => g.groupId === groupId); 
    
    if (!targetGroup) {
      setIsLoading(false);
      return;
    }
    
    try {
      const membersRes: GetGroupMembersResponse = await getGroupMembersAPI(groupId);
      setMembers(membersRes);
      setGroupData(prev => prev ? ({ ...prev, currentMembers: membersRes }) : undefined);
    } catch (e) {
      console.error("그룹 멤버 API 호출 실패. 목업 데이터 사용:", e);
    }
    
    try {
      const problemsRes: GetProblemsByGroupIdResponse = await getProblemsByGroupIdAPI(groupId);
      if (problemsRes.success) {
        setProblems(problemsRes.problems); 
      } else {
        throw new Error(problemsRes.message || "문제 목록 조회 실패");
      }
    } catch (e) {
      console.error("그룹 문제 API 호출 실패. 목업 데이터 사용:", e);
    }
    
    setIsLoading(false);
  }, [groupId]);

  useEffect(() => {
    fetchGroupData();
  }, [fetchGroupData]);

  if (isLoading) {
    return (
      <PageContainer>
        <Header>
          <Title>데이터를 불러오는 중...</Title>
        </Header>
      </PageContainer>
    );
  }

  if (!groupData) {
    return (
      <PageContainer>
        <Header>
          <Title>스터디 그룹을 찾을 수 없습니다.</Title>
        </Header>
      </PageContainer>
    );
  }

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
   try {
        const data: AddGroupMemberRequest = {
          userId: 0,
          participationCode: code,
        };
        // API 호출: 그룹 가입 (비공개 그룹)
        await joinGroupAPI(groupData.groupId, data); 
        
        alert(`${groupData.groupName} 그룹에 성공적으로 가입했습니다!`);
        setIsModalOpen(false);
        navigate(`/studygroup/${groupData.groupId}`);

    } catch (error: any) {
        console.error("그룹 가입 실패:", error);
        alert(`가입 실패: ${error.message || '서버 오류'}`);
    }
  };

  const HeaderButton = () => {
    if (isDetailPage) {
      return <LeaveButton onClick={onHeaderButtonClick}>그룹 나가기</LeaveButton>;
    } else {
      const handleJoinClick = async () => {
        if (!groupData!.isPublic) {
          setIsModalOpen(true);
        } else {
          // 공개 그룹: 바로 가입 API 호출
          try {
              const data: AddGroupMemberRequest = {
                userId: 0, 
              }; 
              await joinGroupAPI(groupData!.groupId, data); 
              
              alert("공개 그룹: 가입 완료");
              navigate(`/studygroup/${groupData!.groupId}`);
              
          } catch (error: any) {
              console.error("그룹 가입 실패:", error);
              alert(`가입 실패: ${error.message || '서버 오류'}`);
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
      <Subtitle>{groupData.description}</Subtitle>
      <Subtitle>목표: {groupData.goal}</Subtitle>

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
              {groupData.currentMembers
                ?.filter((member) => member)
                .map((member: IGroupMembership, idx: number) => {
                  const key = member.membershipId ?? idx; 
                  const currentUserId: number = member.userId;
                  const solvedCount = problems.filter(
                    (p: any) =>
                      p.groupId === groupData.groupId &&
                      (p.solvedBy as number[])?.includes(currentUserId)
                  ).length;

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
              <AddButton onClick={() => window.location.href = '/problem/create'}>+ 문제 추가</AddButton>
            </CardHeader>
            <TabBar>
              <Tab $active>전체</Tab>
              <Tab>미해결</Tab>
              <Tab>진행 중</Tab>
              <Tab>해결</Tab>
            </TabBar>
            <ProblemList>
            {problems
              .filter(p => p.id !== undefined && p.groupId === groupData.groupId) 
              .map((problem) => {
                const problemId = problem.id as number;
                const groupMemberIds = members?.filter(Boolean).map(m => m.userId) || [];
                const completionCount = (problem as any).solvedBy ? (problem as any).solvedBy.filter((uid: number) => groupMemberIds.includes(uid)).length : 0;
                const totalMembers = groupMemberIds.length;
                const completionRate = totalMembers > 0 ? Math.round((completionCount / totalMembers) * 100) : 0;return (
                  <ProblemItem key={problemId}>
                    <ProblemHeader>
                      <ProblemTitle>{problem.title}</ProblemTitle>
                      <ProgressText>{problem.description}</ProgressText>
                    </ProblemHeader>
                    <DifficultyBadge $difficulty={problem.difficulty}>
                      {getDifficultyText(problem.difficulty)}
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