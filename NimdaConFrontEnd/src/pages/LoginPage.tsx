import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "@/components/common/Button/BlueButton";
import FormField from "@/components/common/FormField";

export default function LoginPage() {
  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });
  // const navigate = useNavigate();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Login attempt:", formData);
  //   alert("로그인 성공! (현재는 UI 테스트 모드)");
  //   navigate("/");
  // };

  // const handleSignUpClick = () => {
  //   navigate("/signup");
  // };

  // return (
  //   <PageContainer>
  //     <PageTitle>NIMDA CON</PageTitle>
  //     <LoginSubtitle>로그인</LoginSubtitle>
  //     <Form onSubmit={handleSubmit}>
  //       <FormField
  //         label="아이디"
  //         type="text"
  //         name="username"
  //         value={formData.username}
  //         onChange={handleChange}
  //         placeholder="아이디를 입력하세요"
  //         required
  //       />
  //       <FormField
  //         label="비밀번호"
  //         type="password"
  //         name="password"
  //         value={formData.password}
  //         onChange={handleChange}
  //         placeholder="비밀번호를 입력하세요"
  //         required
  //       />
  //       <BlueButton type="submit">로그인</BlueButton>
  //       <SignUpLink type="button" onClick={handleSignUpClick}>
  //         회원가입
  //       </SignUpLink>
  //     </Form>
  //   </PageContainer>
  // );
}

const PageContainer = styled.div`
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #1a1a1a;
  font-weight: bold;
`;

const LoginSubtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #555;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SignUpLink = styled.button`
  padding: 0.75rem;
  background-color: #f0f0f0;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #e0e0e0;
  }
`;
