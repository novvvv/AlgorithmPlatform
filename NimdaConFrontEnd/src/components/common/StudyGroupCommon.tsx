import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ParticipationCodeModal } from "@/pages/modal/ParticipationCodeModal";
import type { IStudyGroup, IGroupMembership } from "@/types/group";

// import { getAllGroupsAPI, getGroupMembersAPI, } from "@/apis/group";
// import type { IProblem } from "@/types/problem";
// import { getProblemsByGroupIdAPI } from "@/apis/problem";

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
  JoinButton, // DetailPage에서는 사용하지 않을 수 있음
  LeaveButton, // JoinPage에서는 사용하지 않을 수 있음
  AddButton,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  MembersList,
  MemberItem,
  MemberName,
  MemberGoal,
  InviteSection, // DetailPage 전용
  InviteLabel, // DetailPage 전용
  InviteCode, // DetailPage 전용
  TabBar,
  Tab,
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

// 두 페이지에서 공통으로 사용할 Props 정의
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

  const initialGroupData = useMemo(
  () => mockStudyGroups.find(g => g.groupId === groupId),
  [groupId]
);

const groupData: IStudyGroup | undefined = initialGroupData;

const problems = useMemo(() => mockProblems.filter(p => p.group === groupData?.groupId), [groupData]);

if (!groupData) {
  return (
    <PageContainer>
      <Header>
        <Title>스터디 그룹을 선택해주세요.</Title>
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

  const handleCodeSubmit = (code: string) => {
    console.log("참여코드 제출:", code);
    setIsModalOpen(false);
    // 실제 서버 연동 후 navigate가 필요
    navigate(`/studygroup/${groupData.groupId}`);
  };

  const HeaderButton = () => {
    if (isDetailPage) {
      return <LeaveButton onClick={onHeaderButtonClick}>그룹 나가기</LeaveButton>;
    } else {
      return (
        <JoinButton 
          onClick={() => {
            if (!groupData.isPublic) {
              setIsModalOpen(true);
            } else {
              alert("공개 그룹: 가입 완료");
            }
          }}
        >
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
                <InfoValue>{ groupData?.currentMembers?.find(m => m.role === 'LEADER')?.userName ||
                             groupData?.currentMembers?.find(m => m.role === 'LEADER')?.user?.userName ||
                             '알 수 없음'}
                </InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>멤버 수</InfoLabel>
                <InfoValue>{groupData.currentMembers?.length || 0}/{groupData.maxMembers} 명</InfoValue>
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
              {groupData.currentMembers?.map((member: IGroupMembership, idx: number) => {
                if (!member) return null;
                const solvedCount = problems.filter(p => p.group === groupData.groupId && p.solvedBy?.includes(member.userId)).length;
                return (
                  <MemberItem key={member.membershipId ?? idx}>
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
              .filter(p => p.group === groupData.groupId)
              .map((problem) => {
                const groupMemberIds = groupData.currentMembers?.filter(Boolean).map(m => m.userId) || [];
                const completionCount = (problem.solvedBy || []).filter(uid => groupMemberIds.includes(uid)).length;
                const totalMembers = groupMemberIds.length;
                const completionRate = totalMembers > 0 ? Math.round((completionCount / totalMembers) * 100) : 0;
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
                        <ProgressFill style={{ width: `${completionRate}%` }} />
                      </ProgressBar>
                      <ProgressLabel>
                        {completionCount}/{totalMembers} 명 해결
                      </ProgressLabel>
                    </ProgressGroup>
                    <ActionGroup>
                      <DetailButton onClick={() => handleDetail(problem.id)}>상세</DetailButton>
                      <SolveButton onClick={() => handleSolve(problem.id)}>풀기</SolveButton>
                    </ActionGroup>
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