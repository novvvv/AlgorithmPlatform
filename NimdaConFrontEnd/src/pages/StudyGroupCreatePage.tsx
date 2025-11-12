import styled from "styled-components";
import { useState } from "react";
import BlueButton from "@/components/common/Button/BlueButton";
import FormField from "@/components/common/FormField";

export default function StudyGroupCreatePage() {
  // const [formData, setFormData] = useState({
  //   groupName: "",
  //   description: "",
  //   maxMembers: "10",
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Study group create:", formData);
  //   alert("스터디 그룹이 생성되었습니다. (UI 테스트 모드)");
  // };

  // return (
  //   <PageContainer>
  //     <PageTitle>스터디 그룹 만들기</PageTitle>
  //     <Form onSubmit={handleSubmit}>
  //       <FormField
  //         label="그룹 이름"
  //         type="text"
  //         name="groupName"
  //         value={formData.groupName}
  //         onChange={handleChange}
  //         placeholder="예: 알고리즘 스터디"
  //         required
  //       />

  //       <div>
  //         <Label>그룹 설명</Label>
  //         <TextArea
  //           name="description"
  //           value={formData.description}
  //           onChange={handleChange}
  //           placeholder="그룹의 목적과 활동 내용을 설명해주세요"
  //           required
  //         />
  //       </div>

  //       <FormField
  //         label="최대 인원"
  //         type="number"
  //         name="maxMembers"
  //         value={formData.maxMembers}
  //         onChange={handleChange}
  //         required
  //       />

  //       <BlueButton type="submit">그룹 만들기</BlueButton>
  //     </Form>
  //   </PageContainer>
  // );
}

const PageContainer = styled.div`
`;

const PageTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #1a1a1a;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: inherit;
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;
