import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CorrectSmall from "@/assets/icons/correctSmall.png";
import FailureSmall from "@/assets/icons/failureSmall.png";
import { mockProblemDetails } from "@/mocks/mockProblemDetails";
import { mockProblemResults } from "@/mocks/mockProblemResults";
import { getProblemByIdAPI } from "@/apis/problem";
import { submitCodeAPI } from "@/apis/judge";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import type { SubmissionRequest, SubmissionStatus } from "@/types/judge";
import type { IProblem } from "@/types/problem";

const languageOptions = [
  { label: "Python", value: "PYTHON" },
  { label: "Java", value: "JAVA" },
  { label: "C++17", value: "CPP17" },
  { label: "C99", value: "C99" },
];

type TestStatus = SubmissionStatus;

interface TestResult {
  name: string;
  status: TestStatus;
  time: string;
  memory: string;
}

const ProblemSolvePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  const fallbackProblem = useMemo(() => {
    if (!id) return undefined;
    return mockProblemDetails.find(p => p.id === Number(id));
  }, [id]);

  const [problem, setProblem] = useState<IProblem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState(languageOptions[0].value);
  const [code, setCode] = useState(`def solution(nums, target):
    # 코드를 작성하세요`);
  const [resultMessage, setResultMessage] = useState("코드를 실행하면 결과가 표시됩니다.");
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resultMock = useMemo(() => {
    if (!id) return undefined;
    return mockProblemResults.find(r => r.problemId === Number(id));
  }, [id]);

  const hasDetail = problem || fallbackProblem;
  const sampleList = fallbackProblem?.samples ?? [];
  const constraintList = fallbackProblem?.constraints ?? [];
  const displayTitle = problem?.title ?? fallbackProblem?.title ?? "";
  const displayDescription = problem?.description ?? fallbackProblem?.description ?? "";

  const testCaseCount = useMemo(() => {
    if (sampleList.length > 0) return sampleList.length;
    return resultMock?.testCases.length ?? 0;
  }, [sampleList.length, resultMock?.testCases.length]);

  useEffect(() => {
    let cancelled = false;
    const problemId = id ? parseInt(id, 10) : NaN;
    
    if (!id || isNaN(problemId)) {
      setProblem(null);
      setIsLoading(false);
      return;
    }

    const fetchProblem = async () => {
      setIsLoading(true);
      try {
        const response = await getProblemByIdAPI(problemId);
        if (cancelled) return;
        setProblem(response.problem ?? null);
      } catch {
        if (cancelled) return;
        setProblem(null);
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

  
  useEffect(() => {
    setTestResults([]);
    setResultMessage("코드를 실행하면 결과가 표시됩니다.");
    setCode(`def solution(nums, target):
    # 코드를 작성하세요`);
  }, [id]);

  const buildTestResults = (
    status: SubmissionStatus,
    executionTime?: number,
    memoryUsage?: number,
  ): TestResult[] => {
    const count = Math.max(testCaseCount || resultMock?.testCases.length || 1, 1);
    const timeLabel = executionTime !== undefined ? `${executionTime}ms` : "-";
    const memoryLabel =
      memoryUsage !== undefined ? `${Math.round(memoryUsage / 1024)}KB` : "-";

    return Array.from({ length: count }, (_, index) => ({
      name: `테스트 케이스 ${index + 1}`,
      status,
      time: timeLabel,
      memory: memoryLabel,
    }));
  };

  const handleRun = () => {
    const problemId = Number(id);
    if (!id || isNaN(problemId)) {
      setResultMessage("유효하지 않은 문제 ID입니다.");
      return;
    }

    const currentUserIdStr = currentUser?.userId ? String(currentUser.userId) : "unknown";

    const payload: SubmissionRequest = {
      userId: currentUserIdStr,
      code,
      language: language as SubmissionRequest["language"],
      problemId: problemId,
      title: displayTitle,
    } as unknown as SubmissionRequest;

    console.log("실행 요청 데이터:", payload);

    setIsRunning(true);
    submitCodeAPI(payload)
      .then(response => {
        const status = response.result.status;
        setResultMessage(response.result.message || `실행 결과: ${status}`);
        setTestResults(
          buildTestResults(status as SubmissionStatus, response.result.executionTime, response.result.memoryUsage),
        );
      })
      .catch(err => {
        console.error("API Error:", err);
        if (resultMock) {
          setTestResults(
            resultMock.testCases.map(tc => ({
              name: tc.name,
              status: tc.result,
              time: tc.time,
              memory: tc.memory,
            })),
          );
          setResultMessage("API 호출 실패, 목업 데이터로 결과를 표시했습니다.");
        } else {
          setTestResults([]);
          setResultMessage(
            err instanceof Error ? err.message : "실행 결과를 불러오지 못했습니다."
          );
        }
      })
      .finally(() => setIsRunning(false));
  };

  const handleSubmit = () => {
    const problemId = Number(id);
    if (!id || isNaN(problemId)) {
      setResultMessage("유효하지 않은 문제 ID입니다.");
      return;
    }

    const currentUserIdStr = currentUser?.userId ? String(currentUser.userId) : "unknown";

    const payload: SubmissionRequest = {
      userId: currentUserIdStr,
      code,
      language: language as SubmissionRequest["language"],
      problemId: problemId,
      title: displayTitle,
    } as unknown as SubmissionRequest;

    console.log("제출 요청 데이터:", payload);

    setIsSubmitting(true);
    submitCodeAPI(payload)
      .then(response => {
        setResultMessage(response.result.message || "제출이 완료되었습니다.");
        navigate(`/problem/result/${id}`);
      })
      .catch(err => {
        console.error(err);
        setResultMessage(
          err instanceof Error
            ? `제출 실패: ${err.message}`
            : "제출 중 오류가 발생했습니다."
        );
      })
      .finally(() => setIsSubmitting(false));
  };

  if (isLoading) {
    return (
      <Page>
        <Title>문제 풀이</Title>
        <EmptyCard>문제 정보를 불러오는 중입니다...</EmptyCard>
      </Page>
    );
  }

  if (!hasDetail) {
    return (
      <Page>
        <Title>문제 풀이</Title>
        <EmptyCard>문제 목록에서 문제를 추가해주세요.</EmptyCard>
      </Page>
    );
  }

  return (
    <Page>
      <Title>{displayTitle}{id ? ` (#${id})` : ""}</Title>
      <ContentGrid>
        <LeftColumn>
          <Card>
            <CardTitle>문제 설명</CardTitle>
            <Description>{displayDescription}</Description>
          </Card>

          <Card>
            <CardTitle>입출력 예제</CardTitle>
            {sampleList.map((sample, idx) => (
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
              {constraintList.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ConstraintList>
          </Card>
        </LeftColumn>

        <RightColumn>
          <EditorCard>
            <EditorHeader>
              <CardTitle>코드 작성</CardTitle>
              <LanguageSelect value={language} onChange={e => setLanguage(e.target.value)}>
                {languageOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </LanguageSelect>
            </EditorHeader>
            <CodeEditor
              spellCheck={false}
              value={code}
              onChange={e => setCode(e.target.value)}
            />
          </EditorCard>

          <ActionRow>
            <RunButton type="button" onClick={handleRun} disabled={isRunning || isSubmitting}>
              {isRunning ? "실행 중..." : "실행"}
            </RunButton>
            <SubmitButton type="button" onClick={handleSubmit} disabled={isSubmitting || isRunning}>
              {isSubmitting ? "제출 중..." : "제출"}
            </SubmitButton>
          </ActionRow>

          <Card>
            <CardTitle>결과</CardTitle>
            <Description>{resultMessage}</Description>
            {testResults.length > 0 && (
              <TestList>
                {testResults.map(result => (
                  <TestRow key={result.name}>
                    <TestRowLeft>
                      <TestIcon
                        src={result.status === "ACCEPTED" ? CorrectSmall : FailureSmall}
                        alt={result.status === "ACCEPTED" ? "통과" : "불통과"}
                      />
                      <TestName>{result.name}</TestName>
                      <TestResultText $status={result.status}>
                        {result.status === "ACCEPTED" ? "통과" : "불통과"}
                      </TestResultText>
                    </TestRowLeft>
                    <TestMeta>{result.time} / {result.memory}</TestMeta>
                  </TestRow>
                ))}
              </TestList>
            )}
          </Card>
        </RightColumn>
      </ContentGrid>
    </Page>
  );
};

export default ProblemSolvePage;

const Page = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
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
  grid-template-columns: 1.2fr 1.8fr;
  gap: 1rem;

  @media (max-width: 1024px) {
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
  gap: 0.85rem;
`;

const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.1rem 1.2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

const CardTitle = styled.h2`
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: #1f2937;
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.6;
  color: #4b5563;
`;

const TestList = styled.div`
  margin-top: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const TestRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  border-radius: 10px;
  padding: 0.55rem 0.75rem;
`;

const TestRowLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
`;

const TestIcon = styled.img`
  width: 18px;
  height: 18px;
  flex-shrink: 0;
`;

const TestName = styled.span`
  font-weight: 700;
  color: #1f2937;
`;

const TestResultText = styled.span<{ $status: TestStatus }>`
  font-weight: 700;
  color: ${({ $status }) => ($status === "ACCEPTED" ? "#2ecc71" : "#e74c3c")};
`;

const TestMeta = styled.span`
  color: #6b7280;
  font-size: 0.92rem;
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
  color: #9ca3af;
  word-break: break-word;
`;

const ConstraintList = styled.ul`
  margin: 0;
  padding-left: 1.1rem;
  color: #4b5563;
  line-height: 1.6;
`;

const EditorCard = styled(Card)`
  gap: 0.9rem;
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LanguageSelect = styled.select`
  padding: 0.45rem 0.9rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #ffffff;
  font-size: 0.95rem;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #6b7280 50%), linear-gradient(135deg, #6b7280 50%, transparent 50%);
  background-position: calc(100% - 14px) 50%, calc(100% - 8px) 50%;
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;
  min-width: 120px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
`;

const CodeEditor = styled.textarea`
  width: 100%;
  min-height: 380px;
  background: #0f172a;
  color: #d1d5db;
  border: none;
  border-radius: 14px;
  padding: 1rem 1.1rem;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 0.98rem;
  line-height: 1.7;
  white-space: pre;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
`;

const ActionRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.6rem;
`;

const BaseButton = styled.button`
  padding: 0.9rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  color: #ffffff;
`;

const RunButton = styled(BaseButton)`
  background: #525f6c;

  &:hover {
    background: #45515d;
  }
`;

const SubmitButton = styled(BaseButton)`
  background: #22c55e;

  &:hover {
    background: #16a34a;
  }
`;
