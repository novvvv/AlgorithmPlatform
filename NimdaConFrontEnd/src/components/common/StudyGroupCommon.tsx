// StudyGroupContent.tsx (새로 생성)
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import type { IStudyGroup } from "@/types/studyGroup";
import mockStudyGroups from "@/mocks/mockStudyGroups";
import { mockStudyGroupDetail } from "@/mocks/mockStudyGroupDetail";
import { mockProblems } from "@/mocks/mockProblems";
import { getProblemsByGroupAPI } from "@/apis/problem";
import { ParticipationCodeModal } from "@/pages/modal/ParticipationCodeModal";
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
  StatusButton,
  ProblemFooter,
  ProgressText,
  ProgressInfo,
  ProgressBar,
  ProgressFill,
  ProgressLabel,
  SolveButton,
} from "@/components/common/StudyGroupStyle";

// 두 페이지에서 공통으로 사용할 Props 정의
interface StudyGroupContentProps {
  groupId: number;
  isDetailPage: boolean; // DetailPage인지 JoinPage인지 구분하는 플래그
  onHeaderButtonClick: () => void; // 헤더 버튼 클릭 시 실행할 함수
}

// 그룹 데이터의 문제를 필터링하는 헬퍼 함수 (두 페이지에서 공통)
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


export default function StudyGroupContent({
  groupId,
  isDetailPage,
  onHeaderButtonClick,
}: StudyGroupContentProps) {
  const navigate = useNavigate();
  // 1. 그룹 데이터 초기화 및 상태 관리
  const initialGroupData = useMemo(() => 
    mockStudyGroups.find(g => g.group_id === groupId) || mockStudyGroupDetail, 
    [groupId]
  );
  const groupData: IStudyGroup = initialGroupData; // 타입 명시

  // 2. 문제 목록 상태 관리
  const [problems, setProblems] = useState(() => 
    mockProblems.filter(p => p.group_id === groupData.group_id)
  );
  const [isModalOpen, setIsModalOpen] = useState(false); // 가입 모달 (JoinPage 전용)

  // 3. 문제 데이터 비동기 로드
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await getProblemsByGroupAPI(groupId);
        if (!mounted) return;
        if (res.success && Array.isArray(res.problems)) {
          setProblems(res.problems);
        } else {
          setProblems(mockProblems.filter(p => p.group_id === groupData.group_id));
        }
      } catch (e) {
        setProblems(mockProblems.filter(p => p.group_id === groupData.group_id));
      }
    })();
    return () => { mounted = false; };
  }, [groupId, groupData.group_id]);


  // 4. 이벤트 핸들러 (두 페이지에서 공통)
  const handleDetail = (id: number | string) => {
    navigate(`/problem/${id}/detail`);
  };

  const handleSolve = (id: number | string) => {
    navigate(`/problem/${id}`);
  };

  const handleCodeSubmit = (code: string) => {
    console.log("참여코드 제출:", code);
    setIsModalOpen(false);
    // 실제 서버 연동 후 navigate가 필요
    navigate(`/studygroup/${groupData.group_id}`);
  };

  // 5. 헤더 버튼 컴포넌트 분기 처리
  const HeaderButton = () => {
    if (isDetailPage) {
      return <LeaveButton onClick={onHeaderButtonClick}>그룹 나가기</LeaveButton>;
    } else {
      return (
        <JoinButton 
          onClick={() => {
            if (!groupData.is_public) {
              setIsModalOpen(true);
            } else {
              // 실제 가입 API 호출 로직 필요
              onHeaderButtonClick(); // JoinPage의 navigate('/studygroup/...') 실행
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
        <Title>{groupData.group_name}</Title>
        <HeaderButton /> {/* 분기된 헤더 버튼 사용 */}
      </Header>
      <Subtitle>{groupData.description}</Subtitle>

      <ContentWrapper>
        <LeftSection>
          {/* 그룹 정보 카드 */}
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

          {/* 멤버 목록 카드 */}
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
          
          {/* 초대하기 카드 (DetailPage 전용) */}
          {isDetailPage && groupData.participation_code && (
            <Card>
              <CardTitle>초대하기</CardTitle>
              <InviteSection>
                <InviteLabel>초대코드</InviteLabel>
                <InviteCode>{groupData.participation_code}</InviteCode>
              </InviteSection>
            </Card>
          )}

        </LeftSection>

        <RightSection>
          {/* 그룹 문제 카드 */}
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
                  );})
                }
            </ProblemList>
          </Card>
        </RightSection>
      </ContentWrapper>
      
      {/* 가입 모달 (JoinPage에서만 표시) */}
      {!isDetailPage && (
        <ParticipationCodeModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCodeSubmit}
          groupName={groupData.group_name}
        />
      )}
    </PageContainer>
  );
}