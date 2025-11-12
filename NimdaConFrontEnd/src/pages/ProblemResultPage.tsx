import styled from "styled-components";

export default function ProblemResultPage() {
  // return (
  //   <PageContainer>
  //     <PageTitle>채점 결과</PageTitle>
  //     <ResultList>
  //       <ResultItem>
  //         <ProblemName>문제 1: 두 수의 합</ProblemName>
  //         <Status status="accepted">통과</Status>
  //         <Time>실행시간: 123ms</Time>
  //       </ResultItem>
  //       <ResultItem>
  //         <ProblemName>문제 2: 문자열 뒤집기</ProblemName>
  //         <Status status="wrong">실패</Status>
  //         <Time>실행시간: 456ms</Time>
  //       </ResultItem>
  //     </ResultList>
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

const ResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ResultItem = styled.div`
  background-color: #ffffff;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProblemName = styled.h3`
  font-size: 1.1rem;
  color: #1a1a1a;
  flex: 1;
`;

const Status = styled.span<{ status: "accepted" | "wrong" }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 600;
  background-color: ${props => props.status === "accepted" ? "#d4edda" : "#f8d7da"};
  color: ${props => props.status === "accepted" ? "#155724" : "#721c24"};
`;

const Time = styled.span`
  margin-left: 1rem;
  color: #666;
  font-size: 0.9rem;
`;
