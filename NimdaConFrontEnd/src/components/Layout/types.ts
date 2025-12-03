/**
 * Layout 컴포넌트들의 타입 정의
 */

export interface MenuItem {
  name: string;
  href: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface NavBarProps {
  menuItems: MenuItem[];
}

export interface MainContentProps {
  children: React.ReactNode;
}


