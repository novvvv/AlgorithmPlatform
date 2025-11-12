import styled from "styled-components";
import Logo from "./Logo";
import NavBar from "./NavBar";
import SidePanel from "./SidePanel";
import MainContent from "./MainContent";
import type { LayoutProps } from "./types";

/**
 * Layout 컴포넌트
 *
 * 애플리케이션 전체 레이아웃을 구성하는 메인 컴포넌트입니다.
 * - 상단: NavBar (로고 + 네비게이션)
 * - 하단: SidePanel (왼쪽) + MainContent (오른쪽)
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper>
      <Main>
        <Header>
          <Logo />
          <NavBar />
        </Header>
      <ContentWrapper>
        <SidePanel />
        <MainContent>{children}</MainContent>
      </ContentWrapper>
      </Main>
    </LayoutWrapper>
  );
};

export default Layout;

const LayoutWrapper = styled.div`
  /* 중앙에서 관리하는 레이아웃 수치들 */
  --sidebar-width: 25%; /* SidePanel 및 Logo의 너비 */
  --nav-height: 4rem; /* 상단 NavBar 높이 */
  --content-padding: 2rem; /* MainContent 및 Nav 탭 여백 */

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh; /* dynamic viewport height for mobile browser UI */
  width: 100vw;
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* allow inner pages to manage their own scroll */
`;

const Header = styled.div`
  height: var(--nav-height);
  width: 100%;
  display: flex;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  overflow: hidden;
`;
