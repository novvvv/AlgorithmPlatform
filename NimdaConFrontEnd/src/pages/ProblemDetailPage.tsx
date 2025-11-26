import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { mockProblemDetails } from "@/mocks/mockProblemDetails";
import type { IProblem, ITestCase } from "@/types/problem";
import { getProblemByIdAPI } from "@/apis/problem";

const ProblemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [problem, setProblem] = useState<IProblem | null>(null);
  const [testCases, setTestCases] = useState<ITestCase[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fallbackDetail = useMemo(() => {
    if (!id) return undefined;
    return mockProblemDetails.find(p => p.id === Number(id));
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    if (!id) {
      setProblem(null);
      setTestCases([]);
      setIsLoading(false);
      setError("문제 ID를 확인할 수 없습니다.");
      return;
    }

    const fetchProblem = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getProblemByIdAPI(Number(id));
        if (cancelled) return;
        setProblem(response.problem ?? null);
        setTestCases(response.testCases ?? []);
      } catch (err) {
        if (cancelled) return;
        setProblem(null);
        setTestCases([]);
        setError(
          err instanceof Error ? err.message : "문제 정보를 불러오지 못했습니다."
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchProblem();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleSolve = () => {
    if (id) {
      navigate(`/problem/${id}`);
    }
  };

  if (isLoading) {
    return (
      <Page>
        <Title>문제 상세</Title>
        <EmptyCard>문제 정보를 불러오는 중입니다...</EmptyCard>
      </Page>
    );
  }

  if (!problem && !fallbackDetail) {
    return (
      <Page>
        <Title>문제 상세</Title>
        <EmptyCard>문제 목록에서 문제를 추가해주세요.</EmptyCard>
      </Page>
    );
  }

  const displayTitle = problem?.title ?? fallbackDetail?.title ?? "";
  const description = problem?.description ?? fallbackDetail?.description ?? "";
  const sampleData =
    (testCases.length > 0
      ? testCases.map(tc => ({ input: tc.input, output: tc.output }))
      : fallbackDetail?.samples) ?? [];

  const constraintItems = useMemo(() => {
    const items: string[] = [];
    if (problem?.timeLimit) items.push(`시간 제한: ${problem.timeLimit}ms`);
    if (problem?.memoryLimit) items.push(`메모리 제한: ${problem.memoryLimit}KB`);
    if (problem?.difficulty) items.push(`난이도: ${problem.difficulty}`);
    if (problem?.language) items.push(`언어: ${problem.language}`);
    if (fallbackDetail?.constraints?.length) {
      items.push(...fallbackDetail.constraints);
    }
    return items;
  }, [problem, fallbackDetail]);

  const stats = fallbackDetail?.stats ?? { accuracy: "-", solved: 0, attempts: 0 };

  return (
    <Page>
      <Title>{displayTitle}{id ? ` (#${id})` : ""}</Title>

      <ContentGrid>
        <LeftColumn>
          <Card>
            <CardTitle>문제 설명</CardTitle>
            <Description>{description}</Description>
          </Card>

          <Card>
            <CardTitle>입출력 예제</CardTitle>
            {sampleData.length > 0 ? (
              sampleData.map((sample, idx) => (
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
              ))
            ) : (
              <Description>입출력 예제가 없습니다.</Description>
            )}
          </Card>

          <Card>
            <CardTitle>제약 조건</CardTitle>
            <ConstraintList>
              {constraintItems.length > 0 ? (
                constraintItems.map(item => <li key={item}>{item}</li>)
              ) : (
                <li>등록된 제약 조건이 없습니다.</li>
              )}
            </ConstraintList>
            {error && <ErrorText>※ {error}</ErrorText>}
          </Card>
        </LeftColumn>

        <RightColumn>
          <StatsCard>
            <CardTitle>문제 통계</CardTitle>
            <StatRow>
              <span>정답률</span>
              <Highlight>{stats.accuracy}</Highlight>
            </StatRow>
            <StatRow>
              <span>해결 인원</span>
              <span>{stats.solved}명</span>
            </StatRow>
            <StatRow>
              <span>평균 시도</span>
              <span>{stats.attempts}회</span>
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

const ErrorText = styled.p`
  margin: 0.2rem 0 0;
  font-size: 0.9rem;
  color: #dc2626;
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
