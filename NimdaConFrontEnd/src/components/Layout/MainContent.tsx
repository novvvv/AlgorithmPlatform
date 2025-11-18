import styled from "styled-components";

/**
 * MainContent 컴포넌트
 *
 * 메인 콘텐츠 영역을 담당하는 컴포넌트입니다.
 * 전체 너비에서 페이지 콘텐츠를 렌더링합니다.
 */
interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <MainContainer>
      {children}
    </MainContainer>
  );
};

export default MainContent;

const MainContainer = styled.main`
  flex: 1;
  background-color: #ffffff;
  overflow-y: auto;
  box-sizing: border-box;
`;
