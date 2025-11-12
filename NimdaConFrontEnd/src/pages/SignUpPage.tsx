import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "@/components/common/Button/BlueButton";
import FormField from "@/components/common/FormField";

export default function SignUpPage() {
  // const [formData, setFormData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });
  // const [errors, setErrors] = useState<Record<string, string>>({});
  // const navigate = useNavigate();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData(prev => ({ ...prev, [name]: value }));
  //   if (errors[name]) {
  //     setErrors(prev => ({ ...prev, [name]: "" }));
  //   }
  // };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const newErrors: Record<string, string> = {};

  //   if (!formData.username.trim()) {
  //     newErrors.username = "아이디를 입력해주세요";
  //   }
  //   if (!formData.email.trim()) {
  //     newErrors.email = "이메일을 입력해주세요";
  //   }
  //   if (!formData.password) {
  //     newErrors.password = "비밀번호를 입력해주세요";
  //   }
  //   if (formData.password !== formData.confirmPassword) {
  //     newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
  //   }

  //   if (Object.keys(newErrors).length > 0) {
  //     setErrors(newErrors);
  //     return;
  //   }

  //   console.log("Sign up attempt:", {
  //     username: formData.username,
  //     email: formData.email,
  //     password: formData.password,
  //   });
  //   alert("회원가입 성공! (현재는 UI 테스트 모드)");
  //   navigate("/login");
  // };

  // const handleLoginClick = () => {
  //   navigate("/login");
  // };

  // return (
  //   <PageContainer>
  //     <PageTitle>NIMDA CON</PageTitle>
  //     <SignUpSubtitle>회원가입</SignUpSubtitle>
  //     <Form onSubmit={handleSubmit}>
  //       <div>
  //         <FormField
  //           label="아이디"
  //           type="text"
  //           name="username"
  //           value={formData.username}
  //           onChange={handleChange}
  //           placeholder="아이디를 입력하세요"
  //           required
  //         />
  //         {errors.username && <ErrorText>{errors.username}</ErrorText>}
  //       </div>

  //       <div>
  //         <FormField
  //           label="이메일"
  //           type="email"
  //           name="email"
  //           value={formData.email}
  //           onChange={handleChange}
  //           placeholder="example@email.com"
  //           required
  //         />
  //         {errors.email && <ErrorText>{errors.email}</ErrorText>}
  //       </div>

  //       <div>
  //         <FormField
  //           label="비밀번호"
  //           type="password"
  //           name="password"
  //           value={formData.password}
  //           onChange={handleChange}
  //           placeholder="비밀번호를 입력하세요"
  //           required
  //         />
  //         {errors.password && <ErrorText>{errors.password}</ErrorText>}
  //       </div>

  //       <div>
  //         <FormField
  //           label="비밀번호 확인"
  //           type="password"
  //           name="confirmPassword"
  //           value={formData.confirmPassword}
  //           onChange={handleChange}
  //           placeholder="비밀번호를 다시 입력하세요"
  //           required
  //         />
  //         {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
  //       </div>

  //       <BlueButton type="submit">회원가입</BlueButton>
  //       <LoginLink type="button" onClick={handleLoginClick}>
  //         이미 계정이 있으신가요? 로그인
  //       </LoginLink>
  //     </Form>
  //   </PageContainer>
  // );
}

const PageContainer = styled.div`
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
  font-weight: bold;
`;

const SignUpSubtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #555;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ErrorText = styled.p`
  color: #d32f2f;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const LoginLink = styled.button`
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
