import styled from "styled-components";

// Layout
export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f3f4f6;
  padding: 2rem;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 0;
`;

export const Subtitle = styled.p`
  color: #666;
  font-size: 0.95rem;
  margin: 0 0 1.5rem 0;
`;

export const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 1.5rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Card & Content
export const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

export const CardTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 1rem 0;
`;

// Buttons
export const LeaveButton = styled.button`
  background: #dc2626;
  color: white;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    background: #b91c1c;
  }
`;

export const JoinButton = styled.button`
  background: #3b82f6;
  color: white;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

export const AddButton = styled.button`
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

// Info
export const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InfoLabel = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

export const InfoValue = styled.span`
  color: #1a1a1a;
  font-weight: 600;
  font-size: 0.9rem;
`;

// Members
export const MembersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 250px;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
`;

export const MemberItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 6px;
`;

export const MemberName = styled.span`
  font-weight: 600;
  color: #1a1a1a;
  font-size: 0.9rem;
`;

export const MemberGoal = styled.span`
  color: #666;
  font-size: 0.85rem;
`;

// Invite
export const InviteSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InviteLabel = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

export const InviteCode = styled.span`
  color: #1a1a1a;
  font-weight: 700;
  font-size: 1rem;
`;

// Tabs
export const TabBar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  background: ${props => props.$active ? '#3b82f6' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#666'};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background: ${props => props.$active ? '#2563eb' : '#f3f4f6'};
  }
`;

// Problems
export const ProblemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// 📌 StudyGroupCommon.tsx (Problems 섹션 수정)

// Problems
// ... (ProblemList는 변경 없음)

export const ProblemItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background: white;
  
  /* Grid 레이아웃 적용 */
  display: grid;
  /* 4열: [제목/설명 영역] | [빈 공간] | [난이도/상세 버튼] | [풀기 버튼] */
  grid-template-columns: 1fr auto auto; /* [내용] [난이도] [액션 버튼] */
  grid-template-rows: auto auto; /* [헤더] [푸터] */
  gap: 0.5rem 1rem;
  align-items: center; 
`;

export const ProblemHeader = styled.div`
  /* 기존 ProblemHeader의 역할을 ProblemTitle과 DifficultyBadge가 직접 수행하도록 변경 */
  grid-column: 1 / 2; /* 1번째 열에 위치 */
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const ProblemTitle = styled.span`
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1.1rem;
  margin: 0;
`;

export const ProgressText = styled.span`
  grid-column: 1 / 2; /* 1번째 열 아래쪽에 위치 */
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

// 난이도 태그: 2번째 열 상단에 배치
export const DifficultyBadge = styled.span<{ $difficulty: string }>`
  grid-column: 3 / 4; /* 3번째 열 (액션 버튼 바로 왼쪽) */
  grid-row: 1 / 2; /* 1행 */
  justify-self: end; /* 우측 정렬 */
  
  margin-right: 4.5rem;
  padding: 0.3rem 0.6rem; /* 이미지처럼 패딩 조정 */
  border-radius: 9999px; /* 완전한 타원형 */
  font-size: 0.9rem; /* 폰트 크기 조정 */
  font-weight: 600;
  color: white;
  background: ${props => 
    props.$difficulty === 'EASY' ? '#69b469' : 
    props.$difficulty === 'MEDIUM' ? '#f59e0b' : '#ef4444'};
`;

// StatusButton과 SolveButton을 감싸는 영역을 재정의합니다.
export const ActionGroup = styled.div`
  grid-column: 3 / 4; /* 3번째 열에 위치 */
  grid-row: 1 / span 2; /* 1행부터 2행까지 걸쳐서 위치 */
  display: flex;
  flex-direction: column;
  justify-self: end; /* 우측 정렬 */
  gap: 0.5rem;
  margin-left: 1rem; /* 내용 영역과의 간격 */
`;

// 상세 버튼 (StatusButton 이름 변경)
export const DetailButton = styled.button`
  background: #e5e5e5; /* 이미지의 밝은 회색 */
  color: #1a1a1a;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  
  &:hover {
    background: #d1d5db;
  }
`;

// 풀기 버튼 (SolveButton 이름 변경)
export const SolveButton = styled.button`
  background: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: #2563eb;
  }
`;

// 진행 정보 그룹 (ProgressBar와 ProgressLabel을 묶음)
export const ProgressGroup = styled.div`
  grid-column: 1 / 3; /* 1열부터 2열까지 걸쳐서 배치 */
  grid-row: 2 / 3; /* 2행에 위치 */
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  height: 100%;
  background: #254bc9ff; /* 이미지처럼 진한 색상으로 변경 */
  border-radius: 4px;
`;

export const ProgressLabel = styled.span`
  color: #1a1a1a; /* 글자 색상을 진하게 변경 */
  font-size: 0.9rem; /* 크기 조정 */
  font-weight: 600;
  white-space: nowrap;
`;
