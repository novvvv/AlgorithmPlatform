import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CorrectCircle from "@/assets/icons/correctCircle.png";
import CorrectSmall from "@/assets/icons/correctSmall.png";
import FailureCircle from "@/assets/icons/failureCircle.png";
import FailureSmall from "@/assets/icons/failureSmall.png";
import { mockProblemResults } from "@/mocks/mockProblemResults";
import type { IProblemResult } from "@/types/problemResult";
import { getProblemResultAPI } from "@/apis/problemResult";
import {
  BackButton,
  Card,
  CodeBlock,
  CommentButton,
  CommentInput,
  CommentItem,
  CommentList,
  ContentGrid,
  Divider,
  EmptyCard,
  Highlight,
  InfoRow,
  LeftColumn,
  Page,
  ResultHeader,
  ResultIconImg,
  ResultPill,
  ResultPillLabel,
  ResultPillValue,
  ResultStats,
  ResultStatus,
  ResultText,
  RightColumn,
  SectionLabel,
  TestIcon,
  TestList,
  TestMeta,
  TestName,
  TestResult,
  TestRow,
  TestRowLeft,
  Title,
} from "@/components/common/ProblemResultStyle";

type Comment = {
  author: string;
  content: string;
};

const ProblemResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [result, setResult] = useState<IProblemResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const fallbackResult = useMemo(() => {
    if (!id) return undefined;
    const found = mockProblemResults.find(r => r.problemId === Number(id));
    return found as unknown as IProblemResult | undefined; 
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    const problemId = id ? parseInt(id, 10) : NaN;
    
    if (!id || isNaN(problemId)) {
      setResult(null);
      setIsLoading(false);
      setError("문제 ID를 확인할 수 없습니다.");
      return;
    }

    const fetchResult = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getProblemResultAPI(problemId);
        if (cancelled) return;
        if (response.result) {
          setResult(response.result);
        } else {
          setResult(null);
          setError(response.message ?? "채점 결과를 찾을 수 없습니다.");
        }
      } catch (err) {
        if (cancelled) return;
        setResult(null);
        setError(
          err instanceof Error ? err.message : "채점 결과를 불러오지 못했습니다."
        );
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    void fetchResult();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const displayResult = result ?? fallbackResult ?? null;

  if (isLoading) {
    return (
      <Page>
        <Title>채점 결과</Title>
        <EmptyCard>채점 결과를 불러오는 중입니다...</EmptyCard>
      </Page>
    );
  }

  if (!displayResult) {
    return (
      <Page>
        <Title>채점 결과</Title>
        <EmptyCard>문제 목록에서 문제를 추가해주세요.</EmptyCard>
      </Page>
    );
  }

  // 백엔드 응답을 프론트엔드 형식으로 변환
  const normalizedResult: IProblemResult = {
    ...displayResult,
    status: (displayResult.status === "ACCEPTED" || displayResult.status === "정답") 
      ? "정답" 
      : "오답",
    testCases: displayResult.testCases || [],
    submissionInfo: displayResult.submissionInfo || {
      time: (displayResult as any).submittedAt 
        ? new Date((displayResult as any).submittedAt).toLocaleString('ko-KR')
        : "-",
      attempts: "1",
    },
    stats: displayResult.stats || {
      accuracy: "-",
      solved: "-",
      attempts: "-",
    },
  };

  const isCorrect = normalizedResult.status === "정답";

  const handleBack = () => {
    navigate(id ? `/problem/${id}` : "/problem");
  };

  const handleAddComment = () => {
    const next = commentInput.trim();
    if (!next) return;
    const author = normalizedResult.userName ?? "제출자";
    setComments(prev => [...prev, { author, content: next }]);
    setCommentInput("");
  };

  const isPassResult = (value: string) => {
    if (value === "통과" || value === "정답") return true;
    return value.toUpperCase() === "AC";
  };

  const getDisplayResult = (value: string) => (isPassResult(value) ? "통과" : "불통과");

  const getTestIcon = (result: string) =>
    isPassResult(result) ? CorrectSmall : FailureSmall;

  return (
    <Page>
      <Title>채점 결과</Title>
      {error && <EmptyCard>{error}</EmptyCard>}

      <ContentGrid>
        <LeftColumn>
          <Card>
            <ResultHeader>
              <ResultIconImg src={isCorrect ? CorrectCircle : FailureCircle} alt={normalizedResult.status} />
              <ResultText>
                <ResultStatus $correct={isCorrect}>{normalizedResult.status}</ResultStatus>
              </ResultText>
            </ResultHeader>
            <ResultStats>
              <ResultPill $tone="time">
                <ResultPillLabel>실행 시간</ResultPillLabel>
                <ResultPillValue $tone="time">{normalizedResult.executionTime || "-"}</ResultPillValue>
              </ResultPill>
              <ResultPill $tone="memory">
                <ResultPillLabel>메모리</ResultPillLabel>
                <ResultPillValue $tone="memory">{normalizedResult.memoryUsage || "-"}</ResultPillValue>
              </ResultPill>
              <ResultPill $tone="language">
                <ResultPillLabel>언어</ResultPillLabel>
                <ResultPillValue $tone="language">{normalizedResult.language}</ResultPillValue>
              </ResultPill>
            </ResultStats>
            <Divider />
            <SectionLabel>테스트 케이스 결과</SectionLabel>
            <TestList>
              {normalizedResult.testCases && normalizedResult.testCases.length > 0 ? (
                normalizedResult.testCases.map((tc, idx) => {
                  const displayResultText = getDisplayResult(tc.result);
                  return (
                    <TestRow key={tc.name || `tc-${idx}`}>
                      <TestRowLeft>
                        <TestIcon src={getTestIcon(tc.result)} alt={displayResultText} />
                        <TestName>{tc.name}</TestName>
                        <TestResult $result={displayResultText}>{displayResultText}</TestResult>
                      </TestRowLeft>
                      <TestMeta>{tc.executionTime || "-"} / {tc.memoryUsage || "-"}</TestMeta>
                    </TestRow>
                  );
                })
              ) : (
                <TestRow>
                  <TestRowLeft>
                    <TestName>테스트케이스 정보 없음</TestName>
                  </TestRowLeft>
                </TestRow>
              )}
            </TestList>
          </Card>

          <Card>
            <SectionLabel>제출한 코드</SectionLabel>
            <CodeBlock spellCheck={false} readOnly value={normalizedResult.submittedCode || ""} />
          </Card>

          <Card>
            <SectionLabel>댓글 ({comments.length})</SectionLabel>
            <CommentInput
              placeholder="댓글을 입력하세요."
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
            />
            <CommentButton type="button" onClick={handleAddComment}>댓글 작성</CommentButton>
            {comments.length > 0 && (
              <CommentList>
                {comments.map((comment, idx) => (
                  <CommentItem key={`${comment.content}-${idx}`}>
                    <strong>{comment.author}</strong>: {comment.content}
                  </CommentItem>
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
              <span>{normalizedResult.submissionInfo.time}</span>
            </InfoRow>
            <InfoRow>
              <span>시도 횟수</span>
              <span>{normalizedResult.submissionInfo.attempts}</span>
            </InfoRow>
          </Card>

          <Card>
            <SectionLabel>문제 통계</SectionLabel>
            <InfoRow>
              <span>정답률</span>
              <Highlight>{normalizedResult.stats.accuracy}</Highlight>
            </InfoRow>
            <InfoRow>
              <span>해결 인원</span>
              <span>{normalizedResult.stats.solved}</span>
            </InfoRow>
            <InfoRow>
              <span>평균 시도</span>
              <span>{normalizedResult.stats.attempts}</span>
            </InfoRow>
          </Card>

          <BackButton type="button" onClick={handleBack}>문제로 돌아가기</BackButton>
        </RightColumn>
      </ContentGrid>
    </Page>
  );
};

export default ProblemResultPage;
