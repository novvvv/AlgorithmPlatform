import Layout from "./Layout";

/**
 * LayoutWrapper 컴포넌트
 * 
 * Layout으로 페이지를 감싸는 래퍼 컴포넌트입니다.
 * Router에서 사용하여 코드 중복을 줄입니다.
 */
interface LayoutWrapperProps {
  children: React.ReactNode;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default LayoutWrapper;

