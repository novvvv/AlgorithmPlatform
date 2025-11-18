import React, { useState } from "react";
import styled from "styled-components";

interface ParticipationCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
  groupName: string;
}

export const ParticipationCodeModal: React.FC<ParticipationCodeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  groupName 
}) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (code.trim()) {
      // 실제로는 API 검증 후 에러 처리
      if (code !== "ABC123") {
        setError(true);
        return;
      }
      onSubmit(code);
      setCode("");
      setError(false);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{groupName}의<br/>참여코드를 입력하세요.</ModalTitle>
        {error && <ModalSubtitle>참여코드가 일치하지 않습니다!</ModalSubtitle>}
        <ModalInput 
          type="text" 
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(false);
          }}
          placeholder="참여코드 입력"
        />
        <ModalButtons>
          <CancelButton onClick={onClose}>취소</CancelButton>
          <ConfirmButton onClick={handleSubmit}>가입하기</ConfirmButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
  text-align: center;
  line-height: 1.5;
`;

const ModalSubtitle = styled.p`
  color: #ef4444;
  font-size: 0.9rem;
  text-align: center;
  margin: 0 0 1.5rem 0;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const ModalButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background: #e5e7eb;
  color: #1f2937;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    background: #d1d5db;
  }
`;

const ConfirmButton = styled.button`
  flex: 1;
  padding: 0.75rem;
  background: #1f2937;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;

  &:hover {
    background: #111827;
  }
`;
