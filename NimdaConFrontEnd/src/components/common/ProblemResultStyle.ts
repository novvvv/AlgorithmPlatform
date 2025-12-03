import styled from "styled-components";

export const Page = styled.div`
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background: #f2f3f6;
  box-sizing: border-box;
  padding-bottom: 2.5rem;
`;

export const Title = styled.h1`
  margin: 0;
  width: 92%;
  max-width: 1280px;
  font-size: 1.8rem;
  font-weight: 800;
  padding: 1.5rem 0.5rem 0.3rem;
`;

export const EmptyCard = styled.div`
  width: 92%;
  max-width: 1280px;
  background: #ffffff;
  border-radius: 12px;
  padding: 1.25rem 1.4rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  color: #6b7280;
  font-weight: 700;
`;

export const ContentGrid = styled.div`
  width: 92%;
  max-width: 1280px;
  display: grid;
  grid-template-columns: minmax(0, 1.5fr) minmax(0, 0.9fr);
  gap: 1rem;
  align-items: stretch;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Card = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1.1rem 1.2rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.9rem;
`;

export const ResultIconImg = styled.img`
  width: 55px;
  height: 55px;
  flex-shrink: 0;
`;

export const ResultText = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ResultStatus = styled.span<{ $correct: boolean }>`
  font-size: 1.3rem;
  font-weight: 800;
  color: ${({ $correct }) => ($correct ? "#16a34a" : "#dc2626")};
`;

export const ResultStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`;

export const ResultPill = styled.div<{ $tone: "time" | "memory" | "language" }>`
  background: ${({ $tone }) =>
    $tone === "time" ? "#eef4ff" : $tone === "memory" ? "#f7f2ff" : "#eefaf3"};
  border-radius: 12px;
  padding: 0.85rem 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
`;

export const ResultPillLabel = styled.span`
  font-size: 0.9rem;
  color: #6b7280;
  font-weight: 600;
`;

export const ResultPillValue = styled.span<{ $tone: "time" | "memory" | "language" }>`
  font-size: 1rem;
  font-weight: 800;
  color: ${({ $tone }) =>
    $tone === "time" ? "#2563eb" : $tone === "memory" ? "#7c3aed" : "#15803d"};
`;

export const Divider = styled.div`
  height: 1px;
  background: #e5e7eb;
`;

export const SectionLabel = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: #1f2937;
`;

export const TestList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const TestRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f9fafb;
  border-radius: 8px;
  padding: 0.55rem 0.75rem;
`;

export const TestRowLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.45rem;
`;

export const TestIcon = styled.img`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
`;

export const TestName = styled.span`
  font-weight: 700;
  color: #1f2937;
`;

export const TestResult = styled.span<{ $result: string }>`
  font-weight: 700;
  color: ${({ $result }) => ($result === "통과" ? "#16a34a" : "#dc2626")};
`;

export const TestMeta = styled.span`
  color: #6b7280;
  font-size: 0.92rem;
`;

export const CodeBlock = styled.textarea`
  width: 100%;
  min-height: 200px;
  background: #0f172a;
  color: #22c55e;
  border: none;
  border-radius: 12px;
  padding: 1rem 1.1rem;
  font-family: "JetBrains Mono", "Fira Code", monospace;
  font-size: 0.98rem;
  line-height: 1.7;
  white-space: pre;
  box-sizing: border-box;
  resize: none;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  min-height: 110px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 0.9rem;
  font-size: 0.95rem;
  resize: vertical;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
  }
`;

export const CommentButton = styled.button`
  align-self: flex-end;
  margin-top: 0.4rem;
  padding: 0.55rem 1.1rem;
  background: #2563eb;
  color: #ffffff;
  font-weight: 700;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #1d4ed8;
  }
`;

export const CommentList = styled.ul`
  margin: 0.6rem 0 0;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  color: #1f2937;
  line-height: 1.5;
`;

export const CommentItem = styled.li`
  list-style: disc;
`;

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.98rem;
  color: #1f2937;
`;

export const Highlight = styled.span`
  color: #16a34a;
  font-weight: 700;
`;

export const BackButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: #d1d5db;
  color: #1f2937;
  font-weight: 700;
  font-size: 1.05rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: #c7cbd1;
  }
`;
