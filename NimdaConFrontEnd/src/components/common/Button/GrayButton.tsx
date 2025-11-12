import React from "react";
import styled from "styled-components";

/**
 * GrayButton 컴포넌트
 * 
 * 연한 회색 배경에 어두운 회색 텍스트를 가진 버튼입니다.
 */
interface GrayButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

const GrayButton: React.FC<GrayButtonProps> = ({
  children,
  onClick,
  type = "button",
  className,
}) => {
  return (
    <GrayButtonStyled
      type={type}
      onClick={onClick}
      className={className}
    >
      {children}
    </GrayButtonStyled>
  );
};

export default GrayButton;

const GrayButtonStyled = styled.button`
  background-color: #e5e7eb;
  color: #374151;
  font-weight: 600;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #d1d5db;
  }
`;