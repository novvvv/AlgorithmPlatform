import React from "react";
import styled from "styled-components";

/**
 * BlueButton 컴포넌트
 * 
 * 파란색 배경에 흰색 텍스트를 가진 버튼입니다.
 */
interface BlueButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

const BlueButton: React.FC<BlueButtonProps> = ({
  children,
  onClick,
  type = "button",
  className,
}) => {
  return (
    <BlueButtonStyled
      type={type}
      onClick={onClick}
      className={className} 
    >
      {children}
    </BlueButtonStyled>
  );
};

export default BlueButton;

const BlueButtonStyled = styled.button`
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1d4ed8;
  }
`;