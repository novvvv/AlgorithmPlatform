import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CorrectSmall from "@/assets/icons/correctSmall.png";
import FailureSmall from "@/assets/icons/failureSmall.png";

const languageOptions = [
  { label: "python", value: "PYTHON" },
  { label: "java", value: "JAVA" },
  { label: "c++", value: "CPP" },
];

type TestStatus = "AC" | "WA";

interface TestResult {
  name: string;
  status: TestStatus;
  time: string;
  memory: string;
}

const ProblemSolvePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // 실제 연동 전 임시 데이터
  const mock = useMemo(
    () => ({
      title: "문제 이름",
      description: "배열에서 두 수를 더해 target을 만드는 인덱스를 반환하세요.",
      samples: [{ input: "", output: "" }],
      constraints: ["시간 제한: 2초", "메모리 제한: 256MB"],
    }),
    [],
  );

  const [language, setLanguage] = useState(languageOptions[0].value);
  const [code, setCode] = useState(`def solution(nums, target) :
    # 코드를 작성하세요`);
  const [resultMessage, setResultMessage] = useState("코드를 실행하면 결과가 표시됩니다.");
  const [testResults, setTestResults] = useState<TestResult[]>([]);

  const handleRun = () => {
    // 실제 채점 결과를 연동하기 전까지는 샘플 데이터를 사용합니다.
    setTestResults([
      { name: "테스트 케이스 1", status: "AC", time: "42ms", memory: "5.1MB" },
      { name: "테스트 케이스 2", status: "AC", time: "38ms", memory: "5.0MB" },
      { name: "테스트 케이스 3", status: "WA", time: "44ms", memory: "5.2MB" },
    ]);
    setResultMessage("실행 결과가 업데이트되었습니다.");
  };

  const handleSubmit = () => {
    setResultMessage("제출이 완료되었습니다. (모의 상태)");
    navigate("/problem-result");
  };

  return (
    <Page>
      <Title>{mock.title}{id ? ` (#${id})` : ""}</Title>
      <ContentGrid>
        <LeftColumn>
          <Card>
            <CardTitle>문제 설명</CardTitle>
            <Description>{mock.description}</Description>
          </Card>

          <Card>
            <CardTitle>입출력 예제</CardTitle>
            {mock.samples.map((sample, idx) => (
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
              {mock.constraints.map(item => (
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
            <RunButton type="button" onClick={handleRun}>실행</RunButton>
            <SubmitButton type="button" onClick={handleSubmit}>제출</SubmitButton>
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
                        src={result.status === "AC" ? CorrectSmall : FailureSmall}
                        alt={result.status === "AC" ? "통과" : "오답"}
                      />
                      <TestName>{result.name}</TestName>
                      <TestResultText status={result.status}>
                        {result.status === "AC" ? "통과" : "오답"}
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
  background: #f5f5f5;
  box-sizing: border-box;
`;

const Title = styled.h1`
  margin: 0;
  width: 92%;
  max-width: 1120px;
  font-size: 1.8rem;
  font-weight: 800;
  padding: 1.5rem 0.5rem 0.5rem;
`;

const ContentGrid = styled.div`
  width: 92%;
  max-width: 1120px;
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

const TestResultText = styled.span<{ status: TestStatus }>`
  font-weight: 700;
  color: ${({ status }) => (status === "AC" ? "#16a34a" : "#dc2626")};
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
