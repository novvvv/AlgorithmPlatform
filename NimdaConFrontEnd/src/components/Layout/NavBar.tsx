import { NavLink } from "react-router-dom";
import styled from "styled-components";
import type { MenuItem } from "./types";

/**
 * NavBar 컴포넌트
 *
 * 애플리케이션의 상단 네비게이션 바를 담당하는 컴포넌트입니다.
 * 좌측 로고 + 우측 탭 메뉴 구조
 */
const NavBar: React.FC = () => {
  // 네비게이션 바에 표시될 메뉴 아이템들
  const menuItems: MenuItem[] = [
    { name: "내 스터디그룹", href: "/studygroup/:id?" },
    { name: "문제 출제", href: "/problem/create" },
    { name: "문제 풀기", href: "/problem/detail/:id?" },
    { name: "채점 결과", href: "/problem/result/:id?" },
    { name: "마이페이지", href: "/mypage" },
    { name: "로그인", href: "/login" },
  ];

  return (
    <NavContainer>
        {menuItems.map((item) => (
          <TabLink
            key={item.name}
            to={item.href}
          >
            {item.name}
          </TabLink>
        ))}
    </NavContainer>
  );
};

export default NavBar;

const NavContainer = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TabLink = styled(NavLink)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  color: #4b5563;
  font-weight: 500;
  border-bottom: 3px solid transparent;
  transition: all 0.2s ease;
  text-decoration: none;

  &:hover {
    color: #1f2937;
    background-color: #f9fafb;
  }

  &.active {
    color: #2563eb;
    border-bottom-color: #2563eb;
    font-weight: 600;
  }
`;
