import { useState } from "react";
import styled from "styled-components";
import type { ProblemDifficulty, ProgrammingLanguage } from "@/types/problem";

interface TestCase {
  input: string;
  output: string;
}

const difficultyOptions: Array<{ label: string; value: ProblemDifficulty }> = [
  { label: "하", value: "EASY" },
  { label: "중", value: "MEDIUM" },
  { label: "상", value: "HARD" },
];

const languageOptions: Array<{ label: string; value: ProgrammingLanguage }> = [
  { label: "Python", value: "PYTHON" },
  { label: "Java", value: "JAVA" },
  { label: "C++", value: "CPP" },
];

export default function ProblemCreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<ProblemDifficulty>("EASY");
  const [language, setLanguage] = useState<ProgrammingLanguage>("PYTHON");
  const [timeLimit, setTimeLimit] = useState("");
  const [memoryLimit, setMemoryLimit] = useState("");
  const [testCases, setTestCases] = useState<TestCase[]>([{ input: "", output: "" }]);
  const [solution, setSolution] = useState(`def solution():
    # 정답코드를 작성하세요`);

  const handleAddTestCase = () => {
    setTestCases(prev => [...prev, { input: "", output: "" }]);
  };

  const handleChangeTestCase = (index: number, key: keyof TestCase, value: string) => {
    setTestCases(prev => prev.map((tc, i) => (i === index ? { ...tc, [key]: value } : tc)));
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setDifficulty("EASY");
    setLanguage("PYTHON");
    setTimeLimit("");
    setMemoryLimit("");
    setTestCases([{ input: "", output: "" }]);
    setSolution(`def solution():
    # 정답코드를 작성하세요`);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // TODO: API 연동
    alert("문제가 생성되었습니다. (UI 동작 확인용)");
  };

  return (
    <PageWrapper>
      <Card>
        <FormHeader>새로운 문제 추가</FormHeader>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>문제 이름</Label>
            <Input
              placeholder="문제 이름을 입력하세요"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </Field>

          <Field>
            <Label>문제 설명</Label>
            <TextArea
              placeholder="문제 설명을 입력하세요"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </Field>

          <Row>
            <Field>
              <Label>난이도</Label>
              <Select value={difficulty} onChange={e => setDifficulty(e.target.value as ProblemDifficulty)}>
                {difficultyOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
            </Field>
            <Field>
              <Label>언어</Label>
              <Select value={language} onChange={e => setLanguage(e.target.value as ProgrammingLanguage)}>
                {languageOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
            </Field>
            <Field>
              <Label>시간 제한(초)</Label>
              <Input
                placeholder="예: 1"
                value={timeLimit}
                onChange={e => setTimeLimit(e.target.value)}
              />
            </Field>
            <Field>
              <Label>메모리 제한(MB)</Label>
              <Input
                placeholder="예: 512"
                value={memoryLimit}
                onChange={e => setMemoryLimit(e.target.value)}
              />
            </Field>
          </Row>

          <Section>
            <SectionHeader>
              <SectionTitle>테스트 케이스</SectionTitle>
              <AddButton type="button" onClick={handleAddTestCase}>+ 추가</AddButton>
            </SectionHeader>
            <TestCaseContainer>
              <TestCaseHeader>
                <span>입력</span>
                <span>출력</span>
              </TestCaseHeader>
              {testCases.map((tc, index) => (
                <TestCaseRow key={index}>
                  <Input
                    placeholder="입력 예시"
                    value={tc.input}
                    onChange={e => handleChangeTestCase(index, "input", e.target.value)}
                  />
                  <Input
                    placeholder="출력 예시"
                    value={tc.output}
                    onChange={e => handleChangeTestCase(index, "output", e.target.value)}
                  />
                </TestCaseRow>
              ))}
            </TestCaseContainer>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>정답 코드</SectionTitle>
            </SectionHeader>
            <CodeEditor
              spellCheck={false}
              value={solution}
              onChange={e => setSolution(e.target.value)}
            />
          </Section>

          <Actions>
            <CancelButton type="button" onClick={handleCancel}>취소</CancelButton>
            <SubmitButton type="submit">문제 생성</SubmitButton>
          </Actions>
        </Form>
      </Card>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 90%;
  max-width: 900px;
  background: #f3f4f6;
  border-radius: 8px;
  padding: 1.5rem 1.75rem 2rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;

const FormHeader = styled.h1`
  text-align: center;
  font-size: 1.7rem;
  font-weight: 700;
  margin: 0 0 1.25rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

const Label = styled.label`
  font-weight: 700;
  color: #4b5563;
  font-size: 0.95rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 0.9rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  font-size: 0.95rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 0.9rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  font-size: 0.95rem;
  resize: vertical;
  font-family: inherit;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.85rem 0.9rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: #ffffff;
  font-size: 0.95rem;
  box-sizing: border-box;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #6b7280 50%), linear-gradient(135deg, #6b7280 50%, transparent 50%);
  background-position: calc(100% - 18px) 50%, calc(100% - 12px) 50%;
  background-size: 6px 6px, 6px 6px;
  background-repeat: no-repeat;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.85rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
  color: #4b5563;
`;

const AddButton = styled.button`
  background: transparent;
  border: none;
  color: #2563eb;
  font-weight: 700;
  cursor: pointer;
  padding: 0.2rem 0.1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const TestCaseContainer = styled.div`
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
`;

const TestCaseHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #d1d5db;
  color: #4b5563;
  font-weight: 700;
  font-size: 0.9rem;
  padding: 0.6rem 0.85rem;

  span {
    text-align: left;
  }
`;

const TestCaseRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.65rem;
  padding: 0.75rem 0.85rem 1rem;
  box-sizing: border-box;

  & + & {
    border-top: 1px solid #e5e7eb;
  }
`;

const CodeEditor = styled.textarea`
  width: 100%;
  min-height: 170px;
  background: #0f172a;
  color: #22c55e;
  border: none;
  border-radius: 10px;
  padding: 0.95rem 1rem;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 0.95rem;
  line-height: 1.6;
  white-space: pre;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
`;

const Actions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem;
  margin-top: 0.4rem;
`;

const ButtonBase = styled.button`
  padding: 0.85rem;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
`;

const CancelButton = styled(ButtonBase)`
  background: #d1d5db;
  color: #4b5563;

  &:hover {
    background: #c4c7ce;
  }
`;

const SubmitButton = styled(ButtonBase)`
  background: #2563eb;
  color: #ffffff;

  &:hover {
    background: #1d4ed8;
  }
`;
