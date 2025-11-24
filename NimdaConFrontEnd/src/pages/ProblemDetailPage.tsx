import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { mockProblemDetails } from "@/mocks/mockProblemDetails";

const ProblemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const problem = useMemo(() => {
    if (!id) return undefined;
    return mockProblemDetails.find(p => p.id === Number(id));
  }, [id]);

  const handleSolve = () => {
    if (id) {
      navigate(`/problem/${id}`);
    }
  };

  if (!problem) {
    return (
      <Page>
        <Title>문제 상세</Title>
        <EmptyCard>문제 목록에서 문제를 선택해주세요.</EmptyCard>
      </Page>
    );
  }

  return (
    <Page>
      <Title>{problem.title}{id ? ` (#${id})` : ""}</Title>

      <ContentGrid>
        <LeftColumn>
          <Card>
            <CardTitle>문제 설명</CardTitle>
            <Description>{problem.description}</Description>
          </Card>

          <Card>
            <CardTitle>입출력 예제</CardTitle>
            {problem.samples.map((sample, idx) => (
              <SampleBox key={idx}>
                <SampleRow>
                  <SampleLabel>입력:</SampleLabel>
                  <SampleValue>{sample.input || "\u00A0"}</SampleValue>
                </SampleRow>
                <SampleRow>
                  <SampleLabel>출력:</SampleLabel>
                  <SampleValue>{sample.output || "\u00A0"}</SampleValue>
                </SampleRow>
              </SampleBox>
            ))}
          </Card>

          <Card>
            <CardTitle>제약 조건</CardTitle>
            <ConstraintList>
              {problem.constraints.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ConstraintList>
          </Card>
        </LeftColumn>

        <RightColumn>
          <StatsCard>
            <CardTitle>문제 통계</CardTitle>
            <StatRow>
              <span>정답률</span>
              <Highlight>{problem.stats.accuracy}</Highlight>
            </StatRow>
            <StatRow>
              <span>해결 인원</span>
              <span>{problem.stats.solved}명</span>
            </StatRow>
            <StatRow>
              <span>평균 시도</span>
              <span>{problem.stats.attempts}회</span>
            </StatRow>
          </StatsCard>

          <SolveButton type="button" onClick={handleSolve}>문제 풀기</SolveButton>
        </RightColumn>
      </ContentGrid>
    </Page>
  );
};

export default ProblemDetailPage;

const Page = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background: #f3f4f6;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 2.5rem;
`;

const Title = styled.h1`
  margin: 0;
  width: 92%;
  max-width: 1280px;
  font-size: 1.8rem;
  font-weight: 800;
  padding: 1.5rem 0.5rem 0.5rem;
`;

const EmptyCard = styled.div`
  width: 92%;
  max-width: 1280px;
  background: #ffffff;
  border-radius: 12px;
  padding: 1.25rem 1.4rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  color: #6b7280;
  font-weight: 700;
`;

const ContentGrid = styled.div`
  width: 92%;
  max-width: 1280px;
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 1.05rem;
  align-items: stretch;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.1rem 1.2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: #1f2937;
`;

const Description = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #4b5563;
`;

const SampleBox = styled.div`
  background: #f8fafc;
  border-radius: 10px;
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

const SampleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const SampleLabel = styled.span`
  font-weight: 700;
  color: #4b5563;
  min-width: 52px;
`;

const SampleValue = styled.span`
  color: #4b5563;
  word-break: break-word;
`;

const ConstraintList = styled.ul`
  margin: 0;
  padding-left: 1.1rem;
  color: #4b5563;
  line-height: 1.6;
`;

const StatsCard = styled(Card)`
  gap: 0.6rem;
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.98rem;
  color: #1f2937;
`;

const Highlight = styled.span`
  color: #16a34a;
  font-weight: 700;
`;

const SolveButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #d1d5db;
  color: #1f2937;
  font-weight: 700;
  font-size: 1.05rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #c7cbd1;
  }
`;
