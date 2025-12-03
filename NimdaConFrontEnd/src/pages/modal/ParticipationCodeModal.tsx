import React, { useState } from "react";
import styled from "styled-components";

interface ParticipationCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => Promise<void>; 
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!code.trim()) return;

    setIsSubmitting(true); // 로딩 시작
    setError(false);       // 에러 초기화

    try {
      await onSubmit(code);
      setCode("");
    } catch (err) {
      console.error("코드 검증 실패:", err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 엔터키 입력 시 제출 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalTitle>{groupName}의<br/>참여코드를 입력하세요.</ModalTitle>
        {error && <ModalSubtitle>참여코드가 일치하지 않거나 서버 오류입니다.</ModalSubtitle>}
        <ModalInput 
          type="text" 
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError(false); // 입력 시 에러 초기화
          }}
          onKeyDown={handleKeyDown}
          placeholder="참여코드 입력"
          disabled={isSubmitting} // 로딩 중 입력 방지
        />
        <ModalButtons>
          <CancelButton onClick={onClose} disabled={isSubmitting}>
            취소
          </CancelButton>
          <ConfirmButton 
            onClick={handleSubmit} 
            disabled={isSubmitting || !code.trim()}
          >
            {isSubmitting ? "확인 중..." : "가입하기"}
          </ConfirmButton>
        </ModalButtons>
      </ModalContent>
    </ModalOverlay>
  );
};

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
