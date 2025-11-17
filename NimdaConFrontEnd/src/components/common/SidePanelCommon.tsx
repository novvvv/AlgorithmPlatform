import styled from "styled-components";

/** 전체 레이아웃 및 검색/필터 컴포넌트 */

// 목록 전체를 감싸는 컨테이너. flex-direction: column을 위해 display: flex를 추가했습니다.
export const ListContainer = styled.div`
  height: 100%;
  padding: 1rem;
  display: flex; /* 내부 요소(검색/목록/버튼)를 세로로 배치하기 위해 추가 */
  flex-direction: column;
`;

// 검색 창 컨테이너
export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db; /* Gray-300 */
  border-radius: 0.375rem; /* rounded-md */
  padding: 0.5rem 0.75rem;
  margin-bottom: 1rem;
`;

// 검색 입력 필드
export const SearchInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0;
  margin-right: 0.5rem;
  &::placeholder {
    color: #9ca3af; /* Gray-400 */
  }
`;

// 검색 아이콘 (Placeholder)
export const SearchIcon = styled.span`
  color: #6b7280; /* Gray-500 */
  font-size: 1.25rem;
`;

// 전체 필터 드롭다운 컨테이너 (문제 목록에서 사용)
export const FilterBar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

// 드롭다운 Placeholder
export const Dropdown = styled.select`
  flex-grow: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  font-size: 0.875rem;
  color: #1f2937;
  appearance: none; /* 기본 드롭다운 스타일 제거 */
`;

// 목록 아이템들을 감싸는 영역
export const ListWrapper = styled.div`
  overflow-y: auto;
  flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
  padding-bottom: 0.5rem;
  /* 스크롤바 커스터마이징이 필요하다면 여기에 추가 */
`;

// 하단 고정 버튼
export const FixedButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3b82f6; /* Blue-500 */
  color: white;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: auto; /* ListContainer 내에서 가장 하단에 붙이기 */
  &:hover {
    background-color: #2563eb; /* Blue-600 */
  }
`;