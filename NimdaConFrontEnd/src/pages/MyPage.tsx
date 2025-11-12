import styled from "styled-components";

export default function MyPage() {
  // return (
  //   <PageContainer>
  //     <PageTitle>마이 페이지</PageTitle>
  //     <UserInfo>
  //       <InfoSection>
  //         <Label>사용자명</Label>
  //         <Value>user123</Value>
  //       </InfoSection>
  //       <InfoSection>
  //         <Label>이메일</Label>
  //         <Value>user@example.com</Value>
  //       </InfoSection>
  //       <InfoSection>
  //         <Label>가입 날짜</Label>
  //         <Value>2025-11-12</Value>
  //       </InfoSection>
  //     </UserInfo>
  //     <SectionTitle>제출한 문제</SectionTitle>
  //     <ProblemList>
  //       <ProblemItem>문제 1: 두 수의 합</ProblemItem>
  //       <ProblemItem>문제 2: 문자열 뒤집기</ProblemItem>
  //     </ProblemList>
  //   </PageContainer>
  // );
}

const PageContainer = styled.div`
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1a1a1a;
`;

const UserInfo = styled.div`
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: #333;
`;

const Value = styled.span`
  color: #666;
`;

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  margin: 2rem 0 1rem;
  color: #333;
`;

const ProblemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ProblemItem = styled.li`
  padding: 1rem;
  background-color: #f9f9f9;
  margin-bottom: 0.5rem;
  border-left: 4px solid #007bff;
  color: #333;
`;
