import { useState } from "react";
import styled from "styled-components";

export default function StudyGroupCreatePage() {
  const [groupName, setGroupName] = useState("");
  const [description, setDescription] = useState("");
  const [goal, setGoal] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const handleCancel = () => {
    setGroupName("");
    setDescription("");
    setGoal("");
    setMaxMembers("");
    setIsPublic(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // TODO: API 연동
    console.log("Study group create:", { groupName, description, goal, maxMembers, is_public: isPublic });
    alert("스터디 그룹이 생성되었습니다. (UI 동작 확인용)");
  };

  return (
    <PageWrapper>
      <Card>
        <FormHeader>스터디 그룹 생성</FormHeader>
        <Form onSubmit={handleSubmit}>
          <Field>
            <Label>그룹 이름</Label>
            <Input
              placeholder="그룹 이름을 입력하세요"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              required
            />
          </Field>

          <Field>
            <Label>그룹 설명</Label>
            <TextArea
              placeholder="그룹의 목적과 활동 내용을 설명해주세요"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </Field>

          <Field>
            <Label>그룹 목표</Label>
            <TextArea
              placeholder="구체적인 학습 목표를 작성해주세요"
              value={goal}
              onChange={e => setGoal(e.target.value)}
            />
          </Field>

          <Row>
            <Field>
              <Label>공개 설정</Label>
              <Select value={isPublic ? "public" : "private"} onChange={e => setIsPublic(e.target.value === "public")}>
                <option value="public">공개</option>
                <option value="private">비공개</option>
              </Select>
            </Field>
            <Field>
              <Label>최대 인원 수</Label>
              <Input
                type="number"
                placeholder="예: 20"
                value={maxMembers}
                onChange={e => setMaxMembers(e.target.value)}
                min="1"
                required
              />
            </Field>
          </Row>

          <Actions>
            <CancelButton type="button" onClick={handleCancel}>취소</CancelButton>
            <SubmitButton type="submit">그룹 생성</SubmitButton>
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
  width: 100%;
  background: #f3f4f6;
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
  margin: 1rem;
  flex-grow: 1;
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
  min-height: 140px;
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
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
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
