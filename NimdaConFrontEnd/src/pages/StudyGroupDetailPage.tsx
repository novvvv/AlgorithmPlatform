import { useParams, useNavigate } from "react-router-dom";
import mockStudyGroups from "@/mocks/mockStudyGroups";
import { mockStudyGroupDetail } from "@/mocks/mockStudyGroupDetail";
import { mockProblems } from "@/mocks/mockProblems";
import { useEffect, useState } from "react";
import { getProblemsByGroupAPI } from "@/apis/problem";
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
  LeaveButton,
  AddButton,
  InfoGrid,
  InfoItem,
  InfoLabel,
  InfoValue,
  MembersList,
  MemberItem,
  MemberName,
  MemberGoal,
  InviteSection,
  InviteLabel,
  InviteCode,
  TabBar,
  Tab,
  ProblemList,
  ProblemItem,
  ProblemHeader,
  ProblemTitle,
  DifficultyBadge,
  StatusButton,
  ProblemFooter,
  ProgressText,
  ProgressInfo,
  ProgressBar,
  ProgressFill,
  ProgressLabel,
  SolveButton,
} from "@/components/common/StudyGroupStyle";

export default function StudyGroupDetailPage() {
  const params = useParams();
  const groupId = Number(params.id || params['id']);
  const groupData = mockStudyGroups.find(g => g.group_id === groupId) || mockStudyGroupDetail;
  const [problems, setProblems] = useState(() => mockProblems.filter(p => p.group_id === groupData.group_id));

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getProblemsByGroupAPI(groupId);
        if (!mounted) return;
        if (res.success && Array.isArray(res.problems)) {
          setProblems(res.problems);
        } else {
          // keep mocks as fallback
          setProblems(mockProblems.filter(p => p.group_id === groupData.group_id));
        }
      } catch (e) {
        // ignore and keep mock
        setProblems(mockProblems.filter(p => p.group_id === groupData.group_id));
      }
    })();
    return () => { mounted = false; };
  }, [groupId, groupData.group_id]);

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

  const getDifficultyText = (difficulty: string) => {
    switch(difficulty) {
      case 'EASY': return '하';
      case 'MEDIUM': return '중';
      case 'HARD': return '상';
      default: return difficulty;
    }
  };

  const navigate = useNavigate();

  const handleDetail = (id: number | string) => {
    navigate(`/problem/${id}/detail`);
  };

  const handleSolve = (id: number | string) => {
    navigate(`/problem/${id}`);
  };

  const handleLeaveGroup = () => {
    const ok = window.confirm('정말 그룹을 나가시겠습니까?');
    if (!ok) return;
    // 로컬 목업 상태이므로 실제 삭제는 서버 연동 필요합니다.
    // 현재는 간단히 알림 후 홈으로 이동 처리합니다.
    alert('그룹을 나갔습니다.');
    navigate('/home');
  };

  return (
    <PageContainer>
      <Header>
        <Title>{groupData.group_name}</Title>
        <LeaveButton onClick={handleLeaveGroup}>그룹 나가기</LeaveButton>
      </Header>
      <Subtitle>{groupData.description}</Subtitle>

      <ContentWrapper>
        <LeftSection>
          <Card>
            <CardTitle>그룹 정보</CardTitle>
            <InfoGrid>
              <InfoItem>
                <InfoLabel>그룹장</InfoLabel>
                <InfoValue>{groupData.creator?.user_name || '알 수 없음'}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>멤버 수</InfoLabel>
                <InfoValue>{groupData.current_members?.length || 0}/{groupData.max_members} 명</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>공개 설정</InfoLabel>
                <InfoValue>{groupData.is_public ? '공개' : '비공개'}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>생성일</InfoLabel>
                <InfoValue>{formatDate(groupData.created_at)}</InfoValue>
              </InfoItem>
              <InfoItem>
                <InfoLabel>활동 기간</InfoLabel>
                <InfoValue>{getActivityPeriod(groupData.created_at)}</InfoValue>
              </InfoItem>
            </InfoGrid>
          </Card>

          <Card>
            <CardTitle>멤버 목록</CardTitle>
            <MembersList>
              {groupData.current_members?.map((member, idx) => {
                if (!member) return null;
                const solvedCount = problems.filter(p => p.group_id === groupData.group_id && p.solved_by?.includes(member.user_id)).length;
                return (
                  <MemberItem key={member.membership_id ?? idx}>
                    <MemberName>
                      {member?.user?.user_name || '알 수 없음'}
                      {member?.role === 'LEADER' && ' (리더)'}
                    </MemberName>
                    <MemberGoal>{solvedCount}문제 해결</MemberGoal>
                  </MemberItem>
                );
              })}
            </MembersList>
          </Card>

          <Card>
            <CardTitle>초대하기</CardTitle>
            <InviteSection>
              <InviteLabel>초대코드</InviteLabel>
              <InviteCode>{groupData.participation_code || '없음'}</InviteCode>
            </InviteSection>
          </Card>
        </LeftSection>

        <RightSection>
          <Card>
            <CardHeader>
              <CardTitle>그룹 문제</CardTitle>
              <AddButton onClick={() => window.location.href = '/problem-create'}>+ 문제 추가</AddButton>
            </CardHeader>
            <TabBar>
              <Tab $active>전체</Tab>
              <Tab>미해결</Tab>
              <Tab>진행 중</Tab>
              <Tab>해결</Tab>
            </TabBar>
            <ProblemList>
              {problems
                .filter(p => p.group_id === groupData.group_id)
                .map((problem) => {
                  const groupMemberIds = groupData.current_members?.filter(Boolean).map(m => m.user_id) || [];
                  const completionCount = (problem.solved_by || []).filter(uid => groupMemberIds.includes(uid)).length;
                  const totalMembers = groupMemberIds.length;
                  const completionRate = totalMembers > 0 ? Math.round((completionCount / totalMembers) * 100) : 0;

                  return (
                    <ProblemItem key={problem.problem_id}>
                      <ProblemHeader>
                        <ProblemTitle>{problem.title}</ProblemTitle>
                        <DifficultyBadge $difficulty={problem.difficulty}>
                          {getDifficultyText(problem.difficulty)}
                        </DifficultyBadge>
                        <StatusButton onClick={() => handleDetail(problem.problem_id)}>상세</StatusButton>
                      </ProblemHeader>
                      <ProblemFooter>
                        <ProgressText>{problem.description}</ProgressText>
                        <ProgressInfo>
                          <ProgressBar>
                            <ProgressFill style={{ width: `${completionRate}%` }} />
                          </ProgressBar>
                          <ProgressLabel>{completionCount}/{totalMembers} 명 해결</ProgressLabel>
                          <SolveButton onClick={() => handleSolve(problem.problem_id)}>풀기</SolveButton>
                        </ProgressInfo>
                      </ProblemFooter>
                    </ProblemItem>
                  );
                })}
            </ProblemList>
          </Card>
        </RightSection>
      </ContentWrapper>
    </PageContainer>
  );
}
