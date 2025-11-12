import styled from "styled-components";

export default function StudyGroupDetailPage() {
  // return (
  //   <PageContainer>
  //     <GroupHeader>
  //       <GroupTitle>알고리즘 마스터 스터디</GroupTitle>
  //       <GroupDescription>
  //         프로그래밍 문제를 함께 풀고 토론하는 스터디 그룹입니다.
  //       </GroupDescription>
  //     </GroupHeader>

  //     <GroupStats>
  //       <Stat>
  //         <Label>멤버</Label>
  //         <Value>15명</Value>
  //       </Stat>
  //       <Stat>
  //         <Label>생성일</Label>
  //         <Value>2025-10-15</Value>
  //       </Stat>
  //       <Stat>
  //         <Label>활동</Label>
  //         <Value>45개</Value>
  //       </Stat>
  //     </GroupStats>

  //     <MembersSection>
  //       <SectionTitle>멤버 목록</SectionTitle>
  //       <MemberList>
  //         <MemberItem>
  //           <MemberName>user1</MemberName>
  //           <MemberRole>관리자</MemberRole>
  //         </MemberItem>
  //         <MemberItem>
  //           <MemberName>user2</MemberName>
  //           <MemberRole>멤버</MemberRole>
  //         </MemberItem>
  //         <MemberItem>
  //           <MemberName>user3</MemberName>
  //           <MemberRole>멤버</MemberRole>
  //         </MemberItem>
  //       </MemberList>
  //     </MembersSection>
  //   </PageContainer>
  // );
}

const PageContainer = styled.div`
`;

const GroupHeader = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
`;

const GroupTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
`;

const GroupDescription = styled.p`
  color: #666;
  font-size: 1rem;
`;

const GroupStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Stat = styled.div`
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const Label = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`;

const Value = styled.p`
  color: #1a1a1a;
  font-size: 1.5rem;
  font-weight: 600;
`;

const MembersSection = styled.div`
  margin-top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MemberItem = styled.div`
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MemberName = styled.span`
  font-weight: 600;
  color: #1a1a1a;
`;

const MemberRole = styled.span`
  background-color: #f0f0f0;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  color: #666;
`;
