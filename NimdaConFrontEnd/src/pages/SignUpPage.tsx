import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BlueButton from "@/components/common/BlueButton";
import FormField from "@/components/common/FormField";
import { registerAPI } from "@/apis/auth";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    universityName: "",
    department: "",
    grade: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.userId.trim()) {
      newErrors.userId = "아이디를 입력해주세요";
    } else if (formData.userId.length < 3) {
      newErrors.userId = "아이디는 3자 이상이어야 합니다";
    }

    if (!formData.userName.trim()) {
      newErrors.userName = "사용자명을 입력해주세요";
    } else if (formData.userName.length < 3 || formData.userName.length > 20) {
      newErrors.userName = "사용자명은 3-20자 사이여야 합니다";
    }

    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "올바른 이메일 형식이 아닙니다";
    }

    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 4) {
      newErrors.password = "비밀번호는 4자 이상이어야 합니다";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await registerAPI({
        userId: formData.userId,
        userName: formData.userName,
        password: formData.password,
        email: formData.email,
        universityName: formData.universityName || "",
        department: formData.department || "",
        grade: formData.grade || "",
      });
      
      alert("회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      navigate("/login");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "회원가입에 실패했습니다.";
      alert(errorMessage);
      setErrors({ submit: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <PageContainer>
      <SignUpCard>
        <PageTitle>NIMDA CON</PageTitle>
        <SignUpSubtitle>회원가입</SignUpSubtitle>
        <Form onSubmit={handleSubmit}>
          <div>
            <FormField
              label="아이디 *"
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="아이디를 입력하세요 (3자 이상)"
              required
            />
            {errors.userId && <ErrorText>{errors.userId}</ErrorText>}
          </div>

          <div>
            <FormField
              label="사용자명 *"
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="사용자명을 입력하세요 (3-20자)"
              required
            />
            {errors.userName && <ErrorText>{errors.userName}</ErrorText>}
          </div>

          <div>
            <FormField
              label="이메일 *"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              required
            />
            {errors.email && <ErrorText>{errors.email}</ErrorText>}
          </div>

          <div>
            <FormField
              label="비밀번호 *"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요 (4자 이상)"
              required
            />
            {errors.password && <ErrorText>{errors.password}</ErrorText>}
          </div>

          <div>
            <FormField
              label="비밀번호 확인 *"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 다시 입력하세요"
              required
            />
            {errors.confirmPassword && <ErrorText>{errors.confirmPassword}</ErrorText>}
          </div>

          <Divider>선택 정보</Divider>

          <div>
            <FormField
              label="대학교"
              type="text"
              name="universityName"
              value={formData.universityName}
              onChange={handleChange}
              placeholder="대학교명을 입력하세요"
            />
          </div>

          <div>
            <FormField
              label="학과"
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              placeholder="학과를 입력하세요"
            />
          </div>

          <div>
            <FormField
              label="학년"
              type="text"
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              placeholder="학년을 입력하세요 (예: 3학년)"
            />
          </div>

          {errors.submit && <ErrorText>{errors.submit}</ErrorText>}

          <BlueButton type="submit" onClick={undefined}>
            {isLoading ? "가입 중..." : "회원가입"}
          </BlueButton>
          
          <LoginLink type="button" onClick={handleLoginClick}>
            이미 계정이 있으신가요? 로그인
          </LoginLink>
        </Form>
      </SignUpCard>
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

const SignUpCard = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1a1a1a;
  font-weight: bold;
  text-align: center;
`;

const SignUpSubtitle = styled.h2`
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

const Divider = styled.div`
  margin: 1rem 0;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
  color: #666;
  font-size: 0.9rem;
  font-weight: 600;
`;

const LoginLink = styled.button`
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
