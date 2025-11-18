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

export const ProblemItem = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background: white;
`;

export const ProblemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
`;

export const ProblemTitle = styled.span`
  font-weight: 600;
  color: #1a1a1a;
  flex: 1;
`;

export const DifficultyBadge = styled.span<{ $difficulty: string }>`
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  background: ${props => 
    props.$difficulty === 'EASY' ? '#10b981' : 
    props.$difficulty === 'MEDIUM' ? '#f59e0b' : '#ef4444'};
`;

export const StatusButton = styled.button`
  background: #e5e7eb;
  color: #1f2937;
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #d1d5db;
  }
`;

export const ProblemFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const ProgressText = styled.span`
  color: #666;
  font-size: 0.85rem;
`;

export const ProgressInfo = styled.div`
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
  background: #3b82f6;
  border-radius: 4px;
`;

export const ProgressLabel = styled.span`
  color: #666;
  font-size: 0.8rem;
  white-space: nowrap;
`;

export const SolveButton = styled.button`
  background: #3b82f6;
  color: white;
  padding: 0.25rem 0.75rem;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;
