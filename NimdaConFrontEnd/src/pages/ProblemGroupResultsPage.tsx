import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CorrectCircle from "@/assets/icons/correctCircle.png";
import CorrectSmall from "@/assets/icons/correctSmall.png";
import FailureCircle from "@/assets/icons/failureCircle.png";
import FailureSmall from "@/assets/icons/failureSmall.png";
import { mockProblemGroupResults } from "@/mocks/mockProblemGroupResults";
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

const ProblemGroupResultsPage: React.FC = () => {
  const { groupId, id } = useParams<{ groupId: string; id: string }>();
  const navigate = useNavigate();

  const resultsForProblem = useMemo(() => {
    if (!id) return [];
    return mockProblemGroupResults.filter(r => r.problemId === Number(id));
  }, [id]);

  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    setActiveIndex(0);
  }, [id]);

  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const submitterNames = useMemo(
    () => new Set(resultsForProblem.map(result => result.userName)),
    [resultsForProblem],
  );

  useEffect(() => {
    const initial: Record<string, Comment[]> = {};
    resultsForProblem.forEach(result => {
      initial[result.userName] = [];
    });
    setComments(initial);
  }, [resultsForProblem]);

  const activeResult = resultsForProblem[activeIndex];

  if (!groupId || !id || !activeResult) {
    return (
      <Page>
        <Title>채점 결과</Title>
        <EmptyCard>문제 목록에서 문제를 추가해주세요.</EmptyCard>
      </Page>
    );
  }

  const isCorrect = activeResult.status === "정답";

  const handleBack = () => {
    navigate(`/studygroup/${groupId}`);
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
    setComments(prev => ({
      ...prev,
      [activeResult.userName]: [
        ...(prev[activeResult.userName] ?? []),
        { author: COMMENT_AUTHOR, content: next },
      ],
    }));
    setCommentInput("");
  };

  const currentComments = comments[activeResult.userName] ?? [];
  const commentCount = currentComments.length;

  const formatCommentAuthor = (author: string) =>
    submitterNames.has(author) ? `${author} (제출자)` : author;

  return (
    <Page>
      <Title>채점 결과</Title>

      {resultsForProblem.length > 1 && (
        <UserTabBar>
              {resultsForProblem.map((result, index) => (
                <UserTab
                  key={result.submissionId}
                  $active={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                >
                  {result.userName}
                </UserTab>
              ))}
        </UserTabBar>
      )}

      <ContentGrid>
        <LeftColumn>
          <Card>
            <ResultHeader>
              <ResultIconImg src={isCorrect ? CorrectCircle : FailureCircle} alt={activeResult.status} />
              <ResultText>
                <ResultStatus $correct={isCorrect}>{activeResult.status}</ResultStatus>
              </ResultText>
            </ResultHeader>
            <ResultStats>
              <ResultPill tone="time">
                <ResultPillLabel>실행 시간</ResultPillLabel>
                <ResultPillValue tone="time">{activeResult.runTime}</ResultPillValue>
              </ResultPill>
              <ResultPill tone="memory">
                <ResultPillLabel>메모리</ResultPillLabel>
                <ResultPillValue tone="memory">{activeResult.memory}</ResultPillValue>
              </ResultPill>
              <ResultPill tone="language">
                <ResultPillLabel>언어</ResultPillLabel>
                <ResultPillValue tone="language">{activeResult.language}</ResultPillValue>
              </ResultPill>
            </ResultStats>
            <Divider />
            <SectionLabel>테스트 케이스 결과</SectionLabel>
            <TestList>
              {activeResult.testCases.map(tc => {
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
            <CodeBlock spellCheck={false} readOnly value={activeResult.submittedCode} />
          </Card>

          <Card>
            <SectionLabel>댓글 ({commentCount})</SectionLabel>
            <CommentInput
              placeholder="댓글을 입력하세요."
              value={commentInput}
              onChange={e => setCommentInput(e.target.value)}
            />
            <CommentButton type="button" onClick={handleAddComment}>댓글 작성</CommentButton>
            {currentComments.length > 0 && (
              <CommentList>
                {currentComments.map((comment, idx) => (
                  <CommentItem key={`${comment.content}-${idx}`}>
                    <strong>{formatCommentAuthor(comment.author)}</strong>: {comment.content}
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
              <span>{activeResult.submissionInfo.time}</span>
            </InfoRow>
            <InfoRow>
              <span>시도 횟수</span>
              <span>{activeResult.submissionInfo.attempts}</span>
            </InfoRow>
          </Card>

          <Card>
            <SectionLabel>문제 통계</SectionLabel>
            <InfoRow>
              <span>정답률</span>
              <Highlight>{activeResult.stats.accuracy}</Highlight>
            </InfoRow>
            <InfoRow>
              <span>해결 인원</span>
              <span>{activeResult.stats.solved}</span>
            </InfoRow>
            <InfoRow>
              <span>평균 시도</span>
              <span>{activeResult.stats.attempts}</span>
            </InfoRow>
          </Card>

          <BackButton type="button" onClick={handleBack}>문제로 돌아가기</BackButton>
        </RightColumn>
      </ContentGrid>
    </Page>
  );
};

export default ProblemGroupResultsPage;

const UserTabBar = styled.div`
  width: 92%;
  max-width: 1280px;
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
`;

const UserTab = styled.button<{ $active: boolean }>`
  padding: 0.45rem 1rem;
  border-radius: 9999px;
  border: none;
  font-weight: 700;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? "#2563eb" : "#e5e7eb")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#374151")};

  &:hover {
    background-color: ${({ $active }) => ($active ? "#1d4ed8" : "#d1d5db")};
  }
`;
