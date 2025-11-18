import styled from "styled-components";

export const ListContainer = styled.div`
  height: 100%;
  padding: 1rem;
  display: flex; 
  flex-direction: column;
  overflow-y: hidden; 
  box-sizing: border-box;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #BBBBBB;
  border-radius: 0.5rem; 
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
`;

export const SearchInput = styled.input`
  flex-grow: 1;
  min-width: 0;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0.25rem;
  margin-right: 0.5rem;
  &::placeholder {
    color: #9ca3af;
  }
`;

export const SearchIcon = styled.img`
  flex-shrink: 0;
  height: 1.25rem;
  width: 1.25rem;
  cursor: pointer;
`;
 
export const FilterBar = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;
 
export const Dropdown = styled.select`
  flex-grow: 1;
  border-radius: 0.5rem;
  border: 1px solid #BBBBBB;
  border-radius: 0.5rem; 
  padding: 0.75rem 1rem;
  font-size: 1rem;
  color: #1f2937;
  appearance: none;
`;
 
export const ListWrapper = styled.div`
  flex-grow: 1;
  overflow: auto;
`;
 
export const FixedButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #2563EB;
  color: white;
  border: none;
  border-radius: 0.5rem; 
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem; 
  &:hover {
    background-color: #0e2c6cff;
  }
`;