import styled from "styled-components";
import { useState } from "react";
import BlueButton from "@/components/common/Button/BlueButton";
import FormField from "@/components/common/FormField";

export default function ProblemCreatePage() {
  // const [formData, setFormData] = useState({
  //   title: "",
  //   description: "",
  //   difficulty: "Medium",
  //   timeLimit: "5",
  //   memoryLimit: "256",
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Problem create:", formData);
  //   alert("문제가 생성되었습니다. (UI 테스트 모드)");
  // };

  // return (
  //   <PageContainer>
  //     <PageTitle>문제 출제</PageTitle>
  //     <Form onSubmit={handleSubmit}>
  //       <FormField
  //         label="문제 제목"
  //         type="text"
  //         name="title"
  //         value={formData.title}
  //         onChange={handleChange}
  //         placeholder="예: 두 수의 합"
  //         required
  //       />

  //       <div>
  //         <Label>문제 설명</Label>
  //         <TextArea
  //           name="description"
  //           value={formData.description}
  //           onChange={handleChange}
  //           placeholder="문제를 상세히 설명해주세요"
  //           required
  //         />
  //       </div>

  //       <div>
  //         <Label>난이도</Label>
  //         <Select
  //           name="difficulty"
  //           value={formData.difficulty}
  //           onChange={handleChange}
  //         >
  //           <option value="Easy">쉬움</option>
  //           <option value="Medium">중간</option>
  //           <option value="Hard">어려움</option>
  //         </Select>
  //       </div>

  //       <FormField
  //         label="시간 제한 (초)"
  //         type="number"
  //         name="timeLimit"
  //         value={formData.timeLimit}
  //         onChange={handleChange}
  //         required
  //       />

  //       <FormField
  //         label="메모리 제한 (MB)"
  //         type="number"
  //         name="memoryLimit"
  //         value={formData.memoryLimit}
  //         onChange={handleChange}
  //         required
  //       />

  //       <BlueButton type="submit">문제 출제</BlueButton>
  //     </Form>
  //   </PageContainer>
  // );
}

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
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
  min-height: 150px;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;
