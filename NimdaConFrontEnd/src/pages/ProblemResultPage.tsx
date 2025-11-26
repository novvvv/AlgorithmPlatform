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

const COMMENT_AUTHOR = "김그룹";

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
    return mockProblemResults.find(r => r.problemId === Number(id));
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    if (!id) {
      setResult(null);
      setIsLoading(false);
      setError("문제 ID를 확인할 수 없습니다.");
      return;
    }

    const fetchResult = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getProblemResultAPI(Number(id));
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

  const isCorrect = displayResult.status === "정답";

  const handleBack = () => {
    navigate(id ? `/problem/${id}` : "/problem");
  };

  const handleAddComment = () => {
    const next = commentInput.trim();
    if (!next) return;
    setComments(prev => [...prev, { author: COMMENT_AUTHOR, content: next }]);
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
              <ResultIconImg src={isCorrect ? CorrectCircle : FailureCircle} alt={displayResult.status} />
              <ResultText>
                <ResultStatus $correct={isCorrect}>{displayResult.status}</ResultStatus>
              </ResultText>
            </ResultHeader>
            <ResultStats>
              <ResultPill tone="time">
                <ResultPillLabel>실행 시간</ResultPillLabel>
                <ResultPillValue tone="time">{displayResult.runTime}</ResultPillValue>
              </ResultPill>
              <ResultPill tone="memory">
                <ResultPillLabel>메모리</ResultPillLabel>
                <ResultPillValue tone="memory">{displayResult.memory}</ResultPillValue>
              </ResultPill>
              <ResultPill tone="language">
                <ResultPillLabel>언어</ResultPillLabel>
                <ResultPillValue tone="language">{displayResult.language}</ResultPillValue>
              </ResultPill>
            </ResultStats>
            <Divider />
            <SectionLabel>테스트 케이스 결과</SectionLabel>
            <TestList>
              {displayResult.testCases.map(tc => {
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
            <CodeBlock spellCheck={false} readOnly value={displayResult.submittedCode} />
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
              <span>{displayResult.submissionInfo.time}</span>
            </InfoRow>
            <InfoRow>
              <span>시도 횟수</span>
              <span>{displayResult.submissionInfo.attempts}</span>
            </InfoRow>
          </Card>

          <Card>
            <SectionLabel>문제 통계</SectionLabel>
            <InfoRow>
              <span>정답률</span>
              <Highlight>{displayResult.stats.accuracy}</Highlight>
            </InfoRow>
            <InfoRow>
              <span>해결 인원</span>
              <span>{displayResult.stats.solved}</span>
            </InfoRow>
            <InfoRow>
              <span>평균 시도</span>
              <span>{displayResult.stats.attempts}</span>
            </InfoRow>
          </Card>

          <BackButton type="button" onClick={handleBack}>문제로 돌아가기</BackButton>
        </RightColumn>
      </ContentGrid>
    </Page>
  );
};

export default ProblemResultPage;
