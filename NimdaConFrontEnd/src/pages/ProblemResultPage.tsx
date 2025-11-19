import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CorrectCircle from "@/assets/icons/correctCircle.png";
import CorrectSmall from "@/assets/icons/correctSmall.png";
import FailureCircle from "@/assets/icons/failureCircle.png";
import FailureSmall from "@/assets/icons/failureSmall.png";
import { mockProblemResults } from "@/mocks/mockProblemResults";

const ProblemResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 실제 연동 전 임시 데이터
  const mock = useMemo(() => {
    if (!id) return mockProblemResults[0];
    return mockProblemResults.find(r => r.problem_id === Number(id));
  }, [id]);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const isCorrect = mock?.status === "정답";

  const handleBack = () => {
    navigate(id ? `/problem/${id}` : "/problem/1");
  };

  const isPassResult = (value: string) => {
    if (value === "통과" || value === "정답") return true;
    return value.toUpperCase() === "AC";
  };

  const getDisplayResult = (value: string) => (isPassResult(value) ? "통과" : "불통과");

  const getTestIcon = (result: string) =>
    isPassResult(result) ? CorrectSmall : FailureSmall;

  const handleAddComment = () => {
    const next = commentInput.trim();
    if (!next) return;
    setComments(prev => [...prev, next]);
    setCommentInput("");
  };

  if (!mock) {
    return (
      <Page>
        <Title>채점 결과</Title>
        <EmptyCard>문제 목록에서 문제를 선택해주세요.</EmptyCard>
      </Page>
    );
  }

  return (
    <Page>
      <Title>채점 결과</Title>

      <ContentGrid>
        <LeftColumn>
          <Card>
            <ResultHeader>
              <ResultIconImg src={isCorrect ? CorrectCircle : FailureCircle} alt={mock.status} />
              <ResultText>
                <ResultStatus $correct={isCorrect}>{mock.status}</ResultStatus>
              </ResultText>
            </ResultHeader>
            <ResultStats>
              <ResultPill tone="time">
                <ResultPillLabel>실행 시간</ResultPillLabel>
                <ResultPillValue tone="time">{mock.runTime}</ResultPillValue>
              </ResultPill>
              <ResultPill tone="memory">
                <ResultPillLabel>메모리</ResultPillLabel>
                <ResultPillValue tone="memory">{mock.memory}</ResultPillValue>
              </ResultPill>
              <ResultPill tone="language">
                <ResultPillLabel>언어</ResultPillLabel>
                <ResultPillValue tone="language">{mock.language}</ResultPillValue>
              </ResultPill>
            </ResultStats>
            <Divider />
            <SectionLabel>테스트 케이스 결과</SectionLabel>
            <TestList>
              {mock.testCases.map(tc => {
                const displayResult = getDisplayResult(tc.result);
                return (
                  <TestRow key={tc.name}>
                    <TestRowLeft>
                      <TestIcon src={getTestIcon(tc.result)} alt={displayResult} />
                      <TestName>{tc.name}</TestName>
                      <TestResult $result={displayResult}>{displayResult}</TestResult>
                    </TestRowLeft>
                    <TestMeta>{tc.time} / {tc.memory}</TestMeta>
                  </TestRow>
                );
              })}
            </TestList>
          </Card>

          <Card>
            <SectionLabel>제출한 코드</SectionLabel>
            <CodeBlock spellCheck={false} readOnly value={mock.submittedCode} />
          </Card>

          <Card>
            <SectionLabel>댓글</SectionLabel>
            <CommentInput
              placeholder="댓글을 입력하세요."
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
            />
            <CommentButton type="button" onClick={handleAddComment}>댓글 작성</CommentButton>
            {comments.length > 0 && (
              <CommentList>
                {comments.map((content, idx) => (
                  <CommentItem key={`${content}-${idx}`}>{content}</CommentItem>
                ))}
              </CommentList>
            )}
          </Card>
        </LeftColumn>

        <RightColumn>
          <Card>
            <SectionLabel>제출 정보</SectionLabel>
            <InfoRow>
              <span>제출 시간</span>
              <span>{mock.submissionInfo.time}</span>
            </InfoRow>
            <InfoRow>
              <span>시도 횟수</span>
              <span>{mock.submissionInfo.attempts}</span>
            </InfoRow>
          </Card>

          <Card>
            <SectionLabel>문제 통계</SectionLabel>
            <InfoRow>
              <span>정답률</span>
              <Highlight>{mock.stats.accuracy}</Highlight>
            </InfoRow>
            <InfoRow>
              <span>해결 인원</span>
              <span>{mock.stats.solved}</span>
            </InfoRow>
            <InfoRow>
              <span>평균 시도</span>
              <span>{mock.stats.attempts}</span>
            </InfoRow>
          </Card>

          <BackButton type="button" onClick={handleBack}>문제로 돌아가기</BackButton>
        </RightColumn>
      </ContentGrid>
    </Page>
  );
};

export default ProblemResultPage;

const Page = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: #f3f4f6;
  box-sizing: border-box;
  padding-bottom: 2.5rem;
`;

const Title = styled.h1`
  margin: 0;
  width: 92%;
  max-width: 1280px;
  font-size: 1.8rem;
  font-weight: 800;
  padding: 1.5rem 0.5rem 0.3rem;
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
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 0.9fr);
  gap: 1rem;
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

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
`;

const ResultIconImg = styled.img`
  width: 55px;
  height: 55px;
  flex-shrink: 0;
`;

const ResultText = styled.div`
  display: flex;
  flex-direction: column;
`;

const ResultStatus = styled.span<{ $correct: boolean }>`
  font-size: 1.3rem;
  font-weight: 800;
  color: ${({ $correct }) => ($correct ? "#16a34a" : "#dc2626")};
`;

const ResultStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`;

const ResultPill = styled.div<{ tone: "time" | "memory" | "language" }>`
  background: ${({ tone }) =>
    tone === "time" ? "#eef4ff" : tone === "memory" ? "#f7f2ff" : "#eefaf3"};
  border-radius: 12px;
  padding: 0.85rem 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
`;

const ResultPillLabel = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 600;
`;

const ResultPillValue = styled.span<{ tone: "time" | "memory" | "language" }>`
  font-size: 1rem;
  font-weight: 800;
  color: ${({ tone }) =>
    tone === "time" ? "#2563eb" : tone === "memory" ? "#7c3aed" : "#15803d"};
`;

const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
`;

const SectionLabel = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: #1f2937;
`;

const TestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const TestRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  border-radius: 8px;
  padding: 0.55rem 0.75rem;
`;

const TestRowLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
`;

const TestIcon = styled.img`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

const TestName = styled.span`
  font-weight: 700;
  color: #1f2937;
`;

const TestResult = styled.span<{ $result: string }>`
  font-weight: 700;
  color: ${({ $result }) => ($result === "통과" ? "#16a34a" : "#dc2626")};
`;

const TestMeta = styled.span`
  color: #6b7280;
  font-size: 0.92rem;
`;

const CodeBlock = styled.textarea`
  width: 100%;
  min-height: 200px;
  background: #0f172a;
  color: #22c55e;
  border: none;
  border-radius: 12px;
  padding: 1rem 1.1rem;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 0.98rem;
  line-height: 1.7;
  white-space: pre;
  box-sizing: border-box;
  resize: none;
`;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 110px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0.9rem;
  font-size: 0.95rem;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
`;

const CommentButton = styled.button`
  align-self: flex-end;
  margin-top: 0.4rem;
  padding: 0.55rem 1.1rem;
  background: #2563eb;
  color: #ffffff;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;

const CommentList = styled.ul`
  margin: 0.6rem 0 0;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: #1f2937;
  line-height: 1.5;
`;

const CommentItem = styled.li`
  list-style: disc;
`;

const InfoRow = styled.div`
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

const BackButton = styled.button`
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
