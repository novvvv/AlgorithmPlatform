import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "@/components/common/BlueButton";
import FormField from "@/components/common/FormField";
import { loginAPI } from "@/apis/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.userId.trim()) {
      newErrors.userId = "아이디를 입력해주세요";
    }
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginAPI({
        userId: formData.userId,
        password: formData.password,
      });
      
      if (response.accessToken) {
        // 토큰 저장 확인
        const savedToken = localStorage.getItem("authToken");
        console.log("로그인 성공! 토큰 저장됨:", savedToken ? "있음" : "없음");
        console.log("저장된 토큰:", savedToken ? savedToken.substring(0, 20) + "..." : "없음");
        console.log("사용자 정보:", response.user);
        
        if (!savedToken) {
          console.error("토큰이 저장되지 않았습니다!");
          alert("토큰 저장에 실패했습니다. 다시 시도해주세요.");
          return;
        }
        
        alert("로그인 성공!");
        navigate("/mypage");
      } else {
        console.error("로그인 응답에 accessToken이 없습니다:", response);
        alert("로그인 응답에 문제가 있습니다.");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "로그인에 실패했습니다.";
      alert(errorMessage);
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  return (
    <PageContainer>
      <LoginCard>
        <PageTitle>NIMDA CON</PageTitle>
        <LoginSubtitle>로그인</LoginSubtitle>
        <Form onSubmit={handleSubmit}>
          <div>
            <FormField
              label="아이디"
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="아이디를 입력하세요"
              required
            />
            {errors.userId && <ErrorText>{errors.userId}</ErrorText>}
          </div>

          <div>
            <FormField
              label="비밀번호"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </div>

          {errors.submit && <ErrorText>{errors.submit}</ErrorText>}

          <BlueButton type="submit" onClick={undefined}>
            {isLoading ? "로그인 중..." : "로그인"}
          </BlueButton>
          
          <SignUpLink type="button" onClick={handleSignUpClick}>
            계정이 없으신가요? 회원가입
          </SignUpLink>
        </Form>
      </LoginCard>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-color: #f5f5f5;
  box-sizing: border-box;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
  font-weight: bold;
  text-align: center;
`;

const LoginSubtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #555;
  text-align: center;
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

const SignUpLink = styled.button`
  padding: 0.75rem;
  background-color: transparent;
  color: #2563eb;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.95rem;
  text-decoration: underline;
  transition: color 0.2s ease;

  &:hover {
    color: #1d4ed8;
  }
`;
