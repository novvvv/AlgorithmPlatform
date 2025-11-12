import { useLocation } from "react-router-dom";
import styled from "styled-components";
import ProblemList from "@/pages/side/ProblemList";
import StudyGroupList from "@/pages/side/StudyGroupList";

/**
 * SidePanel 컴포넌트
 *
 * 왼쪽 사이드 영역을 담당하는 컴포넌트입니다.
 * - Problem 관련 페이지일 때: ProblemList 표시
 * - 그 외 페이지일 때: StudyGroupList 표시
 */
const SidePanel: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Problem 관련 페이지인지 확인
  const isProblemPage = pathname.startsWith("/problem");

  return (
    <SidePanelContainer>
      {isProblemPage ? <ProblemList /> : <StudyGroupList />}
    </SidePanelContainer>
  );
};

export default SidePanel;

const SidePanelContainer = styled.div`
  /* 너비는 Layout.tsx에서 정의한 CSS 변수 사용 */
  height: 100%;
  width: var(--sidebar-width);
  background-color: #f3f4f6;
  overflow-y: auto;
`;
